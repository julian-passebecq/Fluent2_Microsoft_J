import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const width of [1440,390]) test(`duplicate-key multiplication at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/');
  await page.getByRole('radio', { name: 'Unique keys', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Duplicate C1 key', exact: true })).toBeChecked();
  await expect(page.getByText('Two C1 records × two C1 orders = four pairs. A customer key is not a unique record ID here.')).toBeVisible();
  for(let i=0;i<6;i++) await page.getByRole('button',{ name: 'Step',exact:true }).click();
  await expect(page.locator('[data-role="result-row"]')).toHaveCount(6);
  await expect(page.locator('.join-count')).toContainText('6 output rows · 4 of 4 customer records represented');
  const original = await page.locator('[data-role="result-row"]').first().elementHandle();
  for(const mode of ['INNER JOIN','LEFT JOIN']) {
    await page.getByRole('radio',{ name:mode,exact:true }).check();
    await expect(page.locator('[data-role="result-row"]')).toHaveCount(mode === 'INNER JOIN' ? 5 : 6);
    expect(await original!.evaluate(node => node === document.querySelector('[data-role="result-row"]'))).toBe(true);
    const axe = await new AxeBuilder({page}).analyze();
    expect(axe.violations.filter(v => ['serious','critical'].includes(v.impact ?? ''))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.getByRole('button',{name:'Play',exact:true})).toBeDisabled();
  await page.screenshot({path:`test-results/${width}-duplicate-keys.png`,fullPage:true});
  await page.getByRole('radio',{name:'Unique keys',exact:true}).check();
  await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','6');
  await expect(page.locator('[data-role="result-row"]')).toHaveCount(4);
  expect(await original!.evaluate(node => node === document.querySelector('[data-role="result-row"]'))).toBe(true);
});
