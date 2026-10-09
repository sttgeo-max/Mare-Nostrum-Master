const fs = require('fs');
const path = require('path');

console.log("=== EXECUTING MASTERWORK TOP-LEVEL DEFINITIVE FIX ===");

const c0Path = path.join(__dirname, '../c0_dump.js');
const v37Path = path.join(__dirname, '../public/assets/index-V37.js');

if (!fs.existsSync(c0Path)) {
  console.error("ERROR: c0_dump.js not found!");
  process.exit(1);
}

const c0 = fs.readFileSync(c0Path, 'utf8');

// 1. Extract Ze
const idxZe = c0.indexOf('const Ze=');
let depthZe = 0, startedZe = false, endZe = -1;
for (let i = idxZe; i < c0.length; i++) {
  if (c0[i] === '{') { startedZe = true; depthZe++; }
  else if (c0[i] === '}') { depthZe--; if (startedZe && depthZe === 0) { endZe = i + 1; break; } }
}
const zeCode = c0.substring(idxZe, endZe).replace('const Ze=', 'var Ze=');

// 2. Extract je
const idxJe = c0.indexOf('je={');
const startJe = idxJe;
let depthJe = 0, startedJe = false, endJe = -1;
for (let i = idxJe; i < c0.length; i++) {
  if (c0[i] === '{') { startedJe = true; depthJe++; }
  else if (c0[i] === '}') { depthJe--; if (startedJe && depthJe === 0) { endJe = i + 1; break; } }
}
const endJeAssign = c0.indexOf(';', c0.indexOf('Object.assign(je,', endJe));
const jeCode = 'var ' + c0.substring(startJe, endJeAssign + 1);

// 3. Extract oo
const idxOo = c0.indexOf('const oo=');
let depthOo = 0, startedOo = false, endOo = -1;
for (let i = idxOo; i < c0.length; i++) {
  if (c0[i] === '{') { startedOo = true; depthOo++; }
  else if (c0[i] === '}') { depthOo--; if (startedOo && depthOo === 0) { endOo = i + 1; break; } }
}
const ooCode = c0.substring(idxOo, endOo).replace('const oo=', 'var oo=') + ';';

// 4. Extract Medallion Block from Xd up to end of Ha
const idxXd = c0.indexOf('Xd=');
const startXd = idxXd;
const idxHaEnd = c0.indexOf('Ha.displayName=\"PhysicalTokenGrounding\";') + 'Ha.displayName=\"PhysicalTokenGrounding\";'.length;
const rawMedBlock = 'var ' + c0.substring(startXd, idxHaEnd);

// Replace const declarations with var declarations to allow re-assignment / global attachment
const medBlock = rawMedBlock.replace(/const\s+([a-zA-Z0-9_$]+)\s*=/g, 'var $1=');

// 5. Construct Top-Level Injection Block
const topInjection = `
/* === MARE NOSTRUM II MASTERWORK MEDALLION & EMBLEM ENGINE === */
var e = ReactJSX;
var lt = React;
var b = React;

// 1. Core Data Structures
${zeCode}
${jeCode}
${ooCode}

// 2. Icon & Graphic Fallbacks
var ds = typeof window !== "undefined" && window.ds || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M19 19l-6-6" }) }));
var as = typeof window !== "undefined" && window.as || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M12 5V19M5 12h14M12 19c-3.8 0-7-3.2-7-7M12 19c3.8 0 7-3.2 7-7" }) }));
var Zl = typeof window !== "undefined" && window.Zl || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("circle", { cx: "12", cy: "12", r: "10" }) }));
var sd = typeof window !== "undefined" && window.sd || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M5 2h14M5 22h14M17 2v5c0 1.5-1 2.5-2.5 3.5L12 12M7 2v5c0 1.5 1 2.5 2.5 3.5L12 12M12 12l2.5 1.5c1.5 1 2.5 2 2.5 3.5v5M12 12L9.5 13.5C8 14.5 7 15.5 7 17v5" }) }));
var Pt = typeof window !== "undefined" && window.Pt || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) }));
var Hn = typeof window !== "undefined" && window.Hn || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("circle", { cx: "12", cy: "12", r: "5" }) }));
var td = typeof window !== "undefined" && window.td || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 0-9-9Z" }) }));
var ed = typeof window !== "undefined" && window.ed || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 8.58M13 11l-4 6h6l-4 6" }) }));
var Jc = typeof window !== "undefined" && window.Jc || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z M10 20l-2 3 M14 20l-2 3" }) }));
var pi = typeof window !== "undefined" && window.pi || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M12.8 18c.2-.3.2-.8-.1-1.1-.4-.4-.9-.5-1.4-.4h-1.5c-.3 0-.5.2-.5.5s.2.5.5.5h1.5M17.2 12c.5 0 .9-.4.9-.9 0-.6-.5-1.1-1.1-1.1H12.5c-.3 0-.5.2-.5.5s.2.5.5.5h4.7M19.5 6c.5 0 .9-.4.9-.9 0-.6-.5-1.1-1.1-1.1H12.5c-.3 0-.5.2-.5.5s.2.5.5.5h7.4" }) }));
var Po = typeof window !== "undefined" && window.Po || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }) }));
var bi = typeof window !== "undefined" && window.bi || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7" }) }));
var Kt = typeof window !== "undefined" && window.Kt || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" }) }));
var Yt = typeof window !== "undefined" && window.Yt || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("circle", { cx: "12", cy: "12", r: "8" }) }));
var Kc = typeof window !== "undefined" && window.Kc || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsxs("g", { children: [e.jsx("path", { d: "M12 2a3 3 0 0 0-3 3v2h6V5a3 3 0 0 0-3-3z" }), e.jsx("path", { d: "M6 12a6 6 0 0 0 12 0V7H6v5z" }), e.jsx("path", { d: "M12 18v4M9 22h6" })] }) }));
var ml = typeof window !== "undefined" && window.ml || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M6 3h12l4 6-10 12L2 9z" }) }));
var Bs = typeof window !== "undefined" && window.Bs || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }) }));
var bs = typeof window !== "undefined" && window.bs || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" }) }));
var xl = typeof window !== "undefined" && window.xl || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }) }));
var Xc = typeof window !== "undefined" && window.Xc || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" }) }));
var Yl = typeof window !== "undefined" && window.Yl || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" }) }));
var pl = typeof window !== "undefined" && window.pl || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" }) }));
var Ql = typeof window !== "undefined" && window.Ql || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("rect", { x: "2", y: "7", width: "20", height: "14", rx: "2" }) }));
var xt = typeof window !== "undefined" && window.xt || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M12 3v3 M12 18v3 M3 12h3 M18 12h3" }) }));
var cs = typeof window !== "undefined" && window.cs || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" }) }));
var Zc = typeof window !== "undefined" && window.Zc || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3M15.5 7.5l-3-3" }) }));
var Mn = typeof window !== "undefined" && window.Mn || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M2 21h20 M19.3 14.8C21.1 13.5 22 11.7 22 10c0-4.4-4-8-10-8S2 5.6 2 10c0 1.7.9 3.5 2.7 4.8L2 19h20l-2.7-4.2z" }) }));
var Yc = typeof window !== "undefined" && window.Yc || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M21 19.5c0 .28-.22.5-.5.5h-17a.5.5 0 0 1-.5-.5V8c0-.28.22-.5.5-.5h3a.5.5 0 0 1 .5.5v3h4V8a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3h4V8a.5.5 0 0 1 .5-.5h3c.28 0 .5.22.5.5v11.5z" }) }));
var Fa = typeof window !== "undefined" && window.Fa || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M4 22h16 M4 20h16 M4 2v3h16V2 M6 5v15 M10 5v15 M14 5v15 M18 5v15" }) }));
var Lr = typeof window !== "undefined" && window.Lr || ((props) => e.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", ...props, children: e.jsx("path", { d: "M12 2a8 8 0 0 0-8 8c0 3 2.5 5.5 3 6.5v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3c.5-1 3-3.5 3-6.5a8 8 0 0 0-8-8z" }) }));

// 3. Components & Logic
${medBlock}

// Masterwork Enemy Fleet Medallion Token
var _Uo = b.memo(({ fleet, isMoving = false, size = 32, isElaborate = true }) => {
  if (!fleet) return null;
  const unit = fleet.enemyUnit || {};
  const faction = fleet.faction || unit.faction || "punic";
  const type = unit.type || fleet.type || "ship";
  const modelType = unit.shipModelType || unit.modelType || fleet.shipModelType || fleet.modelType || "trireme";
  const level = unit.level || fleet.level || fleet.tier || 1;
  const isDestroyed = !!fleet.defeated;

  return e.jsx(Ha, {
    size: size,
    medium: "water",
    isMoving: isMoving,
    isElaborate: isElaborate,
    children: e.jsx(dc, {
      type: type,
      faction: faction,
      shipModelType: modelType,
      level: level,
      size: size,
      isDestroyed: isDestroyed
    })
  });
});

// Masterwork Artifact Medallion Token
var _jc = b.memo(({ type, rarity = "bronze", isNear = false, isTracked = false, size = 28 }) => {
  const normRarity = (rarity || "bronze").toLowerCase();
  const variant = normRarity === "radiant" ? "imperial_purple" : normRarity === "gold" ? "gold_sun" : normRarity === "silver" ? "silver_moon" : "bronze_shield";
  const emblem = type === "amphora" ? "amphora" : type === "treasure" ? "coins" : type === "scroll" ? "scroll" : "crown";
  const showGlow = isNear || isTracked || normRarity === "radiant" || normRarity === "gold";

  return e.jsx(Ha, {
    size: size,
    medium: "relic",
    isElaborate: true,
    children: e.jsx(rt, {
      size: size,
      variant: variant,
      emblem: emblem,
      showGlow: showGlow,
      isElaborate: true
    })
  });
});

// Masterwork Player Medallion Token
var _zo = b.memo(({ player: t, playerMode: ge = "sea", isMoving: V = false, activeVector: Zs, velocity: vel, modeTransitioning: ht, mapScale: Je = 1 }) => {
  const isSea = ge === "sea";
  const iter = t?.iter ?? 6;
  const maxIter = t?.maxIter ?? 6;
  const level = t?.level || 5;
  const modelType = isSea ? (t?.flagshipModel || "trireme") : "legionary";

  return e.jsxs("div", {
    className: "relative flex flex-col items-center justify-center select-none pointer-events-auto cursor-pointer group",
    style: { transform: "scale(" + Math.max(0.85, Math.min(1.25, 1 / (Je || 1))) + ")", transformOrigin: "center center" },
    children: [
      e.jsx(Ha, {
        size: 56,
        medium: isSea ? "water" : "land",
        isMoving: V,
        isElaborate: true,
        children: e.jsx(dc, {
          type: isSea ? "ship" : "legion",
          faction: "player",
          shipModelType: modelType,
          level: level,
          size: 56
        })
      }),
      e.jsxs("div", {
        className: "mt-1 px-2.5 py-0.5 bg-black/90 border border-amber-500/80 rounded-full flex items-center gap-1 shadow-xl text-[10px] font-bold text-amber-300 font-cinzel tracking-wider backdrop-blur-md",
        children: [
          e.jsx("span", { className: "text-amber-400/90", children: "ITER" }),
          e.jsx("span", { className: "text-amber-100 font-mono text-xs", children: iter + "/" + maxIter })
        ]
      })
    ]
  });
});

// 4. Global Attachments & Synchronization
if (typeof window !== "undefined") {
  window.Ze = Ze;
  window.je = je;
  window.oo = oo;
  window.rt = rt;
  window.Medallion = rt;
  window.Fo = Fo;
  window.TokenBaseFrame = Fo;
  window.Ha = Ha;
  window.PhysicalTokenGrounding = Ha;
  window.Vr = Vr;
  window.HUDButton = Vr;
  window.Kd = Kd;
  window.Yi = Yi;
  window.dc = dc;
  window.Uo = _Uo;
  window.jc = _jc;
  window.zo = _zo;
  window.$i = $i;
  window.EmblemSVG = $i;
  window.Ao = Ao;
  window.Jd = Jd;
  
  // Attach icons to window if they don't exist
  window.ds = window.ds || ds; window.as = window.as || as; window.Zl = window.Zl || Zl;
  window.sd = window.sd || sd; window.Pt = window.Pt || Pt; window.Hn = window.Hn || Hn;
  window.td = window.td || td; window.ed = window.ed || ed; window.Jc = window.Jc || Jc;
  window.pi = window.pi || pi; window.Po = window.Po || Po; window.bi = window.bi || bi;
  window.Kt = window.Kt || Kt; window.Yt = window.Yt || Yt; window.Kc = window.Kc || Kc;
  window.ml = window.ml || ml; window.Bs = window.Bs || Bs; window.bs = window.bs || bs;
  window.xl = window.xl || xl; window.Xc = window.Xc || Xc; window.Yl = window.Yl || Yl;
  window.pl = window.pl || pl; window.Ql = window.Ql || Ql; window.xt = window.xt || xt;
  window.cs = window.cs || cs; window.Zc = window.Zc || Zc; window.Mn = window.Mn || Mn;
  window.Yc = window.Yc || Yc; window.Fa = window.Fa || Fa; window.Lr = window.Lr || Lr;
}
/* === END MARE NOSTRUM II MASTERWORK ENGINE === */
`;

// Read public/assets/index-V37.js
let v37 = fs.readFileSync(v37Path, 'utf8');

// 6. CLEANUP: Remove all previous patch attempts to ensure a clean state
console.log("Cleaning up previous patch attempts...");
const patchMarker = '/* === MARE NOSTRUM II MASTERWORK MEDALLION & EMBLEM ENGINE === */';
const endMarker = '/* === END MARE NOSTRUM II MASTERWORK ENGINE === */';

// Remove entire blocks between markers
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const blockRegex = new RegExp(escapeRegExp(patchMarker) + '[\\s\\S]*?' + escapeRegExp(endMarker), 'g');
v37 = v37.replace(blockRegex, "");

// Remove any stray var declarations or icon fallback blocks from previous failed runs
const iconFallbackMarker = 'var ds = typeof window !== "undefined" && window.ds';
if (v37.indexOf(iconFallbackMarker) !== -1) {
  console.log("Found legacy icon fallback block, removing...");
  // Try to find the whole block up to the next meaningful line
  const lines = v37.split("\n");
  v37 = lines.filter(line => !line.includes('var ds = typeof window') && !line.includes('var as = typeof window') && !line.includes('var Zl = typeof window') && !line.includes('var sd = typeof window') && !line.includes('var Kc = typeof window')).join("\n");
}

// 7. LOCATE INJECTION POINT (Immediately after imports)
const importMarker = 'import { R as React, c as ReactDOM, j as ReactJSX } from "./vendor-react-CXvBskV6.js";';
const importEndIdx = v37.indexOf(importMarker);
if (importEndIdx === -1) {
  console.error("ERROR: Cannot find first import statement!");
  process.exit(1);
}
const importEnd = importEndIdx + importMarker.length;

// 8. APPLY NEW PATCH AT THE TOP
console.log("Applying unified top-level patch...");
let updatedV37 = v37.substring(0, importEnd) + "\n" + topInjection + "\n" + v37.substring(importEnd);

// 9. SELF-HEALING REPLACEMENTS: Ensure original code points to our globals if they exist
console.log("Adding self-healing hooks to original code...");
// Replace component declarations with fallbacks. We use global flags to catch all occurrences.
// Note: These replacements target the ORIGINAL code that was shifted down.
updatedV37 = updatedV37.replace(
  /var zo = b\.memo\(\(\{ player: t, playerMode: ge = "sea"/g,
  'var zo = typeof window !== "undefined" && window.zo || b.memo(({ player: t, playerMode: ge = "sea"'
);
updatedV37 = updatedV37.replace(
  /var rt = b\.memo\(function\(\{/g,
  'var rt = typeof window !== "undefined" && window.rt || b.memo(function({'
);
updatedV37 = updatedV37.replace(
  /var Fo = lt\.memo\(\(\{size:t=32/g,
  'var Fo = typeof window !== "undefined" && window.Fo || lt.memo(({size:t=32'
);
updatedV37 = updatedV37.replace(
  /var \$i = function\(\{ name: name2 = ""/g,
  'var $i = typeof window !== "undefined" && window.$i || function({ name: name2 = ""'
);

// 10. FINAL WRITE
fs.writeFileSync(v37Path, updatedV37, 'utf8');
console.log("SUCCESS: Saved updated public/assets/index-V37.js (Size:", updatedV37.length, "bytes)");

// Update index.html version tag to invalidate cache
let html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const newVer = "V37_" + Date.now();
html = html.replace(/src="\/assets\/index-V37\.js\?v=[^"]*"/, `src="/assets/index-V37.js?v=${newVer}"`);
fs.writeFileSync(path.join(__dirname, '../index.html'), html, 'utf8');
console.log("SUCCESS: Updated index.html bundle version to " + newVer);
console.log("=== ALL MASTERWORK TOP-LEVEL FIXES APPLIED SUCCESSFULLY ===");
