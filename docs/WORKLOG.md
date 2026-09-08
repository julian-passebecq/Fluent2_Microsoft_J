# Milestone 1 worklog — 2026-09-08

- Read 00_READ_FIRST.md first, then every work-pack entry including CODEX_MASTER_PROMPT.txt; read START_REPO_HERE.md and AGENTS.md before implementation. Applied the master prompt within the user's explicit Milestone 1 request.
- Confirmed origin is julian-passebecq/Fluent2_Microsoft_J and clean main was still bd5908f. Created codex/bootstrap-m1.
- Inspected immutable upstream Git objects at 30e69639bfc3929c348fd8f9c6c38a2cb61984d8; did not modify upstream. Committed the dependency plan before extraction.
- Imported core, three SVG families, host/reduced-motion hook; adapted shared player and explanation dispatch. Recorded exact upstream paths and blob hashes.
- Implemented the three proof fixtures, learner navigation, local diagram scrolling and reflowed semantic tables/status lists.
- Initial validation rejected upstream_failed -> pending during retry. Corrected fixture to retain blocked state until queued; no compiler change.
- Initial browser gate found Axe aria-prohibited-attr on eight graph ports. Added role=group to the local graph renderer, regression assertion and provenance entry. Also replaced internal workflow display terms with learner labels.
- Frozen install initially required approval of esbuild's install script under pnpm 11. Added a narrow allowBuilds entry and reran successfully. Used bundled Node 24.19.0 because system Node 21.7.1 does not satisfy the repository engine.
- Final commands, counts, browser version and evidence are recorded in QA_REPORT.md. No out-of-scope product area was touched.
