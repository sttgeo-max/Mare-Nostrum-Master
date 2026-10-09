const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== IMPLEMENTING CONNECTED AMBER GLASS HUD SPECIFICATION ===");

// 1. Read build_clean_v34.cjs to get the base transform pipeline
const buildScriptPath = path.join(__dirname, "build_clean_v34.cjs");
let buildScript = fs.readFileSync(buildScriptPath, "utf8");

// Let us modify build_clean_v34.cjs to implement the exact connected glass HUD design

// A. Replace MappaImperiiFrame with clean outer golden perimeter and vignette
const oldMappaFrameSearch = 'MappaImperiiFrame = lt.memo(() => {';
const oldMappaFrameEnd = 'pp=({player:t,setPlayer:s';

const newMappaFrameCode = `MappaImperiiFrame = lt.memo(() => {
  return e.jsxs("div", {
    className: "pointer-events-none fixed inset-0 z-40 overflow-hidden select-none",
    children: [
      // Atmospheric Vignette
      e.jsx("div", {
        className: "absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(2,10,20,0.7),inset_0_0_30px_rgba(0,0,0,0.85)]"
      }),
      // Outer Continuous Gold Perimeter Frame with soft rounded corners
      e.jsx("div", {
        className: "absolute inset-1 sm:inset-1.5 rounded-2xl sm:rounded-3xl border-[1.2px] border-amber-400/50 pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.2),inset_0_0_8px_rgba(245,158,11,0.1)]"
      })
    ]
  });
});`;

// Replace MappaImperiiFrame definition in build_clean_v34.cjs
const mappaStart = buildScript.indexOf('MappaImperiiFrame = lt.memo(() => {');
if (mappaStart !== -1) {
  const mappaEnd = buildScript.indexOf('pp=({player:t,setPlayer:s', mappaStart);
  if (mappaEnd !== -1) {
    buildScript = buildScript.substring(0, mappaStart) + newMappaFrameCode + ",\n  " + buildScript.substring(mappaEnd);
    
  }
}

// B. Update Bottom Backdrop and Bottom HUD in build_clean_v34.cjs
// Remove the old solid bronze dais and replace with the SVG Connected Amber Glass Frame
const oldDaisAnchor = 'const newBottomBackdrop =';
const daisIdx = buildScript.indexOf(oldDaisAnchor);
if (daisIdx !== -1) {
  const daisEndIdx = buildScript.indexOf('', daisIdx);
  if (daisEndIdx !== -1) {
    const nextSemicolon = buildScript.indexOf('}', daisEndIdx);
    const newDaisCode = `// Empty bottom backdrop as the connected glass frame handles its own backdrop
  const oldBottomBackdrop = 'e.jsxs("div",{className:\`fixed bottom-0 left-0 right-0 z-[98] h-[max(calc(env(safe-area-inset-bottom,0px)+88px),96px)] sm:h-[90px] pointer-events-none select-none transition-opacity duration-300 \${t?"opacity-0":"opacity-100"}\`,children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-[#04060b]/70 via-[#060910]/50 to-[#060910]/0"}),e.jsx("div",{className:"absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-800/40 to-transparent"}),e.jsx(es,{type:"weathered_patina",opacity:.06,className:"pointer-events-none"})]})';
  const newBottomBackdrop = 'e.jsx("div",{className:"hidden"})';
  if (cleanJs.includes(oldBottomBackdrop)) {
    cleanJs = cleanJs.replace(oldBottomBackdrop, newBottomBackdrop);
    
  }`;
    buildScript = buildScript.substring(0, daisIdx) + newDaisCode + buildScript.substring(nextSemicolon + 1);
  }
}

// Write the updated build_clean_v34.cjs
fs.writeFileSync(buildScriptPath, buildScript, "utf8");

