# QA and definition of done

## Bootstrap milestone

Before feature expansion, the repository must prove:

- dependency/import map completed;
- exact upstream provenance recorded;
- minimal retained code compiles locally;
- at least one SQL/table explanation works;
- at least one algorithm explanation works;
- at least one pipeline/DAG explanation works;
- no editorial D3, draw.io, Power BI, notebook or judge product dependency leaked in.

## Release gate

1. `pnpm install --frozen-lockfile` from a clean checkout.
2. TypeScript typecheck.
3. Semantic/content/spec validation.
4. Focused unit tests for imported semantic/rendering behavior.
5. Production Vite build.
6. Desktop primary-flow browser smoke.
7. 390px phone smoke.
8. Keyboard basics for navigation and player controls.
9. No serious/critical Axe findings on primary routes.
10. No page-level horizontal overflow.
11. Reduced-motion mode must stop automatic decorative/teaching motion while keeping manual understanding possible.

Do not weaken an existing retained test simply to make the extraction pass.
