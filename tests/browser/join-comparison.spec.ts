import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 390]) test(`LEFT and INNER comparison at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/');
  for (let i=0;i<4;i++) await page.getByRole('button', { name: 'Step', exact: true }).click();
  await expect(page.locator('.join-count')).toContainText('Bob preserved with NULL');
  await expect(page.locator('[data-role="result-row"]')).toHaveCount(3);
  const source = await page.locator('[data-role="source-row"][data-row-id="C2"]').elementHandle();
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await page.getByRole('radio', { name: 'LEFT JOIN', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'INNER JOIN', exact: true })).toBeChecked();
  await expect(page.getByRole('button', { name: 'Play', exact: true })).toBeEnabled();
  await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','4');
  await expect(page.locator('.join-count')).toContainText('Bob excluded');
  await expect(page.locator('[data-role="result-row"]')).toHaveCount(2);
  expect(await source!.evaluate(node => node === document.querySelector('[data-role="source-row"][data-row-id="C2"]'))).toBe(true);
  await page.getByRole('button', { name: 'Step', exact: true }).click();
  await page.getByRole('button', { name: 'Step', exact: true }).click();
  await expect(page.locator('.join-count')).toContainText('3 output rows · 2 of 3 customers represented');
  await expect(page.locator('[data-null-extended="true"]')).toHaveCount(0);
  const row = await page.locator('[data-role="result-row"]').first().elementHandle();
  for (const mode of ['LEFT JOIN','INNER JOIN']) {
    await page.getByRole('radio', { name: mode, exact: true }).check();
    await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','6');
    expect(await row!.evaluate(node => node === document.querySelector('[data-role="result-row"]'))).toBe(true);
    const axe = await new AxeBuilder({ page }).analyze();
    expect(axe.violations.filter(v => ['serious','critical'].includes(v.impact ?? ''))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('button', { name: 'Play', exact: true })).toBeDisabled();
  await page.screenshot({ path: `test-results/${width}-inner-join.png`, fullPage: true });
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','0');
  await expect(page.getByRole('radio', { name: 'INNER JOIN', exact: true })).toBeChecked();
});
