# Milestone 1 visual reuse

| Concept | Retained family/core | Semantic trace | Identity and motion | Static/phone explanation |
| --- | --- | --- | --- | --- |
| LEFT JOIN | JoinRenderer / compileTableJoin | 7 steps: select, match, emit, unmatched NULL, final four rows | Source rows persist; emitted pair IDs identify both contributors; revealed rows move from contributor position | Solid customer/dashed order links, explicit NULL badge, full HTML tables with headers; tables reflow |
| Bubble sort | LoopRenderer / compileLoopFrame | 26 steps covering every adjacent comparison and swap/no-swap across four passes | Five item IDs persist as slot order changes; keyed SVG groups move; sorted suffix is dashed | Operation, values, active pseudocode and caption visible while paused; local scroll retains text size |
| Retry DAG | WorkflowRenderer / compileWorkflowRunFrame | 8 steps including failed Quality, blocked Publish, attempt 2, runnable and successful Publish | Fixed topology and keyed task groups; statuses and attempts change independently of geometry | Glyph plus status text and HTML summary; reduced motion allows manual states; local scroll |

One shared FigurePlayer owns playback for all three. Rendering does not execute SQL, algorithms or workflows on a server. Bubble-sort fixture generation is deterministic local content authoring.
