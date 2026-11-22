/* SIMple Academy — actual moving-puzzle media for Foundations Card 1.
   This plays the approved 4-second animation, not a still-frame effect.
   The course map, progress and question-answer code are intentionally untouched. */
function renderAndragogyMotion(container,interaction){
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const figure=document.createElement('figure');
 figure.className='hero-scene approved-scene animated-hero';
 const video=document.createElement('video');
 video.className='puzzle-motion-video';
 video.src='./assets/andragogy-card1-motion.mp4';
 video.width=400;
 video.height=224;
 video.muted=true;
 video.defaultMuted=true;
 video.playsInline=true;
 video.autoplay=!reduce;
 video.loop=!reduce;
 video.preload='auto';
 video.controls=false;
 video.setAttribute('playsinline','');
 video.setAttribute('aria-label','Four faceless adult collaborators assemble a brightly coloured Andragogy puzzle; the centre piece moves into place and lifts out again');
 video.setAttribute('disablepictureinpicture','');
 figure.appendChild(video);
 const caption=document.createElement('figcaption');
 caption.className='art-caption';
 caption.textContent='Purpose · Experience · Autonomy · Relevance';
 figure.appendChild(caption);
 const fallback=document.createElement('p');
 fallback.className='motion-fallback';
 fallback.hidden=true;
 fallback.innerHTML='This browser could not play the motion. <a href="./assets/andragogy-card1-motion.mp4">Open the animation</a>.';
 figure.appendChild(fallback);
 container.appendChild(figure);

 const controls=document.createElement('div');
 controls.className='hero-motion-controls';
 const replay=document.createElement('button');
 replay.className='hero-motion-replay';
 replay.type='button';
 replay.textContent=reduce?'Play':'Replay ↻';
 replay.setAttribute('aria-label',reduce?'Play puzzle animation':'Replay puzzle animation');
 const toggle=document.createElement('button');
 toggle.className='hero-motion-toggle';
 toggle.type='button';
 toggle.textContent='Pause';
 toggle.setAttribute('aria-label','Pause animation');
 toggle.hidden=reduce;
 const status=document.createElement('span');
 status.className='hero-motion-caption';
 status.textContent=reduce?'Static by default · play when ready':'4-second moving-puzzle loop';
 status.setAttribute('role','status');
 function setPlaying(playing){
  toggle.textContent=playing?'Pause':'Play';
  toggle.setAttribute('aria-label',playing?'Pause animation':'Resume animation');
  replay.textContent='Replay ↻';
  replay.setAttribute('aria-label','Replay puzzle animation');
  status.textContent=playing?'Puzzle piece moving':(reduce?'Motion paused for accessibility':'Motion paused');
 }
 function playFromStart(){
  try{video.currentTime=0;}catch(_){}
  const result=video.play();
  if(result && result.catch)result.then(()=>setPlaying(true)).catch(()=>{
   toggle.hidden=false;
   toggle.textContent='Play';
   toggle.setAttribute('aria-label','Play animation');
   status.textContent='Autoplay blocked · press Play';
  });
 }
 replay.addEventListener('click',playFromStart);
 toggle.addEventListener('click',()=>{
  if(video.paused){playFromStart();}else{video.pause();setPlaying(false);}
 });
 video.addEventListener('error',()=>{fallback.hidden=false;status.textContent='Animation unavailable';replay.disabled=true;toggle.hidden=true;});
 video.addEventListener('playing',()=>setPlaying(true));
 video.addEventListener('pause',()=>setPlaying(false));
 controls.append(replay,toggle,status);
 interaction.appendChild(controls);
 if(!reduce){
  video.addEventListener('loadeddata',()=>{
   if(video.isConnected&&video.paused)video.play().catch(()=>{
    toggle.hidden=false;toggle.textContent='Play';toggle.setAttribute('aria-label','Play animation');
    status.textContent='Press Play to animate';
   });
  },{once:true});
 }else{
  video.addEventListener('loadeddata',()=>video.pause(),{once:true});
 }
 return video;
}
