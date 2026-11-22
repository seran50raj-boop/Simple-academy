/* Optional concept interactions. Only information cards offer replay;
   mandatory questions remain separate and never rely on animation to answer. */
const lessonSceneActions={
 journey:{label:'Trace the learning path',description:'Illustrates that adults can influence the route through learning'},
 lenses:{label:'Explore the overlapping assumptions',description:'Reveals that adult learning assumptions can overlap rather than act as fixed rules'},
 meaning:{label:'Open the learning idea',description:'Opens the two visual pages of the andragogy book'},
 history:{label:'Reveal the timeline',description:'Highlights two milestones in the history of andragogy'},
 spectrum:{label:'Move along the spectrum',description:'Demonstrates the changing balance between educator and learner direction'},
 simulation:{label:'Trace the monitor signal',description:'Highlights the clinical simulation context'},
 summary:{label:'Connect the three ideas',description:'Brings the three summary pieces together'}
};
function renderConceptArtwork(container,card){
 const panel=document.createElement('div');
 panel.className='art-panel';
 panel.dataset.art=card.art;
 panel.innerHTML=artFor(card.art);
 const badge=document.createElement('span');
 badge.className='art-topic';
 badge.textContent=card.word;
 panel.appendChild(badge);
 container.replaceChildren(panel);
 return panel;
}
function addConceptAction(interaction,card,panel){
 if(card.q||!lessonSceneActions[card.art])return;
 const activity=lessonSceneActions[card.art];
 const controls=document.createElement('div');
 controls.className='scene-controls';
 const button=document.createElement('button');
 button.type='button';button.className='scene-action';
 button.textContent=activity.label+' ↻';
 button.setAttribute('aria-label',activity.label);
 button.title=activity.description;
 button.addEventListener('click',()=>{
  panel.classList.remove('is-playing');
  void panel.offsetWidth;
  panel.classList.add('is-playing');
 });
 controls.appendChild(button);
 const hint=document.createElement('span');hint.className='scene-caption';
 hint.textContent='Optional illustration replay';
 controls.appendChild(hint);
 interaction.appendChild(controls);
}
