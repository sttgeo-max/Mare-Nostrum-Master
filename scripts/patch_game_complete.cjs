const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING COMPLETE GAME ENHANCEMENTS & ARTIFACT REDESIGNS ===");

const filePath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Redesign art_gladius_hispaniensis in __masterworkSVGs
const gStart = code.indexOf("art_gladius_hispaniensis:", code.indexOf("__masterworkSVGs"));
const gEnd = code.indexOf("  art_augustus_bulla:", gStart);

if (gStart !== -1 && gEnd !== -1) {
  const newGladius = `art_gladius_hispaniensis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_gh_blade", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#e2e8f0" }),
        e.jsx("stop", { offset: "48%", stopColor: "#f8fafc" }),
        e.jsx("stop", { offset: "50%", stopColor: "#334155" }),
        e.jsx("stop", { offset: "52%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e293b" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_gh_gold", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "45%", stopColor: "#f59e0b" }),
        e.jsx("stop", { offset: "80%", stopColor: "#b45309" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_gh_grip", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#78350f" }),
        e.jsx("stop", { offset: "50%", stopColor: "#451a03" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1c0a02" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_gh_gem", cx: "35%", cy: "35%", r: "65%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fca5a5" }),
        e.jsx("stop", { offset: "40%", stopColor: "#dc2626" }),
        e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_gh_glow", cx: "50%", cy: "50%", r: "50%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fbbf24", stopOpacity: "0.45" }),
        e.jsx("stop", { offset: "100%", stopColor: "#fbbf24", stopOpacity: "0" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "50", r: "46", fill: "url(#mw_gh_glow)", pointerEvents: "none" }),
    e.jsx("path", { d: "M 22,70 C 18,52 24,34 38,22 C 34,32 32,46 36,60 Z", fill: "url(#mw_gh_gold)", opacity: "0.55" }),
    e.jsx("path", { d: "M 78,70 C 82,52 76,34 62,22 C 66,32 68,46 64,60 Z", fill: "url(#mw_gh_gold)", opacity: "0.55" }),
    e.jsx("path", { d: "M 50,10 L 56,22 C 58,34 55,54 55,64 L 45,64 C 45,54 42,34 44,22 Z", fill: "url(#mw_gh_blade)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "12", x2: "50", y2: "62", stroke: "#0f172a", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "49.2", y1: "13", x2: "49.2", y2: "59", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.9" }),
    e.jsx("ellipse", { cx: "50", cy: "65", rx: "15", ry: "4.5", fill: "url(#mw_gh_gold)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("ellipse", { cx: "50", cy: "64.5", rx: "11", ry: "2.5", fill: "#fef08a", opacity: "0.7" }),
    e.jsx("rect", { x: "47", y: "68", width: "6", height: "18", rx: "3", fill: "url(#mw_gh_grip)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "50", cy: "72", rx: "4.5", ry: "1.2", fill: "url(#mw_gh_gold)" }),
    e.jsx("ellipse", { cx: "50", cy: "77", rx: "4.5", ry: "1.2", fill: "url(#mw_gh_gold)" }),
    e.jsx("ellipse", { cx: "50", cy: "82", rx: "4.5", ry: "1.2", fill: "url(#mw_gh_gold)" }),
    e.jsx("circle", { cx: "50", cy: "89", r: "6.5", fill: "url(#mw_gh_gold)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "50", cy: "89", r: "3", fill: "url(#mw_gh_gem)", stroke: "#78350f", strokeWidth: "0.6" })
  ]}),
`;
  code = code.substring(0, gStart) + newGladius + code.substring(gEnd);
  console.log("Successfully replaced art_gladius_hispaniensis in __masterworkSVGs!");
} else {
  console.warn("Could not locate art_gladius_hispaniensis boundaries in __masterworkSVGs.");
}

// 2. Redesign art_aegis_jupiter in __masterworkSVGs
const aStart = code.indexOf("art_aegis_jupiter:", code.indexOf("__masterworkSVGs"));
const aEnd = code.indexOf("  art_pharos_prism:", aStart);

if (aStart !== -1 && aEnd !== -1) {
  const newAegis = `art_aegis_jupiter: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("radialGradient", { id: "mw_aj_field", cx: "50%", cy: "50%", r: "50%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#3730a3" }),
        e.jsx("stop", { offset: "65%", stopColor: "#1e1b4b" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f0e26" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_aj_gold", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#f59e0b" }),
        e.jsx("stop", { offset: "80%", stopColor: "#b45309" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_aj_snake", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#86efac" }),
        e.jsx("stop", { offset: "50%", stopColor: "#15803d" }),
        e.jsx("stop", { offset: "100%", stopColor: "#052e16" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_aj_eye", cx: "40%", cy: "40%", r: "60%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fca5a5" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ef4444" }),
        e.jsx("stop", { offset: "100%", stopColor: "#7f1d1d" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_aj_fulmen", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#fde047" }),
        e.jsx("stop", { offset: "100%", stopColor: "#eab308" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "50", r: "47", fill: "none", stroke: "url(#mw_aj_gold)", strokeWidth: "1", strokeDasharray: "2 2", opacity: "0.7" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "44", fill: "url(#mw_aj_field)", stroke: "url(#mw_aj_gold)", strokeWidth: "3.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "41.5", fill: "none", stroke: "#fef08a", strokeWidth: "0.75", opacity: "0.8" }),
    e.jsx("path", { d: "M 50,12 L 48,22 L 53,24 L 50,34 M 50,88 L 52,78 L 47,76 L 50,66", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 12,50 L 22,48 L 24,53 L 34,50 M 88,50 L 78,52 L 76,47 L 66,50", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 23,23 L 30,30 L 34,27 L 38,36 M 77,77 L 70,70 L 66,73 L 62,64", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 77,23 L 70,30 L 73,34 L 64,38 M 23,77 L 30,70 L 27,66 L 36,62", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "24", fill: "url(#mw_aj_gold)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 32,44 C 26,38 28,30 36,32 C 42,34 38,40 44,36 C 48,32 52,32 56,36 C 62,40 58,34 64,32 C 72,30 74,38 68,44", fill: "none", stroke: "url(#mw_aj_snake)", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 32,56 C 26,60 28,68 36,66 C 40,64 38,58 44,60 M 68,56 C 74,60 72,68 64,66 C 60,64 62,58 56,60", fill: "none", stroke: "url(#mw_aj_snake)", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "27", cy: "33", r: "1.8", fill: "#86efac" }),
    e.jsx("circle", { cx: "73", cy: "33", r: "1.8", fill: "#86efac" }),
    e.jsx("path", { d: "M 38,42 C 38,36 62,36 62,42 C 62,55 58,62 50,62 C 42,62 38,55 38,42 Z", fill: "#fde047", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("ellipse", { cx: "44", cy: "46", rx: "3", ry: "2", fill: "url(#mw_aj_eye)", stroke: "#450a0a", strokeWidth: "0.6" }),
    e.jsx("ellipse", { cx: "56", cy: "46", rx: "3", ry: "2", fill: "url(#mw_aj_eye)", stroke: "#450a0a", strokeWidth: "0.6" }),
    e.jsx("circle", { cx: "44", cy: "46", r: "0.8", fill: "#ffffff" }),
    e.jsx("circle", { cx: "56", cy: "46", r: "0.8", fill: "#ffffff" }),
    e.jsx("path", { d: "M 49,47 L 50,51 L 51,47", stroke: "#78350f", strokeWidth: "0.8", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 44,55 Q 50,58 56,55", stroke: "#78350f", strokeWidth: "1.2", fill: "none" }),
    e.jsx("path", { d: "M 47,55 L 47,57 M 53,55 L 53,57", stroke: "#ffffff", strokeWidth: "0.8" })
  ]}),
`;
  code = code.substring(0, aStart) + newAegis + code.substring(aEnd);
  console.log("Successfully replaced art_aegis_jupiter in __masterworkSVGs!");
} else {
  console.warn("Could not locate art_aegis_jupiter boundaries in __masterworkSVGs.");
}

// 3. Redesign art_lorica_segmentata in __masterworkSVGs
const lStart = code.indexOf("art_lorica_segmentata:", code.indexOf("__masterworkSVGs"));
const lEnd = code.indexOf("  art_commentarii_caesar:", lStart);

if (lStart !== -1 && lEnd !== -1) {
  const newLorica = `art_lorica_segmentata: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ls_iron", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#64748b" }),
        e.jsx("stop", { offset: "35%", stopColor: "#f1f5f9" }),
        e.jsx("stop", { offset: "50%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "75%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#334155" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_ls_brass", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_ls_tunic", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#dc2626" }),
        e.jsx("stop", { offset: "50%", stopColor: "#991b1b" }),
        e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
      ]})
    ]}),
    e.jsx("path", { d: "M 20,24 Q 50,14 80,24 L 88,88 Q 50,94 12,88 Z", fill: "url(#mw_ls_tunic)", stroke: "#450a0a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 20,84 L 20,92 M 30,85 L 30,94 M 40,86 L 40,95 M 50,86 L 50,95 M 60,86 L 60,95 M 70,85 L 70,94 M 80,84 L 80,92", stroke: "url(#mw_ls_brass)", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 22,48 C 36,44 64,44 78,48 L 76,56 C 64,52 36,52 24,56 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 23,54 C 36,50 64,50 77,54 L 75,62 C 64,58 36,58 25,62 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 24,60 C 36,56 64,56 76,60 L 74,68 C 64,64 36,64 26,68 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 25,66 C 36,62 64,62 75,66 L 73,74 C 64,70 36,70 27,74 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 26,72 C 36,68 64,68 74,72 L 72,80 C 64,76 36,76 28,80 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 28,26 C 40,20 60,20 72,26 L 76,46 C 62,42 38,42 24,46 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 16,28 C 14,36 16,46 26,44 C 28,34 26,26 22,24 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 84,28 C 86,36 84,46 74,44 C 72,34 74,26 78,24 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 14,34 Q 22,28 32,30 M 86,34 Q 78,28 68,30", stroke: "url(#mw_ls_brass)", strokeWidth: "1.5" }),
    e.jsx("rect", { x: "47", y: "28", width: "6", height: "4", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "36", width: "6", height: "4", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "50", width: "6", height: "3.5", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "58", width: "6", height: "3.5", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "66", width: "6", height: "3.5", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("line", { x1: "50", y1: "26", x2: "50", y2: "78", stroke: "#78350f", strokeWidth: "1.5" })
  ]}),
`;
  code = code.substring(0, lStart) + newLorica + code.substring(lEnd);
  console.log("Successfully replaced art_lorica_segmentata in __masterworkSVGs!");
} else {
  console.warn("Could not locate art_lorica_segmentata boundaries in __masterworkSVGs.");
}

// 4. Clean up the combat relic bar
const relicTabIdx = code.indexOf('id: "combat-relic-leather-tab"');
if (relicTabIdx !== -1) {
  const blockStart = code.lastIndexOf('e.jsxs("div", {', relicTabIdx);
  // Find style closing
  const styleClose = code.indexOf('transform: "translateX(-50%) translateY(0px)"', relicTabIdx);
  if (blockStart !== -1 && styleClose !== -1) {
    const styleEnd = code.indexOf('},', styleClose) + 2;
    const oldRelicHeader = code.substring(blockStart, styleEnd);
    
    const newRelicHeader = `e.jsxs("div", {
            id: "combat-relic-leather-tab",
            className: "pointer-events-auto flex items-center justify-center gap-2 px-3 py-1 rounded-full backdrop-blur-md transition-all duration-200 select-none max-w-[94vw] overflow-x-auto no-scrollbar mx-auto shadow-lg",
            style: {
              background: "linear-gradient(180deg, rgba(35, 18, 9, 0.94) 0%, rgba(18, 9, 4, 0.98) 100%)",
              border: "1.5px solid rgba(217, 119, 6, 0.75)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.85), 0 0 16px rgba(245,158,11,0.25), inset 0 1px 1px rgba(254,240,138,0.3)"
            },`;
    
    code = code.replace(oldRelicHeader, newRelicHeader);
    console.log("Cleaned up and centered combat relic bar layout!");
  }
}

// 5. Clean up artifact card row / spacing in ii component (size sm)
const oldCardSm = `s==="sm"?e.jsxs("div", {  onClick: n,  className: \`relative w-full p-1 rounded-xl transition-all duration-200 flex flex-col justify-between cursor-pointer select-none overflow-hidden group`;
const newCardSm = `s==="sm"?e.jsxs("div", {  onClick: n,  className: \`relative w-full p-1.5 rounded-2xl transition-all duration-200 flex flex-col justify-between cursor-pointer select-none overflow-hidden group shadow-lg`;

if (code.includes(oldCardSm)) {
  code = code.replace(oldCardSm, newCardSm);
  console.log("Refined sm artifact card container styling.");
}

// Validate syntax
try {
  esbuild.transformSync(code, { loader: "js" });
  console.log("ESBUILD VALIDATION SUCCEEDED: 100% valid JavaScript.");
  fs.writeFileSync(filePath, code, 'utf8');
  console.log("All patches saved to public/assets/index-V33.js!");
} catch(e) {
  console.error("ESBUILD VALIDATION FAILED! Aborting write.", e.message);
  process.exit(1);
}
