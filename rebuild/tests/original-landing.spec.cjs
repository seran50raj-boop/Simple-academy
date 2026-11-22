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
 await expect(page.locator('#facilitator-view')).toBeVisible();
 await expect(page.getByRole('heading',{name:/Hello, I.m Dr. Rajkumar Elanjeran/})).toBeVisible();
 await expect(page.locator('#facilitator-view .facilitator-art img')).toBeVisible();
 fs.mkdirSync(capture,{recursive:true});
 await page.screenshot({path:path.join(capture,'restored-original-creator-desktop.png'),fullPage:true});
 await page.getByRole('button',{name:/Sounds good/}).click();
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
 await expect(page.locator('.puzzle-motion-video')).toBeVisible();
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
 await expect(page.getByText(/does not award accredited CME/)).toBeVisible();
 await expect(page.getByRole('link',{name:/Learning & privacy information/})).toHaveAttribute('href','./site-info.html');
 await expect(page.getByRole('link',{name:/Earlier two-module pilot/})).toHaveAttribute('href','./legacy.html');
});
