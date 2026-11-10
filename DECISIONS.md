# Cielito’s Wrld — Decision log

Evidence tags: Observed (tool/source observation), Documented (existing text), Inferred (reasoned but untested), Unknown. No entry constitutes independent verification.

## D001 — Adopt the human-requested gated orchestration model
- Status: Accepted — explicit human instruction in this conversation.
- Context/problem: Coordinate web work without confusing task completion, verification, and release authority.
- Options: Unstructured execution; P0–P6 gated delivery with independent verification.
- Decision/rationale: Use the requested P0 discovery -> approved P1 spec -> approved P2 plan -> build -> independent verify -> human launch decision -> measure workflow. Lead does not write production code or self-verify. User specifically requested lead/dev/UI collaboration and tickets.
- Trade-offs/consequences: Discovery/ticket intake is permitted now; feature implementation and PR builds wait for exit evidence. Existing lead/dev/UI herdr panes can perform bounded read-only intake.
- Confidence: High for authorization; desired first outcome remains Unknown.
- Reconsideration trigger: Human explicitly amends workflow or authority.
- Owner/date/stakeholders: Requesting human / 2026-11-09 / lead, dev, UI, future verifier and release approver.

## D002 — Use a new Sanity account; project/content strategy unresolved
- Status: Accepted for account intent only; no migration choice accepted.
- Context/problem: Human says the project will use a new Sanity account. A user account, project membership, project ownership, and a new project/dataset are different changes.
- Options: New account joins/receives control of existing project; new project with preserved content/assets; new project with intentionally reset content.
- Decision/rationale: Record new-account intent; defer project/content selection until human confirms ownership and retention. Do not infer that new account means new project.
- Trade-offs/consequences: Integration/migration work is blocked; reversible local drafting can proceed. Credentials, CORS and infrastructure need explicit authorization.
- Confidence: High for account intent; Low for migration feasibility until access/content scope is known.
- Reconsideration trigger: Existing project access, asset ownership or retention requirements are established or changed.
- Owner/date/stakeholders: Requesting human / 2026-11-09 / lead, dev, content owner.

## D003 — Proposed first outcome: trusted visitor inquiries
- Status: Superseded by [D004](#d004--first-outcome-and-content-preservation-confirmed); original recommendation retained below as historical context.
- Context/problem: Prior source observation shows contact API reports success without delivering or storing inquiries. This may block the documented client-contact business goal; actual traffic, lost inquiries and current business priority are Unknown.
- Options: Establish reliable inquiries first; prioritize content/account transition first; prioritize gallery/blog engagement first.
- Decision/rationale: Recommend confirming inquiry reliability as the first outcome because the source exposes misleading success. First P0 task is confirm intended audience/destination and establish a baseline definition; do not build a mail system from this proposal.
- Trade-offs/consequences: May defer content/presentation work. Reach, impact, effort, budget, target SLOs and dates are not estimated. No production behavior selected.
- Confidence: Medium for technical concern, Low for commercial priority.
- Reconsideration trigger: Human priority, analytics, service destination or user evidence indicates a different first outcome.
- Owner/date/stakeholders: Orin Vance proposes; requesting human decides / 2026-11-09 / content owner, dev, UI, verifier.

## D004 — First outcome and content preservation confirmed
- Status: Accepted — explicit human form answers on 2026-11-09: first_outcome=reliable_inquiries; content_retention=preserve.
- Context/problem: Ticket intake exposed false contact-success behavior and a new-account transition with undecided retention. The human selected the next discovery direction, not a build spec.
- Options considered: Trustworthy inquiries, content continuity first, or browsing first; preserve content, start the new setup empty without deleting the original, or inventory before retention decision.
- Decision/rationale: First increment should serve trustworthy client inquiries: accurate visitor status and inquiries reaching an approved destination. Preserve existing content and images; determine access before deciding existing-project membership/transfer versus migration. This supersedes D003 and resolves D002's preservation question only.
- Trade-offs/consequences: Gallery/blog optional improvements are not automatically first-increment scope. No content reset or deletion. Existing access, exact retained document classes/private data, destination/provider/storage choice, metric/baseline window, budgets and approval chain remain Unknown. P0 has NOT exited; no P1/P2 approval, account change, migration, build or launch is authorized.
- Confidence: High for human direction; feasibility and commercial effect unmeasured. No metrics or estimates invented.
- Reconsideration trigger: Human changes outcome/retention direction, approved access/ownership cannot support preservation, or discovery evidence changes the inquiry problem.
- Owner/date/stakeholders: Requesting human decides; Orin Vance records / 2026-11-09 / content owner, dev, UI, future independent verifier and release approver.

## D005 — Proposed inquiry delivery provider: Resend
- Status: Accepted as a specification input only — explicit human answer provider_decision=approve_resend_for_spec on 2026-11-09. No account creation, spending, credential/DNS change or live send authorized.
- Context/problem: The contact handler reports success without delivery. Human confirmed reliable inquiries first, preservation of content/images, and no selected email provider.
- Options considered: Resend transactional Email API; Postmark transactional Email API. Existing SMTP service is Unknown, not an assumed available alternative.
- Decision/rationale: Recommend Resend evaluation using direct server-side HTTPS, without a new SDK dependency or generic provider framework. Official documentation supports request idempotency and synthetic delivery/failure destinations; its documented free allowance is larger than Postmark's. Neither fit nor billing has been independently verified.
- Trade-offs/consequences: Resend Free is documented at $0/month, 3,000 emails/month and 100/day; Postmark Free at $0/month and 100/month, Basic at $15/month for 10,000. Prices checked 2026-11-09, not site-cost estimates. Resend documents 30-day retention and a 24-hour idempotency window. Mail-server delivery is not inbox receipt. Quotas, privacy, sender-domain access and acknowledgment/storage/failure contracts remain real risks. No upgrade, auto-overage, DNS, secrets, send or dependency installation authorized.
- Confidence: Medium for source-documented technical fit; Low for operational/commercial suitability until domain/inbox, traffic, budget, privacy and live checks are approved.
- Reconsideration trigger: Existing approved service discovered; provider access/retention/region/quotas conflict with requirements; traffic or reliability evidence invalidates free-tier evaluation. Reversal: replace bounded server API integration and credentials, preserve approved submission/event contracts, rerun independent checks; do not couple public data shapes to vendor IDs.
- Owner/date/stakeholders: Orin Vance proposes; requesting human decides / 2026-11-09 / content owner, dev, UI, future independent verifier.
- Sources/evidence: Official primary sources and limits captured in docs/backlog/inquiry-provider-recommendation.md. Resend https://resend.com/pricing and https://resend.com/docs/api-reference/emails/send-email; Postmark https://postmarkapp.com/pricing and https://postmarkapp.com/developer/user-guide/send-email-with-api. No live sends or performance verification.

## D006 — Confirm inquiry problem, baseline metric and destination policy; exit P0
- Status: Accepted — explicit human answers discovery_exit=confirm_problem_and_baseline_metric and destination_policy=owner_inbox_server_config on 2026-11-09.
- Context/problem: Prospective clients need reliable inquiries; source handler reports sending without delivering or storing. Lost-inquiry volume is Unknown and no user research or measured baseline exists.
- Options considered: Confirm the presented discovery definition or revise; configure approved owner inbox server-side with a separate approved test inbox or leave destination undecided.
- Decision/rationale: Confirm this user/problem and establish a first-two-weeks baseline: share of valid unique public contact submissions with matching Resend recipient-mail-server delivery within 24 hours. Exclude invalid, honeypot-positive, duplicate IDs and explicitly server-tagged synthetic tests; report sample size/unresolved/data gaps. Two weeks/24 hours are approved observation definitions, not measured performance or improvement targets. Destination is the owner's approved inbox configured outside chat; live checks use a separately approved test inbox.
- Trade-offs/consequences: Mail-server acceptance does not prove inbox placement. No UI false-delivery claim, no submitted-field logs, no silent loss after claimed durable receipt, no unauthorized spend/content mutation. Exact sender/recipient values, runtime access, privacy and storage/acknowledgment architecture remain P1/deployment dependencies. P0 exit evidence now exists, so P1 drafting may start; P1/P2 still need separate human approval.
- Confidence: High for human problem/measurement agreement; desirability, traffic and operational performance remain unmeasured.
- Reconsideration trigger: User evidence changes audience/problem, collection cannot support the metric, or the human changes the destination/measurement definition.
- Owner/date/stakeholders: Requesting human approves; Orin Vance records / 2026-11-09 / content owner, dev, UI, future verifier/operator.

## D007 — Proposed synchronous provider acceptance without an application outbox
- Status: Accepted — explicit human spec_approval=approve_v1_and_d007 on 2026-11-09; exact docs/specs/reliable-inquiries.md version 1 approved for planning, not build or live operations.
- Context/problem: Correct false contact success without introducing unapproved private storage, background jobs or Sanity personal-data writes.
- Options considered: Synchronously submit to approved Resend API and acknowledge only provider acceptance; durable private application inbox/outbox plus delivery worker/recovery.
- Decision/rationale: Recommend synchronous Resend submission for this increment, fixed server sender/recipient, validated payload and same-submission provider idempotency. No SDK dependency. Do not claim durable application receipt or inbox delivery. Measure server request metadata plus provider delivery evidence using an approved operator export, not an unapproved warehouse/webhook service.
- Trade-offs/consequences: Provider outages block new acceptance; browser preserves message and retries the same identity, with explicit ambiguous-outcome state. Provider idempotency is limited to 24 hours. No permanent application recovery or outage buffering. If the owner needs inquiries accepted during provider outage, choose a private outbox and revise spec before build; do not silently defer that requirement. Baseline log/export retention, privacy, quota/abuse and real inbox checks remain launch gates.
- Confidence: Medium for minimal fit; no live integration, log retention or actual user tolerance established. No effort/cost estimate invented.
- Reconsideration trigger: Required durable receipt/outage buffering, unavailable log/provider evidence, measured loss/retry problems, or privacy policy conflicts. Reversal requires approved private storage/migration/worker design, updating acknowledgment states and independent contract checks; content migration remains separate.
- Owner/date/stakeholders: Orin Vance proposes; human decides / 2026-11-09 / dev integration owner, UI, operator, independent verifier.

## D008 — Use Resend Free; no paid upgrades or overages
- Status: Accepted — human said “lets proceed with that” immediately after the published Resend Free allowance was explained.
- Context/problem: Select a cost-constrained delivery tier for the already accepted Resend specification input without purchasing or provisioning unapproved services.
- Options considered: Resend Free; a paid tier; defer tier selection.
- Decision/rationale: Use Resend Free for the planned inquiry integration/evaluation. The documented allowance checked 2026-11-09 is $0/month, 3,000 emails/month and 100/day; these are provider limits, not measured demand or an availability guarantee.
- Trade-offs/consequences: Daily/monthly exhaustion must fail truthfully; no automatic upgrade, overage, additional inbox purchase or alternate paid route. No account, credentials, domain/DNS, live send or deployment changed. The immediate referent was the free plan, so exact specification version 1/D007 and P2 implementation-plan approvals remain separate gates. Provider tier choice is not an agent-model spending cap.
- Confidence: High for human tier choice; volume suitability and actual delivery remain unmeasured.
- Reconsideration trigger: Measured traffic or verified operational needs exceed the allowance; human must approve any paid change separately. Reversal: keep sending safely disabled or propose another approved provider/tier, preserving submission contracts and content.
- Owner/date/stakeholders: Requesting human decides; Orin Vance records / 2026-11-09 / dev, UI, operator, independent verifier.

## D009 — Approve inquiry spec v1 and bounded repository access; exit P1
- Status: Accepted — human form answers spec_approval=approve_v1_and_d007, git_trust=approve_repository_only, source_reading=allow_bounded_read_only_no_reuse.
- Context/problem: Move from approved discovery into a buildable plan while avoiding global Git trust, source personal-data reuse, hidden scope and default-branch writes.
- Options considered: Approve v1/direct provider-acceptance versus revise; repository-only trust versus unchanged; bounded source reading versus keep the previous stop.
- Decision/rationale: Approve exact inquiry specification v1 including D007. Authorize Git trust per command for this repository only, initial status inspection and later approved task branches. Clear the prior contact-fallback SOURCE-READING stop only: no values copied, reused as recipients/fixtures or treated as authorized business data. Credentials still trigger a stop.
- Trade-offs/consequences: P1 exit evidence exists; P2 planning may start. No P2 plan, production implementation, account/credential/DNS changes, emails, spend or deployment approved. Trust does not alter global config. First authorized status reports a pre-existing modified package-lock.json; preserve it, never stage/reset/overwrite it. Agent lifecycle default-idle risk remains; use bounded one-pass planning and actual reports, not state as proof.
- Confidence: High for authorization. Feasibility/effort and delivery remain subject to builder input and independent checks.
- Reconsideration trigger: Approved spec flaw, changed privacy/trust requirements, conflicting user changes, or additional files/resources needed; return affected work to the appropriate human gate.
- Owner/date/stakeholders: Requesting human approves; Orin Vance records / 2026-11-09 / dev, UI, future independent verifier.

## D010 — Proposed v2 contract clarification after P2 builder findings
- Status: Accepted — explicit human spec_v2_decision=approve_v2_and_d010 on 2026-11-09. This resolves the clarification and permits P2 planning to resume, not build or live operations.
- Context/problem: Both builder reports identify missing v1 semantics for createdAt/honeypot/provider-ID validation, normalized payload identity, fieldErrors/500/409 contracts, immutable unknown retries/clock expiry, exact recovery copy/support and test isolation. Guessing these could create duplicate mail, false success or tests reaching an unapproved inbox.
- Options considered: Let builders guess (rejected by governing workflow); explicit v2 clarification while preserving D007/no-app-outbox; change architecture to private durable inbox (not requested).
- Decision/rationale: Propose docs/specs/reliable-inquiries-v2.md as v1 plus explicit overrides, preserving accepted scope/provider/metric and no-app-outbox. Define exact statuses/codes/static copy, canonical identity and conservative unknown-send behavior. Choose isolated test egress blocking plus authorized environments; CONTACT_TEST_MODE remains metadata, not a pretend security boundary.
- Trade-offs/consequences: P2 plan/build stays blocked until human v2 approval. No new datastore, SDK, config variable or feature. Test/native-runner/protected-tsconfig assignments and branch/worktree/dirty-lockfile handling remain P2 approvals, not authorized by this proposal. No code, checks or live operations executed.
- Confidence: Medium for source-documented protocol clarification; no independent review/live validation of v2. Builder estimates are not verified: UI estimated 8–14 active hours under frozen-contract/environment assumptions; dev elapsed estimate Unknown. Do not invent total duration.
- Reconsideration trigger: Human rejects clarification, actual provider contract contradicts conservative assumptions, further builder ambiguity or independent defect. Revise explicitly; never patch approved spec silently.
- Owner/date/stakeholders: Orin Vance proposes; requesting human decides / 2026-11-09 / dev, UI, future verifier/operator. Sources: docs/plans/inquiry-builder-findings.md, official Resend API/error/idempotency links in v2.

## D011 — Proposed bounded inquiry implementation plan and serial branch resources
- Status: Accepted — explicit human implementation_plan=approve_plan_v1_d011 on 2026-11-10. Listed protected-file exceptions, serial branch/PR resources, bounded assignments and fresh checker topology approved; live/credential/account/release gates unchanged.
- Context/problem: Implement approved v1+v2 safely in a shared checkout with a pre-existing modified lockfile, no configured LSP, unproved native test path and no assigned fresh verifier.
- Options considered: Sequential task branches using current installed environment; isolated worktrees with extra dependency setup; concurrent coupled writes. Recommend sequential branches; concurrent coupled writes rejected. Worktrees reduce checkout coupling but add unresolved dependency/dirty-baseline handling.
- Decision/rationale: Propose docs checkpoint -> dev API/shared contract -> UI component -> fresh read-only Codex/human acceptance -> operator runbook/draft review, using exact five-section briefs and explicit owned files. Documentation and feature draft PRs are stacked and remain human-controlled; no empty PR.
- Trade-offs/consequences: One Git/index/source writer at a time; capture real commits/pane IDs, preserve lockfile and all user changes. Protected exceptions requested only for new behavior tests, active env example and allowImportingTsExtensions:true if required; no weakened rule/package/lock/CI or SDK. Native runner may fail and require a new decision, not a fake pass. Actual UI/provider checks stay gated on authorized environment.
- Budgets (proposed STOP CAPS, not estimates): lead checkpoint 30 minutes, dev one 90-minute pass, UI one 90-minute pass, independent check 45 minutes; at most one separately bounded corrective pass/new branch per affected builder and one recheck. No autonomous loop; model dollar/token spend unmetered here and no financial guarantee. Provider stays Free/no purchases/overages.
- Confidence: Medium for bounded scope, Unknown for total elapsed effort. Builder UI estimate 8–14 active hours conditional/not measured; developer elapsed estimate Unknown. Caps may stop work unfinished and require human extension; no date promised.
- Reconsideration trigger: Spec defect, extra file/dependency/config needs, protected/user changes, runtime/verifier inability, cap or unsupported native runner. Preserve branch and escalate; do not reset user work or silently broaden scope.
- Owner/date/stakeholders: Orin Vance proposes; requesting human decides / 2026-11-10 / dev, UI, fresh verifier, operator/release approver.

## D012 — Approve Codex folder trust for this repository only
- Status: Accepted — explicit human codex_folder_trust=approve_for_this_repository on 2026-11-10.
- Context/problem: Fresh checker startup displayed a saved folder-trust prompt despite herdr reporting interactive_ready/idle. No project .codex settings directory was found; AGENTS.md exists; global Codex settings were not audited.
- Options considered: Approve repository folder trust for the read-only checker; keep it blocked and require another verifier/human.
- Decision/rationale: Human authorizes this repository's saved Codex trust with the existing read-only sandbox/on-request approvals only. No plugins, unsafe flags, source editing, credentials, live sends or later prompts approved.
- Trade-offs/consequences: Original saved-trust transport failed with config/batchWrite remote app-server worker channel closed; no force-resume/shared restart. A fresh local no-daemon replacement used the same authorized repo trust/read-only scope and produced isolated reports. Offered upgrade and new/changed hook trust were declined. Actual hook execution was not audited; no future plugin/hook permission implied. Runtime readiness is not application acceptance.
- Confidence: High for human permission; local replacement produced actual evidence, while real UI/provider/inbox readiness remains unproved.
- Reconsideration trigger: Different folder/config/permission scope, another failure or inability to establish fresh read-only context. Preserve evidence, do not force-resume or repair shared infrastructure.
- Owner/date/stakeholders: Requesting human authorizes; Orin Vance records / 2026-11-10 / checker, code builders, local runtime owner.

## D013 — Keep verification isolated; actual-page environment not ready
- Status: Accepted — explicit human preview_verification=not_ready_local_only on 2026-11-10.
- Context/problem: Actual Contact-page proof requires approved nonproduction Sanity configuration/read permissions, not supplied. Prior missing-environment failure must not be rerun unchanged or replaced with invented CMS data.
- Options considered: Human configures approved nonproduction resources/reads; continue isolated local checks and retain unverified actual-page/CMS/provider evidence.
- Decision/rationale: Continue isolated local checks now. Do not start the site/CMS requests or invent settings; keep actual-page, provider/inbox and other live criteria unchecked. Accepted feature/metric scope is NOT reduced and release is not authorized.
- Trade-offs/consequences: Candidate code/PR may be done-unverified; no full acceptance/Go claim. No signup, credentials, environment/DNS/CORS change, production read, send or paid usage. Human must later provide/authorize prerequisites outside chat.
- Confidence: High for human availability/permission direction; runtime/delivery remains unobserved.
- Reconsideration trigger: Human confirms approved configuration/access has changed, supplying new authority for the bounded real scenario.
- Owner/date/stakeholders: Requesting human decides; Orin Vance records / 2026-11-10 / verifier, operator, builders, release approver.
