/* SIMple Academy module studio v1.0 · no build tools or trackers */
(function(){
"use strict";
const modules=window.SIMPLE_ACADEMY_MODULES||{};
const requested=(new URLSearchParams(location.search)).get("module")||"kolb";
const module=modules[requested];
if(!module){document.body.textContent="Module not found. Return to the SIMple Academy module library.";return;}
document.body.dataset.module=module.id;
document.title=module.title+" · SIMple Academy";
const $=id=>document.getElementById(id);
const key="simple-academy-module-"+module.id+"-v1";
const interactive=card=>card.type!=="learn";
const solved=new Set();
let furthest=0,current=0,done=false;
try{
 const stored=JSON.parse(localStorage.getItem(key)||"null");
 if(stored&&typeof stored==="object"){
  (Array.isArray(stored.solved)?stored.solved:[]).forEach(i=>{
   if(Number.isInteger(i)&&i>=0&&i<module.cards.length&&interactive(module.cards[i]))solved.add(i);
  });
  const requestedF=Math.max(0,Math.min(module.cards.length-1,Number(stored.furthest)||0));
  furthest=requestedF;
  for(let i=0;i<requestedF;i++)if(interactive(module.cards[i])&&!solved.has(i)){furthest=i;break;}
  done=Boolean(stored.done)&&furthest===module.cards.length-1&&solved.has(module.cards.length-1);
 }
}catch(_){}
const orders={};
function save(){try{localStorage.setItem(key,JSON.stringify({furthest,solved:[...solved],done}));}catch(_){}}
function element(tag,className,text){
 const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;
}
function glyph(kind){
 const shapes={
 cycle:'<circle cx="18" cy="18" r="12" stroke="#6d5ad9" stroke-width="3" fill="none"/><path d="M18 6v6m12 6h-6m-6 12v-6M6 18h6" stroke="#087f79" stroke-width="3" stroke-linecap="round"/>',
 experience:'<rect x="7" y="8" width="22" height="19" rx="4" fill="#d9eff4" stroke="#35698b" stroke-width="2"/><path d="M10 20h5l3-7 3 10 2-4h4" stroke="#ee8067" stroke-width="2" fill="none"/>',
 reflect:'<circle cx="15" cy="15" r="8" stroke="#6d5ad9" stroke-width="3" fill="#eee8ff"/><path d="m21 21 9 9" stroke="#6d5ad9" stroke-width="4" stroke-linecap="round"/>',
 concept:'<path d="M6 25 17 7l13 18Z" fill="#ffce78" stroke="#a97440" stroke-width="2"/><circle cx="17" cy="21" r="3" fill="#fff"/>',
 experiment:'<path d="M9 7v21m17-21v21M5 27h25" stroke="#376d6e" stroke-width="2.5"/><path d="M9 22 17 14l9 3" stroke="#ec795f" stroke-width="3" fill="none"/>',
 match:'<circle cx="8" cy="8" r="4" fill="#ee8067"/><circle cx="28" cy="8" r="4" fill="#78b6a5"/><circle cx="8" cy="28" r="4" fill="#78b6a5"/><circle cx="28" cy="28" r="4" fill="#ee8067"/><path d="M11 10 25 26M25 10 11 26" stroke="#6d5ad9" stroke-width="2"/>',
 sequence:'<rect x="5" y="6" width="7" height="24" rx="3" fill="#ec795f"/><rect x="15" y="6" width="7" height="24" rx="3" fill="#f4c666"/><rect x="25" y="6" width="7" height="24" rx="3" fill="#65b9a2"/>',
 spiral:'<path d="M17 17c0-9 15-8 15 3 0 16-28 16-28-2 0-20 31-21 32-3" stroke="#6d5ad9" stroke-width="3" fill="none"/>',
 compare:'<rect x="4" y="6" width="12" height="24" rx="4" fill="#ffd1bf"/><rect x="20" y="6" width="12" height="24" rx="4" fill="#afe4cf"/>',
 design:'<path d="M7 8h22M7 17h22M7 26h15" stroke="#7d64d7" stroke-width="4" stroke-linecap="round"/>',
 transfer:'<path d="M17 32V7m0 10L7 9m10 8L28 9" stroke="#137d74" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M7 9h6m-6 0v6m21-6h-6m6 0v6" stroke="#137d74" stroke-width="2"/>',
 loop:'<circle cx="18" cy="18" r="12" fill="none" stroke="#ec795f" stroke-width="3" stroke-dasharray="52 12"/><path d="m24 29 7 0-3-7" fill="#ec795f"/>',
 target:'<circle cx="18" cy="18" r="13" fill="none" stroke="#ec795f" stroke-width="3"/><circle cx="18" cy="18" r="7" fill="none" stroke="#f2b45b" stroke-width="3"/><circle cx="18" cy="18" r="3" fill="#ec795f"/>',
 pause:'<rect x="7" y="5" width="8" height="27" rx="2" fill="#ec795f"/><rect x="21" y="5" width="8" height="27" rx="2" fill="#ec795f"/>',
 feedback:'<path d="M4 7h28v18H18l-8 7v-7H4Z" fill="#ffdb97" stroke="#a67441" stroke-width="2"/><path d="M10 13h17m-17 6h12" stroke="#a67441" stroke-width="2"/>',
 rewind:'<path d="M12 8 5 17l7 8V8Zm13 0-7 9 7 8V8Z" fill="#6d5ad9"/>',
 mastery:'<path d="M4 28h9v-8h9v-8h10" stroke="#0c937e" stroke-width="5" fill="none"/><path d="m25 7 7 5-7 5" fill="none" stroke="#0c937e" stroke-width="3"/>',
 safety:'<path d="M18 3 31 9v9c0 9-9 14-13 16C14 32 5 27 5 18V9Z" fill="#a9dfcf" stroke="#238373" stroke-width="2"/><path d="m11 18 5 5 9-10" stroke="#166c59" stroke-width="3" fill="none"/>'
 };
 return '<svg viewBox="0 0 36 36" aria-hidden="true">'+(shapes[kind]||shapes.design)+'</svg>';
}
const t=(x,y,value,size=17,color="#284e50",weight=800)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="'+weight+'" font-size="'+size+'" fill="'+color+'">'+value+'</text>';
const box=(x,y,w,h,fill="#fff",stroke="#d3e7df",r=20)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
function artwork(card,idx){
 const peach="#f68c71",purple="#7564d6",mint="#65bca6",gold="#f4c56e",ink="#294b52",muted="#738f8b";
 let center="";
 const stage=(x,y,w,label,fill,step)=>'<g class="pulse-dot phase'+step+'">'+box(x,y,w,61,fill,"#ffffff",17)+t(x+w/2,y+36,label,16,ink)+'</g>';
 if(card.kind==="cycle"){
  center='<circle cx="275" cy="183" r="114" fill="none" stroke="#a7d0c6" stroke-width="7" stroke-dasharray="4 15" stroke-linecap="round"/>'+
  '<circle cx="275" cy="183" r="54" fill="#ffffff" stroke="#dce8df" stroke-width="2"/>'+t(275,177,"KOLB",24,ink)+t(275,201,"learn → adapt",12,muted)+
  stage(208,42,135,"EXPERIENCE","#fcd7c8",1)+stage(369,152,145,"REFLECT","#d5cfff",2)+stage(206,282,151,"CONCEPT","#ffe6af",3)+stage(42,153,141,"EXPERIMENT","#bee8dc",4)+
  '<path d="m343 91 16 17m89 102-14 23m-77 47-19 10m-174-43-17-22m8-112 18-18" fill="none" stroke="#6f8d89" stroke-width="3" stroke-linecap="round"/>';
 }else if(card.kind==="loop"){
  const labels=["PRACTISE","PAUSE","COACH","RETRY"],fills=["#bfe9dd","#ffdab9","#dcd3ff","#ffb7a4"];
  labels.forEach((x,i)=>{center+=box(28+i*134,108,112,74,fills[i],"#fff",16)+t(84+i*134,151,x,15,ink)+(i<3?t(152+i*134,153,"›",30,"#718b86"):"")});
  center+=t(280,75,"RAPID CYCLE",24,ink)+box(60,239,440,24,"#dbece7","none",12)+
    '<rect x="64" y="243" width="310" height="16" rx="8" fill="'+mint+'" opacity=".62"/>'+
    '<circle class="move-cursor" cx="93" cy="251" r="18" fill="'+peach+'" stroke="#fff" stroke-width="4"/>'+
    '<g class="rewind-arrow"><circle cx="278" cy="312" r="24" fill="#f0eafa" stroke="#dfd4f0" stroke-width="2"/><path d="M292 307a15 15 0 1 0-2 14" stroke="'+purple+'" stroke-width="4" fill="none"/><path d="m289 301 5 9-10-1" fill="'+purple+'"/></g>'+t(278,357,"repeat with feedback",16,muted);
 }else if(card.kind==="experience"){
  center=box(57,90,266,181,"#fdfefc","#dcebe4",20)+box(78,108,224,113,"#244f5c","#244f5c",12)+
  '<path d="M92 164h37l14-20 17 42 19-36 13 17h92" fill="none" stroke="#6ddfba" stroke-width="4" stroke-linecap="round"/>'+
  t(192,253,"SIMULATION",17,ink)+box(344,120,166,144,"#fff0da","#f0d7b2",17)+t(427,156,"THE CASE",16,ink)+
  '<rect x="369" y="177" width="118" height="9" rx="4" fill="#e8b775"/><rect x="369" y="203" width="92" height="9" rx="4" fill="#e8b775"/><rect x="369" y="229" width="108" height="9" rx="4" fill="#e8b775"/>';
 }else if(card.kind==="reflect"){
  center=box(73,73,293,242,"#fff","#e5dff8",22)+t(220,118,"NOTICE",22,purple)+
   '<rect x="115" y="153" width="200" height="10" rx="5" fill="#b9cfc9"/><rect x="115" y="185" width="167" height="10" rx="5" fill="#b9cfc9"/><rect x="115" y="217" width="188" height="10" rx="5" fill="#b9cfc9"/>'+
   '<circle cx="391" cy="240" r="56" fill="#fff0db" stroke="'+gold+'" stroke-width="10"/><path d="m431 278 40 35" stroke="'+gold+'" stroke-width="15" stroke-linecap="round"/>'+
   '<circle class="pulse-dot" cx="181" cy="188" r="12" fill="'+peach+'"/>';
 }else if(card.kind==="concept"){
  center=box(42,147,140,98,"#fff0dc","#f1d0a0",18)+t(112,180,"WHAT",15,ink)+t(112,205,"HAPPENED",13,ink)+
   t(211,202,"+",38,purple)+box(240,147,140,98,"#e8e0ff","#cfc4fa",18)+t(310,180,"WHY",15,ink)+t(310,205,"IT MATTERS",13,ink)+
   '<path d="M380 194h45m-12-11 13 11-13 11" fill="none" stroke="'+mint+'" stroke-width="6" stroke-linecap="round"/>'+
   box(425,130,111,131,"#c8efe0","#a7d8c5",18)+t(481,177,"NEW",17,ink)+t(481,203,"IDEA",20,ink);
 }else if(card.kind==="experiment"){
  center=box(54,96,208,194,"#fff1e5","#f2d5bb",22)+box(299,96,208,194,"#ddf5ee","#a7d8c7",22)+
   t(158,142,"FIRST TRY",20,ink)+t(404,142,"TEST CHANGE",18,ink)+
   '<path d="M98 225h124m-124-17 29 0 20-24 24 29 15-12 36 0" fill="none" stroke="'+peach+'" stroke-width="6" stroke-linecap="round"/>'+
   '<path d="M344 226h125m-125-14 42 0 18-35 21 24 44-20" fill="none" stroke="'+mint+'" stroke-width="6" stroke-linecap="round"/>'+
   t(280,197,"→",37,purple);
 }else if(card.kind==="match"){
  const ys=[95,156,217,278];ys.forEach((y,i)=>{center+=box(68,y,158,46,["#fee0d5","#ded6ff","#d6f0e7","#fff0cb"][i],"#fff",12)+box(338,y,160,46,["#d6f0e7","#fee0d5","#fff0cb","#ded6ff"][i],"#fff",12)+
   '<path d="M226 '+(y+23)+' C283 '+(y+23)+',282 '+(ys[(i+1)%4]+23)+',338 '+(ys[(i+1)%4]+23)+'" stroke="'+[peach,purple,mint,gold][i]+'" stroke-width="4" fill="none" stroke-linecap="round"/>'+t(146,y+30,"STAGE "+(i+1),16,ink)+t(416,y+30,"PURPOSE",16,ink)});
 }else if(card.kind==="sequence"){
  const fills=["#fcd8c9","#e5dcff","#fff0cc","#caeee4"];
  for(let i=0;i<4;i++){const x=30+i*133;center+=box(x,118,113,132,fills[i],"#fff",20)+
   '<circle cx="'+(x+56)+'" cy="158" r="20" fill="#fff" />'+t(x+56,165,""+(i+1),24,purple)+t(x+56,216,["DO","NOTICE","EXPLAIN","RETRY"][i],14,ink);
   if(i<3)center+=t(x+123,193,"→",26,"#7a8f8b");
  }
 }else if(card.kind==="spiral"){
  center='<circle cx="281" cy="188" r="128" fill="none" stroke="#d4ece4" stroke-width="22"/>'+
   '<path d="M283 63a125 125 0 1 1-94 42" fill="none" stroke="'+purple+'" stroke-width="12" stroke-linecap="round"/>'+
   '<path d="M189 105l-9 26 29-5" fill="none" stroke="'+purple+'" stroke-width="9" stroke-linecap="round"/>'+
   '<circle class="pulse-dot" cx="281" cy="188" r="61" fill="#fff2d7" stroke="#edd3a8" stroke-width="3"/>'+
   t(281,178,"TRY",25,ink)+t(281,211,"AGAIN",25,ink)+t(281,343,"Each round adds insight",17,muted);
 }else if(card.kind==="target"){
  [135,99,66,28].forEach((r,i)=>center+='<circle class="pulse-dot phase'+(i+1)+'" cx="260" cy="193" r="'+r+'" fill="'+["#ffe4cf","#ffd2bf","#ffb79e","#fff4df"][i]+'" stroke="#fff" stroke-width="4"/>');
  center+='<circle cx="260" cy="193" r="9" fill="'+purple+'"/><path d="m373 114-102 73" stroke="'+ink+'" stroke-width="7" stroke-linecap="round"/><path d="m363 98 14 12-2 20" fill="none" stroke="'+ink+'" stroke-width="7" stroke-linecap="round"/>'+t(281,360,"ONE CLEAR OBJECTIVE",20,ink);
 }else if(card.kind==="pause"){
  center=box(90,95,379,203,"#fff","#e2e8e6",24)+
   '<path d="M113 228H443" stroke="#a5cbc2" stroke-width="12" stroke-linecap="round"/>'+
   '<circle cx="256" cy="226" r="26" fill="'+peach+'" stroke="#fff" stroke-width="7"/>'+
   '<circle cx="268" cy="154" r="53" fill="#fff0da" stroke="'+gold+'" stroke-width="4"/>'+
   '<rect x="251" y="131" width="13" height="46" rx="4" fill="'+purple+'"/><rect x="272" y="131" width="13" height="46" rx="4" fill="'+purple+'"/>'+
   t(280,335,"STOP THE SCENARIO CLOCK",18,ink);
 }else if(card.kind==="feedback"){
  center=box(83,88,398,218,"#fff4da","#ecd49c",26)+
   '<circle cx="146" cy="153" r="31" fill="'+mint+'"/>'+t(146,164,"✓",35,"#fff")+
   t(302,151,"ONE CHANGE",26,ink)+
   '<rect x="174" y="182" width="241" height="13" rx="6" fill="#dec38c"/>'+
   '<rect x="174" y="209" width="192" height="13" rx="6" fill="#dec38c"/>'+
   '<rect x="174" y="236" width="211" height="13" rx="6" fill="#dec38c"/>';
 }else if(card.kind==="rewind"){
  center=box(45,99,191,182,"#f7e3dd","#f1d0c5",21)+box(322,99,191,182,"#d9f4e9","#b5dcca",21)+
   t(141,138,"BEFORE",19,ink)+t(416,138,"RETRY",19,ink)+
   '<path d="M72 227h136m-136-27 37-20 34 26 32-32 33 23" fill="none" stroke="'+peach+'" stroke-width="5"/>'+
   '<path d="M347 228h138m-138-19 43-30 31 17 34-35 30 18" fill="none" stroke="'+mint+'" stroke-width="5"/>'+
   '<circle cx="280" cy="189" r="39" fill="#fff" stroke="#d5c6f4" stroke-width="4"/>'+
   '<g class="rewind-arrow"><path d="M302 193a21 21 0 1 1-7-19" stroke="'+purple+'" stroke-width="5" fill="none"/><path d="m290 171 10 2-2 12" fill="none" stroke="'+purple+'" stroke-width="5"/></g>';
 }else if(card.kind==="mastery"){
  center='<path d="M68 293h100v-58h100v-58h100v-58h110" fill="none" stroke="'+mint+'" stroke-width="22" stroke-linejoin="round"/>'+
    '<circle class="pulse-dot" cx="470" cy="113" r="20" fill="'+peach+'" stroke="#fff" stroke-width="6"/>'+
    t(103,328,"ATTEMPT",15,muted)+t(478,91,"CRITERION",17,ink)+
    '<path d="M92 103h305" stroke="#d6dfee" stroke-dasharray="4 11" stroke-width="5"/>';
 }else if(card.kind==="safety"){
  center='<path d="M279 56 430 119v103c0 99-108 142-151 157C236 363 128 320 128 222V119Z" fill="#c7efe3" stroke="#77bba5" stroke-width="7"/>'+
   '<path d="m205 215 55 53 100-113" fill="none" stroke="'+mint+'" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>'+
   t(279,118,"SAFETY",20,ink);
 }else if(card.kind==="design"){
  const xs=[34,170,306,442];["PREBRIEF","PRACTISE","FEEDBACK","RETRY"].forEach((label,i)=>{
   const x=xs[i];center+=box(x,124,116,114,["#fbd7c9","#d5f0e6","#e1dcff","#ffe6ba"][i],"#fff",17)+
    '<circle cx="'+(x+58)+'" cy="159" r="17" fill="#fff"/>'+t(x+58,165,""+(i+1),19,purple)+t(x+58,204,label,13,ink);
  });
 }else if(card.kind==="transfer"){
  center='<path d="M278 308V179m0 8-114-81m114 81 115-81" stroke="'+mint+'" stroke-width="15" fill="none" stroke-linecap="round"/>'+
   '<circle cx="278" cy="310" r="26" fill="#fff0cc" stroke="'+gold+'" stroke-width="5"/>'+
   '<circle class="pulse-dot" cx="163" cy="104" r="40" fill="#ffe1d4" stroke="'+peach+'" stroke-width="5"/>'+
   '<circle class="pulse-dot phase2" cx="395" cy="104" r="40" fill="#c9f1e4" stroke="'+mint+'" stroke-width="5"/>'+
   t(163,111,"?",33,ink)+t(395,112,"✓",34,ink)+t(278,362,"WHAT NEXT?",17,ink);
 }else{
  center=box(95,95,370,189,"#e6f4ed","#cbe7dd",24)+t(280,193,"THINK · TRY · IMPROVE",23,ink);
 }
 const bg='<rect x="0" y="0" width="560" height="380" rx="29" fill="'+(module.id==="rcdp"?"#fff7ef":"#f8f4ff")+'"/>'+
  '<circle cx="510" cy="24" r="105" fill="'+(module.id==="rcdp"?"#ffe1cc":"#e6ddff")+'" opacity=".58"/>'+
  '<circle cx="42" cy="365" r="110" fill="#d8f2e7" opacity=".6"/>'+
  '<g fill="#9bc4ba" opacity=".35"><circle cx="36" cy="45" r="3"/><circle cx="57" cy="45" r="3"/><circle cx="78" cy="45" r="3"/><circle cx="36" cy="66" r="3"/><circle cx="57" cy="66" r="3"/><circle cx="78" cy="66" r="3"/></g>';
 const caption=card.kind==="cycle"?"The four Kolb stages form a continuing cycle":card.kind==="loop"?"Four moments in one rapid practice loop":"Illustration of "+card.word.toLowerCase()+" in "+module.short;
 return '<svg class="artwork" role="img" aria-label="'+caption+'" viewBox="0 0 560 380" xmlns="http://www.w3.org/2000/svg">'+bg+center+'</svg>';
}
function replayArt(){
 const holder=$("visual");holder.classList.remove("is-animating");
 void holder.offsetWidth;holder.classList.add("is-animating");
}
function updatePage(){
 $("module-eyebrow").textContent=module.eyebrow;
 $("module-title").textContent=module.title;
 $("module-desc").textContent=module.description;
 $("module-strap").textContent=module.strap;
 $("module-time").textContent=module.minutes;
 $("module-count").textContent=module.cards.length+" illustrated cards";
 $("module-questions").textContent=module.cards.filter(interactive).length+" checkpoints";
 $("module-art").innerHTML=artwork(module.cards[0],0);
 $("module-art").classList.add("is-animating");
 const ref=$("references");ref.replaceChildren();
 module.references.forEach(item=>{const a=element("a",null,item.label);a.href=item.url;a.target="_blank";a.rel="noopener noreferrer";ref.appendChild(a);});
 renderMap();
}
function renderMap(){
 const journey=$("journey");journey.replaceChildren();
 module.cards.forEach((card,i)=>{
  const isSolved=solved.has(i),available=i<=furthest;
  const btn=element("button","journey-step "+(available?"available ":"locked ")+(isSolved?"solved":""));
  btn.type="button";btn.disabled=!available;btn.setAttribute("aria-label","Card "+(i+1)+": "+card.title+(available?"":"; locked"));
  const node=element("span","node");node.innerHTML=glyph(card.kind);
  const copy=element("span","stepcopy");copy.append(element("strong",null,card.word+" · "+card.title),element("small",null,(interactive(card)?"Practice question":"Illustrated learning card")+(isSolved?" · completed":"")));
  btn.append(node,copy);btn.addEventListener("click",()=>showLesson(i));journey.appendChild(btn);
 });
 $("resume").textContent=done?"Review completed module →":furthest?"Continue at card "+(furthest+1)+" →":"Start this module →";
 $("map-summary").textContent=done?"Module complete · You can review any card.":(furthest+1)+" of "+module.cards.length+" cards unlocked";
 $("complete-note").hidden=!done;
 if(done&&module.id==="kolb"){
  $("next-module").hidden=false;$("next-module").href="./learn.html?module=rcdp";$("next-module").textContent="Next module: RCDP →";
 }else if(done){
  $("next-module").hidden=false;$("next-module").href="./academy.html";$("next-module").textContent="Explore all modules →";
 }else{$("next-module").hidden=true;}
}
function showOverview(){
 $("overview").hidden=false;$("lesson").hidden=true;$("lesson-controls").hidden=true;
 $("map-button").hidden=true;renderMap();window.scrollTo(0,0);
}
function completedQuestion(){
 solved.add(current);save();updateControls();
 const fb=$("feedback");fb.className="feedback good";fb.textContent=module.cards[current].explain||"Correct — continue when ready.";
}
function feedbackNode(parent){
 const n=element("div","feedback");n.id="feedback";n.setAttribute("role","status");n.setAttribute("aria-live","polite");parent.appendChild(n);return n;
}
function renderChoice(card,area){
 const wrap=element("div","options");
 card.options.forEach((option,i)=>{
  const btn=element("button","option"+(solved.has(current)&&i===card.correct?" correct":""),option);
  btn.type="button";btn.disabled=solved.has(current);
  btn.addEventListener("click",()=>{
   if(solved.has(current))return;
   wrap.querySelectorAll("button").forEach(n=>n.classList.remove("incorrect","correct"));
   if(i!==card.correct){btn.classList.add("incorrect");const fb=$("feedback");fb.className="feedback bad";fb.textContent=card.wrong||"Try again.";return;}
   btn.classList.add("correct");wrap.querySelectorAll("button").forEach(n=>n.disabled=true);completedQuestion();
  });
  wrap.appendChild(btn);
 });area.appendChild(wrap);
 const fb=feedbackNode(area);if(solved.has(current)){fb.className="feedback good";fb.textContent=card.explain;}
}
function renderOrder(card,area){
 const isSolved=solved.has(current);
 if(isSolved)orders[current]=[...card.solution];
 else if(!orders[current])orders[current]=[...card.pieces];
 const host=element("div","order-list");area.appendChild(host);
 function draw(){
  host.replaceChildren();
  orders[current].forEach((phrase,i)=>{
   const row=element("div","order-row");
   row.append(element("span","num",String(i+1)),element("span","phrase",phrase));
   [-1,1].forEach((delta)=>{
    const btn=element("button","move",delta===-1?"↑":"↓");
    btn.type="button";btn.disabled=isSolved||i+delta<0||i+delta>=orders[current].length;
    btn.setAttribute("aria-label","Move "+phrase+(delta===-1?" up":" down"));
    btn.addEventListener("click",()=>{const swap=i+delta;[orders[current][i],orders[current][swap]]=[orders[current][swap],orders[current][i]];draw();});
    row.appendChild(btn);
   });host.appendChild(row);
  });
 }
 draw();
 const check=element("button","check","Check sequence");check.disabled=isSolved;area.append(check);
 const fb=feedbackNode(area);
 if(isSolved){fb.className="feedback good";fb.textContent=card.explain;}
 check.addEventListener("click",()=>{
  if(orders[current].every((v,i)=>v===card.solution[i])){check.disabled=true;completedQuestion();draw();}
  else{fb.className="feedback bad";fb.textContent="Not quite. Use the arrows to arrange each stage, then try again.";}
 });
}
function renderMatch(card,area){
 const host=element("div","match-list");const fields=[];
 const opts=card.pairs.map(x=>x[1]);
 card.pairs.forEach((pair,i)=>{
  const row=element("div","match-row");
  const lab=element("label",null,pair[0]);const id="matching-"+current+"-"+i;lab.htmlFor=id;
  const select=element("select");select.id=id;select.disabled=solved.has(current);
  const starter=element("option",null,"Choose a purpose");starter.value="";select.append(starter);
  opts.forEach((text,j)=>{const opt=element("option",null,text);opt.value=String(j);select.append(opt);});
  if(solved.has(current))select.value=String(i);
  row.append(lab,select);host.appendChild(row);fields.push(select);
 });area.append(host);
 const check=element("button","check","Check matches");check.disabled=solved.has(current);area.append(check);
 const fb=feedbackNode(area);
 if(solved.has(current)){fb.className="feedback good";fb.textContent=card.explain;}
 check.addEventListener("click",()=>{
  if(fields.every((f,i)=>f.value===String(i))){check.disabled=true;fields.forEach(f=>f.disabled=true);completedQuestion();}
  else{fb.className="feedback bad";fb.textContent="Some pairs need another look. Check the purpose of every stage.";}
 });
}
function renderLesson(){
 const card=module.cards[current];
 $("lesson-kicker").textContent="MODULE "+module.number+" · CARD "+String(current+1).padStart(2,"0")+" · "+(interactive(card)?"YOUR TURN":"EXPLORE");
 $("lesson-title").textContent=card.title;
 $("lesson-copy").textContent=card.copy;
 $("lesson-note").hidden=!card.note;$("lesson-note").textContent=card.note||"";
 const art=$("visual");art.innerHTML=artwork(card,current);
 replayArt();
 $("replay").onclick=replayArt;
 const area=$("activity");area.replaceChildren();
 if(card.type==="choice")renderChoice(card,area);
 if(card.type==="order")renderOrder(card,area);
 if(card.type==="match")renderMatch(card,area);
 $("lesson-card").classList.toggle("is-question",interactive(card));
 updateControls();
}
function showLesson(index){
 if(index<0||index>furthest||index>=module.cards.length)return;
 current=index;$("overview").hidden=true;$("lesson").hidden=false;$("lesson-controls").hidden=false;
 $("map-button").hidden=false;renderLesson();window.scrollTo(0,0);
}
function updateControls(){
 const card=module.cards[current],dots=$("step-dots");dots.replaceChildren();
 module.cards.forEach((item,i)=>{
  const dot=element("button","step-dot"+(i===current?" current":"")+(solved.has(i)?" solved":""));
  dot.type="button";dot.disabled=i>furthest;dot.title="Card "+(i+1)+": "+item.word;
  dot.setAttribute("aria-label","Go to card "+(i+1)+(i>furthest?" (locked)":""));
  if(i===current)dot.setAttribute("aria-current","step");
  dot.addEventListener("click",()=>showLesson(i));dots.appendChild(dot);
 });
 $("back").textContent=current===0?"← Module map":"← Back";
 $("next").textContent=current===module.cards.length-1?"Finish module ✓":"Next →";
 $("next").disabled=interactive(card)&&!solved.has(current);
 $("counter").textContent="Card "+(current+1)+" / "+module.cards.length;
 $("meter-fill").style.width=((current+1)/module.cards.length*100)+"%";
}
function go(direction){
 if(direction<0){if(current===0){showOverview();return;}showLesson(current-1);return;}
 if(interactive(module.cards[current])&&!solved.has(current))return;
 if(current===module.cards.length-1){done=true;save();showOverview();return;}
 const next=current+1;if(next>furthest){furthest=next;save();}
 showLesson(next);
}
$("resume").addEventListener("click",()=>showLesson(furthest));
$("map-button").addEventListener("click",showOverview);
$("back").addEventListener("click",()=>go(-1));
$("next").addEventListener("click",()=>go(1));
document.addEventListener("keydown",event=>{
 if($("lesson").hidden||event.altKey||event.metaKey||event.ctrlKey||event.target.closest("button,input,textarea,select"))return;
 if(event.key==="ArrowRight")go(1);
 if(event.key==="ArrowLeft")go(-1);
});
let touch=null;
$("lesson-card").addEventListener("touchstart",e=>{if(e.touches.length!==1)return;touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
$("lesson-card").addEventListener("touchend",e=>{
 if(!touch||!e.changedTouches.length)return;
 const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;
 if(Math.abs(dx)>90&&Math.abs(dy)<55)go(dx<0?1:-1);
},{passive:true});
updatePage();
if(location.hash==="#start")showLesson(furthest);else showOverview();
})();