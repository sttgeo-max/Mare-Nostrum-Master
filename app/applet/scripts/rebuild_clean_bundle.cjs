const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== REBUILDING CLEAN MASTERWORK BUNDLE WITH FULL ROOT MOUNTING ===");

const c0Path = path.join(__dirname, '../c0_dump.js');
const v37Path = path.join(__dirname, '../public/assets/index-V37.js');

if (!fs.existsSync(c0Path)) {
  console.error("ERROR: c0_dump.js not found!");
  process.exit(1);
}

let c0 = fs.readFileSync(c0Path, 'utf8');

// Truncate cleanly at end of last complete component
const a0Idx = c0.lastIndexOf('A0=lt.memo(C0)');
if (a0Idx !== -1) {
  c0 = c0.substring(0, a0Idx + 'A0=lt.memo(C0)'.length) + ';';
}

// Masterwork Token Definitions & Main App Mounting Engine
const tokenEnhancements = `
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
  window.Ze = typeof Ze !== 'undefined' ? Ze : {};
  window.je = typeof je !== 'undefined' ? je : {};
  window.oo = typeof oo !== 'undefined' ? oo : {};
  window.rt = typeof rt !== 'undefined' ? rt : null;
  window.Medallion = typeof rt !== 'undefined' ? rt : null;
  window.Fo = typeof Fo !== 'undefined' ? Fo : null;
  window.TokenBaseFrame = typeof Fo !== 'undefined' ? Fo : null;
  window.Ha = typeof Ha !== 'undefined' ? Ha : null;
  window.PhysicalTokenGrounding = typeof Ha !== 'undefined' ? Ha : null;
  window.Vr = typeof Vr !== 'undefined' ? Vr : null;
  window.HUDButton = typeof Vr !== 'undefined' ? Vr : null;
  window.Kd = typeof Kd !== 'undefined' ? Kd : null;
  window.Yi = typeof Yi !== 'undefined' ? Yi : null;
  window.dc = typeof dc !== 'undefined' ? dc : null;
  window.Uo = Uo;
  window.jc = jc;
  window.zo = zo;
  window.$i = typeof $i !== 'undefined' ? $i : null;
  window.EmblemSVG = typeof $i !== 'undefined' ? $i : null;
}

// === MOUNT MARE NOSTRUM II APPLICATION INTO #root ===
if (typeof document !== 'undefined') {
  const mountApp = () => {
    const rootEl = document.getElementById('root');
    if (!rootEl) return;
    
    const MainApp = () => {
      const [player, setPlayer] = b.useState(() => {
        return {
          id: 'player',
          name: 'Flavius Valerius Constantinus',
          latinName: 'Imperator Constantinus',
          solidi: 2450,
          fama: 120,
          legionHp: 100,
          maxLegionHp: 100,
          fleetHp: 100,
          maxFleetHp: 100,
          iter: 6,
          maxIter: 6,
          capturedPorts: ['roma', 'massilia', 'gades'],
          inventory: [],
          equipped: {},
          unlockedCards: [],
          flagshipModel: 'trireme'
        };
      });

      const [fleets, setFleets] = b.useState(() => typeof yo === 'function' ? yo(1) : []);
      const [convoys, setConvoys] = b.useState([]);
      const [hazards, setHazards] = b.useState([]);
      const [mapArtifacts, setMapArtifacts] = b.useState(() => typeof Bl !== 'undefined' ? Bl : []);

      return e.jsx(pp, {
        player: player,
        setPlayer: setPlayer,
        fleets: fleets,
        setFleets: setFleets,
        convoys: convoys,
        setConvoys: setConvoys,
        hazards: hazards,
        setHazards: setHazards,
        mapArtifacts: mapArtifacts,
        setMapArtifacts: setMapArtifacts
      });
    };

    if (Qc && Qc.createRoot) {
      Qc.createRoot(rootEl).render(e.jsx(MainApp, {}));
    } else if (Qc && Qc.render) {
      Qc.render(e.jsx(MainApp, {}), rootEl);
    }
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    mountApp();
  } else {
    document.addEventListener('DOMContentLoaded', mountApp);
  }
}
`;

// Append tokenEnhancements at the end of c0_dump.js
const cleanBundle = c0 + "\n" + tokenEnhancements;

// Save to public/assets/index-V37.js
fs.writeFileSync(v37Path, cleanBundle, 'utf8');
console.log("SUCCESS: Rebuilt pristine public/assets/index-V37.js (Size:", cleanBundle.length, "bytes)");

// Validate with esbuild
try {
  esbuild.buildSync({
    entryPoints: [v37Path],
    outfile: '/tmp/test_prod_bundle.js',
    bundle: false,
    format: 'esm',
  });
  console.log("ESBUILD VALIDATION PASSED 100%!");
} catch (e) {
  console.error("ESBUILD VALIDATION ERROR:", e.message);
  process.exit(1);
}

// Update index.html version tag to invalidate browser cache
let html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const newVer = "V37_" + Date.now();
html = html.replace(/src="\/assets\/index-V37\.js\?v=[^"]*"/, `src="/assets/index-V37.js?v=${newVer}"`);
fs.writeFileSync(path.join(__dirname, '../index.html'), html, 'utf8');
console.log("SUCCESS: Updated index.html bundle version to " + newVer);
console.log("=== CLEAN BUNDLE REBUILD COMPLETE ===");
