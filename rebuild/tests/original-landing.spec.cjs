const {test,expect}=require('@playwright/test');
const fs=require('node:fs'),path=require('node:path');
const capture=path.join(__dirname,'..','artifacts');

test.beforeEach(async({page})=>{
 await page.goto('/original-landing.html');
 await page.evaluate(()=>localStorage.clear());
 await page.reload();
});

test('restored original welcome artwork and typography display on desktop and phone',async({page})=>{
 await expect(page.locator('#profile-view')).toBeVisible();
 await expect(page.getByRole('heading',{name:/Small lessons/})).toBeVisible();
 await expect(page.getByText('Because your brain deserves better.')).toBeVisible();
 await expect(page.locator('.pilot-login-visual .pilot-visual-image img')).toBeVisible();
 await page.locator('.pilot-login-visual .pilot-visual-image img').evaluate(async(img)=>{
  if(img.complete&&img.naturalWidth>0)return;
  await new Promise((resolve,reject)=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',()=>reject(Error('Original illustration failed to load')),{once:true});});
 });
 await expect(page.locator('.pilot-quote-card')).toContainText('Malcolm Knowles');
 await expect(page.getByRole('button',{name:/Begin learning/})).toBeVisible();
 await expect(page.locator('#profile-form')).toHaveCount(0);
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'restored-original-landing-desktop.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('#profile-view')).toBeVisible();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3);
 expect(overflow,'original welcome has horizontal overflow').toBe(false);
 await page.screenshot({path:path.join(capture,'restored-original-landing-mobile.png'),fullPage:true});
});

test('original creator and double-confirmation honour code lead to rebuilt map',async({page})=>{
 await page.getByRole('button',{name:/Begin learning/}).click();
 await expect(page.locator('#profile-view')).toBeHidden();
 await expect(page.locator('#facilitator-view')).toBeVisible();
 await expect(page.getByRole('heading',{name:/Hello, I.m Dr. Rajkumar Elanjeran/})).toBeVisible();
 await expect(page.locator('#facilitator-view .facilitator-art img')).toBeVisible();
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'restored-original-creator-desktop.png'),fullPage:true});
 await page.getByRole('button',{name:/Sounds good/}).click();
 await expect(page.locator('#facilitator-view')).toBeHidden();
 await expect(page.locator('#profile-view')).toBeHidden();
 await expect(page.locator('#honor-view')).toBeVisible();
 await expect(page.getByRole('heading',{name:'The learner honour code'})).toBeVisible();
 await page.getByRole('button',{name:'Yes, I agree'}).click();
 await expect(page.getByText(/tiny AI sidekick/)).toBeVisible();
 await page.screenshot({path:path.join(capture,'restored-original-honour-desktop.png'),fullPage:true});
 await page.getByRole('button',{name:/Yes, still just me/}).click();
 await expect(page).toHaveURL(/\/course\.html#map$/);
 await expect(page.getByRole('heading',{name:'Explore Andragogy'})).toBeVisible();
 await expect(page.locator('.stop')).toHaveCount(14);
 await page.getByRole('button',{name:/Start learning/}).click();
 await expect(page.getByRole('heading',{name:'What is Andragogy?'})).toBeVisible();
 await expect(page.locator('.hero-vector .puzzle-piece')).toHaveCount(4);
});

test('returning learner can bypass the original honour code and resume course',async({page})=>{
 await page.evaluate(()=>localStorage.setItem('simple-academy-learner-honour-v1','yes'));
 await page.reload();
 await page.getByRole('button',{name:/Begin learning/}).click();
 await expect(page).toHaveURL(/\/course\.html#map$/);
 await expect(page.getByRole('heading',{name:'Explore Andragogy'})).toBeVisible();
});

test('restored landing respects privacy and still links to public notices',async({page})=>{
 await expect(page.getByText(/Your answers and progress stay in this browser/)).toBeVisible();
 await expect(page.getByText(/No sign-in required/).first()).toBeVisible();
 await expect(page.getByText(/14 CARDS/)).toBeVisible();
 await expect(page.getByText(/6 Questions/)).toBeVisible();
 await expect(page.getByText(/does not award accredited CME/)).toBeVisible();
 await expect(page.getByRole('link',{name:/Learning & privacy information/})).toHaveAttribute('href','./site-info.html');
 await expect(page.getByRole('link',{name:/Earlier two-module pilot/})).toHaveAttribute('href','./legacy.html');
});

test('mobile landscape illustration appears before the Begin section and desktop retains side-by-side layout',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.reload();
 const picture=page.locator('#profile-view .pilot-login-copy > .pilot-visual-image img');
 const button=page.getByRole('button',{name:/Begin learning/});
 await expect(picture).toBeVisible();
 await expect(button).toBeVisible();
 const art=await picture.boundingBox(),cta=await button.boundingBox();
 expect(art.y+art.height,'On mobile the entire landscape illustration must precede Begin').toBeLessThan(cta.y);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+3)).toBe(false);
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'mobile-illustration-before-begin.png'),fullPage:true});
 await page.setViewportSize({width:1320,height:900});
 const originalSidebar=page.locator('#profile-view .pilot-login-visual > .pilot-visual-image img');
 await expect(originalSidebar).toBeVisible();
 const imgRect=await originalSidebar.boundingBox(),ctaRect=await button.boundingBox();
 expect(imgRect.x).toBeGreaterThan(ctaRect.x+ctaRect.width-10);
 await page.screenshot({path:path.join(capture,'desktop-original-layout-preserved.png'),fullPage:true});
});
