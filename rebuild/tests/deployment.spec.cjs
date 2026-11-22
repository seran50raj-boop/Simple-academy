const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
test('deployed root matches tested rebuild and preserves legacy backup',async()=>{
 const names=['index.html','course.js','art.js','map.js','map.css','map-icons.js','lesson.css','lesson-interactions.js','hero-motion.js'];
 for(const name of names){
  const from=fs.readFileSync(path.join(root,'rebuild',name));
  const to=fs.readFileSync(path.join(root,name));
  expect(to.equals(from),'Root and rebuild diverged: '+name).toBe(true);
 }
 const movie=fs.readFileSync(path.join(root,'assets','andragogy-card1-motion.mp4'));
 const source=fs.readFileSync(path.join(root,'rebuild','assets','andragogy-card1-motion.mp4'));
 expect(movie.equals(source),'Deployed animation must match browser-tested animation').toBe(true);
 expect(movie.byteLength).toBeGreaterThan(10000);
 expect(fs.existsSync(path.join(root,'legacy.html'))).toBe(true);
 expect(fs.existsSync(path.join(root,'admin.html'))).toBe(true);
 expect(JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8')).build).toBe('6.0');
});
test('root homepage has valid relative references and the 14-card app',async()=>{
 const source=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const refs=[...source.matchAll(/<(?:script|link)\s+[^>]*(?:src|href)="(\.\/[^"]+)"/g)].map(m=>m[1]);
 expect(refs.length).toBeGreaterThanOrEqual(8);
 for(const ref of refs) expect(fs.existsSync(path.join(root,ref.replace(/^\.\//,''))),'Missing linked asset: '+ref).toBe(true);
 const content=fs.readFileSync(path.join(root,'course.js'),'utf8');
 expect((content.match(/\bword:/g)||[]).length).toBe(14);
 expect(source).toContain('renderAndragogyMotion');
});
