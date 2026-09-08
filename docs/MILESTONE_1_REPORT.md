# Milestone 1 end-of-run report

## Status

- Branch: `codex/bootstrap-m1`
- Commits: `e567afa` dependency map; `81ae1af` retained core/renderers/player; `f677574` three proofs; `5e16063` release gate and workflow fixes. Final evidence is in the following documentation commit.
- Task: clean independent bootstrap.
- Result: **PASS**.

## What changed

Implemented LEFT JOIN, bubble sort and retry/blocked-downstream workflow in the focused React 19 + Fluent shell. Shared player supports play/pause, previous, step, reset and reduced motion. Added local diagram scrolling, readable SQL tables and workflow summaries, lockfile, validation, focused tests and production browser checks.

## Upstream reuse

Reused 13 coherent core modules, the three SVG families and their helper closure, the React renderer host/motion hook and the player index/timeout pattern from audited commit `30e69639bfc3929c348fd8f9c6c38a2cb61984d8`. Adapted explanation dispatch, small registry/player composition, port roles and workflow display/layout selection. Core semantics are unchanged. Every imported path and source blob is listed in `UPSTREAM_IMPORT_MANIFEST.md`; local adaptations are recorded separately. No runtime dependency on the old checkout.

## Evidence

`pnpm install --frozen-lockfile`, `pnpm run typecheck`, `pnpm run validate`, `pnpm test`, `pnpm run build`, and `pnpm run test:browser` all pass. Validation: 41 frames. Unit tests: 13/13. Browser tests: 3/3. Desktop 1440px, phone 390px, keyboard, reduced motion, no page overflow and zero serious/critical Axe issues. Exact environment/results: `QA_REPORT.md`.

## Visual proof

- LEFT JOIN: 7 states; stable source and pair IDs; C1 fans out to two orders, C2 emits NULL, C3 matches O3; final four-row HTML result and SVG lineage; phone tables reflow.
- Bubble sort: 26 states; five stable item IDs move through compare/swap/no-swap and sorted suffix; synchronized code and operation; manual static steps teach without motion; diagram pans locally.
- Workflow: 8 states; stable four-node topology and IDs; failed Quality blocks Publish, retries on attempt 2, succeeds and releases Publish; glyph/text statuses survive reduced motion; readable phone status list.

## Problems found

Resolved fixture transition error, serious SVG port naming issue and overlapping legacy workflow layout. Small local fixes and regressions are documented in `FRAMEWORK_GAPS.md`. Default machine Node was below the project engine; used available Node 24. No unresolved blockers.

## Scope check

No out-of-scope product area touched. No architecture restart, upstream mutation, generic editor or runtime.

## Next bounded task

Milestone 2: add one INNER JOIN comparison using the retained table family. Complete when switching join type demonstrates dropped unmatched rows and changed output counts, with provenance/content tests and the same release gate passing.
