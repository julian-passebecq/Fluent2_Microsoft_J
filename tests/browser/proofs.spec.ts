import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 390]) {
  test(`three primary flows, identity, keyboard, Axe and overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to concept' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#lesson')).toBeFocused();
    for (const [name, steps, family] of [['SQL joins',7,'table.join'],['Bubble sort',26,'algorithm.loop'],['Retry & blocked downstream',8,'workflow.topology']] as const) {
      await page.getByRole('button', { name, exact: true }).click();
      await expect(page.locator(`[data-conceptmotion-host="${family}"] svg`)).toBeVisible();
      await expect(page.locator('[data-renderer-error]')).toHaveCount(0);
      const initial = await new AxeBuilder({ page }).analyze();
      expect(initial.violations.filter(v => ['serious','critical'].includes(v.impact ?? ''))).toEqual([]);
      await page.getByRole('button', { name: 'Step', exact: true }).focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','1');
      if (family === 'algorithm.loop') {
        const before = await page.locator('[data-item-id="value-0"]').elementHandle();
        await page.getByRole('button', { name: 'Step', exact: true }).click();
        expect(await before!.evaluate(node => node === document.querySelector('[data-item-id="value-0"]'))).toBe(true);
        await page.setViewportSize({ width: width === 390 ? 430 : 1280, height: 1000 });
        await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','2');
        await page.setViewportSize({ width, height: 1000 });
      }
      // Walk the complete authored trace, regardless of how many swaps it contains.
      let guard = 0;
      while (await page.getByRole('button', { name: 'Step', exact: true }).isEnabled()) {
        await page.getByRole('button', { name: 'Step', exact: true }).click();
        if (++guard > 50) throw new Error(`Unbounded trace: ${steps}`);
      }
      if (family === 'table.join') {
        await expect(page.locator('[data-role="result-row"]')).toHaveCount(4);
        await expect(page.getByRole('cell', { name: 'NULL', exact: true })).toBeVisible();
      }
      if (family === 'workflow.topology') {
        await expect(page.locator('[data-node-id="Publish"]')).toHaveAttribute('data-status','success');
        const boxes = await page.locator('[data-role="node"] > [data-role="background"]').evaluateAll(nodes => nodes.map(node => {
          const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        }));
        expect(boxes).toHaveLength(4);
        for (let i=0; i<boxes.length; i++) for (let j=i+1; j<boxes.length; j++) {
          const a=boxes[i], b=boxes[j];
          expect(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top).toBe(true);
        }
      }
      if (family === 'algorithm.loop') await expect(page.locator('[data-role="item"][data-state="done"]')).toHaveCount(5);
      if (width === 390) {
        const region = page.getByRole('region', { name: 'Scrollable concept diagram' });
        await region.focus();
        await page.keyboard.press('ArrowRight');
        await expect.poll(() => region.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
        await region.evaluate(node => { node.scrollLeft = 0; });
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const axe = await new AxeBuilder({ page }).analyze();
      expect(axe.violations.filter(v => ['serious','critical'].includes(v.impact ?? ''))).toEqual([]);
      await page.screenshot({ path: `test-results/${width}-${family}.png`, fullPage: true });
      await page.getByRole('button', { name: 'Reset', exact: true }).click();
      await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','0');
      await page.getByRole('button', { name: 'Play', exact: true }).click();
      await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','1', { timeout: 4000 });
      await page.getByRole('button', { name: 'Pause', exact: true }).click();
    }
    expect(errors).toEqual([]);
  });
}
test('reduced motion and navigation cancel playback', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await page.getByRole('button', { name: 'Bubble sort', exact: true }).click();
  await page.waitForTimeout(1500);
  await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','0');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('button', { name: 'Play', exact: true })).toBeDisabled();
  for (const name of ['SQL joins','Bubble sort','Retry & blocked downstream']) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.getByRole('button', { name: 'Play', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Step', exact: true }).click();
    await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','1');
    expect(await page.locator('svg g').evaluateAll(nodes => nodes.every(n => getComputedStyle(n).transitionDuration === '0s'))).toBe(true);
  }
});
