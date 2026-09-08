# S04 development report

## Current repair 02 handoff — S04-LEAD-01

2026-09-08. Medium developer. **READY FOR LIGHT QA — repair 02 retest**. Both repair passes completed continuously. Candidate `8aa89e66fac7c3b17c9c1e8b127a7f3549e73ad2` on `codex/s04-group-by-foundation`, predecessor `193043a` (reviewed application/test candidate `17aaee9`), M3 base `42886919fa2b574a499b249989eb9da0f649173d`. Later documentation/evidence checkpoint makes no production/test changes. S04 remains unaccepted; no S05 work.

JOIN now has an explicit JoinStep contract retaining ID, caption, reveal, focus and outcome. Trusted catalog dispatch passes the actual supplied steps into validateJoinLesson; a supplied no-op callback cannot bypass it. Runtime validation also occurs before prepareJoinInput, with no recursive input/validation dependency. Both authored and supplied traces are checked against the selected source tables and freshly compiled JOIN result.

Independent domain checks require integer reveal counts in range, monotonic progression, initial zero, final complete output, valid source/result focus, and output focus only on emitted rows. Named-step expectations derive Alice/Bob/Chloé contributions from the result and enforce the original reveal/focus sequence and mode-specific Bob outcome. Required semantic fields are checked at the runtime boundary; captions are not parsed for meaning. The expected semantic state is separate from the mutable authored step objects, so malformed authored data cannot certify itself. Grouping retains full-frame validation; sort/workflow remain descriptors plus trusted spec validators. No JOIN-core, renderer, CSS, dependency or upstream-source changes. Touched catalog dispatch was formatted and unused imports removed.

Original QA/repair tests are unchanged relative to17aaee9. Lead's five tests are committed unchanged, including the negative authored-data mutation and reordered-properties positive case. Added24 adjacent cases: four explicit reveal/outcome oracles,19 mutation cases run through direct and catalog validation in all four variants, and an authored bounded-reveal/focus mutation that also proves render-input rejection. Expected reveal sequences are hand specified: LEFT unique0/0/2/2/3/3/4; INNER unique0/0/2/2/2/2/3; LEFT duplicate0/0/4/4/5/5/6; INNER duplicate0/0/4/4/4/4/5.

| Run | Command/result | Evidence |
| --- | --- | --- |
| S04-R2-01 | `pnpm exec vitest run tests/s04-lead-validation.test.ts tests/proofs.test.ts tests/catalog-repair.test.ts tests/s04-independent.test.ts`: exit0,32 passed,3.85s | [Initial focused](../evidence/S04/development-repair-02/focused-initial.log) |
| S04-R2-02 | `pnpm exec vitest run tests/join-validation-repair.test.ts tests/s04-lead-validation.test.ts tests/proofs.test.ts tests/catalog-repair.test.ts tests/s04-independent.test.ts`: exit0,56 passed,5.03s | [Complete focused batch](../evidence/S04/development-repair-02/focused-final.log) |
| S04-R2-03 | `pnpm run typecheck`: exit0 | [Typecheck](../evidence/S04/development-repair-02/typecheck.log) |
| S04-R2-04 | `pnpm install --frozen-lockfile`: exit0,357ms; lockfile unchanged | [Install](../evidence/S04/development-repair-02/install.log) |
| S04-R2-05 | `pnpm run check` at8aa89e6: exit0; typecheck,4 lessons/8 variants/76 frames,73 units/10 files (12.48s),build561ms,17 browser tests (1.1m) | [Full gate](../evidence/S04/development-repair-02/check.log) |

No repair-run failures; original lead failures remain preserved. Windows/shared original checkout, Node24.19.0/pnpm11.19.0 via documented runtime PATH. Strict run-owned production preview4194; no server reuse, retries, skips, assertion weakening or timeout increases. Browser checks include keyboard, desktop/390px, reduced motion, Axe and overflow; zero serious/critical Axe or page-overflow assertion failures. This is not a clean-checkout run; independent QA should run the exact candidate in isolation.

Build JS changed to index-BmY3DOmK.js (396.97kB/115.46kB gzip), SHA256 E13275EA03E099CDB886F0A711309118E9D55CFB754A34948A6A66D1E431165B. CSS remains index-DKAcxEgP.css, SHA2569241ACCF435946E5363791149E90488AAF9AF98D5AAFB32CC50ADD9C620ECEC3. Thus no claim of byte-identical JS. [Hashes](../evidence/S04/development-repair-02/hashes.txt).

Freshly opened10 screenshots from this gate, preserved under [browser evidence](../evidence/S04/development-repair-02/browser/): `{1440,390}-{duplicate-keys,inner-join,table.join}.png` and `qa-{1440,390}-join-{initial,intermediate}.png`. Reviewed LEFT unique initial, resolve-bob and final, INNER unique final, LEFT duplicate final. Observed correct0/3/4/3/6 row counts, Bob NULL/excluded text, contributor highlighting, readable phone HTML, local diagram panning and visible keyboard focus. No new visual regression established. Full-page focus/skip-link capture artifacts remain as described by prior QA; no new native screen-reader or exhaustive visual review. Duplicate INNER has browser assertions but no fresh dedicated screenshot inspection.

Provenance correction for prior reports: tests in LF/CRLF checkouts have identical normalized source, not equal raw byte hashes; see lead-review/provenance.md. Git diff confirms original QA test source unchanged. Current raw file hashes are evidence for this checkout only. Preserve historical reports/logs rather than rewriting their prior outcomes. Existing modified AGENTS.md and untracked planning/QA/lead work remain local; ledger updated without staging that unrelated tree. No merge, push, deployment or acceptance.

Exact light retest prompt:

```text
Act as the independent light QA and backlog model for S04 repair 02. Read AGENTS.md, projectmanagement/README.md, STATUS.md, TEAM_WORKFLOW.md, TEST_STRATEGY.md, sprints/S04-repair-02.md, reports/S04-lead-review.md and the current repair-02 section of reports/S04-development.md. Independently verify candidate 8aa89e66fac7c3b17c9c1e8b127a7f3549e73ad2 against the explicit reveal oracles and R1 invariants: all four variants, unknown focus and invalid outcome in each, missing fields, un-emitted output focus, and malformed authored data. Preserve original QA and lead regressions. Run the normal frozen-install/release gate in an isolated exact-candidate checkout and record source/test revisions. JS changed, so inspect affected desktop/390px states and state the actual screenshot scope; compare recorded asset hashes. Correct prior raw-test-hash equality wording: normalized LF/CRLF source is identical, raw checkout hashes differ. Maintain STATUS.md, BACKLOG.md, BRANCH_AND_TEST_LEDGER.md and reports/S04-qa.md; preserve all historical failures. Return ordinary defects as one batch or escalate material contract conflicts. If all blocking checks pass, say READY FOR LEAD REVIEW and give the lead prompt. Do not change production semantics, accept S04 or start S05.
```

## Historical repair 01 handoff

## Current repair handoff — S04-QA-01

2026-09-08. Medium development. **READY FOR LIGHT QA — repair retest**. This section supersedes the original candidate/results below; historical evidence remains intact.

Candidate `17aaee96e98a43b02160c415e289e9c9380d559e`, branch `codex/s04-group-by-foundation`, reviewed predecessor `7ff24f0`, M3 base `42886919fa2b574a499b249989eb9da0f649173d`. Later documentation/evidence checkpoint does not change production or tests. Original QA unit/browser additions are included unchanged; both SHA256 values match independent-qa/hashes.txt. Unrelated AGENTS.md and local planning/QA documents remain preserved; no push, merge or deployment.

Repaired both manifestations of S04-QA-01. Catalog requires the complete supported lesson set, resolves a trusted validator from its own definitions, and passes the supplied steps into that validator. Grouping checks all supplied frame data against the fixed named teaching trace, including table values, typed keys, contributors, assigned IDs, pending/result state and totals, then retains progression/reconciliation assertions. Structural comparisons ignore object property order. This enforces the approved authored fixtures; it does not introduce arbitrary dataset lessons or change aggregation arithmetic. Independent hand-calculated expectations remain in the tests, separate from the compiler.

Added 13 adjacent regression cases: each omitted lesson, eight corruption classes exercised in both grouping variants (including no-op supplied callbacks), and a valid copied/reordered case. Original two failing QA tests pass unchanged. First focused run: 22 passed/1 failed because the valid-copy test exposed the older JSON property-order comparison. Replaced that comparison with the structural comparison; preserved the failure log.

| Run | Command and result | Evidence |
| --- | --- | --- |
| S04-R01 | `pnpm exec vitest run tests/s04-independent.test.ts tests/catalog-repair.test.ts tests/aggregation.test.ts`: exit1,22 passed/1 failed,3.83s | [First focused failure](../evidence/S04/development-repair/focused.log) |
| S04-R02 | Same focused command after repair: exit0,23 passed,2.60s | [Focused retest](../evidence/S04/development-repair/focused-retest.log) |
| S04-R03 | `pnpm install --frozen-lockfile`: exit0,328ms; lockfile unchanged | [Install](../evidence/S04/development-repair/install.log) |
| S04-R04 | `pnpm run check` at17aaee9: exit0; typecheck;4 lessons/8 variants/76 frames;44 units/8 files,14.07s;build516ms;17 browser tests,1.1m | [Complete gate](../evidence/S04/development-repair/check.log) |

Environment: original shared Windows checkout, Node24.19.0/pnpm11.19.0 with the previously documented runtime PATH. Production preview owned by this run, strict4194, no server reuse. No skips, retries, assertion weakening or timeout changes. Browser gate includes desktop/390px, independent QA keyboard tests, Axe and page overflow checks; no serious/critical Axe or page-overflow assertion failures. Build remains JS394.71kB/CSS3.99kB; both asset SHA256 hashes match the independently reviewed QA build exactly.

Limits: not a clean-checkout run. No new manual screenshot inspection or screen-reader session in this validator-only repair; QA's 32-image review remains historical evidence for identical JS/CSS. Independent repair QA and lead acceptance are still pending. Backlog defect is not independently closed by development. No S05 work.

Exact retest prompt:

```text
Act as the independent light QA and backlog model for the S04 repair retest. Read AGENTS.md and projectmanagement/README.md, STATUS.md, TEAM_WORKFLOW.md, sprints/S04.md, TEST_STRATEGY.md, reports/S04-qa.md and the current repair section of reports/S04-development.md. Verify candidate 17aaee96e98a43b02160c415e289e9c9380d559e: independently retest both S04-QA-01 reproductions, review the supplied-frame validation and adjacent mutations, and run the release gate on this candidate's production build. Preserve the original QA tests, expected values and historical failures. Record actual revisions, commands, results and visual-review limits; maintain BACKLOG.md, BRANCH_AND_TEST_LEDGER.md, STATUS.md and reports/S04-qa.md. Return ordinary defects as one repair batch, or use LEAD DECISION REQUIRED for a material contract issue. If all blocking checks pass, say READY FOR LEAD REVIEW and give the lead prompt. Do not change production semantics, accept S04 or start S05.
```

## Historical original development handoff

Role: medium development. Date: 2026-09-08. Verdict: **READY FOR LIGHT QA — S04**. Next actor: independent light QA.

## Decision summary

All four development passes are complete. Learners can inspect six orders becoming three customer groups, contributor IDs, COUNT(*), COUNT(amount) and all-null SUM. Typed lesson boundaries, safe playback/error handling, catalog validation and isolated production browser tests support all four lessons. Independent QA and lead acceptance remain outstanding.

## Candidate and scope

- Branch: codex/s04-group-by-foundation; base 42886919fa2b574a499b249989eb9da0f649173d.
- P1: 80ecfde. P2/P3 application: 7022187bd48a0c59e479d05e748498ee0e303537.
- Passing full gate: 335e0ee77422998e326b79cb16320be35bc2aaa7 (test-only media-query mock repair).
- Final review candidate: 17bfeb3f62195bcb7b542fe656f0d31a889d576f. Only five malformed-ID cases added after the full gate; affected tests passed again. No later production changes.
- Documentation/evidence committed afterward. No production changes remain uncommitted.
- Starting unrelated changes: modified AGENTS.md and untracked projectmanagement planning tree. Preserved. Updated ledger remains untracked. Installation used the existing checkout, not a fresh clean checkout.

App composes typed lesson components; pure content/catalog modules own semantics. Each lesson compiles once per displayed frame for SVG and HTML. Player handles empty/shrinking/aligned/unaligned traces and timer cleanup. Renderer host exposes failures and static summaries with recovery tests. Bounded aggregation creates typed stable group IDs, members and aggregates. Local table.group consumes frame state with persistent keyed nodes. HTML includes explicit order IDs, group member/count/SUM tables and sorting state. Workflow success dependencies are validated at lesson level. README and upstream adaptation notes were updated without dependency migration.

## Acceptance and evidence

Developer verification only; not independent acceptance.

| Criterion | Result | Evidence |
| --- | --- | --- |
| A1 typed boundaries | PASS | App/lesson/content extraction and typecheck |
| A2 legacy behavior | PASS | Retained join/pair/player tests and legacy browser flows |
| A3 aggregation | PASS | G01–G07 independent/adversarial cases |
| A4 grouping frames/identity | PASS | 14 new frames; keyed renderer and both-variant browser tests |
| A5 runtime safety | PASS | Empty/shrink/reorder, host failure/recovery and timer/live-motion tests |
| A6 catalog/workflow | PASS | L01/W01 mutations; 4 concepts/8 variants/76 frames validated |
| A7 HTML/phone/keyboard | PASS | Browser assertions; sorting summary; eight grouping screenshots inspected |
| A8 developer release gate | PASS | Frozen install, typecheck, validation, unit/build/browser passed; zero serious/critical Axe or page overflow assertion failures |
| A9 independent QA + lead | NOT_RUN | Next conversation; no acceptance claimed |

Independent oracle: C1 members O1/O2, counts2/2, SUM100; C2 O3,1/1/25; C3 O4/O5/O6,3/3/30; baseline known total155. NULL variant preserves members/group IDs, C3 becomes3/0/NULL, known total125. Expected values are hand specified, not computed by the compiler under test.

Environment: Windows, Node24.19.0, pnpm11.19.0, locked Playwright1.63.0/Chromium153.0.8010.12/Axe4.13.0. Node executable directory: C:\Users\julia\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin (prepend to PATH in PowerShell).

| Run | Command/result | Evidence |
| --- | --- | --- |
| S04-D01 | pnpm install --frozen-lockfile: exit0,554ms, unchanged lockfile at7022187 | Execution record; existing checkout |
| S04-D02 | First pnpm run check at7022187: nonzero exit at typecheck, TS2352 test mock | [First failure](../evidence/S04/development-gate-first-failure.log) |
| S04-D03 | pnpm run check at335e0ee: exit0; typecheck,76frames,27tests/6files (16.98s), build(2.30s),15browser tests(59.2s) | [Gate log](../evidence/S04/development-gate.log) |
| S04-D04 | pnpm exec vitest run tests/aggregation.test.ts with17bfeb3 content: exit0,6passed,2.73s | [Additional validation](../evidence/S04/additional-validation.log) |

Build: JS394.71kB/114.92kB gzip, CSS3.99kB/1.41kB gzip. Run-owned production preview4194, strict port, reuseExistingServer=false. Existing4173 preview was not used for verification. Legacy combined flow split by concept/viewport, retaining assertions; no retries or global timeout increase. No skipped tests in the passing gate. Historical baseline failures remain in the ledger.

Screenshots actually inspected from the final production run: all eight s04-{1440,390}-{known,null}-{group-c3,final}.png files in [evidence](../evidence/S04/). Desktop shows source-to-group connections and outputs; phone has readable stacked HTML tables and labeled local diagram panning. Final legacy screenshots were generated by tests but not manually inspected at this final checkpoint.

## Findings and repairs

- First integrated gate TS2352 from incomplete matchMedia cast: test-only vi.stubGlobal repair in335e0ee; full gate passed afterward. Original failure saved.
- Initially cramped grouped HTML on phone: replaced with two-column per-group tables stacked on phone; added explicit Order IDs. Final screenshots inspected.
- Baseline preview ambiguity/oversized browser flow: owned4194 and concept-specific flows; full production gate passed with assertion scope retained.

Limits: no full screen-reader session; accessibility evidence is structural, keyboard and Axe. No comprehensive audit of retained core semantics. General SQL predicate NULL behavior remains explicitly deferred. Aggregation implements the approved finite-JavaScript-number subset, not a SQL execution engine. No clean-checkout gate, remote push, merge, deployment, independent QA or lead acceptance.

## Resume / next handoff

User-requested context stop: end of P4, no partial implementation or running test to resume. Start another conversation in this repository as independent light QA. Verify candidate and preserve dirty planning files. Read [STATUS](../STATUS.md), [ledger](../BRANCH_AND_TEST_LEDGER.md) and S04 plan. Do not start S05 or reopen architecture.

Exact next-role prompt:

```text
Act as the independent light QA and backlog model. Read AGENTS.md and projectmanagement/README.md, STATUS.md, TEAM_WORKFLOW.md, sprints/S04.md, TEST_STRATEGY.md and reports/S04-development.md. Verify the complete S04 candidate against the independently specified expected results, inspect the changed code for straightforward issues, add missing focused tests, run the release gate on the actual production build, and inspect desktop/390px screenshots and keyboard behavior. Preserve failure evidence; do not weaken tests or change production semantics. Maintain BACKLOG.md, BRANCH_AND_TEST_LEDGER.md and STATUS.md. Write reports/S04-qa.md with revisions, commands, outcomes, defects, screenshots actually reviewed and untested limits. Batch ordinary defects into RETURN TO DEVELOPMENT with a repair prompt. If a semantic/architectural decision is needed, use LEAD DECISION REQUIRED with a minimal reproduction. If all blocking checks pass, say READY FOR LEAD REVIEW and give the lead prompt. You do not accept the sprint or start the next one.
```
