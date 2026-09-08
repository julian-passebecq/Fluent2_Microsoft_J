# Retained framework friction

## SVG port naming (resolved locally)

Severity: serious accessibility issue (Axe aria-prohibited-attr), eight port groups in the four-node workflow. Upstream graph.ts names SVG groups with aria-label but omits a role. Local adaptation adds role="group". Covered by the port-role assertion in tests/proofs.test.ts and desktop/phone Axe scans. No semantic or layout changes; no upstream checkout modified.

## Explanation helper closure (bounded adaptation)

The upstream svg/explanation.ts mixes panel rendering with dispatch and viewport helpers for every family. Importing it wholesale would require collection and lineage code unused by Milestone 1. Retained the panel verbatim and narrowed resolution to workflow; join supplies a resolved track directly and loop uses its native code focus. Tests cover all retained families. Future extraction can separate these helpers if another product needs them.

## Unannotated workflow geometry (resolved locally)

Screenshot review caught Source overlapping Transform in the legacy fallback layout even though all four DOM nodes existed. The retained workflow renderer previously selected the newer deterministic layout only when an explanation track was present. Local adaptation always uses its existing workflowGeometry contract, independent of explanation panels. No new layout engine or authored coordinates. Browser tests assert that all four node boxes are disjoint; unit tests assert stable transforms across the run.

## Consumer status copy (resolved locally)

Workflow renderer exposes `upstream_failed` and generic preset chrome. Local display labels use Blocked, Ready and Waiting, and the breadcrumb says Success dependencies. Semantic statuses stay unchanged. The blocked-label assertion protects this adaptation.
