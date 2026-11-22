/* Module 02: Knowles · original, purposeful vector scenes.
   The scene changes are self-contained and replay on demand; they do not loop. 
   No faceless figures, anatomy or external image assets are required. */
function knowlesArtwork(card,index){
 const K={ink:"#204e50",muted:"#657c79",coral:"#f17d5e",gold:"#f3b953",sky:"#9bcfdf",teal:"#5db6a4",lav:"#c6b6ed",purple:"#7766bd",paper:"#fffdf8",line:"#dce8df"};
 const f=(x)=>Number(x).toFixed(1);
 const box=(x,y,w,h,color,r=18)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+color+'" stroke="#ffffff" stroke-width="3" filter="url(#km-shadow)"/>';
 const txt=(x,y,str,size=20,color=K.ink,weight=800,anchor="middle")=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" text-anchor="'+anchor+'" font-size="'+size+'" font-weight="'+weight+'" font-family="Segoe UI,Arial,sans-serif">'+str+'</text>';
 const step=(delay,shape)=>'<g class="km-step" style="--km-delay:'+delay+'s">'+shape+'</g>';
 const move=(delay,x,y,shape)=>'<g class="km-move" style="--km-delay:'+delay+'s;--km-x:'+x+'px;--km-y:'+y+'px">'+shape+'</g>';
 const trace=(delay,path,color=K.teal,width=6)=>'<path class="km-connector" style="--km-delay:'+delay+'s" d="'+path+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round" stroke-linejoin="round"/>';
 const stage=(delay,shape)=>'<g class="km-stage" style="--km-delay:'+delay+'s">'+shape+'</g>';
 const pill=(x,y,w,text,fill=K.paper)=>box(x,y,w,49,fill,13)+txt(x+w/2,y+31,text,15);
 const chevron=(x,y)=>'<path d="m'+x+' '+(y-11)+' 12 11-12 11" fill="none" stroke="'+K.ink+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
 const clinicalMonitor=(x,y)=>box(x,y,175,122,"#23545a",13)+
  '<rect x="'+(x+13)+'" y="'+(y+12)+'" width="149" height="75" rx="7" fill="#173e43"/>'+
  '<path d="M'+(x+24)+' '+(y+50)+'h26l12-22 14 47 15-32 13 7h38" fill="none" stroke="#91ead0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'+
  '<rect x="'+(x+57)+'" y="'+(y+93)+'" width="60" height="7" rx="3" fill="#96cbd1"/>'+
  '<path d="M'+(x+87)+' '+(y+122)+'v18m-39 0h78" stroke="#7da39d" stroke-width="5" stroke-linecap="round"/>';
 let scene="",desc="";
 switch(index){
 case 0:{
  desc="Six differently colored assumptions assemble around the adult learner.";
  const tiles=[["NEED TO","KNOW",163,38,K.coral],["SELF-","CONCEPT",340,38,K.gold],["EXPERIENCE","",420,167,K.sky],["READINESS","",338,300,K.teal],["ORIENTATION","",146,300,K.lav],["MOTIVATION","",42,167,"#f4ccb4"]];
  scene+='<circle cx="323" cy="198" r="126" fill="none" stroke="#d7e9e1" stroke-dasharray="4 13" stroke-width="5"/>';
  tiles.forEach((a,i)=>{
   const [one,two,x,y,fill]=a;
   scene+=trace(.15+i*.13,"M"+(x+85)+" "+(y+42)+" L323 198","#c6d9d2",4)+step(.23+i*.15,box(x,y,174,79,fill,19)+txt(x+87,y+(two?31:48),one,two?16:14)+ (two?txt(x+87,y+54,two,16):""));
  });
  scene+=step(1.22,'<circle cx="323" cy="198" r="56" fill="#fffdf8" stroke="#e3e8e0" stroke-width="5"/>'+txt(323,191,"ADULT",23)+txt(323,220,"LEARNER",22));
  break;
 }
 case 1:{
  desc="A real emergency makes the purpose of learning clear.";
  scene+=step(.2,clinicalMonitor(38,108));
  scene+=step(.35,pill(49,267,153,"REAL CASE","#ffdbc8"));
  scene+=trace(.65,"M237 188 C276 188 288 188 322 188",K.gold,7)+step(.85,chevron(317,188));
  scene+=step(1.1,box(368,94,238,217,"#d9f0e7",22)+txt(487,142,"WHY THIS",25)+txt(487,176,"MATTERS",25)+
   '<circle cx="487" cy="231" r="37" fill="#fff"/><path d="m467 231 14 15 27-33" fill="none" stroke="'+K.teal+'" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>');
  break;
 }
 case 2:{
  desc="A clinically relevant case becomes the reason for engaging with the lesson.";
  scene+=step(.1,box(43,58,258,279,"#e8edf0",25)+txt(172,103,"SPECIFICATIONS",20)+
    '<rect x="84" y="141" width="177" height="10" rx="5" fill="#bcccd1"/><rect x="84" y="178" width="147" height="10" rx="5" fill="#bcccd1"/><rect x="84" y="215" width="169" height="10" rx="5" fill="#bcccd1"/>'+
    txt(172,280,"Only facts",19,K.muted));
  scene+=step(.38,box(345,58,273,279,"#d4f1e5",25)+txt(481,103,"PATIENT FIRST",22)+
    '<rect x="381" y="132" width="205" height="100" rx="12" fill="#26545a"/><path d="M396 185h29l11-27 14 48 19-30 16 11h77" stroke="#8fe8cb" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    txt(481,282,"Purpose + action",20));
  scene+=move(.95,175,0,'<circle cx="482" cy="340" r="15" fill="'+K.coral+'" stroke="#fff" stroke-width="5"/>');
  break;
 }
 case 3:{
  desc="An adult learner can take part in choosing routes toward a shared outcome.";
  scene+=step(.15,box(240,42,184,68,"#e2d8fb",19)+txt(332,84,"LEARNER",23));
  scene+=trace(.42,"M332 111V161M332 161C332 198 153 165 153 217M332 161C332 198 502 165 502 217",K.purple,6);
  scene+=step(.55,pill(56,226,203,"PRACTICE CASE A","#ffdac6"));
  scene+=step(.8,pill(401,226,203,"PRACTICE CASE B","#c5eadf"));
  scene+=step(1.12,box(218,327,225,52,"#ffe8b7",15)+txt(330,360,"ONE STANDARD",18));
  scene+=trace(.97,"M156 283Q156 310 330 327M505 283Q505 310 330 327",K.teal,4);
  break;
 }
 case 4:{
  desc="Learners choose how to practise while safety standards remain fixed.";
  scene+=step(.17,box(38,65,576,82,"#ffe5b3",20)+txt(325,114,"SAFETY STANDARD · FIXED",24));
  scene+=step(.48,box(62,213,235,111,"#dcefff",18)+txt(180,254,"SCENARIO A",20)+txt(180,288,"Choose a route",16,K.muted));
  scene+=step(.7,box(358,213,235,111,"#d4eee4",18)+txt(476,254,"SCENARIO B",20)+txt(476,288,"Choose a route",16,K.muted));
  scene+=trace(.32,"M326 148V181M326 181H178V208M326 181H473V208","#b49ccc",5);
  scene+=stage(1.1,'<circle cx="326" cy="181" r="13" fill="'+K.coral+'" stroke="#fff" stroke-width="5"/>');
  break;
 }
 case 5:{
  desc="Prior clinical experiences form layers that can be examined to create a new insight.";
  const col=[K.sky,K.gold,K.coral];
  for(let i=0;i<3;i++)scene+=move(.2+i*.25,-45+i*25,15-i*13,box(55+i*46,108+i*34,246,160,col[i],18)+
      txt(178+i*46,181+i*34,["HABITS","EXPERIENCE","ASSUMPTIONS"][i],17));
  scene+=trace(1.06,"M355 238 C409 238 419 221 447 221",K.teal,7)+
   step(1.25,box(451,149,164,143,"#c6ecdf",22)+txt(533,204,"NEW",23)+txt(533,236,"INSIGHT",22));
  break;
 }
 case 6:{
  desc="A new ICU role creates a time-sensitive reason to learn ventilator skills.";
  scene+=step(.2,box(48,61,245,286,"#e4f1fa",23)+
    '<rect x="65" y="81" width="211" height="66" rx="12" fill="'+K.sky+'"/>'+txt(170,125,"NEXT WEEK",24)+
    '<path d="M80 184h176M80 233h176M80 279h176" stroke="#b5c9d6" stroke-width="8" stroke-linecap="round"/>'+
    '<rect x="189" y="246" width="62" height="62" rx="10" fill="'+K.coral+'"/>'+txt(220,283,"ICU",21,"#fff"));
  scene+=trace(.67,"M305 198H361",K.gold,7)+step(.77,chevron(350,198));
  scene+=step(1.07,box(389,110,219,199,"#d6f1e5",23)+txt(498,161,"LEARN",24)+txt(498,194,"VENTILATION",19)+
    '<path d="M435 227h129m-129 23h94" stroke="'+K.teal+'" stroke-width="10" stroke-linecap="round"/>');
  break;
 }
 case 7:{
  desc="The upcoming responsibility makes readiness urgent now.";
  scene+=step(.18,box(59,89,222,220,"#d7e9f6",24)+txt(170,137,"ROTATION",21)+
    '<rect x="84" y="159" width="174" height="96" rx="14" fill="#fff"/>'+
    '<path d="M101 191h140M101 221h140" stroke="#c4d9db" stroke-width="8" stroke-linecap="round"/>'+
    '<circle cx="226" cy="221" r="19" fill="'+K.coral+'"/>');
  scene+=trace(.65,"M296 194H354",K.gold,7)+step(.82,chevron(349,194));
  scene+=step(1,box(390,89,211,220,"#d6f1e5",23)+txt(495,152,"READY",30)+txt(495,195,"TO LEARN",24)+
   '<circle cx="495" cy="247" r="25" fill="'+K.gold+'"/><path d="m480 247 11 11 19-21" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>');
  break;
 }
 case 8:{
  desc="A clinical problem directs what the learner reads, tries and explains.";
  scene+=step(.2,'<circle cx="326" cy="198" r="100" fill="#cbece0" stroke="#9ed2c4" stroke-width="5"/>'+
   '<circle cx="326" cy="198" r="62" fill="#fff" stroke="#e3e8e3" stroke-width="4"/>'+
   txt(326,192,"PATIENT",25)+txt(326,225,"PROBLEM",20));
  const items=[["EXAMINE",54,63,K.sky],["EXPLAIN",422,63,K.lav],["APPLY",58,306,K.gold],["RECHECK",420,306,"#f8ccbd"]];
  items.forEach((a,i)=>{const [name,x,y,c]=a;scene+=trace(.37+i*.14,"M326 198 L"+(x+96)+" "+(y+(y<200?61:0)),"#a4cfc2",4)+step(.65+i*.15,pill(x,y,188,name,c))});
  break;
 }
 case 9:{
  desc="Different internal and external drivers contribute to learner motivation.";
  scene+=step(.23,'<circle cx="328" cy="192" r="87" fill="#ffe0b2" stroke="#efc98e" stroke-width="5"/>'+
   '<circle cx="328" cy="192" r="48" fill="#fff"/>'+txt(328,187,"WHY",24)+txt(328,217,"TRY?",22));
  const items=[["CURIOSITY",55,87,K.lav],["PURPOSE",420,87,"#ffd5be"],["MASTERY",55,256,"#c3eadf"],["RECOGNITION",420,256,"#cfdefc"]];
  items.forEach((a,i)=>{const [name,x,y,fill]=a;scene+=trace(.2+i*.15,"M328 192 L"+(x+96)+" "+(y+26),"#b2cbbb",4)+step(.62+i*.19,pill(x,y,189,name,fill));});
  break;
 }
 case 10:{
  desc="The six learning assumptions are matched with six distinct teaching questions.";
  const rows=[["WHY?",K.coral],["CHOICE",K.gold],["EXPERIENCE",K.sky],["TIMING",K.teal],["PROBLEM",K.lav],["PURPOSE","#f6c5ad"]];
  rows.forEach((a,i)=>{
    const col=i%2,row=Math.floor(i/2),x=47+col*330,y=34+row*119;
    scene+=step(.19+i*.18,box(x,y,274,89,a[1],17)+
      '<circle cx="'+(x+38)+'" cy="'+(y+45)+'" r="23" fill="#fff" opacity=".88"/>'+txt(x+38,y+53,String(i+1),25,K.ink)+
      txt(x+173,y+51,a[0],18));
  });
  break;
 }
 case 11:{
  desc="Six teaching design decisions connect to one authentic sepsis workshop.";
  scene+=step(.13,box(231,137,195,120,"#f8dfb0",20)+txt(328,185,"SEPSIS",26)+txt(328,221,"WORKSHOP",19));
  const parts=[["WHY",239,39,K.coral],["CHOICE",418,86,K.lav],["EXPERIENCE",430,270,K.sky],["TIMING",228,322,K.teal],["TASK",45,272,K.gold],["PURPOSE",44,81,"#f9d2ba"]];
  parts.forEach((a,i)=>{
    const [name,x,y,fill]=a;scene+=trace(.22+i*.12,"M328 198 L"+(x+94)+" "+(y+31),"#accfc4",4)+step(.3+i*.17,pill(x,y,181,name,fill));
  });
  break;
 }
 case 12:{
  desc="A thoughtful airway workshop combines prior experience, clinical goals and learner choices.";
  scene+=step(.2,box(47,70,252,253,"#dfedf5",23)+txt(173,115,"PRIOR",22)+txt(173,147,"EXPERIENCE",20)+
    '<rect x="92" y="184" width="167" height="10" rx="5" fill="#a2bfc9"/><rect x="92" y="216" width="141" height="10" rx="5" fill="#a2bfc9"/><rect x="92" y="248" width="159" height="10" rx="5" fill="#a2bfc9"/>');
  scene+=trace(.55,"M300 198H363",K.gold,7)+step(.7,chevron(349,198));
  scene+=step(.9,box(388,70,238,253,"#d2efdf",23)+txt(507,115,"PRACTICE",22)+txt(507,147,"CHOICES",20)+
    '<circle cx="463" cy="230" r="23" fill="'+K.coral+'"/><circle cx="555" cy="230" r="23" fill="'+K.gold+'"/>'+
    '<path d="M463 210v-17m92 17v-17" stroke="'+K.teal+'" stroke-width="5" stroke-linecap="round"/>');
  break;
 }
 case 13:{
  desc="Learner autonomy and useful educator structure can be balanced rather than treated as opposites.";
  scene+=step(.2,box(38,79,242,145,"#d9e8fa",24)+txt(159,132,"STRUCTURE",22)+txt(159,171,"clear guidance",17,K.muted));
  scene+=step(.5,box(373,79,242,145,"#d7eee5",24)+txt(493,132,"AUTONOMY",22)+txt(493,171,"meaningful choice",17,K.muted));
  scene+=trace(.7,"M166 243 L492 243",K.purple,9);
  scene+=step(.91,'<path d="M327 243 300 326h54Z" fill="'+K.gold+'"/><circle class="km-turn" style="--km-delay:1.05s" cx="327" cy="243" r="21" fill="'+K.coral+'" stroke="#fff" stroke-width="6"/>');
  scene+=step(1.23,box(223,339,207,49,"#fff0ce",14)+txt(326,371,"ADAPT TO LEARNERS",17));
  break;
 }
 default: scene+=step(.2,box(120,110,420,183,"#dff0e7",25)+txt(330,207,"LEARN · REFLECT · APPLY",25));
 }
 const bg='<defs><filter id="km-shadow" x="-25%" y="-30%" width="150%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="9" flood-color="#1c4d4a" flood-opacity=".11"/></filter>'+
 '<pattern id="km-grain" width="29" height="29" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".6" fill="#8c9c8c" opacity=".22"/><circle cx="19" cy="11" r=".5" fill="#8c9c8c" opacity=".18"/></pattern></defs>'+
 '<rect width="660" height="410" rx="26" fill="#faf7f0"/><circle cx="602" cy="35" r="103" fill="#ddf0e5" opacity=".65"/>'+
 '<circle cx="37" cy="410" r="128" fill="#fce5d4" opacity=".48"/><rect width="660" height="410" rx="26" fill="url(#km-grain)"/>';
 return '<svg class="artwork knowles-vector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 410" role="img" aria-label="'+desc+'">'+bg+scene+'</svg>';
}
