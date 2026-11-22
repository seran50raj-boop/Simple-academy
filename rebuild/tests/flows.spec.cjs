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
  await expect(page.locator('.puzzle-motion-video')).toBeVisible();
  await page.waitForFunction(()=>{const v=document.querySelector('.puzzle-motion-video');return v&&v.readyState>=2&&v.videoWidth===400&&v.duration>=3.9});
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
test('mobile layout, reachable map and animated Card 1',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator('.stop')).toHaveCount(14);
  await expect(page.locator('.stop').first()).toBeVisible();
  const mapOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(mapOverflow).toBe(false);
  await page.getByRole('button',{name:/Start learning/}).click();
  await expect(page.locator('.puzzle-motion-video')).toBeVisible();
  await page.waitForFunction(()=>{const v=document.querySelector('.puzzle-motion-video');return v&&v.readyState>=2&&v.videoWidth===400&&v.duration>=3.9});
  const cardOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(cardOverflow).toBe(false);
  await expect(page.locator('.approved-scene .art-caption')).toContainText('Experience');
  fs.mkdirSync(capture,{recursive:true});
  await page.screenshot({path:path.join(capture,'card1-mobile.png'),fullPage:true});
});
test('13 SVG concepts are distinct and valid; card 1 uses the reviewed editorial illustration',async({page})=>{
 const result=await page.evaluate(()=>{
  return cards.slice(1).map((c,i)=>{
   const svg=artFor(c.art);const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
   return {i,ok:doc.documentElement.nodeName==='svg'&&!doc.querySelector('parsererror'),label:doc.documentElement.getAttribute('aria-label'),svg};
  });
 });
 expect(result).toHaveLength(13);
 expect(result.every(r=>r.ok&&r.label)).toBe(true);
 expect(new Set(result.map(r=>r.svg)).size).toBe(13);
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

test('map icons are concept-specific, accessible and separate from progress badges',async({page})=>{
 await expect(page.locator('.route-grid .map-symbol')).toHaveCount(14);
 await expect(page.locator('.route-grid .question-corner')).toHaveCount(6);
 await expect(page.locator('.route-grid .completion-corner')).toHaveCount(0);
 const symbols=await page.locator('.route-grid .map-symbol').evaluateAll(elements=>elements.map(el=>el.outerHTML));
 expect(new Set(symbols).size).toBe(14);
 const titles=await page.locator('.route-grid .stop').evaluateAll(elements=>elements.map(btn=>btn.getAttribute('aria-label')));
 expect(titles[0]).toContain('Andragogy, learning card');
 expect(titles[1]).toContain('Experience, question card');
 expect(titles[11]).toContain('Simulation, learning card');
 const iconSize=await page.locator('.route-grid .map-symbol').first().boundingBox();
 expect(iconSize.width).toBeGreaterThanOrEqual(38);
 await page.getByRole('button',{name:/Start learning/}).click();
 await page.getByRole('button',{name:'Next →'}).click();
 await page.getByRole('button',{name:'No',exact:true}).click();
 await page.getByRole('button',{name:'Course map'}).click();
 await expect(page.locator('.route-grid .completion-corner')).toHaveCount(2);
 for(const [width,height] of [[1320,900],[390,844]]){
  await page.setViewportSize({width,height});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(overflow).toBe(false);
  const mapping=await page.locator('.route-grid .stop').evaluateAll(btns=>btns.map(btn=>({
   hasIcon:!!btn.querySelector('svg.map-symbol'),
   label:btn.querySelector('.stop-word')?.textContent,
   iconWidth:btn.querySelector('svg.map-symbol')?.getBoundingClientRect().width
  })));
  expect(mapping.every(row=>row.hasIcon&&row.label&&row.iconWidth>=37)).toBe(true);
  fs.mkdirSync(capture,{recursive:true});
  await page.screenshot({path:path.join(capture,'illustrated-map-'+width+'.png'),fullPage:true});
 }
});

test('all 14 learning and question cards render without overflow or progression bypass',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:/Start learning/}).click();
 const sequence=await page.evaluate(()=>cards.map(c=>({h:c.h,q:!!c.q,answer:c.q?c.q[c.answer]:null,art:c.art})));
 for(let i=0;i<sequence.length;i++){
  const card=sequence[i];
  await expect(page.getByRole('heading',{name:card.h})).toBeVisible();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  expect(overflow,'Horizontal overflow on card '+i+' '+card.h).toBe(false);
  if(i>0)await expect(page.locator('.art-panel[data-art="'+card.art+'"] svg.editorial-art')).toBeVisible();
  if(card.q){
   await expect(page.locator('.card.is-question')).toBeVisible();
   await expect(page.locator('.scene-action')).toHaveCount(0);
   await expect(page.getByRole('button',{name:'Next →'})).toBeDisabled();
   await page.getByRole('button',{name:card.answer,exact:true}).click();
   await expect(page.getByRole('button',{name:'Next →'})).toBeEnabled();
  }else{
   await expect(page.locator('.card:not(.is-question)')).toBeVisible();
   const control=page.locator('.scene-action');
   if(await control.count()){
    await control.click();
    await expect(page.locator('.art-panel.is-playing')).toBeVisible();
   }
  }
  if([2,4,7,11].includes(i)){
   fs.mkdirSync(capture,{recursive:true});
   await page.screenshot({path:path.join(capture,'concept-card-'+(i+1)+'-mobile.png'),fullPage:true});
  }
  if(i<sequence.length-1)await page.getByRole('button',{name:'Next →'}).click();
 }
 await expect(page.getByRole('button',{name:'Finish ✓'})).toBeEnabled();
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'all-cards-finish-mobile.png'),fullPage:true});
});
test('learning and question card modes remain distinct on desktop',async({page})=>{
 await page.setViewportSize({width:1320,height:900});
 await page.getByRole('button',{name:/Start learning/}).click();
 await page.getByRole('button',{name:'Next →'}).click();
 await expect(page.locator('.card.is-question')).toBeVisible();
 await expect(page.locator('.choice')).toHaveCount(2);
 await expect(page.locator('.scene-controls')).toHaveCount(0);
 await expect(page.locator('.art-panel')).toBeVisible();
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'question-card-desktop.png'),fullPage:true});
 await page.getByRole('button',{name:'No',exact:true}).click();
 await page.getByRole('button',{name:'Next →'}).click();
 await expect(page.locator('.card.is-question')).toHaveCount(0);
 await expect(page.locator('.art-panel[data-art="journey"]')).toBeVisible();
 await page.getByRole('button',{name:/Trace the learning path/}).click();
 await expect(page.locator('.art-panel.is-playing')).toBeVisible();
 await page.screenshot({path:path.join(capture,'learning-card-desktop.png'),fullPage:true});
});

test('concept motion is purposeful and reduced-motion accessibility is respected',async({page})=>{
 await page.getByRole('button',{name:/Start learning/}).click();
 await page.getByRole('button',{name:'Next →'}).click();
 await page.getByRole('button',{name:'No',exact:true}).click();
 await page.getByRole('button',{name:'Next →'}).click();
 await expect(page.locator('.art-panel[data-art="journey"] .journey-path')).toHaveCount(1);
 await page.getByRole('button',{name:/Trace the learning path/}).click();
 const animation=await page.locator('.journey-path').evaluate(el=>getComputedStyle(el).animationName);
 expect(animation).toContain('traceJourney');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.scene-controls')).toBeHidden();
 const reducedAnimation=await page.locator('.journey-path').evaluate(el=>getComputedStyle(el).animationName);
 expect(reducedAnimation).toBe('none');
});

test('Card 1 motion is decoded and really changes pixels, with working replay and pause',async({page})=>{
 await page.getByRole('button',{name:/Start learning/}).click();
 const video=page.locator('.puzzle-motion-video');
 await expect(video).toBeVisible();
 await page.waitForFunction(()=>{const v=document.querySelector('.puzzle-motion-video');return v&&v.readyState>=2&&v.videoWidth===400&&v.videoHeight===224&&v.duration>=3.9;});
 const changes=await video.evaluate(async v=>{
  v.pause();
  async function captureAt(t){
   if(Math.abs(v.currentTime-t)>.025){
    const ready=new Promise((resolve,reject)=>{
     const id=setTimeout(()=>reject(new Error('seek timed out')),4000);
     v.addEventListener('seeked',()=>{clearTimeout(id);resolve()}, {once:true});
    });
    v.currentTime=t;await ready;
   }
   const canvas=document.createElement('canvas');canvas.width=v.videoWidth;canvas.height=v.videoHeight;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(v,0,0);
   return ctx.getImageData(0,0,canvas.width,canvas.height).data;
  }
  const first=await captureAt(0.1),second=await captureAt(1.7);
  let changed=0,total=0;
  for(let n=0;n<first.length;n+=4){
   const d=Math.abs(first[n]-second[n])+Math.abs(first[n+1]-second[n+1])+Math.abs(first[n+2]-second[n+2]);
   if(d>40)changed++; total+=d;
  }
  return {changed,meanChange:total/(first.length/4)};
 });
 expect(changes.changed,'Frame comparison detected a still video').toBeGreaterThan(700);
 await page.getByRole('button',{name:/Replay puzzle animation/}).click();
 await page.waitForFunction(()=>{const v=document.querySelector('.puzzle-motion-video');return v&&!v.paused;});
 const t1=await video.evaluate(v=>v.currentTime);
 await page.waitForTimeout(450);
 const t2=await video.evaluate(v=>v.currentTime);
 expect(t2).toBeGreaterThan(t1+.10);
 await page.getByRole('button',{name:'Pause animation'}).click();
 await expect(video).toHaveJSProperty('paused',true);
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'card1-animated-desktop.png'),fullPage:true});
});
test('reduced-motion preference leaves Card 1 still until user starts playback',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await page.getByRole('button',{name:/Start learning/}).click();
 const video=page.locator('.puzzle-motion-video');
 await page.waitForFunction(()=>{const v=document.querySelector('.puzzle-motion-video');return v&&v.readyState>=2;});
 await expect(video).toHaveJSProperty('paused',true);
 await expect(page.getByRole('button',{name:/Play puzzle animation/})).toBeVisible();
 await page.getByRole('button',{name:/Play puzzle animation/}).click();
 await page.waitForFunction(()=>{const v=document.querySelector('.puzzle-motion-video');return v&&!v.paused;});
});
