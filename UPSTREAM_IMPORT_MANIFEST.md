# Upstream import manifest

Upstream: `julian-passebecq/react_ms_fluent_2_framework@30e69639bfc3929c348fd8f9c6c38a2cb61984d8`

Codex must fill this file during bootstrap.

| Local path | Upstream path | Upstream blob/commit | Why imported | Local modifications |
| --- | --- | --- | --- | --- |

## Rules

- Import only after tracing the dependency closure.
- Preserve stable semantic IDs and tests.
- Do not silently import retired applications or broad monorepo infrastructure.
- Any local adaptation should be smaller than carrying the retired package/product that motivated it.
