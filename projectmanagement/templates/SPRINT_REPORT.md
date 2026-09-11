# Sxx — development / QA / lead report

Role: ...  Date: ...  Verdict: ...  Next actor/action: ...

## Decision summary

State what the learner can now do, whether all required work is complete, and the most important remaining risk. For QA use READY_FOR_LEAD, RETURN_TO_DEVELOPMENT or LEAD_DECISION_REQUIRED. Only the lead can mark ACCEPTED.

## Candidate and scope

- Branch and base commit:
- Application candidate commit and test/evidence commit:
- Uncommitted paths included in review/testing (or none):
- Changed modules/contracts and why:
- Explicitly unreviewed/untested scope:

## Acceptance and evidence

| Criterion/test ID | PASS / FAIL / BLOCKED / NOT_RUN | Evidence |
| --- | --- | --- |
| ... | ... | Command, exit code, duration, tested revision, log/screenshot path |

Record the independent expected data used. State which screenshots were actually viewed and at which states/viewports. Record test isolation and clean-checkout limitations. Keep the packet concise; link detailed failure evidence instead of pasting full logs.

## Findings and repairs

| ID/severity | Expected versus actual, reproduction | Owner and status |
| --- | --- | --- |
| ... | ... | ... |

Retain original failures and distinguish successful diagnostic reruns from fixes. Identify any changed acceptance assumption or source/provenance adaptation. For lead review, state which logic and code paths were directly inspected and why the result is acceptable or needs repair.

## Resume / next handoff

Exact remaining work, blocked decision (if any), and one copy-paste prompt for the next role. Link the updated status/backlog/branch ledger. Do not infer deployment, merge, or release from test success.
