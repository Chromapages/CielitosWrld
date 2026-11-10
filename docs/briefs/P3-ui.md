# JOB
Implement approved inquiry form states and immutable retry/focus behavior using the frozen shared contact contract, then report done-unverified without running checks mid-flight.

# CONTEXT
NOT ACTIVE until human approves docs/plans/2026-11-09-reliable-inquiries-plan.md v1, dev API report/commit completes, contract freezes and STATE assigns P3 UI. Effective v1 plus reliable-inquiries-v2.md governs exact copy/fields/error/clock/test rules. UI branch ticket/6-contact-form derives from the actual reported API commit; never invent IDs. Existing lockfile changes and lead state files are not yours. One Git/index owner; dev is idle during your source edits. Resend Free/no outbox, no inbox/durable receipt guarantee, content/images preserved.

# BOUNDARIES
ONLY components/contact/ContactForm.tsx may be edited/staged/committed. Shared lib/contact.ts exports are a dependency, not your edit permission. No app/contact/page/layout/styles/type/API/config/tests/docs/lock/package changes, installs/helpers/framework migration, services/browser/API/email, account/env/DNS, main commits/merge/deploy, force push or bulk staging. If another file is needed, stop/report; no silent scope addition. Preserve current layout/brand/field labels/budget choices. No real contact values/credentials in code or test input. Per-command repository trust only; preserve every unexpected user change. Do not modify tests/thresholds.

# OUTPUT CONTRACT
Single acceptance criterion: actual existing form consumes approved shared schemas and implements complete v2 initial/validation/pending/known-unsent/unknown/conflict/expired/confirmation/accepted/reset states without false success, lost input, unsafe identity changes or keyboard/focus regressions. Follow exact approved copy and reference=submissionId. Synchronous double-submit guard, canonical immutable request snapshot/ID, strict HTTP/status/code/body/matching-ID success, same-payload retry, conservative clock expiry, explicit unknown-edit confirmation and no browser persistence/durable promise. Programmatic labels, field associations, announced errors/results, focus restoration; no alert() or raw provider message rendering. Do not invent state/copy or mock success.

Skip tests/build/lint/formatters/browser mid-flight; separate fresh verifier gets actual surface after both code slices. Completion report: files/actual branch/commit and assigned boundaries, commands truly run versus NOT RUN, spec coverage, unchanged protected files and runtime/privacy/live limitations. Never call self-check independent verification. End exact marker CW-P3-UI-DONE-UNVERIFIED.

# STOP CONDITIONS
One implementation pass, 90-minute stop cap (not the conditional 8–14-hour effort estimate). No auto loop/subagents; cap means preserve/report blocked and request extension. Stop on contract gap, missing export, unassigned file/resource, permission prompt, secret, unexpected source change, context risk or no progress; never guess/relax checks. Any corrective pass needs a new bounded brief/branch; spec flaw goes to P1. No real sends, accounts, deployments or unapproved scope.
