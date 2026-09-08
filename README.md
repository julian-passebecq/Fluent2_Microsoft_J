# Fluent2 Microsoft J — Visual IT Concepts

Clean product repository for **Datapass Visual IT Concepts**.

This repository intentionally starts from a small React + Fluent shell. It is **not a fork** of the historical Datapass monorepo and it is **not a rewrite of the proven visualization work from zero**. Codex should selectively import the smallest proven semantic/rendering closure from `julian-passebecq/react_ms_fluent_2_framework` at audited commit `30e69639bfc3929c348fd8f9c6c38a2cb61984d8`.

Milestone 1 implements LEFT JOIN (7 steps), bubble sort (26 steps) and a quality-check retry DAG (8 steps). All share one deterministic player with manual stepping, 1.2-second playback and reduced-motion support.

Milestone 2 adds an aligned INNER JOIN comparison. In SQL joins, select LEFT or INNER at any step: playback pauses, matching pairs keep their identity, and Bob's NULL row is preserved or excluded. Final counts are four rows/three customers for LEFT and three rows/two customers for INNER.

## Run locally

Use Node >=22.12 (validated with 24.19.0) and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Verify

```sh
pnpm exec playwright install chromium
pnpm check
```

`pnpm check` runs typecheck, content validation, unit tests, production build and Chromium smoke. Browser tests serve the production build on port 4173. Screenshots are written to ignored `test-results/`. No upstream checkout is needed to install, build, test or run the app.

See `UPSTREAM_IMPORT_MANIFEST.md` for every retained path/blob and adaptation, `docs/BOOTSTRAP_IMPORT_PLAN.md` for the inspected closure, and `QA_REPORT.md` for release evidence. `scripts/import-upstream.mjs` records the initial extraction procedure only; do not rerun it over locally adapted modules.

Read `START_REPO_HERE.md` and `AGENTS.md` before further implementation.
