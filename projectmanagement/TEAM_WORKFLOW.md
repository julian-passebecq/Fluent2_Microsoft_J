# Team workflow

This workflow implements the user's preferred division of work. “Medium” and “light” are roles chosen by the user, not hardcoded model IDs. The lead owns architecture and sprint acceptance; development and independent QA are separate stages.

## Roles

| Role | Owns | Does not decide alone |
| --- | --- | --- |
| Technical lead | Product vision, priorities, semantic contracts, architecture decisions, difficult logic audit, acceptance and next sprint | Does not delegate the final correctness decision to passing tests |
| Medium development model | Entire approved sprint implementation, focused regression tests, ordinary debugging, milestone checkpoints, dev report | New product scope, silent semantic changes, weakening acceptance criteria |
| Light QA/backlog model | Independent expected results, test execution, focused test additions, reproducible defects, screenshots, branch/test ledger, backlog housekeeping, compact review packet | Production semantic fixes, architecture changes, closing its own test failures as accepted product behavior |
| User | Starts the chosen role, resolves product preferences when necessary, authorizes any requested publication/integration action | Does not need to approve each internal development pass |

Light can inspect straightforward logic and flag suspicious code with evidence. A difficult correctness question goes to the lead; it must not become an unsupported verdict. Medium still writes meaningful tests while developing. Light does not merely rerun medium's tests or treat implementation output as the expected answer.

## Work phases

`READY_FOR_DEV -> DEVELOPING -> READY_FOR_QA -> QA_RUNNING -> READY_FOR_LEAD -> ACCEPTED`

A concrete, ordinary defect sends work to `DEV_REWORK`, then targeted retest plus affected gates. A material unresolved contract or scope question uses `LEAD_DECISION_REQUIRED`. A missing tool, inaccessible repository or other environmental barrier uses `BLOCKED` with evidence and the smallest action needed. These are project statuses in files, not tool-controlled goals.

Medium updates `STATUS.md` at each pass and continues directly into the next approved pass. No “would you like me to continue?” at a pass boundary. Complete the whole sprint before independent QA unless a failure exposes a foundational contract question. Finishing early is fine; do not pad time or add backlog work to fill a long session.

## Long passes and checkpoints

Each pass bundles design, implementation and focused verification of a meaningful subsystem. S04 has four passes. Their size supports sustained work; runtime depends on the model and environment. The user can later report that passes are too short or long, and the lead adjusts the next sprint.

At a natural milestone, record only: completed work, tests actually run, branch/commit or dirty state, remaining work, and exact next action. Then continue. Prefer a local checkpoint commit for a coherent passing change if normal repo practice permits it; never stage unrelated user work. Do not require a commit for every edit or write a diary of every command. If context is compacted or the task is interrupted, resume from this state instead of redesigning the sprint.

A session cannot promise to keep running after it has ended. When a runtime/session limit forces a stop, write `SESSION_PAUSED` as a checkpoint note, keep the real project phase unchanged, and give a single resume prompt. Never call partial work complete to simplify a handoff.

## Development handoff

Before `READY_FOR_QA`, medium must finish every S04 acceptance item, run the required dev checks, resolve ordinary defects, and write `reports/S04-development.md` using the report template. Include base revision, candidate revision, dirty paths, changed contracts, independent expected values, checks and known limitations. Explain where the new semantic computation occurs and what the renderer receives.

Final message: **READY FOR LIGHT QA — S04**, a short result, the report path, and the exact light prompt from `HANDOFF_PROMPTS.md`. Do not say the sprint is accepted or released. Do not begin S05. If tests cannot run, report the missing gate and use `BLOCKED` or a clearly limited `QA_NEEDED` handoff, not an all-green claim.

## Independent QA handoff

Light reads the plan and expected values before reading implementation details. Capture the starting commit and dirty state, then review the diff, execute the checks, and add missing risk-focused tests. Test/data corrections are allowed; product fixes return to medium. If a test change affects the candidate commit, record both the application revision and final test/evidence revision. Do not let multiple agents mutate the same checkout simultaneously.

Light maintains `BACKLOG.md`, `BRANCH_AND_TEST_LEDGER.md`, `STATUS.md`, and `reports/S04-qa.md`. Backlog changes require evidence: reference the defect/test, assign severity and owner, and distinguish observed from suspected. Preserve historical failures. Do not delete branches, merge, rebase, force-push, change sprint priorities or mark a sprint accepted.

Possible endings:

- **READY FOR LEAD REVIEW**: all gates passed, evidence complete, no unresolved blocking defects. Include the lead prompt.
- **RETURN TO DEVELOPMENT**: reproducible defect with a clear expected behavior already specified. Include reproduction, smallest failing test, impacted scope and medium repair prompt. The user starts one repair batch, not one session per bug.
- **LEAD DECISION REQUIRED**: contradictory requirements, unclear semantics, architectural expansion, evidence of an inherited correctness defect, or repeated unsuccessful repair of the same root cause. Include options and a recommendation.

## Escalation without unnecessary interruptions

Keep working on independent approved items while a question is unresolved. Gather a minimal reproduction and finish the analysis needed to make the decision concrete. Batch related questions.

Routine import errors, TypeScript errors, small CSS/overflow fixes, test selectors, naming and module splitting are medium's responsibility. Existing requirements already authorize these fixes. Do not ask the user for permission simply because a fix touches extracted product-owned code; preserve provenance and tests.

Call the lead immediately for a need to change SQL semantics, identity rules, dependency policy, public API direction, renderer family strategy beyond S04, or a scope conflict with `AGENTS.md`. Escalate after two distinct unsuccessful repair approaches to the same underlying issue; this is a diagnostic trigger, not a limit on ordinary iteration. Report the exact approaches and new evidence. Lack of user input is never approval for an unresolved material decision.

## Lead acceptance

The lead reads QA's compact summary first, then directly inspects the entire sprint production diff and relevant callers/tests. Verify contributor identity, arithmetic, NULL behavior, state transitions, player lifecycle, error paths, typed boundaries and content truth. Sample evidence and run additional probes where QA leaves uncertainty. Do not call unreviewed inherited modules audited merely because they are imported.

Write `reports/S04-lead-review.md` with accepted/rework decision, findings, residual limits, candidate revision and review scope. Only then mark S04 accepted and authorize the next sprint. Merge/push/deployment is a separate action; follow the user's actual authorization. This workflow does not authorize publishing or manipulating historical branches.
