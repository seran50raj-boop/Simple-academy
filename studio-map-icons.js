/* SIMple Academy: concept-specific map illustrations consistent with the Foundations icons.
   These extend the shared icon palette without changing Module 01's artwork. */
(function(){
 const C='#F27850',Y='#F2B548',B='#96CBDB',G='#3E9D96',D='#5B4946',W='#FFF8EC';
 const icons={
  Framework:'<circle cx="32" cy="32" r="22" fill="'+B+'" opacity=".33"/>'+Array.from({length:6},(_,i)=>{const a=i*Math.PI/3, x=32+19*Math.cos(a),y=32+19*Math.sin(a);return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="8" fill="'+[C,Y,B,G,C,Y][i]+'"/>'}).join('')+'<circle cx="32" cy="32" r="9" fill="'+W+'" stroke="'+D+'" stroke-width="2"/>',
  Why:'<circle cx="32" cy="31" r="23" fill="'+Y+'"/><path d="M23 24a9 9 0 1 1 17 4c-2 4-8 5-8 12" stroke="'+W+'" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="32" cy="48" r="3" fill="'+W+'"/>',
  Relevance:'<circle cx="31" cy="32" r="23" fill="'+B+'"/><circle cx="31" cy="32" r="15" fill="'+W+'"/><circle cx="31" cy="32" r="6" fill="'+C+'"/><path d="m41 24 14-12m-1 0-1 12" stroke="'+D+'" stroke-width="3" fill="none" stroke-linecap="round"/>',
  Agency:'<circle cx="32" cy="13" r="9" fill="'+Y+'"/><path d="M17 49c0-14 7-20 15-20s15 6 15 20" fill="'+C+'"/><path d="M9 46l-5-7 5-7M55 46l5-7-5-7" stroke="'+B+'" stroke-width="4" fill="none" stroke-linecap="round"/>',
  Choice:'<path d="M30 55V35M30 35 11 18m19 17 22-17" fill="none" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="54" r="7" fill="'+Y+'"/><circle cx="11" cy="18" r="9" fill="'+C+'"/><circle cx="52" cy="18" r="9" fill="'+B+'"/>',
  Timing:'<circle cx="32" cy="32" r="23" fill="'+B+'"/><circle cx="32" cy="32" r="16" fill="'+W+'"/><path d="M32 20v13l9 7" fill="none" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="4" fill="'+C+'"/>',
  Readiness:'<rect x="12" y="11" width="41" height="42" rx="8" fill="'+B+'"/><rect x="12" y="19" width="41" height="9" fill="'+C+'"/><path d="M22 10v12m21-12v12" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="39" r="8" fill="'+Y+'"/>',
  Problems:'<circle cx="32" cy="32" r="22" fill="'+B+'"/><circle cx="32" cy="32" r="13" fill="'+W+'"/><circle cx="32" cy="32" r="6" fill="'+C+'"/><path d="m45 20 11-8" stroke="'+D+'" stroke-width="3" stroke-linecap="round"/>',
  Motives:'<path d="M32 52 12 32C0 17 20 7 32 23 44 7 64 17 52 32Z" fill="'+C+'"/><circle cx="32" cy="31" r="9" fill="'+Y+'"/><path d="m32 23 3 7 8 1-6 5 2 7-7-4-7 4 2-7-6-5 8-1Z" fill="'+W+'"/>',
  Matching:'<rect x="5" y="10" width="20" height="17" rx="5" fill="'+C+'"/><rect x="39" y="10" width="20" height="17" rx="5" fill="'+B+'"/><rect x="5" y="37" width="20" height="17" rx="5" fill="'+Y+'"/><rect x="39" y="37" width="20" height="17" rx="5" fill="'+G+'"/><path d="M25 18h14M25 46h14" stroke="'+D+'" stroke-width="3" stroke-linecap="round"/>',
  Combine:'<rect x="7" y="15" width="23" height="23" rx="4" fill="'+C+'"/><rect x="34" y="15" width="23" height="23" rx="4" fill="'+Y+'"/><rect x="20" y="37" width="25" height="22" rx="4" fill="'+B+'"/><path d="m18 24 4 4 4-7m14 5 4 4 5-8" stroke="'+W+'" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  Judgement:'<path d="M11 12h42v40H11z" fill="'+B+'" rx="6"/><path d="M22 25h21m-21 10h16" stroke="'+W+'" stroke-width="4" stroke-linecap="round"/><circle cx="44" cy="45" r="11" fill="'+Y+'"/><path d="m39 45 4 4 6-7" stroke="'+W+'" stroke-width="3" fill="none"/>',
  Nuance:'<path d="M32 5v51M12 19h40" stroke="'+D+'" stroke-width="3.5" stroke-linecap="round"/><path d="m12 19-8 17h16z" fill="'+C+'"/><path d="m52 19-8 17h16z" fill="'+B+'"/><path d="M22 55h20" stroke="'+Y+'" stroke-width="6" stroke-linecap="round"/>',
  Cycle:'<path d="M32 8a24 24 0 1 1-18 8" fill="none" stroke="'+G+'" stroke-width="7" stroke-linecap="round"/><path d="M10 9 10 24 25 16Z" fill="'+C+'"/><circle cx="32" cy="32" r="9" fill="'+Y+'"/>',
  Identify:'<rect x="11" y="12" width="43" height="39" rx="6" fill="'+B+'"/><circle cx="30" cy="30" r="12" fill="'+W+'"/><path d="m37 39 12 11" stroke="'+C+'" stroke-width="5" stroke-linecap="round"/>',
  Reflect:'<circle cx="27" cy="27" r="18" fill="'+B+'"/><circle cx="27" cy="27" r="10" fill="'+W+'"/><path d="m40 40 15 15" stroke="'+D+'" stroke-width="6" stroke-linecap="round"/><circle cx="25" cy="24" r="4" fill="'+C+'"/>',
  Observe:'<path d="M7 32c13-17 37-17 50 0-13 17-37 17-50 0Z" fill="'+B+'"/><circle cx="32" cy="32" r="12" fill="'+Y+'"/><circle cx="32" cy="32" r="5" fill="'+D+'"/>',
  Concept:'<path d="m32 6 26 47H6Z" fill="'+Y+'"/><circle cx="32" cy="34" r="10" fill="'+W+'"/><path d="M32 28v12" stroke="'+C+'" stroke-width="4"/>',
  Match:'<rect x="6" y="14" width="22" height="18" rx="5" fill="'+C+'"/><rect x="37" y="33" width="22" height="18" rx="5" fill="'+B+'"/><path d="m27 23 11 18" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="4" fill="'+Y+'"/>',
  Experiment:'<path d="M14 52V12m0 40h41" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/><path d="m19 43 12-14 11 7 10-19" stroke="'+G+'" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="52" cy="17" r="5" fill="'+C+'"/>',
  Sequence:'<rect x="7" y="13" width="13" height="37" rx="4" fill="'+C+'"/><rect x="25" y="13" width="13" height="37" rx="4" fill="'+Y+'"/><rect x="43" y="13" width="13" height="37" rx="4" fill="'+B+'"/>',
  Spiral:'<path d="M32 31c-11-11-23 12-5 20C49 61 63 33 45 17 24-1 2 14 8 34" stroke="'+G+'" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="32" cy="31" r="6" fill="'+C+'"/>',
  Styles:'<rect x="5" y="11" width="25" height="42" rx="6" fill="'+C+'"/><rect x="34" y="11" width="25" height="42" rx="6" fill="'+B+'"/><path d="M17 23v18M46 23v18" stroke="'+W+'" stroke-width="5"/>',
  Choose:'<path d="M17 49 32 14l15 35" fill="none" stroke="'+Y+'" stroke-width="10" stroke-linejoin="round"/><circle cx="17" cy="49" r="8" fill="'+C+'"/><circle cx="47" cy="49" r="8" fill="'+B+'"/><circle cx="32" cy="14" r="8" fill="'+G+'"/>',
  Design:'<rect x="9" y="10" width="46" height="45" rx="7" fill="'+B+'"/><path d="M20 22h23M20 31h18M20 41h12" stroke="'+W+'" stroke-width="4" stroke-linecap="round"/><circle cx="47" cy="47" r="9" fill="'+C+'"/>',
  Transfer:'<path d="M31 54V23m0 0-20-14m20 14 21-14" fill="none" stroke="'+G+'" stroke-width="7" stroke-linecap="round"/><circle cx="31" cy="55" r="8" fill="'+Y+'"/><circle cx="11" cy="9" r="8" fill="'+C+'"/><circle cx="52" cy="9" r="8" fill="'+B+'"/>',
  Loop:'<path d="M31 10a23 23 0 1 1-21 15" stroke="'+G+'" stroke-width="7" fill="none" stroke-linecap="round"/><path d="m9 11 2 17 15-9Z" fill="'+C+'"/>',
  Target:'<circle cx="32" cy="32" r="24" fill="'+C+'"/><circle cx="32" cy="32" r="15" fill="'+W+'"/><circle cx="32" cy="32" r="7" fill="'+B+'"/>',
  Spot:'<circle cx="28" cy="28" r="18" fill="'+B+'"/><circle cx="28" cy="28" r="10" fill="'+W+'"/><path d="m40 40 14 14" stroke="'+C+'" stroke-width="6" stroke-linecap="round"/>',
  Pause:'<rect x="14" y="9" width="14" height="47" rx="4" fill="'+C+'"/><rect x="36" y="9" width="14" height="47" rx="4" fill="'+C+'"/>',
  Coach:'<path d="M8 11h48v33H31L18 56V44H8Z" fill="'+Y+'"/><path d="M17 24h30m-30 9h23" stroke="'+W+'" stroke-width="4" stroke-linecap="round"/>',
  Rewind:'<path d="M22 14 8 31l14 17V14Zm29 0L37 31l14 17V14Z" fill="'+B+'"/><path d="M29 21v21" stroke="'+D+'" stroke-width="3" stroke-linecap="round"/>',
  Arrange:'<rect x="9" y="9" width="46" height="46" rx="7" fill="'+B+'"/><path d="M21 20h25M21 32h25M21 44h25" stroke="'+W+'" stroke-width="4" stroke-linecap="round"/>',
  Mastery:'<path d="M11 52h14V37h14V23h14V9" stroke="'+G+'" stroke-width="7" stroke-linejoin="round" fill="none"/><circle cx="51" cy="10" r="7" fill="'+Y+'"/>',
  Advance:'<path d="M13 50h14V34h14V19h15" stroke="'+G+'" stroke-width="8" fill="none"/><path d="m46 10 12 9-12 9" fill="'+C+'"/>',
  Compare:'<path d="M32 8v47M8 21h48" stroke="'+D+'" stroke-width="4"/><path d="m14 21-9 19h18z" fill="'+C+'"/><path d="m50 21-9 19h18z" fill="'+B+'"/>'
 };
 Object.assign(mapIconShapes,icons);
})();