# U1 form handoff — 2026-11-10

Status: Implemented, **done-unverified**. Actual cielitos-ui report ended CW-P3-UI-DONE-UNVERIFIED. No independent UI/React/browser/delivery verification implied.

## Actual commit and scope
- Branch: ticket/6-contact-form.
- Commit: da568aaa1da4f7bf510d2574949a78673ac641ae.
- Parent: 7d174bb68b854356041bafd9b86b68b869676734 (actual API commit).
- Only components/contact/ContactForm.tsx committed: +327/-70. Shared contract/API/config/tests untouched by UI, per report.
- User lockfile and lead-owned changing state/evidence files preserved and excluded from staging, per report. Not pushed by UI; no merge/deploy.

## Reported implementation
Shared schemas/readonly budget options, inline validation, synchronous duplicate guard, frozen canonical body/identity, strict HTTP/status/code/matching-ID receipt, retained input, known-unsent/unknown/conflict/expired states, explicit new-message confirmation, accepted reference/reset, associated errors/status announcements/focus restoration and unload warning. No browser persistence or email-delivery guarantee.

## Author check sequencing deviation
Despite the explicit defer-check instruction, author ran an ephemeral in-memory handler scenario using hook/DOM substitutes, not a real React/browser surface. First traversal failed with RangeError Maximum call stack size exceeded; only that throwaway harness was corrected, then author reported PASS for validation/focus/duplicate guard/frozen retries/sticky uncertainty/confirmation/reset/offline/clock/malformed response. No harness files written. This is recorded as author-only deviation, never accepted as independent, actual React, accessibility, viewport, navigation or provider proof. Do not rerun that author harness as an acceptance substitute.

NOT RUN by UI: repository regression suite, typecheck, lint, build, browser/actual page, accessibility/responsiveness or real services/email. Independent checker must exercise what is possible and report all remaining unknowns; navigation handling was explicitly unverified in report.

## Human verification availability
User explicitly selected preview_verification=not_ready_local_only. Do not rerun missing-Sanity startup, start actual site/CMS requests, or invent configuration. Continue isolated local checks; actual-page/CMS/provider/inbox evidence stays unverified. Accepted criteria are not removed or silently reduced, and release remains blocked. No account/key/domain/DNS/CORS/production reads/sends authorized.

Next: fresh read-only Codex checks frozen combined candidate da568aaa1da4f7bf510d2574949a78673ac641ae against effective v1+v2, not author opinion. Any defect -> bounded P3 corrective branch; any spec flaw -> P1 decision.
