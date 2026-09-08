# Confirmed focused scope

## Product boundary

This repository contains one Visual IT Concepts product. Catalog sections are not separate products.

### Include

- Algorithms & computation.
- Tables, SQL & BI concepts.
- Distributed data & cloud principles.
- Pipelines, DAGs & reliability.
- Technical lineage and modeling explanations where useful.

### Exclude

- provider architecture creation/editing;
- editorial/economic D3 stories;
- Power BI visual tooling;
- Formation/course/notebook platform;
- code interview/judge product;
- public JSON/editor/generator product.

## Experience principles

- The visual explanation is the product, not the configuration UI.
- Use meaningful color and stable object identity.
- A paused/static frame must still explain the concept.
- Animation should explain state change, movement, correspondence or causality; do not animate trivial syntax.
- Code highlighting is optional and should remain lightweight when present.
- Prefer semantic references over callbacks tied to DOM nodes or authored coordinates.
- Prefer existing semantic renderer families over bespoke drawing.

## Important teaching patterns

- JOIN: show key matches, multiplicity, output-row expansion and grain change.
- GROUP BY: show rows entering groups and collapsing to grouped grain.
- Window/ranking: show partition, ordering, rank assignment and QUALIFY filtering.
- Algorithms: show candidate/active state, operation and next state together.
- Distributed data: show partitions, shuffle/movement and resulting ownership/grain.
- Pipelines/DAGs: show topology separately from run state; make retry/failure/backfill/fan-out/fan-in behavior visible.

## Product shell

React + Fluent is retained for the application shell. The semantic/rendering core should remain usable without embedding product-specific UI concerns in it.
