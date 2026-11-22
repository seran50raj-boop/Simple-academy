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
 {id:'purpose',name:'Purpose',subtitle:'Why learn?',fill:'url(#goldTile)',x:194,y:121,sx:-154,sy:-48,delay:'0.35s',edges:{right:1,bottom:1}},
 {id:'experience',name:'Experience',subtitle:'What I know',fill:'url(#coralTile)',x:359,y:121,sx:154,sy:-48,delay:'1.60s',edges:{left:-1,bottom:-1}},
 {id:'autonomy',name:'Autonomy',subtitle:'My choices',fill:'url(#tealTile)',x:194,y:235,sx:-154,sy:65,delay:'2.85s',edges:{top:-1,right:-1}},
 {id:'relevance',name:'Relevance',subtitle:'Use it now',fill:'url(#blueTile)',x:359,y:235,sx:154,sy:65,delay:'4.10s',edges:{top:1,left:1}}
];
function buildPuzzleHeroSVG(){
 const pieces=PUZZLE_PIECES.map((p,i)=>{
   const path=puzzleOutline(p.x,p.y,165,114,p.edges),cx=p.x+82.5;
   const icon=i===0
    ?'<circle cx="'+cx+'" cy="'+(p.y+36)+'" r="14" fill="none" stroke="#FFF7EB" stroke-width="3.4"/><circle cx="'+cx+'" cy="'+(p.y+36)+'" r="5" fill="#FFF7EB"/><path d="M'+(cx+13)+' '+(p.y+36)+'l12-12" stroke="#FFF7EB" stroke-width="3.5" stroke-linecap="round"/>'
    :i===1
    ?'<path d="M'+(cx-16)+' '+(p.y+27)+'q11-6 18 2q9-8 19-2v25q-12-6-19 3q-9-9-18-3Z" stroke="#FFF7EB" stroke-width="3.2" fill="none" stroke-linejoin="round"/>'
    :i===2
    ?'<path d="M'+(cx-17)+' '+(p.y+36)+'h35m-10-10 10 10-10 10" stroke="#FFF7EB" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
    :'<path d="M'+(cx-18)+' '+(p.y+44)+'l11-13 12 8 14-19" stroke="#FFF7EB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
   return '<g class="puzzle-piece" data-piece="'+p.id+'" style="--start-x:'+p.sx+'px;--start-y:'+p.sy+'px;--start-delay:'+p.delay+'">'+
    '<path d="'+path+'" fill="'+p.fill+'" stroke="#FFF9EC" stroke-width="3.2" stroke-linejoin="round" />'+icon+
    '<text x="'+cx+'" y="'+(p.y+78)+'" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="17" font-weight="800" fill="#173E49">'+p.name+'</text>'+
    '<text x="'+cx+'" y="'+(p.y+94)+'" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11" font-weight="640" fill="#23565A">'+p.subtitle+'</text></g>';
 }).join('');
 const slots=PUZZLE_PIECES.map(p=>'<path d="'+puzzleOutline(p.x,p.y,165,114,p.edges)+'" fill="#D4C3AA" stroke="#AF9B83" stroke-width="2.4"/>').join('');
 return [
 '<svg class="puzzle-svg" viewBox="0 0 720 480" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="Four puzzle pieces labelled Purpose, Experience, Autonomy, and Relevance slide into four matching empty cutouts. Once assembled, the label Andragogy appears beneath the board.">',
 '<defs><linearGradient id="paperSky" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#E4F9F3"/><stop offset="1" stop-color="#A9DFE2"/></linearGradient>',
 '<linearGradient id="deskWood" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FBE6C8"/><stop offset="1" stop-color="#F2C89F"/></linearGradient>',
 '<linearGradient id="goldTile" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#FFDD62"/><stop offset="1" stop-color="#F2A83B"/></linearGradient>',
 '<linearGradient id="coralTile" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#FF9B75"/><stop offset="1" stop-color="#E96C52"/></linearGradient>',
 '<linearGradient id="tealTile" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#6AC9B3"/><stop offset="1" stop-color="#36A499"/></linearGradient>',
 '<linearGradient id="blueTile" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8DDAF7"/><stop offset="1" stop-color="#5AABDD"/></linearGradient>',
 '<pattern id="paperGrain" width="21" height="21" patternUnits="userSpaceOnUse"><circle cx="2" cy="5" r=".65" fill="#72574E" opacity=".25"/><circle cx="12" cy="13" r=".6" fill="#72574E" opacity=".22"/><circle cx="18" cy="8" r=".5" fill="#72574E" opacity=".17"/></pattern>',
 '<filter id="deskShadow" x="-25%" y="-25%" width="150%" height="155%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#62443A" flood-opacity=".19"/></filter></defs>',
 '<rect width="720" height="480" rx="24" fill="#FDF9F2"/>',
 '<path d="M0 0H720V173Q520 206 358 156Q150 95 0 171Z" fill="url(#paperSky)"/>',
 '<path d="M0 339Q170 311 339 345T720 335V480H0Z" fill="url(#deskWood)"/>',
 '<path d="M18 381Q220 354 702 380M35 424Q360 405 684 434M146 462Q420 441 643 463" stroke="#DAA879" stroke-width="2" stroke-linecap="round" opacity=".44" fill="none"/>',
 /* Editorial book and desk objects provide scene rather than anatomy. */
 '<g aria-hidden="true"><rect x="16" y="251" width="126" height="31" rx="7" fill="#2D5880" transform="rotate(-7 16 251)"/><rect x="21" y="248" width="119" height="23" rx="4" fill="#FFF8EB" transform="rotate(-7 21 248)"/><rect x="22" y="274" width="123" height="29" rx="5" fill="#EC7C5D" transform="rotate(-7 22 274)"/>',
 '<rect x="33" y="263" width="99" height="10" rx="2" fill="#F9E5C5" transform="rotate(-7 33 263)"/><path d="M30 286h91" stroke="#FFE8C7" stroke-width="4" stroke-linecap="round" transform="rotate(-7 30 286)"/></g>',
 '<g aria-hidden="true"><path d="M601 283q-9-17 0-41 8-14 15-25" stroke="#43866E" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M606 249q29-23 52-8-20 25-52 8ZM604 239q-28-9-30-35 27 8 30 35Z" fill="#6BB98D"/>',
 '<path d="M574 284h70l-9 73q-25 20-51 0Z" fill="#FAF5EC" stroke="#D5C5B2" stroke-width="3"/><path d="M579 293h61" stroke="#A5D8D8" stroke-width="5"/></g>',
 '<g aria-hidden="true"><ellipse cx="655" cy="403" rx="45" ry="11" fill="#977963" opacity=".18"/><path d="M625 366h61v34q-29 24-61 0Z" fill="#6EAFC3"/><path d="M688 375q26-2 18 16q-6 11-23 4" fill="none" stroke="#6EAFC3" stroke-width="8" stroke-linecap="round"/></g>',
 '<path d="M145 88Q258 45 397 72T581 83" fill="none" stroke="#FFFFFF" stroke-width="17" opacity=".45" stroke-linecap="round"/>',
 '<rect x="173" y="102" width="388" height="270" rx="27" fill="#FFF7EA" stroke="#D3B99B" stroke-width="4" filter="url(#deskShadow)"/>',
 '<rect x="184" y="111" width="366" height="252" rx="21" fill="#F7ECD9"/>',
 '<g class="puzzle-slots">',slots,'</g>',
 '<g class="puzzle-pieces">',pieces,'</g>',
 '<g class="puzzle-conclusion"><rect x="224" y="384" width="272" height="58" rx="25" fill="#FFF9EC" stroke="#3B7A75" stroke-width="3" filter="url(#deskShadow)"/>',
 '<text x="360" y="421" fill="#173F49" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="850" font-size="28">ANDRAGOGY</text></g>',
 '<rect width="720" height="480" fill="url(#paperGrain)" opacity=".24" pointer-events="none"/>',
 '</svg>'
 ].join('');
}
function renderAndragogyMotion(container,interaction){
 const figure=document.createElement('figure');
 figure.className='hero-scene approved-scene vector-hero';
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
