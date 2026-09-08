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
