# Upstream import manifest

Repository: julian-passebecq/react_ms_fluent_2_framework
Commit: 30e69639bfc3929c348fd8f9c6c38a2cb61984d8

| Local path | Upstream path | Source blob | Reason | Adaptations |
| --- | --- | --- | --- | --- |
| src/figures/core/algorithm.ts | project/conceptmotion_studio/packages/core/src/algorithm.ts | 5f2355dcb1ac3cff0d7ff9c3ff2bd60fe88a7aa1 | Retained semantic/compiler dependency | unchanged |
| src/figures/core/diagram.ts | project/conceptmotion_studio/packages/core/src/diagram.ts | 50c066f1cfff42c7212ea3229ae2669750d64487 | Retained semantic/compiler dependency | unchanged |
| src/figures/core/diagram-layout.ts | project/conceptmotion_studio/packages/core/src/diagram-layout.ts | 8f36239fceee50ce472b5af9d8c14870d005de1e | Retained semantic/compiler dependency | unchanged |
| src/figures/core/entities.ts | project/conceptmotion_studio/packages/core/src/entities.ts | dfb93f9b1aa01516be7a6594f8bb51b6521f99e4 | Retained semantic/compiler dependency | unchanged |
| src/figures/core/explanation.ts | project/conceptmotion_studio/packages/core/src/explanation.ts | 6686a4c0ce3d33f982e044772ff5492dedbae4bb | Retained semantic/compiler dependency | unchanged |
| src/figures/core/flow.ts | project/conceptmotion_studio/packages/core/src/flow.ts | fa4307f89db95f18ce08479cad530152840b4446 | Retained semantic/compiler dependency | unchanged |
| src/figures/core/icons.ts | project/conceptmotion_studio/packages/core/src/icons.ts | afdffe6d82d509c3930e34d172ef377223d2121d | Retained semantic/compiler dependency | unchanged |
| src/figures/core/localization.ts | project/conceptmotion_studio/packages/core/src/localization.ts | a21edad2234697741f7226f5718492ceb195324a | Retained semantic/compiler dependency | unchanged |
| src/figures/core/serialization.ts | project/conceptmotion_studio/packages/core/src/serialization.ts | 540b443a9d406d17da55c95721ebbbba693bdcdf | Retained semantic/compiler dependency | unchanged |
| src/figures/core/table.ts | project/conceptmotion_studio/packages/core/src/table.ts | d38d09b38f94b6b437053c3942755abf3db80def | Retained semantic/compiler dependency | unchanged |
| src/figures/core/transitions.ts | project/conceptmotion_studio/packages/core/src/transitions.ts | ee9de2e61196cc553844397abe2c03eabcca0433 | Retained semantic/compiler dependency | unchanged |
| src/figures/core/validation.ts | project/conceptmotion_studio/packages/core/src/validation.ts | b0f55599b239c1b0d7f0107e186c121f1b809e2e | Retained semantic/compiler dependency | unchanged |
| src/figures/core/workflow.ts | project/conceptmotion_studio/packages/core/src/workflow.ts | e738a3be1f1389a115bade9d224e21dfa75f7e78 | Retained semantic/compiler dependency | unchanged |
| src/figures/renderers/base-renderer.ts | project/conceptmotion_studio/packages/svg/src/base-renderer.ts | b0dce61b9e448706a4e5c53097e303ddf47e116d | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/dom.ts | project/conceptmotion_studio/packages/svg/src/dom.ts | 768abc7bc4b57a9eecd7d99c3bb36ea292b89e71 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/freeze.ts | project/conceptmotion_studio/packages/svg/src/freeze.ts | 5d02065a5ba72e9701ab795a57d79b44c881643b | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/theme.ts | project/conceptmotion_studio/packages/svg/src/theme.ts | 73bdc2f3bfa3be52d6185280bd9dfd80253fbe06 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/types.ts | project/conceptmotion_studio/packages/svg/src/types.ts | a99ace0cbd4984603fe466b4ff473ea99527cff2 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/layout.ts | project/conceptmotion_studio/packages/svg/src/layout.ts | 000fd8e8715b89968038e760133a6ae6e10b9190 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/registry.ts | project/conceptmotion_studio/packages/svg/src/registry.ts | ccd86ff750825c64d8cf38a3ec56a3cc92e78332 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/flow-style.ts | project/conceptmotion_studio/packages/svg/src/flow-style.ts | 00d94b6401138d7a47f6e7c33fd666b7b12f6480 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/explanation.ts | project/conceptmotion_studio/packages/svg/src/explanation.ts | 4735c7a429aba11ab73795440ef3c13f300e22c4 | Retained SVG family/lifecycle dependency | narrow scene resolution; remove unrelated viewport dispatch |
| src/figures/renderers/renderers/shared.ts | project/conceptmotion_studio/packages/svg/src/renderers/shared.ts | 8990b6a54910a2cc032c90d214ea61c6553b68e2 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/renderers/graph.ts | project/conceptmotion_studio/packages/svg/src/renderers/graph.ts | c9fe93111b08357efd52efbd7bce8061be98b0a5 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/renderers/loop.ts | project/conceptmotion_studio/packages/svg/src/renderers/loop.ts | bfc6dc518d3c33d233b1bb859bfa7b4673d4882b | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/renderers/join.ts | project/conceptmotion_studio/packages/svg/src/renderers/join.ts | 0ac0d0c8b30aff63da614848ddbfdb434cc3b2fb | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/renderers/renderers/workflow.ts | project/conceptmotion_studio/packages/svg/src/renderers/workflow.ts | b74953e54b01589ddeb1d4e9cd10645934d18454 | Retained SVG family/lifecycle dependency | local core import only |
| src/figures/react/renderer-host.tsx | project/conceptmotion_studio/packages/react/src/renderer-host.tsx | 4f4302538a61702b26ec7a7c290e263ef7f31169 | SVG mount/update/destroy ownership | local minimal registry import |
| src/figures/react/use-reduced-motion.ts | project/conceptmotion_studio/packages/react/src/use-reduced-motion.ts | 00311908ec1a9337c839b90865ec21db2a36eb94 | OS motion preference subscription | unchanged |
| src/figures/react/FigurePlayer.tsx | project/conceptmotion_studio/packages/figure/src/player.tsx | ae4b28f353a44696879b7b87065942a15a926226 | Shared bounded index and timeout playback model | adapt: Fluent controls and render callback; omit inspector/export/DOM observers |
| tests/table-transitions.test.ts | project/conceptmotion_studio/packages/core/tests/table-transitions.test.ts | 6bdee7c034c4cbe2d28aa730629dcb58146242fa | Protect imported join/identity/transition semantics | local core import only |

Local files are product-owned extracted code, not a vendored checkout. The import script is audit tooling only; builds never execute it. No runtime or install dependency references upstream. New fixtures, registry/barrels, CSS and app composition are local. Content reference paths inspected, not copied: content/visuals/sql.ts, content/visuals/algorithms.ts (under project/conceptmotion_studio).

## Adaptation protection
- explanation.ts: panel rendering unchanged; workflow resolution only. Tests compile every workflow frame and render all three families.
- FigurePlayer.tsx: preserves deterministic bounded seek, 1200ms playback, pause on reduced motion and cleanup on unmount; removes metadata/export/selection and broad Figure registry dependencies. Player and browser tests protect steps, reset, end, navigation and reduced motion.
- renderer-host and SVG family imports: resolve local minimal registry/core; identity and lifecycle tests protect behavior.

## Post-import fixes

S04 local adaptations (no new upstream paths):
- `src/figures/react/FigurePlayer.tsx`: named-step aligned switching, unaligned reset, synchronous empty/shrink safety and timer cancellation. Covered by player/runtime-contract tests.
- `src/figures/react/renderer-host.tsx`: explicit failure message alongside fallback, with mount/update/recovery/destroy fault-injection tests.
- `src/figures/renderers/index.ts`: register the approved local table.group family. Its bounded compiler (`core/aggregation.ts`), authoritative frame contract and renderer are new local code, not claimed as upstream imports. The lead's scoped table/collection inspection and approved exception are in projectmanagement/sprints/S04.md.
- Former local content proofs were split into joins/sorting/retry with a compatibility re-export. Core workflow transition behavior and table predicates are unchanged; success-dependency enforcement is a product lesson assertion.

Milestone 3: no upstream imports or renderer/compiler changes. Added a duplicate-key fixture against the same TableJoinSpec contract; source and pair IDs persist between datasets. The local application supplies a taller fixed join viewport for six output rows and uses the existing playbackKey for dataset changes. Pair-completeness and browser identity tests cover the extension.

Milestone 2 adds no upstream paths or dependencies. FigurePlayer's local adaptation now accepts a playbackKey: changing join mode pauses its timer while preserving the absolute frame index. Protected by tests/player.test.tsx and browser/join-comparison.spec.ts. The existing join compiler and renderer are unchanged; INNER content uses the same input tables and pair IDs.
- packages/svg/src/renderers/graph.ts: add group role to named port groups (Axe serious issue). Protected by unit port-role assertion and browser Axe.
- packages/svg/src/renderers/workflow.ts: learner labels Blocked/Ready/Waiting and Success dependencies replace internal status/preset copy. Semantic states are unchanged; blocked-label test added.

- packages/svg/src/renderers/workflow.ts: always use retained workflowGeometry, including without explanation tracks; fixes overlapping tasks in fallback layout. Browser disjoint-box and unit stable-transform assertions protect this change.
