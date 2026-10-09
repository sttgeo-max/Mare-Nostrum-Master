const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== UNIFYING HUD BUTTONS (LAYOUT & SPACING) AND ALL SLIDING DRAWERS STYLING ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. SIMPLIFY VITALITY DRAWER (STATUS IMPERII): Keep clean overview & Imperial Talents
const startMarker = "Imperial Talents";
const p1 = js.indexOf(startMarker);
if (p1 !== -1) {
  const searchEnd = js.indexOf("VIEW TREE →", p1);
  if (searchEnd !== -1) {
    const talBtnEnd = js.indexOf(")]})", searchEnd) + 4;
    const modalCloseMarker = "n&&e.jsx(Ax,{player:a,onClose:()=>c(!1)})";
    const p3 = js.indexOf(modalCloseMarker);
    if (p3 !== -1) {
      js = js.substring(0, talBtnEnd) + "]}" + js.substring(p3 - 9);
      
    }
  }
}

// 2. SPEED UP MENU TRANSITION & REPLACE DARK BLUE BAR BACKDROP WITH FROSTED GLASS
const oldDrawerOverlay = `key:"imperium-menu-drawer",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.22},className:"fixed inset-0 z-[200] flex justify-end overflow-hidden pointer-events-none",children:[e.jsxs(ie.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 pointer-events-auto overflow-hidden",onClick:()=>_e(T.current||"MAP"),children:[e.jsx(RomanAtmosphericOverlay,{dense:!0,zIndex:0}),e.jsx("div",{className:"absolute inset-0 bg-black/40 bg-slate-900/85"})]}),e.jsx("div",{className:"hidden md:block absolute inset-0 pointer-events-none",children:e.jsx(RomanAtmosphericOverlay,{dense:!0,zIndex:0})}),e.jsx(ie.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",damping:28,stiffness:240,mass:0.85}`;

const newDrawerOverlay = `key:"imperium-menu-drawer",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.1},className:"fixed inset-0 z-[200] flex justify-end overflow-hidden pointer-events-none",children:[e.jsxs(ie.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 pointer-events-auto overflow-hidden",onClick:()=>_e(T.current||"MAP"),children:[e.jsx(RomanAtmosphericOverlay,{dense:!0,zIndex:0}),e.jsx("div",{className:"absolute inset-0 bg-black/40 backdrop-blur-xl bg-gradient-to-r from-black/70 via-stone-950/50 to-transparent"})]}),e.jsx("div",{className:"hidden md:block absolute inset-0 pointer-events-none",children:e.jsx(RomanAtmosphericOverlay,{dense:!0,zIndex:0})}),e.jsx(ie.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{duration:.12,ease:"easeOut"}`;

if (js.includes(oldDrawerOverlay)) {
  js = js.replace(oldDrawerOverlay, newDrawerOverlay);
  
}

// 3. UNIFY MENU NAVIGATION TABS INTO FROSTED BASALT DOCK STRIP
const oldNavBlock = `e.jsxs("div",{className:"md:hidden absolute bottom-0 left-0 right-0 z-[60] p-2 sm:p-3 pb-[max(calc(env(safe-area-inset-bottom,0px)+8px),12px)] flex items-center justify-between gap-1",style:{backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(16px)",borderTop:"1px solid rgba(120,53,15,0.6)",boxShadow:"0 -12px 32px rgba(0,0,0,0.95)"},children:[e.jsx("button",{onClick:()=>_e("CODEX"),className:\`px-2.5 py-2 rounded-lg font-cinzel text-[10px] sm:text-xs font-bold transition-all flex-1 text-center truncate \${h==="CODEX"?"bg-amber-600/90 text-white shadow-inner":"text-[#b8860b] hover:text-stone-200 hover:bg-black/20 bg-slate-950/90 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]"} bg-slate-950/90\`,children:"CODEX"}),e.jsx("button",{onClick:()=>_e("ARMA"),className:\`px-2.5 py-2 rounded-lg font-cinzel text-[10px] sm:text-xs font-bold transition-all flex-1 text-center truncate \${h==="ARMA"?"bg-amber-600/90 text-white shadow-inner":"text-[#b8860b] hover:text-stone-200 hover:bg-black/20 bg-slate-950/90 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]"} bg-slate-950/90\`,children:"ARMA"}),e.jsx("button",{onClick:()=>_e("TREASURY"),className:\`px-2.5 py-2 rounded-lg font-cinzel text-[10px] sm:text-xs font-bold transition-all flex-1 text-center truncate \${h==="TREASURY"?"bg-amber-600/90 text-white shadow-inner":"text-[#b8860b] hover:text-stone-200 hover:bg-black/20 bg-slate-950/90 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]"} bg-slate-950/90\`,children:"AERARIUM"}),e.jsx("button",{onClick:()=>_e(T.current||"MAP"),className:"px-3 py-2 rounded-lg font-cinzel text-[10px] sm:text-xs font-bold text-red-400 hover:bg-red-900/20 transition-all shrink-0 ml-1 border border-red-900/30",children:"CLOSE"})]})`;

const newNavBlock = `e.jsxs("div",{className:"fixed bottom-0 left-1/2 -translate-x-1/2 w-[98%] max-w-3xl z-[200] px-2 sm:px-5 py-2 sm:py-2.5 pb-[max(calc(env(safe-area-inset-bottom,0px)+8px),12px)] grid grid-cols-5 gap-1 sm:gap-2 items-center frosted-basalt-dock rounded-t-2xl sm:rounded-t-3xl border-t border-amber-500/50 shadow-[0_-12px_36px_rgba(0,0,0,0.95)]",children:[e.jsxs("button",{onClick:()=>_e("MAP"),className:\`w-full py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl font-cinzel text-[10px] sm:text-xs font-bold transition-all duration-200 text-center truncate flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer select-none active:scale-95 \${h==="MAP"||!h?"bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-black font-black border border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.65),inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.03]":"text-amber-200/80 hover:text-amber-100 bg-stone-950/80 hover:bg-stone-900/90 border border-amber-900/40 hover:border-amber-500/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]"}\`,children:[e.jsxs("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",className:"w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor",strokeWidth:"1.8",strokeOpacity:"0.8"}),e.jsx("path",{d:"M12 4V20M4 12H20",stroke:"currentColor",strokeWidth:"1.2",strokeOpacity:"0.5",strokeDasharray:"2 2"}),e.jsx("polygon",{points:"12,5 14,11 12,10 10,11",fill:"currentColor"}),e.jsx("polygon",{points:"12,19 14,13 12,14 10,13",fill:"currentColor",fillOpacity:"0.6"})]}),e.jsx("span",{className:"truncate",children:"MAP"})]}),e.jsxs("button",{onClick:()=>_e("CODEX"),className:\`w-full py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl font-cinzel text-[10px] sm:text-xs font-bold transition-all duration-200 text-center truncate flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer select-none active:scale-95 \${h==="CODEX"?"bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-black font-black border border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.65),inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.03]":"text-amber-200/80 hover:text-amber-100 bg-stone-950/80 hover:bg-stone-900/90 border border-amber-900/40 hover:border-amber-500/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]"}\`,children:[e.jsxs("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",className:"w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",children:[e.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("line",{x1:"8",y1:"7",x2:"16",y2:"7",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("line",{x1:"8",y1:"11",x2:"14",y2:"11",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),e.jsx("span",{className:"truncate",children:"CODEX"})]}),e.jsxs("button",{onClick:()=>_e("ARMA"),className:\`w-full py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl font-cinzel text-[10px] sm:text-xs font-bold transition-all duration-200 text-center truncate flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer select-none active:scale-95 \${h==="ARMA"?"bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-black font-black border border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.65),inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.03]":"text-amber-200/80 hover:text-amber-100 bg-stone-950/80 hover:bg-stone-900/90 border border-amber-900/40 hover:border-amber-500/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]"}\`,children:[e.jsxs("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",className:"w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",children:[e.jsx("path",{d:"M12 3c-4.5 0-8 3.5-8 8 0 4 2.5 6.5 4 7.5l1.5 2.5h5l1.5-2.5c1.5-1 4-3.5 4-7.5 0-4.5-3.5-8-8-8z",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M12 3v12M8 11h8",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("path",{d:"M4 11c2.5 0 4-1.5 4-3M20 11c-2.5 0-4-1.5-4-3",stroke:"currentColor",strokeWidth:"1.4"})]}),e.jsx("span",{className:"truncate",children:"ARMA"})]}),e.jsxs("button",{onClick:()=>_e("TREASURY"),className:\`w-full py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl font-cinzel text-[10px] sm:text-xs font-bold transition-all duration-200 text-center truncate flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer select-none active:scale-95 \${h==="TREASURY"?"bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-black font-black border border-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.65),inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.03]":"text-amber-200/80 hover:text-amber-100 bg-stone-950/80 hover:bg-stone-900/90 border border-amber-900/40 hover:border-amber-500/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]"}\`,children:[e.jsxs("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",className:"w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",children:[e.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6",stroke:"currentColor",strokeWidth:"1.8"}),e.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3",stroke:"currentColor",strokeWidth:"1.5"})]}),e.jsx("span",{className:"truncate",children:"AERARIUM"})]}),e.jsxs("button",{onClick:()=>_e(T.current||"MAP"),className:"w-full py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl font-cinzel text-[10px] sm:text-xs font-bold text-rose-200 hover:text-white bg-rose-950/80 hover:bg-rose-900/90 border border-rose-800/70 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)] transition-all duration-200 text-center truncate flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer select-none active:scale-95",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",className:"w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",children:e.jsx("path",{d:"M18 6L6 18M6 6l12 12",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})}),e.jsx("span",{className:"truncate",children:"CLOSE"})]})]})`;

if (js.includes(oldNavBlock)) {
  js = js.replace(oldNavBlock, newNavBlock);
  
}

// 4. TOP HUD: Wrap in Connected Amber Glass Canopy with unified button gap
const oldTopCanopy = 'children:e.jsxs("div",{className:"flex items-center justify-between w-full pointer-events-none max-w-7xl mx-auto gap-1.5 sm:gap-3"';
const newTopCanopy = 'children:e.jsxs("div",{className:"amber-glass-top-canopy flex items-center justify-between w-full pointer-events-none max-w-7xl mx-auto gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1 sm:py-1.5"';
if (js.includes(oldTopCanopy)) {
  js = js.replace(oldTopCanopy, newTopCanopy);
  
}

// Top Right Button spacing unification
const oldTopRightGap = 'pointer-events-auto flex items-center gap-1.5 sm:gap-2 shrink-0';
const newTopRightGap = 'pointer-events-auto flex items-center gap-2 sm:gap-2.5 shrink-0';
if (js.includes(oldTopRightGap)) {
  js = js.replaceAll(oldTopRightGap, newTopRightGap);
  
}

// 5. UNIFY BOTTOM HUD BUTTONS LAYOUT, POD CAPSULES & SPACING
const pBottomNav = js.indexOf('id:"bottom-hud-nav"');
if (pBottomNav !== -1) {
  const pBottomEnd = js.indexOf("e.jsx(window.GameDPad", pBottomNav);
  if (pBottomEnd !== -1) {
    const oldBottomBlock = js.substring(pBottomNav, pBottomEnd);
    
    // Construct unified bottom HUD layout with symmetrical amber pods and uniform spacing
    const newBottomBlock = 'id:"bottom-hud-nav",className:`fixed inset-0 z-[100] pointer-events-none select-none transition-all duration-300 ${t?"opacity-0 pointer-events-none":"opacity-100"}`,children:[e.jsxs("div",{className:`pointer-events-auto absolute bottom-1.5 sm:bottom-2.5 pb-[max(calc(env(safe-area-inset-bottom,0px)+4px),8px)] inset-x-0 px-2.5 sm:px-5 flex items-end justify-between w-full max-w-5xl mx-auto z-10 ${dpadPos===\'left\'?\'!pl-[160px] sm:!pl-[170px]\':dpadPos===\'right\'?\'!pr-[160px] sm:!pr-[170px]\':\'\'}`,children:[e.jsxs("div",{className:"pointer-events-auto amber-glass-pod amber-glass-pod-left flex flex-col gap-2 sm:gap-2.5 items-center p-1.5 sm:p-2 shadow-md",children:[r!=="CITY"&&(j||N)?e.jsxs("div",{className:"relative group flex items-center justify-center",children:[j&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute -inset-1.5 rounded-full border-2 border-amber-400/80 animate-ping opacity-50 pointer-events-none"}),e.jsx("div",{className:"absolute -inset-1 rounded-full border-[2px] border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.85),inset_0_0_8px_rgba(245,158,11,0.5)] animate-pulse pointer-events-none"})]}),e.jsx(Vr,{onClick:()=>{v.playClick(),j&&A?A(j):N&&T&&T(N)},variant:j?"gold":"crimson",icon:j?e.jsx(Fa,{className:"w-[60%] h-[60%] text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",strokeWidth:1.5}):void 0,emblem:j?void 0:"swords",title:j?("Enter "+j.name):("Engage "+(N?.enemyUnit?.name||"Enemy")),showGlow:!0})]}):null,e.jsx(Vr,{onClick:y,disabled:a.isEnemyTurn,variant:a.isEnemyTurn?"crimson":"gold",emblem:"hourglass",title:a.isEnemyTurn?"Hostes Movet (Enemy Turn...)":"Finis (End Turn)",showGlow:!a.isEnemyTurn&&(a.iter??0)<=1}),r==="CITY"?e.jsxs("div",{className:"relative group flex items-center justify-center",children:[e.jsx("div",{className:"absolute -inset-1.5 rounded-full border-2 border-amber-400/80 animate-ping opacity-50 pointer-events-none"}),e.jsx("div",{className:"absolute -inset-1 rounded-full border-[2px] border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.85),inset_0_0_8px_rgba(245,158,11,0.5)] animate-pulse pointer-events-none"}),e.jsx(Vr,{onClick:()=>{v.playClick(),M?M():j&&A&&A(j)},variant:"gold",emblem:"map",title:s?"Depart Battlefield & Return to Campaign Map":"Depart City / Embark Fleet (Return to Campaign Map)",showGlow:!0})]}):e.jsx(Vr,{onClick:ce=>{ce.stopPropagation(),w&&w()},disabled:!P,variant:"teal",emblem:"anchor",title:F==="sea"?"Drop Anchor (Land)":"Hoist Anchor (Sail)",showGlow:P})]}),false,e.jsxs("div",{className:"pointer-events-auto amber-glass-pod amber-glass-pod-right flex flex-col gap-2 sm:gap-2.5 items-center p-1.5 sm:p-2 shadow-md",children:[e.jsx(Vr,{id:"btn-hud-arma",onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}if(typeof o==="function")o("ARMA");else window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"ARMA"}))},variant:"gold",emblem:"helmet",title:"Arma & Reliquiae (Loadout, Equipment, Cards)",showGlow:!0}),e.jsx(Vr,{id:"btn-hud-centrum",onPointerDown:ce=>ce.stopPropagation(),onTouchStart:ce=>ce.stopPropagation(),onClick:ce=>{ce.stopPropagation(),v.playClick(),U.current&&U.current(),window.dispatchEvent(new CustomEvent("recenter-camera-on-player",{detail:{immediate:!1}}))},variant:"teal",emblem:"target",title:"Centrum: Focus Camera on Fleet/Legion",showGlow:!0})]})]}),';
    
    js = js.replace(oldBottomBlock, newBottomBlock);
    
  }
}

// 5B. REFINE HUD LIGHTING AND SHADOWS (TIGHT CONTACT SHADOWS, NO SPOTLIGHT HALOS)
const oldDpadShadow = 'filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.6))"';
const newDpadShadow = 'filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.45)) drop-shadow(0 1px 2px rgba(0,0,0,0.3))"';
if (js.includes(oldDpadShadow)) {
  js = js.replace(oldDpadShadow, newDpadShadow);
  
}
const oldSocketShadow = '0 8px 24px rgba(0,0,0,0.25)';
const newSocketShadow = '0 4px 8px rgba(0,0,0,0.3)';
js = js.replaceAll(oldSocketShadow, newSocketShadow).replaceAll('0 8px 24px rgba(0,0,0,.25)', newSocketShadow);


// 5C. REMOVE OVERSIZED GLOWS ON ALL HUD BUTTONS (GOLD, BRONZE, SILVER, CRIMSON, TEAL)
console.log("- Tightening all HUD button glows & pulseGlows to remove map spotlights...");
js = js.replace(
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_10px_rgba(245,158,11,0.25),inset_0_1px_1px_rgba(254,240,138,0.3)]"',
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_3px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(254,240,138,0.3)]"'
);
js = js.replace(
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_16px_rgba(245,158,11,0.4)]"',
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_4px_rgba(245,158,11,0.35)]"'
);
js = js.replace(
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_8px_rgba(217,119,6,0.2),inset_0_1px_1px_rgba(251,191,36,0.25)]"',
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_3px_rgba(217,119,6,0.15),inset_0_1px_1px_rgba(251,191,36,0.25)]"'
);
js = js.replace(
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_14px_rgba(217,119,6,0.35)]"',
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_4px_rgba(217,119,6,0.3)]"'
);
js = js.replace(
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_8px_rgba(203,213,225,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)]"',
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_3px_rgba(203,213,225,0.15),inset_0_1px_1px_rgba(255,255,255,0.25)]"'
);
js = js.replace(
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_14px_rgba(203,213,225,0.35)]"',
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_4px_rgba(203,213,225,0.3)]"'
);
js = js.replace(
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_10px_rgba(239,68,68,0.25),inset_0_1px_1px_rgba(254,202,202,0.25)]"',
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_3px_rgba(239,68,68,0.2),inset_0_1px_1px_rgba(254,202,202,0.25)]"'
);
js = js.replace(
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_16px_rgba(239,68,68,0.4)]"',
  'pulseGlow:"shadow-[0_6px_16px_rgba(0,0,0,0.45),0_0_4px_rgba(239,68,68,0.35)]"'
);
js = js.replace(
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_8px_rgba(45,212,191,0.2),inset_0_1px_1px_rgba(153,246,228,0.25)]"',
  'glow:"shadow-[0_4px_16px_rgba(0,0,0,0.3),0_0_3px_rgba(45,212,191,0.15),inset_0_1px_1px_rgba(153,246,228,0.25)]"'
);

// 5D. TIGHTEN LEFT & RIGHT SIDE COMPASS / VITALS OVERSIZED GLOWS
console.log("- Tightening Left & Right side Compass / Vitals controls shadows...");
js = js.replaceAll(
  'shadow-[0_4px_16px_rgba(0,0,0,0.25),0_0_8px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(254,240,138,0.3)]',
  'shadow-[0_4px_16px_rgba(0,0,0,0.25),0_0_3px_rgba(245,158,11,0.18),inset_0_1px_1px_rgba(254,240,138,0.3)]'
);
js = js.replaceAll(
  'shadow-[0_8px_16px_rgba(0,0,0,0.9),0_0_16px_rgba(245,158,11,0.45)]',
  'shadow-[0_8px_16px_rgba(0,0,0,0.9),0_0_4px_rgba(245,158,11,0.35)]'
);

// 6. STANDARDIZE ALL SLIDING DRAWERS (LEFT: VITALITY, RIGHT: COMPASS, TOP: NOTIFICATIONS)

// 6A. LEFT DRAWER: VITALITY / STATUS IMPERII (Slides out smoothly from Left frame edge)
const oldVitalityDrawerOpening = `initial:{x:"-120%",opacity:0},animate:{x:0,opacity:1},exit:{x:"-120%",opacity:0},transition:{type:"spring",damping:28,stiffness:300},onClick:N=>N.stopPropagation(),className:"fixed left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-[151] intaglio-gem basalt-menu bg-[#080b12]/95 border-2 border-amber-500/80 rounded-2xl sm:rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_16px_rgba(245,158,11,0.25),inset_0_1px_2px_rgba(255,255,255,0.1)] w-[min(380px,calc(100vw-16px))] sm:w-96 max-h-[calc(100vh-60px)] overflow-y-auto no-scrollbar p-3.5 sm:p-4 select-none bg-slate-950/90"`;

const newVitalityDrawerOpening = `initial:{x:"-100%",opacity:0.6},animate:{x:0,opacity:1},exit:{x:"-100%",opacity:0},transition:{type:"spring",damping:26,stiffness:260,mass:0.9},onClick:N=>N.stopPropagation(),className:"fixed left-0 top-1/2 -translate-y-1/2 z-[160] roman-frame-drawer roman-frame-drawer-left w-[min(400px,calc(100vw-16px))] sm:w-[420px] max-h-[min(90vh,700px)] overflow-y-auto no-scrollbar p-4 sm:p-5 select-none pointer-events-auto"`;

if (js.includes(oldVitalityDrawerOpening)) {
  js = js.replace(oldVitalityDrawerOpening, newVitalityDrawerOpening);
  
}

// Polish Vitality Drawer Header
const oldVitHeader = 'e.jsxs("div",{className:"flex items-center justify-between mb-3 border-b border-[#8b6508]/40 pb-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(xt,{className:"w-4 h-4 text-[#d4af37]"}),e.jsx("span",{className:"font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase text-amber-200",children:"STATUS IMPERII"})]}),e.jsx("button",{type:"button",onClick:s,className:"text-[#b8860b] hover:text-white transition-colors cursor-pointer p-1",children:e.jsx(Bn,{className:"w-4 h-4"})})]})';
const newVitHeader = 'e.jsxs("div",{className:"drawer-header -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 px-4 sm:px-5 py-3 sm:py-3.5 mb-3 flex items-center justify-between border-b border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300",children:"🏛"}),e.jsxs("div",{children:[e.jsx("div",{className:"font-cinzel text-xs sm:text-sm font-bold text-amber-200 tracking-wider uppercase",children:"STATUS IMPERII"}),e.jsx("div",{className:"text-[9px] font-cinzel text-amber-400/70 tracking-widest uppercase",children:"EXPEDITION OVERVIEW"})]})]}),e.jsx("button",{type:"button",onClick:s,className:"p-1.5 sm:p-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 hover:text-white border border-amber-600/40 transition-all cursor-pointer active:scale-95 shadow-sm",children:e.jsxs("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",className:"w-4 h-4",children:[e.jsx("path",{d:"M18 6L6 18M6 6l12 12",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})]})})]})';
if (js.includes(oldVitHeader)) {
  js = js.replace(oldVitHeader, newVitHeader);
  
}

// 6B. RIGHT DRAWER: RELIC RADAR / COMPASS (Slides out smoothly from Right frame edge)
const oldCompassDrawerOpening = `initial:{x:"120%",opacity:0},animate:{x:0,opacity:1},exit:{x:"120%",opacity:0},transition:{type:"spring",damping:28,stiffness:300},onClick:E=>E.stopPropagation(),className:"fixed right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-[141] intaglio-gem basalt-menu bg-[#080b12]/95 border-2 border-[#1c1917]/90 rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 flex flex-col items-center gap-2.5 shadow-[inset_0_2px_20px_rgba(0,0,0,0.9),inset_0_-1px_2px_rgba(255,255,255,0.05),0_15px_40px_rgba(0,0,0,0.95),0_0_20px_rgba(212,175,55,0.15)] w-[min(340px,calc(100vw-16px))] sm:w-88 max-h-[calc(100vh-60px)] overflow-y-auto no-scrollbar pointer-events-auto select-none bg-slate-950/95"`;

const newCompassDrawerOpening = `initial:{x:"100%",opacity:0.6},animate:{x:0,opacity:1},exit:{x:"100%",opacity:0},transition:{type:"spring",damping:26,stiffness:260,mass:0.9},onClick:E=>E.stopPropagation(),className:"fixed right-0 top-1/2 -translate-y-1/2 z-[160] roman-frame-drawer roman-frame-drawer-right w-[min(400px,calc(100vw-16px))] sm:w-[420px] max-h-[min(90vh,700px)] overflow-y-auto no-scrollbar p-4 sm:p-5 flex flex-col items-center gap-2.5 select-none pointer-events-auto"`;

if (js.includes(oldCompassDrawerOpening)) {
  js = js.replace(oldCompassDrawerOpening, newCompassDrawerOpening);
  
}

// Polish Compass Drawer Header
const oldCompHeader = 'e.jsxs("div",{className:"w-full flex items-center justify-between border-b border-amber-900/60 pb-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(bp,{className:"w-4 h-4 text-amber-400"}),e.jsx("span",{className:"font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase text-amber-200",children:"RADAR RELIQUIAE"})]}),e.jsx("button",{type:"button",onClick:s,className:"text-[#b8860b] hover:text-white transition-colors cursor-pointer p-1",children:e.jsx(Bn,{className:"w-4 h-4"})})]})';
const newCompHeader = 'e.jsxs("div",{className:"drawer-header -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 px-4 sm:px-5 py-3 sm:py-3.5 mb-2 w-[calc(100%+2rem)] sm:w-[calc(100%+2.5rem)] flex items-center justify-between border-b border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300",children:"🧭"}),e.jsxs("div",{children:[e.jsx("div",{className:"font-cinzel text-xs sm:text-sm font-bold text-amber-200 tracking-wider uppercase",children:"RADAR RELIQUIAE"}),e.jsx("div",{className:"text-[9px] font-cinzel text-amber-400/70 tracking-widest uppercase",children:"ANCIENT RELIC TRACKER"})]})]}),e.jsx("button",{type:"button",onClick:s,className:"p-1.5 sm:p-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 hover:text-white border border-amber-600/40 transition-all cursor-pointer active:scale-95 shadow-sm",children:e.jsxs("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"none",className:"w-4 h-4",children:[e.jsx("path",{d:"M18 6L6 18M6 6l12 12",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})]})})]})';
if (js.includes(oldCompHeader)) {
  js = js.replace(oldCompHeader, newCompHeader);
  
}

// 7. RESPONSIVE NOTIFICATION TRIGGER & TOP ROLL-DOWN DRAWER
const oldTriggerSpan = 'e.jsx("span",{className:"block text-[9px] sm:text-[11px] font-cinzel font-bold text-[#d4af37] tracking-wider uppercase truncate",children:"NOTIFICATA IMPERII • MARE NOSTRVM"})';
const newTriggerSpan = 'e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"hidden md:inline text-[10px] sm:text-[11px] font-cinzel font-bold text-[#d4af37] tracking-wider uppercase truncate",children:"NOTIFICATA IMPERII • MARE NOSTRVM"}),e.jsx("span",{className:"hidden sm:inline md:hidden text-[10px] font-cinzel font-bold text-[#d4af37] tracking-wider uppercase truncate",children:"NOTIFICATA IMPERII"}),e.jsx("span",{className:"sm:hidden text-[9px] font-cinzel font-bold text-[#d4af37] tracking-wide uppercase truncate",children:"ACTA IMPERII"})]})';

if (js.includes(oldTriggerSpan)) {
  js = js.replace(oldTriggerSpan, newTriggerSpan);
  
}

const oldTriggerClick = 'onClick:()=>{v.playClick(),I(!F)}';
const newTriggerClick = 'id:"top-hud-dispatch-trigger",onClick:ve=>{ve.preventDefault();ve.stopPropagation();try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}I(prev=>!prev);},role:"button",tabIndex:0,style:{touchAction:"manipulation",cursor:"pointer"},onKeyDown:ve=>{if(ve.key==="Enter"||ve.key===" "){ve.preventDefault();ve.stopPropagation();I(prev=>!prev);}}';
if (js.includes(oldTriggerClick)) {
  js = js.replace(oldTriggerClick, newTriggerClick);
  
}

// 8. TRANSFORM NOTIFICATIONS TRAY INTO PHYSICAL ROLL-DOWN TOP FRAME DRAWER
const pMid = js.indexOf("pointer-events-auto relative flex-1 min-w-0 mx-1 sm:mx-2 max-w-2xl bg-transparent");
const pF = pMid !== -1 ? js.indexOf("F&&e.jsxs(\"div\",{className:`fixed left-[3vw]", pMid) : -1;
const pRight = pF !== -1 ? js.indexOf("e.jsxs(\"div\",{className:\"pointer-events-auto flex items-center gap-", pF) : -1;

if (pMid !== -1 && pF !== -1 && pRight !== -1) {
  const drawerBody = js.substring(pF + 3, pRight - 4);
  const oldContainerStart = `e.jsxs("div",{className:\`fixed left-[3vw] right-[3vw] top-[max(calc(env(safe-area-inset-top,0px)+64px),72px)] w-auto sm:absolute sm:left-auto sm:right-0 sm:top-full sm:w-[560px] mt-2 \${w?"max-h-[min(82vh,600px)]":"max-h-[min(70vh,420px)]"} flex flex-col bg-gradient-to-b from-[#0a0c12]/98 via-[#0e111a]/96 to-[#0b0c10]/98 bg-slate-950/90 border-[1.5px] border-amber-400/80 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.9),0_0_12px_rgba(245,158,11,0.25),inset_0_1px_1.5px_rgba(254,240,138,0.35),inset_0_-1px_1.5px_rgba(0,0,0,0.7)] z-[250] animate-popup-in overflow-hidden transition-all duration-300\`,children:[`;

  if (drawerBody.startsWith(oldContainerStart)) {
    let inner = drawerBody.substring(oldContainerStart.length);

    // Polish close & collapse buttons inside notification drawer
    inner = inner.replace('onClick:()=>I(!1),className:"p-1 sm:p-1.5 rounded-lg bg-[#0d1017] hover:bg-[#191d29] text-[#b8860b] hover:text-white border border-[#8b6508]/30 transition-all cursor-pointer"', 'onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}I(!1)},className:"p-1.5 sm:p-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 hover:text-white border border-amber-600/40 transition-all cursor-pointer active:scale-95 shadow-sm"');
    inner = inner.replace('onClick:()=>P(!w),className:"p-1 sm:p-1.5 rounded-lg bg-[#0d1017] hover:bg-[#191d29] text-[#b8860b] hover:text-amber-300 border border-[#8b6508]/30 transition-all cursor-pointer"', 'onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}P(!w)},className:"p-1.5 sm:p-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 hover:text-white border border-amber-600/40 transition-all cursor-pointer active:scale-95 shadow-sm"');

    // Protect all audio clicks in drawer
    inner = inner.replaceAll('v.playClick(),', '(()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}})(),');

    // Build physical roll-down Framer Motion drawer with AnimatePresence and proper keys
    const newTopMotionDrawer = `e.jsx(Nt,{children:F&&e.jsx(ie.div,{key:"top-notif-backdrop",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm pointer-events-auto",onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}I(!1)},children:e.jsxs(ie.div,{key:"top-notif-panel",initial:{y:"-100%",opacity:0.5},animate:{y:0,opacity:1},exit:{y:"-100%",opacity:0},transition:{type:"spring",damping:26,stiffness:260,mass:0.9},onClick:ve=>ve.stopPropagation(),onPointerDown:ve=>ve.stopPropagation(),onTouchStart:ve=>ve.stopPropagation(),className:\`fixed top-0 inset-x-0 mx-auto z-[310] roman-frame-drawer roman-frame-drawer-top w-[min(640px,calc(100vw-12px))] \${w?"drawer-expanded max-h-[min(90vh,680px)]":"max-h-[min(78vh,480px)]"} flex flex-col pointer-events-auto select-none overflow-hidden transition-all duration-300\`,children:[` + inner + `})}),`;

    // Excise drawer from middle trigger header container
    js = js.substring(0, pF - 1) + "]})," + js.substring(pRight);

    // Place the new un-nested roll-down drawer right after the top-hud canopy
    const afterHeaderMarker = `title:"Tabularium & Settings (Save/Load, Audio, D-Pad)",onClick:()=>{v.playClick(),n?n():window.dispatchEvent(new CustomEvent("open-save-manager"))}})]})]})}),e.jsx("div",{id:"side-hud-life-vessel"`;
    const newAfterHeader = `title:"Tabularium & Settings (Save/Load, Audio, D-Pad)",onClick:()=>{v.playClick(),n?n():window.dispatchEvent(new CustomEvent("open-save-manager"))}})]})]})}),` + newTopMotionDrawer + `e.jsx("div",{id:"side-hud-life-vessel"`;

    if (js.includes(afterHeaderMarker)) {
      js = js.replace(afterHeaderMarker, newAfterHeader);
      
    }
  }
}

// Safely protect Ae navigation clicks from audio errors
if (js.includes('Ae=ve=>{v.playClick(),')) {
  js = js.replace('Ae=ve=>{v.playClick(),', 'Ae=ve=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}');
  
}

// 9. SOLID BOTTOM BLACK CANOPY GRADIENT REMOVAL
const oldBottomCanopyBg = "bg-gradient-to-t from-[#04060b]/70 via-[#060910]/50 to-[#060910]/0";
const newBottomCanopyBg = "bg-transparent";
if (js.includes(oldBottomCanopyBg)) {
  js = js.replace(oldBottomCanopyBg, newBottomCanopyBg);
}

const oldBottomCanopyLine = "bg-gradient-to-r from-transparent via-amber-800/40 to-transparent";
const newBottomCanopyLine = "bg-transparent";
if (js.includes(oldBottomCanopyLine)) {
  js = js.replace(oldBottomCanopyLine, newBottomCanopyLine);
}

// 10. MAP-PAN PERFORMANCE & GPU HARDWARE ACCELERATION
const oldWheelPan = 'Zt<=St?Ft.current=(Zt-St)/2:Ft.current=Math.max(0,Math.min(Zt-St,Ft.current)),k.current&&(k.current.style.transform=`translate3d(${-Rt.current}px, ${-Ft.current}px, 0)`)};';
const newWheelPan = 'Zt<=St?Ft.current=(Zt-St)/2:Ft.current=Math.max(0,Math.min(Zt-St,Ft.current)),k.current&&(k.current.style.transform=`translate3d(${-Rt.current}px, ${-Ft.current}px, 0)`),I.current&&(I.current.style.transform=`translate3d(${-Rt.current*.15}px, ${-Ft.current*.15}px, 0)`),E.current&&(E.current.style.transform=`translate3d(${-Rt.current*.2}px, ${-Ft.current*.2}px, 0)`)};';

if (js.includes(oldWheelPan)) {
  js = js.replace(oldWheelPan, newWheelPan);
  
}

const oldMapContainerInner = 'id:"map-container-inner",onClick:rl,onContextMenu:V=>{V.preventDefault();if(fe.length>0||de.current!==null||(De.current&&De.current.length>0)){v.playClick();De.current=[];de.current=null;U(null);ce([]);Ae(null);}},onPointerDown:eo,onPointerUp:si,onPointerCancel:si,onPointerLeave:V=>{si(V),Jn()},className:"relative select-none cursor-crosshair h-full overflow-hidden"';
const newMapContainerInner = 'id:"map-container-inner",onClick:rl,onContextMenu:V=>{V.preventDefault();if(fe.length>0||de.current!==null||(De.current&&De.current.length>0)){v.playClick();De.current=[];de.current=null;U(null);ce([]);Ae(null);}},onPointerDown:eo,onPointerUp:si,onPointerCancel:si,onPointerLeave:V=>{si(V),Jn()},className:"relative select-none cursor-crosshair h-full overflow-hidden map-gpu-layer"';

if (js.includes(oldMapContainerInner)) {
  js = js.replace(oldMapContainerInner, newMapContainerInner);
  
}

// 11. COMBAT-TO-MAP TRANSITION & UNFREEZE ENGINE
const pOs = js.indexOf("Os.current=N;");
if (pOs !== -1) {
  const pOsStart = js.lastIndexOf("b.useEffect(()=>{", pOs);
  const pOsEnd = js.indexOf("}},[N,s]);", pOs);
  if (pOsStart !== -1 && pOsEnd !== -1) {
    const oldModalBlock = js.substring(pOsStart, pOsEnd + 10);
    const newModalBlock = `b.useEffect(()=>{  Os.current=N;  if(!N){    ws.current=!1;    cr.current=!1;    Ds.current=null;    or.current=null;    if(Nr.current)Nr.current.active=!1;    De.current=[];    xs.current=!1;    ta.current=!1;    pa.current=!1;    Ia.current=null;    kr(!1);    ce([]);    U(null);    Ae(null);    if(typeof window!=="undefined") window.__pendingWayfindingCell=null;    vr.current=!1;    cn.current=performance.now();    ve.current=performance.now();    Ea.current=performance.now()+600;    if(it.current&&it.current.isEnemyTurn){      it.current.isEnemyTurn=!1;      s(prev=>({...prev,isEnemyTurn:!1,iter:Math.max(1,prev.iter??6)}));    }  }},[N,s]);`;
    js = js.replace(oldModalBlock, newModalBlock);
    
  }
}

const pExit = js.indexOf("onCombatExit=()=>{");
if (pExit !== -1) {
  const pExitStart = js.lastIndexOf("b.useEffect(()=>{", pExit);
  const pExitEnd = js.indexOf("window.removeEventListener('combat-exit',onCombatExit);},[s]);", pExit);
  if (pExitStart !== -1 && pExitEnd !== -1) {
    const oldExitBlock = js.substring(pExitStart, pExitEnd + 63);
    const newExitBlock = `b.useEffect(()=>{  const onCombatExit=()=>{    ws.current=!1;    cr.current=!1;    Ds.current=null;    or.current=null;    if(Nr.current)Nr.current.active=!1;    De.current=[];    xs.current=!1;    ta.current=!1;    pa.current=!1;    Ia.current=null;    kr(!1);    ce([]);    U(null);    Ae(null);    if(typeof window!=="undefined") window.__pendingWayfindingCell=null;    Fe.current=null;    se.current=null;    Oa.current=null;    Qa.current=null;    de.current=null;    vr.current=!1;    cn.current=performance.now();    ve.current=performance.now();    Ea.current=performance.now()+600;    if(it.current){      it.current.isEnemyTurn=!1;      it.current.iter=Math.max(6,it.current.iter??6);    }    s(prev=>({...prev,isEnemyTurn:!1,iter:Math.max(6,prev.iter??6)}));    setTimeout(()=>{      ws.current=!1;      vr.current=!1;      xs.current=!1;      ta.current=!1;      pa.current=!1;      ce([]);      U(null);      Ae(null);      if(typeof window!=="undefined") window.__pendingWayfindingCell=null;      if(it.current){ it.current.isEnemyTurn=!1; }      s(prev=>({...prev,isEnemyTurn:!1,iter:Math.max(1,prev.iter??6)}));    },60);  };  window.addEventListener('combat-exit',onCombatExit);  return()=>window.removeEventListener('combat-exit',onCombatExit);},[s]);`;
    js = js.replace(oldExitBlock, newExitBlock);
    
  }
}

const pReExit = js.indexOf('window.dispatchEvent(new CustomEvent("combat-exit"));');
if (pReExit !== -1) {
  const pIf = js.lastIndexOf("if(typeof window", pReExit);
  const pIfEnd = js.indexOf("},Me=", pReExit);
  if (pIf !== -1 && pIfEnd !== -1) {
    const oldBlock = js.substring(pIf, pIfEnd);
    const newBlock = `if(typeof window!=="undefined"){\n      window.dispatchEvent(new CustomEvent("combat-exit"));\n      setTimeout(()=>{\n        window.dispatchEvent(new CustomEvent("combat-exit"));\n        window.dispatchEvent(new CustomEvent("recenter-camera-on-player",{detail:{immediate:false}}));\n      },40);\n    }\n  }`;
    js = js.replace(oldBlock, newBlock);
    
  }
}

// 12. MAP SCROLLING & PERFORMANCE OPTIMIZATIONS

// 12A. REMOVE ALL MINOR BLUE SEA LANES FROM MAP OVERLAY
const oldSeaLanesPattern = 'o.filter(l=>l.routeType!=="neutral"&&l.routeType!=="secondary")';
if (js.includes(oldSeaLanesPattern)) {
  js = js.replace(oldSeaLanesPattern, '[]');
  
}

// 12B. DISTINCT STYLING FOR ROMAN ROADS VS NAUTICAL SEA LANES IN PATH PLANNER
// Commented out: handled by the dedicated apply_movement_trails_refinement.cjs script
/*
const oldPathLineCode = 'return e.jsx("line",{x1:we.x,y1:we.y,x2:Ke.x,y2:Ke.y,stroke:ze,strokeWidth:Ke.reachable?3:2.5,strokeDasharray:St,strokeLinecap:"round",opacity:Ke.reachable?.95:.85},`path_line_${ct}`)';
const newPathLineCode = 'const isRoadWay=Ke.isRoad||Ke.mode==="land"; const wayStroke=isRoadWay?(Ke.reachable?"#f59e0b":"#b45309"):(Ke.reachable?"#38bdf8":"#0284c7"); const wayWidth=isRoadWay?(Ke.reachable?3.8:2.8):(Ke.reachable?2.5:1.8); const wayDash=isRoadWay?"8 3":"5 5"; return e.jsx("line",{x1:we.x,y1:we.y,x2:Ke.x,y2:Ke.y,stroke:wayStroke,strokeWidth:wayWidth,strokeDasharray:wayDash,strokeLinecap:"round",opacity:Ke.reachable?.95:.85},`path_line_${ct}`)';
if (js.includes(oldPathLineCode)) {
  js = js.replace(oldPathLineCode, newPathLineCode);
  
}
*/

// 12C. STRIP ANIMATED COASTAL SURF SWASH WAVES FOR SMOOTH PANNING
const swashStart = js.indexOf('id:"coastalSurfSwash"');
if (swashStart !== -1) {
  const swashEnd = js.indexOf('])}), e.jsx("g",{id:"dynamic-scenery"', swashStart);
  if (swashEnd !== -1) {
    js = js.substring(0, swashStart) + 'id:"coastalSurfSwash",children:[]}' + js.substring(swashEnd + 4);
    
  }
}

// 12D. DEEP SCROLL SPEED & MOMENTUM GLIDE ENHANCEMENTS
// Boost wheel & trackpad scroll responsiveness
const oldWheelSpeed = 'const ct=Ie/16*.45,we=Pe/16*.45;';
const newWheelSpeed = 'Ie*=2.2; Pe*=2.2; const ct=Ie*0.12,we=Pe*0.12;';
if (js.includes(oldWheelSpeed)) {
  js = js.replace(oldWheelSpeed, newWheelSpeed);
  
}

// Ensure 1:1 pointer drag attachment (finger movement directly maps 1:1 to map transform)


// Boost D-Pad panning speed
const oldDPadSpeed = 'Rt.current+=window._dpad.dx*15; Ft.current+=window._dpad.dy*15;';
const newDPadSpeed = 'Rt.current+=window._dpad.dx*30; Ft.current+=window._dpad.dy*30;';
if (js.includes(oldDPadSpeed)) {
  js = js.replace(oldDPadSpeed, newDPadSpeed);
  
}

// 12E. REMOVE PULSING PORT MARKERS & BLUR FILTERS (ROME, ALEXANDRIA, ETC.)
const oldPortPulseWrapper = 'a&&e.jsx("div",{className:"absolute -inset-2 rounded-full bg-amber-400/15 blur-[4px] ring-1 ring-amber-400/30 animate-pulse pointer-events-none"})';
const newPortPulseWrapper = 'a&&e.jsx("div",{className:"absolute -inset-1 rounded-full border border-amber-400/30 pointer-events-none"})';
if (js.includes(oldPortPulseWrapper)) {
  js = js.replace(oldPortPulseWrapper, newPortPulseWrapper);
  
}

const oldPortGlowCore = 'w-7 h-7 rounded-full bg-amber-400/20 blur-[3px] animate-pulse';
const newPortGlowCore = 'w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/30';
if (js.includes(oldPortGlowCore)) {
  js = js.replaceAll(oldPortGlowCore, newPortGlowCore);
  
}

// 12F. ELIMINATE PARALLAX LAYER SPLITTING DURING PANNING FOR ULTRA-FAST SINGLE GPU LAYER SCROLLING
const oldParallaxTransforms = ',I.current&&(ne!==ft||ee!==R)&&(I.current.style.transform=`translate3d(${-ft*.15}px, ${-R*.15}px, 0)`),E.current&&(ne!==ft||ee!==R)&&(E.current.style.transform=`translate3d(${-ft*.2}px, ${-R*.2}px, 0)`)';
if (js.includes(oldParallaxTransforms)) {
  js = js.replaceAll(oldParallaxTransforms, '');
  
}

const oldDragParallax = ',I.current&&(I.current.style.transform=`translate3d(${-Rt.current*.15}px, ${-Ft.current*.15}px, 0)`),E.current&&(E.current.style.transform=`translate3d(${-Rt.current*.2}px, ${-Ft.current*.2}px, 0)`)';
if (js.includes(oldDragParallax)) {
  js = js.replaceAll(oldDragParallax, '');
  
}

// 12G. DEEP MAP SCROLL PERFORMANCE: PURGE CONTINUOUS OVERLAY ANIMATIONS (GLIMMERS, SPINS, DROP-SHADOW FILTERS)
const oldKmPing = 'animate-[ping_4s_infinite_ease-in-out]';
if (js.includes(oldKmPing)) {
  js = js.replaceAll(oldKmPing, 'hidden');
  
}

const oldSpin16 = 'animate-[spin_16s_linear_infinite]';
if (js.includes(oldSpin16)) {
  js = js.replaceAll(oldSpin16, 'hidden');
  
}

const oldSpin14 = 'animate-[spin_14s_linear_infinite]';
if (js.includes(oldSpin14)) {
  js = js.replaceAll(oldSpin14, 'hidden');
  
}

// Optimize Canvas Grid Xm to skip rendering when grid is off
const oldXmCanvasStart = '=lt.memo(({mapScale:t,showGridLines:s=!0,showCoordinates:a=!0})=>{const r=b.useRef(null);';
const newXmCanvasStart = '=lt.memo(({mapScale:t,showGridLines:s=!0,showCoordinates:a=!0})=>{if(!s&&!a)return null;const r=b.useRef(null);';
if (js.includes(oldXmCanvasStart)) {
  js = js.replace(oldXmCanvasStart, newXmCanvasStart);
  
}

// Check syntax with esbuild
console.log("Validating transformation syntax with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist if present
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}

console.log("=== CONNECTED AMBER HUD & DYNAMIC FRAME COMPLETE ===");
