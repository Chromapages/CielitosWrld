# JOB
Assess frontend feasibility and propose a bounded ContactForm task slice, review scenarios and conditional effort ranges for the approved inquiry spec; do not implement or verify it.

# CONTEXT
Human explicitly approved docs/specs/reliable-inquiries.md version 1 and D007, repository-only per-command Git trust and bounded source reading without copying/reusing personal fallback values. P2 planning only; no implementation plan approval. Resend Free selected, no upgrades. Accepted design: provider acceptance only, browser retains input on failure/unknown, same-ID canonical retry within provider's 24-hour window, no app database/outbox, preserve current brand/content. Dev owns API/shared contracts; UI owns only ContactForm after contract freeze. Initial trusted Git status is main...origin/main with pre-existing modified package-lock.json plus untracked lead coordination docs; no staging/reset/editing. Missing Sanity env/runtime and lint command defects already known, do not rerun.

# BOUNDARIES
Read-only: no edits, Git/branch/index mutations, tests/build/lint/formatters, servers/browser, installs, live API/CMS/email, credentials or subagents. Scope components/contact/ContactForm.tsx and nearby existing UI error/focus patterns as needed, lib contract/types, app contact/layout dependencies, package metadata and approved spec. Preserve layout/copy unless exact spec approves state text. Don't invent extra UX, telemetry, caps, destinations, design tokens or acceptance objectives. No other gallery/blog redesign. Source values are not authorized recipients/fixtures. This is builder feasibility, not independent acceptance verification.

# OUTPUT CONTRACT
Return compact bullets, not a wrapped table, max 120 lines: (1) feasible / specific spec ambiguities needing P1 decision; (2) exact UI-only file ownership and dependency on frozen dev contract, avoiding shared-file concurrent writes; (3) how each pending/error/unknown/retry/success/offline/focus behavior maps to existing UI; (4) actual available proving commands or browser scenarios with prerequisites and NOT RUN; (5) estimated time/pass ranges with assumptions/breakers, or Unknown; (6) nonproduction config/input/independent-review needs. Do not specify a new test framework by habit. One acceptance criterion: source-backed UI boundaries/states/checks/ranges returned without mutations. Finish with exact marker CW-P2-UI-REPORT-COMPLETE.

# STOP CONDITIONS
One pass, at most 30 source reads and 6 minutes active. No known-failure rerun. Stop/report missing contracts, source change collision, secret, scope ambiguity, permission prompt or cap; do not resolve a spec flaw by guessing. No implementation loops. Return done-unverified report, then idle.
