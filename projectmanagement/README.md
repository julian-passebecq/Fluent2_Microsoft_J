> Closeout 2026-09-11: paused for one Pro AI. Start with [handover](../handover/README.md). Repair 02 is developer-complete at 8aa89e6; retest/acceptance pending. Earlier role prompts/verdicts are historical; do not restart the agent relay.

# Project management — start here

Owner: technical lead. Established 2026-09-08 against `42886919fa2b574a499b249989eb9da0f649173d` on `codex/join-cardinality-m3`.

This folder is the current execution plan. Root `AGENTS.md` remains the product boundary. Historical milestone reports in `docs/` and `QA_REPORT.md` remain evidence; their suggested next steps are superseded by the active sprint here.

## Current decision

**S04 is in DEV_REWORK after lead review of `17aaee9`.** The feature and initial QA repair are implemented, but the lead found a remaining JOIN validation defect. Medium should complete [S04 repair 02](sprints/S04-repair-02.md), then light retests and the lead decides acceptance. Read [the lead review](reports/S04-lead-review.md). No S05 work is authorized.

| Read | Purpose |
| --- | --- |
| [Vision and architecture](VISION_AND_ARCHITECTURE.md) | Product destination, why features matter, component boundaries and fixed decisions |
| [Team workflow](TEAM_WORKFLOW.md) | Roles, autonomy, checkpoints, escalation and ownership |
| [Sprint S04](sprints/S04.md) | Original deliverables and acceptance criteria |
| [Active S04 repair 02](sprints/S04-repair-02.md) | Remaining repair batch and exact medium prompt |
| [Test strategy](TEST_STRATEGY.md) | Independent test cases, commands and evidence requirements |
| [Backlog](BACKLOG.md) | Ordered product and engineering work; dependencies and ownership |
| [Status](STATUS.md) | Current phase, next actor and resumption checkpoint |
| [Branches and tests](BRANCH_AND_TEST_LEDGER.md) | Observed branch ancestry and test evidence |
| [Baseline lead audit](audits/2026-09-08-baseline.md) | Findings and limits of the initial review |
| [Handoff prompts](HANDOFF_PROMPTS.md) | Copy-paste prompts for development, QA and lead review |
| [Report template](templates/SPRINT_REPORT.md) | Compact evidence format for future reviews |

## Normal user involvement

Start medium once with the development prompt. It continues across internal milestones, fixes its own ordinary failures, and ends with `READY FOR LIGHT QA` when the whole candidate is ready. Start light once with the QA prompt. Light reports `READY FOR LEAD REVIEW`, `RETURN TO DEVELOPMENT`, or `LEAD DECISION REQUIRED` with the exact next prompt. The lead audits implementation logic and selects the next sprint.

You do not need to say “new pass” after each milestone. A model can only continue while its task/session is active; these files do not start a model, schedule background work, or switch models automatically. If a session stops, use the resume prompt and the recorded checkpoint. The long passes are cohesive work packages, not promises about runtime.

The initial planning task did not implement features. S04 development has since been completed and reviewed; current remaining work is the linked repair batch. No merge, remote push or deployment is recorded by the lead.
