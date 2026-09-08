# Milestone 1 QA report

Result: **PASS**. Date: 2026-09-08.

Validated implementation/test commit: `5e1606319fa3ec69fddb9697b21a7923077961ee` on `codex/bootstrap-m1`. Tests ran against this exact file content before committing; the subsequent report commit changes documentation/evidence only.

Environment: Windows; Node 24.19.0; pnpm 11.19.0; Playwright 1.63.0; Chromium 153.0.8010.12 (build 1243); Axe 4.13.0.

The system default Node 21.7.1 is below the engine requirement. Commands used the bundled Node directory first on PATH: `C:\Users\julia\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin`.

| Command/check | Final result |
| --- | --- |
| `pnpm install --frozen-lockfile` | PASS; committed lockfile, no resolution changes; esbuild postinstall succeeded |
| `pnpm run typecheck` | PASS; strict application, test, validation and config TypeScript |
| `pnpm run validate` | PASS; 3 visuals, all 41 frames compile and semantic references resolve |
| `pnpm test` | PASS; 13 tests in 3 files; final run 23.87 seconds |
| `pnpm run build` | PASS; Vite production build; JS 378.18 kB / 109.95 kB gzip |
| `pnpm exec playwright install chromium` | PASS; browser installed |
| `pnpm run test:browser` | PASS; 3 tests, 43.6 seconds; production preview |
| Desktop primary flow | PASS; 1440×1000, each complete trace and play/pause/reset |
| Phone primary flow | PASS; 390×1000, all three concepts; SQL tables/status summaries reflow |
| Keyboard | PASS; Tab to skip link, Enter into lesson, Enter to step, focused phone canvas ArrowRight scrolling |
| Axe | PASS; 12 scans: initial/final state × three concepts × two viewports; zero serious/critical violations |
| Overflow | PASS; document scrollWidth <= innerWidth on every final concept state at both viewports; deliberate diagram scroll remains local |
| Reduced motion | PASS; live media preference change stops playback; manual Step works for all concepts; SVG transitions compute to zero |
| Identity/lifecycle | PASS; loop and source/result row identity, workflow stable transforms, deterministic freeze, renderer destroy, timer cancellation/unmount, navigation reset |
| Resize | PASS; 390→430 and 1440→1280 during sorting preserve current frame |
| Workflow visual geometry | PASS; four disjoint task bounds; screenshot review confirms Source, Transform, Quality, Publish are all visible |

## Visual evidence

Screenshots from the final passing browser run are in `docs/qa/` (initial output: ignored `test-results/`). All six final concept screenshots were visually inspected across this run. The corrected workflow desktop and phone screenshots were checked after the layout fix. Mobile diagrams retain their full text size and require the explicitly labelled local horizontal pan; full SQL data and task statuses remain available below.

## Problems resolved during the gate

1. Fixture used invalid upstream_failed → pending transition. Kept Publish blocked during retry and queued it after Quality succeeds. Core rules unchanged.
2. Axe found serious aria-prohibited-attr on eight SVG ports. Added group roles in the local retained graph module and regression coverage.
3. Screenshot review found Source/Transform overlap in the unannotated workflow fallback layout. Always use the retained workflowGeometry contract; added disjoint-box browser assertion.
4. pnpm initially blocked esbuild's install script. Added only esbuild to allowBuilds; frozen install then passed.

Warnings: Playwright emits a benign NO_COLOR/FORCE_COLOR environment warning. No production build warnings or uncaught browser page errors. No unresolved Milestone 1 blockers. No deployment or remote push performed.
