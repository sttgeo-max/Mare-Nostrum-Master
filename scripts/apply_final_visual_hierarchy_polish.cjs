const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING REFINED MAP & HUD VISUAL HIERARCHY POLISH PASS ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. TERRITORY COLORS: Mute bright green Greek/Balkan territory & other neon greens
// In Spring ("VER"): replace italiaBalkan, cantabria, fertile with sophisticated muted sage green #3c7a52
js = js.replace('italiaBalkan:"#16a34a"', 'italiaBalkan:"#3c7a52"');
js = js.replace('cantabria:"#16a34a"', 'cantabria:"#3c7a52"');
js = js.replace('fertile:"#16a34a"', 'fertile:"#3c7a52"');


// 2. MOUNTAINS: Reduce snowcap intensity, brightest faces, and highlight/shadow contrast
// A. Left face of day snowcaps (bright white -> warm off-white, lower opacity)
const oldLeftSnowcap = 'fill:yt?"#93c5fd":"#ffffff",opacity:"0.98"';
const newLeftSnowcap = 'fill:yt?"#93c5fd":"#ede6d8",opacity:"0.80"';
if (js.includes(oldLeftSnowcap)) {
  js = js.replace(oldLeftSnowcap, newLeftSnowcap);
  
}

// B. Right face of day snowcaps (lavender-blue -> soft warm sand tone, lower opacity)
const oldRightSnowcap = 'fill:yt?"#1e1b4b":et?"#fbcfe8":"#c7d2fe",opacity:"0.92"';
const newRightSnowcap = 'fill:yt?"#1e1b4b":et?"#fbcfe8":"#d4caa2",opacity:"0.75"';
if (js.includes(oldRightSnowcap)) {
  js = js.replace(oldRightSnowcap, newRightSnowcap);
  
}

// C. Snowcap middle crease line (bright white -> warm off-white, thinner stroke)
const oldCreaseSnowcap = 'stroke:yt?"#bae6fd":"#ffffff",strokeWidth:"1.4",opacity:"1"';
const newCreaseSnowcap = 'stroke:yt?"#bae6fd":"#ede6d8",strokeWidth:"1.2",opacity:"0.80"';
if (js.includes(oldCreaseSnowcap)) {
  js = js.replace(oldCreaseSnowcap, newCreaseSnowcap);
  
}

// D. Mountain peak highlights (ae) during day: white/yellow -> warm cream/soft gold
const oldMtnHighlight = 'ae=mt?"#ffffff":"#fef08a"';
const newMtnHighlight = 'ae=mt?"#ede6d8":"#f7e2a9"';
if (js.includes(oldMtnHighlight)) {
  js = js.replace(oldMtnHighlight, newMtnHighlight);
  
}

// E. Mute Alpine mountain bright body face (C) to warmer, softer parchment/cream-slate
const oldAlpineFace = 'C=$e?"#f8fafc":Oe';
const newAlpineFace = 'C=$e?"#e8dfce":Oe';
if (js.includes(oldAlpineFace)) {
  js = js.replace(oldAlpineFace, newAlpineFace);
  
}

// F. Mute Forested mountain bright body face (C) to subdued, premium forest olive
const oldForestedFace = 'gt?"#22c55e":"#b45309"';
const newForestedFace = 'gt?"#508252":"#a37943"';
if (js.includes(oldForestedFace)) {
  js = js.replace(oldForestedFace, newForestedFace);
  
}

// 3. ROADS / ROUTES / BORDERS: Subdue prominence by 15-20% through opacity adjustments
const oldRoadBase = 'fill:"none",stroke:"#78350f",strokeWidth:"1.6",opacity:"0.2"';
const newRoadBase = 'fill:"none",stroke:"#78350f",strokeWidth:"1.6",opacity:"0.30"';
if (js.includes(oldRoadBase)) {
  js = js.replace(oldRoadBase, newRoadBase);
  
}

const oldRoadDash = 'fill:"none",stroke:"#fde047",strokeWidth:"0.9",strokeDasharray:"4 3",opacity:"0.60"';
const newRoadDash = 'fill:"none",stroke:"#fde047",strokeWidth:"0.9",strokeDasharray:"4 3",opacity:"0.42"';
if (js.includes(oldRoadDash)) {
  js = js.replace(oldRoadDash, newRoadDash);
  
}

// 4. MAP LABELS: Integrate engraved lettering into map with softened outlines and subdued sea basins
// Land labels: strokeWidth reduced to 1.2
js = js.replaceAll('stroke:"#1c0a02",strokeWidth:"2.5"', 'stroke:"#1c0a02",strokeWidth:"1.2"');
js = js.replaceAll('stroke:"#1c0a02",strokeWidth:"1.3"', 'stroke:"#1c0a02",strokeWidth:"1.2"');

// Sea labels: fill softer blue, stroke softened, opacity 0.60
js = js.replaceAll('stroke:"#02132e",strokeWidth:"2.8"', 'stroke:"#02132e",strokeWidth:"1.2"');
js = js.replaceAll('stroke:"#02132e",strokeWidth:"1.5"', 'stroke:"#02132e",strokeWidth:"1.2"');
js = js.replaceAll('fill:"#e0f2fe"', 'fill:"#bae6fd"');


// 5. CITIES AND IMPORTANT LOCATIONS: Controlled contrast & crisp edge definition
const oldCityRect = 'e.jsx("rect",{x:-Oe,y:-Oe,width:Oe*2,height:Oe*2,rx:"2",fill:"#a17e4d",stroke:"#451a03",strokeWidth:"0.9",opacity:"0.85"})';
const newCityRect = 'e.jsx("rect",{x:-Oe,y:-Oe,width:Oe*2,height:Oe*2,rx:"2",fill:"#a17e4d",stroke:"#2a1202",strokeWidth:"1.2",opacity:"0.92"})';
if (js.includes(oldCityRect)) {
  js = js.replace(oldCityRect, newCityRect);
  
}

const oldCityBrazier = 'className:"city-brazier-glow",opacity:"0.3"';
const newCityBrazier = 'className:"city-brazier-glow",opacity:"0.22"';
if (js.includes(oldCityBrazier)) {
  js = js.replace(oldCityBrazier, newCityBrazier);
  
}

const oldTownGroup = 'pointerEvents:"none",opacity:"0.42",children:j0.map((le,We)=>e.jsxs("g",{transform:`translate(${le.x}, ${le.y})`,children:[e.jsx("circle",{r:"3",fill:"#451a03",opacity:"0.4"}),e.jsx("circle",{r:"2",fill:"#fef08a",stroke:"#451a03",strokeWidth:"0.5",opacity:"0.6"}),e.jsx("circle",{r:"0.9",fill:"#991b1b"})]},"town-"+We))';
const newTownGroup = 'pointerEvents:"none",opacity:"0.72",children:j0.map((le,We)=>e.jsxs("g",{transform:`translate(${le.x}, ${le.y})`,children:[e.jsx("circle",{r:"3.2",fill:"#2a1202",opacity:"0.7"}),e.jsx("circle",{r:"2.2",fill:"#fde047",stroke:"#3b1704",strokeWidth:"0.8",opacity:"0.9"}),e.jsx("circle",{r:"1.1",fill:"#b91c1c"})]},"town-"+We))';
if (js.includes(oldTownGroup)) {
  js = js.replace(oldTownGroup, newTownGroup);
  
}

// 7. BOTTOM MOVEMENT CONTROL: Ensure 8-10% visual reduction with 44px hit bounds
const oldDpadSocketWithoutScale = 'className:"relative flex items-center justify-center pointer-events-none amber-dpad-socket",style:{width:"112px",height:"112px"}';
const newDpadSocketWithScale = 'className:"relative flex items-center justify-center pointer-events-none amber-dpad-socket",style:{width:"112px",height:"112px",transform:"scale(0.91)",transformOrigin:"center bottom"}';
if (js.includes(oldDpadSocketWithoutScale)) {
  js = js.replace(oldDpadSocketWithoutScale, newDpadSocketWithScale);
  
}

// 8. TOP HUD CENTRAL STATUS AREA: Hierarchy, spacing, hairline separator, muted secondary contrast
const oldStatusAreaPattern = 'ew full logs)",children:[e.jsxs("div",{className:"flex-shrink-0 flex items-center gap-1.5",children:[e.jsx(Cd,{className:`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110 shrink-0 ${j?"text-[#C9A351] drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-pulse":"text-[#b8860b]"}`}),j?X(j.icon,j.type,j.text):N.length>0?X(N[0].icon,N[0].type,N[0].text):e.jsx("div",{className:"w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-[#07090e] border border-[#8b6508]/30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]",children:e.jsx(rt,{variant:"teal_sea",emblem:"scroll",size:18})})]}),e.jsx("div",{className:"flex-1 min-w-0 text-left overflow-hidden pr-1 flex items-center gap-1.5",children:j?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"hidden md:inline text-[9px] font-mono font-bold text-[#C9A351]/90 tracking-wider uppercase shrink-0",children:["[",se.badge,"]"]}),e.jsx("span",{className:"block text-[9px] xs:text-[10px] sm:text-xs md:text-[12px] font-cinzel font-bold text-amber-100 whitespace-nowrap overflow-x-auto no-scrollbar tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] group-hover:text-amber-300 transition-colors",children:j.text})]}):N.length>0?e.jsxs("div",{className:"flex items-center gap-1.5 truncate",children:[e.jsxs("span",{className:"hidden sm:inline text-[8.5px] font-mono font-bold text-[#b8860b] uppercase tracking-wider shrink-0",children:["[",se.badge,"]"]}),e.jsx("span",{className:"text-[9.5px] sm:text-xs font-cinzel font-medium text-stone-200 truncate group-hover:text-[#F3E7C8] transition-colors",children:N[0].text})]}):';

const newStatusAreaPattern = 'ew full logs)",children:[e.jsxs("div",{className:"flex-shrink-0 flex items-center gap-1.5 border-r border-amber-500/20 pr-1.5",children:[e.jsx(Cd,{className:`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110 shrink-0 ${j?"text-[#C9A351] drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-pulse":"text-[#b8860b]"}`}),j?X(j.icon,j.type,j.text):N.length>0?X(N[0].icon,N[0].type,N[0].text):e.jsx("div",{className:"w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-[#07090e] border border-[#8b6508]/30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]",children:e.jsx(rt,{variant:"teal_sea",emblem:"scroll",size:18})})]}),e.jsx("div",{className:"flex-1 min-w-0 text-left overflow-hidden px-1.5 flex items-center gap-2",children:j?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"hidden md:inline text-[8.5px] font-mono font-medium text-amber-400/70 tracking-wider uppercase shrink-0",children:["[",se.badge,"]"]}),e.jsx("span",{className:"block text-[9px] xs:text-[10px] sm:text-xs md:text-[12px] font-cinzel font-bold text-amber-100 whitespace-nowrap overflow-x-auto no-scrollbar tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] group-hover:text-amber-300 transition-colors",children:j.text})]}):N.length>0?e.jsxs("div",{className:"flex items-center gap-1.5 truncate",children:[e.jsxs("span",{className:"hidden sm:inline text-[8.5px] font-mono font-normal text-amber-500/50 uppercase tracking-wider shrink-0",children:["[",se.badge,"]"]}),e.jsx("span",{className:"text-[9.5px] sm:text-xs font-cinzel font-medium text-stone-200 truncate group-hover:text-[#F3E7C8] transition-colors",children:N[0].text})]}):';

if (js.includes(oldStatusAreaPattern)) {
  js = js.replace(oldStatusAreaPattern, newStatusAreaPattern);
  
}

// 9B. Subtle separator on right dispatch action area
const oldActionArea = 'e.jsxs("div",{className:"flex items-center gap-1 sm:gap-1.5 flex-shrink-0",children:[De&&e.jsxs("button"';
const newActionArea = 'e.jsxs("div",{className:"flex items-center gap-1 sm:gap-1.5 flex-shrink-0 border-l border-amber-500/20 pl-1.5",children:[De&&e.jsxs("button"';
if (js.includes(oldActionArea)) {
  js = js.replace(oldActionArea, newActionArea);
  
}

// Validate updated bundle syntax with esbuild
console.log("Validating updated bundle with esbuild...");
try {
  esbuild.transformSync(js, { loader: "jsx" });
  
} catch (err) {
  console.error("ERR: syntax validation failed:", err);
  process.exit(1);
}

fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}

console.log("=== FINAL MAP & HUD VISUAL-HIERARCHY POLISH PASS COMPLETE ===");
