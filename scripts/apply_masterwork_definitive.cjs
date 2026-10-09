const fs = require('fs');
const path = require('path');

console.log("=== EXECUTING MASTERWORK DEFINITIVE FIX ===");

const c0Path = path.join(__dirname, '../c0_dump.js');
const v37Path = path.join(__dirname, '../public/assets/index-V37.js');

if (!fs.existsSync(c0Path) || !fs.existsSync(v37Path)) {
  console.error("ERROR: Missing c0_dump.js or index-V37.js");
  process.exit(1);
}

const c0 = fs.readFileSync(c0Path, 'utf8');
let v37 = fs.readFileSync(v37Path, 'utf8');

// 1. Extract Ze
const idxZe = c0.indexOf("const Ze=");
let depthZe = 0, startedZe = false, endZe = -1;
for (let i = idxZe; i < c0.length; i++) {
  if (c0[i] === "{" || c0[i] === "(") { if (!startedZe && c0[i] === "{") startedZe = true; depthZe++; }
  else if (c0[i] === "}" || c0[i] === ")") { depthZe--; if (startedZe && depthZe === 0) { endZe = i + 1; break; } }
}
const zeAssignIdx = c0.indexOf(";Object.assign(Ze,", endZe - 10);
let endZeAssign = -1;
if (zeAssignIdx !== -1) {
  let depth = 0, started = false;
  for (let i = zeAssignIdx; i < c0.length; i++) {
    if (c0[i] === "(" || c0[i] === "{") { if (!started && c0[i] === "{") started = true; depth++; }
    else if (c0[i] === ")" || c0[i] === "}") { depth--; if (started && depth === 0) { endZeAssign = i + 2; break; } }
  }
}
const zeCode = c0.substring(idxZe, endZeAssign !== -1 ? endZeAssign : endZe).replace("const Ze=", "var Ze=");

// 2. Extract je
const idxJe = c0.indexOf("je={");
const startJe = c0.lastIndexOf("var je=", idxJe) !== -1 ? c0.lastIndexOf("var je=", idxJe) : c0.lastIndexOf("let je=", idxJe) !== -1 ? c0.lastIndexOf("let je=", idxJe) : c0.lastIndexOf("const je=", idxJe) !== -1 ? c0.lastIndexOf("const je=", idxJe) : idxJe;
let depthJe = 0, startedJe = false, endJe = -1;
for (let i = idxJe; i < c0.length; i++) {
  if (c0[i] === "{" || c0[i] === "(") { if (!startedJe && c0[i] === "{") startedJe = true; depthJe++; }
  else if (c0[i] === "}" || c0[i] === ")") { depthJe--; if (startedJe && depthJe === 0) { endJe = i + 1; break; } }
}
const jeAssignIdx = c0.indexOf(";Object.assign(je,", endJe - 10);
let endJeAssign = -1;
if (jeAssignIdx !== -1) {
  let depth = 0, started = false;
  for (let i = jeAssignIdx; i < c0.length; i++) {
    if (c0[i] === "(" || c0[i] === "{") { if (!started && c0[i] === "{") started = true; depth++; }
    else if (c0[i] === ")" || c0[i] === "}") { depth--; if (started && depth === 0) { endJeAssign = i + 2; break; } }
  }
}
const rawJe = c0.substring(startJe, endJeAssign !== -1 ? endJeAssign : endJe);
const jeCode = (rawJe.startsWith("var ") || rawJe.startsWith("let ") || rawJe.startsWith("const ")) ? rawJe.replace(/^(let|const|var)\s+je=/, "var je=") : "var " + rawJe;

// 3. Extract Medallion block
const idxXd = c0.indexOf("Xd=");
const idxRtEnd = c0.indexOf("rt.displayName=\"Medallion\";") + "rt.displayName=\"Medallion\";".length;
const medBlock = ("var " + c0.substring(idxXd, idxRtEnd)).replace("const rt=", "var rt=");

// Combine masterwork system
const masterworkHeader = `\n
// === MASTERWORK EMBLEM & MEDALLION SYSTEM (RESTORED FROM C0) ===
var e = ReactJSX;
var lt = React;
var b = React;

${zeCode}

${jeCode}

Object.assign(je, Ze);
Object.assign(Ze, je);

${medBlock}

var Vr = rt;
var Medallion = rt;
if (typeof window !== 'undefined') {
  window.rt = rt;
  window.Ao = Ao;
  window.$i = $i;
  window.Vr = Vr;
  window.Medallion = rt;
  window.Jd = Jd;
  window.Fo = Fo;
  window.Ze = Ze;
  window.je = je;
}
\n`;

// Remove previous duplicates or old injected blocks
while (v37.indexOf("rt.displayName=\"Medallion\";") !== -1) {
  const firstRt = v37.indexOf("rt.displayName=\"Medallion\";");
  const firstXd = v37.lastIndexOf("var Xd=", firstRt) !== -1 ? v37.lastIndexOf("var Xd=", firstRt) : v37.lastIndexOf("Xd=", firstRt);
  v37 = v37.substring(0, firstXd) + v37.substring(firstRt + "rt.displayName=\"Medallion\";".length);
}

// Inject masterwork header right after React import
const importMarker = 'import { R as React, c as ReactDOM, j as ReactJSX } from "./vendor-react-CXvBskV6.js";';
if (v37.includes(importMarker)) {
  v37 = v37.replace(importMarker, importMarker + masterworkHeader);
  console.log("SUCCESS: Injected masterwork Ze, je, Medallions.");
} else {
  console.error("ERROR: Could not find React import marker in v37!");
  process.exit(1);
}

// Fix DummyIcon fallbacks so medallion & emblem components resolve to actual definitions
v37 = v37.replace(/var rt = typeof window !== "undefined" && window\.rt \|\| DummyIcon;/g, 'var rt = window.rt || rt;');
v37 = v37.replace(/var Vr = typeof window !== "undefined" && window\.Vr \|\| DummyIcon;/g, 'var Vr = window.rt || rt;');
v37 = v37.replace(/var Ao = typeof window !== "undefined" && window\.Ao \|\| DummyIcon;/g, 'var Ao = window.Ao || Ao;');
v37 = v37.replace(/var \$i = typeof window !== "undefined" && window\.\$i \|\| DummyIcon;/g, 'var $i = window.$i || $i;');

// Replace player token map component (zo) cleanly
const idxZo = v37.indexOf("var zo = b.memo");
if (idxZo !== -1) {
  const idxPp = v37.indexOf("var pp = ", idxZo);
  if (idxPp !== -1) {
    const cleanZoCode = `var zo = b.memo(({ player: t, playerMode: ge = "sea", isMoving: V = false, activeVector: Zs, velocity: vel, modeTransitioning: ht, mapScale: Je = 1 }) => {
  const isSea = ge === "sea";
  const iter = t?.iter ?? 6;
  const maxIter = t?.maxIter ?? 6;
  const variant = isSea ? "imperial_purple" : "crimson_blood";
  const emblem = isSea ? "emblem_ship_roman" : "emblem_legion_roman";
  
  return e.jsxs("div", {
    className: "relative flex flex-col items-center justify-center select-none pointer-events-auto cursor-pointer group",
    style: { transform: "scale(" + Math.max(0.85, Math.min(1.25, 1 / (Je || 1))) + ")", transformOrigin: "center center" },
    children: [
      e.jsx("div", {
        className: "absolute -inset-3 rounded-full pointer-events-none transition-all duration-300 " + (
          isSea
            ? "border-2 border-amber-400/90 shadow-[0_0_24px_rgba(245,158,11,0.75),inset_0_0_12px_rgba(245,158,11,0.4)]"
            : "border-2 border-rose-500/90 shadow-[0_0_24px_rgba(244,63,94,0.75),inset_0_0_12px_rgba(244,63,94,0.4)]"
        ) + (V ? " animate-pulse scale-110" : " scale-100")
      }),
      e.jsx(rt, {
        size: 64,
        variant: variant,
        emblem: emblem,
        level: 5,
        isElaborate: true,
        className: "drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] transition-transform duration-200 group-hover:scale-105"
      }),
      e.jsxs("div", {
        className: "mt-1.5 px-3 py-0.5 bg-black/90 border border-amber-500/80 rounded-full flex items-center gap-1.5 shadow-xl text-[10px] font-bold text-amber-300 font-cinzel tracking-wider backdrop-blur-md",
        children: [
          e.jsx("span", { className: "text-amber-400/90", children: "ITER" }),
          e.jsx("span", { className: "text-amber-100 font-mono text-xs", children: iter + "/" + maxIter })
        ]
      })
    ]
  });
});\n`;
    v37 = v37.substring(0, idxZo) + cleanZoCode + v37.substring(idxPp);
    console.log("SUCCESS: Replaced zo component with Roman Medallion Player Token.");
  }
}

// Fix Movement: Auto-clear ANCORIS stance
const ancorisPattern = 'if (ee.fleetStance === "ANCORIS") return Y("IN ANCORIS (ANCHORED)", "Vessel is riding at anchor. Switch stance to sail.", "warning"), false;';
const ancorisFix = 'if (ee.fleetStance === "ANCORIS") { ee.fleetStance = "VELIS"; Y("ANCHOR WEIGHED", "Stance automatically set to Velis for voyage.", "imperial"); }';
if (v37.includes(ancorisPattern)) {
  v37 = v37.replace(ancorisPattern, ancorisFix);
  console.log("SUCCESS: Fixed ANCORIS stance check in movement logic (_r).");
}

// Ensure Top HUD Save Button is present and functional
if (!v37.includes("top-hud-save-btn")) {
  v37 = v37.replace(
    'e.jsx(rt, { size: "md", variant: "gold", emblem: "custom_codex",',
    'e.jsx(rt, { size: "md", variant: "gold", emblem: "custom_codex", id: "top-hud-save-btn",'
  );
  console.log("SUCCESS: Added top-hud-save-btn ID to Top HUD save medallion.");
}

// Save updated v37
fs.writeFileSync(v37Path, v37, 'utf8');
console.log("SUCCESS: Saved updated public/assets/index-V37.js");

// Sync across public/assets/ and dist/
const publicDir = path.join(__dirname, '../public/assets');
const files = fs.readdirSync(publicDir);
files.forEach(file => {
  if (file.startsWith('index-V') && file.endsWith('.js')) {
    fs.copyFileSync(v37Path, path.join(publicDir, file));
  }
});

const distDir = path.join(__dirname, '../dist/assets');
if (fs.existsSync(distDir)) {
  const distFiles = fs.readdirSync(distDir);
  distFiles.forEach(file => {
    if (file.startsWith('index-V') && file.endsWith('.js')) {
      fs.copyFileSync(v37Path, path.join(distDir, file));
    }
  });
}

// Sync index.html
const htmlPath = path.join(__dirname, '../index.html');
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  const newVer = "V37_" + Date.now();
  html = html.replace(/V37_\d+/g, newVer);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`SUCCESS: Updated index.html bundle version to ${newVer}.`);
}

console.log("=== ALL MASTERWORK FIXES APPLIED ===");
