/* Single coordinate source for route and markers: exact alignment on all screen widths. */
function renderCourseMap(nav,cards,furthest,go){
 const ns='http://www.w3.org/2000/svg';
 const desktop=cards.map((_,i)=>{const row=Math.floor(i/4),col=row%2?3-i%4:i%4;return{x:12+col*(76/3),y:10+row*25}});
 const mobile=cards.map((_,i)=>{const row=Math.floor(i/2),col=row%2?1-i%2:i%2;return{x:col?76:24,y:6.8+row*14.4}});
 const pathData=pts=>{
  const coord=p=>[(p.x*10).toFixed(3),(p.y*10).toFixed(3)].join(' ');
  let d='M'+coord(pts[0]);
  for(let i=1;i<pts.length;i++){
    const a=pts[i-1],b=pts[i];
    if(Math.abs(a.x-b.x)<.001&&b.y>a.y){
      const outside=a.x>50?10:-10;
      const bend=a.x+outside,dy=b.y-a.y;
      d+=' C'+(bend*10).toFixed(3)+' '+((a.y+.23*dy)*10).toFixed(3);
      d+=' '+(bend*10).toFixed(3)+' '+((b.y-.23*dy)*10).toFixed(3)+' '+coord(b);
    }else d+=' L'+coord(b);
  }
  return d;
 };
 const svg=document.createElementNS(ns,'svg');
 svg.setAttribute('class','aligned-route');
 svg.setAttribute('viewBox','0 0 1000 1000');
 svg.setAttribute('preserveAspectRatio','none');
 svg.setAttribute('aria-hidden','true');
 for(const [kind,coords] of [['desktop',desktop],['mobile',mobile]]){
  const path=document.createElementNS(ns,'path');
  path.setAttribute('class','aligned-route-'+kind);
  path.setAttribute('d',pathData(coords));
  path.setAttribute('fill','none');
  path.setAttribute('stroke','#BFCFC7');
  path.setAttribute('stroke-width','8');
  path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-dasharray','3 17');
  svg.appendChild(path);
 }
 nav.replaceChildren(svg);
 cards.forEach((c,i)=>{
  const unlocked=i<=furthest,status=!unlocked?'locked':i<furthest?'visited':'available';
  const btn=document.createElement('button');
  btn.type='button';btn.className='stop '+status;btn.disabled=!unlocked;
  btn.style.setProperty('--desktop-x',desktop[i].x+'%');
  btn.style.setProperty('--desktop-y',desktop[i].y+'%');
  btn.style.setProperty('--mobile-x',mobile[i].x+'%');
  btn.style.setProperty('--mobile-y',mobile[i].y+'%');
  btn.setAttribute('aria-label',c.word+', '+(c.q?'question':'learning')+' card, '+(unlocked?'unlocked':'locked'));
  if(i===furthest)btn.setAttribute('aria-current','step');
  const marker=document.createElement('span');marker.className='stop-marker';
  marker.textContent=c.q?'?':'▤';marker.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.className='stop-word';label.textContent=c.word;
  const kind=document.createElement('span');kind.className='stop-kind';kind.textContent=c.q?'Question':'Learning';
  btn.append(marker,label,kind);btn.addEventListener('click',()=>go(i));nav.append(btn);
 });
}
