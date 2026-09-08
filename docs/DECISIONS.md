# Decisions

## 2026-09-08 — clean repository boundary

- Start `Fluent2_Microsoft_J` as a virgin repository, not a fork.
- Reuse proven Datapass semantic/rendering code selectively from the audited upstream commit.
- Keep React + Fluent for the product shell.
- Keep editorial D3 storytelling separate.
- Keep draw.io/cloud architecture authoring separate.
- Keep Power BI visual authoring separate.
- Do not start a new chart-library or Web Components migration during bootstrap.

This decision is about reducing product and repository coupling, not rejecting the useful work already proven in Datapass V4.

## 2026-09-08 — Milestone 1 bounded extraction

- Retain coherent pure TypeScript core modules and join/loop/workflow SVG families, including keyed DOM and lifecycle helpers.
- Narrow the SVG explanation helper at its cross-family dispatch boundary. Exclude unused scene families, content catalogs, UI package and retired apps.
- Adapt the upstream player index/timeout model to installed Fluent buttons and a React render callback. One keyed player lifetime per concept; timers clean up on unmount and reduced-motion changes.
- Author small deterministic proof fixtures against retained contracts. No new execution or animation engine.
- Retain a readable 960px diagram within a keyboard-focusable local scroll region. Reflow full SQL tables and workflow status summaries on phones. Semantic state is independent of viewport.
- Add an explicit SVG port group role after Axe detected prohibited naming. Keep core workflow transitions unchanged; correct the fixture to remain blocked throughout retry.
- Allow only esbuild's dependency build script in pnpm-workspace.yaml. The machine's default Node 21 is too old; use the available Node 24 runtime, keeping the repository's Node >=22.12 requirement.

## 2026-09-08 — compare joins at the same semantic step

Keep LEFT and INNER as aligned variants of one SQL concept. Preserve the frame index and shared join ID so matching pairs retain identity across mode switches. Pause automatic playback on a variant change to let the learner inspect the difference. Keep Bob in the source table in both modes; an INNER JOIN excludes him only from the result. No new upstream imports or renderer family.
