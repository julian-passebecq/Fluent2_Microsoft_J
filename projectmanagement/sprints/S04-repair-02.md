# S04 repair 02 — finish JOIN validation

Status: **READY FOR MEDIUM REPAIR**. This is remaining S04 work, not S05. Lead decision: 2026-09-08. Base candidate `17aaee9`, documentation HEAD `193043a` on `codex/s04-group-by-foundation`. Preserve the existing branch and all unrelated planning/evidence files.

## Why this repair is required

S04-LEAD-01 shows `validateCatalog` certifying JOIN steps whose reveal, focus or outcome is invalid. The JOIN callback ignores supplied steps. Authored reveal=-1 also passes, so simply comparing two copies of the same invalid fixture is insufficient. The displayed current examples remain correct; this repair establishes their required content gate.

Complete the following two passes continuously in one active development task. Do not ask the user to start each pass. Do not add features, rewrite the core JOIN algorithm, change renderer behavior unnecessarily, or weaken any QA/lead test.

## Repair pass R1 — semantic contract and implementation

1. Give the JOIN lesson a clear typed step contract retaining ID, caption, reveal count, focus IDs and outcome. Keep current seven step IDs and existing pair/source IDs. Type catalog dispatch so the trusted JOIN validator checks the **actual supplied JOIN steps**. The public callback on supplied variants cannot bypass validation; removing it if redundant is acceptable with callers/tests kept coherent.
2. Add a bounded pure JOIN lesson validator. Use the selected mode/dataset's source tables and compiled result as context. Validate before preparing renderable input; the normal `validateCatalog()`/`pnpm validate` path must exercise it. Avoid a recursive `joinInput -> validate -> joinInput` dependency.
3. Require finite integer reveal counts between zero and the actual result size, nondecreasing across the trace; first reveal zero and final reveal complete. Validate every focus reference against the selected source rows/result IDs; an output-row focus must refer to an emitted row. Reject missing required semantic fields and unsupported/wrong outcomes for the named step and join mode.
4. Enforce the fixed authored teaching sequence's per-step expectations. A same-IDs/captions object with wrong semantic state must fail. Structural comparison with trusted fixed expected state is allowed, with property-order independence, but retain independent domain invariants so a malformed authored canonical fixture cannot certify itself. Do not parse captions as the semantic source of truth.
5. Use the explicit reveal oracle below in tests; do not derive it by calling the validator/compiler being tested. Preserve the existing 76 valid frames and visible results.

| Named step | LEFT unique | INNER unique | LEFT duplicate | INNER duplicate |
| --- | ---: | ---: | ---: | ---: |
| select-alice | 0 | 0 | 0 | 0 |
| match-alice | 0 | 0 | 0 | 0 |
| emit-alice | 2 | 2 | 4 | 4 |
| select-bob | 2 | 2 | 4 | 4 |
| resolve-bob | 3 | 2 | 5 | 4 |
| match-chloe | 3 | 2 | 5 | 4 |
| emit-chloe | 4 | 3 | 6 | 5 |

Before resolve-bob, outcome is empty. From resolve-bob onward it states Bob is preserved with NULL for LEFT or excluded for INNER. Unknown IDs are invalid; do not reinterpret them as optional annotations. The original source/right/result focus sets remain valid, including the duplicate trace's final focus on all output rows.

Keep other lesson contracts intact. Sort/workflow catalog projections currently expose ID/caption descriptors and their trusted spec validators remain separate. Grouping exposes full frames and validates them. Do not introduce a universal schema/plugin system to make these shapes identical. Explain the boundary clearly, and test semantic data wherever the catalog actually carries it.

Readability: format the validator and touched dispatch code into readable statements; remove unused imports in touched modules. Do not perform a repository-wide formatting sweep.

## Repair pass R2 — regression batch and developer handoff

Preserve `tests/s04-lead-validation.test.ts`, the original `s04-independent` unit/browser files and previous repair tests. If the new API requires adapting a test call site, preserve the same malformed inputs, rejection expectations and positive acceptance case; document the reason. Do not delete the negative authored-state coverage because data becomes readonly: express the same invalid fixture through a test copy or controlled test cast without weakening the requirement.

Add adjacent negative cases for negative/fractional/NaN/overlarge reveal, reveal regression or incomplete final result, bad source/result references, focus on an un-emitted result, missing semantic fields and wrong Bob outcome. Cover all four valid variants with the table above. A copied valid trace with reordered object properties must still pass. Include at least one invalid authored-state check independent of canonical equality.

Run focused regressions, then frozen install and the full normal gate on the repaired candidate. Keep first-failure evidence and record actual revisions, commands and results. No skips/retries/timeout increases to hide failure. If renderable output is unchanged, prove that with the build hashes and say whether screenshots were freshly inspected; do not invent a visual review.

Write a current section in `reports/S04-development.md`, update STATUS and the ledger, and hand the complete candidate to light once. Do not claim acceptance or start S05.

## Independent light retest

Independently check R1's invariant coverage rather than merely rerunning the four lead failures. Verify all valid reveal sequences, at least one unknown focus and invalid outcome in each mode/dataset, plus the authored-data mutation. Run the normal gate in an isolated candidate checkout and retain exact source/test revisions. Correct the old report's byte-hash claim: source is equal after LF/CRLF normalization; raw test hashes differ. Preserve all historical report/log evidence.

If the build changes, inspect affected desktop/390px states; if unchanged, cite matching JS/CSS hashes and any reused evidence explicitly. Report the actual visual-review scope. Ordinary failures return as one batch; contract conflicts go to the lead with a minimal reproduction. On all-green evidence, return to lead for final validation-boundary review, not directly to S05.

## Exact medium prompt

```text
Resume as medium developer on S04. Read projectmanagement/STATUS.md, reports/S04-lead-review.md and sprints/S04-repair-02.md. Complete both repair passes continuously in this task: fix S04-LEAD-01 by validating the actual supplied JOIN semantic steps and enforcing independent reveal/reference/outcome invariants, including malformed authored canonical data. Preserve all original QA tests, tests/s04-lead-validation.test.ts, expected results and historical evidence. Stay within this bounded repair; no new lesson, SQL-core rewrite or S05. Run focused regressions and the full isolated-preview release gate, record the repaired candidate and actual results in the development report/status/ledger, then hand the whole batch to independent light QA with the retest instructions from the repair plan. Do not ask me to restart each pass or claim sprint acceptance.
```
