# AGENTS — Visual IT Concepts

## Active scope

Build one focused learning/reference product for analyst, BI, SQL, data engineering and cloud/data-platform concepts. Pipelines/DAGs belong to this product.

## Bootstrap architecture

- React 19 + Fluent UI application shell.
- Pure TypeScript semantic/spec core.
- Deterministic SVG renderer families where they fit.
- Thin React host / Figure composition.
- Stable semantic IDs; no DOM-selector semantics.
- No authored pixel coordinates as semantic state.
- Every visual must make sense in a static state.
- Respect `prefers-reduced-motion`.

## Reuse rule

Use `julian-passebecq/react_ms_fluent_2_framework@30e69639bfc3929c348fd8f9c6c38a2cb61984d8` as audited source. Import only the minimal dependency closure required by this product and document every imported upstream path in `UPSTREAM_IMPORT_MANIFEST.md`.

Do not copy the historical monorepo, patch its vendored source in place, or recreate its retired product matrix.

## Out of scope

- editorial D3 stories and recovered DataVis examples;
- draw.io / cloud architecture authoring;
- Power BI visual authoring/export;
- Web Components migration;
- Vega/Vega-Lite/D3plus/ECharts/G2 bake-off;
- new universal animation engine;
- notebook/LMS/Formation;
- code execution, judge or LeetCode product;
- public visual editor/sandbox.

## Quality gate before a release

Frozen install, typecheck, semantic/content validation, focused unit tests, production build, desktop primary-flow smoke, 390px phone smoke, keyboard basics, zero serious/critical Axe issues and no page-level horizontal overflow.
