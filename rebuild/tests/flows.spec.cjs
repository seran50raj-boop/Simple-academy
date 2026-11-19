const {test,expect} = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const capture=path.join(__dirname,'..','artifacts');
test.beforeEach(async({page})=>{await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload();});
test('14-point map, distinct question markers and gated learning',async({page})=>{
  await expect(page.getByRole('heading',{name:'Explore Andragogy'})).toBeVisible();
  await expect(page.locator('.stop')).toHaveCount(14);
  await expect(page.locator('.stop[disabled]')).toHaveCount(13);
  await expect(page.locator('.stop').filter({has:page.locator('.stop-kind', {hasText:'Question'})})).toHaveCount(6);
  await page.getByRole('button',{name:/Start learning/}).click();
  await expect(page.getByRole('heading',{name:'What is Andragogy?'})).toBeVisible();
  await expect(page.locator('.editorial-art')).toBeVisible();
  await expect(page.getByRole('button',{name:'Next →'})).toBeEnabled();
  await page.getByRole('button',{name:'Next →'}).click();
  await expect(page.getByRole('heading',{name:'Adults arrive as a blank slate.'})).toBeVisible();
  await expect(page.getByRole('button',{name:'Next →'})).toBeDisabled();
  await page.getByRole('button',{name:'Yes',exact:true}).click();
  await expect(page.getByRole('button',{name:'Next →'})).toBeDisabled();
  await page.getByRole('button',{name:'No',exact:true}).click();
  await expect(page.getByRole('button',{name:'Next →'})).toBeEnabled();
  await page.getByRole('button',{name:'Next →'}).click();
  await expect(page.getByRole('heading',{name:'Start with the adult learner.'})).toBeVisible();
  await page.getByRole('button',{name:'Course map'}).click();
  await expect(page.locator('.stop:not([disabled])')).toHaveCount(3);
  await page.locator('.stop').first().click();
  await expect(page.getByRole('heading',{name:'What is Andragogy?'})).toBeVisible();
  await page.getByRole('button',{name:'Next →'}).click();
  await expect(page.getByRole('button',{name:'Next →'})).toBeEnabled();
  await page.reload();
  await page.getByRole('button',{name:/Continue learning/}).click();
  await expect(page.getByRole('heading',{name:'Start with the adult learner.'})).toBeVisible();
});
test('mobile layout, reachable map and card-one replay',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator('.stop')).toHaveCount(14);
  await expect(page.locator('.stop').first()).toBeVisible();
  const mapOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(mapOverflow).toBe(false);
  await page.getByRole('button',{name:/Start learning/}).click();
  await expect(page.locator('.editorial-art')).toBeVisible();
  const cardOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(cardOverflow).toBe(false);
  await page.getByRole('button',{name:/Watch the pieces connect/}).click();
  await expect(page.locator('.hero-scene.replaying')).toBeVisible();
  fs.mkdirSync(capture,{recursive:true});
  await page.screenshot({path:path.join(capture,'card1-mobile.png'),fullPage:true});
});
test('all 14 vector artworks are distinct and parse as SVG',async({page})=>{
 const result=await page.evaluate(()=>{
  return cards.map((c,i)=>{
   const svg=artFor(c.art);const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
   return {i,ok:doc.documentElement.nodeName==='svg'&&!doc.querySelector('parsererror'),label:doc.documentElement.getAttribute('aria-label'),svg};
  });
 });
 expect(result).toHaveLength(14);
 expect(result.every(r=>r.ok&&r.label)).toBe(true);
 expect(new Set(result.map(r=>r.svg)).size).toBe(14);
});
