# Quality Bar

**Project:** CielitosWrld  
**Stack:** Next.js 16 (App Router), TypeScript, React 18, Tailwind CSS, Sanity CMS, Vercel  
**Deployment:** Vercel  
**Owner:** CielitosWrld Team  
**Last updated:** 2026-05-03

---

## Purpose

This document defines the minimum engineering, product, and release standards for CielitosWrld. Any task is considered incomplete until it meets the requirements in this file.

---

## Core Commands

| Action | Command |
|---|---|
| Start dev server | `npm run dev` |
| Build | `npm run build` |
| Run tests | `npm test` |
| Run tests in watch mode | `npm run test:watch` |
| Lint | `npm run lint` |
| Type check | `npm run type-check` |
| Format | `npx prettier --write .` |
| Coverage | `npm test -- --coverage` |
| Security audit | `npm audit` |

---

## Engineering Standards

### TypeScript

- Strict mode must remain enabled.
- Do not use `any` unless there is a written justification comment and linked ticket.
- All exported functions, hooks, utilities, and API handlers must include explicit types.
- Prefer narrow union types, shared interfaces, and Zod-backed validation over loose object shapes.

### React and Next.js

- Use functional components only.
- Use named exports only, except where Next.js requires default exports for pages, layouts, or route handlers.
- Do not call external APIs directly inside React components; use `/lib` wrappers or server-side utilities.
- Add `loading`, `error`, and `notFound()` handling where relevant.
- Treat graceful degradation as part of the feature, not a follow-up enhancement.

### Files and Naming

- File names use `kebab-case`.
- Components use `PascalCase`.
- Variables use `camelCase`.
- Constants use `UPPER_SNAKE_CASE`.
- Target maximum file length: 400 lines.
- Target maximum function length: 60 lines.

### Imports and Utilities

- Order imports as: built-in, external, internal.
- Place `react` first within external imports.
- Use the shared `cn()` helper built from `clsx` and `tailwind-merge` for conditional class names.
- Access secrets only through `process.env`.

---

## Example Patterns

### Acceptable

```tsx
export function ContactStage({ stage }: { stage: ContactStage }) {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  return <div>{status}</div>;
}
```

### Unacceptable

```tsx
export default function (props: any) {
  const status = useState('idle');
  return <div>{props.stage}</div>;
}
```

---

## Project Layout

```text
/app                    → Next.js App Router pages and route handlers
  /about                → About page
  /blog                 → Blog listing and detail pages
  /contact              → Contact page
  /gallery              → Gallery page
  /services             → Service pages
  /work                 → Portfolio pages
  /api                  → API routes
  /layout.tsx           → Root layout
/components             → Reusable UI components
  /blog                 → Blog-specific components
  /contact              → Contact components
  /gallery              → Gallery components
  /hero                 → Hero section components
  /home                 → Home page sections
  /layout               → Header, footer, navigation
  /providers            → Context providers
  /services             → Service components
  /ui                   → Shared UI primitives
  /work                 → Work page components
/lib                    → Utilities, clients, helpers, validation
  /emails               → React Email templates
  /hooks                → Shared hooks
  /types                → Shared interfaces and types
  /validations          → Zod schemas
/hooks                  → Global custom hooks
/types                  → Global types
/public                 → Static assets
/__tests__              → Test setup and support files
/sanity                 → Sanity CMS configuration
/design-system          → Design tokens and visual standards
```

---

## Decision Boundaries

### Always Do

- Run lint, type check, and tests before every pull request.
- Add tests for every new function, hook, API route, or meaningful UI behavior.
- Validate all form and API inputs with Zod.
- Use structured logging for failures and operational events.
- Use the Sanity image URL builder for all Sanity-hosted images.
- Ensure production code paths fail safely and recover gracefully where possible.

### Ask First

- Adding a new npm dependency.
- Modifying Sanity schemas or GROQ queries.
- Changing API response shapes or route contracts.
- Adjusting rate limits.
- Editing design tokens, global CSS, or Tailwind configuration.
- Adding, removing, or repurposing environment variables.

### Never Do

- Commit secrets, API keys, or tokens.
- Manually edit `node_modules/` or `package-lock.json`.
- Delete or bypass failing tests.
- Push directly to `main`.
- Use `// @ts-ignore` without a linked issue.
- Return raw stack traces to users in production.
- Leave `console.log` statements in production code.

---

## Testing Requirements

- Frameworks: Vitest, React Testing Library, and Playwright.
- Unit and component tests should live close to the code they verify.
- End-to-end tests should live in `/tests`.
- Coverage must stay at or above 70 percent; CI blocks merges below that threshold.
- Critical user flows must have end-to-end coverage.

Required coverage by layer:

- Utilities and hooks: unit tests.
- Shared UI and feature components: component tests.
- API routes: integration tests.
- Primary business flows: end-to-end tests.

---

## Defect Severity

### Critical — Deployment Blocker

Any one of the following blocks deployment immediately:

- Security vulnerability, including exposed credentials, injection risk, or missing authorization.
- Data loss risk, including destructive operations without rollback or confirmation.
- Production crash caused by unhandled exceptions.
- Broken core flow such as contact form, gallery, or primary CTA.
- Sanity fetch failure that crashes a page instead of failing gracefully.

### Major — Merge Blocker

Any one of the following blocks merge:

- Output does not match the agreed spec.
- TypeScript errors or unjustified `any` usage.
- Coverage falls below 70 percent.
- API error handling is incomplete or leaks internals.
- Performance budget regression.
- Missing `notFound()`, loading, or error handling where required.
- Rate limiting is misconfigured.
- New dependency added without review for bundle impact and licensing.

### Minor — Fix Soon

These do not block merge unless repeated or user-facing:

- Naming convention violations.
- Missing TSDoc on exported logic.
- Tailwind class ordering inconsistency.
- Oversized files.
- Missing alt text.
- Missing loading states for non-critical async behavior.

---

## Performance Budget

| Metric | Threshold |
|---|---|
| Lighthouse performance | 85 or higher |
| Lighthouse accessibility | 90 or higher |
| First Contentful Paint | Under 1.8s |
| Largest Contentful Paint | Under 2.5s |
| JavaScript bundle, gzipped | Under 300 KB |
| API response time, p95 | Under 300 ms |
| Build time | Under 3 minutes warning threshold |

Any intentional budget exception requires written approval and a follow-up remediation ticket.

---

## Reliability Targets

| Signal | SLI | SLO |
|---|---|---|
| Availability | Successful HTTP responses | 99.5% or higher over 30 days |
| Latency | API p95 response time | Under 300 ms |
| Error rate | 5xx responses / total requests | Under 0.5% |
| Build health | Green CI runs over 7 days | 95% or higher |

- Error budget: 0.5 percent of monthly requests, about 3.6 hours of downtime.
- Freeze deploys when more than 50 percent of the monthly error budget is consumed.

---

## Observability

- Logs must be structured JSON with at least `timestamp`, `level`, `message`, and `service`.
- Sentry must capture client, server, and edge exceptions.
- Request IDs should propagate through headers and logs.
- Analytics should remain enabled for Vercel and Upstash where already configured.
- Page the on-call owner when error rate exceeds 1 percent for 5 consecutive minutes.
- Maintain a live `/api/health` endpoint for service checks.

---

## Incident Response

| Severity | Definition | Response SLA |
|---|---|---|
| SEV-1 | Full outage or data breach | 15 minutes |
| SEV-2 | Major feature outage or severe degradation | 1 hour |
| SEV-3 | Minor degradation with workaround | Next business day |

Each critical path should have a runbook with:

1. Symptoms.
2. Blast radius.
3. Initial diagnosis steps.
4. Recovery or rollback steps.
5. Escalation path.

---

## Deployment Standards

- Feature flags are required for user-facing changes above minor scope.
- Preview or draft content behavior should be protected behind flags where practical.
- Use canary rollout patterns before full exposure when risk is non-trivial.
- Rollback time objective is under 5 minutes using Vercel rollback.
- Schema and content model changes must remain backward-compatible during rollout.
- Deployments must preserve zero-downtime expectations.

---

## Security and Data

- Validate all incoming form and API data with Zod before processing.
- Protect contact workflows with Upstash-backed rate limiting.
- Do not persist contact form PII unless there is a documented need and approved storage path.
- Rotate secrets at least every 90 days.
- Confirm third-party services used in production have acceptable uptime and security posture.
- Run `npm audit` and resolve all high and critical vulnerabilities before deploy.

---

## Dependency Policy

- Commit the lockfile and never edit it manually.
- Avoid broad version ranges on security-sensitive packages.
- Do not introduce GPL dependencies into the commercial product.
- Review bundle size, maintenance health, and licensing before adding packages.
- Document operational dependencies such as Sanity, Vercel, Resend, and Upstash.

---

## Git Workflow

- Branch names should follow `feature/[short-description]` or `fix/[short-description]`.
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Pull requests must include what changed, why it changed, and how to test it.
- All CI checks must pass before merge.
- At least one reviewer approval is required.

---

## Definition of Done

A task is done only when all of the following are true:

1. The output matches the linked spec, ticket, or agreed scope.
2. All tests pass, and new logic has new tests.
3. Linting, formatting, and type checking pass with no unresolved errors.
4. Performance budgets are not materially regressed.
5. Observability and error handling are in place for new critical paths.
6. Required review has been completed.
7. The self-audit below is complete with no unresolved critical failures.

---

## Agent Self-Audit

Complete this checklist before handoff:

- ✅ Commands — Build, lint, type check, and tests pass.
- ✅ Defects — No critical or major defects introduced.
- ✅ Boundaries — All always/ask-first/never rules respected.
- ✅ Tests — New logic includes appropriate coverage.
- ✅ Performance — Budgets remain within threshold or exception is documented.
- ✅ Observability — New code paths are logged, traceable, and error-aware.
- ✅ Security — Inputs validated, secrets protected, no unsafe shortcuts.
- ✅ Spec alignment — Output matches the requested behavior exactly.

Use this status format when reporting:

- ✅ Passed
- ⚠️ Deferred — include reason and ticket
- 🚨 Failed — include action taken

Do not mark work complete while any unresolved 🚨 item remains.

---

## Lessons Learned

Add project-specific gotchas, footguns, and hard-won decisions here as they are discovered.

- [2026-05-03] Sanity is the content source; fetch through approved `next-sanity` clients and shared lib utilities, not directly inside components.
- [2026-05-03] Upstash rate limiting is per IP; account for proxy and Vercel edge behavior.
- [2026-05-03] Sanity-hosted images should always be rendered through the Sanity image URL builder.
