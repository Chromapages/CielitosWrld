# Contact inquiries — operator handoff

Updated 2026-11-10. Owner: requesting human/environment operator; named release/support approvers remain [HUMAN TO NAME]. **Candidate done-unverified; public enablement blocked.** This runbook does not authorize account, credential, DNS, environment, send, merge or deployment operations.

Source of truth: [approved v1](specs/reliable-inquiries.md), [v2 overrides](specs/reliable-inquiries-v2.md), DECISIONS.md D006–D013 and the [actual independent local evidence](backlog/inquiry-independent-check.md). No new Sanity account/project migration is part of this increment; preserve existing content/images.

## What exists and what is not proved

Documented implementation: direct synchronous Resend submission, no SDK/application inbox/outbox/background retry/webhook receiver. The new contract acknowledges **provider acceptance**, not inbox placement, reading or durable application receipt. Old callers must migrate to the strict `lib/contact.ts` request/response contract; there is no fake-success compatibility path.

Observed independent local checks: native API fixtures passed; compiler failed with retained Sanity schema diagnostics; ESLint could not analyze because its configured plugin was missing. Exact commands/results and criterion limits are in the linked report. Build success cannot replace typecheck. Tooling repair is existing [#26](https://github.com/Chromapages/CielitosWrld/issues/26), not silently included here.

**Unchecked:** actual Contact page, keyboard/screen reader/focus, responsive/reduced-motion states, live provider acceptance/idempotency, real inbox, host limits/abuse/retention/export, rollback propagation and baseline. Human D013 says setup is not ready: do not start the site, invent CMS data or rerun the known missing-Sanity failure. No account was created, real email sent, environment changed, merge or deployment performed by this increment.

## Configuration and hard boundaries

Variable names are observed in `.env.local.example`; actual values are [HUMAN CONFIGURES OUTSIDE CHAT]. Never paste credentials or addresses into issues, briefs, screenshots or commits.

| Variable | Operator rule |
|---|---|
| `CONTACT_ENABLED` | Candidate defaults fail-closed; explicit `true` permits delivery when remaining configuration is valid. Keep `false` until separately approved checks/rollout. This is not a claim about an uninspected deployed environment. |
| `RESEND_API_KEY` | Server-only approved nonproduction key for authorized checks; scope/restrict it and confirm ownership. No `NEXT_PUBLIC_` prefix. |
| `CONTACT_FROM_EMAIL` | Fixed configured sender on an approved verified domain; never visitor-controlled. |
| `CONTACT_TO_EMAIL` | Fixed server-only destination. Nonproduction uses the separately approved test recipient; public use requires approved owner inbox. No source-contact fallback. |
| `CONTACT_TEST_MODE` | Server-owned metadata exclusion flag only. **It does not change recipient, isolate egress or make real sends safe.** |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Approved nonproduction Sanity configuration/read authority is required to render the existing site. Public identifiers are not write credentials. No account/CORS/token/migration change is implied. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional existing API-version setting; application default applies when omitted. |

Fixed sender, recipient, subject, provider endpoint and telemetry tags are server-owned; visitor email is validated Reply-To only. No personal content is written to Sanity. An origin check/honeypot is not authentication or adequate bot rate limiting.

Documented provider allowance, last consulted 2026-11-09: Resend Free lists 3,000 emails/month and 100/day ([pricing](https://resend.com/pricing)). Verify current account terms/dashboard before use; these are published limits, not measured demand. Human approved $0 provider spend/no paid upgrades or overages. Quota failure means unavailable, not success, alternate delivery or permission to buy capacity.

## Isolation and authorized evidence sequence

1. Local tests use reserved synthetic input, an isolated replacement environment and outbound interception that rejects unexpected/real egress. Never load actual local credentials, fall back to original fetch or point a fixture at a real inbox. Existing passing fixtures prove application behavior only.
2. Before any actual-page/provider check, human must approve nonproduction Sanity access, literal sender/domain/key/test recipient, egress boundaries and checks. Confirm destinations independently outside chat; never infer them from page source. CONTACT_TEST_MODE is not that protection.
3. A fresh read-only verifier exercises the **actual** Contact page with intercepted delivery for UI states, navigation, expiry, keyboard/screen reader, long inputs, reduced motion and approved viewport matrix. A substitute hook/DOM harness is not acceptance evidence.
4. Separately authorize documented Resend synthetic destinations, then an explicit real test inbox. Record actual provider acceptance, vendor duplicate protection, mail-server delivery event and independent inbox observation separately. No automatic/default live integration test.
5. Approve hosting timeout/body/abuse controls, privacy and retention/export, named support/release owners, proven disable propagation and a bounded rollout before public exposure. Any missing prerequisite keeps release blocked.

Approved spec targets, not production measurements: provider abort at 10 seconds and complete bounded fixture response within 12 seconds; accessibility scope relevant WCAG 2.2 AA form behavior at 320/640/768/1280 CSS px. Actual surface and hosting proof remains outstanding. No production latency percentile or numeric error budget has been established.

## Visitor recovery and support

- Valid matching HTTP 202/provider_accepted is the only acceptance state. The UI must distinguish “Submitted for delivery” from confirmed delivery.
- Known unsent rejection/disabled/quota/validation retains input; correct the cause before a deliberate retry. Do not publish raw provider errors or copy submitted fields into support tickets.
- Network/timeout/malformed acceptance/possibly-sent error means **unknown**, not definitely failed. Keep the UUID reference and frozen message; retry the same canonical submission, never silently create a new ID. Conflicts remain unresolved, including changed-body identity conflicts.
- Documented vendor window is 24 hours ([Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), consulted 2026-11-09); live vendor behavior is unchecked. Same config/body/key is required. Config changes can create a conflict; do not force a new ID to hide it. No permanent exactly-once guarantee.
- At expiry, stop automatic retry; keep the reference and use only a human-confirmed contact method actually visible on the page. Starting a fresh message after unknown/conflict/expiry requires the approved duplicate-risk confirmation.
- Reference/draft are in page memory, not durable storage. Do not promise reload/navigation recovery. Warning/focus/navigation behavior still needs actual-browser proof.
- For support use the UUID and allowed metadata/provider evidence, not inquiry bodies in public issues. An accepted email may later bounce/fail/be suppressed; investigate its provider event, not just the UI acceptance response.

## Baseline procedure — no measured result yet

Approved definition (D006): during the first two weeks of **authorized rollout**, measure the share of valid unique public submissions with matching recipient-mail-server delivery within 24 hours. This is a baseline collection objective, not an uplift target or inbox/read guarantee.

Before rollout, human approves access-restricted host metadata retention/export covering the collection window plus a final 24-hour observation tail and provider correlation access. If that is unavailable, the metric is not proved measurable; block launch or return to P1 rather than add an unapproved datastore/webhook.

1. Retain only approved `contact.received`, `contact.provider_accepted`, `contact.failed`/`contact.unknown` metadata: canonical submission ID, server timestamp, allowed result code, optional provider ID and server-owned test tag. Never names/email/budget/message/IP/headers/tokens/raw errors. Provider/mailbox personal-data retention and access require separate human policy approval.
2. Select eligible received events by server time in the approved collection window; deduplicate submission IDs. Exclude invalid/honeypot-positive input, repeated IDs and server-tagged tests. Do not use client timestamps or a visitor-provided synthetic claim.
3. Correlate to actual provider delivery evidence through provider ID or canonical submission tags, including requests whose application outcome was unknown. Missing correlation is unresolved, never assumed delivered.
4. After the final observation tail, report delivered-within-window numerator, eligible unique denominator/sample, unresolved/missing-log/completeness limits and separately delayed/bounced/failed/suppressed cases. No denominator means no estimate; incomplete logs mean no claim of a complete baseline.
5. Report invalid/rejected/quota/unknown diagnostics alongside exclusions so they cannot conceal a broken form. Compare only under documented comparable conditions; a single baseline proves no causal improvement.

No traffic, sample, delivery percentage, field latency or improvement was measured in this pass.

## Rollback and release gates

Recommendation while evidence is missing: **No-Go for public enablement**. Stay in P4; a draft PR is not authorization to merge or ship.

Any false-success claim, wrong destination or private-data exposure blocks advancement immediately. The authorized operator sets `CONTACT_ENABLED=false` and applies the hosting-specific deployment/restart needed for that change to take effect. Do not assume an environment edit changes a running deployment. Hosting/permissions/propagation are [HUMAN TO CONFIRM AND PROVE IN NONPRODUCTION BEFORE RELEASE]; no fabricated instantaneous rollback.

Fresh authorized checks must confirm unavailable/no outbound transport after effective disablement. Preserve minimal evidence and return an implementation defect to a bounded new P3 branch; a spec flaw returns to P1. Never restore the old fake-success route or discard the user's lockfile/content.

Human must set the initial exposure cohort, observation period, monitoring thresholds and rollout/rollback authority before P5 approval. Watch eligible/accepted/failure/unknown counts, delivery/completeness, provider quota and privacy/destination guardrails; pause on outage/quota risk. No paid failover, automatic expansion, production operation or Sanity migration is authorized here.
