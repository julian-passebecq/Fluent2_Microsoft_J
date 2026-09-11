# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: proofs.spec.ts >> three primary flows, identity, keyboard, Axe and overflow at 1440px
- Location: tests\browser\proofs.spec.ts:5:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('.figure-player')
Expected: "1"
Received: ""

Call log:
  - Expect "toHaveAttribute" locator('.figure-player') with timeout 4000ms
  - waiting for locator('.figure-player')
  - Protocol error (Runtime.callFunctionOn): Internal server error, session closed.

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to concept" [ref=e4] [cursor=pointer]:
    - /url: "#lesson"
  - main [ref=e5]:
    - generic [ref=e6]:
      - paragraph [ref=e7]: DATAPASS / VISUAL IT CONCEPTS
      - heading "See the logic." [level=1] [ref=e8]
      - paragraph [ref=e9]: Small examples. Visible state. Understand what changes—and why.
    - navigation "Choose a concept" [ref=e10]:
      - button "SQL joins" [ref=e11]
      - button "Bubble sort" [ref=e12]
      - button "Retry & blocked downstream" [pressed] [ref=e13]
    - article [ref=e14]:
      - generic [ref=e15]:
        - paragraph [ref=e16]: PIPELINES & RELIABILITY
        - heading "Retry & blocked downstream" [level=2] [ref=e17]
        - paragraph [ref=e18]: Why can’t publishing continue after a failed check?
        - paragraph [ref=e19]: Follow a quality check through failure and retry. Dependencies stay in place while task states change.
      - generic [ref=e20]:
        - generic "Visual playback" [ref=e21]:
          - button "Pause" [active] [ref=e22] [cursor=pointer]
          - button "Previous" [disabled] [ref=e23]
          - button "Step" [ref=e24]
          - button "Reset" [ref=e25]
          - generic [ref=e26]: Step 1 of 8
        - paragraph [ref=e27]: Source succeeds. Transform can now run; later tasks are still waiting.
        - region "Scrollable concept diagram" [ref=e28]:
          - generic [ref=e30]:
            - img "Retry a failed quality check Dependencies stay fixed; task status changes" [ref=e31]:
              - generic [ref=e32]:
                - generic [ref=e33]:
                  - generic [ref=e34]: Retry a failed quality check
                  - generic [ref=e35]: Dependencies stay fixed; task status changes
                - generic [ref=e36]:
                  - generic [ref=e37]:
                    - group "success edge from Source to Transform" [ref=e38]:
                      - generic [ref=e39]: ✓ success
                    - group "success edge from Transform to Quality" [ref=e40]:
                      - generic [ref=e41]: ✓ success
                    - group "success edge from Quality to Publish" [ref=e42]:
                      - generic [ref=e43]: ✓ success
                  - generic [ref=e44]: ✓
                  - generic [ref=e48]:
                    - group "Source, task, status success" [ref=e49]:
                      - generic [ref=e51]: □
                      - generic [ref=e52]: Source
                      - generic [ref=e53]: TASK
                      - generic [ref=e54]: ✓ SUCCESS
                      - group "in port" [ref=e55]
                      - group "out port" [ref=e57]
                    - group "Transform, task, status queued" [ref=e59]:
                      - generic [ref=e61]: □
                      - generic [ref=e62]: Transform
                      - generic [ref=e63]: TASK
                      - generic [ref=e64]: ◷ READY
                      - group "in port" [ref=e65]
                      - group "out port" [ref=e67]
                    - group "Quality, task, status pending" [ref=e69]:
                      - generic [ref=e71]: □
                      - generic [ref=e72]: Quality
                      - generic [ref=e73]: TASK
                      - generic [ref=e74]: ○ WAITING
                      - group "in port" [ref=e75]
                      - group "out port" [ref=e77]
                    - group "Publish, task, status pending" [ref=e79]:
                      - generic [ref=e81]: □
                      - generic [ref=e82]: Publish
                      - generic [ref=e83]: TASK
                      - generic [ref=e84]: ○ WAITING
                      - group "in port" [ref=e85]
                      - group "out port" [ref=e87]
                - generic [ref=e89]: Success dependencies
            - note [ref=e90]: Source succeeds. Transform can now run; later tasks are still waiting.
        - list [ref=e91]:
          - listitem [ref=e92]:
            - text: Source
            - generic [ref=e93]: success
          - listitem [ref=e94]:
            - text: Transform
            - generic [ref=e95]: Ready to run
          - listitem [ref=e96]:
            - text: Quality
            - generic [ref=e97]: Waiting for prerequisite
          - listitem [ref=e98]:
            - text: Publish
            - generic [ref=e99]: Waiting for prerequisite
      - complementary [ref=e100]:
        - heading "What to remember" [level=3] [ref=e101]
        - paragraph [ref=e102]: Retry the failed task. Release downstream work only when its prerequisite succeeds; successful upstream tasks keep their state.
    - generic [ref=e103]: Explore at your pace. Every step works as a still picture.
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | for (const width of [1440, 390]) {
  5  |   test(`three primary flows, identity, keyboard, Axe and overflow at ${width}px`, async ({ page }) => {
  6  |     await page.setViewportSize({ width, height: 1000 });
  7  |     const errors: string[] = [];
  8  |     page.on('pageerror', error => errors.push(error.message));
  9  |     await page.goto('/');
  10 |     await page.keyboard.press('Tab');
  11 |     await expect(page.getByRole('link', { name: 'Skip to concept' })).toBeFocused();
  12 |     await page.keyboard.press('Enter');
  13 |     await expect(page.locator('#lesson')).toBeFocused();
  14 |     for (const [name, steps, family] of [['SQL joins',7,'table.join'],['Bubble sort',26,'algorithm.loop'],['Retry & blocked downstream',8,'workflow.topology']] as const) {
  15 |       await page.getByRole('button', { name, exact: true }).click();
  16 |       await expect(page.locator(`[data-conceptmotion-host="${family}"] svg`)).toBeVisible();
  17 |       await expect(page.locator('[data-renderer-error]')).toHaveCount(0);
  18 |       const initial = await new AxeBuilder({ page }).analyze();
  19 |       expect(initial.violations.filter(v => ['serious','critical'].includes(v.impact ?? ''))).toEqual([]);
  20 |       await page.getByRole('button', { name: 'Step', exact: true }).focus();
  21 |       await page.keyboard.press('Enter');
  22 |       await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','1');
  23 |       if (family === 'algorithm.loop') {
  24 |         const before = await page.locator('[data-item-id="value-0"]').elementHandle();
  25 |         await page.getByRole('button', { name: 'Step', exact: true }).click();
  26 |         expect(await before!.evaluate(node => node === document.querySelector('[data-item-id="value-0"]'))).toBe(true);
  27 |         await page.setViewportSize({ width: width === 390 ? 430 : 1280, height: 1000 });
  28 |         await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','2');
  29 |         await page.setViewportSize({ width, height: 1000 });
  30 |       }
  31 |       // Walk the complete authored trace, regardless of how many swaps it contains.
  32 |       let guard = 0;
  33 |       while (await page.getByRole('button', { name: 'Step', exact: true }).isEnabled()) {
  34 |         await page.getByRole('button', { name: 'Step', exact: true }).click();
  35 |         if (++guard > 50) throw new Error(`Unbounded trace: ${steps}`);
  36 |       }
  37 |       if (family === 'table.join') {
  38 |         await expect(page.locator('[data-role="result-row"]')).toHaveCount(4);
  39 |         await expect(page.getByRole('cell', { name: 'NULL', exact: true })).toBeVisible();
  40 |       }
  41 |       if (family === 'workflow.topology') {
  42 |         await expect(page.locator('[data-node-id="Publish"]')).toHaveAttribute('data-status','success');
  43 |         const boxes = await page.locator('[data-role="node"] > [data-role="background"]').evaluateAll(nodes => nodes.map(node => {
  44 |           const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  45 |         }));
  46 |         expect(boxes).toHaveLength(4);
  47 |         for (let i=0; i<boxes.length; i++) for (let j=i+1; j<boxes.length; j++) {
  48 |           const a=boxes[i], b=boxes[j];
  49 |           expect(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top).toBe(true);
  50 |         }
  51 |       }
  52 |       if (family === 'algorithm.loop') await expect(page.locator('[data-role="item"][data-state="done"]')).toHaveCount(5);
  53 |       if (width === 390) {
  54 |         const region = page.getByRole('region', { name: 'Scrollable concept diagram' });
  55 |         await region.focus();
  56 |         await page.keyboard.press('ArrowRight');
  57 |         await expect.poll(() => region.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
  58 |         await region.evaluate(node => { node.scrollLeft = 0; });
  59 |       }
  60 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  61 |       const axe = await new AxeBuilder({ page }).analyze();
  62 |       expect(axe.violations.filter(v => ['serious','critical'].includes(v.impact ?? ''))).toEqual([]);
  63 |       await page.screenshot({ path: `test-results/${width}-${family}.png`, fullPage: true });
  64 |       await page.getByRole('button', { name: 'Reset', exact: true }).click();
  65 |       await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','0');
  66 |       await page.getByRole('button', { name: 'Play', exact: true }).click();
> 67 |       await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','1', { timeout: 4000 });
     |                                                    ^ Error: expect(locator).toHaveAttribute(expected) failed
  68 |       await page.getByRole('button', { name: 'Pause', exact: true }).click();
  69 |     }
  70 |     expect(errors).toEqual([]);
  71 |   });
  72 | }
  73 | test('reduced motion and navigation cancel playback', async ({ page }) => {
  74 |   await page.goto('/');
  75 |   await page.getByRole('button', { name: 'Play', exact: true }).click();
  76 |   await page.getByRole('button', { name: 'Bubble sort', exact: true }).click();
  77 |   await page.waitForTimeout(1500);
  78 |   await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','0');
  79 |   await page.getByRole('button', { name: 'Play', exact: true }).click();
  80 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  81 |   await expect(page.getByRole('button', { name: 'Play', exact: true })).toBeDisabled();
  82 |   for (const name of ['SQL joins','Bubble sort','Retry & blocked downstream']) {
  83 |     await page.getByRole('button', { name, exact: true }).click();
  84 |     await expect(page.getByRole('button', { name: 'Play', exact: true })).toBeDisabled();
  85 |     await page.getByRole('button', { name: 'Step', exact: true }).click();
  86 |     await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','1');
  87 |     expect(await page.locator('svg g').evaluateAll(nodes => nodes.every(n => getComputedStyle(n).transitionDuration === '0s'))).toBe(true);
  88 |   }
  89 | });
  90 | 
```