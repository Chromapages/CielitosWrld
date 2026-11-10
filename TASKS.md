# Cielito’s Wrld — Task inventory

Updated: 2026-11-10. Phase: **P4 acceptance blocked**. Source da568aa is implemented/done-unverified; independent local API fixtures passed, compiler failed and ESLint was unavailable. Actual environment explicitly not ready; operating handoff/draft publication in progress.

## Evidence and workflow
- Observed: 40 GitHub issue creation URLs; a subsequent scoped GitHub count returned **40** open issues. This proves publication, not technical correctness or implementation completeness.
- Status vocabulary: planned / in flight / blocked / done-unverified / verified. **No task is verified.**
- Owners below are unique herdr role names, not invented GitHub accounts. Human assignees [UNCONFIRMED].
- Each intake ticket has one proposed observable acceptance criterion, source evidence, dependencies, five-section brief and PR/check contract. Inquiry v1 criteria are now human-approved; other backlog tickets remain intake proposals. No feature is build-authorized merely by appearing here.
- This is the known-findings intake plus bounded dev/UI input, NOT a complete security/codebase audit. Dev stopped at a privacy gate; UI did source-only review.
- Source inventory: docs/backlog/intake.json. Published URL ledger: docs/backlog/github-issues.json. Intake limitations: docs/backlog/P0-agent-intake.md.

## Current coordination tasks
| Task | Owner | Status | Dependencies | Single acceptance criterion |
|---|---|---|---|---|
| P0-LEAD: inventory and ticket intake | cielitos-lead | done-unverified | Human ticket/team request | The known-finding backlog is published with actual links, proposed owners/criteria/dependencies, state records and approval gates. |
| P0-DEV: bounded backend/CMS intake report | cielitos-dev | done-unverified | docs/briefs/P0-dev-intake.md | A source-cited report identifies backend/CMS/tooling findings and unknowns without implementation/runtime changes. |
| P0-DEV-REMAINDER: remaining source review | cielitos-dev | planned | D009 clears bounded source reading only; new brief required | Any later authorized remaining review returns evidence within a bounded brief without exposing contact values or changing files. |
| P0-UI: bounded visitor/UI intake report | cielitos-ui | done-unverified | docs/briefs/P0-ui-intake.md | A source-cited report identifies visitor/UI findings and unknowns without implementation/runtime changes. |
| P0-HUMAN: confirm first outcome and metric | cielitos-lead | done-unverified | Explicit human D006 answers | The confirmed user problem and exact outcome/baseline/guardrail definition are recorded as P0 exit evidence. |
| P0-GIT: repository trust authorization | cielitos-lead | done-unverified | Explicit D009 approval | Per-command repository-only trust permits initial branch/dirty-state inspection without changing global trust. |

## All intake tickets
Order is by stable intake key, not priority. Execution dependencies are prerequisite proposals, not an approved P2 task graph. P1/P2 human gates apply to every implementation ticket. Proposed business ordering is intentionally withheld until outcome, reach, constraints and effort evidence exist.

| Key / GitHub | Category | Proposed owner | Status | Prerequisites | Brief |
|---|---|---|---|---|---|
| [CW-001 / #1](https://github.com/Chromapages/CielitosWrld/issues/1) Confirm first user problem, outcome metric and baseline | Discovery gate | cielitos-lead | done-unverified | Human D006 confirmation recorded; no independent measurement yet | [Brief](docs/tickets/CW-001.md) |
| [CW-002 / #2](https://github.com/Chromapages/CielitosWrld/issues/2) Decide new Sanity account, project ownership and content retention | Discovery gate | cielitos-lead | planned | CW-001 | [Brief](docs/tickets/CW-002.md) |
| [CW-003 / #3](https://github.com/Chromapages/CielitosWrld/issues/3) Connect approved Sanity project and permission-scoped environments | Blocked integration | cielitos-dev | planned | CW-002 | [Brief](docs/tickets/CW-003.md) |
| [CW-004 / #4](https://github.com/Chromapages/CielitosWrld/issues/4) Restore referenced assets and prove retained content survives the transition | Defect / migration dependency | cielitos-dev | planned | CW-002, CW-003 | [Brief](docs/tickets/CW-004.md) |
| [CW-005 / #5](https://github.com/Chromapages/CielitosWrld/issues/5) Replace false contact-delivery success with an approved real inquiry flow | Defect | cielitos-dev | planned | CW-001, CW-003 | [Brief](docs/tickets/CW-005.md) |
| [CW-006 / #6](https://github.com/Chromapages/CielitosWrld/issues/6) Honor contact budget and field-validation feedback end to end | Defect | cielitos-dev | planned | CW-005 | [Brief](docs/tickets/CW-006.md) |
| [CW-007 / #7](https://github.com/Chromapages/CielitosWrld/issues/7) Define and enforce submission privacy, moderation and abuse boundaries | Security/privacy discovery | cielitos-dev | planned | CW-002, CW-005 | [Brief](docs/tickets/CW-007.md) |
| [CW-008 / #8](https://github.com/Chromapages/CielitosWrld/issues/8) Connect approved review submissions to published testimonials | Defect | cielitos-dev | planned | CW-002, CW-003, CW-007 | [Brief](docs/tickets/CW-008.md) |
| [CW-009 / #9](https://github.com/Chromapages/CielitosWrld/issues/9) Keep review submission reachable when no testimonials exist | Defect | cielitos-ui | planned | CW-008 | [Brief](docs/tickets/CW-009.md) |
| [CW-010 / #10](https://github.com/Chromapages/CielitosWrld/issues/10) Apply gallery media selection without requiring attribute filters | Defect | cielitos-ui | planned | CW-003 | [Brief](docs/tickets/CW-010.md) |
| [CW-011 / #11](https://github.com/Chromapages/CielitosWrld/issues/11) Show correct gallery empty results and deterministic clear behavior | Defect | cielitos-ui | planned | CW-010 | [Brief](docs/tickets/CW-011.md) |
| [CW-012 / #25](https://github.com/Chromapages/CielitosWrld/issues/25) Reconcile mobile gallery filters with media and editable CMS fields | Contract decision | cielitos-ui | planned | CW-010, CW-025 | [Brief](docs/tickets/CW-012.md) |
| [CW-013 / #12](https://github.com/Chromapages/CielitosWrld/issues/12) Make the gallery lightbox operable and understandable by keyboard and assistive technology | Accessibility defect | cielitos-ui | planned | CW-010 | [Brief](docs/tickets/CW-013.md) |
| [CW-014 / #13](https://github.com/Chromapages/CielitosWrld/issues/13) Prevent inactive lightbox videos from playing and handle missing embeds | Defect / feasibility check | cielitos-ui | planned | CW-003, CW-013 | [Brief](docs/tickets/CW-014.md) |
| [CW-015 / #17](https://github.com/Chromapages/CielitosWrld/issues/17) Make posts beyond the first blog batch reachable | Defect | cielitos-dev | planned | CW-003, CW-018, CW-019 | [Brief](docs/tickets/CW-015.md) |
| [CW-016 / #20](https://github.com/Chromapages/CielitosWrld/issues/20) Resolve the blog search field that currently performs no search | Behavior decision | cielitos-ui | planned | CW-001, CW-021 | [Brief](docs/tickets/CW-016.md) |
| [CW-017 / #15](https://github.com/Chromapages/CielitosWrld/issues/15) Resolve nonfunctional Like, Reblog and misleading Share controls | Behavior decision | cielitos-ui | planned | CW-001, CW-018 | [Brief](docs/tickets/CW-017.md) |
| [CW-018 / #14](https://github.com/Chromapages/CielitosWrld/issues/14) Align blog post schema, feed query and permalink rendering | Contract defect | cielitos-dev | planned | CW-002, CW-003 | [Brief](docs/tickets/CW-018.md) |
| [CW-019 / #16](https://github.com/Chromapages/CielitosWrld/issues/16) Enforce the approved blog archive visibility contract | Defect | cielitos-dev | planned | CW-018 | [Brief](docs/tickets/CW-019.md) |
| [CW-020 / #18](https://github.com/Chromapages/CielitosWrld/issues/18) Resolve About, Privacy and Terms links without matching pages | Content / routing defect | cielitos-ui | planned | CW-001, CW-007 | [Brief](docs/tickets/CW-020.md) |
| [CW-021 / #19](https://github.com/Chromapages/CielitosWrld/issues/19) Resolve blog tag, Archive, Ask and Submit destinations | Routing defect | cielitos-ui | planned | CW-001, CW-018 | [Brief](docs/tickets/CW-021.md) |
| [CW-022 / #21](https://github.com/Chromapages/CielitosWrld/issues/21) Fix navigation visibility across breakpoints and nested-route active state | Responsive defect | cielitos-ui | planned | CW-003 | [Brief](docs/tickets/CW-022.md) |
| [CW-023 / #22](https://github.com/Chromapages/CielitosWrld/issues/22) Decide and reconcile Work routes with missing CMS content types | Architecture decision | cielitos-dev | planned | CW-001, CW-002 | [Brief](docs/tickets/CW-023.md) |
| [CW-024 / #23](https://github.com/Chromapages/CielitosWrld/issues/23) Align homepage View Project links with approved portfolio destinations | Navigation contract | cielitos-ui | planned | CW-023 | [Brief](docs/tickets/CW-024.md) |
| [CW-025 / #24](https://github.com/Chromapages/CielitosWrld/issues/24) Reconcile active Sanity schemas and editable page/query contracts | Content-contract discovery | cielitos-dev | planned | CW-002, CW-023 | [Brief](docs/tickets/CW-025.md) |
| [CW-026 / #26](https://github.com/Chromapages/CielitosWrld/issues/26) Restore truthful typecheck and lint gates compatible with installed Next | Tooling defect | cielitos-dev | planned | CW-001 | [Brief](docs/tickets/CW-026.md) |
| [CW-027 / #27](https://github.com/Chromapages/CielitosWrld/issues/27) Define independent acceptance verification and PR evidence gates | Delivery gate | cielitos-lead | planned | CW-001, CW-026 | [Brief](docs/tickets/CW-027.md) |
| [CW-028 / #28](https://github.com/Chromapages/CielitosWrld/issues/28) Establish measurable analytics, reliability and performance objectives | Measurement discovery | cielitos-lead | planned | CW-001, CW-007 | [Brief](docs/tickets/CW-028.md) |
| [CW-029 / #36](https://github.com/Chromapages/CielitosWrld/issues/36) Replace placeholder SEO/domain metadata and missing share-image fallback | Metadata defect | cielitos-dev | planned | CW-004, CW-037 | [Brief](docs/tickets/CW-029.md) |
| [CW-030 / #37](https://github.com/Chromapages/CielitosWrld/issues/37) Update owner and developer docs to the approved actual workflow | Documentation debt | cielitos-lead | planned | CW-002, CW-008, CW-023, CW-026, CW-037 | [Brief](docs/tickets/CW-030.md) |
| [CW-031 / #29](https://github.com/Chromapages/CielitosWrld/issues/29) Use one approved source for visible contact details and claims | Content consistency defect | cielitos-ui | planned | CW-025 | [Brief](docs/tickets/CW-031.md) |
| [CW-032 / #30](https://github.com/Chromapages/CielitosWrld/issues/30) Assess and retire unused integrations, components and divergent types safely | Maintenance discovery | cielitos-dev | planned | CW-018, CW-023, CW-025 | [Brief](docs/tickets/CW-032.md) |
| [CW-033 / #34](https://github.com/Chromapages/CielitosWrld/issues/34) Decide whether dark mode belongs in the first supported experience | Optional enhancement | cielitos-lead | planned | CW-001, CW-036 | [Brief](docs/tickets/CW-033.md) |
| [CW-034 / #31](https://github.com/Chromapages/CielitosWrld/issues/31) Decide homepage video scope and media delivery constraints | Optional enhancement | cielitos-lead | planned | CW-001, CW-004, CW-028 | [Brief](docs/tickets/CW-034.md) |
| [CW-035 / #32](https://github.com/Chromapages/CielitosWrld/issues/32) Decide whether generic page builder and live-preview infrastructure are needed | Architecture discovery | cielitos-lead | planned | CW-001, CW-025 | [Brief](docs/tickets/CW-035.md) |
| [CW-036 / #33](https://github.com/Chromapages/CielitosWrld/issues/33) Confirm current brand, content authority and design acceptance rubric | Design discovery | cielitos-lead | planned | CW-001 | [Brief](docs/tickets/CW-036.md) |
| [CW-037 / #35](https://github.com/Chromapages/CielitosWrld/issues/35) Confirm environments, repository trust, CI and progressive-release ownership | Operations gate | cielitos-lead | planned | CW-001, CW-002 | [Brief](docs/tickets/CW-037.md) |
| [CW-038 / #38](https://github.com/Chromapages/CielitosWrld/issues/38) Define predictable CMS outage, missing-content and refresh behavior | Reliability discovery | cielitos-dev | planned | CW-003, CW-008, CW-028 | [Brief](docs/tickets/CW-038.md) |
| [CW-039 / #39](https://github.com/Chromapages/CielitosWrld/issues/39) Make gallery cards reachable and activatable by keyboard | Accessibility defect | cielitos-ui | planned | CW-013, CW-036 | [Brief](docs/tickets/CW-039.md) |
| [CW-040 / #40](https://github.com/Chromapages/CielitosWrld/issues/40) Expose mobile gallery filter dialog and selection state accessibly | Accessibility defect | cielitos-ui | planned | CW-012, CW-036 | [Brief](docs/tickets/CW-040.md) |

## Proposed acceptance criteria
These are intake outcomes, not a silent substitute for the approved P1 spec. Human confirmed reliable inquiries first and preserve content/images; see DECISIONS.md D004. Exact metric and project strategy still need confirmation.

### CW-001
The human records one confirmed problem/user and a success-metric sentence with inclusions, exclusions, window, baseline period and guardrails, allowing P0 to exit.

Evidence: **Documented** — `cielitos-wrld-prd.md:8-24`; `STATE.md`. Required decision: First outcome accepted: trustworthy inquiries. Confirm the exact metric/audience, inclusions/exclusions, destination/status and baseline window before P0 exit; no implementation spec approved.

### CW-002
The content owner approves a named account/project/dataset transition and preservation scope with access prerequisites and a reversible migration or access-transfer decision.

Evidence: **Documented** — `DECISIONS.md:D002`; `sanity/env.ts:1-19`; `sanity.config.ts:13-19`. Required decision: Preserve existing content/images; determine access and exact retention scope before selecting access-transfer versus migration. No deletion/reset, account creation, paid-tier or credential change is implied.

### CW-003
In the approved nonproduction environment, public pages read the approved dataset and authorized Studio/comment/review operations use their approved permissions without exposing write credentials to the browser.

Evidence: **Observed** — `sanity/env.ts:1-19`; `sanity/lib/client.ts:1-10`; `app/actions/comments.ts:8-14`; `app/actions/reviews.ts:7-13`; `.env.local.example`. Required decision: Human provides credentials through an approved secret mechanism and authorizes environment/CORS changes; no secrets in issues.

### CW-004
Every active local asset reference and every document/asset reference in the approved retained-content scope resolves in the nonproduction target, with a recorded restoration path for migration failure.

Evidence: **Observed** — `app/layout.tsx:81`; `components/home/AboutSnippet.tsx`; `components/home/ContactCTA.tsx`; `lib/optimized-gallery.ts`. Required decision: Human confirms asset ownership/source and retained-content inventory; do not fetch or migrate live data without permission.

### CW-005
A synthetic inquiry reaches the approved test destination with evidence for the exact accepted/persisted/provider-accepted/delivered state claimed by the UI, and a failure never produces a false success.

Evidence: **Observed** — `app/api/contact/route.ts:26-53`; `components/contact/ContactForm.tsx:28-75`. Required decision: P1 must select receipt/delivery contract, owner destination, provider/storage approach, failure recovery and duplicate-submission policy. Real email/DNS/spend remain human gates.

### CW-006
Every approved contact field, including budget, is validated server-side and reaches its approved destination unchanged or explicitly normalized, while rejected inputs display the corresponding accessible field error without losing correct input.

Evidence: **Observed** — `components/contact/ContactForm.tsx:6-18,28-52,85-159`; `app/api/contact/route.ts:4-24`. Required decision: Dev is integration owner; UI may change ContactForm only in a sequential assigned task after the shared contract is approved.

### CW-007
An independent reviewer demonstrates that the approved personal-data access/retention and abuse rules hold for synthetic contact/comment/review inputs, including no personal data in logs, no public private-email access, and no displayed spam or cross-post replies.

Evidence: **Observed** — `app/api/contact/route.ts:33-39`; `app/actions/comments.ts:16-90`; `app/actions/reviews.ts:15-94`; `sanity/schemaTypes/comment.ts:36-47`; `components/blog/Comments.tsx:9-18`; `components/home/ReviewForm.tsx:68-81`. Required decision: Lead obtains human privacy/retention requirements and independent review; do not invent legal compliance claims or add a rate-limit vendor.

### CW-008
Under the approved single testimonial-source contract, a synthetic pending review is absent publicly, appears after authorized approval and refresh, and disappears after approval is revoked without exposing its private fields.

Evidence: **Observed** — `app/actions/reviews.ts:62-85`; `sanity/lib/queries.ts:257-267`; `sanity/schemaTypes/kindWords.ts`. Required decision: Choose one source of truth and treatment of existing embedded testimonials before migration; preserve existing content unless explicitly approved otherwise.

### CW-009
When there are no published testimonials, a visitor can still discover and open the approved review form and sees the approved empty/submission/error states.

Evidence: **Observed** — `components/home/TestimonialsCarousel.tsx:77-85,120-131`. Required decision: Human approves empty-state copy and placement; UI owns the carousel file.

### CW-010
Selecting Photos or Videos with zero attribute filters makes the cards, count and lightbox contain only that media type, with the same result when attribute filters are added or removed.

Evidence: **Observed** — `components/gallery/GalleryClient.tsx:31-66,86-87,119-149`. Required decision: Preserve approved exact-match attribute semantics; no redesign or extra search scope.

### CW-011
A filter combination with no matches displays the approved no-results/reset state, and reset returns exactly the approved media-and-attribute baseline with synchronized count and lightbox.

Evidence: **Observed** — `components/gallery/GalleryClient.tsx:52-66,119-137`. Required decision: P1 defines whether Clear resets media as well as attributes and how total-empty differs from filtered-empty.

### CW-012
Every exposed mobile filter has an approved editable/queryable content field and produces the documented result, including an approved way to select media or an explicit removal of that promise.

Evidence: **Observed** — `components/gallery/GalleryMobileFilters.tsx:19-45,123-181`; `sanity/schemaTypes/galleryAsset.ts:121-153`; `sanity/lib/queries.ts:43-53`. Required decision: Decide supported attributes and mobile scope; do not silently resurrect old schema fields or promise an unapproved three-column layout.

### CW-013
A fresh independent keyboard/assistive-technology review confirms the approved dialog semantics, focus containment/restoration, named controls, media labels and close/navigation behavior.

Evidence: **Observed** — `components/gallery/Lightbox.tsx:204-306`. Required decision: P1 selects accessibility target and manual test matrix; reuse existing dialog convention where appropriate without changing unrelated UI.

### CW-014
With two synthetic videos and one malformed video item, only the selected valid video may play, leaving/closing stops playback, and invalid media produces the approved nonplaying fallback.

Evidence: **Inferred** — `components/gallery/Lightbox.tsx:17-29,213-233`; `sanity/schemaTypes/galleryAsset.ts:83-120`. Required decision: Confirm permitted hosts, autoplay policy and fallback semantics; do not contact real third-party media during intake.

### CW-015
For a synthetic collection larger than one approved page, a visitor can reach every eligible post in the documented order without duplicate/omitted boundary items and recover from a failed next-page request.

Evidence: **Observed** — `app/blog/page.tsx:40-65,109-118`; `sanity/lib/queries.ts:311-327`. Required decision: P1 chooses pagination versus infinite loading and URL/back-button behavior; dev owns shared route integration, UI review does not write the same file concurrently.

### CW-016
The sidebar either performs the approved search with normal/empty/loading/error states or no longer presents an input that promises unavailable search.

Evidence: **Observed** — `components/blog/BlogSidebar.tsx:24-118`. Required decision: Removal or implementation needs human-approved scope; no external search service by default.

### CW-017
Every remaining feed action produces its explicitly approved observable behavior, and no unavailable action remains presented as working.

Evidence: **Observed** — `components/blog/BlogPost.tsx:170-199`. Required decision: Human selects remove versus implement and confirms labels; persistence/identity for engagement is not authorized.

### CW-018
Each approved authorable post type, including body media, renders its primary content consistently in the feed and permalink from the same validated contract, with approved handling of legacy records.

Evidence: **Observed** — `sanity/schemaTypes/post.ts`; `sanity/lib/queries.ts:311-327,392-420`; `components/blog/BlogPost.tsx:14-164`; `app/blog/[slug]/page.tsx:80-164`. Required decision: Human/content owner selects supported types and legacy migration scope; dev integrates query/schema/detail while UI owns feed changes only by sequenced assignment.

### CW-019
Archived synthetic posts obey the approved list/permalink visibility rule across feed queries and cached responses, and unarchiving restores only the approved visibility.

Evidence: **Observed** — `sanity/schemaTypes/post.ts:199-206`; `sanity/lib/queries.ts:311-327,392-420`. Required decision: Confirm list-only versus permalink hiding; do not delete archived content.

### CW-020
Every About/legal link exposed to visitors resolves to its approved accessible destination with human-approved content, or is intentionally removed through the approved navigation decision.

Evidence: **Observed** — `components/home/AboutSnippet.tsx:62-65`; `components/layout/Footer.tsx:168-187`; `app/`. Required decision: Human supplies/approves legal and About content and chooses build versus removal; no AI legal compliance claims.

### CW-021
Each exposed blog navigation destination performs its approved function with defined empty/error behavior and cannot accidentally resolve as an unrelated ordinary post.

Evidence: **Observed** — `components/blog/BlogPost.tsx:170-177`; `components/blog/BlogSidebar.tsx:73-84`; `app/blog/[slug]/page.tsx:151-155`. Required decision: Decide supported destinations; a request for tickets is not approval to build an anonymous ask or content-submission service.

### CW-022
Across the approved viewport matrix including both breakpoint boundaries, at least one usable primary navigation is visible and nested blog routes expose the approved Blog active state.

Evidence: **Inferred** — `components/layout/Navbar.tsx:9-19,33-62`; `components/layout/MobileNavbar.tsx:8-35`. Required decision: Approve viewport/reflow matrix and active-state semantics; preserve current information architecture pending CW-020/021.

### CW-023
The approved keep/consolidate/retire decision leaves no active Work query or public route without an editable source and defined empty/not-found behavior, preserving retained project content.

Evidence: **Observed** — `sanity/schemaTypes/index.ts:23-44`; `sanity/lib/queries.ts:339-390`; `app/work/page.tsx`; `app/work/[slug]/page.tsx:27-76`. Required decision: Portfolio gallery versus separate projects needs a product/content decision before new schemas or route retirement.

### CW-024
Each featured card label and destination match the approved item-level or collection-level navigation contract, with no misleading View Project link.

Evidence: **Observed** — `components/home/FeaturedWork.tsx:90-131`; `app/work/page.tsx:42-61`. Required decision: No blind switch to /work/[slug] when featured items are galleryAsset documents rather than work documents.

### CW-025
For each approved active page setting, one documented authoring location controls the rendered value under a consistent selection contract, with no uneditable promised field or ambiguous duplicate source.

Evidence: **Observed** — `sanity/schemaTypes/homePage.ts`; `sanity/schemaTypes/homeAbout.ts`; `sanity/schemaTypes/siteSettings.ts`; `sanity/schemaTypes/galleryAsset.ts`; `sanity/lib/queries.ts:130-283,346-362`; `sanity/structure.ts`. Required decision: Inventory before removal; existing content may use legacy fields. Shared queries/schema files have one dev integration owner.

### CW-026
Approved deterministic type/lint/build checks use a compatible toolchain and fail on genuine violations without ignored build errors or weakened rules, with real outputs attached.

Evidence: **Observed** — `next.config.js:36-40`; `package.json:5-9,53-65,85-90`; `.eslintrc.json`; `tsconfig.json`. Required decision: Config, tests and lockfiles are protected; authorize an explicit scoped tooling task and repository trust before any edits or installs.

### CW-027
The human-approved plan maps every accepted criterion to a proving command/scenario and a named fresh read-only verifier or human, with done-unverified/verified transitions and protected-file checks defined.

Evidence: **Observed** — `package.json:5-9`; `AGENTS.md`; `STATE.md`. Required decision: No test framework/vendor chosen during intake; deterministic output counts only for the behavior it exercises.

### CW-028
An approved measurement contract defines the outcome event, audience/exclusions/window, diagnostic and guardrail events, baseline period, relevant SLIs/SLOs and collection/verification ownership without inventing results.

Evidence: **Unknown** — `cielitos-wrld-prd.md:8-16,134-138`; `STATE.md`. Required decision: Choose first outcome before tracking; avoid third-party analytics, consent changes or numeric SLOs without approved requirements.

### CW-029
In the approved environment, generated metadata and share images resolve to the approved owned domain/assets and contain no placeholder verification value, with page-specific values checked independently.

Evidence: **Observed** — `app/layout.tsx:71-129`; `app/blog/[slug]/page.tsx:11-78`; `sanity/schemaTypes/siteSettings.ts:31-56`. Required decision: Human supplies authoritative domain/verification requirements; no DNS or Search Console mutation.

### CW-030
A fresh reader can follow the approved setup, content-editing/moderation and verification instructions without invoking inactive features or exposing credentials; implementation status is explicitly separated from product intent.

Evidence: **Documented** — `STUDIO_GUIDE.md`; `cielitos-wrld-sanity-setup.md`; `cielitos-wrld-prd.md`; `.env.local.example`; `sanity.config.ts:9-19`. Required decision: Lead owns prose; dev owns any separately authorized environment-template/config changes. Historical PRD intent should not be silently rewritten as approval.

### CW-031
All active displayed/copied email, phone, social destinations and service claims match the single human-approved contact content source in normal and missing-content states.

Evidence: **Observed** — `components/home/ContactCTA.tsx:16-45,65-145`; `app/contact/page.tsx:14-40,68-149`; `components/layout/Footer.tsx:6-38`. Required decision: Human approves public details and service claims; do not copy values from unused cards or invent services.

### CW-032
An approved reference-backed retirement inventory identifies each retained/deleted path and its active consumers, and any executed cutover leaves no broken caller or second competing contract.

Evidence: **Observed** — `lib/wordpress/`; `lib/apollo-wrapper.tsx`; `lib/gallery-metadata.ts`; `lib/optimized-gallery.ts`; `lib/types.ts`; `lib/types/gallery.ts`; `components/home/Hero.tsx`; `components/gallery/GalleryFeed.tsx`; `sanity/deskStructure.tsx`; `components/home/GalleryPreview.tsx:430-436`. Required decision: Discovery first; no broad cleanup, lockfile edits or dependency removal during intake. UI reviews removals in its components.

### CW-033
The human records include/defer/remove for dark mode with an outcome rationale and, only if included, approved preference/persistence, contrast and first-render criteria.

Evidence: **Observed** — `lib/contexts/DarkModeContext.tsx`; `components/DarkModeSwitcher.tsx`; `app/layout.tsx:164-174`; `cielitos-wrld-prd.md:149-152`. Required decision: No automatic activation or redesign based on dormant code.

### CW-034
The human records image-only versus video scope with owned media, fallback, autoplay/reduced-motion, mobile data and performance acceptance requirements before implementation.

Evidence: **Observed** — `components/HeroSection.tsx:21-88`; `components/home/VideoSection.tsx`; `app/page.tsx:17-22`; `cielitos-wrld-prd.md:66-76,129-130`. Required decision: A documented aspiration is not current build authorization; do not enable external embeds or invent performance thresholds.

### CW-035
The content owner records the concrete authoring job and include/defer/retire decision for generic pages/live preview with an explicit reversal path for retained content.

Evidence: **Observed** — `sanity/schemaTypes/page.ts`; `components/sections/PageSections.tsx`; `sanity/lib/queries.ts:179-211`; `sanity/lib/live.ts`; `app/page.tsx`. Required decision: Do not wire a new CMS page router, draft-preview token or live service without approved spec and demand.

### CW-036
A human-approved current design/content rubric identifies authoritative fonts/tokens/copy, allowed changes, required states, viewport and accessibility checks so UI can implement without guessing.

Evidence: **Documented** — `cielitos-design-system.json`; `cielitos-wrld-wireframes.md`; `app/globals.css:7-106`; `tailwind.config.ts:30-138`. Required decision: Preserve current photography-first earth-tone direction until approved; no speculative redesign.

### CW-037
The human approves repository trust and delivery ownership with named nonproduction/production environments, branch/PR rules, independent checks, rollout/rollback criteria and explicit release authority before build or deployment work.

Evidence: **Observed** — `.git/config:8-13`; `.git/HEAD`; `STATE.md`; `cielitos-wrld-prd.md:142-145`. Required decision: Do not add global safe.directory, alter CI/secrets, provision infrastructure, deploy or stop herdr on behalf of this ticket without explicit authorization.

### CW-038
For each approved critical CMS read/write flow, a synthetic outage/missing-document/recovery scenario produces the specified truthful state and meets the approved freshness/reliability indicator without silently showing invented content.

Evidence: **Observed** — `app/page.tsx:12-22`; `app/layout.tsx:61-68,132-144`; `components/blog/Comments.tsx:9-18`; `sanity/lib/client.ts`; `app/actions/reviews.ts:62-94`. Required decision: Define critical flows, fresh/stale limits and recovery first; no blanket retries, fake fallbacks or live-content service additions.

### CW-039
Each gallery card can be reached and activated through approved native keyboard behavior with an accessible name and visible focus, opening the corresponding item and returning focus on close.

Evidence: **Observed** — `components/gallery/GalleryCard.tsx:22-26`; `components/gallery/GalleryGrid.tsx:16-18`. Required decision: Approve accessible naming/focus rubric; UI owns cards while lightbox/shared integration is sequenced.

### CW-040
Keyboard and assistive-technology users can open, understand, select within and close the approved filter sheet with contained/restored focus, named controls and programmatically exposed selections.

Evidence: **Observed** — `components/gallery/GalleryMobileFilters.tsx:126-136,198-210`. Required decision: Confirm modal semantics and immediate versus Show Results application before implementation.

## PR handling — proposed, not started
No existing PRs were returned during intake; no PR was created. No default-branch edits are committed. State/brief/ticket artifacts are uncommitted working-tree files; Git cleanliness is Unknown because ownership checks are blocked.

After human P0/P1/P2 exits: issue -> owned task branch/worktree -> bounded implementation -> done-unverified with real outputs -> fresh independent criterion check -> draft PR evidence -> human merge/release decision. No empty PRs or invented evidence. Tests/config/thresholds/lockfiles/CI and secrets remain protected; required tooling work needs explicit approval and ownership.

Shared integration ownership: dev owns contact API/form integration, Sanity queries/schema and blog route contract; UI writes coupled components only in a separately sequenced assignment. State, ticket and decision records remain lead-only. Separate tabs are not isolation. Lead never authors production code or self-verifies.

## What is deliberately not promised
No delivery dates, effort, cost or RICE scores: inputs are Unknown. No vendor selection, new project, content deletion, analytics tool, persistence architecture, autoplay policy or legal copy approved. Optional dark mode/video/page-builder/search/social work gets discovery decisions, not build slots. No production launch recommendation yet.

## P0 provider prerequisite — latest delta
Human requested implementation and, when asked about an existing delivery setup, requested a provider recommendation. The first accepted outcome remains reliable inquiries with preserved content/images; no P1/P2 exit is implied.

| Task | Owner | Status | Dependencies | Single acceptance criterion |
|---|---|---|---|---|
| P0-PROVIDER: source-based vendor recommendation | cielitos-lead | done-unverified | Human recommendation request; CW-005 | A primary-source comparison states one proposed provider, limits, reversal/risk picture and human gates without claiming operational verification. |
| P0-PROVIDER-DECISION | cielitos-lead | done-unverified | Explicit human approve_resend_for_spec answer, D005 | The human accepts/rejects the proposed provider on the decision record; accepted for specification only. |

Recommendation artifact: docs/backlog/inquiry-provider-recommendation.md. Resend is now accepted for specification only (D005), not purchases, provisioning, secrets, live sends, SDK installation or build. Independent verification is not yet assigned.

## P1 specification — current delta
P0 problem/metric/destination policy accepted in D006; exact docs/specs/reliable-inquiries.md v1/D007 approved for planning by D009. Implementation is not yet authorized.

| Task | Owner | Status | Dependencies | Single acceptance criterion |
|---|---|---|---|---|
| P1-SPEC: inquiry specification | cielitos-lead | done-unverified | D004–D006 | A ten-part versioned spec defines AC1–8, all states/contracts, measurement, failures and explicit unresolved gates without claiming live verification. |
| P1-APPROVAL: exact spec and architecture decision | cielitos-lead | done-unverified | Human approve_v1_and_d007, D009 | Human accepted exact v1 and the synchronous provider-acceptance trade-off before P2 began. |

All implementation tickets remain planned; no task is independently verified. Account/content migration and other 40-ticket backlog work are not automatically in the inquiry increment. No tests/config/lockfiles/CI changes or new SDK authorized.

## P2 planning — active assignments
Existing herdr agents were read before reassignment, then prompted once without retrying the known --wait false-negative. Prompt admission is not completion evidence. No language server is configured (observed); use documented reference-search fallback before any later exported type change. No code/check execution authorized.

| Task | Owner | Status | Dependencies | Single acceptance criterion |
|---|---|---|---|---|
| P2-DEV: feasibility/files/checks/estimate report | cielitos-dev | done-unverified | D009; docs/briefs/P2-dev-feasibility.md | Source-backed report returned exact proposed scope/checks, conditional pass envelope and spec defects without mutations. |
| P2-UI: feasibility/states/checks/estimate report | cielitos-ui | done-unverified | D009; docs/briefs/P2-ui-feasibility.md | Source-backed report returned UI scope/states/scenarios, conditional estimate and spec defects without mutations. |
| P2-PLAN: ranked increment, graph, briefs, caps and independent checks | cielitos-lead | done-unverified | Human v2/D010; completed builder reports | Plan v1 proposes exact owned branch/file resources, checks/criteria, finite budgets, independent verifier and explicit live gates; not independently verified. |
| P2-APPROVAL | cielitos-lead | done-unverified | Explicit human approve_plan_v1_d011, D011 | Human approved bounded plan/resources/exceptions before implementation assignment. |

Priority proposal (not numeric RICE): docs/plans/inquiry-priority-inputs.md. Pre-existing modified package-lock.json is protected and will not be staged/reset/overwritten. Codex CLI 0.166.0 is installed; authentication/browser capability remains Unknown. Claude command was absent; do not retry/install. Proposed independent checker must be a fresh read-only agent/human, not either builder or lead.

## P1 explicit clarification after builder planning
No production changes. Reports and estimate qualifications: docs/plans/inquiry-builder-findings.md. Candidate v2: docs/specs/reliable-inquiries-v2.md; approved v1 is preserved and not silently patched.

| Task | Owner | Status | Dependencies | Single acceptance criterion |
|---|---|---|---|---|
| P1-V2-DRAFT: resolve surfaced contract gaps explicitly | cielitos-lead | done-unverified | Completed P2 reports; D001 return rule | Candidate clarifies validation, canonical identity, response codes, exact UI recovery, clock expiry and test isolation without adding unapproved features. |
| P1-V2-DECISION | cielitos-lead | done-unverified | Explicit human approve_v2_and_d010 | Human approved the clarification; P2 planning may resume but build remains gated. |

No task is independently verified. UI estimated 8–14 active hours, conditional/not measured; dev elapsed estimate Unknown. No aggregate schedule or account/spend/delivery claim. Actual report completion, not idle pane state, established planning deliverable availability.

## Approved inquiry increment tasks
D011 authorizes the bounded serial plan. Actual statuses below supersede the former proposal; partial local checks do not establish full AC1–8 acceptance.

| Task | One owner | Status | Dependencies | Single acceptance criterion | Brief |
|---|---|---|---|---|---|
| L0 docs checkpoint | cielitos-lead | done-unverified | Human P2 approval, D011 | Actual docs-only commit 00afdf0 and draft PR #41; protected hashes unchanged, no unrelated staging. | docs/briefs/P3-docs-checkpoint.md |
| D1 API/shared contract | cielitos-dev | done-unverified | Actual docs base 00afdf0 | Actual 7d174bb/frozen contract returned; fresh 72-case API fixture pass covers local portions, not complete live acceptance. | docs/briefs/P3-api.md |
| U1 form | cielitos-ui | done-unverified | Actual API base 7d174bb | Actual one-file da568aa/report returned; actual React/browser/accessibility/navigation criteria remain unchecked, not replaced by author harness. | docs/briefs/P3-ui.md |
| V1 fresh independent check | cielitos-verifier-local (fresh Codex context) | done-unverified | Frozen da568aa; approved read-only/local-only scope | Actual report/supplement delivered and logged in inquiry-independent-check.md: partial local API pass, compiler/lint failures and unchecked full criteria; no edits or live calls. | docs/briefs/P4-inquiries.md |
| L1 operating runbook | cielitos-lead | in flight | Actual candidate and independent report | docs/CONTACT_INQUIRIES.md and independent evidence digest now distinguish local results/live gates and recovery; actual draft PR publication remains. | docs/briefs/P3-runbook.md |
| H1 live prerequisites | requesting human/environment owner | blocked | User D013 explicitly not ready; separate access/send/privacy permissions still missing | Approved nonproduction config/inbox and authority support fresh actual-page/provider/inbox proof without production guesses. | docs/briefs/H1-live-prerequisites.md |

No aggregate effort/date or model-cost claim. Approved finite caps are guards, not estimates. Actual branches/source commits/docs PR #41 and scoped exceptions are recorded in STATE; no broader protected tooling repair authorized. Missing actual-page/accessibility/provider/inbox/hosting/privacy/export evidence and non-green type/lint remain release blockers, not shipped fallbacks.
