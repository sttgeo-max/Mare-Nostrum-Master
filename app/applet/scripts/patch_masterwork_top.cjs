const fs = require('fs');
const path = require('path');

console.log("=== EXECUTING DEFINITIVE MASTERWORK TOP-LEVEL INTEGRATION ===");

const c0Path = path.join(__dirname, '../c0_dump.js');
const v37Path = path.join(__dirname, '../public/assets/index-V37.js');

if (!fs.existsSync(c0Path)) {
  console.error("ERROR: c0_dump.js not found!");
  process.exit(1);
}

const c0 = fs.readFileSync(c0Path, 'utf8');

const importRegex = /import\s*\{[\s\S]*?\}\s*from\s*['"][^'"]*['"];?/g;

// 1. Extract Ze
const idxZe = c0.indexOf('const Ze=');
let depthZe = 0, startedZe = false, endZe = -1;
for (let i = idxZe; i < c0.length; i++) {
  if (c0[i] === '{') { startedZe = true; depthZe++; }
  else if (c0[i] === '}') { depthZe--; if (startedZe && depthZe === 0) { endZe = i + 1; break; } }
}
const zeCode = c0.substring(idxZe, endZe).replace('const Ze=', 'var Ze=').replace(importRegex, '');

// 2. Extract je
const idxJe = c0.indexOf('je={');
const startJe = c0.lastIndexOf('var je=', idxJe) !== -1 ? c0.lastIndexOf('var je=', idxJe) : c0.lastIndexOf('let je=', idxJe);
let depthJe = 0, startedJe = false, endJe = -1;
for (let i = idxJe; i < c0.length; i++) {
  if (c0[i] === '{') { startedJe = true; depthJe++; }
  else if (c0[i] === '}') { depthJe--; if (startedJe && depthJe === 0) { endJe = i + 1; break; } }
}
const endJeAssign = c0.indexOf(';', c0.indexOf('Object.assign(je,', endJe));
const jeCode = c0.substring(startJe, endJeAssign + 1).replace(importRegex, '');

// 3. Extract oo
const idxOo = c0.indexOf('const oo=');
let depthOo = 0, startedOo = false, endOo = -1;
for (let i = idxOo; i < c0.length; i++) {
  if (c0[i] === '{') { startedOo = true; depthOo++; }
  else if (c0[i] === '}') { depthOo--; if (startedOo && depthOo === 0) { endOo = i + 1; break; } }
}
const ooCode = c0.substring(idxOo, endOo).replace('const oo=', 'var oo=') + ';';

// 4. Extract Medallion & Token Engine (Xd through PhysicalTokenGrounding)
const idxXd = c0.indexOf('Xd=');
const idxHaEnd = c0.indexOf('Ha.displayName=\"PhysicalTokenGrounding\";') + 'Ha.displayName=\"PhysicalTokenGrounding\";'.length;
const rawMedBlock = 'var ' + c0.substring(idxXd, idxHaEnd).replace(importRegex, '');

// 5. Construct Top-Level Injection
const topInjection = `
/* === MARE NOSTRUM II MASTERWORK MEDALLION & EMBLEM ENGINE === */

${zeCode}

${jeCode}

${ooCode}

${rawMedBlock}

// Masterwork Enemy Fleet Medallion Token
var Uo = b.memo(({ fleet, isMoving = false, size = 32, isElaborate = true }) => {
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
var jc = b.memo(({ type, rarity = "bronze", isNear = false, isTracked = false, size = 28 }) => {
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
var zo = b.memo(({ player: t, playerMode: ge = "sea", isMoving: V = false, activeVector: Zs, velocity: vel, modeTransitioning: ht, mapScale: Je = 1 }) => {
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

if (typeof window !== 'undefined') {
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
  window.Uo = Uo;
  window.jc = jc;
  window.zo = zo;
  window.$i = $i;
  window.EmblemSVG = $i;
  window.Ao = Ao;
  window.Jd = Jd;
}
/* === END MARE NOSTRUM II MASTERWORK ENGINE === */
`;

// Read public/assets/index-V37.js
let v37 = fs.readFileSync(v37Path, 'utf8');

// Strip out any previous masterwork injection blocks
const oldInjIdx = v37.indexOf('/* === MARE NOSTRUM II MASTERWORK MEDALLION & EMBLEM ENGINE === */');
if (oldInjIdx !== -1) {
  const endIdx = v37.indexOf('/* === END MARE NOSTRUM II MASTERWORK ENGINE === */');
  if (endIdx !== -1) {
    v37 = v37.substring(0, oldInjIdx) + v37.substring(endIdx + '/* === END MARE NOSTRUM II MASTERWORK ENGINE === */'.length);
  }
}

// Find insertion position right after initial React/JSX import
let insertPos = 0;
const importIdx = v37.indexOf('import{j as e,R as lt,r as b');
if (importIdx !== -1) {
  insertPos = v37.indexOf(';', importIdx) + 1;
} else {
  const altImportIdx = v37.indexOf('import');
  if (altImportIdx !== -1) {
    insertPos = v37.indexOf(';', altImportIdx) + 1;
  }
}

const updatedV37 = v37.substring(0, insertPos) + "\n" + topInjection + "\n" + v37.substring(insertPos);

fs.writeFileSync(v37Path, updatedV37, 'utf8');
console.log("SUCCESS: Saved updated public/assets/index-V37.js (Size:", updatedV37.length, "bytes)");

// Update index.html version tag to invalidate cache
let html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const newVer = "V37_" + Date.now();
html = html.replace(/src="\/assets\/index-V37\.js\?v=[^"]*"/, `src="/assets/index-V37.js?v=${newVer}"`);
fs.writeFileSync(path.join(__dirname, '../index.html'), html, 'utf8');
console.log("SUCCESS: Updated index.html bundle version to " + newVer);
console.log("=== ALL MASTERWORK TOP-LEVEL FIXES APPLIED SUCCESSFULLY ===");
