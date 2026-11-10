# Reliable inquiries — specification v2 (APPROVED clarification)

Date: 2026-11-09. Owner: Orin Vance. Effective v2 means the complete ten-part v1 at reliable-inquiries.md PLUS the explicit overrides below; these overrides take precedence. V1 is not silently edited. D007's accepted synchronous Resend/no-app-outbox architecture, Free-tier/no-paid-change limit and preservation of existing content/images remain unchanged. No code or runtime proof. Both builders identified these missing decisions in P2; affected planning returned to P1. Evidence: docs/plans/inquiry-builder-findings.md.

## Open decisions first
Human approved v2/D010 explicitly on 2026-11-09; P2 planning may resume. Conflicts/possibly-sent outcomes remain immutable/unknown; test safety uses isolated fixtures/egress-denying tests plus separately authorized environments, not CONTACT_TEST_MODE alone. No new datastore, SDK, config field, live permission or backlog feature. P2 plan approval remains required before implementation.

## 1. Problem, goal, metric and guardrails
V1/D006 unchanged: reliable client inquiries, provider-acceptance-only UI, first-two-weeks baseline for eligible unique submissions delivered to owner's mail server within 24 hours, explicit exclusions/sample/unresolved/data gaps. No measured uplift, inbox-placement guarantee or application durable receipt. Aggregate rejected/invalid/quota counts remain diagnostics so excluding them cannot hide a broken form.

## 2. Scope and non-goals
Only clarify the approved contact increment's validation, machine states, copy, identity and test isolation. No additional business feature. Full-page runtime still requires approved Sanity configuration; no mock can substitute for actual rendered site verification. Protected config/test-file assignments, native test-runner pilot, branch/worktree choice, budgets and independent checker remain P2 decisions.

## 3. Acceptance criteria clarification
AC1–8 remain. Specifically: AC2 requires a matching submissionId and valid response contract, not response.ok; AC4 treats every possibly-sent error as unknown; AC5 does not generate a new ID on conflict; AC6 uses the exact static copy/state table below and has no guessable support address; AC8 applies the explicit test-isolation contract in section 7. Exact copy is approved product behavior, not a request for permanent tests pinned to incidental wording.

## 4. UI states, exact recovery copy and focus
Keep existing form labels/budget options/layout. Do not expose raw server/provider exception text. Static catalog:
- Submit: “Send message”; pending: “Submitting…”; known-failure action: “Try again”; ambiguous/conflict retry: “Retry same submission”; accepted reset: “Send another message”.
- General validation summary: “Please check the highlighted fields.”
- Name error: “Enter a name between 2 and 100 characters.” Email: “Enter a valid email address.” Budget: “Choose a budget range.” Message: “Enter a message between 10 and 5,000 characters.”
- Invalid internal request/unsupported JSON: “We couldn't submit this form. Reload the page and try again.” Oversize: “Your message is too large. Shorten it and try again.”
- Origin denial: “This request couldn't be accepted. Reload the contact page and try again.” Honeypot rejection: “We couldn't submit this form. Please check your input.”
- Disabled/configuration/definite provider rejection/quota: “Email submission is unavailable right now. Your message is still here. Please try again later.”
- Local pre-send internal failure: “We couldn't submit your inquiry. Your message is still here. Please try again.”
- Unknown/network/malformed success/possibly-sent server error: v1 exact copy “Delivery status is unknown. Retry this same submission to avoid sending a duplicate.”
- Concurrent request: “This submission is still being processed. Retry the same submission later.” Changed-body identity conflict: “This reference is already associated with different content. Its delivery may be unresolved. Keep this reference before starting a new message.” Both are unresolved and preserve the original snapshot.
- Expired retry: “Retry window expired. Your inquiry may already have been sent. Keep your reference and use another verified contact method listed on this page for help. Do not retry automatically.” Render the UUID reference separately. Human must confirm visible contact methods before public enablement; no new address is guessed, copied into a fixture or made a send target.
- Unknown-edit confirmation: “Your previous inquiry may already have been sent. Starting a new message can create a duplicate. Start a new message anyway?” Controls: “Keep previous submission” / “Start new message”. Use an accessible inline confirmation with focus recovery, not alert()/blocking browser dialogs.
- Accepted heading/body remain exactly v1 AC2. The support reference is submissionId; no second receipt field is invented.

Initial/failures: fields retain values; known-unsent failures allow editing. Pending AND unknown/conflict freeze field values and canonical snapshot until same-request retry or explicit new-message confirmation. Field errors are associated via aria-describedby/aria-invalid; focus first visible invalid field. General error/status result is focusable/announced; do not move focus on every keystroke. Entering confirmation moves focus to its heading/first action; cancel returns to prior retry/action; confirming unlocks a fresh message. Accepted/reset focus behavior remains v1. A retry-expired message offers the same explicit new-message confirmation if the visitor chooses to proceed.

## 5. Shared data and interface contract — explicit freeze
One browser-safe lib/contact.ts exports contactSubmissionSchema, contactResponseSchema, ContactSubmission, ContactResponse, ContactFieldErrors and CONTACT_BUDGET_OPTIONS; no keys, server config or provider client in the module. UI imports this contract; API validates through it; remove obsolete contact-only declarations without re-export shims. Actual edit ownership remains P2-gated.

Request normalization: name/email/message trim leading/trailing whitespace; preserve internal whitespace/case. UUID submissionId normalizes to lowercase. createdAt must be a valid ISO-8601 UTC datetime ending Z, normalize through its parsed UTC ISO representation; it is NOT trusted for delivery metrics or server dedup expiry. Length limits use JavaScript string length consistently in browser/server. Budget uses exact v1 enum, no normalization. gotcha is optional string of at most 200 code units; empty/absent is eligible. Any nonempty raw gotcha, including whitespace, is honeypot-positive (400/rejected); nonstring/too-long is invalid generic 400. Nonvisible control errors go to general summary, not a hidden focus target. Unknown keys/null/arrays/types fail strict input validation. FieldErrors is optional Partial<Record<'name'|'email'|'budget'|'message', string[]>>, each included array has the one static corresponding field message from section 4; never return raw Zod/provider errors.

Response fields: every response has status, code and message from the fixed catalog; include submissionId only when a canonical valid UUID is known. Provider acceptance requires it. fieldErrors is allowed only for invalid field input. No provider ID, token or personal data is returned to the browser. UI validates complete allowed shape, matching ID where present, and exact HTTP/status/code compatibility. Any unrecognized/mismatched/truncated/HTML response after submission is unknown and must not clear input.

| HTTP | status | code | Delivery interpretation |
|---|---|---|---|
| 202 | provider_accepted | accepted | Proven provider acceptance only; valid matching submissionId required |
| 400 | invalid | validation_error or invalid_request | Definitely not sent; fieldErrors only for visible field validation |
| 400 | rejected | rejected | Honeypot-positive, definitely not sent; explicit exception to 400/invalid |
| 403 | rejected | origin_rejected | Definitely not sent |
| 413 | invalid | payload_too_large | Definitely not sent |
| 415 | invalid | unsupported_media_type | Definitely not sent |
| 503 | unavailable | unavailable | Disabled/missing/invalid config or definite upstream rejection/quota; not accepted |
| 409 | conflict | in_progress or identity_conflict | Prior/parallel send unresolved; retain ID/payload |
| 500 | unavailable | internal_error | Allowed ONLY for local failures before invoking outbound transport |
| 502 | unknown | unknown | Malformed successful provider body, ambiguous upstream 5xx or exception after outbound may have begun |
| 504 | unknown | unknown | Provider timeout/transport uncertainty |

Cache-Control no-store on all cases. Public message is the relevant static section-4 text (accepted message “Submitted for delivery”); no parsing of free-text message determines safety. An unexpected server 500 seen by the browser is conservatively unknown unless a valid known-unsent 500/internal_error contract is present. This replaces v1's unspecified 500 shape; it does not claim provider errors are definitely unsent.

Provider success-ID policy: a successful 2xx JSON response must contain id with UUID syntax (no particular UUID version), otherwise unknown. Official send API example shows a UUID; this is a conservative acceptance policy, not a claim of a formal provider guarantee. If authoritative/live evidence changes format, return to P1; never silently accept a mock result.

Canonical provider request: fixed configured from/to/subject, validated reply_to, plain-text labeled name/email/budget/message, tags for canonical submissionId and server-owned test mode. Exclude changing request times/attempt counters. Unchanged normalized payload and same config must produce identical body and Idempotency-Key contact/<submissionId> on retry. No caller-selected recipient, sender, URL, subject or tags.

Provider semantics (Documented, not locally verified): Resend retains send idempotency keys for 24 hours; same key/body replays response; concurrent same-key request can return concurrent_idempotent_requests/409; changed-body same key returns invalid_idempotent_request/409. Map those to in_progress / identity_conflict. Definite upstream 4xx auth/validation/quota failures may map to unavailable; upstream 5xx/transport uncertainty do not prove no send and map to unknown. Do not forward raw upstream errors. Sources: https://resend.com/docs/api-reference/errors ; https://resend.com/docs/dashboard/emails/idempotency-keys ; https://resend.com/docs/api-reference/emails/send-email . Live dedup requires separate authorized provider evidence, not fixture echoes.

## 6. Identity, retry expiry and failure recovery
Mint UUID and createdAt at first validated submission, not initial page mount; freeze the canonical object. Duplicate button activation is synchronously guarded. Unchanged known-unsent retry can retain the ID; editing after known failure creates a fresh ID/time only when a new canonical submission is made. Unknown/conflict never implies permission to create a fresh ID; require the explicit section-4 confirmation.

Use the first-attempt local wall-clock AND monotonic elapsed readings for the current page session; expire retry when either shows 24 hours elapsed. Forward clock change may expire early (safe); backward wall-clock change cannot extend the monotonic window. No persistence/reload recovery promise: reference/draft are in memory, not localStorage; warn against navigation while pending/unknown rather than claiming durable storage. After expiry no automatic send; expose guidance/explicit new-message confirmation. Server createdAt is validated input only; metrics use server timestamps, provider dedup remains vendor-owned. No permanent exactly-once claim.

## 7. Non-functional and test-isolation clarification
V1 bounds/targets apply. Its 12-second lab response target assumes a fully supplied bounded request fixture; it is not an unproved slow-upload/production-latency guarantee. Hosting request/body/time limits and abuse controls remain a release prerequisite. No invented production percentile or error budget.

CONTACT_TEST_MODE stays a server-owned metadata tag, NOT a recipient-safety control. Deterministic API tests must run isolated synthetic env, replace outbound transport with an interceptor that rejects ANY unexpected/real egress and only returns explicit fixtures, and use reserved synthetic addresses. Tests must never read actual .env/local credentials or use the original fetch as a fallback. UI fixture interception prevents server delivery and proves UI only. No live integration test runs by default.

Provider synthetic checks require a separately authorized nonproduction configuration and documented resend.dev synthetic destinations; real inbox checks are separate manual-authorized evidence with a named test recipient, never arbitrary automation or production fixtures. No additional recipient config variable/service is introduced. Literal destinations/domain/key and boundary enforcement are checked independently before live checks; sending remains disabled otherwise.

Potential tsconfig allowImportingTsExtensions and native node:test path are P2 protected-file scope requests, not approvals here; no SDK/framework/lockfile churn or weakened tests. Build success still cannot replace typecheck or independent acceptance.

## 8. Dependencies, assumptions and ownership
No production file assignment until P2 human approval. Dev owns shared contract/API integration; UI owns ContactForm after freeze. Lead owns this spec; no self-verification. Native runner feasibility, protected config scope, dirty-lockfile handling, branch/worktree resources, realistic estimates/caps and a fresh verifier still need P2 decisions. Domain/config/log export/privacy/test inbox remain live/launch gates. Preserve all pre-existing changes/content/images.

## 9. Analytics and baseline
V1 event names, data minimization, server timestamps, unique-ID denominator and approved exclusions/observation windows stay unchanged. Successful response provider IDs/tags correlate to owner mail-server delivery evidence, including unknown attempts where provider received a tagged request. Missing evidence remains unresolved; no fake completeness. Manual operator export requires approved host retention covering collection plus final observation tail; no new webhook/storage platform is smuggled in.

## 10. Rollout, rollback and approval
V1 safe-disabled rollout/rollback and human release authority unchanged. Approving v2 resolves listed build-contract questions only, not infrastructure/credentials, live sends, native runner success, new tests/config edits, a P2 plan, independent verification or deployment. After approval, P2 must assign exact files/resources, proving commands, finite passes and independent acceptance checks. If a further actual spec flaw appears, stop affected work and make another explicit decision; do not patch silently.
