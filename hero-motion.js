/* Accessible, truly-vector illustration: no video upscaling or raster masking.
   Geometrically reciprocal tabs/recesses share a single puzzle path function. */
function puzzleOutline(x,y,w,h,edges){
 const fmt=(a,b)=>a.toFixed(2)+' '+b.toFixed(2);
 const commands=['M'+fmt(x,y)];
 function edge(x1,y1,x2,y2,kind){
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),nx=dy/L,ny=-dx/L;
  const at=(t,n=0)=>fmt(x1+dx*t+nx*n,y1+dy*t+ny*n);
  if(!kind){commands.push('L'+at(1));return;}
  const d=kind*11;
  commands.push('L'+at(.32));
  commands.push('C'+at(.32,.62*d)+' '+at(.39,d)+' '+at(.5,d));
  commands.push('C'+at(.61,d)+' '+at(.68,.62*d)+' '+at(.68));
  commands.push('L'+at(1));
 }
 edge(x,y,x+w,y,edges.top||0);
 edge(x+w,y,x+w,y+h,edges.right||0);
 edge(x+w,y+h,x,y+h,edges.bottom||0);
 edge(x,y+h,x,y,edges.left||0);
 commands.push('Z');return commands.join(' ');
}
const PUZZLE_PIECES=[
 {id:'purpose',name:'Purpose',fill:'#F4B44D',x:178,y:151,sx:-70,sy:-67,delay:'0.3s',edges:{right:1,bottom:1}},
 {id:'experience',name:'Experience',fill:'#EF7E59',x:314,y:151,sx:71,sy:-62,delay:'1.6s',edges:{left:-1,bottom:-1}},
 {id:'autonomy',name:'Autonomy',fill:'#4BA89E',x:178,y:245,sx:-70,sy:58,delay:'2.9s',edges:{top:-1,right:-1}},
 {id:'relevance',name:'Relevance',fill:'#92CADA',x:314,y:245,sx:72,sy:56,delay:'4.2s',edges:{top:1,left:1}}
];
function buildPuzzleHeroSVG(){
 const slots=PUZZLE_PIECES.map(p=>'<path d="'+puzzleOutline(p.x,p.y,136,94,p.edges)+'" fill="#EEE4D7" stroke="#D9C9B7" stroke-width="2.1"/>').join('');
 const tiles=PUZZLE_PIECES.map(p=>{
  const x=p.x+68,y=p.y+56;
  return '<g class="puzzle-piece" data-piece="'+p.id+'" style="--start-x:'+p.sx+'px;--start-y:'+p.sy+'px;--start-delay:'+p.delay+'">'+
   '<path d="'+puzzleOutline(p.x,p.y,136,94,p.edges)+'" fill="'+p.fill+'" stroke="#FFF9F0" stroke-width="3" filter="url(#puzzleLift)"/>'+
   '<circle cx="'+x+'" cy="'+(y-22)+'" r="8" fill="none" stroke="#FFF7ED" stroke-width="2.5"/>'+
   '<text x="'+x+'" y="'+(y+11)+'" fill="#224B50" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="17" font-weight="800">'+p.name+'</text></g>';
 }).join('');
 return [
 '<svg class="puzzle-svg" viewBox="0 0 640 440" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="Four puzzle pieces physically move into precisely matching slots to connect Purpose, Experience, Autonomy and Relevance into Andragogy.">',
 '<defs><filter id="puzzleLift" x="-25%" y="-25%" width="150%" height="165%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#6A5144" flood-opacity=".17"/></filter>',
 '<pattern id="puzzleGrain" width="19" height="19" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r=".7" fill="#A17A6B" opacity=".23"/><circle cx="12" cy="14" r=".55" fill="#A17A6B" opacity=".2"/></pattern></defs>',
 '<rect width="640" height="440" rx="20" fill="#FCFAF5"/>',
 '<path d="M0 122Q94 2 215 45T481 34Q572 0 640 124V0H0Z" fill="#DFF3EC"/>',
 '<circle cx="562" cy="86" r="62" fill="#D5EDF0"/>',
 '<path d="M22 381Q103 292 189 369L165 439H0V391Z" fill="#FFDDC3"/>',
 /* Four stationary, deliberately faceless learners, anatomically simplified. */
 '<g aria-hidden="true"><path d="M52 267V179Q57 149 92 149Q129 149 140 186L153 260Z" fill="#EC794F"/>',
 '<ellipse cx="102" cy="126" rx="28" ry="30" fill="#EFAE8B"/><path d="M74 122Q68 98 98 97Q127 95 129 121Q105 109 84 120Z" fill="#695044"/>',
 '<path d="M136 194Q155 215 166 239" stroke="#EC794F" stroke-width="23" stroke-linecap="round" fill="none"/><ellipse cx="167" cy="240" rx="13" ry="8" fill="#EFAE8B"/></g>',
 '<g aria-hidden="true"><path d="M271 159V111Q279 80 312 79Q347 78 361 112V158Z" fill="#9BCDDC"/>',
 '<ellipse cx="316" cy="62" rx="27" ry="29" fill="#EFB18D"/><path d="M288 55Q286 28 313 29Q339 28 344 51Q325 42 301 56Z" fill="#704A3D"/></g>',
 '<g aria-hidden="true"><path d="M493 338V174Q497 143 535 139Q575 142 585 178V352H500Z" fill="#CB8167"/>',
 '<ellipse cx="537" cy="119" rx="26" ry="30" fill="#EDAE8E"/><path d="M507 130Q494 87 531 83Q571 79 569 135L549 161L550 111Q531 104 511 129Z" fill="#914D43"/></g>',
 '<g aria-hidden="true"><path d="M32 436Q31 361 83 353Q140 342 175 438Z" fill="#F2B247"/>',
 '<ellipse cx="96" cy="328" rx="28" ry="29" fill="#EDB391"/><path d="M68 332Q55 297 87 292Q119 287 130 318Q95 305 68 332Z" fill="#64493D"/></g>',
 '<rect x="156" y="127" width="316" height="238" rx="23" fill="#FFF7EB" stroke="#DFCFBB" stroke-width="4" filter="url(#puzzleLift)"/>',
 '<rect x="168" y="139" width="292" height="214" rx="17" fill="#FFFBF5"/>',
 '<g class="puzzle-slots">',slots,'</g>',
 '<g class="puzzle-pieces">',tiles,'</g>',
 '<g class="puzzle-conclusion"><rect x="231" y="217" width="178" height="58" rx="28" fill="#FFF9EE" stroke="#C9B5A0" stroke-width="2.7" filter="url(#puzzleLift)"/>',
 '<text x="320" y="251" fill="#1B464B" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="850" font-size="23">Andragogy</text></g>',
 '<rect width="640" height="440" fill="url(#puzzleGrain)" opacity=".29" pointer-events="none"/></svg>'
 ].join('');
}
function renderAndragogyMotion(container,interaction){
 const figure=document.createElement('figure');
 figure.className='hero-scene vector-hero';
 const panel=document.createElement('div');panel.className='hero-vector is-playing';
 panel.innerHTML=buildPuzzleHeroSVG();
 figure.appendChild(panel);
 const caption=document.createElement('figcaption');
 caption.className='art-caption';
 caption.textContent='Purpose · Experience · Autonomy · Relevance';
 figure.appendChild(caption);container.appendChild(figure);
 const controls=document.createElement('div');controls.className='hero-motion-controls';
 const replay=document.createElement('button');replay.type='button';replay.className='hero-motion-replay';
 replay.textContent='Replay illustration ↻';replay.setAttribute('aria-label','Replay puzzle assembly');
 const status=document.createElement('span');status.className='hero-motion-caption';
 status.textContent='Four pieces physically assemble; the completed picture stays put';
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  panel.classList.remove('is-playing');replay.hidden=true;status.textContent='Completed puzzle · reduced-motion mode';
 }
 replay.addEventListener('click',()=>{
  panel.classList.remove('is-playing');void panel.offsetWidth;panel.classList.add('is-playing');
 });
 controls.append(replay,status);interaction.appendChild(controls);
 return panel;
}
