# Milestone 1 visual reuse

Milestone 3 extends the same join family with duplicate C1 customer records: two left records × two right orders = four matching pairs, six total LEFT rows or five INNER rows. Seven aligned steps per variant; 62 total validated frames across six variants. Customer-record counts are explicitly distinguished from distinct customers. No additional renderer or dependency.

| Concept | Retained family/core | Semantic trace | Identity and motion | Static/phone explanation |
| --- | --- | --- | --- | --- |
| LEFT JOIN | JoinRenderer / compileTableJoin | 7 steps: select, match, emit, unmatched NULL, final four rows | Source rows persist; emitted pair IDs identify both contributors; revealed rows move from contributor position | Solid customer/dashed order links, explicit NULL badge, full HTML tables with headers; tables reflow |
| Bubble sort | LoopRenderer / compileLoopFrame | 26 steps covering every adjacent comparison and swap/no-swap across four passes | Five item IDs persist as slot order changes; keyed SVG groups move; sorted suffix is dashed | Operation, values, active pseudocode and caption visible while paused; local scroll retains text size |
| Retry DAG | WorkflowRenderer / compileWorkflowRunFrame | 8 steps including failed Quality, blocked Publish, attempt 2, runnable and successful Publish | Fixed topology and keyed task groups; statuses and attempts change independently of geometry | Glyph plus status text and HTML summary; reduced motion allows manual states; local scroll |

One shared FigurePlayer owns playback for all three. Rendering does not execute SQL, algorithms or workflows on a server. Bubble-sort fixture generation is deterministic local content authoring.

## Milestone 2 — aligned join comparison

INNER JOIN adds seven aligned semantic frames to the existing SQL concept, bringing validation to 48 frames across four variants. No renderer or core changes. Switching LEFT/INNER preserves the current step and existing matched pair DOM nodes; only the unmatched NULL row is removed/reinserted. Native radio controls support keyboard comparison. Visible row/customer counts, query text and Bob's outcome update together. Desktop and phone screenshots are in docs/qa/m2/.
