# JOB
As lead/orchestrator, consolidate known source findings and bounded dev/UI intake into a traceable GitHub backlog and P0 decision request.

# CONTEXT
The human authorizes issue intake and lead/dev/UI collaboration, and intends a new Sanity account. Neither a confirmed problem/metric, an approved P1 spec, nor an approved P2 build plan exists. Existing herdr workspace wK already contains Lead wK:t1/wK:p1, Dev wK:t2/wK:p2, UI wK:t3/wK:p3; agents are omp. GitHub repo is Chromapages/CielitosWrld, remote/default branch main; issue and PR lists were empty when inspected. Git status is blocked by dubious ownership; do not change trust. Prior source/browser observations are not independently verified.

# BOUNDARIES
Only lead writes STATE.md, DECISIONS.md, TASKS.md, progress.md, AGENTS.md and docs/briefs or backlog artifacts, and creates intake GitHub issues. No production source, config, tests, lockfiles, credentials, commits, pushes, merges, deploys, account changes, installations, or live data access. No implementation or empty PRs. Do not self-verify. Do not use or retask other workspaces. Existing workers receive discovery-only briefs. Human owns spec/plan approvals and significant business choices.

# OUTPUT CONTRACT
Create a single task inventory with one owner, one proposed observable acceptance criterion, dependencies, evidence/source and status per ticket; link actual GitHub issue URLs. Use existing labels. Separate defects, investigations, documentation and optional enhancements. Record available pane map, caps, unresolved gates and evidence tags. Capture significant accepted user directions only as accepted decisions; recommendations remain proposed. Define an issue-to-branch-to-PR-to-independent-check workflow without starting P2/P3. Single acceptance criterion: human can navigate an evidence-tagged backlog and see ownership, dependencies, actual agent status, blocked gates and the next P0 decision.

# STOP CONDITIONS
One intake pass; at most two worker agents concurrently, discovery-only with a five-minute active cap each and no retries. No autonomous implementation loops. GitHub issue creation capped at 40 intake tickets, serialized to avoid bursts and duplicates; persist every returned URL. Stop mutations on ambiguous API failure and inspect before retry. If Git trust, account access, budget, metric or approval is missing, finish reachable intake work and ask explicitly. No paid purchases or credential/infrastructure changes.
