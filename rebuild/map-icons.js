/* SIMple Academy — original concept-specific, anatomy-free editorial map icons.
   These are scalable SVGs: no font glyphs, stock icons, external resources or detailed human anatomy.
   Colours deliberately match the faceless editorial course palette. */
const mapIconPalette={
 coral:'#F27850',orange:'#E88E55',mustard:'#F2B548',
 sky:'#96CBDB',teal:'#3E9D96',ink:'#5B4946',paper:'#FFF8EC'
};
const mapIconShapes={
 Andragogy: `
  <path d="M11 15h17v7c-4-4-9-1-9 3s5 7 9 3v9H11z" fill="#F27850"/>
  <path d="M28 15h22v21H41c4 4 1 9-3 9s-7-5-3-9h-7v-8c-4 4-9 1-9-3s5-7 9-3z" fill="#F2B548"/>
  <path d="M12 42h15m21 0h6" stroke="#5B4946" stroke-width="3" stroke-linecap="round" opacity=".5"/>`,
 Experience: `
  <rect x="9" y="15" width="30" height="34" rx="5" transform="rotate(-9 9 15)" fill="#9BCFDC"/>
  <rect x="16" y="12" width="32" height="38" rx="6" transform="rotate(6 16 12)" fill="#F2B548"/>
  <rect x="22" y="11" width="32" height="40" rx="6" fill="#F27850"/>
  <circle cx="38" cy="24" r="7" fill="#FFF7ED"/>
  <path d="M29 38h17m-17 6h11" stroke="#FFF7ED" stroke-width="3" stroke-linecap="round"/>`,
 Learner: `
  <circle cx="28" cy="21" r="10" fill="#F2B548"/>
  <path d="M12 52v-7c0-12 9-18 17-18s17 6 17 18v7Z" fill="#F27850"/>
  <circle cx="48" cy="18" r="9" fill="#96CBDB"/>
  <path d="M48 12v12m-6-6h12" stroke="#FFF8EC" stroke-width="3.5" stroke-linecap="round"/>`,
 Guidance: `
  <path d="M32 10v46" stroke="#5B4946" stroke-width="4" stroke-linecap="round"/>
  <path d="M32 14H9l6 10-6 10h23z" fill="#F27850"/>
  <path d="M32 30h24l-6 10 6 10H32z" fill="#96CBDB"/>
  <circle cx="32" cy="11" r="5" fill="#F2B548"/>`,
 Assumptions: `
  <circle cx="25" cy="25" r="14" fill="#F2B548" opacity=".88"/>
  <circle cx="39" cy="25" r="14" fill="#96CBDB" opacity=".88"/>
  <circle cx="32" cy="39" r="14" fill="#F27850" opacity=".9"/>
  <circle cx="32" cy="30" r="5" fill="#FFF8EC"/>`,
 Safety: `
  <path d="M32 7 50 14v17c0 14-9 21-18 26-9-5-18-12-18-26V14Z" fill="#96CBDB"/>
  <path d="m23 32 7 8 14-17" stroke="#FFF8EC" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="50" cy="13" r="8" fill="#F2B548"/>`,
 Meaning: `
  <path d="M32 17c-9-8-17-8-25-5v33c10-3 18-1 25 5Z" fill="#F2B548"/>
  <path d="M32 17c9-8 17-8 25-5v33c-10-3-18-1-25 5Z" fill="#96CBDB"/>
  <path d="M32 17v33" stroke="#FFF8EC" stroke-width="4" stroke-linecap="round"/>
  <path d="M14 24h11m-11 7h11m14-7h11m-11 7h11" stroke="#FFF8EC" stroke-width="3" stroke-linecap="round"/>`,
 History: `
  <path d="M8 43h48" stroke="#5B4946" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="16" cy="43" r="5" fill="#F27850"/>
  <circle cx="47" cy="43" r="5" fill="#96CBDB"/>
  <path d="M16 36V22m31 14V22" stroke="#5B4946" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="31" cy="18" r="11" fill="#F2B548"/>
  <path d="M31 12v7l5 3" stroke="#FFF8EC" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 Knowles: `
  <rect x="15" y="8" width="34" height="47" rx="5" fill="#96CBDB"/>
  <path d="M22 8v47" stroke="#FFF8EC" stroke-width="3"/>
  <path d="M32 22v20m13-20L33 32l12 10" fill="none" stroke="#5B4946" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M49 8v13l-6-4-6 4V8" fill="#F27850"/>`,
 Spectrum: `
  <rect x="6" y="22" width="52" height="19" rx="9.5" fill="#F2B548"/>
  <path d="M25 22h15v19H25z" fill="#F27850"/>
  <path d="M40 22h8c5 0 10 4 10 9.5s-5 9.5-10 9.5h-8Z" fill="#96CBDB"/>
  <circle cx="38" cy="31.5" r="13" fill="#FFF8EC" stroke="#5B4946" stroke-width="2.5"/>
  <path d="m33 31 4 4 7-8" fill="none" stroke="#3E9D96" stroke-width="3" stroke-linecap="round"/>`,
 Structure: `
  <rect x="11" y="34" width="18" height="17" rx="3" fill="#F27850"/>
  <rect x="34" y="34" width="18" height="17" rx="3" fill="#F2B548"/>
  <rect x="22" y="13" width="18" height="17" rx="3" fill="#96CBDB"/>
  <path d="M9 54h46" stroke="#5B4946" stroke-width="3" stroke-linecap="round"/>`,
 Simulation: `
  <rect x="9" y="10" width="46" height="33" rx="5" fill="#96CBDB"/>
  <rect x="13" y="14" width="38" height="25" rx="3" fill="#345B58"/>
  <path d="M16 27h8l4-8 5 14 4-6h11" fill="none" stroke="#B8E6C6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M32 43v9m-12 0h24" stroke="#5B4946" stroke-width="4" stroke-linecap="round"/>
  <circle cx="49" cy="12" r="5" fill="#F27850"/>`,
 Pathways: `
  <circle cx="13" cy="32" r="6" fill="#F27850"/>
  <path d="M20 32c11 0 10-15 23-15m-23 15c11 0 10 15 23 15" stroke="#96CBDB" stroke-width="6" stroke-linecap="round" fill="none"/>
  <circle cx="44" cy="17" r="7" fill="#F2B548"/>
  <circle cx="44" cy="47" r="7" fill="#3E9D96"/>
  <path d="m42 17 2 2 4-5m-6 33 2 2 4-5" stroke="#FFF8EC" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
 Remember: `
  <rect x="9" y="12" width="46" height="42" rx="8" fill="#F2B548"/>
  <rect x="15" y="7" width="34" height="12" rx="5" fill="#F27850"/>
  <path d="m18 31 4 4 7-9m5 5 4 4 7-9m-27 17h28" stroke="#FFF8EC" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
};
function mapIcon(key){
 const shapes=mapIconShapes[key]||mapIconShapes.Andragogy;
 return '<svg class="map-symbol" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">'+shapes+'</svg>';
}
