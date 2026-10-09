const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING HIGH-FIDELITY CITY MAP SELECTION & COMPACT HEADER PANEL PASS ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. UPDATE F0 SIGNATURE TO PASS selectedCell
const oldF0Props = 'F0=lt.memo(({nodes:t=[],cityEnemies:s=[],cityLoot:a=[],cellSize:r=100,topOffset:o=0,onSelectNode:l,onHoverNode:n,playerPos:c={col:-1,row:-1},liberatedNodes:i=[],isPortCaptured:p=!1,garrisonsRemaining:x=0,onEngageEnemy:u,timeOfDay:d})';
const newF0Props = 'F0=lt.memo(({nodes:t=[],cityEnemies:s=[],cityLoot:a=[],cellSize:r=100,topOffset:o=0,onSelectNode:l,onHoverNode:n,playerPos:c={col:-1,row:-1},liberatedNodes:i=[],isPortCaptured:p=!1,garrisonsRemaining:x=0,onEngageEnemy:u,timeOfDay:d,selectedCell:selCell=null})';

if (js.includes(oldF0Props)) {
  js = js.replace(oldF0Props, newF0Props);
  
} else {
  console.error("[ERROR] Could not find F0 props deconstruction!");
}

// 2. PASS selectedCell IN THE PARENT RENDER OF F0
const oldF0Call = 'e.jsx(F0,{nodes:D,cityEnemies:De,cityLoot:ve,cellSize:w,topOffset:E,onSelectNode:Re,onHoverNode:T,playerPos:B,liberatedNodes:jt,isPortCaptured:Ve,garrisonsRemaining:xe,onEngageEnemy:l,timeOfDay:s.timeOfDay})';
const newF0Call = 'e.jsx(F0,{nodes:D,cityEnemies:De,cityLoot:ve,cellSize:w,topOffset:E,onSelectNode:Re,onHoverNode:T,playerPos:B,liberatedNodes:jt,isPortCaptured:Ve,garrisonsRemaining:xe,onEngageEnemy:l,timeOfDay:s.timeOfDay,selectedCell:z})';

if (js.includes(oldF0Call)) {
  js = js.replace(oldF0Call, newF0Call);
  
} else {
  console.error("[ERROR] Could not find F0 call in parent render!");
}

// 3. UPGRADE F0 MAP CALLBACK FOR CONSISTENT STYLING, HIGHLIGHTS, SELECTED STATE, AND RED X EXCLUSIVITY
// We locate the block dynamically to avoid quote/escaping mismatches!
const newNodeMapBlock = 't.map(m=>{const h=m.col*r+r/2,y=o+m.row*r+r/2;if(c.col===m.col&&c.row===m.row)return null;const A=!(m.isCaptured||i.includes(m.id))&&!p&&(m.garrisonTitle||m.type==="GARRISON"||m.isBoss);const isSelected=selCell&&selCell.col===m.col&&selCell.row===m.row;return e.jsx("div",{className:"absolute top-0 left-0 flex items-center justify-center pointer-events-auto cursor-pointer select-none group",style:{transform:"translate3d(" + h + "px, " + y + "px, 0) translate(-50%, -50%)",zIndex:Math.floor(y)+(isSelected?50:5)},onClick:N=>{N.stopPropagation(),v.playClick(),l&&l(m)},onMouseEnter:()=>n?.(m),onMouseLeave:()=>n?.(null),title:m.name?("Enter " + m.name):"Enter Building",children:e.jsx("div",{className:"relative w-12 h-9 sm:w-14 sm:h-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110",children:e.jsxs("svg",{viewBox:"0 0 48 32",className:"w-full h-full overflow-visible",children:[e.jsx("defs",{children:e.jsxs("radialGradient",{id:"entranceGlow-" + m.id,cx:"50%",cy:"50%",r:"50%",children:[e.jsx("stop",{offset:"0%",stopColor:A?"#ef4444":isSelected?"#fbbf24":"#f59e0b",stopOpacity:"0.8"}),e.jsx("stop",{offset:"70%",stopColor:A?"#991b1b":isSelected?"#d97706":"#d97706",stopOpacity:"0.2"}),e.jsx("stop",{offset:"100%",stopColor:"#000",stopOpacity:"0"})]})}),e.jsx("ellipse",{cx:"24",cy:"18",rx:"20",ry:"8",fill:"#0c0a09",opacity:"0.45"}),isSelected&&e.jsx("ellipse",{cx:"24",cy:"18",rx:"25",ry:"10.5",fill:"none",stroke:"#fbbf24",strokeWidth:"2"}),isSelected&&e.jsx("ellipse",{cx:"24",cy:"18",rx:"28",ry:"12",fill:"none",stroke:"#f59e0b",strokeWidth:"1",opacity:"0.7",strokeDasharray:"2 2"}),e.jsx("ellipse",{cx:"24",cy:"18",rx:"22",ry:"9",fill:"none",stroke:A?"#7f1d1d":isSelected?"#fbbf24":"#ca8a04",strokeWidth:isSelected?"1.8":"1.0",opacity:isSelected?"0.95":"0.45",strokeDasharray:isSelected?"none":"3 3"}),e.jsx("path",{d:"M6 14 L12 8 L36 8 L42 14 L38 24 L10 24 Z",fill:isSelected?"#292524":"#1c1917",stroke:A?"#7f1d1d":isSelected?"#fbbf24":"#78350f",strokeWidth:isSelected?"1.8":"1.2"}),e.jsx("path",{d:"M10 14 L14 10 L34 10 L38 14 L35 21 L13 21 Z",fill:"none",stroke:A?"#ef4444":isSelected?"#fef08a":"#f59e0b",strokeWidth:"1",strokeDasharray:"3 2",opacity:"0.8"}),e.jsx("ellipse",{cx:"24",cy:"16",rx:"14",ry:"6",fill:"url(#entranceGlow-" + m.id + ")",className:"group-hover:opacity-100 opacity-60 transition-opacity duration-300"}),A?e.jsxs("g",{stroke:"#f87171",strokeWidth:"1.5",strokeLinecap:"round",children:[e.jsx("line",{x1:"20",y1:"13",x2:"28",y2:"19"}),e.jsx("line",{x1:"28",y1:"13",x2:"20",y2:"19"})]}):isSelected?e.jsx("path",{d:"M16 18 L24 11 L32 18",fill:"none",stroke:"#facc15",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"}):e.jsx("path",{d:"M18 17 L24 13 L30 17",fill:"none",stroke:"#fbbf24",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round",className:"group-hover:stroke-amber-200 transition-colors"}),e.jsx("circle",{cx:"24",cy:"15",r:"1.5",fill:A?"#ef4444":isSelected?"#facc15":"#fef08a",className:""})]})})},"building-entrance-" + m.id)})';

let pStart = js.indexOf("t.map(m=>{const h=m.col*r+r/2,y=o+m.row*r+r/2;");
if (pStart !== -1) {
  let pEnd = js.indexOf(",s.map(m=>{", pStart);
  if (pEnd !== -1) {
    const oldBlock = js.substring(pStart, pEnd);
    js = js.replace(oldBlock, newNodeMapBlock);
    
  } else {
    console.error("[ERROR] Could not find end of map block!");
  }
} else {
  console.error("[ERROR] Could not find start of map block!");
}

// 4. IN PARENT CALL mc, RENDER HOVERED OR SELECTED BUILDING DETAILS
const oldMcHoveredProp = 'hoveredBuildingName:N?N.latinName?`\${N.latinName} • \${N.name}`:N.name:void 0,';
const newMcHoveredProp = 'hoveredBuildingName: (() => {\n' +
  '  const targetNode = N || (z ? D.find(nd => nd.col === z.col && nd.row === z.row) : null);\n' +
  '  if (!targetNode) return undefined;\n' +
  '  const isB = !(targetNode.isCaptured || jt.includes(targetNode.id)) && !Ve && (targetNode.garrisonTitle || targetNode.type === "GARRISON" || targetNode.isBoss);\n' +
  '  return targetNode.name + "|" + (targetNode.latinName || targetNode.name) + "|" + (targetNode.type || "") + "|" + (isB ? "BLOCKED" : "AVAILABLE");\n' +
  '})(),';

if (js.includes(oldMcHoveredProp)) {
  js = js.replace(oldMcHoveredProp, newMcHoveredProp);
  
} else {
  console.error("[ERROR] Could not find hoveredBuildingName in V0 parent render block!");
}

// 5. IN TOP HUD (d0 COMPONENT), RENDER THE GORGEOUS COMPACT SECOND-LINE LOCATION PANEL
// We append the element as the next child inside the parent Fragment children list!
const oldHeaderEndMarkerNormal = 'Tabularium & Settings (Save/Load, Audio, D-Pad)",onClick:()=>{v.playClick(),n?n():window.dispatchEvent(new CustomEvent("open-save-manager"))}})]})]})})';

const newHeaderEndMarkerNormal = 'Tabularium & Settings (Save/Load, Audio, D-Pad)",onClick:()=>{v.playClick(),n?n():window.dispatchEvent(new CustomEvent("open-save-manager"))}})]})]})}),r==="CITY"&&Le&&(()=>{\n' +
  '  const[bName,bLatin,bType,bStatus]=Le.split("|");\n' +
  '  if(!bName)return null;\n' +
  '  const isB=bStatus==="BLOCKED";\n' +
  '  return e.jsx("div",{className:"fixed top-[max(calc(env(safe-area-inset-top,0px)+52px),60px)] sm:top-[64px] left-1/2 -translate-x-1/2 w-[94%] xs:w-[90%] sm:w-[85%] max-w-lg animate-fade-in z-[110] pointer-events-auto",children:e.jsxs("div",{className:"flex flex-col xs:flex-row items-center justify-between gap-1.5 xs:gap-3 px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.85)] " + (isB?"bg-red-950/75 border-red-500/40 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.2)]":"bg-amber-950/75 border-amber-500/40 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.2)]") ,\n' +
  '    children:[e.jsxs("div",{className:"flex items-center gap-2 min-w-0 flex-1 w-full text-left",children:[\n' +
  '      e.jsx("div",{className:"w-5 h-5 rounded-full flex items-center justify-center border font-bold text-[10px] shrink-0 " + (isB?"bg-red-900/60 border-red-400 text-red-200":"bg-amber-900/60 border-amber-400 text-amber-300"),\n' +
  '        children:isB?"✕":"✓"\n' +
  '      }),\n' +
  '      e.jsxs("div",{className:"flex flex-col text-left leading-tight min-w-0 flex-1",children:[\n' +
  '        e.jsx("span",{className:"font-cinzel font-black text-[10.5px] sm:text-xs tracking-wider uppercase truncate",children:bName}),\n' +
  '        e.jsx("span",{className:"font-cinzel text-[8.5px] sm:text-[9.5px] text-stone-300 tracking-wide truncate",children:bLatin||bType})\n' +
  '      ]})\n' +
  '    ]}),\n' +
  '    e.jsx("div",{className:"px-2.5 py-0.5 rounded-full border text-[7.5px] sm:text-[8px] font-mono font-bold uppercase tracking-wider shrink-0 shadow-sm " + (isB?"bg-red-950/90 border-red-500/50 text-red-300":"bg-amber-950/90 border-amber-500/50 text-amber-300"),\n' +
  '      children:isB?"🛡️ BLOCKED — GARRISON ACTIVE":"✓ SECURED — AVAILABLE"\n' +
  '    })]\n' +
  '  })});\n' +
  '})()';

if (js.includes(oldHeaderEndMarkerNormal)) {
  js = js.replace(oldHeaderEndMarkerNormal, newHeaderEndMarkerNormal);
  
} else {
  console.error("[ERROR] Could not find oldHeaderEndMarkerNormal!");
}

// Validate updated bundle syntax with esbuild
console.log("Validating updated bundle with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}

console.log("=== HIGH-FIDELITY CITY MAP SELECTION PASS COMPLETE ===");
