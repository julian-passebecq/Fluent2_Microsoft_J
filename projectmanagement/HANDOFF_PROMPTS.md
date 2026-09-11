# Handoff prompts

Use these from this repository. The files carry the detailed instructions; the user should not need to restate the plan. The chosen role must read the current STATUS first because later runs may be repair or resume work.

## Current handoff — S04 lead repair

S04 is not accepted. Use the exact medium prompt in [S04 repair 02](sprints/S04-repair-02.md) to complete both passes for S04-LEAD-01, then independent light QA and lead review. The original sprint-start prompts below are reference templates, not a request to restart completed P1–P4 work.

## Start medium development

```text
Act as the medium development model for this repository. Read AGENTS.md and projectmanagement/README.md, STATUS.md, VISION_AND_ARCHITECTURE.md, TEAM_WORKFLOW.md, sprints/S04.md, TEST_STRATEGY.md and audits/2026-09-08-baseline.md. Implement the complete approved S04 sprint through all four passes in this active task. Continue automatically between passes; do not ask me to say “new pass”. Preserve unrelated work, use the M3 descendant as the base, and record checkpoints in STATUS.md. Follow the supplied semantic contracts and independent expected results. Fix routine failures yourself. Escalate only the material issues defined in TEAM_WORKFLOW.md and continue independent approved work where possible. Finish with the development report, candidate revision, actual test results and READY FOR LIGHT QA plus the exact light-model handoff prompt. Do not start S05 or claim lead acceptance.
```

## Start light QA and backlog maintenance

```text
Act as the independent light QA and backlog model. Read AGENTS.md and projectmanagement/README.md, STATUS.md, TEAM_WORKFLOW.md, sprints/S04.md, TEST_STRATEGY.md and reports/S04-development.md. Verify the complete S04 candidate against the independently specified expected results, inspect the changed code for straightforward issues, add missing focused tests, run the release gate on the actual production build, and inspect desktop/390px screenshots and keyboard behavior. Preserve failure evidence; do not weaken tests or change production semantics. Maintain BACKLOG.md, BRANCH_AND_TEST_LEDGER.md and STATUS.md. Write reports/S04-qa.md with revisions, commands, outcomes, defects, screenshots actually reviewed and untested limits. Batch ordinary defects into RETURN TO DEVELOPMENT with a repair prompt. If a semantic/architectural decision is needed, use LEAD DECISION REQUIRED with a minimal reproduction. If all blocking checks pass, say READY FOR LEAD REVIEW and give the lead prompt. You do not accept the sprint or start the next one.
```

## Medium repair batch

```text
Resume as medium developer on S04. Read projectmanagement/STATUS.md and reports/S04-qa.md, including linked defect evidence. Repair the entire ordinary-defect batch within the existing S04 contracts; preserve unrelated work and do not weaken acceptance criteria. Run focused regressions and affected gates, update reports/S04-development.md and STATUS.md with the new candidate revision and results, then hand the complete repair batch back to light for retest. Escalate unclear semantics to the lead with a minimal reproduction. Do not begin new features.
```

## Return to technical lead

```text
Act as technical lead again. Read projectmanagement/STATUS.md, the S04 plan, architecture, backlog, branch/test ledger, reports/S04-development.md and reports/S04-qa.md. Audit the complete sprint production diff and relevant callers/tests yourself, especially grouping identity/contributors/NULL arithmetic, named-step switching and timer lifecycle, content invariants, renderer error recovery, typed boundaries and static accessibility. Use QA's evidence to focus the review, but do not equate passing tests with correct logic. Resolve escalations or request a concrete repair batch. Write reports/S04-lead-review.md with reviewed revisions, findings and accepted/rework decision. If S04 is accepted, update the backlog/status and design the next coherent sprint with long autonomous passes and an explicit test plan. Do not publish or manipulate remote branches without applicable authorization.
```

## Resume after interruption

```text
Resume your assigned role from projectmanagement/STATUS.md and its linked active sprint/report. Verify the current branch, revision and dirty changes first. Continue the recorded next action through the remaining authorized passes or test batch without asking me to restart each pass. Preserve earlier evidence and report any mismatch between the checkpoint and repository before making dependent changes.
```
