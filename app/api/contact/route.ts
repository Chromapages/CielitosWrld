import { z } from 'zod';
import {
  contactSubmissionSchema,
  contactResponseSchema,
  type ContactFieldErrors,
  type ContactResponse,
} from '../../../lib/contact.ts';

const MAX_JSON_BYTES = 16 * 1024;
const PROVIDER_TIMEOUT_MS = 10_000;
const bodyTooLarge = new Error('body_too_large');
const providerTimeout = new Error('provider_timeout');
type ResponseCode = ContactResponse['code'];

const httpStatuses: Record<ResponseCode, number> = {
  accepted: 202,
  validation_error: 400,
  invalid_request: 400,
  rejected: 400,
  origin_rejected: 403,
  payload_too_large: 413,
  unsupported_media_type: 415,
  unavailable: 503,
  in_progress: 409,
  identity_conflict: 409,
  internal_error: 500,
  unknown: 502,
};

const configurationSchema = z.object({
  enabled: z.literal('true'),
  apiKey: z.string().min(1).regex(/^[^\s\x00-\x1f\x7f]+$/),
  from: contactSubmissionSchema.shape.email,
  to: contactSubmissionSchema.shape.email,
  testMode: z.enum(['true', 'false']),
});
const providerAcceptanceSchema = z.object({ id: z.string().uuid() });
const providerConflictSchema = z.object({
  name: z.enum(['concurrent_idempotent_requests', 'invalid_idempotent_request']),
});

function respond(code: ResponseCode, submissionId?: string, fieldErrors?: ContactFieldErrors, status = httpStatuses[code]) {
  const variant = contactResponseSchema.options.find(option => option.shape.code.value === code)!;
  const payload = contactResponseSchema.parse({
    status: variant.shape.status.value,
    code,
    message: variant.shape.message.value,
    ...(submissionId && { submissionId }),
    ...(fieldErrors && { fieldErrors }),
  });
  return Response.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function readJson(stream: ReadableStream<Uint8Array> | null): Promise<unknown> {
  if (!stream) throw new SyntaxError('missing_body');
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_JSON_BYTES) {
        // Cancellation must not make a rejected upload wait for its producer.
        void reader.cancel('body_too_large').catch(() => {
          console.info(JSON.stringify({
            event: 'contact.failed',
            timestamp: new Date().toISOString(),
            code: 'body_cancel_failed',
            testMode: process.env.CONTACT_TEST_MODE === 'true',
          }));
        });
        throw bodyTooLarge;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}

export async function POST(request: Request): Promise<Response> {
  let submissionId: string | undefined;
  let outboundStarted = false;
  let controller: AbortController | undefined;
  let timeout: NodeJS.Timeout | undefined;
  let testMode = false;

  function emit(event: 'contact.received' | 'contact.provider_accepted' | 'contact.failed' | 'contact.unknown', code: string, providerId?: string) {
    if (!submissionId) return;
    console.info(JSON.stringify({
      event,
      submissionId,
      timestamp: new Date().toISOString(),
      code,
      testMode,
      ...(providerId && { providerId }),
    }));
  }

  try {
    testMode = process.env.CONTACT_TEST_MODE === 'true';
    const origin = request.headers.get('origin');
    if (origin !== null && origin !== new URL(request.url).origin) return respond('origin_rejected');
    const mediaType = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (mediaType !== 'application/json') return respond('unsupported_media_type');
    const contentLength = request.headers.get('content-length');
    if (contentLength !== null && Number(contentLength) > MAX_JSON_BYTES) return respond('payload_too_large');

    let raw: unknown;
    try {
      raw = await readJson(request.body);
    } catch (error) {
      return respond(error === bodyTooLarge ? 'payload_too_large' : 'invalid_request');
    }

    if (raw !== null && typeof raw === 'object' && !Array.isArray(raw)) {
      const reference = contactSubmissionSchema.shape.submissionId.safeParse((raw as Record<string, unknown>).submissionId);
      if (reference.success) submissionId = reference.data;
    }
    const validated = contactSubmissionSchema.safeParse(raw);
    if (!validated.success) {
      const fields: ContactFieldErrors = {};
      for (const issue of validated.error.issues) {
        const field = issue.path[0];
        if (field !== 'name' && field !== 'email' && field !== 'budget' && field !== 'message') {
          return respond('invalid_request', submissionId);
        }
        // Visible-field schema messages are the static, response-validated catalog only.
        if (!fields[field]) Object.assign(fields, { [field]: [issue.message] });
      }
      return respond('validation_error', submissionId, fields);
    }
    const inquiry = validated.data;
    submissionId = inquiry.submissionId;
    if (inquiry.gotcha) return respond('rejected', submissionId);

    emit('contact.received', 'validated');
    const configuration = configurationSchema.safeParse({
      enabled: process.env.CONTACT_ENABLED,
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      testMode: process.env.CONTACT_TEST_MODE,
    });
    if (!configuration.success) {
      emit('contact.failed', 'unavailable');
      return respond('unavailable', submissionId);
    }
    const config = configuration.data;
    const providerBody = JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: 'New contact inquiry',
      reply_to: inquiry.email,
      text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nBudget: ${inquiry.budget}\n\nMessage:\n${inquiry.message}`,
      tags: [
        { name: 'submission_id', value: submissionId },
        { name: 'test_mode', value: config.testMode },
      ],
    });

    controller = new AbortController();
    const signal = controller.signal;
    // TypeScript 5.2's standard library predates Promise.withResolvers.
    const deadline = new Promise<never>((_, reject) => {
      timeout = setTimeout(() => {
        reject(providerTimeout);
        controller!.abort();
      }, PROVIDER_TIMEOUT_MS);
    });
    outboundStarted = true;
    const operation = (async (): Promise<{ code: ResponseCode; providerId?: string }> => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `contact/${submissionId}`,
        },
        body: providerBody,
        redirect: 'error',
        signal,
      });
      if (response.ok) {
        const accepted = providerAcceptanceSchema.safeParse(await readJson(response.body));
        return accepted.success ? { code: 'accepted', providerId: accepted.data.id } : { code: 'unknown' };
      }
      if (response.status === 409) {
        const conflict = providerConflictSchema.safeParse(await readJson(response.body));
        if (!conflict.success) return { code: 'unknown' };
        return { code: conflict.data.name === 'concurrent_idempotent_requests' ? 'in_progress' : 'identity_conflict' };
      }
      if (response.status === 408) throw providerTimeout;
      if ([400, 401, 403, 404, 405, 413, 415, 422, 429].includes(response.status)) return { code: 'unavailable' };
      return { code: 'unknown' };
    })();
    const outcome = await Promise.race([operation, deadline]);
    emit(outcome.code === 'accepted' ? 'contact.provider_accepted' : outcome.code === 'unavailable' ? 'contact.failed' : 'contact.unknown', outcome.code, outcome.providerId);
    return respond(outcome.code, submissionId);
  } catch (error) {
    const code = outboundStarted ? 'unknown' : 'internal_error';
    emit(outboundStarted ? 'contact.unknown' : 'contact.failed', code);
    return respond(code, submissionId, undefined, error === providerTimeout ? 504 : httpStatuses[code]);
  } finally {
    clearTimeout(timeout);
    controller?.abort();
  }
}
