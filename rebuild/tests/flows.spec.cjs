const {test,expect} = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const capture=path.join(__dirname,'..','artifacts');
test.beforeEach(async({page})=>{
 await page.goto('/');
 await page.evaluate(()=>localStorage.clear());
 await page.reload();
 await expect(page.getByRole('heading',{name:/Small lessons/})).toBeVisible();
 await page.locator('#welcome-start').click();
 await expect(page.getByRole('button',{name:/I agree · View/})).toBeDisabled();
 await page.locator('#honour-confirm').check();
 await page.locator('#honour-accept').click();
 await expect(page.getByRole('heading',{name:'Explore Andragogy'})).toBeVisible();
});
test('14-point map, distinct question markers and gated learning',async({page})=>{
  await expect(page.getByRole('heading',{name:'Explore Andragogy'})).toBeVisible();
  await expect(page.locator('.stop')).toHaveCount(14);
  await expect(page.locator('.stop[disabled]')).toHaveCount(13);
  await expect(page.locator('.stop').filter({has:page.locator('.stop-kind', {hasText:'Question'})})).toHaveCount(6);
  await page.getByRole('button',{name:/Start learning/}).click();
  await expect(page.getByRole('heading',{name:'What is Andragogy?'})).toBeVisible();
  await expect(page.locator('.hero-vector .puzzle-piece')).toHaveCount(4);
  await expect(page.locator('.hero-vector svg.puzzle-svg')).toBeVisible();
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
  await expect(page.getByRole('heading',{name:/Small lessons/})).toBeVisible();
  await page.locator('#welcome-start').click();
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
  await expect(page.locator('.hero-vector .puzzle-piece')).toHaveCount(4);
  await expect(page.locator('.hero-vector svg.puzzle-svg')).toBeVisible();
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
  await page.locator('#welcome-start').click();
  await expect(page.getByRole('heading',{name:'Explore Andragogy'})).toBeVisible();
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

test('Card 1 vector pieces travel into reciprocal puzzle slots and remain assembled',async({page})=>{
 await page.getByRole('button',{name:/Start learning/}).click();
 await expect(page.locator('.hero-vector .puzzle-piece')).toHaveCount(4);
 await expect(page.locator('.hero-vector .puzzle-slots path')).toHaveCount(4);
 const tileColors=await page.locator('.hero-vector .puzzle-piece>path').evaluateAll(paths=>paths.map(path=>getComputedStyle(path).fill));
 expect(tileColors).toEqual(['url("#goldTile")','url("#coralTile")','url("#tealTile")','url("#blueTile")']);
 const original=await page.locator('.hero-vector .puzzle-piece').first().boundingBox();
 await page.waitForTimeout(1650);
 const arrived=await page.locator('.hero-vector .puzzle-piece').first().boundingBox();
 expect(Math.abs(original.x-arrived.x)+Math.abs(original.y-arrived.y)).toBeGreaterThan(15);
 const shapes=await page.locator('.hero-vector svg').evaluate(svg=>{
  const slots=[...svg.querySelectorAll('.puzzle-slots path')];
  const pieces=[...svg.querySelectorAll('.puzzle-piece path')];
  const matching=slots.every((slot,i)=>slot.getAttribute('d')===pieces[i].getAttribute('d'));
  let overlaps=0,holes=0;
  const point=svg.createSVGPoint();
  for(let x=180;x<450;x+=4)for(let y=154;y<337;y+=4){
   point.x=x;point.y=y;
   const count=pieces.filter(piece=>piece.isPointInFill(point)).length;
   if(count>1)overlaps++;
   if(count===0)holes++;
  }
  return {matching,overlaps,holes};
 });
 expect(shapes.matching).toBe(true);
 expect(shapes.overlaps,'Geometric puzzle pieces overlap').toBe(0);
 expect(shapes.holes,'Puzzle should form one contiguous board').toBeLessThan(100);
 const labelOverlaps=await page.locator('.hero-vector svg').evaluate(svg=>{
  const rect=svg.querySelector('.puzzle-conclusion rect').getBBox();
  const texts=[...svg.querySelectorAll('.puzzle-piece text')];
  return texts.filter(t=>{
   const b=t.getBBox();
   return b.x<rect.x+rect.width && b.x+b.width>rect.x &&
          b.y<rect.y+rect.height && b.y+b.height>rect.y;
  }).map(t=>t.textContent);
 });
 expect(labelOverlaps,'Andragogy overlay must not cover its component labels').toEqual([]);
 await page.waitForTimeout(4800);
 await expect(page.locator('.hero-vector .puzzle-conclusion')).toBeVisible();
 const done=await page.locator('.hero-vector .puzzle-piece').first().boundingBox();
 await page.waitForTimeout(350);
 const held=await page.locator('.hero-vector .puzzle-piece').first().boundingBox();
 expect(Math.abs(done.x-held.x)+Math.abs(done.y-held.y)).toBeLessThan(.1);
 await page.getByRole('button',{name:'Replay puzzle assembly'}).click();
 const restarting=await page.locator('.hero-vector .puzzle-piece').first().boundingBox();
 expect(Math.abs(restarting.x-held.x)+Math.abs(restarting.y-held.y)).toBeGreaterThan(15);
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'vector-card1-in-motion-desktop.png'),fullPage:true});
 await page.waitForTimeout(6350);
 await page.screenshot({path:path.join(capture,'vector-card1-completed-desktop.png'),fullPage:true});
});
test('reduced-motion preference shows completed vector without animations',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await page.locator('#welcome-start').click();
 await page.getByRole('button',{name:/Start learning/}).click();
 const panel=page.locator('.hero-vector');
 await expect(panel.locator('.puzzle-piece')).toHaveCount(4);
 await expect(page.getByRole('button',{name:'Replay puzzle assembly'})).toBeHidden();
 const state=await panel.locator('.puzzle-piece').first().evaluate(el=>({
  animation:getComputedStyle(el).animationName,
  transform:getComputedStyle(el).transform
 }));
 expect(state.animation).toBe('none');
 expect(state.transform).toBe('none');
});
test('each learning concept gets specific one-time movement and pedagogical explanation',async({page})=>{
 await page.getByRole('button',{name:/Start learning/}).click();
 const sequence=await page.evaluate(()=>cards.map(c=>({q:!!c.q,answer:c.q?c.q[c.answer]:null,art:c.art})));
 for(let i=0;i<sequence.length;i++){
  const c=sequence[i];
  if(c.q){
   await expect(page.locator('.scene-action')).toHaveCount(0);
   await page.getByRole('button',{name:c.answer,exact:true}).click();
  }else if(i>0){
   const plan=await page.evaluate(key=>lessonSceneActions[key],c.art);
   expect(plan&&plan.meaning).toBeTruthy();
   await expect(page.locator('.motion-explanation')).toContainText(plan.meaning);
   const btn=page.getByRole('button',{name:plan.label,exact:true});
   await expect(btn).toBeVisible();
   await btn.click();
   await expect(page.locator('.art-panel.is-playing')).toBeVisible();
  }
  if(i<sequence.length-1)await page.getByRole('button',{name:'Next →'}).click();
 }
});
test('welcome, creator and disclosures appear before the course',async({page})=>{
 await page.reload();
 await expect(page.getByRole('heading',{name:/Small lessons/})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Meet the creator'})).toBeVisible();
 await expect(page.getByText('Dr. Rajkumar Elanjeran')).toBeVisible();
 await expect(page.getByText(/does not award accredited CME/)).toBeVisible();
 await expect(page.getByText(/does not ask for your name or email/)).toBeVisible();
 await expect(page.locator('#map-screen')).toBeHidden();
 await expect(page.locator('#cards-screen')).toBeHidden();
 await expect(page.locator('#welcome-preview')).toBeVisible();
 const link=page.getByRole('link',{name:/Read our learning, privacy/});
 await expect(link).toHaveAttribute('href','./site-info.html');
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'welcome-desktop.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('#welcome-start')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2)).toBe(false);
 await page.screenshot({path:path.join(capture,'welcome-mobile.png'),fullPage:true});
});
test('honour acknowledgement is required once and returning learners keep progress',async({page})=>{
 await page.evaluate(()=>localStorage.removeItem('simple-academy-learner-honour-v1'));
 await page.reload();
 await page.locator('#welcome-start').click();
 await expect(page.getByRole('heading',{name:'The learner honour code'})).toBeVisible();
 await expect(page.locator('#honour-accept')).toBeDisabled();
 await expect(page.getByText(/answer the learning activities myself/)).toBeVisible();
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'honour-code-desktop.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2)).toBe(false);
 await page.screenshot({path:path.join(capture,'honour-code-mobile.png'),fullPage:true});
 await page.locator('#honour-confirm').check();
 await expect(page.locator('#honour-accept')).toBeEnabled();
 await page.locator('#honour-accept').click();
 await expect(page.getByRole('heading',{name:'Explore Andragogy'})).toBeVisible();
 await page.getByRole('button',{name:/Start learning/}).click();
 await page.getByRole('button',{name:'Next →'}).click();
 await page.getByRole('button',{name:'No',exact:true}).click();
 await page.getByRole('button',{name:'Next →'}).click();
 await page.getByRole('button',{name:'Home',exact:true}).click();
 await expect(page.getByRole('heading',{name:/Small lessons/})).toBeVisible();
 await page.reload();
 await page.locator('#welcome-start').click();
 await expect(page.locator('#honour-screen')).toBeHidden();
 await page.getByRole('button',{name:/Continue learning/}).click();
 await expect(page.getByRole('heading',{name:'Start with the adult learner.'})).toBeVisible();
});
test('public educational and privacy notice is accurate and accessible',async({page})=>{
 await page.goto('/site-info.html');
 await expect(page.getByRole('heading',{name:'Important information.'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Educational disclaimer'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Privacy and progress in this version'})).toBeVisible();
 await expect(page.getByText(/does not require a name, email address or account/)).toBeVisible();
 await expect(page.getByText(/does not send those answers/)).toBeVisible();
 await expect(page.getByText(/does not award accredited CME/)).toBeVisible();
});

test('complete desktop visual QA: capture all 14 cards after meaningful motion settles',async({page})=>{
 test.setTimeout(160000);
 await page.setViewportSize({width:1366,height:900});
 await page.getByRole('button',{name:/Start learning/}).click();
 const seq=await page.evaluate(()=>cards.map(c=>({heading:c.h,q:!!c.q,answer:c.q?c.q[c.answer]:null,art:c.art})));
 expect(seq).toHaveLength(14);
 fs.mkdirSync(capture,{recursive:true});
 for(let i=0;i<seq.length;i++){
  const c=seq[i];
  await expect(page.locator('#heading')).toHaveText(c.heading);
  if(c.q){
   await expect(page.locator('.card')).toHaveClass(/is-question/);
   await page.getByRole('button',{name:c.answer,exact:true}).click();
  }else{
   await expect(page.locator('.card')).not.toHaveClass(/is-question/);
   if(i===0)await page.waitForTimeout(6150); else await page.waitForTimeout(5500);
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
  expect(overflow,'Horizontal overflow on card '+(i+1)).toBe(false);
  await page.screenshot({path:path.join(capture,'full-visual-card-'+String(i+1).padStart(2,'0')+'-'+(c.q?'question':'lesson')+'.png'),fullPage:true});
  if(i<13)await page.getByRole('button',{name:'Next →'}).click();
 }
});
