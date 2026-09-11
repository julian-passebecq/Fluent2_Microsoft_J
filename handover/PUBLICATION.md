# Verified publication — 2026-09-11

Atomic push succeeded for all four feature branches and the new handover branch. A subsequent `git ls-remote --heads origin` confirmed:

| Remote branch | Verified commit |
| --- | --- |
| codex/bootstrap-m1 | c6f9fa238c04928ed8343c0701957da08ce6459e |
| codex/sql-visuals-m2 | 90311f93bab82f2e8652ac3ff0bcddc20440c3e0 |
| codex/join-cardinality-m3 | 42886919fa2b574a499b249989eb9da0f649173d |
| codex/s04-group-by-foundation | 8eb105354d9e0474ea6bac719f3ed557c81250d8 |
| codex/pro-ai-handover-2026-09-11 | 2530481ade73ec16dd4d84a7003a9073ee3e71be (preservation commit; this publication note is its successor) |
| main | bd5908ff9c00098ad53df335871a5b8530df28d2 (unchanged) |

The preservation commit includes 122 changed/added files: formerly local management/QA material, five recovered historical draft blobs, handover documentation and entry-point notices. All prior feature history is reachable from it. No source, test or lockfile differences from `8eb1053` were introduced by closeout.

Checked handover Markdown links and recovered blob hashes: passed. Main checkout was clean after the preservation commit. QA worktree leftovers remain local duplicates of preserved files. No manual push of identified project work is required. Generated dependencies/build output and private Codex transcripts remain excluded as described in REPOSITORY_AUDIT.md.

No application test gate was rerun, no sprint accepted, no main merge and no deployment performed. Latest test results and unfinished acceptance are in README.md.
