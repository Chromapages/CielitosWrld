# Reliable inquiries — P1 specification (APPROVED version 1)

Version: 1. Knowledge date: 2026-11-09. Human approved exact v1/D007 for planning (D009); no implementation or live verification. Owner: Orin Vance; builder roles: cielitos-dev / cielitos-ui; independent verifier: [UNASSIGNED]. Scope: CW-005/CW-006 and contact-only portions of CW-007/CW-028. Other tickets are not silently included. Original proposed bounds/targets below are now approved requirements, not measured outcomes. P2 plan still requires human approval.

## Open questions and risks FIRST
- Human approved Resend as a specification input, the discovery metric below, owner-inbox server configuration, and preserving content/images. No purchase, credential/DNS change, test send, migration or release approved.
- [ACCEPTED D007] Synchronous provider acceptance without a separate application inbox/outbox. This reduces moving parts but cannot accept inquiries while Resend is unavailable; visitors must retain/retry their message. Durable private inbox/retry worker is the explicit alternative if requirements change, requiring a spec decision rather than a silent patch.
- [UNKNOWN] Approved sender/recipient/test inbox, domain verification, nonproduction credentials, hosting/log export with retention, privacy restrictions and actual traffic. These are prerequisites to live verification/launch, not values to guess. No personal contact values copied from source.
- Human authorized per-command repository-only trust and bounded source reading without contact-value copying/reuse (D009). No global trust, credentials, installs, build, live operations or independent-verifier assignment implied. Pre-existing modified package-lock.json must remain untouched.

## 1. Problem, user, goal, metric and guardrails
Human-confirmed P0 problem: prospective clients need reliable inquiries; current API logs content and reports sent without emailing or storing it. Lost inquiries/traffic are Unknown; source evidence is not user research.

Goal: submit validated inquiry content to the approved owner inbox through Resend, returning only a truthful provider-acceptance state, and expose the evidence required for the approved delivery baseline.

Accepted metric definition: establish a baseline during the first two weeks of an authorized rollout for the share of valid, unique public submissions with a matching Resend recipient-mail-server delivery event within 24 hours of submission. Exclude invalid, honeypot-positive, repeated submission IDs and server-tagged synthetic tests. Report denominator/sample size, unresolved sends, and data gaps separately. These are approved observation windows, not measured performance or an improvement claim. No baseline exists. Do not equate mail-server acceptance with inbox placement or reading.

Guardrails: no false delivery/durable-storage claims; no submitted fields in application logs; no silent loss after a claimed durable receipt; no unapproved content mutation, spend or data destination. This design claims provider acceptance only, never application durable receipt.

## 2. Scope and non-goals
In: existing contact API and form, one shared request/error contract, server validation/budget preservation, truthful normal/failure states, same-request retry identity, privacy-safe metadata events, environment documentation and contact-focused regression checks. Preserve existing layout/brand.
Out: new Sanity account/project migration, gallery/blog/reviews/comments changes, automatic confirmation emails, attachments, CRM, marketing tracking, a generic provider framework, an application database/outbox, background retries, custom delivery-webhook receiver and unrelated cleanup/toolchain upgrades. Measurement uses approved host-log export plus provider delivery evidence; it is not omitted. If that operational method is rejected/unavailable, revise this spec before build/release rather than claim the metric is measurable.

## 3. User stories and observable acceptance criteria
- AC1: A valid synthetic inquiry sends name, reply address, selected budget and message to the fixed approved test recipient, with a fixed configured verified sender; browser input cannot select recipient/sender or inject headers.
- AC2: Only a successful Resend response with a valid provider message ID produces HTTP 202/provider_accepted; the UI says exactly “Submitted for delivery” and “The email service accepted your inquiry. Inbox delivery is not yet confirmed.” No inbox/durable-receipt claim.
- AC3: Invalid/malformed/oversize/unsupported-origin/type input invokes no provider send and shows the defined error while retaining valid fields; budget survives normal processing and invalid budget is rejected.
- AC4: Missing configuration, provider rejection/quota, timeout/offline, malformed provider responses and internal errors never produce success or clear entered fields; unknown-send outcome explicitly offers same-submission retry.
- AC5: Repeating an unchanged submission with its original ID inside Resend's 24-hour idempotency window cannot create another provider email; edited content uses a new ID only after a known failure or explicit warning about an unresolved prior send. No exactly-once claim beyond that window.
- AC6: Keyboard/assistive-technology users can identify fields/errors, hear pending/result state and recover without alert dialogs, lost focus or erased data at the approved viewport matrix.
- AC7: Captured application logs contain only approved event metadata and no name/email/budget/message/token/provider response body. Correlated valid/accepted/failure events and provider delivery evidence support the baseline procedure or explicitly mark missing data.
- AC8: Disabled configuration/rollout fails closed; tests cannot address the production inbox. Existing content/assets, unrelated routes, protected files and baseline checks are not weakened.

## 4. Behavior in all states
Initial/empty: retain existing fields and budget choices, visible or programmatic labels; no send until valid. Pending: one in-flight request, frozen payload, disabled duplicate submit, announced “Submitting…”; no data cleared. Validation: inline field messages, focus first invalid field, preserve other values. Known failure/config-disabled/quota: actionable generic inline error, fields retained/editable, no raw provider error. Offline/network/timeout or malformed response after send: “Delivery status is unknown. Retry this same submission to avoid sending a duplicate.” Retain ID/payload; retry uses identical payload. If starting an edited message while previous outcome is unknown, show an explicit duplicate-risk confirmation; never silently replace identity. After 24 hours, same-ID retry is not guaranteed safe: refuse automatic retry and show the approved owner-contact/support guidance without exposing guessed contact values.

Accepted: exact AC2 copy in a focusable announced result panel; clear fields only after well-formed 202, retain receipt/reference ID for support; “Send another message” creates a fresh ID and restores focus. Permission-denied cross-origin requests return 403 with no send. Test/production mode is server-owned; no client override. Empty/missing configuration never falls back to source mailbox values, console logging of content, mock delivery or a public Sanity write.

## 5. Data and interface contracts
Keep JSON POST /api/contact, clean-cut internal UI/API cutover; no legacy success shim. Shared TypeScript/Zod contract is the single source of field validation for this path. No external consumers are known; document the response change and fail old payloads truthfully.

Request: submissionId (UUID), createdAt (client timestamp used only for local retry-window UX, not trusted for metrics), name (trim, 2–100 characters), email (trim, valid email, max 254, no CR/LF), budget (one of 500-1000 / 1000-2500 / 2500-5000 / 5000-10000 / 10000+), message (trim, 10–5000 characters), gotcha (optional honeypot, empty for eligible submissions). Limits are PROPOSED acceptance bounds, not observed user needs. JSON must be an object, not null/array; reject unsupported types/unknown public contract fields. Reject non-JSON 415; body over 16 KiB 413 before unbounded buffering; malformed JSON/invalid fields 400. An Origin header, if supplied, must equal request origin; mismatch 403. No Origin is not authentication and does not prevent bots.

Responses, Cache-Control: no-store:
- 202: {status:'provider_accepted', submissionId, message:'Submitted for delivery'} only after provider acceptance/ID validation.
- 400: {status:'invalid', message, fieldErrors?}; 403: {status:'rejected', message}; 413/415: {status:'invalid', message}.
- 503: {status:'unavailable', message} for disabled/missing/invalid configuration and known quota/service rejection. No secret/provider body exposed.
- 409: {status:'conflict', message} for same-ID/different-body or concurrent provider request; preserve identity and do not claim success.
- 504 or 502 after possible provider send: {status:'unknown', submissionId, message}; a generic unexpected local failure is 500 and never success.
- Honeypot-positive: generic 400/rejected, no provider call, not a fake success.

Server configuration: CONTACT_ENABLED (explicit true to send), RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, CONTACT_TEST_MODE (server-owned telemetry tag). Sending API key remains server-only and domain-restricted where supported. Destination is configured owner inbox; test environment uses separately approved destination. No actual values in repo. Fixed subject; plain-text body; validated visitor email becomes Reply-To only. Direct HTTPS to Resend /emails with Idempotency-Key derived from submissionId and no automatic HTTP retries. Do not permit a caller-controlled provider URL. Canonical payload must remain stable on retry; avoid changing timestamps in provider body. Do not install SDKs.

Data ownership: site owner controls inquiry content and access; Resend/mailbox process personal data under human-approved policy. No content is written to Sanity. Metadata logs contain event, submissionId, server timestamp, allowed result/error code, optional provider ID, and server-owned test tag only; no IP, headers, submitted fields or raw exceptions. Provider retention and legal obligations require human acceptance.

## 6. Failure and recovery invariants
Provider not called => no acceptance. Provider returns acceptance => response may acknowledge only that state. Network uncertainty => retain payload and same identity, never report definite failure/delivery or silently resend as a new inquiry. Quota/auth/domain rejection => fail closed and operator fixes configuration/limit; no paid upgrade or alternate destination. Restarts/serverless concurrency must not rely on an in-memory dedup map; use provider idempotency within its documented window. Email transport after acceptance is provider-owned; operator follows bounce/failed/suppressed/unresolved events and checks real test inbox during authorized verification. No durable local recovery promise. If durable receipt during provider outages is required, reject D007 and return to architecture/spec rather than add an unaudited public datastore.

## 7. Non-functional requirements and verification
PROPOSED targets, requiring approval: abort outbound provider wait at 10 seconds; for deterministic provider fixtures every API path terminates within 12 seconds. Verify with controlled latency/timeout scenarios; this is not a claim about production p95. Runtime/hosting timeout must permit this before release.

Delivery SLI: approved metric fraction over first two-week window; SLO initially “establish complete baseline”, not a fabricated success percentage. Completeness indicator: eligible request IDs with terminal provider evidence versus all eligible IDs; missing evidence is unresolved, never silently removed. No numeric production error budget until baseline/traffic supports one. Correctness budget: any false-success, secret/PII log exposure or wrong destination blocks advancement immediately.

Security/privacy: fixed server destination, validated Reply-To, no arbitrary HTML/attachments, bounded input, no source email fallback, no sensitive logs, production send requires explicit enable/config. Honeypot/origin checks do not equal rate limiting; quota exhaustion by bots remains a launch risk. Human must approve adequate hosting abuse controls or require a spec revision before public enablement.

Accessibility target PROPOSED: contact-form states meet relevant WCAG 2.2 AA keyboard, labels, error association, focus and status-message requirements; fresh manual keyboard/screen-reader check plus deterministic contract tests, not an entire-site conformance claim. Responsive review PROPOSED: 320/640/768/1280 CSS px, long valid text and reduced motion; preserve current visual hierarchy.

Cost cap PROPOSED: no purchases/overages and no automatic upgrades; provider Free allowance is documented capacity, not estimated site demand. No bundle SDK or unrelated dependency changes. Independent verifier must test guards/failure paths and report lab/field limits separately.

## 8. Dependencies, owners, assumptions and risks
Lead: spec, decisions, human gates, baseline runbook. Dev: API/shared contract/private metadata; UI: form only after contract is frozen; dev owns integration. One writer per file. Fresh independent verifier/human checks AC1–8; author cannot self-verify.

Dependencies before build: P1/P2 approvals, repository-specific trust authorization, protected-file scope, finite agent budgets and branch/worktree permissions. Before live checks: approved nonproduction Sanity config to render actual Contact page, verified sender, scoped key, approved synthetic/test inbox, hosting/timeout and log export. Before release: privacy/retention and abuse controls, named operator/verifier/release approver, measured acceptance evidence and rollback access. All literal environment values remain [HUMAN CONFIGURES OUTSIDE CHAT]. Preserve existing content/images; account transition stays separately gated.

## 9. Measurement and observability
Emit contact.received only after eligible server validation with server-owned timestamp/test tag; contact.provider_accepted only after valid provider result; contact.failed/unknown with safe class, plus submission ID. Deduplicate received IDs in baseline export; repeated attempts do not increase denominator. Invalid and honeypot-positive traffic can have aggregate safe counts, not logged bodies. Use only server test-mode tagging for exclusions.

Operational baseline method: approved host exports structured metadata for at least the two-week collection plus 24-hour final observation tail; operator correlates provider email IDs/tags with Resend delivery events/dashboard evidence, without exporting bodies into analytics. Store only approved minimal metadata/access-restricted reports. Compute approved fraction and sample size; list failed, bounced, suppressed, unknown, delayed and missing-log cases separately. Manual evidence capture is permitted for this first increment; no unapproved webhook/warehouse/analytics vendor. Missing export retention/access is a release blocker, not evidence of success. No causal uplift claim from a single baseline.

## 10. Rollout, monitoring and rollback
No autonomous deploy or real send. CONTACT_ENABLED defaults off; no fake delivery when off. First run deterministic local API/form scenarios; then human-authorized preview with provider synthetic scenarios; then separately approved real test inbox check (mail-server event plus inbox observation recorded independently). No public enablement without all launch prerequisites.

Human authorizes a bounded initial exposure stage and observation window in P2/P5; exact traffic split/duration remains [HUMAN APPROVAL], not invented here. Operator watches eligible/accepted/failure/unknown counts, provider quota, wrong-recipient/PII events and metric completeness. Any false success, wrong destination or private-data exposure => disable sending immediately through the approved operator, preserve evidence without content and return defect to P3/new branch. Revert to safe-disabled state, NOT the old false-success handler. Provider outage/quota risk pauses exposure; thresholds require human approval based on baseline. Human decides expansion; remove temporary rollout controls only after an approved completed rollout.

## Approval request
Approve/reject this exact version and D007 synchronous provider-acceptance trade-off. Approval is not a purchase, credential/DNS change, migration, live-send or deployment authorization. P2 must still provide estimates from builders, exact file ownership, proving commands, finite caps and an independent check owner; unresolved release prerequisites remain explicit blockers.
