# Inquiry delivery provider — P0 decision request

Knowledge date: 2026-11-09. Status: recommendation ACCEPTED as a specification input only (D005), not implemented or provisioned. Evidence is official provider documentation retrieved in this session; no live API, account, DNS, credentials, application code or real/test send was exercised. Reconfirm pricing/terms at provisioning. Human direction: reliable inquiries first, preserve content/images, and use owner-inbox values configured server-side outside chat (D004/D006).

## Recommendation
Choose Resend's transactional Email API for the proposed first inquiry integration, subject to human approval of the vendor, data handling and sender/destination access. Start evaluation within its documented free tier; do not enable upgrades or overages automatically. This is a provider recommendation, not an estimate of this site's volume or cost.

## Options and evidence
| Option | Documented current entry allowance | Integration / trade-off |
|---|---|---|
| Resend Free | $0/month; 3,000 transactional emails/month; 100/day | REST API can be called from the existing server route using built-in fetch; vendor send idempotency and synthetic delivery/bounce destinations are documented. Daily cap can block inquiries; published retention is 30 days, not zero retention. |
| Postmark Free | $0/month; 100 emails/month | REST API, confirmed sender signature and non-delivering test token are documented. Smaller evaluation allowance; Postmark Basic is listed at $15/month for 10,000 emails with 45-day retention. No claim of lower/higher real deliverability is supported by these sources. |

Sources, checked 2026-11-09:
- Resend pricing: https://resend.com/pricing (official reader redirects to pricing.md); figures above are Documented, not independently verified billing outcomes.
- Resend send API: https://resend.com/docs/api-reference/emails/send-email
- Resend idempotency: https://resend.com/docs/dashboard/emails/idempotency-keys
- Resend delivery semantics: https://resend.com/docs/webhooks/emails/delivered
- Resend synthetic tests: https://resend.com/docs/dashboard/emails/send-test-emails
- Resend domain verification reference: https://resend.com/docs/add-a-domain and https://resend.com/docs/dashboard/domains/introduction (official search excerpts state an owned domain is required; no DNS configuration performed).
- Postmark pricing: https://postmarkapp.com/pricing
- Postmark send API/testing: https://postmarkapp.com/developer/user-guide/send-email-with-api

## Why Resend here
Inferred technical fit: current app/api/contact/route.ts is already a server route; a direct HTTPS API fits without adding an SDK dependency. Postmark also supports direct HTTP, so this is not a unique Resend advantage. Resend's documented evaluation allowance and request-idempotency feature make it the recommended evaluation candidate. Actual inquiry volume, commercial impact and operational performance remain Unknown. No new abstract mail-provider layer is justified at this stage; a future provider replacement can change the bounded server adapter/secret and rerun contract checks.

## Limits that must reach the spec
- Provider request acceptance is not delivery. Resend's email.delivered means recipient mail-server acceptance, not inbox placement or a person reading it. UI must not claim more than the proven state.
- Resend idempotency is a 24-hour provider window, not permanent exactly-once processing. Same request identity/body needs an approved application contract; timeout can leave an unknown send result.
- Synthetic delivered/bounced/complained/suppressed recipients simulate events and count against quota. They do not prove delivery to the owner's real inbox; real destination checks need separate authorization.
- Domain ownership/verification, secrets and DNS need human handling/authorization. Test/provider selection does not authorize credential changes or sending.
- Names, email, budget and message are personal/content data sent to the provider. Approve retention, region/access, logging and recipient policy before implementation. Do not infer legal compliance from a vendor marketing claim.
- Free quota, provider outage, blocked/suppressed mail, duplicates and acknowledgment ambiguity remain failure cases. Choosing a vendor alone does not create durable storage, background recovery, support process or monitoring. These must be resolved in the approved spec, not silently added.
- Unknown: sender domain control, production/test inbox, data handling obligations, volume, permitted spend, delivery SLI/SLO, baseline window, storage/acceptance contract and independent verifier.

## Phase and decision gates
Remain P0 until the user problem and metric are confirmed. The human asked for a recommendation, not purchase or account provisioning. Provider approval allows it to be used as an input, not a bypass of the human-approved P1 spec/P2 plan. Git trust and developer privacy-stop are unchanged; no agent was resumed. No new issue created beyond the prior 40-ticket cap.

Next human decision: approve/revise docs/specs/reliable-inquiries.md version 1 and D007 acknowledgment/storage trade-off. Resend and the P0 baseline metric/destination policy are already accepted for specification. Literal inbox/sender/domain, live permissions and privacy/operational prerequisites remain gated; do not send API tokens through chat.
