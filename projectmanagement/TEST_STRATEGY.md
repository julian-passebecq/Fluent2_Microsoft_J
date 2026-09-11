# Test strategy and S04 QA instructions

Quality is correctness plus an understandable static/mobile experience. Counts of tests and screenshots are supporting evidence, not acceptance criteria. The light role owns independent verification and reporting; the medium role must still validate its changes during development.

## Environment and provenance first

Run from the repository root. Record `git branch --show-current`, `git rev-parse HEAD`, `git status --short`, Node/pnpm versions and the application/test diff. Windows default Node was 21.7.1 at baseline; the repository requires >=22.12. The verified runtime was 24.19.0, pnpm 11.19.0:

```powershell
$env:PATH = 'C:\Users\julia\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm run check
```

Use a compatible installed runtime if that machine-specific path is absent. Do not change dependencies, engine requirements or the lockfile to get around an environment failure. A PowerShell profile emitted broken Conda errors during the lead audit; launching PowerShell without the profile avoided that unrelated issue.

`pnpm check` includes typecheck, validation, unit tests, production build and Playwright. Install Chromium with `pnpm exec playwright install chromium` only when missing. Use the current built artifact and a preview server owned by this run. Never silently reuse an unidentified listener or kill another user's server. If a port is occupied, use an isolated configured port or report it. The baseline audit config under `audits/` demonstrates isolation, but S04 must fix the normal test workflow.

Light should perform the frozen install/full gate in an isolated checkout/worktree of the candidate when practical, with the final proposed tests included. If only the shared working directory is available, report that limitation; do not call it a clean-checkout check. No branch deletion, reset, stash of user changes, or merge is needed for QA.

## Required coverage matrix

| Test ID | Risk and independent expected behavior | Best level |
| --- | --- | --- |
| G01 | Exact six-record fixture: groups C1=2/2/100, C2=1/1/25, C3=3/3/30; six contributors, three groups, total 155 | Pure unit |
| G02 | NULL variant C3=3/0/null; all members retained, known total 125, no fabricated zero | Pure unit + browser summary |
| G03 | Empty input gives zero groups; singleton; repeated values; negative and zero amounts | Pure unit |
| G04 | NULL key versus literal string null; number 1 versus string 1; delimiter/quote-containing keys; no identity collisions | Pure unit |
| G05 | Shuffled source order preserves membership, values and group IDs; only allowed display/member order changes; inputs remain unchanged/frozen | Pure unit |
| G06 | Duplicate row IDs, missing cells, unknown columns, duplicate/colliding output IDs, NaN/Infinity, nonnumeric SUM and overflowing result rejected | Pure unit |
| G07 | All seven frames in both variants: assigned membership, pending aggregates, exact contributors, valid references, final reconciliation | Content validation + unit |
| L01 | Registry covers all lessons/variants, unique nonempty IDs/steps, aligned comparison steps; corrupted references/empty trace fail | Unit + validate |
| W01 | Premature Publish queued/running/success rejected by lesson assertion; same-frame prerequisite success is accepted; blocked retry and retained upstream success | Unit |
| P01 | Play/pause/reset/previous/end/replay, seek during playback, unmount, concept navigation, no pending timer | Fake-timer component |
| P02 | Aligned switch preserves named step and pauses after more than two timer periods; unaligned switch resets; shrinking/empty trace never calls child with invalid index | Component |
| P03 | Reduced motion initially enabled and changed live: stop playback, manual stepping works, no transitions | Component + browser |
| H01 | Renderer mount/update error: explicit visible error and meaningful summary; valid update recovers an update failure, remount recovers a mount failure; destroy on unmount | Host component with fake renderer |
| R01 | Same semantic source/group SVG nodes survive steps and variant changes; deterministic render/freeze; destroy clears owned elements | Renderer unit |
| B01 | All four concepts, baseline/final and key intermediate states at 1440x1000 and 390x1000; no renderer errors or uncaught page errors | Production Playwright |
| B02 | Both grouping variants: HTML and SVG agree on results, membership and counts; no misleading NULL/zero copy | Production Playwright + visual review |
| B03 | Keyboard skip link, concept navigation, radios with arrows, player controls, focus visibility, local diagram pan, no trap | Browser + manual inspection |
| B04 | Page scrollWidth <= viewport width; resizing preserves state; phone tables remain legible and local scrolling retains all content | Browser + screenshots |
| B05 | Axe zero serious/critical issues on initial/final states and grouping NULL result at both sizes; useful names, headings and table headers | Axe + inspection |
| B06 | Legacy LEFT/INNER x unique/duplicate final pair sets/counts, Bob outcome and aligned controls remain correct | Existing/extended regression tests |

The oracle for G01/G02 is the table in S04, not the production compiler. Use small hand-built additional fixtures for edge cases. Do not use snapshots of production output as the only correctness check. Do not require an arbitrary line-coverage percentage or write tests that only repeat implementation internals.

## Browser evidence

Capture and inspect GROUP BY at desktop/phone for `group-c3` and final output in both variants, plus representative legacy states after the shell refactor. Check clipping, line crossings that obscure membership, legible labels, meaningful pending state, full contributor access, caption/query/result agreement and focus visibility. Save selected stable evidence under `projectmanagement/evidence/S04/` or `docs/qa/s04/`, with revision and state in the QA report. Generated files alone are not visual review.

Axe does not prove screen-reader usability. Confirm the HTML summary contains the actual current order/active state for sort and the group membership/values for grouping. If assistive technology is not available, state that the review is structural/keyboard, not a full screen-reader certification.

Split long flows by concept and viewport while retaining assertions and a small navigation test. Avoid every possible Cartesian combination when a unit invariant already covers it; cover risky switching and rendered intermediate states explicitly. Do not turn flaky behavior into a pass with retries, force-clicks, disabled assertions or global sleep inflation.

## Failure handling and final packet

Preserve the first failure's command, code, revision, expected/actual result and trace/context. Classify product defect, test defect, environmental blocker or unresolved timing issue. A retry is diagnostic; record both outcomes. Run a focused regression after a fix, then affected gates. A production change after the gate requires retesting its affected surface; documentation-only changes can be recorded as such.

Write `reports/S04-qa.md` with the template, including PASS/FAIL/BLOCKED/NOT_RUN per required test ID, exact commands and durations, clean/dirty provenance, screenshots actually viewed, defects and residual limits. Maintain the branch/test ledger and backlog. If a test is missing, mark NOT_RUN rather than inferring PASS from a related test. Recommend lead review only when all blocking checks are resolved; the lead makes the acceptance decision.
