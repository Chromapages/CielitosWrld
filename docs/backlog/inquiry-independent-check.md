# Inquiry candidate — independent isolated evidence

Date: 2026-11-10. Status: **done-unverified as a complete feature; release blocked**. Effective requirements: [approved v1](../specs/reliable-inquiries.md) plus [v2 overrides](../specs/reliable-inquiries-v2.md). D013 expressly excludes actual-site/CMS/provider/inbox execution for this pass; those requirements were not removed.

## Provenance and frozen scope

Observed: fresh read-only Codex 0.166.0 / GPT-6.1 Terra high, herdr `cielitos-verifier-local`, workspace/tab/pane wK / wK:t5 / wK:p5. Session: `01a1c4b0-9cea-7103-bede-5298341d9609`. It is independent of the omp API/UI authors and lead specification author. Actual reports ended with `CW-P4-INQUIRY-REPORT-COMPLETE` and `CW-P4-INQUIRY-SUPPLEMENT-COMPLETE`. Both author checks were treated as unverified claims.

Observed candidate: `da568aaa1da4f7bf510d2574949a78673ac641ae` on `ticket/6-contact-form`; API parent `7d174bb68b854356041bafd9b86b68b869676734`; documentation base `00afdf0`. Only the eight approved candidate paths appeared in its source diff. Lead did not execute the application checks or author production code.

## Commands and retained results

These are independently executed results observed/reported on the date above, not production measurements.

| Command | Actual evidence | Limit |
|---|---|---|
| `node --test --test-concurrency=1 tests/contact.test.cjs` | Fresh checker reported exit 0: **72 passed, 0 failed, 0 skipped**. Actual modules loaded; controlled timeout included. | Denied real egress and explicit fixtures prove application behavior, not Resend delivery/deduplication. Native MODULE_TYPELESS_PACKAGE_JSON warning was not suppressed. |
| `node node_modules/typescript/bin/tsc --noEmit --incremental false --pretty false` | **Failed**. The retained expanded checker transcript shows compiler diagnostics, including `sanity/schemaTypes/blogPage.ts(66,13): error TS2345` and `sanity/schemaTypes/siteSettings.ts(22,7)` / `(36,7)` TS2345, followed by exit indicator `✗ (1)`. | The checker prose incorrectly called the result unavailable; its supplement's no-diagnostics wording conflicts with the retained output. Lead recovered the existing transcript, not a new check. No clean typecheck or pre-change baseline is established; do not label all diagnostics pre-existing merely because shown paths are outside this increment. |
| `node node_modules/eslint/bin/eslint.js app/api/contact/route.ts lib/contact.ts lib/types.ts lib/types/index.ts components/contact/ContactForm.tsx tests/contact.test.cjs` | Checker reported exit 1 before analysis: configured `@typescript-eslint/eslint-plugin` missing. | No lint pass, dependency installation or rule/config change. Existing issue [#26](https://github.com/Chromapages/CielitosWrld/issues/26) owns proposed tooling repair; new scope/approval required. |

Observed compiler-output excerpt recovered from the checker's existing transcript:

```text
sanity/schemaTypes/siteSettings.ts(22,7): error TS2345
Object literal may only specify known properties, and 'rows' does not exist
sanity/schemaTypes/siteSettings.ts(36,7): error TS2345
Object literal may only specify known properties, but 'fields' does not exist
✗ (1)
```

This is a shortened excerpt, not a fabricated complete compiler log. Tests, compiler and lint were not rerun for result recovery. No build, site startup, missing-Sanity failure retry, real provider call or inbox send occurred.

## Acceptance coverage — no full criterion declared verified

| Criterion | Independently exercised local portion | Still unchecked |
|---|---|---|
| AC1 destination/content | Fixed sender/recipient, plain text, budget, reply address; caller destination/header injection rejected in fixtures. | Actual provider and approved recipient delivery. |
| AC2 truthful success | API receipt validation and response contract, including malformed success. | Matching response and acceptance display on actual React page; real provider acceptance. |
| AC3 no-send guards | Malformed/type/size/origin/media/honeypot/field/budget boundaries; rejected requests did not invoke fixture transport. | Actual UI errors, focus and retained fields. |
| AC4 failures/unknown | Disabled/missing configuration, rejection/quota, conflict, malformed responses, network uncertainty and controlled timeout. | Real UI recovery/offline behavior and retention. |
| AC5 identity/retry | Identical canonical provider body and idempotency key on fixture retries. | Real UI double activation, expiry/clock/navigation/confirmation behavior; vendor deduplication. |
| AC6 accessibility | No actual-surface execution. | Keyboard, screen reader, focus/status, approved viewports and reduced motion. |
| AC7 privacy/metric | Fixture logs limited to allowed metadata, excluding synthetic submitted values/token/raw exception details. | Host/provider retention, export, correlation, privacy approval and baseline collection. |
| AC8 protection | Isolated synthetic environment/denied egress; before/after scoped hashes unchanged; approved tsconfig addition independently inspected. | Live controls, complete actual-site preservation/regressions and launch readiness. |

No confirmed implementation defect was established by the limited authorized review. That is not proof of absence; actual UI remains untested. Tooling failures are tracked separately, not hidden by build's ignored TypeScript errors.

## Scope guard and runtime qualifications

- Checker supplement used the already-approved per-command repo-only Git trust; full short status and tsconfig diff both exited 0. No global trust was changed. The exact tsconfig diff adds only `"allowImportingTsExtensions": true`.
- Protected hashes matched before/after; user-modified lockfile matched the recorded baseline. Short status also contained lead-owned records/handoffs and untracked `.omx/`. The latter is **unattributed**; preserve it untouched, unstaged and out of the PR. Do not assume ownership or inspect/publish its contents.
- Git warned about inaccessible user-level ignore configuration. That warning did not prevent the scoped successful commands.
- Initial bare Git-status attempts failed ownership checks; no repetition is warranted. A malformed hash path failed once; a separately executed correct file hash matched. Neither error is an application defect.
- Herdr `agent prompt --wait` returned done mid-turn; actual pane output was still working. This mismatch was reported to tool QA. Final reports/output, not lifecycle state, established completion.
- New/changed hook trust was declined. Actual hook execution was not audited; earlier coordination wording claiming hooks did not run was broader than the observed permission event. No future hook/plugin permission is implied.

## Owners and disposition

- D1 API and U1 form: builders remain owners; **done-unverified**, no corrective code pass launched without a confirmed defect/brief.
- Tooling: `cielitos-dev`, existing #26; protected dependency/config/lockfile repair needs its own approval. Do not rerun the unchanged failed checks to confirm them.
- Actual-page/provider/inbox/hosting/privacy evidence: requesting human/environment owner supplies and authorizes prerequisites outside chat; fresh verifier then checks the actual surface.
- Lead: records/runbook/draft PR only. No merge, deployment, send, baseline result or Go recommendation is authorized.
