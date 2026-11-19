/* Simple Academy art system — coherent, flat, editorial SVG scenes.
   Anatomy principle: visible shoulders connect to arms; the shared board deliberately
   obscures lower bodies instead of guessing bent-leg poses. */
const svgDefs = `
<defs>
  <filter id="paperShadow" x="-25%" y="-30%" width="150%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="9" flood-color="#61443A" flood-opacity=".12"/></filter>
  <pattern id="matteGrain" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="3" cy="5" r=".75" fill="#8F624C" opacity=".2"/><circle cx="12" cy="14" r=".6" fill="#8F624C" opacity=".18"/></pattern>
</defs>`;
const svgWrap = (body,label) => '<svg class="art editorial-art" viewBox="0 0 640 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+label+'">'+svgDefs+'<rect width="640" height="440" fill="#FFFFFF" />'+body+'<rect width="640" height="440" fill="url(#matteGrain)" opacity=".22" pointer-events="none"/></svg>';
const iconCard = (x,y,w,h,fill,inside) => `<g filter="url(#paperShadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="19" fill="${fill}"/>${inside}</g>`;
const scenes = {
 journey: () => `
  <path d="M89 352Q165 62 329 107Q468 115 538 328" fill="none" stroke="#E8F4EF" stroke-width="84" stroke-linecap="round"/>
  <path d="M111 343Q183 161 329 202Q456 219 515 323" fill="none" stroke="#D8906A" stroke-width="8" stroke-dasharray="14 19" stroke-linecap="round"/>
  <circle cx="117" cy="332" r="40" fill="#EA7950"/>
  <circle cx="328" cy="198" r="44" fill="#9BCAD9"/>
  <circle cx="520" cy="324" r="43" fill="#F0AD4A"/>
  <path d="M96 335l14 14 24-31M308 199l13 14 24-31M500 324l13 14 24-31" stroke="#FFF7ED" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="328" cy="86" r="25" fill="#EAB58E"/><path d="M302 111Q325 100 352 111L363 150H295Z" fill="#85B5BB"/>
  <path d="M312 148L302 174M344 148l12 28" stroke="#85B5BB" stroke-width="13" stroke-linecap="round"/> `,
 experience: () => `
  <path d="M107 137Q247 30 469 139Q536 197 506 349H103Z" fill="#E8F5F0"/>
  ${iconCard(94,115,135,188,'#F2AB44','<path d="M123 170h78m-78 24h52m-52 24h65" stroke="#FFF8EE" stroke-width="8" stroke-linecap="round"/>')}
  ${iconCard(246,82,145,218,'#EE7746','<circle cx="317" cy="161" r="34" fill="#FFF4E7"/><path d="M289 232h60" stroke="#FFF4E7" stroke-width="9" stroke-linecap="round"/>')}
  ${iconCard(409,133,125,177,'#91C9DB','<path d="M438 194l26-31 39 25-35 48Z" fill="#FFF8EF"/>')}
  <path d="M136 335Q310 389 501 330" fill="none" stroke="#7FAE9E" stroke-width="5" stroke-dasharray="8 15" stroke-linecap="round"/> `,
 guidance: () => `
  <path d="M86 345Q157 79 336 139T544 255" fill="none" stroke="#E8F4EF" stroke-width="100" stroke-linecap="round"/>
  <path d="M104 344Q192 172 295 190T524 184" stroke="#F2AA43" stroke-width="20" stroke-linecap="round" fill="none" stroke-dasharray="25 18"/>
  ${iconCard(68,279,108,104,'#E8774B','<circle cx="122" cy="329" r="20" fill="#FFF6EB"/>')}
  ${iconCard(284,135,110,110,'#9CCDDC','<path d="M310 180l21 21 36-40" stroke="#FFFFFF" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')}
  ${iconCard(465,102,110,110,'#D08465','<path d="M488 163h62m-31-30v60" stroke="#FFF5E9" stroke-width="10" stroke-linecap="round"/>')} `,
 lenses: () => `
  <circle cx="220" cy="211" r="122" fill="#ECA955" opacity=".83"/>
  <circle cx="370" cy="211" r="122" fill="#8BC4D9" opacity=".87"/>
  <circle cx="295" cy="297" r="122" fill="#EA825B" opacity=".88"/>
  <circle cx="292" cy="246" r="33" fill="#FFF5EB"/>
  <path d="M278 247l12 12 26-31" stroke="#755049" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="220" cy="211" r="122" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".7"/>
  <circle cx="370" cy="211" r="122" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".7"/>
  <circle cx="295" cy="297" r="122" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".7"/> `,
 safety: () => `
  <path d="M308 62L488 130L485 258Q476 349 310 399Q143 348 134 258L131 130Z" fill="#8ECADB" filter="url(#paperShadow)"/>
  <path d="M310 100L453 152L449 259Q441 326 310 369Q180 327 175 259L170 152Z" fill="#F8F6EE"/>
  <path d="M233 238l57 60 108-117" stroke="#E8764C" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="513" cy="124" r="36" fill="#F4B24B"/><path d="M498 124h30m-15-15v30" stroke="#FFF" stroke-width="8" stroke-linecap="round"/> `,
 meaning: () => `
  <ellipse cx="320" cy="362" rx="228" ry="24" fill="#875B4A" opacity=".11"/>
  <path d="M320 118Q218 57 99 112V338Q228 292 320 367Z" fill="#F4AD47" filter="url(#paperShadow)"/>
  <path d="M320 118Q417 58 541 109V337Q406 296 320 367Z" fill="#92C6D9" filter="url(#paperShadow)"/>
  <path d="M320 118V367" stroke="#FFF8F1" stroke-width="10"/>
  <path d="M143 151Q211 125 279 166M143 189Q211 165 278 201M143 226Q211 205 277 241" fill="none" stroke="#FFF2E4" stroke-width="10" stroke-linecap="round"/>
  <path d="M363 151Q433 122 495 152M365 190Q433 164 495 190M365 228Q433 201 495 226" fill="none" stroke="#EAF6F7" stroke-width="10" stroke-linecap="round"/> `,
 history: () => `
  <path d="M91 290H557" stroke="#C9DAD3" stroke-width="14" stroke-linecap="round"/>
  <path d="M92 285H540" stroke="#E97B50" stroke-width="6" stroke-linecap="round"/>
  <circle cx="196" cy="292" r="22" fill="#E97748" stroke="#FFF" stroke-width="7"/>
  <circle cx="443" cy="292" r="22" fill="#8CC7D9" stroke="#FFF" stroke-width="7"/>
  ${iconCard(122,104,155,145,'#F4AE4C','<path d="M154 149h84m-84 28h60m-60 28h75" stroke="#FFF5E9" stroke-width="9" stroke-linecap="round"/>')}
  ${iconCard(367,96,154,160,'#97CADB','<circle cx="443" cy="156" r="32" fill="#FFF4EB"/><path d="M408 223h72" stroke="#FFF6E9" stroke-width="9" stroke-linecap="round"/>')}
  <text x="198" y="349" text-anchor="middle" font-size="24" font-weight="800" fill="#7A4B3D" font-family="Segoe UI,Arial,sans-serif">1833</text>
  <text x="443" y="349" text-anchor="middle" font-size="24" font-weight="800" fill="#7A4B3D" font-family="Segoe UI,Arial,sans-serif">Modern</text> `,
 spectrum: () => `
  <rect x="83" y="160" width="480" height="122" rx="61" fill="#ECF2ED"/>
  <rect x="89" y="167" width="154" height="108" rx="54" fill="#EDA94C"/>
  <rect x="242" y="167" width="152" height="108" fill="#E7825A"/>
  <rect x="393" y="167" width="163" height="108" rx="54" fill="#97CADA"/>
  <circle cx="169" cy="221" r="31" fill="#FFF7ED"/><circle cx="319" cy="221" r="31" fill="#FFF7ED"/><circle cx="475" cy="221" r="31" fill="#FFF7ED"/>
  <path d="M169 212v18m-9-9h18M304 220h30M463 208l24 13-24 13" stroke="#794C40" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M110 319Q314 362 531 319" fill="none" stroke="#CEDBD4" stroke-width="5" stroke-dasharray="5 14" stroke-linecap="round"/> `,
 simulation: () => `
  <rect x="85" y="88" width="470" height="276" rx="32" fill="#EDF7F4"/>
  <path d="M123 312H517" stroke="#74534A" stroke-width="12" stroke-linecap="round"/>
  <rect x="154" y="202" width="330" height="103" rx="24" fill="#9DCBD8"/>
  <rect x="175" y="193" width="89" height="38" rx="19" fill="#FAF5EE"/>
  <path d="M236 244Q290 226 385 244" stroke="#E9B595" stroke-width="38" fill="none" stroke-linecap="round"/>
  <circle cx="220" cy="238" r="24" fill="#E9B595"/>
  <rect x="414" y="109" width="92" height="70" rx="13" fill="#305D58"/>
  <path d="M425 147h15l7-20 9 35 8-14h25" stroke="#A7E8C4" fill="none" stroke-width="5" stroke-linejoin="round"/>
  <path d="M310 172l14-35 14 35" stroke="#EF7A4F" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="325" cy="115" r="30" fill="#F2AF4C"/><path d="M316 114h18m-9-9v18" stroke="#FFF8EC" stroke-width="7" stroke-linecap="round"/> `,
 summary: () => `
  <circle cx="317" cy="211" r="158" fill="#E9F4EF"/>
  <path d="M163 170L307 106L372 172L275 220L225 258Z" fill="#EF7747"/>
  <path d="M307 106L448 179L399 290L275 220L372 172Z" fill="#9ACDDD"/>
  <path d="M225 258L275 220L399 290L302 366L171 288Z" fill="#F1B04B"/>
  <path d="M264 233l44 47 75-85" stroke="#FFF8ED" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M124 84l25 27M474 89l30 21M480 351l31-15M125 345l-26 22" stroke="#CE8A69" stroke-width="7" stroke-linecap="round" opacity=".68"/> `,
 structure: () => `
  <path d="M130 360V130Q320 75 505 130V360Z" fill="#E9F4F0"/>
  <rect x="180" y="155" width="270" height="165" rx="22" fill="#9CC9D8"/>
  <path d="M200 181l90 75 135-96" fill="none" stroke="#FFF9F0" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 304h220" stroke="#E9784B" stroke-width="18" stroke-linecap="round"/>
  <circle cx="310" cy="304" r="25" fill="#F3AE44" stroke="#FFF8EF" stroke-width="7"/> `,
 pathways: () => `
  <circle cx="320" cy="90" r="28" fill="#F5AB43"/>
  <path d="M319 122V157M319 157Q161 156 151 292M319 157Q484 157 490 292" fill="none" stroke="#C8E4DD" stroke-width="15" stroke-linecap="round"/>
  <path d="M319 122V157M319 157Q161 156 151 292M319 157Q484 157 490 292" fill="none" stroke="#E67F55" stroke-width="6" stroke-dasharray="13 18" stroke-linecap="round"/>
  <circle cx="151" cy="292" r="36" fill="#9BCADD"/><circle cx="490" cy="292" r="36" fill="#F4B14B"/>
  <path d="M151 327Q208 388 319 386Q428 387 490 327" fill="none" stroke="#BFD8CE" stroke-width="12" stroke-linecap="round"/>
  <circle cx="320" cy="386" r="31" fill="#E97D53"/>
  <path d="M306 387l10 11 20-25" stroke="#FFF9EF" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/> `,
 knowles: () => `
  <circle cx="318" cy="206" r="147" fill="#EAF5F2"/>
  <rect x="177" y="113" width="282" height="198" rx="28" fill="#F2AC49" filter="url(#paperShadow)"/>
  <rect x="203" y="141" width="230" height="149" rx="19" fill="#FFF8EE"/>
  <circle cx="320" cy="199" r="36" fill="#9BCBDB"/>
  <path d="M263 258Q319 223 378 258" fill="none" stroke="#E7774A" stroke-width="18" stroke-linecap="round"/>
  <path d="M215 340H424" stroke="#CA8370" stroke-width="8" stroke-linecap="round"/> `
};
function artFor(key){
 const scene=(scenes[key]||scenes.summary)();
 const labels={
  experience:'Different experiences represented by three brightly coloured learning cards',
  journey:'Different learning paths with clear learning waypoints',
  guidance:'An educator-guided pathway with several choices',
  lenses:'Three overlapping coloured lenses showing flexible assumptions',
  safety:'A stable safety shield with a clear check mark',
  meaning:'An open book symbolising the meaning of adult learning',
  history:'Two points on the history of andragogy',
  knowles:'A simplified history document with portrait symbol',
  spectrum:'A continuum showing educator, shared and learner direction',
  structure:'A structured pathway with a choice marker',
  simulation:'A clinical simulation bed, monitor and standards symbol',
  pathways:'Two different learning routes leading to the same check mark',
  summary:'Three learning pieces with one outcome'
 };
 return svgWrap(scene,labels[key]||'Concept illustration');
}
