# JOB
Checkpoint only lead-created approved coordination/spec/plan artifacts on a nondefault docs branch and prepare a real draft documentation PR, without touching production code or user changes.

# CONTEXT
NOT ACTIVE until human approves docs/plans/2026-11-09-reliable-inquiries-plan.md v1. Lead owns this task and all coordination artifacts, never production implementation. Effective inquiry spec v1+v2 approved; Resend Free, no paid upgrade/live operations. Initial authorized status: main with user-owned modified package-lock.json and untracked lead docs. Agent/check topology and branch names are proposals until P2 approval.

# BOUNDARIES
Only lead-created paths explicitly listed in docs/plans/inquiry-docs-manifest.txt may be staged/committed. No bulk directory/add ., code/config/test/lockfile staging, global Git trust, stash/reset/restore, installs/checks/services/accounts/sends/merge/deploy. Use per-command safe.directory. One Git index owner; builders remain unassigned until lead handoff. Preserve every unknown/unexpected change. Branch name collision => stop, do not overwrite.

# OUTPUT CONTRACT
Single acceptance criterion: actual docs-only commit exists on plan/inquiry-v2 with approved source-of-truth artifacts and no unrelated files, while package-lock/user work remain unstaged/unchanged. Read current status/protected baseline before mutation. Create branch only from actual approved base; record actual commit ID. If human-approved push/draft PR succeeds, record real URL with phase/evidence limits; no empty PR or success fabrication. These are metadata/docs operations, not verification of this plan. Pass actual branch/commit and Git ownership to dev before its task. Report changes, commands, not-run checks and blocker, then finish.

# STOP CONDITIONS
One pass up to 30 minutes, no retry of ambiguous push/creation; inspect state before any retry. Stop on unexpected files, index/branch conflict, hooks/permission/auth prompts, secrets, cap or unapproved operation. Preserve work, never force trust/credential prompts or weaken checks. No production-code action and no self-verification.
