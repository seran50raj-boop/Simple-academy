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
  await expect(page.locator('.approved-hero-img')).toBeVisible();
  expect(await page.locator('.approved-hero-img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
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
  await expect(page.locator('.approved-hero-img')).toBeVisible();
  expect(await page.locator('.approved-hero-img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  const cardOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(cardOverflow).toBe(false);
  await expect(page.locator('.approved-scene .art-caption')).toContainText('Experience');
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

test('route passes exactly through every marker centre on desktop and mobile',async({page})=>{
 for(const [width,height] of [[1320,900],[390,844]]){
  await page.setViewportSize({width,height});
  await page.reload();
  const distances=await page.evaluate(()=>{
   const mobile=matchMedia('(max-width:740px)').matches;
   const cls=mobile?'.aligned-route-mobile':'.aligned-route-desktop';
   const path=document.querySelector(cls);
   const svg=path.ownerSVGElement;
   const svgBox=svg.getBoundingClientRect();
   const coords=cards.map((_,i)=>{
    const row=Math.floor(i/(mobile?2:4));
    const col=mobile?(row%2?1-i%2:i%2):(row%2?3-i%4:i%4);
    return mobile?{x:col?76:24,y:6.8+row*14.4}:{x:12+col*(76/3),y:10+row*25};
   });
   return [...document.querySelectorAll('.stop-marker')].map((marker,i)=>{
    const rect=marker.getBoundingClientRect(),point=coords[i];
    const expectedX=svgBox.left+point.x/100*svgBox.width;
    const expectedY=svgBox.top+point.y/100*svgBox.height;
    const actualX=rect.left+rect.width/2,actualY=rect.top+rect.height/2;
    return Math.hypot(actualX-expectedX,actualY-expectedY);
   });
  });
  expect(Math.max(...distances),'Route/marker mismatch at '+width+'px').toBeLessThan(1.5);
  fs.mkdirSync(capture,{recursive:true});
  await page.screenshot({path:path.join(capture,'map-'+width+'.png'),fullPage:true});
 }
});
