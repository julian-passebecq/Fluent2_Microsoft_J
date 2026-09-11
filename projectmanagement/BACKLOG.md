> Closeout 2026-09-11: paused for one Pro AI. Start with [handover](../handover/README.md). Repair 02 is developer-complete at 8aa89e6; retest/acceptance pending. Earlier role prompts/verdicts are historical; do not restart the agent relay.

# Backlog

Maintainer: light QA/backlog role. Priorities and sprint scope: technical lead. Last triage: 2026-09-08. This is the ordered roadmap, not permission to implement everything.

Statuses: PLANNED, READY, IN_PROGRESS, QA, LEAD_REVIEW, DEV_REWORK, ACCEPTED, DEFERRED, BLOCKED. A reported historical PASS is not silently upgraded to current acceptance. Defects additionally carry severity: P1 blocks trustworthy release, P2 needs a scoped fix/decision, P3 improvement. Do not create duplicate items for the same root cause.

## Current lead disposition — 2026-09-08

**S04 DEV_REWORK**, reviewed `17aaee9`. S04-QA-01 stays verified fixed. New **S04-LEAD-01 (P2)**: JOIN validation ignores supplied reveal/focus/outcome and permits an authored reveal of -1. ENG-05 and the expanded gate require repair. Medium owns [repair 02](sprints/S04-repair-02.md); light retests the batch, then lead decides acceptance. No S05 scope is authorized. [Lead report](reports/S04-lead-review.md), [failing regressions](../tests/s04-lead-validation.test.ts), [unit evidence](evidence/S04/lead-review/unit-validation.log).

| ID | Work and reason | Priority / status | Owner | Dependency / done evidence |
| --- | --- | --- | --- | --- |
| BASE-01 | Preserve LEFT/INNER and duplicate-key pair semantics | P1 / historical M3 implementation | Medium + light regression | Four combinations; exact pairs, Bob, stable IDs; see baseline audit |
| ENG-01 | Typed catalog and lesson composition; remove semantic branching/arithmetic from App | P1 / LEAD_REVIEW, no blocker found | Medium | S04 A1/A2; L01 and legacy regressions |
| ENG-02 | One authoritative frame for all views; named step meaning | P2 / LEAD_REVIEW, no blocker found | Medium | ENG-01; SVG/HTML/caption agreement |
| ENG-03 | Empty/shrinking/aligned player trace safety | P2 / LEAD_REVIEW, no blocker found | Medium | Baseline A-02; P01–P03 |
| ENG-04 | Explicit renderer error with static summary and recovery coverage | P2 / LEAD_REVIEW, no blocker found | Medium | Baseline A-03; H01 |
| ENG-05 | Catalog-wide validation and supported workflow instructional invariants | P1 / DEV_REWORK S04 | Medium | S04-LEAD-01 JOIN repair; grouping QA fix remains valid |
| ENG-06 | Full HTML/text state for sort and grouping | P2 / LEAD_REVIEW, no blocker found | Medium | Baseline A-05; B02/B03/B05 |
| SQL-01 | GROUP BY grain, membership, SUM and two COUNT forms, baseline/NULL variants | P1 / LEAD_REVIEW, no blocker found | Medium | ENG-01/02/05; S04 A3/A4; G01–G07/R01 |
| QA-01 | Preview ownership/isolation in normal browser gate | P1 / LEAD_REVIEW, verified | Medium implementation, light verification | Owned strict4194; independent gate |
| QA-02 | Diagnose 30s browser timeouts; split large flows and retain assertions | P1 / LEAD_REVIEW, verified | Medium implementation, light verification | Independent 17-test browser gate passes without retries |
| QA-03 | Independent test matrix, current evidence and branch ledger | P1 / QA, next repair retest pending | Light | Original packet complete; include new lead regressions in next gate |
| SQL-02 | Decide bounded SQL predicate/NULL contract before WHERE/HAVING | P2 / DEFERRED, blocks SQL-03 | Lead decision then medium | Baseline A-01; authoritative truth table and negative tests; no general SQL engine |
| UX-01 | Discoverable catalog, domain filters, stable concept/variant links, back/forward and unknown-link fallback | P2 / PLANNED candidate S05 | Lead scopes, medium builds | S04 accepted; route/state lifecycle contract; preserve static content |
| SQL-03 | WHERE versus HAVING using group membership and changed totals | P2 / PLANNED | Medium after lead scope | SQL-01/02; independent filter-before/after examples |
| SQL-04 | Window partitions/order and grain preservation | P2 / PLANNED | Lead scopes | SQL-01; renderer reuse audit; explicit row/tie order |
| SQL-05 | Ranking/ties and QUALIFY-style filtering with a named dialect | P2 / PLANNED | Lead scopes | SQL-04; documented dialect semantics; equal-key fixtures |
| PIPE-01 | Fan-out/fan-in success policy and blocked branches | P2 / PLANNED | Lead scopes | ENG-05; all/partial prerequisite examples; fixed topology |
| PIPE-02 | Retry versus rerun and idempotent output | P2 / PLANNED | Lead scopes | PIPE-01; stable output identity and duplicate-output counterexample |
| DATA-01 | Partition ownership, shuffle and skew | P2 / PLANNED | Lead scopes | SQL-01; movement/group membership contract and family audit |
| BI-01 | Fact/dimension grain and measures that double-count | P2 / PLANNED | Lead scopes | BASE-01/SQL-01; independently reconciled totals |
| DATA-02 | Technical lineage from source to derived records | P3 / PLANNED | Lead scopes | SQL-01/BI-01; minimum retained lineage closure if needed |
| ALGO-01 | Another computation lesson only when it supports the data learning path | P3 / DEFERRED | Lead | Evidence of learner value; retain current sort proof |
| REL-01 | Integration/release candidate from the accepted branch sequence | P1 before publication / PLANNED | Lead + user authorization | Full root release gate, actual remote/PR inspection, no bootstrap-only main release |

## Historical S04 independent repair retest — 2026-09-08

**READY FOR LEAD REVIEW** at `17aaee9` (documentation HEAD `193043a`). ENG-01 through ENG-06, SQL-01 and QA-01 through QA-03 now **LEAD_REVIEW**, not accepted. S04-QA-01 is **verified fixed** by independent Q08–Q10: original tests unchanged;44 unit tests and17 production browser tests pass in a fresh candidate checkout. No new blocking finding. [Current report](reports/S04-qa.md) / [gate](evidence/S04/independent-retest/qa-check.log). Historical blocked row below is retained as failure history and superseded by this retest. No future scope/priorities changed.

## Historical S04 independent QA triage — 2026-09-08

Current disposition supersedes the historical READY S04 labels above: **DEV_REWORK / RETURN TO DEVELOPMENT**, reviewed HEAD `7ff24f0`. ENG-01/02/03/04/06, SQL-01, QA-01/02 have passing independent evidence and remain **QA**, not accepted. ENG-05 is **BLOCKED pending S04-QA-01 repair**. QA-03's initial independent packet is complete; it remains **QA pending repair retest**. Lead priorities and future scope unchanged. See [QA report](reports/S04-qa.md) and [final gate](evidence/S04/independent-qa/qa-final-check.log).

| ID | Severity / status | Observed defect and reproduction | Owner / target / evidence |
| --- | --- | --- | --- |
| S04-QA-01 | P2 / observed / BLOCKED release gate | `validateCatalog` accepts omission of GROUP BY and accepts a group-c1 member `missing-order` when supplied IDs/captions remain valid. Expected rejection under L01/G07/A6. One validation-boundary root cause; two failing regressions in `tests/s04-independent.test.ts` | Medium / S04 repair batch; [report](reports/S04-qa.md), [focused failure](evidence/S04/independent-qa/qa-focused.log). No QA production fix; retest required |

## Candidate sequence after S04 (lead-owned, unchanged)

Candidate S05: discoverability/stable links plus SQL predicate decision and a bounded WHERE/HAVING lesson if S04 is solid. Candidate S06: windows and grain-preserving comparisons. Next: pipeline fan-in/retry/idempotency, then distributed movement and BI modeling. These are priorities, not committed sprint contracts or dates. The lead rewrites the next sprint after actual code review and the user's feedback on pass size.

## Defect entry format

Add ID, severity, observed/suspected, affected revision, reproduction/test ID, expected/actual behavior, owner, target sprint and evidence link. Keep findings tied to this table or the active sprint, not in a second conflicting task list. Light may add/triage findings and recommend order; only the lead moves new feature scope into an active sprint.
