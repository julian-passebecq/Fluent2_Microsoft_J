# Start here — Visual IT Concepts

Date: 8 September 2026

## Decision

This repository is a **clean product restart**. It is deliberately not a GitHub fork of `julian-passebecq/react_ms_fluent_2_framework` and it must not absorb that historical monorepo wholesale.

It is also **not a rewrite of the proven visualization work from zero**. Reuse the smallest proven semantic/rendering subset from the audited upstream source after tracing its dependency closure.

## Product

One product lives here: **Visual IT Concepts** — clear static or animated explanations for concepts used in SQL, BI, analytics, data engineering and cloud/data-platform work.

Primary content areas:

- tables, grain, joins, GROUP BY, windows, ranking and QUALIFY;
- algorithms and computational state;
- BI modeling, lineage and semantic-model concepts;
- partitions, shuffle, distributed-data principles;
- pipelines, DAGs, retries, idempotency, branching, fan-out/fan-in and quality gates.

Static explanation is first-class. Motion and code are optional and should appear only when they improve understanding.

## Explicitly separate

Do not bring these products into this repository:

- editorial / economic / newsroom D3 storytelling (`Fluent2_J_Viz` / `d3siteeco` lineage);
- draw.io / cloud architecture creation tooling;
- Power BI `.pbiviz`, Deneb or visual-generation tooling;
- Formation/notebook/LMS product;
- Code Interview/LeetCode/judge product;
- Portfolio or Norsk sites;
- a public JSON/chart sandbox.

## Upstream source

- repository: `julian-passebecq/react_ms_fluent_2_framework`
- audited reusable source commit: `30e69639bfc3929c348fd8f9c6c38a2cb61984d8`
- historical V4 consumer pin: `ce8353ee0878ca74b2fe24a1af7de657a6ba61f2`

Codex must inspect the real import graph before copying anything. Preserve imported-path provenance in `UPSTREAM_IMPORT_MANIFEST.md`.

## Bootstrap target

Before adding new lessons:

1. map the upstream dependency closure;
2. import the smallest required semantic core / SVG renderer / React-Figure / Fluent subset;
3. make one SQL/table concept, one algorithm concept and one workflow/DAG concept render in this repository;
4. establish lockfile, typecheck, validation, focused tests and production build;
5. only then improve the product catalog and visuals.
