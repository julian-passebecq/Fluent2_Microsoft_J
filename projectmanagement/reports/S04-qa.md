# S04 independent QA

Lead disposition, 2026-09-08: **DEV_REWORK** for a newly demonstrated JOIN validation gap, S04-LEAD-01. The original S04-QA-01 remains verified fixed and the isolated 44-unit/17-browser result below remains valid for that test set. See [lead review](S04-lead-review.md) and [repair plan](../sprints/S04-repair-02.md). The retest source files are identical after LF/CRLF normalization, but their raw hashes differ; the [lead provenance note](../evidence/S04/lead-review/provenance.md) corrects the exact-hash wording below without altering historical evidence.

## Current repair retest — READY FOR LEAD REVIEW

2026-09-08. Independent light QA. **S04-QA-01 verified fixed** at `17aaee96e98a43b02160c415e289e9c9380d559e`. No unresolved blocking defect found. This section supersedes the historical verdict below; original failures remain preserved. S04 is not accepted and S05 is not started.

Original workspace HEAD `193043a` on `codex/s04-group-by-foundation` contains only documentation/evidence after the repair candidate. Reviewed both production changes (`content/catalog.ts`, `content/grouping.ts`) and all adjacent tests. Created a fresh detached worktree at the exact candidate, `D:/PROJ/Fluent2_S04_QA_17aaee9`. No test overlay or tracked modifications in that checkout; only generated logs/artifacts. Original dirty AGENTS.md and untracked planning/QA files preserved. QA made no production or test edits during retest. Final report/management/evidence edits remain uncommitted in the original workspace.

The catalog checks complete supported lesson coverage and dispatches its own validator, not a caller-supplied callback. Supplied grouping frames are compared structurally with the fixed named teaching trace, including source cells, keys, member IDs, aggregates, pending state and totals; object property order is ignored while array order remains meaningful. The existing progression/reconciliation assertions remain. This is consistent with the bounded authored lesson contract; it does not validate arbitrary new datasets as equivalent lessons. Independent hand-oracle tests remain necessary and pass. No additional test gap warranting a new test was found for this repair.

Original QA test hashes remain exactly `C31799AFFCD32D50D49C506482B633968FA2DE8F8FC8BFFFD58079DA3FFBA626` (unit) and `89CE9C720099F669E268241343116DD37B2450419998E3FD8EBA2790D23C117C` (browser). Both original failures pass unchanged within the full unit run. Adjacent omitted-lesson, corrupt-state/no-op-callback and valid reordered-copy regressions also pass.

| Run | Exact command in isolated candidate checkout | Actual outcome | Evidence |
| --- | --- | --- | --- |
| S04-Q08 | `pnpm install --frozen-lockfile` | PASS, exit0,19.5s; no tracked/lockfile diff | [install](../evidence/S04/independent-retest/qa-install.log) |
| S04-Q09 | `pnpm run check` | PASS, exit0: typecheck;4 lessons/8 variants/76 frames;44 units/8 files in9.32s;Vite build619ms;17 browser tests in53.0s;0 failed/skipped/retried | [full gate](../evidence/S04/independent-retest/qa-check.log) |
| S04-Q10 | Asset/test SHA256 comparison and six fresh screenshot inspections | PASS: built JS/CSS exactly match earlier independently reviewed artifacts; samples show no visual regression | [hashes](../evidence/S04/independent-retest/hashes.txt), [screenshots](../evidence/S04/independent-retest/browser/) |

Environment rechecked: Windows, Node24.19.0/pnpm11.19.0, documented runtime PATH, profile disabled. Normal Playwright config serves this run's freshly built `dist` through strict preview4194 with `reuseExistingServer:false`; no reused server, retries or timeout override. Zero serious/critical Axe findings and zero page-overflow assertion failures in tested states. This is an exact committed-candidate isolated gate. Stage times above are tool-reported; total command wall time was not separately measured.

Current matrix: **G01–G07, L01, W01, P01–P03, H01, R01, B01–B06 PASS** using the same expectation/evidence mapping in the historical matrix below, now rerun by Q09. In particular L01/G07 invalid supplied content is rejected. **A1–A8 PASS for QA; A9 independent QA complete, lead acceptance NOT_RUN.** The former A6/A8 failures are resolved, not erased.

Fresh images actually opened: `s04-{1440,390}-known-final.png`, `s04-{1440,390}-null-group-c3.png`, `qa-1440-group-pending-focus.png`, `qa-390-group-pan-focus.png` (six total). Baseline155 and NULL125/C3 SUM NULL, readable phone member tables, pending values and keyboard focus remain clear. The full 17-test browser suite reran keyboard navigation/radios/Step/skip link and phone local pan. Other newly generated screenshots were saved but not visually re-reviewed. Prior 32-image inspection remains valid supporting evidence for the byte-identical JS/CSS; it is not presented as 32 new inspections. No screen-reader, real-phone or cross-browser session; historical limits below remain.

Next actor: technical lead. Exact prompt:

```text
Act as technical lead again. Read projectmanagement/STATUS.md, the S04 plan, architecture, backlog, branch/test ledger, reports/S04-development.md and reports/S04-qa.md including the repair retest. Audit the complete sprint production diff from 42886919fa2b574a499b249989eb9da0f649173d to 17aaee96e98a43b02160c415e289e9c9380d559e and relevant callers/tests yourself, especially grouping identity/contributors/NULL arithmetic, supplied-frame validation, named-step switching and timer lifecycle, content invariants, renderer error recovery, typed boundaries and static accessibility. QA independently passed the isolated candidate gate; do not equate passing tests with correct logic. Write reports/S04-lead-review.md with reviewed revisions, findings and accepted/rework decision. Only if S04 is accepted, update backlog/status and scope the next sprint with its test plan. Do not publish or manipulate remote branches without applicable authorization.
```

## Historical initial QA — preserved failure evidence

2026-09-08. Role: independent light QA/backlog. **RETURN TO DEVELOPMENT**. Sprint not accepted; no S05 work authorized.

The displayed lessons pass the production browser checks and the independent grouping arithmetic oracle. The release gate fails on two new mutation tests exposing one catalog-validation defect. Repair that batch before lead review. No production semantics, dependencies, existing assertions, timeouts or retries were changed by QA.

## Revisions and environment

- Branch: `codex/s04-group-by-foundation`; base `42886919fa2b574a499b249989eb9da0f649173d`.
- Reviewed HEAD: `7ff24f0e0d7c5c9629fcddc19328bfbe63566d53`; application implementation `7022187bd48a0c59e479d05e748498ee0e303537`; developer test candidate `17bfeb3f62195bcb7b542fe656f0d31a889d576f`. Subsequent existing commits are test/documentation evidence, not production changes.
- Created detached worktree `D:/PROJ/Fluent2_S04_QA_7ff24f0` at HEAD. Frozen install and checks ran there with two explicitly copied QA test additions. This is an isolated candidate checkout with a test overlay, not a pristine unchanged commit. Worktree retained for reproduction.
- Final test overlay: `tests/s04-independent.test.ts` (four tests) and `tests/browser/s04-independent.spec.ts` (two viewport tests), uncommitted in the original workspace and copied byte-for-byte into QA. Exact SHA256 values and built asset hashes: [hashes.txt](../evidence/S04/independent-qa/hashes.txt).
- Starting original dirty work: modified `AGENTS.md`; untracked management README, BACKLOG, BRANCH_AND_TEST_LEDGER, HANDOFF_PROMPTS, TEAM_WORKFLOW, TEST_STRATEGY, VISION_AND_ARCHITECTURE, audits, baseline evidence, reports/README, sprints and templates. Preserved. QA additionally changes STATUS/backlog/ledger and adds this report, tests and evidence. No merge, push, deployment, reset or branch deletion.
- Windows; Node `24.19.0`, pnpm `11.19.0`, Playwright `1.63.0`, locked Chromium, Axe `4.13.0`. PATH prefix: `C:\Users\julia\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin`. PowerShell `login:false` after the initial profile emitted unrelated broken Conda errors.
- Initial QA setup had a relative Copy-Item source-path error; corrected with the absolute original-workspace path before any tests. A requested optional file read used `comparison.spec.ts` instead of `join-comparison.spec.ts`; the actual file was subsequently read. Neither incident changed the candidate or test outcomes.

## Commands and outcomes

All pnpm commands below ran from the isolated worktree with the runtime PATH above. Logs preserve failures rather than replacing them with diagnostic reruns. No tests skipped or retried.

| Run | Exact command | Outcome / elapsed | Evidence |
| --- | --- | --- | --- |
| S04-Q01 | `pnpm install --frozen-lockfile` | PASS, exit 0, 30.1s; lockfile diff empty | [install](../evidence/S04/independent-qa/qa-install.log) |
| S04-Q02 | `pnpm run check` | FAIL, exit 1: typecheck PASS; standard validation PASS (4/8/76); units 29 PASS / 1 FAIL, 11.98s. Build/browser not reached by this command | [first gate failure](../evidence/S04/independent-qa/qa-check.log) |
| S04-Q03 | `pnpm run build` | PASS, exit 0; includes typecheck; Vite 815ms (total command time not separately measured) | [build](../evidence/S04/independent-qa/qa-build.log) |
| S04-Q04 | `pnpm run test:browser` | PASS, exit 0, 17 tests, 1.1m, no skipped tests | [browser](../evidence/S04/independent-qa/qa-browser.log) |
| S04-Q05 | `pnpm exec vitest run tests/s04-independent.test.ts` | FAIL, exit 1, 2 PASS / 2 FAIL, 3.36s; adds invalid-contributor reproduction | [focused failures](../evidence/S04/independent-qa/qa-focused.log) |
| S04-Q06 | `pnpm run check` with final four-test overlay | FAIL, exit 1; typecheck and 76-frame validation PASS; units 29 PASS / 2 FAIL, 12.38s. Build/browser remain independently covered by Q03/Q04; production unchanged | [final gate](../evidence/S04/independent-qa/qa-final-check.log) |

Production browser provenance: Q03 built `dist`; Q04 started Vite **preview** at `127.0.0.1:4194`, strict port, `reuseExistingServer:false`, one worker, default timeout. It did not use an existing development server. Assets: `index-kwnhVYiV.js`, 394.71 kB / 114.92 kB gzip; `index-DKAcxEgP.css`, 3.99 kB / 1.41 kB gzip. The last mutation test is unit-only; it does not alter this build or browser test code.

## Coverage matrix

PASS describes the tested bounded contract, not sprint acceptance.

| ID | Result | Independently checked expectation and evidence |
| --- | --- | --- |
| G01 | PASS | Hand oracle: C1 O1/O2 = 2/2/100; C2 O3 = 1/1/25; C3 O4/O5/O6 = 3/3/30; total155. Existing aggregation tests plus independent all-frame oracle |
| G02 | PASS | Same members/IDs; C3 = 3/0/NULL; known total125; browser C1/C2/C3 HTML/SVG agreement and both-variant screenshots |
| G03 | PASS | Empty, singleton groups, signed/zero/repeated values; new mixed fixture NULL,10,10,-20,0 = 5/4/0 |
| G04 | PASS | NULL/string-null, number/string1, escaped key, boolean, negative zero; distinct IDs |
| G05 | PASS | Reverse input order preserves IDs, members and aggregate values; frozen fixture unchanged |
| G06 | PASS | Malformed IDs/columns/outputs, missing cells, unsupported kind, nonnumeric/nonfinite SUM and overflow; added nonfinite key and missing non-aggregate cell |
| G07 | FAIL | Actual fourteen frames match explicit assigned sets, pending/complete values and totals. Mutation rejection fails through catalog: missing-order contributor accepted (S04-QA-01) |
| L01 | FAIL | Standard 4 lessons/8 variants/76 frames, unique/empty IDs and caption mismatch checks pass. Missing lesson and invalid contributor accepted (S04-QA-01) |
| W01 | PASS | Queued/running/success premature Publish rejected; canonical same-frame release accepted; upstream success and retry attempt2/blocked Publish checked |
| P01 | PASS | Player fake timers cover play/pause/reset/previous/end/replay/unmount; navigation/browser flow cancellation; timer count zero |
| P02 | PASS | Reordered aligned IDs preserve step and pause beyond two periods; unaligned reset; empty/shrink never render invalid child; browser group/joins switching |
| P03 | PASS | Initial/live reduced motion, manual stepping and transition suppression; fake-timer and production browser checks |
| H01 | PASS | Injected mount/update errors visibly expose error and summary; update/remount recover; both owners destroyed |
| R01 | PASS | Keyed source/group nodes survive grouping steps and aligned variant changes; membership link counts; deterministic freeze and destroy |
| B01 | PASS | All four production concepts; both widths; initial/intermediate/final screenshot inspection; no errors in instrumented concept flows |
| B02 | PASS | Both grouping variants; counts/members/SUM, known-total and NULL text. Added explicit HTML/SVG C1/C2/C3 comparison |
| B03 | PASS | Keyboard skip link to lesson; Tab navigation and Enter; native radio arrows; Step; focus-visible screenshots; 390px local pan and Tab escape |
| B04 | PASS | Tested viewport page-width assertions, sort resize keeps frame, local diagram scroll, readable reflowed tables |
| B05 | PASS | Zero serious/critical Axe violations at tested initial/final and grouping NULL states at both widths; table captions/headers and text summaries inspected |
| B06 | PASS | LEFT/INNER x unique/duplicate regressions: pair identities/counts, Bob NULL/excluded outcome, aligned switches |

Acceptance mapping: A1/A2/A3/A4/A5/A7 PASS within reviewed scope; A6 FAIL (catalog); A8 FAIL (release gate); A9 independent QA completed, lead acceptance NOT_RUN. Do not infer an all-green gate from passing browser checks.

## Defect batch

**S04-QA-01 — P2, observed, owner medium developer, S04 repair: catalog validation can certify incomplete or invalid supplied content.** Blocks A6/L01 and the release gate. Current learner fixtures remain correct; this is a required validation-safety failure.

Minimal reproductions at reviewed HEAD:

1. `validateCatalog(catalog.filter(lesson => lesson.id !== 'group'))` returns successfully, reporting three lessons, rather than rejecting the missing supported lesson.
2. Preserve a baseline grouping frame's ID/caption but replace the `group-c1` assigned IDs and first group's members with `['missing-order']`; supply those frames in the baseline catalog variant. `validateCatalog(corrupted)` returns successfully. Exact small fixture: `tests/s04-independent.test.ts`, last test.

Expected: reject incomplete registry coverage and invalid contributor references, as specified by S04 P2/A6 and TEST_STRATEGY L01/G07. Actual: only supplied ID/caption pairs are compared with freshly generated canonical data; the `validate` callback validates freshly generated grouping fixtures rather than the supplied frame content. The outer loop also never verifies the full supported lesson set. This is one validator-boundary issue with two reproductions, not a request for new SQL semantics or a generic plugin architecture.

Repair both manifestations and add adjacent negative assertions as appropriate. Preserve the failing tests and independent hand oracle. Do not make these tests expect success, skip them, or accept invalid references by relabeling them metadata. No production fix attempted by QA.

## Code review scope and visual evidence

Read the sprint production changes: App, typed lesson map/components/shared tables, content metadata/catalog/grouping/joins/sort/retry/proofs, aggregation, player/host, group renderer/registry registration, styles, preview config and provenance notes; compared extracted joins and retained tests. No new upstream imports or dependency edits. App contains shell/selection/composition rather than arithmetic. Aggregation separates typed key identity from totals; explicit finite-number and NULL rules agree with the supplied bounded contract. Player derives valid index before child rendering; host hides failed SVG and exposes summary. No additional straightforward product bug established. This is not a comprehensive retained-core audit or lead logic acceptance.

**32 screenshots actually opened and reviewed**, all from Q04 and preserved in [browser evidence](../evidence/S04/independent-qa/browser/). Brace notation below enumerates exact filenames:

- `s04-{1440,390}-{known,null}-{group-c3,final}.png` (8).
- `qa-{1440,390}-group-{radio,pending,pan}-focus.png` (6). Radio = source-grain NULL; pending = choose-key NULL; pan = group-c3 NULL.
- `qa-{1440,390}-{join,sort,retry}-{initial,intermediate}.png` (12). Intermediate: resolve-bob LEFT/unique, first sort swap, quality-retry attempt2.
- `{1440,390}-{table.join,algorithm.loop,workflow.topology}.png` (6 final states).

Observed: desktop grouping cards and member references fit; paths remain outside text, with converging member lines backed by explicit IDs. Phone diagram is deliberately clipped to a labeled local scrolling region; HTML retains full records/counts/SUM and legible pending state. Query wraps without page overflow. Focus rings visible on radios, Step and diagram. Legacy initial/intermediate/final summaries remain readable; sort shows actual order/active pair/suffix; workflow HTML shows blocked attempt2 then success. Full-page captures after scrolling show a displaced fixed skip-link overlay; this artifact was not classified as an on-screen defect without a viewport reproduction.

Additional `{1440,390}-{duplicate-keys,inner-join}.png` files were generated and preserved but **not visually reviewed**; their underlying browser assertions passed. No generated image is counted as reviewed solely because it exists.

Limits: no full screen-reader session, real phone/touch testing, cross-browser run or exhaustive all-frame visual/Axe certification. Keyboard evidence uses actual Chromium key events via Playwright plus screenshot inspection, not a native assistive-technology session. No numeric precision promise beyond the approved finite-JavaScript-number examples. Retained predicate NULL semantics remain deferred. Test overlay is uncommitted and identified by hashes; no claim that an immutable new QA commit passed all gates.

## Next prompt

```text
Resume as medium developer on S04. Read projectmanagement/STATUS.md and reports/S04-qa.md with its evidence. Repair the complete S04-QA-01 batch: reject omitted supported lessons and validate the actual supplied grouping contributor/frame state rather than only regenerating clean fixtures. Preserve tests/s04-independent.test.ts and tests/browser/s04-independent.spec.ts, the independent expected values, historical failures and unrelated work. Stay within the approved S04 catalog/semantic contracts; do not weaken tests or start new features. Run focused regressions and the full release gate on the repaired candidate, update reports/S04-development.md and STATUS.md with revisions/results, and return the whole batch to independent light QA. Escalate only a material semantic/architectural conflict with a minimal reproduction. Do not accept S04 or begin S05.
```
