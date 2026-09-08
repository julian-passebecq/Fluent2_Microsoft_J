# Milestone 2 end-of-run report

## Status

- Branch: codex/sql-visuals-m2
- Implementation commit: 591ba8be7089cd135bc6be708e9a90aeae9164be
- Task: INNER/LEFT JOIN comparison
- Result: PASS

## What changed

SQL joins now offers native LEFT/INNER radio controls at aligned steps. Switching pauses playback without resetting the frame. SQL text, output counts, represented customer counts and Bob's unmatched outcome update together.

## Upstream reuse

No new imports. Retained compileTableJoin and JoinRenderer are unchanged. The local FigurePlayer adaptation gains a playbackKey that pauses comparison changes. Provenance manifest updated.

## Evidence

Frozen install, strict typecheck through production build, 48-frame validation, 16 unit tests and 5 browser tests pass. Desktop 1440px and phone 390px, keyboard radio control/stepping/panning, reduced motion, zero serious/critical Axe issues and no page overflow pass. Exact commands and results: QA_REPORT.md.

## Visual proof

INNER's seven steps align with LEFT. Bob's unmatched step emits no row for INNER and a NULL-extended row for LEFT. Final result: INNER 3 rows / 2 customers; LEFT 4 rows / 3 customers. Existing matched pair/source DOM nodes retain identity across switching. Static captions and counts explain the outcome, with reflowed phone tables and local diagram scrolling.

## Problems found

Fixed a multiline query string syntax error detected by typecheck. No remaining blockers or new framework friction.

## Scope check

No out-of-scope product work, new renderer or runtime. Changes are committed locally.

## Next bounded task

Add a duplicate-key example to this comparison so one-to-many row multiplication is visible from both inputs. Complete when the retained join renderer shows the Cartesian matching pairs and content/identity/browser gates pass.
