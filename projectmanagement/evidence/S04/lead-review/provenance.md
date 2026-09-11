# Lead provenance checks — 2026-09-08

Reviewed candidate `17aaee96e98a43b02160c415e289e9c9380d559e`; local HEAD `193043a` differs only in documentation/evidence. Verified `git diff --quiet 17aaee9 HEAD -- src tests playwright.config.ts package.json pnpm-lock.yaml` exits zero.

Direct read-only comparison of the original repository and `D:/PROJ/Fluent2_S04_QA_17aaee9` shows:

| File | Original SHA256 (LF) | Fresh-checkout SHA256 (CRLF) | Source after CRLF-to-LF normalization |
| --- | --- | --- | --- |
| tests/s04-independent.test.ts | C31799AFFCD32D50D49C506482B633968FA2DE8F8FC8BFFFD58079DA3FFBA626 | A2833FBC4E0A3266FF2127E4C48B993829C2B3343AC5852DC74B2E8855AE1565 | Identical |
| tests/browser/s04-independent.spec.ts | 89CE9C720099F669E268241343116DD37B2450419998E3FD8EBA2790D23C117C | 5F0BA2DFA3A161EE2DDA699FA6803EE4B52D5F06F8836C11F00888BA68E6C3A5 | Identical |

The historical QA reports' claim of equal raw test hashes is inaccurate. The original tests are semantically unchanged; their actual hashes in saved evidence are consistent with the files and different checkout line endings. JS/CSS hashes in the two saved hash reports are exactly equal. No files were normalized or changed by this comparison.

Lead regressions were added only in `tests/s04-lead-validation.test.ts`; original QA tests and production files remain untouched. First full unit run: 45 pass / 4 fail, 49 total, 10.41s. It includes all 44 pre-existing tests passing. A subsequent small improvement to the new positive copy test makes property reordering explicit; the final focused run is recorded separately. This is a test overlay in the shared checkout, not an immutable newly committed candidate.
