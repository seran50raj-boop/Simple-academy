/* Repeatable instructional motion, not decorative looping video.
   Eight information cards have clear one-time narrative animation.
   The six question cards stay visually distinct: answer feedback is their motion. */
const lessonSceneActions={
 journey:{label:'Trace the learning path',meaning:'The learner moves through resources and chooses a route rather than being pushed down a single fixed sequence.'},
 lenses:{label:'Explore the overlapping assumptions',meaning:'Three perspectives converge: assumptions guide interpretation without becoming rigid rules.'},
 meaning:{label:'Open the learning idea',meaning:'Guidance opens up learning possibilities; adult learning does not mean teaching disappears.'},
 history:{label:'Reveal the timeline',meaning:'A chronological marker moves from Kapp in 1833 to the later modern Knowles model.'},
 spectrum:{label:'Move along the spectrum',meaning:'The learning decision shifts from educator-led to shared, then learner-led, and settles on a negotiated middle.'},
 simulation:{label:'Compare practice choices',meaning:'Two practice routes are revealed beneath one unchanging simulation safety standard.'},
 summary:{label:'Connect the three ideas',meaning:'Learner, experience and purposeful choice come together into one coherent learning design.'}
};
const SVG_MOTION_OVERLAYS={
 journey:'<g class="motion-learner" aria-hidden="true"><circle cx="193" cy="255" r="16" fill="#FFFFFF" stroke="#285C56" stroke-width="5"/><circle cx="193" cy="255" r="6" fill="#F2B94B"/></g>',
 history:'<g class="motion-history-point" aria-hidden="true"><circle cx="196" cy="291" r="11" fill="#FFF9EF" stroke="#315B58" stroke-width="4"/></g><text x="197" y="384" text-anchor="middle" font-size="16" font-family="Segoe UI,Arial,sans-serif" fill="#805247">Kapp</text><text x="444" y="384" text-anchor="middle" font-size="16" font-family="Segoe UI,Arial,sans-serif" fill="#315E62">Knowles</text>',
 spectrum:'<g class="motion-spectrum-token" aria-hidden="true"><path d="M157 311l12-17 12 17Z" fill="#315E62"/><circle cx="169" cy="332" r="8" fill="#315E62"/></g>',
 simulation:'<g class="motion-sim-a" aria-hidden="true"><rect x="155" y="329" width="146" height="45" rx="14" fill="#F2B64D"/><text x="228" y="358" text-anchor="middle" font-size="15" font-family="Segoe UI,Arial,sans-serif" font-weight="800" fill="#284B49">Practice A</text></g><g class="motion-sim-b" aria-hidden="true"><rect x="336" y="329" width="146" height="45" rx="14" fill="#8FC6D5"/><text x="409" y="358" text-anchor="middle" font-size="15" font-family="Segoe UI,Arial,sans-serif" font-weight="800" fill="#284B49">Practice B</text></g>'
};
function renderConceptArtwork(container,card){
 const panel=document.createElement('div');
 panel.className='art-panel';panel.dataset.art=card.art;
 panel.innerHTML=artFor(card.art);
 const svg=panel.querySelector('svg');
 if(svg&&SVG_MOTION_OVERLAYS[card.art]){
  svg.insertAdjacentHTML('beforeend',SVG_MOTION_OVERLAYS[card.art]);
 }
 const badge=document.createElement('span');badge.className='art-topic';badge.textContent=card.word;
 panel.appendChild(badge);container.replaceChildren(panel);
 return panel;
}
function addConceptAction(interaction,card,panel){
 if(card.q||!lessonSceneActions[card.art])return;
 const activity=lessonSceneActions[card.art];
 const controls=document.createElement('div');controls.className='scene-controls';
 const button=document.createElement('button');button.type='button';button.className='scene-action';
 button.textContent=activity.label+' ↻';button.setAttribute('aria-label',activity.label);
 const hint=document.createElement('span');hint.className='scene-caption';
 hint.textContent='One-time demonstration · replay whenever you want';
 const explanation=document.createElement('p');explanation.className='motion-explanation';
 explanation.textContent=activity.meaning;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function play(){
  if(reduce)return;
  panel.classList.remove('is-playing');void panel.offsetWidth;panel.classList.add('is-playing');
 }
 button.addEventListener('click',play);
 if(reduce){button.hidden=true;hint.textContent='Still illustration · reduced motion';}
 controls.append(button,hint);interaction.append(controls,explanation);
 if(!reduce)requestAnimationFrame(play);
}
