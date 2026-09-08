# Milestone 3 end-of-run report

## Status

Branch: codex/join-cardinality-m3. Implementation: 37845effb5fbdc52cb9a37dc0ea2c970c3239a98. Task: duplicate-key cardinality. Result: PASS.

## What changed

Added Unique keys / Duplicate C1 key dataset controls. Two separate customer records share key C1 and each matches O1/O2. The seven-step LEFT/INNER comparison now explains multiplication and distinguishes customer records from distinct customers. Dataset changes preserve frame and pause playback.

## Upstream reuse

Existing join compiler, renderer and player reused. No new imports, dependencies or renderer adaptations. Provenance and reuse report updated.

## Evidence

Frozen install and pnpm run check pass: typecheck, 62-frame validation, 17 unit tests, production build, 7 browser tests. Desktop/390px, keyboard, identity, reduced motion, zero serious/critical Axe issues and no page overflow. See QA_REPORT.md for exact environment and commands.

## Visual proof

Two C1 customer records × two C1 orders = four distinct matching pairs. LEFT ends at six rows, INNER at five. Stable record IDs remain distinct from repeated key values. Matched source/result DOM nodes survive switching. Static captions and counts explain the overcount risk; phone tables reflow and the diagram pans locally.

## Problems found

No new blockers or retained-framework defects. Increased the fixed join viewport to accommodate six output rows without clipping.

## Scope check

No out-of-scope work or upstream mutation. All changes committed locally.

## Next bounded task

Add a GROUP BY example showing how the output grain changes from orders to customer totals. Complete when row counts and conserved totals are explicit and the existing release gate passes.
