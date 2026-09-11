# S04 — independent repair QA complete

2026-09-08. Role: independent light QA/backlog. Phase: **READY_FOR_LEAD — READY FOR LEAD REVIEW**.

Candidate `17aaee96e98a43b02160c415e289e9c9380d559e`, branch `codex/s04-group-by-foundation`; original HEAD `193043a` is documentation/evidence only after candidate. **S04-QA-01 verified fixed**: both unchanged QA reproductions and adjacent mutation tests pass.

Fresh detached checkout `D:/PROJ/Fluent2_S04_QA_17aaee9`, no source/test overlay: frozen install PASS (19.5s), full `pnpm run check` PASS, typecheck,76 frames,44 units (9.32s),production build (619ms),17 browser tests (53.0s). No skips/retries, zero serious/critical Axe or page-overflow assertion failures. Run-owned strict preview4194. JS/CSS match prior reviewed build exactly. Six new screenshots inspected; prior32 review remains separately documented.

See [QA report and exact lead prompt](reports/S04-qa.md), [retest evidence](evidence/S04/independent-retest/), backlog and ledger. No blocking QA defect remains. **S04 is not accepted; lead review/acceptance is NOT_RUN. Do not start S05.** No production/test changes, commits, merge, push or deployment by retest QA. Preserve unrelated AGENTS.md/planning files; QA report/management/evidence remain local. Test processes finished; isolated checkout retained.

## Historical development repair checkpoint

Date: 2026-09-08. Role: medium development. Phase: **READY_FOR_QA — READY FOR LIGHT QA (repair retest)**. S04-QA-01 repaired; independent confirmation pending.

Catalog now requires every supported lesson and dispatches its trusted validator against the supplied steps. Grouping validates complete supplied frame state against the fixed named teaching steps, with property-order-independent comparisons. Both unchanged QA failures now pass; adjacent mutation and valid-copy regressions added. Focused run: 23 passed in 2.60s. First adjacent-test failure exposed a property-order-sensitive older comparison; repaired and preserved in evidence/S04/development-repair/focused.log. No semantic contract expansion.

Candidate: `17aaee96e98a43b02160c415e289e9c9380d559e` on `codex/s04-group-by-foundation`, descendant of the M3 base and reviewed `7ff24f0`. Both original QA test files are committed unchanged (hashes match QA evidence).

Frozen install PASS (328ms); full `pnpm run check` PASS: typecheck, 4 lessons/8 variants/76 frames, 44 unit tests (14.07s), production build (516ms), 17 browser tests (1.1m), no skips/retries, zero serious/critical Axe or page-overflow assertion failures. Run-owned strict preview4194. Gate ran in the original shared checkout; not a clean-checkout claim. Built JS/CSS hashes exactly match QA's reviewed artifacts. No new manual screenshot review in this validation-only repair.

Next action: independent light QA retests S04-QA-01 and the candidate gate, updates backlog/ledger/QA report, then recommends the next role. See the current repair section and retest prompt in reports/S04-development.md. Historical QA failures remain preserved below and in evidence. No production changes after the passing gate; later commit is documentation/evidence only. Preserved planning files and modified AGENTS.md remain local. No S05 or lead acceptance.

## Prior independent QA checkpoint

Date: 2026-09-08. Role: independent light QA/backlog. Phase: **DEV_REWORK — RETURN TO DEVELOPMENT**. Next actor: medium developer.

Reviewed branch `codex/s04-group-by-foundation`, HEAD `7ff24f0e0d7c5c9629fcddc19328bfbe63566d53`, base `42886919fa2b574a499b249989eb9da0f649173d`. Production unchanged during QA. Detached test checkout retained at `D:/PROJ/Fluent2_S04_QA_7ff24f0`; two uncommitted QA test additions are copied to both workspaces, identified by hashes in the evidence.

Frozen install PASS; typecheck PASS; current 76-frame validation PASS; final unit gate **29 passed / 2 failed**; production build PASS; **17 production browser tests passed**, zero serious/critical Axe or page-overflow assertion failures. **32 screenshots actually reviewed**. Full gate is FAIL, not ready for lead review.

One ordinary repair batch: **S04-QA-01 (P2)**. Catalog validation accepts an omitted supported lesson and grouping members referencing a nonexistent order. Exact reproductions are the last two tests in `tests/s04-independent.test.ts`; keep them failing until the production validator is repaired. Details, commands, limits, screenshots and exact repair prompt: [S04 QA report](reports/S04-qa.md). Evidence: [independent QA](evidence/S04/independent-qa/). Backlog and ledger updated.

Preserve unrelated modified AGENTS.md and untracked planning files. QA changes only tests, report/evidence and management state. No commit, push, merge, deployment or production repair performed. No test processes remain running. Resume the entire medium repair batch from the report, then return to independent QA. Lead acceptance remains NOT_RUN; do not begin S05.

## Historical development checkpoint (superseded by QA above)

Date: 2026-09-08. Role: medium development. State: **READY FOR LIGHT QA — S04**.

## User-requested context-stop remark

Stopped at the end of S04 P4 because the user requested a safe conversation boundary. P1–P4 development is complete. No production edits or test processes remain in progress. The next conversation starts independent light QA, not architecture discussion or repeated development. No S05, new conversation or background task was started.

## Exact resume state

- Repository: D:\PROJ\Fluent2_Microsoft_J
- Branch: codex/s04-group-by-foundation
- Base: 42886919fa2b574a499b249989eb9da0f649173d
- Passing integrated gate: 335e0ee77422998e326b79cb16320be35bc2aaa7
- Review candidate: 17bfeb3f62195bcb7b542fe656f0d31a889d576f. Only five malformed-ID test cases were added after the full gate; the affected six-test file passed again. Production unchanged.
- A later documentation/evidence commit records this checkpoint; inspect git log for that commit.
- Frozen install, typecheck, 76-frame validation, 27 unit tests, build and 15 browser tests passed. Run-owned preview4194, no server reuse. Eight final grouping screenshots inspected.

Read [development report](reports/S04-development.md), [ledger](BRANCH_AND_TEST_LEDGER.md), and [evidence](evidence/S04/). The report contains the exact next-conversation prompt.

## Preserved local work

Starting changes were modified AGENTS.md and an untracked projectmanagement planning tree. Preserved; do not discard them or assume another checkout contains them. The updated ledger remains untracked with the planning documents, audit and templates. STATUS, development report and S04 evidence are committed separately. No push, merge or deployment occurred.

## Next action

Verify branch/revision/dirty changes, then independently verify A1–A8, run the production gate, inspect desktop/390px and keyboard behavior, and write reports/S04-qa.md. A9 (independent QA then lead review) remains NOT_RUN. The sprint plan's original READY_FOR_DEV heading is historical; this STATUS is the current execution checkpoint. Do not start S05 or claim acceptance.
