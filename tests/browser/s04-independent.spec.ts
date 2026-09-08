import { expect, test } from '@playwright/test';

for (const width of [1440,390]) {
  test(`S04 independent keyboard and static states ${width}`, async ({page}) => {
    await page.setViewportSize({width,height:1000});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link',{name:'Skip to concept'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button',{name:'GROUP BY',exact:true})).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('radio',{name:'All amounts known'})).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('radio',{name:'C3 amounts NULL'})).toBeChecked();
    await page.screenshot({path:`test-results/qa-${width}-group-radio-focus.png`,fullPage:true});
    await page.keyboard.press('Tab');
    const step=page.getByRole('button',{name:'Step',exact:true});
    await expect(step).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('.figure-player')).toHaveAttribute('data-frame-index','1');
    await page.screenshot({path:`test-results/qa-${width}-group-pending-focus.png`,fullPage:true});
    for(let i=0;i<3;i++)await page.keyboard.press('Enter');
    for(const [key,members,counts,sum] of [['C1','O1, O2',['2','2'],'100'],['C2','O3',['1','1'],'25'],['C3','O4, O5, O6',['3','0'],'NULL']] as const){
      const table=page.getByRole('table',{name:`Customer ${key} · complete`,exact:true});
      await expect(table.getByRole('cell')).toHaveText([members,...counts,sum]);
      const group=page.locator('[data-role="aggregate-group"]').filter({has:page.locator('[data-role="key"]',{hasText:`Customer ${key}`})});
      await expect(group.locator('[data-role="counts"]')).toHaveText(`COUNT(*) ${counts[0]} · COUNT(amount) ${counts[1]}`);
      await expect(group.locator('[data-role="sum"]')).toHaveText(`SUM(amount): ${sum}`);
      await expect(group.locator('[data-role="members"]')).toHaveText(`Members: ${members}`);
    }
    const region=page.getByRole('region',{name:'Scrollable concept diagram'});
    await region.focus();
    if(width===390){await page.keyboard.press('ArrowRight');await expect.poll(()=>region.evaluate(n=>n.scrollLeft)).toBeGreaterThan(0);}
    await page.screenshot({path:`test-results/qa-${width}-group-pan-focus.png`,fullPage:true});
    await page.keyboard.press('Tab');
    await expect(region).not.toBeFocused();
    for(const [name,slug,steps] of [['SQL joins','join',4],['Bubble sort','sort',2],['Retry & blocked downstream','retry',4]] as const){
      await page.getByRole('button',{name,exact:true}).click();
      await page.screenshot({path:`test-results/qa-${width}-${slug}-initial.png`,fullPage:true});
      for(let i=0;i<steps;i++)await step.click();
      if(slug==='sort')await expect(page.getByRole('region',{name:'Current sorting state'})).toContainText('Current order: 1, 5, 4, 2, 3');
      if(slug==='retry')await expect(page.locator('.task-states')).toContainText('attempt 2');
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await page.screenshot({path:`test-results/qa-${width}-${slug}-intermediate.png`,fullPage:true});
    }
  });
}
