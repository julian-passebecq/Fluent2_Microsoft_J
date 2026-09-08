# Initial upstream import scope

This is a candidate allowlist. Codex must confirm the real dependency graph before importing.

Likely useful areas under upstream `project/conceptmotion_studio/`:

- `apps/algorithm-atlas/` as product-composition reference;
- `packages/core/` — semantic specs, validation, deterministic state/layout helpers;
- `packages/svg/` — retained renderer families and lifecycle;
- `packages/react/` — thin React adapter;
- `packages/figure/` — FigureView/FigurePlayer, reduced motion, playback/export behavior;
- `packages/ui/` — only the Fluent shell/components actually required;
- `packages/content/` — only if required by Figure/content contracts;
- selected `content/visuals/` teaching visuals;
- selected `content/data-platform/` lineage/workflow/data-platform explanations;
- focused tests that protect the imported behaviors;
- the minimum build/type/test configuration needed by that closure.

Do not import by default:

- Formation/notebook import/curriculum;
- Code Lab/interview/Monaco-heavy product surfaces;
- portfolio, Norsk, news or Pilot apps;
- scaffold generators unless a demonstrated bootstrap need remains;
- VizForge/editorial D3 engine;
- historical handoff/reference-material trees;
- broad CI for retired apps.

If an excluded package is genuinely necessary, record the exact import reason before adding it. Prefer extracting a small neutral contract over importing an entire retired product package.
