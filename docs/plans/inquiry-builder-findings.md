# P2 builder findings — source reports, 2026-11-09

Reports from existing herdr agents cielitos-dev (wK:p2) and cielitos-ui (wK:p3), both ended with their explicit CW-P2-*-REPORT-COMPLETE markers. They report no file/Git/environment changes and no tests/builds/live sends. These are builder planning opinions, not independent verification. Lead did not rerun their proposed checks.

## Developer report
Conditional technical feasibility without SDK/datastore/worker/dependency changes. Required P1 clarifications: createdAt and honeypot validation; valid provider-ID policy; 400/rejected honeypot exception; canonical same-payload and authoritative provider conflict semantics; test/production isolation (CONTACT_TEST_MODE was only metadata); approved expiry/support guidance. No code permitted until decisions are recorded.

Proposed owned files (NOT assigned for build): app/api/contact/route.ts, new lib/contact.ts, existing lib/types.ts and lib/types/index.ts removing obsolete contact interfaces, new tests/contact.test.cjs, .env.local.example and a narrowly scoped tsconfig.json allowImportingTsExtensions flag. UI separately owns ContactForm. No package/lock/CI changes. LSP unavailable; text references found current API import and three contact declarations. Installed Node v24.11.1, Next 16.0.7, TypeScript 5.2.2, ESLint 8.49.0, Zod 3.25.76 reported from metadata/help, not behavior checks.

Suggested proof path, NOT RUN: Node native stripping + node:test with native Web Request/Response, relative .ts imports; node --test --test-concurrency=1 tests/contact.test.cjs. Separate tsc --noEmit --incremental false --pretty false; direct ESLint on owned files if compatible. Native test path/config compatibility remains unproven. Do not rerun removed next lint or missing-Sanity startup. Real full-page proof needs approved nonproduction config.

Proposed permanent tests cover malformed/type/boundary/budget/stream-limit inputs, no-send guards, fixed destination/Reply-To, valid acceptance versus all failure/unknown/conflict cases, stable payload/key on retry, no-store and redacted metadata. Mock transport proves application contracts only, never Resend dedup/delivery. Controlled actual delay would exercise timeout. UI/focus needs real browser, not source tests.

Estimate: elapsed engineering time **Unknown**; developer refused a range without timing calibration or proven test path. Conditional pass envelope: implementation, integration/check, separately authorized correction. Do not fabricate a sum from this. Developer recommends an isolated feature worktree; lead has not chosen branch/worktree resources. Dirty lockfile and untracked docs must not be copied/stashed/reset wholesale.

Commands actually reported: Node version, Node/Next/TypeScript/ESLint help only. No tests, build, lint, browser/server, network services or personal-data reuse.

## UI report
Conditional feasibility within components/contact/ContactForm.tsx, after the shared contract is frozen. Required P1 clarification: exact static error/recovery/confirmation copy, fieldErrors shape, response parsing/normalization, 409 unresolved classification, 500 pre-send versus unknown, receipt reference = echoed submissionId, immutable pending/unknown fields, retry expiry and clock changes. Existing React/native controls/Zod suffice; no extra library needed. No scoped reusable inline-error/focus pattern found.

Proposed UI-only ownership: ContactForm.tsx. Dev owns shared schema/API integration; no simultaneous shared-file writes. State plan retains fields, replaces response.ok with strict 202/body/matching-ID validation, handles unknown with identical retry snapshot, explicitly confirms edited unknown messages, and restores focus. Browser response interception proves UI only, not actual delivery.

UI estimate **8–14 active hours, estimated not measured**: implementation 5–8, author checks 2–4, correction 1–2. Assumes frozen contracts/copy, usable nonproduction page, authorized proof tools and at most one correction. Excludes API/dev, decisions, environment/toolchain repair, independent verification, live sends/rollout. Elapsed schedule remains Unknown. This is not a commitment or instruction to run uncapped sessions.

Proposed scenarios, NOT RUN: double-submit, delay, field errors, known/config failure, 409, network loss, malformed/mismatched success, stable retry body/ID, unknown-edit confirmation, expiry; keyboard/screen-reader/focus and approved viewport/reduced-motion cases. Typecheck optional; runtime blocked by missing approved nonproduction Sanity configuration. No test framework introduced.

## Lead disposition
A spec flaw discovered in P2 returns affected work to P1 under D001; no silent patch or implementation. Preparing explicit v2 clarification for human approval. P2 plan and build remain blocked. No new GitHub issues beyond prior cap, branches, PRs, code edits, installs, accounts or sends. Claimed report completion is done-unverified; no result upgraded to independently verified.
