# S04 technical lead review

Date: 2026-09-08. Verdict: **REWORK — S04 not accepted**. Next actor: medium developer, one bounded validation repair batch, then independent light retest and lead review. No S05 implementation is authorized.

## Decision

The grouping arithmetic, contributor identity, NULL handling, typed lesson composition and runtime changes are coherent for the approved authored examples. The original S04-QA-01 repairs are valid: missing supported lessons are rejected and supplied grouping frames are checked rather than replaced by clean fixtures. QA's isolated 44-unit/17-browser PASS is supported by the saved logs.

However, the same validation boundary remains incomplete for JOIN. New lead regressions demonstrate that the catalog accepts invalid supplied JOIN semantics, and even a negative reveal count in the authored JOIN data. This fails S04 A6/L01 and the expanded unit gate. The displayed fixtures are not alleged to be wrong; the required protection against publishing incorrect instructional state is missing.

Repair scope and exact handoff: [S04 repair 02](../sprints/S04-repair-02.md). Keep all original QA tests and the new lead regressions. No production fix was made during this review.

## Reviewed revisions and evidence

- Base: `42886919fa2b574a499b249989eb9da0f649173d`.
- Application/test candidate: `17aaee96e98a43b02160c415e289e9c9380d559e`.
- Current branch: `codex/s04-group-by-foundation`, HEAD `193043a`; `git diff 17aaee9 HEAD -- src tests playwright.config.ts package.json pnpm-lock.yaml` is empty. The later commit contains documentation/evidence only.
- Preserved initial dirty files: AGENTS.md, STATUS.md and the untracked management/QA/evidence tree. The lead added an uncommitted test file and review/management evidence; no branch change, merge, push or deployment.
- Directly inspected the complete sprint production change set: App; all new lesson components/shared tables; metadata/catalog/joins/sorting/retry/grouping/proofs; aggregation core; player/host; group renderer/registration; CSS; preview config; README/provenance notes. Read new/changed tests and relevant retained table, workflow, renderer lifecycle and player callers. This does not certify every untouched retained core module.

## Blocking finding: S04-LEAD-01 (P2)

Location: `src/figures/content/catalog.ts:11` and `:29`, with missing JOIN instructional validation in `src/figures/content/joins.ts`.

The catalog passes `variant.steps` to `expected.validate`, but the JOIN callback ignores that argument and regenerates `joinLesson`/`joinInput`. The outer catalog check compares only step IDs and captions. JOIN steps also contain `reveal`, `focus` and `outcome`, all of which affect what the learner sees. Consequently invalid supplied values are certified as valid.

Observed reproduction at the reviewed candidate:

```ts
const altered = catalog.map(lesson => lesson.id === 'join'
  ? { ...lesson, variants: lesson.variants.map((variant, i) => i === 0
      ? { ...variant, steps: variant.steps.map((step, j) => j === 2
          ? { ...step, reveal: 999, focus: ['missing-order'], outcome: 'invented outcome' }
          : step) }
      : variant) }
  : lesson);
validateCatalog(altered); // returns { visuals: 4, variants: 8, frames: 76 }
```

Independent mutations isolate each of the three fields. A further probe temporarily changes the exported authored `joinSteps` emit-Alice reveal to `-1`; `validateCatalog()` still returns success. The probe restores the value in `finally` and does not edit production files. That case matters because canonical equality alone can accept the same bad data on both sides: the validator needs actual reveal/reference/progression invariants as well as any fixed-trace comparison.

Tests: [s04-lead-validation.test.ts](../../tests/s04-lead-validation.test.ts). The three supplied-state tests iterate all four JOIN variants after each earlier case is fixed; at the reviewed revision each fails on the first (LEFT/unique) case. The fourth negative test covers invalid authored reveal data; a positive copied/reordered-objects case prevents over-restrictive equality checks. All tests preserve existing independent expected values and original QA tests.

## Logic review findings by area

| Area | Lead assessment |
| --- | --- |
| Aggregation | Typed key encoding distinguishes NULL/string/number/boolean and normalizes negative zero. Group identity excludes aggregate values and source order. Each row contributes once; countRows includes NULL, countNonNull skips NULL, SUM stays NULL until a non-null number contributes. Inputs and sums reject non-finite values; duplicate IDs/unknown columns/missing cells/output collisions are checked. Independent integer/NULL oracles agree. No blocker found in this bounded contract |
| Grouping frames/repair | Named assignments and pending/complete data feed SVG and HTML consistently. Supplied state comparison checks the whole fixed trace and ignores object property order; caller callbacks cannot bypass trusted dispatch. Independent oracles remain essential because regenerated canonical frames are not an arithmetic oracle. S04-QA-01 fixed |
| JOIN | Source/pair identity, four datasets/modes and existing outputs preserved. Semantic outcome moved out of App. Validation gap above blocks acceptance; do not solve it by stripping semantic fields from the catalog |
| Sort/retry | Added HTML sorting state is meaningful. Sort assertions inspect adjacency, swap/no-swap result, suffix and final order. Success-only workflow assertion checks composed frames, permits same-frame prerequisite completion, preserves successful states and blocked retry. These are bounded authored lesson assertions, not general execution engines |
| Player | Current callers supply explicit alignment keys. Derivation before children avoids empty/shrink out-of-bounds frames; keyed lesson navigation resets; signature changes pause; timer effect includes signature; reduced motion and cleanup paths remain covered. Legacy callers without alignment keys still get positional compatibility; do not treat this as a future public guarantee for unrelated lessons |
| Renderer/host | Group renderer draws supplied membership/aggregates; pixels are local layout constants, not semantic state. Keyed source/group nodes and static HTML preserve inspectability. Host exposes explicit errors with fallback and has tested update/remount recovery. `table.group` is fixture-specific despite its broad input type; narrow/adapt intentionally before reuse for unrelated tables |
| Architecture/test harness | App owns selection and shell. No new dependencies, upstream imports or engine migration. Preview has strict run ownership and traces on failure; splitting browser flows retains their assertions. Several new files are compressed into long lines and retain unused imports; readability cleanup is recommended when those files are next touched, not a reason for an unrelated refactor now |

## Checks and visual review

| Run | Result | Scope/evidence |
| --- | --- | --- |
| QA Q08–Q10, reviewed | PASS as recorded | Fresh exact-candidate install and full gate: 76 frames, 44 unit tests, 17 browser tests. Read logs/config and confirmed application/test diff from candidate to HEAD is empty |
| LEAD-S04-01 | Reproduced invalid acceptance | Direct TS probes for supplied reveal/focus/outcome and authored reveal=-1; output remains 4/8/76 |
| LEAD-S04-02 | PASS | Typecheck including lead tests, existing shared checkout; [log](../evidence/S04/lead-review/typecheck.log) |
| LEAD-S04-03 | FAIL: 45 passed / 4 failed, 10.41s | All 44 existing tests pass plus copied-state positive case; four new validator regressions fail. [Unit log](../evidence/S04/lead-review/unit-validation.log). Production unchanged; not a fresh-checkout lead run |
| LEAD-S04-04 | FAIL: 1 passed / 4 failed, 3.34s | Final focused run after making positive property reordering explicit; [focused log](../evidence/S04/lead-review/focused-validation.log). No production changes |
| LEAD-S04-05 | Limited visual sample | Personally opened independent-retest `s04-1440-known-final.png` and `s04-390-null-group-c3.png`. Counts, members, 155/125 totals and C3 NULL are consistent; phone HTML retains meaning outside local diagram pan |

No fresh lead install/build/browser run was necessary for this validation-only finding: the application was unchanged and QA's isolated run is attributable. The new unit failures are sufficient to withhold acceptance. No claim of a lead screen-reader session, real-phone test or exhaustive visual inspection.

Evidence correction: retest QA text says the two original test byte hashes match exactly, but its `hashes.txt` contains different test hashes. Direct file comparison shows original files use LF and the fresh checkout uses CRLF; normalized text is identical. This is a line-ending difference, not weakened tests. JS/CSS hashes match exactly. Future reports should say normalized source equality or report Git blob IDs when checkout line endings differ. See [provenance note](../evidence/S04/lead-review/provenance.md).

## Acceptance disposition and next work

A1–A5 and A7 have no blocking finding in this review. A6 fails due to S04-LEAD-01. A8's original QA gate passed, but the expanded required unit gate fails. A9 lead review is now complete with a REWORK decision, not acceptance. The existing two QA defects stay verified fixed; record this adjacent gap separately so history remains accurate.

Medium completes both repair passes in `S04-repair-02.md`, light independently retests the whole batch and corrects the evidence wording, then the lead reviews the repaired validator. No need to restart the grouping feature or reopen the wider architecture. Candidate next-sprint priorities remain discovery/stable links and a bounded filtering lesson, but S05 is not scoped or authorized until S04 is accepted.
