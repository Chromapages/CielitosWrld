# Inquiry increment — P2 priority inputs (proposal)

Knowledge date: 2026-11-09. Approved direction/spec: D004–D009 and docs/specs/reliable-inquiries.md v1. This is not a build authorization or verified delivery plan.

## Framework and limits
Use dependency-first MoSCoW for the first outcome, not RICE: reach, lost inquiry volume, conversion impact and measured effort are Unknown, so numeric scores would fabricate precision. Human already selected reliable inquiries first. Prior source shows a false-success handler; that is correctness evidence, not measured business loss. Builder feasibility/estimate reports supply ranges, assumptions and commands; no lead-authored estimate will substitute for them.

## Proposed order and trade
1. MUST: freeze one contact request/response contract and API acceptance/failure behavior (CW-005/006, contact-only CW-007). Prerequisite to truthful UI; no SDK, database or live send.
2. MUST: integrate ContactForm states, budget, same-ID retry and accessible recovery against the frozen contract (CW-005/006). Sequential shared-checkout writer; preserve design/content.
3. MUST: independent AC1–8 checks, metadata/baseline/environment runbook and draft PR evidence, including failures and protected-file boundaries. A passing local check is not inbox delivery.
4. BLOCKED RELEASE DEPENDENCIES: actual nonproduction configuration/domain/inbox/log export, privacy/abuse and human-authorized synthetic/real inbox checks. Missing Sanity configuration blocks full-page browser proof; do not present a mock as the actual site.
5. DEFERRED: Sanity project/content transition, gallery/blog/reviews, new auth/CRM, auto-replies, outbox/retry service, dashboard, extra infrastructure, broad cleanup/toolchain repair. These do not fit the accepted first increment and need their own approval. Existing content preservation remains mandatory.

## Now / next / later
- Now (conditional on P2 approval): bounded local implementation and independent local API/form checks without account or provider calls.
- Next (conditional on configured preview and separate authorization): real rendered Contact page, provider synthetic scenarios, approved real test inbox evidence and measurement readiness; then P5 recommendation, not autonomous ship.
- Later: authorized rollout and baseline collection; analyze sample/data limits before any uplift claim, then decide the next backlog increment.

No calendar dates or delivery commitment: budget/deadline and live-access lead time are Unknown. A critical path or time range is not defensible until dev/UI inputs are delivered. Quote estimates as estimates and keep credential/domain/operator delays separate from engineering work.

## Guard and ownership invariants
One writer per file; different tabs are not isolation. Proposed branch flow is sequential task branches in the existing checkout, avoiding worktree copies that could drop the user's modified lockfile or require unapproved installs. Preserve unstaged package-lock.json; stage only explicit owned files, never git add . or stash/reset. No commits to main, merges, deploys, force-pushes, dependency/threshold changes or real data.

Lifecycle caveat: existing omp detector falls back to idle; the previous --wait prompt false-negative is known. Do not run uncapped automatic loops or treat idle as done. Planning is single-pass; inspect actual returned report. P2 plan must explicitly state how bounded implementation completion and independent checks are evidenced and how any unrecognized prompt becomes a human gate.
