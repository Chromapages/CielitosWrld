'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import {
  CONTACT_BUDGET_OPTIONS,
  contactResponseSchema,
  contactSubmissionSchema,
  type ContactFieldErrors,
  type ContactResponse,
  type ContactSubmission,
} from '@/lib/contact';

type FormField = keyof ContactFieldErrors;
type ContactDraft = Pick<ContactSubmission, 'name' | 'email' | 'message'> & {
  budget: ContactSubmission['budget'] | '';
};
type RecoveryState = { kind: 'unknown' | 'conflict'; message: string } | { kind: 'expired' };
type FormState =
  | { kind: 'initial' | 'pending' | 'confirmation' }
  | { kind: 'validation'; message: string; fieldErrors: ContactFieldErrors }
  | { kind: 'known-unsent'; message: string }
  | RecoveryState
  | { kind: 'accepted'; submissionId: string };
type FocusTarget = FormField | 'status' | 'confirmation' | 'new-message';
interface SubmissionAttempt {
  readonly payload: Readonly<ContactSubmission>;
  readonly body: string;
  readonly wallStarted: number;
  readonly monotonicStarted: number;
}

const EMPTY_DRAFT: ContactDraft = { name: '', email: '', budget: '', message: '' };
const FORM_FIELDS: readonly FormField[] = ['name', 'email', 'budget', 'message'];
const RETRY_WINDOW_MS = 24 * 60 * 60 * 1000;
const UNKNOWN_MESSAGE = 'Delivery status is unknown. Retry this same submission to avoid sending a duplicate.';
const EXPIRED_MESSAGE = 'Retry window expired. Your inquiry may already have been sent. Keep your reference and use another verified contact method listed on this page for help. Do not retry automatically.';
const INTERNAL_ERROR_MESSAGE = "We couldn't submit your inquiry. Your message is still here. Please try again.";
const INVALID_REQUEST_MESSAGE = "We couldn't submit this form. Reload the page and try again.";
const contactFieldsSchema = contactSubmissionSchema.pick({ name: true, email: true, budget: true, message: true });
const RESPONSE_HTTP_CODES: Record<ContactResponse['code'], readonly number[]> = {
  accepted: [202],
  validation_error: [400],
  invalid_request: [400],
  rejected: [400],
  origin_rejected: [403],
  payload_too_large: [413],
  unsupported_media_type: [415],
  unavailable: [503],
  in_progress: [409],
  identity_conflict: [409],
  internal_error: [500],
  unknown: [502, 504],
};

function canEdit(state: FormState) {
  return state.kind === 'initial' || state.kind === 'validation' || state.kind === 'known-unsent';
}

function isRecoveryState(state: FormState): state is RecoveryState {
  return state.kind === 'unknown' || state.kind === 'conflict' || state.kind === 'expired';
}

function retryRemaining(attempt: SubmissionAttempt) {
  return Math.min(
    RETRY_WINDOW_MS - (Date.now() - attempt.wallStarted),
    RETRY_WINDOW_MS - (performance.now() - attempt.monotonicStarted),
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactDraft>(EMPTY_DRAFT);
  const [state, setState] = useState<FormState>({ kind: 'initial' });
  const stateRef = useRef<FormState>(state);
  const attemptRef = useRef<SubmissionAttempt | null>(null);
  const inFlightRef = useRef(false);
  const previousRecoveryRef = useRef<RecoveryState | null>(null);
  const focusTargetRef = useRef<FocusTarget | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);
  const newMessageRef = useRef<HTMLButtonElement>(null);

  const transition = useCallback((next: FormState, focus: FocusTarget | null = null) => {
    stateRef.current = next;
    focusTargetRef.current = focus;
    setState(next);
  }, []);

  useEffect(() => {
    const target = focusTargetRef.current;
    focusTargetRef.current = null;
    if (target === 'status') statusRef.current?.focus();
    else if (target === 'confirmation') confirmationHeadingRef.current?.focus();
    else if (target === 'new-message') newMessageRef.current?.focus();
    else if (target) formRef.current?.querySelector<HTMLElement>(`[name="${target}"]`)?.focus();
  }, [state]);

  const fieldsLocked = !canEdit(state);
  const protectDraft = fieldsLocked && state.kind !== 'accepted';
  useEffect(() => {
    if (!protectDraft) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [protectDraft]);

  useEffect(() => {
    const attempt = attemptRef.current;
    if (!attempt || (state.kind !== 'known-unsent' && state.kind !== 'unknown' && state.kind !== 'conflict')) return;
    const expireRetry = () => {
      if (retryRemaining(attempt) <= 0 && !inFlightRef.current) {
        transition({ kind: 'expired' }, 'status');
      }
    };
    const timeout = window.setTimeout(expireRetry, Math.max(0, retryRemaining(attempt)));
    window.addEventListener('focus', expireRetry);
    document.addEventListener('visibilitychange', expireRetry);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('focus', expireRetry);
      document.removeEventListener('visibilitychange', expireRetry);
    };
  }, [state.kind, transition]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const current = stateRef.current;
    if (!canEdit(current)) return;
    const { name, value } = event.target;
    if (name !== 'name' && name !== 'email' && name !== 'budget' && name !== 'message') return;
    if (name === 'budget' && value !== '' && !CONTACT_BUDGET_OPTIONS.some(option => option.value === value)) return;
    setFormData(previous => ({ ...previous, [name]: value }));
    if (current.kind === 'validation') {
      const fieldErrors = { ...current.fieldErrors };
      delete fieldErrors[name];
      transition({ ...current, fieldErrors });
    } else if (current.kind === 'known-unsent') {
      transition({ kind: 'initial' });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const current = stateRef.current;
    if (inFlightRef.current || current.kind === 'pending' || current.kind === 'accepted' || current.kind === 'confirmation' || current.kind === 'expired') return;
    // React state alone does not block a second activation before the next render.
    inFlightRef.current = true;
    let transportStarted = false;
    try {
      let attempt = attemptRef.current;
      if (canEdit(current)) {
        const fields = contactFieldsSchema.safeParse(formData);
        if (!fields.success) {
          const issues = fields.error.flatten().fieldErrors;
          const fieldErrors: ContactFieldErrors = {};
          if (issues.name) fieldErrors.name = ['Enter a name between 2 and 100 characters.'];
          if (issues.email) fieldErrors.email = ['Enter a valid email address.'];
          if (issues.budget) fieldErrors.budget = ['Choose a budget range.'];
          if (issues.message) fieldErrors.message = ['Enter a message between 10 and 5,000 characters.'];
          transition({ kind: 'validation', message: 'Please check the highlighted fields.', fieldErrors }, FORM_FIELDS.find(field => fieldErrors[field]) || 'status');
          return;
        }
        const previousPayload = attempt?.payload;
        if (!previousPayload || FORM_FIELDS.some(field => fields.data[field] !== previousPayload[field])) {
          const wallStarted = Date.now();
          const monotonicStarted = performance.now();
          const submission = contactSubmissionSchema.safeParse({
            ...fields.data,
            submissionId: crypto.randomUUID(),
            createdAt: new Date(wallStarted).toISOString(),
          });
          if (!submission.success) {
            transition({ kind: 'known-unsent', message: INVALID_REQUEST_MESSAGE }, 'status');
            return;
          }
          // Store the canonical object and serialized body once; retries never rebuild either.
          attempt = Object.freeze({
            payload: Object.freeze(submission.data),
            body: JSON.stringify(submission.data),
            wallStarted,
            monotonicStarted,
          });
          attemptRef.current = attempt;
        }
      }
      if (!attempt) {
        transition({ kind: 'known-unsent', message: INTERNAL_ERROR_MESSAGE }, 'status');
        return;
      }
      if (retryRemaining(attempt) <= 0) {
        transition({ kind: 'expired' }, 'status');
        return;
      }
      transition({ kind: 'pending' }, 'status');
      transportStarted = true;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: attempt.body,
        cache: 'no-store',
        redirect: 'error',
      });
      const contentType = response.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
      if (contentType !== 'application/json') {
        transition({ kind: 'unknown', message: UNKNOWN_MESSAGE }, 'status');
        return;
      }
      const parsed = contactResponseSchema.safeParse(await response.json());
      if (!parsed.success || !RESPONSE_HTTP_CODES[parsed.data.code].includes(response.status) || (parsed.data.submissionId !== undefined && parsed.data.submissionId !== attempt.payload.submissionId)) {
        transition({ kind: 'unknown', message: UNKNOWN_MESSAGE }, 'status');
        return;
      }
      const result = parsed.data;
      if (result.code === 'accepted') {
        setFormData(EMPTY_DRAFT);
        transition({ kind: 'accepted', submissionId: result.submissionId }, 'status');
      } else if (result.code === 'unknown') {
        transition({ kind: 'unknown', message: result.message }, 'status');
      } else if (result.code === 'in_progress' || result.code === 'identity_conflict') {
        transition({ kind: 'conflict', message: result.message }, 'status');
      } else if (current.kind === 'unknown' || current.kind === 'conflict') {
        // A rejected retry cannot establish whether an earlier attempt was sent.
        transition({ kind: 'unknown', message: UNKNOWN_MESSAGE }, 'status');
      } else if (result.code === 'validation_error') {
        const fieldErrors = result.fieldErrors || {};
        transition({ kind: 'validation', message: result.message, fieldErrors }, FORM_FIELDS.find(field => fieldErrors[field]) || 'status');
      } else {
        transition({ kind: 'known-unsent', message: result.message }, 'status');
      }
    } catch {
      transition(transportStarted
        ? { kind: 'unknown', message: UNKNOWN_MESSAGE }
        : { kind: 'known-unsent', message: INTERNAL_ERROR_MESSAGE }, 'status');
    } finally {
      inFlightRef.current = false;
    }
  };

  const requestNewMessage = () => {
    const current = stateRef.current;
    if (!isRecoveryState(current) || inFlightRef.current) return;
    previousRecoveryRef.current = current;
    transition({ kind: 'confirmation' }, 'confirmation');
  };

  const keepPreviousSubmission = () => {
    const previous = previousRecoveryRef.current;
    if (stateRef.current.kind !== 'confirmation' || !previous) return;
    const attempt = attemptRef.current;
    transition(attempt && retryRemaining(attempt) <= 0 ? { kind: 'expired' } : previous, 'new-message');
  };

  const startNewMessage = () => {
    if (stateRef.current.kind !== 'confirmation' && stateRef.current.kind !== 'accepted') return;
    attemptRef.current = null;
    previousRecoveryRef.current = null;
    transition({ kind: 'initial' }, 'name');
  };

  if (state.kind === 'accepted') {
    return (
      <div className="text-center py-12">
        <div ref={statusRef} role="status" aria-live="polite" aria-atomic="true" aria-labelledby="contact-accepted-heading" tabIndex={-1} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-orange-600">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 id="contact-accepted-heading" className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            Submitted for delivery
          </h3>
          <p className="text-stone-700 dark:text-stone-300 mb-8 leading-relaxed max-w-md mx-auto">
            The email service accepted your inquiry. Inbox delivery is not yet confirmed.
          </p>
          <p className="text-sm break-all mb-8">{state.submissionId}</p>
          <button
            type="button"
            onClick={startNewMessage}
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const errors = state.kind === 'validation' ? state.fieldErrors : {};
  const displayState = state.kind === 'confirmation' ? previousRecoveryRef.current : state;
  const stateMessage = displayState?.kind === 'pending' ? 'Submitting…'
    : displayState?.kind === 'expired' ? EXPIRED_MESSAGE
      : displayState && 'message' in displayState ? displayState.message : null;
  const showReference = isRecoveryState(state) || state.kind === 'confirmation';

  return (
    <>
      <h2 className="text-4xl font-bold tracking-tight mb-8">Send a Message</h2>
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
        <div ref={statusRef} role="status" aria-live="polite" aria-atomic="true" tabIndex={-1} hidden={!stateMessage} className="text-stone-800 dark:text-stone-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-orange-600">
          <p>{stateMessage}</p>
          {showReference && attemptRef.current && (
            <p className="mt-2 text-sm break-all">{attemptRef.current.payload.submissionId}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={fieldsLocked}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              required
              placeholder="Full Name"
              className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 placeholder:text-black dark:placeholder:text-stone-500 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300"
            />
            {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-orange-700 dark:text-orange-400">{errors.name[0]}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={fieldsLocked}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              required
              placeholder="Email Address"
              className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 placeholder:text-black dark:placeholder:text-stone-500 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300"
            />
            {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-orange-700 dark:text-orange-400">{errors.email[0]}</p>}
          </div>
        </div>

        {/* Budget Field */}
        <div>
          <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="budget">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            disabled={fieldsLocked}
            aria-invalid={errors.budget ? true : undefined}
            aria-describedby={errors.budget ? 'contact-budget-error' : undefined}
            required
            className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300"
          >
            <option value="" className="text-black dark:text-stone-900">Select Budget Range</option>
            {CONTACT_BUDGET_OPTIONS.map(option => (
              <option key={option.value} value={option.value} className="dark:text-stone-900">{option.label}</option>
            ))}
          </select>
          {errors.budget && <p id="contact-budget-error" className="mt-2 text-sm text-orange-700 dark:text-orange-400">{errors.budget[0]}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium leading-6 mb-2 sr-only" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            readOnly={fieldsLocked}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            required
            rows={5}
            placeholder="Your Message..."
            className="block w-full rounded-none border-0 border-b-2 border-stone-300 dark:border-stone-700 bg-transparent py-3 text-black dark:text-stone-100 placeholder:text-black dark:placeholder:text-stone-500 focus:ring-0 focus:border-orange-600 dark:focus:border-orange-500 sm:text-base sm:leading-6 transition-colors duration-300 resize-none"
          />
          {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-orange-700 dark:text-orange-400">{errors.message[0]}</p>}
        </div>

        {state.kind === 'confirmation' ? (
          <section aria-labelledby="contact-confirmation-heading" className="space-y-4">
            <h3 id="contact-confirmation-heading" ref={confirmationHeadingRef} tabIndex={-1} className="font-bold focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-orange-600">
              Your previous inquiry may already have been sent. Starting a new message can create a duplicate. Start a new message anyway?
            </h3>
            <div className="flex flex-col gap-4">
              <button type="button" onClick={keepPreviousSubmission} className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                Keep previous submission
              </button>
              <button type="button" onClick={startNewMessage} className="rounded-lg border-2 border-orange-600 px-8 py-4 text-orange-600 hover:bg-orange-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors duration-300">
                Start new message
              </button>
            </div>
          </section>
        ) : (
          <div className="pt-4 space-y-4">
            {state.kind !== 'expired' && (
              <button
                type="submit"
                disabled={state.kind === 'pending'}
                className="flex w-full justify-center rounded-lg border-2 border-orange-600 px-8 py-4 text-lg font-extrabold leading-6 text-orange-600 hover:bg-orange-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.kind === 'pending' ? (
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin motion-reduce:animate-none" />
                    <span>Submitting…</span>
                  </span>
                ) : state.kind === 'unknown' || state.kind === 'conflict' ? 'Retry same submission'
                  : state.kind === 'known-unsent' ? 'Try again' : 'Send message'}
              </button>
            )}
            {isRecoveryState(state) && (
              <button ref={newMessageRef} type="button" onClick={requestNewMessage} className="w-full text-orange-600 hover:text-orange-700 font-medium underline underline-offset-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                Start new message
              </button>
            )}
          </div>
        )}
      </form>
    </>
  );
}
