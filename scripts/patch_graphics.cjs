const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(filePath, 'utf8');

console.log("=== Programmatic Graphics Patcher ===");

// 1. Patch art_aegis_jupiter
const aegisStart = code.indexOf("art_aegis_jupiter:", 700000);
if (aegisStart !== -1) {
  const aegisEnd = code.indexOf("// 11. Light Prism of Ptolemy", aegisStart);
  if (aegisEnd !== -1) {
    const originalBlock = code.substring(aegisStart, aegisEnd);
    const newBlock = `art_aegis_jupiter: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_aj_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_medusa_skin", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#a7f3d0" }),
        e.jsx("stop", { offset: "60%", stopColor: "#0f766e" }),
        e.jsx("stop", { offset: "100%", stopColor: "#115e59" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_snake_green", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#34d399" }),
        e.jsx("stop", { offset: "50%", stopColor: "#059669" }),
        e.jsx("stop", { offset: "100%", stopColor: "#064e3b" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_snake_gold", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fde047" }),
        e.jsx("stop", { offset: "60%", stopColor: "#d97706" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("path", { d: "M 50,14 C 74,14 84,32 80,62 C 76,80 50,90 50,90 C 50,90 24,80 20,62 C 16,32 26,14 50,14 Z", fill: "rgba(0,0,0,0.55)" }),
    e.jsx("path", { d: "M 50,12 C 74,12 84,30 80,60 C 76,78 50,88 50,88 C 50,88 24,78 20,60 C 16,30 26,12 50,12 Z", fill: "url(#mw_aj_bz)", stroke: "#271407", strokeWidth: "2" }),
    e.jsx("path", { d: "M 50,12 L 50,88 M 20,60 L 80,60 M 26,24 L 74,76 M 26,76 L 74,24", stroke: "#78350f", strokeWidth: "0.8", opacity: "0.35" }),
    e.jsx("path", { d: "M 50,18 C 70,18 78,34 74,58 C 70,72 50,80 50,80 C 50,80 30,72 26,58 C 22,34 30,18 50,18 Z", fill: "none", stroke: "#fef08a", strokeWidth: "1.5", strokeDasharray: "3 2" }),
    e.jsx("circle", { cx: "50", cy: "48", r: "22", fill: "#030712", stroke: "url(#mw_aj_bz)", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 42,32 C 34,26 28,34 35,40 C 40,44 32,50 30,46", fill: "none", stroke: "url(#mw_snake_green)", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "30", cy: "46", r: "0.8", fill: "#fbbf24" }),
    e.jsx("path", { d: "M 58,32 C 66,26 72,34 65,40 C 60,44 68,50 70,46", fill: "none", stroke: "url(#mw_snake_green)", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "70", cy: "46", r: "0.8", fill: "#fbbf24" }),
    e.jsx("path", { d: "M 32,45 C 24,48 26,58 34,58 C 38,58 35,66 32,64", fill: "none", stroke: "url(#mw_snake_green)", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 68,45 C 76,48 74,58 66,58 C 62,58 65,66 68,64", fill: "none", stroke: "url(#mw_snake_green)", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 42,28 Q 50,22 58,28 Q 50,32 42,28", fill: "none", stroke: "url(#mw_snake_gold)", strokeWidth: "2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 45,25 Q 50,18 55,25", fill: "none", stroke: "url(#mw_snake_green)", strokeWidth: "1.8", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 42,42 C 42,35 58,35 58,42 C 58,52 50,58 50,58 C 50,58 42,52 42,42 Z", fill: "url(#mw_medusa_skin)", stroke: "#042f2e", strokeWidth: "1" }),
    e.jsx("path", { d: "M 48,37 L 50,39 L 52,37", stroke: "#fbbf24", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "46.5", cy: "43", rx: "2.5", ry: "1.2", fill: "#030712" }),
    e.jsx("ellipse", { cx: "46.5", cy: "43", rx: "1.5", ry: "0.6", fill: "#34d399" }),
    e.jsx("circle", { cx: "46.5", cy: "43", r: "0.5", fill: "#ffffff" }),
    e.jsx("ellipse", { cx: "53.5", cy: "43", rx: "2.5", ry: "1.2", fill: "#030712" }),
    e.jsx("ellipse", { cx: "53.5", cy: "43", rx: "1.5", ry: "0.6", fill: "#34d399" }),
    e.jsx("circle", { cx: "53.5", cy: "43", r: "0.5", fill: "#ffffff" }),
    e.jsx("path", { d: "M 44,41 Q 47,41 49,43 M 56,41 Q 53,41 51,43", stroke: "#042f2e", strokeWidth: "1", fill: "none" }),
    e.jsx("path", { d: "M 50,43 L 50,49 L 48.5,50 L 51.5,50", stroke: "#042f2e", strokeWidth: "0.8", strokeLinecap: "round", fill: "none" }),
    e.jsx("path", { d: "M 46,52 Q 50,56 54,52 Q 50,50 46,52 Z", fill: "#991b1b", stroke: "#042f2e", strokeWidth: "0.8" }),
    e.jsx("polygon", { points: "48,51 49,52.5 49.5,51", fill: "#ffffff" }),
    e.jsx("polygon", { points: "52,51 51,52.5 50.5,51", fill: "#ffffff" })
  ]}),\n  `;
    code = code.replace(originalBlock, newBlock);
    console.log("-> Aegis patched successfully.");
  }
}

// 2. Patch art_gladius_hispaniensis
const gladiusStart = code.indexOf("art_gladius_hispaniensis:", 700000);
if (gladiusStart !== -1) {
  const gladiusEnd = code.indexOf("// 18. Golden Bulla of Young Augustus", gladiusStart);
  if (gladiusEnd !== -1) {
    const originalBlock = code.substring(gladiusStart, gladiusEnd);
    const newBlock = `art_gladius_hispaniensis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_gh_st", x1: "20%", y1: "20%", x2: "80%", y2: "80%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#334155" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_gh_iv", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "100%", stopColor: "#d97706" })
      ]})
    ]}),
    e.jsx("path", { d: "M 43,47 L 81,9 L 85,13 L 47,51 Z", fill: "rgba(0,0,0,0.25)" }),
    e.jsx("polygon", { points: "45,50 82,13 85,16 48,53", fill: "url(#mw_gh_st)", stroke: "#0f172a", strokeWidth: "0.8" }),
    e.jsx("polygon", { points: "48,53 85,16 88,19 51,56", fill: "#475569", stroke: "#0f172a", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "48", y1: "53", x2: "85", y2: "16", stroke: "#ffffff", strokeWidth: "1.4" }),
    e.jsx("line", { x1: "52", y1: "51", x2: "80", y2: "23", stroke: "#1e293b", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "44", y1: "59", x2: "72", y2: "31", stroke: "#1e293b", strokeWidth: "0.8" }),
    e.jsx("ellipse", { cx: "45", cy: "56", rx: "12", ry: "4.5", transform: "rotate(-45 45 56)", fill: "url(#mw_gh_iv)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "41", y: "54", width: "8", height: "4", transform: "rotate(-45 45 56)", fill: "#fbbf24", stroke: "#78350f", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "29", y1: "72", x2: "41", y2: "60", stroke: "#451a03", strokeWidth: "5.5", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "39", cy: "62", r: "3.5", fill: "url(#mw_gh_iv)", stroke: "#451a03", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "35", cy: "66", r: "3.5", fill: "url(#mw_gh_iv)", stroke: "#451a03", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "31", cy: "70", r: "3.5", fill: "url(#mw_gh_iv)", stroke: "#451a03", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "25", cy: "76", r: "7", fill: "url(#mw_gh_iv)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "21", cy: "80", r: "2.5", fill: "#fbbf24", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "25", cy: "76", r: "2.2", fill: "#dc2626" })
  ]}),\n  `;
    code = code.replace(originalBlock, newBlock);
    console.log("-> Gladius patched successfully.");
  }
}

// 3. Patch art_lorica_segmentata
const loricaStart = code.indexOf("art_lorica_segmentata:", 700000);
if (loricaStart !== -1) {
  const loricaEnd = code.indexOf("// 29. Commentaries of Julius Caesar", loricaStart);
  if (loricaEnd !== -1) {
    const originalBlock = code.substring(loricaStart, loricaEnd);
    const newBlock = `art_lorica_segmentata: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ls_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e293b" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_ls_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("path", { d: "M 32,15 C 38,12 62,12 68,15 L 76,28 L 72,32 L 64,22 C 58,26 42,26 36,22 L 28,32 L 24,28 Z", fill: "#991b1b", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("path", { d: "M 22,25 Q 12,30 14,42 Q 22,46 28,34 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 78,25 Q 88,30 86,42 Q 78,46 72,34 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 15,31 Q 22,36 28,31 M 14,37 Q 21,41 27,37 M 73,31 Q 78,36 85,31 M 73,37 Q 79,41 86,37", stroke: "#1e293b", strokeWidth: "1", fill: "none" }),
    e.jsx("path", { d: "M 28,24 Q 50,30 72,24 L 75,34 Q 50,40 25,34 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 25,34 Q 50,40 75,34 L 77,46 Q 50,52 23,46 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 23,46 Q 50,52 77,46 L 79,58 Q 50,64 21,58 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 21,58 Q 50,64 79,58 L 80,70 Q 50,76 20,70 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 20,70 Q 50,76 80,70 L 78,82 Q 50,88 22,82 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "22", x2: "50", y2: "82", stroke: "#1e293b", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "46", cy: "30", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("circle", { cx: "54", cy: "30", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("line", { x1: "46", y1: "30", x2: "54", y2: "30", stroke: "url(#mw_ls_bz)", strokeWidth: "1" }),
    e.jsx("circle", { cx: "45", cy: "42", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("circle", { cx: "55", cy: "42", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("line", { x1: "45", y1: "42", x2: "55", y2: "42", stroke: "url(#mw_ls_bz)", strokeWidth: "1" }),
    e.jsx("circle", { cx: "44", cy: "54", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("circle", { cx: "56", cy: "54", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("line", { x1: "44", y1: "54", x2: "56", y2: "54", stroke: "url(#mw_ls_bz)", strokeWidth: "1" }),
    e.jsx("circle", { cx: "44", cy: "66", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("circle", { cx: "56", cy: "66", r: "1.5", fill: "url(#mw_ls_bz)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("line", { x1: "44", y1: "66", x2: "56", y2: "66", stroke: "url(#mw_ls_bz)", strokeWidth: "1" }),
    e.jsx("path", { d: "M 32,24 Q 50,30 68,24", fill: "none", stroke: "url(#mw_ls_bz)", strokeWidth: "2.5" })
  ]}),\n  `;
    code = code.replace(originalBlock, newBlock);
    console.log("-> Lorica patched successfully.");
  }
}

// 4. Patch art_legion_roster
const rosterStart = code.indexOf("art_legion_roster:", 700000);
if (rosterStart !== -1) {
  const rosterEnd = code.indexOf("for (const [k, v] of Object.entries(__masterworkSVGs))", rosterStart);
  if (rosterEnd !== -1) {
    const originalBlock = code.substring(rosterStart, rosterEnd);
    const newBlock = `art_legion_roster: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_lr_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_lr_prch", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fcfaf2" }),
        e.jsx("stop", { offset: "60%", stopColor: "#fdf4e3" }),
        e.jsx("stop", { offset: "100%", stopColor: "#e6ccb2" })
      ]})
    ]}),
    e.jsx("rect", { x: "16", y: "12", width: "5", height: "76", rx: "1", fill: "url(#mw_lr_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "18.5", cy: "12", r: "4.5", fill: "url(#mw_lr_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "18.5", cy: "88", r: "4.5", fill: "url(#mw_lr_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("rect", { x: "79", y: "12", width: "5", height: "76", rx: "1", fill: "url(#mw_lr_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "81.5", cy: "12", r: "4.5", fill: "url(#mw_lr_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "81.5", cy: "88", r: "4.5", fill: "url(#mw_lr_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("rect", { x: "21", y: "15", width: "58", height: "70", rx: "2", fill: "url(#mw_lr_prch)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 21,15 Q 23,50 21,85", fill: "none", stroke: "#78350f", strokeWidth: "0.5", opacity: "0.4" }),
    e.jsx("path", { d: "M 79,15 Q 77,50 79,85", fill: "none", stroke: "#78350f", strokeWidth: "0.5", opacity: "0.4" }),
    e.jsx("path", { d: "M 50,28 Q 42,22 40,28 Q 44,32 50,32 Z", fill: "url(#mw_lr_bz)", opacity: "0.85" }),
    e.jsx("path", { d: "M 50,28 Q 58,22 60,28 Q 56,32 50,32 Z", fill: "url(#mw_lr_bz)", opacity: "0.85" }),
    e.jsx("path", { d: "M 50,24 C 49,24 49,27 50,29 C 51,27 51,24 50,24 Z", fill: "url(#mw_lr_bz)", opacity: "0.95" }),
    e.jsx("rect", { x: "26", y: "36", width: "48", height: "2.5", fill: "#7f1d1d", rx: "0.5" }),
    e.jsx("path", { d: "M 26,44 L 54,44 M 58,44 L 74,44", stroke: "#271407", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 26,50 L 46,50 M 50,50 L 74,50", stroke: "#271407", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 26,56 L 62,56 M 66,56 L 74,56", stroke: "#271407", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 26,62 L 50,62 M 54,62 L 68,62", stroke: "#271407", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 26,68 L 74,68", stroke: "#7f1d1d", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 46,82 L 44,94 L 48,94 Z M 54,82 L 56,94 L 52,94 Z", fill: "#991b1b", opacity: "0.85" }),
    e.jsx("circle", { cx: "50", cy: "82", r: "6", fill: "#991b1b", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "82", r: "3.5", fill: "none", stroke: "#fef08a", strokeWidth: "0.8", opacity: "0.7" })
  ]})\n};\n`;
    code = code.replace(originalBlock, newBlock);
    console.log("-> Roster patched successfully.");
  }
}

fs.writeFileSync(filePath, code, 'utf8');
console.log("=== Graphics Patching Complete ===");
