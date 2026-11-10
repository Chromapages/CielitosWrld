const assert = require('node:assert/strict');
const { test, beforeEach } = require('node:test');
const { performance } = require('node:perf_hooks');

// This process never reads .env files or copies inherited credential values.
const syntheticEnvironment = {
  CONTACT_ENABLED: 'true',
  RESEND_API_KEY: 'synthetic-test-only-not-a-credential',
  CONTACT_FROM_EMAIL: 'sender@example.invalid',
  CONTACT_TO_EMAIL: 'owner@example.invalid',
  CONTACT_TEST_MODE: 'true',
};
process.env = { ...syntheticEnvironment };

const denyEgress = () => { throw new Error('Real network access is forbidden in contact tests'); };
for (const [moduleName, methods] of [
  ['node:http', ['request', 'get']],
  ['node:https', ['request', 'get']],
  ['node:net', ['connect', 'createConnection']],
  ['node:tls', ['connect']],
]) {
  const transport = require(moduleName);
  for (const method of methods) transport[method] = denyEgress;
}
globalThis.fetch = denyEgress;

const { POST } = require('../app/api/contact/route.ts');
const { contactSubmissionSchema, contactResponseSchema } = require('../lib/contact.ts');

const submissionId = 'abcd1234-5678-4abc-9def-0123456789ab';
const providerId = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
const validSubmission = {
  submissionId,
  createdAt: '2026-11-10T08:00:00.000Z',
  name: 'Synthetic Visitor',
  email: 'visitor@example.invalid',
  budget: '1000-2500',
  message: 'A synthetic inquiry used only by isolated fixtures.',
};
const url = 'https://contact.example.invalid/api/contact';
let fixture;
let sends;
let logs;

beforeEach(context => {
  process.env = { ...syntheticEnvironment };
  fixture = undefined;
  sends = [];
  logs = [];
  for (const method of ['info', 'warn', 'error', 'log']) {
    context.mock.method(console, method, (...args) => { logs.push(args); });
  }
  globalThis.fetch = async (target, options) => {
    assert.equal(target, 'https://api.resend.com/emails', 'unexpected egress target');
    assert.equal(typeof fixture, 'function', 'egress without an explicit fixture');
    sends.push({ target, options });
    return fixture(target, options);
  };
});

function request(payload = validSubmission, headers = {}) {
  return new Request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(payload),
  });
}

function rawRequest(body, headers = {}) {
  return new Request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
    ...(body instanceof ReadableStream ? { duplex: 'half' } : {}),
  });
}

async function expectReply(response, httpStatus, code, reference) {
  assert.equal(response.status, httpStatus);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const body = await response.json();
  assert.equal(contactResponseSchema.safeParse(body).success, true, 'response violates shared contract');
  assert.equal(body.code, code);
  assert.equal(body.submissionId, reference);
  return body;
}

function accept() {
  fixture = () => Response.json({ id: providerId });
}

function metadata() {
  return logs.map(args => {
    assert.equal(args.length, 1);
    return JSON.parse(args[0]);
  });
}

test('accepts only a validated provider receipt and sends a fixed, plain-text inquiry with budget', async () => {
  accept();
  const payload = {
    ...validSubmission,
    submissionId: submissionId.toUpperCase(),
    createdAt: '2026-11-10T08:00:00Z',
    name: '  Synthetic  Visitor  ',
    email: '  Visitor@example.invalid  ',
    message: '  A synthetic message\nwith internal whitespace.  ',
  };
  const response = await expectReply(await POST(request(payload, { Origin: new URL(url).origin })), 202, 'accepted', submissionId);
  assert.equal(sends.length, 1);
  const { options } = sends[0];
  const email = JSON.parse(options.body);
  assert.equal(options.method, 'POST');
  assert.equal(options.redirect, 'error');
  assert.equal(options.headers['Idempotency-Key'], `contact/${submissionId}`);
  assert.equal(email.from, 'sender@example.invalid');
  assert.deepEqual(email.to, ['owner@example.invalid']);
  assert.equal(email.reply_to, 'Visitor@example.invalid');
  assert.equal(email.subject.includes('\n'), false);
  assert.match(email.text, /Name: Synthetic  Visitor\n/);
  assert.match(email.text, /Budget: 1000-2500\n/);
  assert.match(email.text, /A synthetic message\nwith internal whitespace\.$/);
  assert.equal('html' in email, false);
  assert.equal('providerId' in response, false);
  assert.deepEqual(email.tags, [
    { name: 'submission_id', value: submissionId },
    { name: 'test_mode', value: 'true' },
  ]);
  const events = metadata();
  assert.deepEqual(events.map(event => event.event), ['contact.received', 'contact.provider_accepted']);
  assert.equal(events[1].providerId, providerId);
  assert.equal(events.every(event => event.submissionId === submissionId && event.testMode === true), true);
  assert.equal(events.every(event => Number.isFinite(Date.parse(event.timestamp))), true);
});

test('canonicalizes UTC time and JavaScript string-length bounds without changing internal whitespace or case', () => {
  const parsed = contactSubmissionSchema.parse({
    ...validSubmission,
    submissionId: submissionId.toUpperCase(),
    createdAt: '2024-02-29T12:34:56.1Z',
    name: '  Ab  CD  ',
    email: '  Case@example.invalid  ',
    message: '  Line one\nLine two  ',
  });
  assert.equal(parsed.submissionId, submissionId);
  assert.equal(parsed.createdAt, '2024-02-29T12:34:56.100Z');
  assert.equal(parsed.name, 'Ab  CD');
  assert.equal(parsed.email, 'Case@example.invalid');
  assert.equal(parsed.message, 'Line one\nLine two');
  assert.equal(contactSubmissionSchema.safeParse({ ...validSubmission, message: '🙂'.repeat(2500) }).success, true);
  assert.equal(contactSubmissionSchema.safeParse({ ...validSubmission, message: '🙂'.repeat(2501) }).success, false);
});

for (const [label, changed] of [
  ['short name', { name: ' A ' }],
  ['long name', { name: 'A'.repeat(101) }],
  ['wrong name type', { name: ['Synthetic'] }],
  ['invalid email', { email: 'not-an-address' }],
  ['email header injection', { email: 'visitor@example.invalid\r\nBcc: attacker@example.invalid' }],
  ['trim-hidden email newline', { email: '\r\nvisitor@example.invalid' }],
  ['wrong email type', { email: 42 }],
  ['unsupported budget', { budget: 'unlimited' }],
  ['normalized-looking budget', { budget: ' 1000-2500 ' }],
  ['missing budget', { budget: undefined }],
  ['short message', { message: '123456789' }],
  ['long message', { message: 'A'.repeat(5001) }],
  ['wrong message type', { message: null }],
]) {
  test(`rejects ${label} without invoking outbound transport`, async () => {
    const response = await expectReply(await POST(request({ ...validSubmission, ...changed })), 400, 'validation_error', submissionId);
    assert.equal(sends.length, 0);
    assert.deepEqual(Object.keys(response.fieldErrors), Object.keys(changed));
    assert.equal(logs.length, 0);
  });
}

for (const [label, payload, reference] of [
  ['null', null, undefined],
  ['array', [validSubmission], undefined],
  ['scalar', 'not an object', undefined],
  ['legacy payload', { name: 'Synthetic Visitor', email: 'visitor@example.invalid', message: 'A synthetic message.' }, undefined],
  ['invalid reference', { ...validSubmission, submissionId: 'not-a-uuid' }, undefined],
  ['non-UTC time', { ...validSubmission, createdAt: '2026-11-10T08:00:00+01:00' }, submissionId],
  ['invalid calendar date', { ...validSubmission, createdAt: '2026-02-30T08:00:00Z' }, submissionId],
  ['missing time', { ...validSubmission, createdAt: undefined }, submissionId],
  ['wrong honeypot type', { ...validSubmission, gotcha: 7 }, submissionId],
  ['oversized honeypot', { ...validSubmission, gotcha: 'x'.repeat(201) }, submissionId],
  ['caller-controlled target', { ...validSubmission, to: 'attacker@example.invalid' }, submissionId],
  ['caller-controlled mode', { ...validSubmission, testMode: false }, submissionId],
  ['control and field errors', { ...validSubmission, name: '', submissionId: 'not-a-uuid' }, undefined],
]) {
  test(`rejects ${label} as an internal contract error, not a hidden field focus target`, async () => {
    const response = await expectReply(await POST(request(payload)), 400, 'invalid_request', reference);
    assert.equal('fieldErrors' in response, false);
    assert.equal(sends.length, 0);
  });
}

test('rejects raw nonempty honeypots including whitespace, without a false receipt', async () => {
  await expectReply(await POST(request({ ...validSubmission, gotcha: ' ' })), 400, 'rejected', submissionId);
  assert.equal(sends.length, 0);
  assert.equal(logs.length, 0);
});

test('rejects malformed JSON and malformed UTF-8 before sending', async () => {
  await expectReply(await POST(rawRequest('{"name":')), 400, 'invalid_request');
  await expectReply(await POST(rawRequest(new Uint8Array([0xff]))), 400, 'invalid_request');
  assert.equal(sends.length, 0);
});

test('rejects unsupported media and cross-origin submissions before reading/sending', async () => {
  await expectReply(await POST(request(validSubmission, { 'Content-Type': 'text/plain' })), 415, 'unsupported_media_type');
  await expectReply(await POST(request(validSubmission, { Origin: 'https://other.example.invalid' })), 403, 'origin_rejected');
  await expectReply(await POST(request(validSubmission, { Origin: 'null' })), 403, 'origin_rejected');
  assert.equal(sends.length, 0);
});

test('enforces the byte limit for streamed bodies even with an understated Content-Length', { timeout: 2000 }, async () => {
  const encoded = new TextEncoder().encode(JSON.stringify(validSubmission).padEnd(16 * 1024 + 1, ' '));
  let cancelled = false;
  let offset = 0;
  const stream = new ReadableStream({
    pull(controller) {
      if (offset >= encoded.length) return;
      controller.enqueue(encoded.subarray(offset, offset + 1024));
      offset += 1024;
    },
    cancel() { cancelled = true; },
  });
  await expectReply(await POST(rawRequest(stream, { 'Content-Length': '1' })), 413, 'payload_too_large');
  assert.equal(sends.length, 0);
  assert.equal(cancelled, true);
});

test('accepts exactly 16 KiB and rejects an oversized declared body without sending it', async () => {
  accept();
  await expectReply(await POST(rawRequest(JSON.stringify(validSubmission).padEnd(16 * 1024, ' '))), 202, 'accepted', submissionId);
  assert.equal(sends.length, 1);
  await expectReply(await POST(request(validSubmission, { 'Content-Length': String(16 * 1024 + 1) })), 413, 'payload_too_large');
  assert.equal(sends.length, 1);
});

test('accepts inclusive field length bounds, including a 254-character reserved address', async () => {
  accept();
  const email = `${'a'.repeat(64)}@${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(53)}.invalid`;
  assert.equal(email.length, 254);
  await expectReply(await POST(request({ ...validSubmission, name: 'Ab', message: '1234567890', email })), 202, 'accepted', submissionId);
  await expectReply(await POST(request({ ...validSubmission, name: 'A'.repeat(100), message: 'A'.repeat(5000) })), 202, 'accepted', submissionId);
  await expectReply(await POST(request({ ...validSubmission, email: `x${email}` })), 400, 'validation_error', submissionId);
  assert.equal(sends.length, 2);
});

for (const key of Object.keys(syntheticEnvironment)) {
  test(`fails closed when ${key} is missing`, async () => {
    delete process.env[key];
    await expectReply(await POST(request()), 503, 'unavailable', submissionId);
    assert.equal(sends.length, 0);
  });
}

for (const [key, value] of [
  ['CONTACT_ENABLED', 'false'],
  ['CONTACT_ENABLED', 'TRUE'],
  ['RESEND_API_KEY', ''],
  ['RESEND_API_KEY', 'synthetic\r\ninjection'],
  ['CONTACT_FROM_EMAIL', 'not-an-address'],
  ['CONTACT_TO_EMAIL', 'owner@example.invalid\r\nBcc: attacker@example.invalid'],
  ['CONTACT_TEST_MODE', 'not-a-boolean'],
]) {
  test(`fails closed for invalid ${key} configuration`, async () => {
    process.env[key] = value;
    await expectReply(await POST(request()), 503, 'unavailable', submissionId);
    assert.equal(sends.length, 0);
  });
}

test('treats test mode as server-owned metadata, not a recipient safety override', async () => {
  process.env.CONTACT_TEST_MODE = 'false';
  accept();
  await expectReply(await POST(request()), 202, 'accepted', submissionId);
  const email = JSON.parse(sends[0].options.body);
  assert.deepEqual(email.to, ['owner@example.invalid']);
  assert.deepEqual(email.tags.find(tag => tag.name === 'test_mode'), { name: 'test_mode', value: 'false' });
  assert.equal(metadata().every(event => event.testMode === false), true);
});

for (const status of [400, 401, 403, 422, 429]) {
  test(`returns known-unsent unavailable for definite provider ${status} rejection without exposing its body`, async () => {
    fixture = () => Response.json({ name: 'provider_rejection', message: 'PRIVATE_PROVIDER_DETAIL' }, { status });
    const body = await expectReply(await POST(request()), 503, 'unavailable', submissionId);
    assert.equal(JSON.stringify(body).includes('PRIVATE_PROVIDER_DETAIL'), false);
    assert.deepEqual(metadata().map(event => event.event), ['contact.received', 'contact.failed']);
  });
}

for (const [name, code] of [
  ['concurrent_idempotent_requests', 'in_progress'],
  ['invalid_idempotent_request', 'identity_conflict'],
]) {
  test(`preserves unresolved identity for provider ${name}`, async () => {
    fixture = () => Response.json({ name, message: 'PRIVATE_CONFLICT_DETAIL' }, { status: 409 });
    await expectReply(await POST(request()), 409, code, submissionId);
    assert.deepEqual(metadata().map(event => event.event), ['contact.received', 'contact.unknown']);
  });
}

for (const [label, makeResponse] of [
  ['missing provider ID', () => Response.json({})],
  ['non-UUID provider ID', () => Response.json({ id: 'not-a-uuid' })],
  ['wrong provider body type', () => Response.json([providerId])],
  ['malformed successful JSON', () => new Response('<html>not a receipt</html>')],
  ['empty success body', () => new Response(null, { status: 204 })],
  ['oversized successful response', () => new Response(' '.repeat(16 * 1024 + 1))],
  ['unrecognized conflict', () => Response.json({ name: 'unrecognized_conflict' }, { status: 409 })],
  ['ambiguous server error', () => Response.json({ message: 'PRIVATE_UPSTREAM_ERROR' }, { status: 500 })],
  ['ambiguous gateway error', () => Response.json({ message: 'PRIVATE_GATEWAY_ERROR' }, { status: 503 })],
  ['unclassified upstream status', () => new Response(null, { status: 499 })],
]) {
  test(`keeps ${label} unknown after outbound transport may have begun`, async () => {
    fixture = makeResponse;
    await expectReply(await POST(request()), 502, 'unknown', submissionId);
    assert.equal(sends.length, 1);
    assert.deepEqual(metadata().map(event => event.event), ['contact.received', 'contact.unknown']);
  });
}

test('reports a transport exception as unknown, not definite failure or acceptance', async () => {
  fixture = () => { throw new Error('PRIVATE_NETWORK_EXCEPTION'); };
  await expectReply(await POST(request()), 502, 'unknown', submissionId);
  assert.equal(JSON.stringify(logs).includes('PRIVATE_NETWORK_EXCEPTION'), false);
});

test('reports an upstream request timeout as unknown', async () => {
  fixture = () => new Response(null, { status: 408 });
  await expectReply(await POST(request()), 504, 'unknown', submissionId);
});

test('returns a safe known-unsent internal failure only before transport invocation', async () => {
  process.env = new Proxy({ ...syntheticEnvironment }, {
    get(target, property) {
      if (property === 'CONTACT_ENABLED') throw new Error('PRIVATE_LOCAL_FAILURE');
      return target[property];
    },
  });
  await expectReply(await POST(request()), 500, 'internal_error', submissionId);
  assert.equal(sends.length, 0);
  assert.equal(JSON.stringify(logs).includes('PRIVATE_LOCAL_FAILURE'), false);
});

test('bounds an unresponsive outbound transport at ten seconds, inside the twelve-second fixture target', { timeout: 15000 }, async () => {
  let aborted = false;
  fixture = (_target, options) => {
    options.signal.addEventListener('abort', () => { aborted = true; }, { once: true });
    return Promise.withResolvers().promise;
  };
  const started = performance.now();
  await expectReply(await POST(request()), 504, 'unknown', submissionId);
  const elapsed = performance.now() - started;
  assert.equal(aborted, true);
  assert.ok(elapsed >= 9000 && elapsed < 12000, `timeout completed in ${elapsed}ms`);
  assert.equal(sends.length, 1, 'no automatic provider retries');
});

test('keeps the same deadline while reading a stalled successful provider body', async context => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const reachedProvider = Promise.withResolvers();
  fixture = (_target, options) => new Response(new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"id":'));
      options.signal.addEventListener('abort', () => controller.error(new Error('fixture abort')), { once: true });
      reachedProvider.resolve();
    },
  }));
  const pending = POST(request());
  await reachedProvider.promise;
  context.mock.timers.tick(10000);
  await expectReply(await pending, 504, 'unknown', submissionId);
});

test('retries unchanged normalized submissions with identical provider body and key, without claiming vendor deduplication', async () => {
  accept();
  await expectReply(await POST(request({
    ...validSubmission,
    submissionId: submissionId.toUpperCase(),
    createdAt: '2026-11-10T08:00:00Z',
    name: `  ${validSubmission.name}  `,
    gotcha: '',
  })), 202, 'accepted', submissionId);
  await expectReply(await POST(request()), 202, 'accepted', submissionId);
  assert.equal(sends.length, 2);
  assert.equal(sends[0].options.headers['Idempotency-Key'], sends[1].options.headers['Idempotency-Key']);
  assert.equal(sends[0].options.body, sends[1].options.body);
  const received = metadata().filter(event => event.event === 'contact.received');
  assert.deepEqual(received.map(event => event.submissionId), [submissionId, submissionId]);
});

test('rejects forged public receipt shapes and never exposes provider IDs or arbitrary fields', () => {
  const accepted = { status: 'provider_accepted', code: 'accepted', message: 'Submitted for delivery', submissionId };
  assert.equal(contactResponseSchema.safeParse(accepted).success, true);
  for (const forged of [
    { ...accepted, submissionId: undefined },
    { ...accepted, submissionId: 'not-a-uuid' },
    { ...accepted, status: 'unknown' },
    { ...accepted, code: 'unknown' },
    { ...accepted, providerId },
    { ...accepted, fieldErrors: { name: ['arbitrary message'] } },
  ]) {
    assert.equal(contactResponseSchema.safeParse(forged).success, false);
  }
});

test('logs only approved metadata across accepted, rejected and uncertain provider outcomes', async () => {
  accept();
  await expectReply(await POST(request()), 202, 'accepted', submissionId);
  fixture = () => Response.json({ message: 'PRIVATE_PROVIDER_BODY' }, { status: 429 });
  await expectReply(await POST(request()), 503, 'unavailable', submissionId);
  fixture = () => { throw new Error('PRIVATE_RAW_EXCEPTION'); };
  await expectReply(await POST(request()), 502, 'unknown', submissionId);
  const allowed = new Set(['event', 'submissionId', 'timestamp', 'code', 'testMode', 'providerId']);
  for (const event of metadata()) {
    assert.equal(Object.keys(event).every(key => allowed.has(key)), true);
  }
  const serialized = JSON.stringify(logs);
  for (const privateValue of [
    validSubmission.name, validSubmission.email, validSubmission.budget, validSubmission.message,
    syntheticEnvironment.RESEND_API_KEY, syntheticEnvironment.CONTACT_FROM_EMAIL,
    syntheticEnvironment.CONTACT_TO_EMAIL, 'PRIVATE_PROVIDER_BODY', 'PRIVATE_RAW_EXCEPTION',
  ]) {
    assert.equal(serialized.includes(privateValue), false, 'private content reached application logs');
  }
});
