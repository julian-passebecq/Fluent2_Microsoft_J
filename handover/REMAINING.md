# Remaining outcomes

This checklist comes from the existing vision/backlog. No S05 implementation has started. The exact final V1 lesson count and cutoff are not settled; agree a bounded release scope rather than inventing a larger product. The successor decides implementation.

## Immediate unfinished work

- Verify repair 02 at `8aa89e6` (same production source on this handover branch): invalid JOIN reveal bounds/progression, source/result focus, named-step outcomes and malformed authored data must be rejected while valid examples remain valid.
- Close S04-LEAD-01 based on verification and explicitly decide S04 acceptance. Preserve original failure evidence; repair 01 is already independently verified.
- Reconcile historical status labels when acceptance actually changes. Closeout notices do not turn earlier reviews into acceptance.

## Missing product outcomes

| Area | Remaining learner outcome | Backlog |
| --- | --- | --- |
| Discovery | Domain discovery, stable concept/variant links, back/forward and unknown-link fallback | UX-01 |
| Filtering | WHERE versus HAVING, with correct membership/totals and an explicit bounded SQL/NULL contract | SQL-02/03 |
| Windows | Partitions, ordering, explicit ROWS frames, preserved grain, ranking/ties and named-dialect filtering | SQL-04/05 |
| Pipelines | Fan-out/fan-in success policy, blocked branches, retry versus rerun, idempotent versus duplicate output | PIPE-01/02 |
| Distributed data | Partition ownership, shuffle and skew | DATA-01 |
| BI modeling | Fact/dimension grain and double-counting, with reconciled measures | BI-01 |
| Lineage | Trace sources into derived records; lower priority | DATA-02 |

The current retry DAG is not a complete pipeline curriculum. Another algorithm catalog is deferred. No login, backend, arbitrary SQL execution, public editor, LMS, Power BI exporter or cloud architecture authoring is required.

## Semantic and release gaps

- Retained predicates are not a complete SQL evaluator; NULL-sensitive teaching needs a correctness contract before using them.
- Workflow compilation is not a scheduler. Future operational lessons need correct dependency/output assertions.
- Release requires accepted scope, integration beyond bootstrap-only main, frozen install, typecheck, semantic/content validation, focused units, production build, desktop and 390px primary flows, keyboard basics, zero serious/critical Axe findings and no page-level horizontal overflow.
- Release PR/merge and deployment are not done by this closeout. This branch contains reviewable source, not a deployed product. A hosting destination is not established here.
