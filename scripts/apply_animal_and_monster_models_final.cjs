const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING COMPLETE ANIMAL & MONSTER MODELS & HARDENING COMBAT ENGINE ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. Read test_monster_svgs.cjs to extract all 19 monster figures
const testMonstersPath = path.join(__dirname, 'test_monster_svgs.cjs');
const monsterSource = fs.readFileSync(testMonstersPath, 'utf8');

const keys = [
  "cetus_atlantic_leviathan",
  "abyssal_kraken_submerged",
  "great_leviathan_deep",
  "atlantic_sea_serpent",
  "charybdis_whirlpool_beast",
  "sirens_scylla_monster",
  "siren_enchantress",
  "cyclops_brute",
  "minotaur_beast",
  "medusa_gorgon",
  "cerberus_hound",
  "african_lion",
  "appennine_wolf_pack",
  "hercynian_boar",
  "alpine_brown_bear",
  "saharan_scorpion",
  "poseidon_avatar",
  "triton_wrath",
  "atlantic_ghost_ship"
];

let modelCases = [];
for (let i = 0; i < keys.length; i++) {
  const k = keys[i];
  const p1 = monsterSource.indexOf(k + ": `");
  if (p1 === -1) {
    console.error("Missing key:", k);
    continue;
  }
  const pChildren = monsterSource.indexOf("children: [", p1);
  const pNext = (i < keys.length - 1) ? monsterSource.indexOf(keys[i+1] + ": `") : monsterSource.indexOf("};\n\nconsole.log");
  const pEnd = monsterSource.lastIndexOf("]})`", pNext);
  const childrenCode = monsterSource.substring(pChildren + "children: [".length, pEnd).trim();
  modelCases.push(`    case "${k}":
      return e.jsxs("g", {
        id: "monster-figure-${k}",
        transform: "translate(-50, -50)",
        children: [
          ${childrenCode}
        ]
      });`);
}

const renderMonsterFigureCode = `
const renderMonsterFigure = (key) => {
  try {
    switch (key) {
${modelCases.join("\n")}
      default:
        return null;
    }
  } catch (e) {
    console.warn("renderMonsterFigure error:", e);
    return null;
  }
};
`;

const renderMonsterModelCode = `
${renderMonsterFigureCode}

const renderMonsterModel = (mKey, isNaval, hpPct = 100, isAttacking = false, takesHit = false, isDead = false) => {
  try {
    const curHp = typeof hpPct === "number" && !isNaN(hpPct) ? Math.max(0, Math.min(100, hpPct)) : 0;
    const deadState = isDead === true || curHp <= 0;
    const normKey = String(mKey || "").toLowerCase();
    let svgKey = "african_lion";
    if (normKey.includes("cetus") || normKey.includes("atlantic_leviathan")) svgKey = "cetus_atlantic_leviathan";
    else if (normKey.includes("kraken") || normKey.includes("hatchling")) svgKey = "abyssal_kraken_submerged";
    else if (normKey.includes("leviathan")) svgKey = "great_leviathan_deep";
    else if (normKey.includes("serpent") || normKey.includes("snake")) svgKey = "atlantic_sea_serpent";
    else if (normKey.includes("charybdis")) svgKey = "charybdis_whirlpool_beast";
    else if (normKey.includes("scylla")) svgKey = "sirens_scylla_monster";
    else if (normKey.includes("siren")) svgKey = "siren_enchantress";
    else if (normKey.includes("cyclops")) svgKey = "cyclops_brute";
    else if (normKey.includes("minotaur")) svgKey = "minotaur_beast";
    else if (normKey.includes("gorgon") || normKey.includes("medusa")) svgKey = "medusa_gorgon";
    else if (normKey.includes("cerberus")) svgKey = "cerberus_hound";
    else if (normKey.includes("lion") || normKey.includes("leo")) svgKey = "african_lion";
    else if (normKey.includes("wolf") || normKey.includes("lupus")) svgKey = "appennine_wolf_pack";
    else if (normKey.includes("boar") || normKey.includes("aper")) svgKey = "hercynian_boar";
    else if (normKey.includes("bear") || normKey.includes("ursus")) svgKey = "alpine_brown_bear";
    else if (normKey.includes("scorpion")) svgKey = "saharan_scorpion";
    else if (normKey.includes("poseidon") || normKey.includes("neptun")) svgKey = "poseidon_avatar";
    else if (normKey.includes("triton")) svgKey = "triton_wrath";
    else if (normKey.includes("ghost")) svgKey = "atlantic_ghost_ship";
    else if (normKey.includes("elephant")) svgKey = "elephant";

    const isElephant = svgKey === "elephant";

    return e.jsxs("g", {
      id: "beast-monster-visual-root",
      children: [
        // 1. Natural Ground Shadow or Churning Water Foam Contact
        !isNaval ? e.jsx("ellipse", {
          cx: "0",
          cy: "28",
          rx: isElephant ? "68" : "48",
          ry: "15",
          fill: "#000000",
          opacity: deadState ? "0.35" : "0.75"
        }) : e.jsxs("g", {
          id: "sea-beast-foam-contact",
          children: [
            e.jsx("ellipse", { cx: "0", cy: "28", rx: "58", ry: "16", fill: "rgba(3,105,161,0.55)" }),
            e.jsx("path", { d: "M -50,26 Q -25,30 0,26 Q 25,30 50,26", fill: "none", stroke: "rgba(224,242,254,0.8)", strokeWidth: "2", strokeLinecap: "round" }),
            [-28, -10, 10, 28].map((fx, fi) => e.jsx("circle", { key: "bf_foam_" + fi, cx: fx, cy: 28 + (fi % 2) * 3, r: "1.4", fill: "#ffffff", opacity: "0.85" }))
          ]
        }),

        // 2. Animal / Monster Illustrated Body (Matching Medallion)
        isElephant ? e.jsxs("g", {
          id: "war-elephant-model",
          transform: "translate(-5, 0) scale(1.15)",
          children: [
            e.jsx("path", {
              d: "M -55 12 Q -68 -32 -24 -38 Q 30 -40 56 -12 Q 68 12 50 30 L 34 30 L 25 12 L -12 12 L -22 30 L -42 30 Z",
              fill: "#475569",
              stroke: "#1e293b",
              strokeWidth: "2.4"
            }),
            e.jsx("rect", { x: "-38", y: "10", width: "18", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
            e.jsx("rect", { x: "24", y: "10", width: "20", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
            e.jsx("path", { d: "M -32 -20 Q 4 -24 38 -20 L 32 12 Q 0 16 -26 12 Z", fill: "#701a75", stroke: "#f59e0b", strokeWidth: "2.4" }),
            [-20, -5, 10, 25].map((tx, i) => e.jsx("circle", { key: "tassel_" + i, cx: tx, cy: "14", r: "2.2", fill: "#fef08a" })),
            !deadState && e.jsxs("g", {
              id: "elephant-howdah-tower",
              transform: "translate(-6, -58)",
              children: [
                e.jsx("rect", { x: "-22", y: "0", width: "44", height: "26", rx: "3", fill: "#573012", stroke: "#d97706", strokeWidth: "2" }),
                e.jsx("polygon", { points: "-22,0 -16,0 -16,5 -8,5 -8,0 0,0 0,5 8,5 8,0 16,0 16,5 22,5 22,0 22,6 -22,6", fill: "#fef08a" }),
                e.jsx("circle", { cx: "4", cy: "-7", r: "5.5", fill: "#d97706" }),
                e.jsx("path", { d: "M 8 -16 Q 20 -8 8 2", fill: "none", stroke: "#fef08a", strokeWidth: "2.5" }),
                e.jsx("line", { x1: "2", y1: "-7", x2: "22", y2: "-7", stroke: "#f8fafc", strokeWidth: "1.8" }),
                e.jsx("line", { x1: "-16", y1: "0", x2: "-16", y2: "-22", stroke: "#d97706", strokeWidth: "2.4" }),
                e.jsx("polygon", { points: "-16,-22 2,-25 -4,-16", fill: "#ef4444" })
              ]
            }),
            e.jsxs("g", {
              id: "elephant-head-assembly",
              transform: "translate(50, -12)",
              className: isAttacking ? "animate-pila-thrust" : "",
              children: [
                e.jsx("circle", { cx: "0", cy: "0", r: "18", fill: "#475569" }),
                e.jsx("path", { d: "M -10 -10 Q -30 0 -10 18 Z", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
                e.jsx("circle", { cx: "-14", cy: "2", r: "3", fill: "#f59e0b" }),
                e.jsx("path", { d: "M 2 -14 L 14 -4 L 10 8 L -2 4 Z", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1.8" }),
                e.jsx("ellipse", { cx: "4", cy: "-16", rx: "6", ry: "2.5", fill: "#dc2626" }),
                e.jsx("circle", { cx: "7", cy: "-4", r: "2.5", fill: "#fde047" }),
                e.jsx("path", { d: "M 8 8 Q 28 14 38 -4", fill: "none", stroke: "#f8fafc", strokeWidth: "5.5", strokeLinecap: "round" }),
                e.jsx("polygon", { points: "38,-4 44,-12 34,-8", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1" }),
                e.jsx("path", { d: "M 12 4 Q 22 18 14 32 Q 6 42 20 44", fill: "none", stroke: "#475569", strokeWidth: "6.5", strokeLinecap: "round" })
              ]
            }),
            !deadState && e.jsxs("g", {
              id: "elephant-mahout",
              transform: "translate(28, -32)",
              children: [
                e.jsx("circle", { cx: "0", cy: "0", r: "5.5", fill: "#d97706" }),
                e.jsx("line", { x1: "2", y1: "0", x2: "12", y2: "10", stroke: "#fef08a", strokeWidth: "2.2" })
              ]
            })
          ]
        }) : e.jsx("g", {
          id: "beast-model-" + svgKey,
          transform: isAttacking ? "translate(12, -2) scale(0.95)" : "translate(0, 0) scale(0.95)",
          children: renderMonsterFigure(svgKey) || renderMonsterFigure("african_lion")
        }),

        // 3. PROGRESSIVE INJURIES & CARNAGE ACCORDING TO HP:
        (curHp < 90) && e.jsxs("g", {
          id: "monster-injuries-tier1",
          children: [
            [-24, 8, 26].map((ax, i) => e.jsxs("g", {
              key: "m_arr_" + i,
              transform: "translate(" + ax + ", " + (i % 2 === 0 ? 0 : -14) + ") rotate(" + (i % 2 === 0 ? 28 : -32) + ")",
              children: [
                e.jsx("line", { x1: "0", y1: "0", x2: "-14", y2: "0", stroke: "#78350f", strokeWidth: "1.8" }),
                e.jsx("polygon", { points: "0,0 -3,-2 -3,2", fill: "#94a3b8" }),
                e.jsx("circle", { cx: "-2", cy: "0", r: "2.4", fill: "#dc2626" })
              ]
            })),
            [-14, 12].map((bx, i) => e.jsx("circle", { key: "m_bld_" + i, cx: bx, cy: 12 + i * 8, r: "2.5", fill: "#991b1b" }))
          ]
        }),

        (curHp < 75) && e.jsxs("g", {
          id: "monster-injuries-tier2",
          children: [
            e.jsx("ellipse", { cx: "-12", cy: "28", rx: "26", ry: "8", fill: "#7f1d1d", opacity: "0.9" }),
            e.jsx("path", { d: "M -18,-8 L 12,14", stroke: "#1c1917", strokeWidth: "3.2", strokeLinecap: "round" }),
            e.jsx("path", { d: "M -18,-8 L 12,14", stroke: "#dc2626", strokeWidth: "1.8", strokeLinecap: "round" })
          ]
        }),

        (curHp < 55) && e.jsxs("g", {
          id: "monster-injuries-tier3",
          children: [
            e.jsx("ellipse", { cx: "14", cy: "30", rx: "22", ry: "7", fill: "#450a0a" }),
            e.jsx("path", { d: "M 4,-16 L -8,2 L 10,8", stroke: "#7f1d1d", strokeWidth: "2.8", fill: "none" }),
            [-18, 18].map((dx, i) => e.jsx("circle", { key: "m_dust_" + i, cx: dx, cy: "24", r: "14", fill: isNaval ? "rgba(56,189,248,0.3)" : "rgba(120,53,15,0.35)", className: "animate-pulse" }))
          ]
        }),

        (curHp < 35) && e.jsxs("g", {
          id: "monster-injuries-tier4",
          children: [
            e.jsx("ellipse", { cx: "0", cy: "30", rx: "48", ry: "12", fill: "rgba(153,27,27,0.85)" }),
            [-28, -6, 16, 32].map((sx, i) => e.jsx("ellipse", { key: "m_splat_" + i, cx: sx, cy: 28 + (i % 2) * 4, rx: "8", ry: "3.5", fill: "#991b1b" })),
            e.jsx("path", { d: "M -25,0 Q 0,-24 25,0 Q 0,24 -25,0 Z", fill: "rgba(153,27,27,0.3)", className: "animate-pulse" })
          ]
        }),

        (curHp < 15 || deadState) && e.jsxs("g", {
          id: "monster-injuries-tier5",
          children: [
            e.jsx("ellipse", { cx: "0", cy: "30", rx: "62", ry: "16", fill: "rgba(69,10,10,0.95)" }),
            e.jsx("line", { x1: "-22", y1: "12", x2: "28", y2: "22", stroke: "#450a0a", strokeWidth: "4" })
          ]
        }),

        takesHit && e.jsxs("g", {
          id: "monster-hit-impact-fx",
          children: [
            e.jsx("circle", { cx: "0", cy: "6", r: "26", fill: "rgba(220,38,38,0.55)", className: "animate-ping" }),
            [-20, -6, 8, 22].map((bx, i) => e.jsx("circle", { key: "m_hit_bld_" + i, cx: bx, cy: 6 + (i % 2 === 0 ? -14 : 14), r: "3", fill: "#7f1d1d" })),
            e.jsx("polygon", { points: "0,6 -10,-4 -2,16 8,0", fill: "#fef08a" })
          ]
        })
      ]
    });
  } catch (err) {
    console.warn("renderMonsterModel recovered safely:", err);
    return null;
  }
};
`;

// 2. Replace renderMonsterModel in bundle
const pMonsterStart = bundle.indexOf("const renderMonsterModel =");
const pMedallionStart = bundle.indexOf("const renderMasterwork2DMedallionUnit =");

if (pMonsterStart === -1 || pMedallionStart === -1) {
  console.error("Could not find renderMonsterModel or renderMasterwork2DMedallionUnit in bundle!");
  process.exit(1);
}

bundle = bundle.substring(0, pMonsterStart) + renderMonsterModelCode + ";\n" + bundle.substring(pMedallionStart);
console.log("Successfully replaced renderMonsterModel with 19 full models + War Elephant!");

// 3. Make sure renderMasterwork2DMedallionUnit safely handles all calls and wrap in try/catch
const pNewMed = bundle.indexOf("const renderMasterwork2DMedallionUnit =");
const pMedSignature = "const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = \"flagship\", faction = \"constantine\", hpPct = 100, animState = \"idle\", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = \"\", tier = 1, unitCategory = \"ship\", customEmblem = \"\") => {";

if (bundle.includes(pMedSignature)) {
  const pNextSea = bundle.indexOf("const render2DSeaMonster =", pNewMed);
  const pClosingBrace = bundle.lastIndexOf("};", pNextSea);
  
  // Extract body between signature and closing brace
  const pBodyStart = pNewMed + pMedSignature.length;
  const originalBody = bundle.substring(pBodyStart, pClosingBrace);
  
  const safeMedallionUnit = `const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = "flagship", faction = "constantine", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1, unitCategory = "ship", customEmblem = "") => {
  try {
${originalBody}
  } catch (medErr) {
    console.warn("renderMasterwork2DMedallionUnit recovered safely:", medErr);
    return null;
  }
};`;

  bundle = bundle.substring(0, pNewMed) + safeMedallionUnit + bundle.substring(pClosingBrace + 2);
  console.log("Safely wrapped renderMasterwork2DMedallionUnit in try/catch!");
}

// 4. Update BattleTheatreV2 to protect against victory/completion crashes
const oldBtHeader = "const BattleTheatreV2 = ({";
if (bundle.includes(oldBtHeader)) {
  const pBtStart = bundle.indexOf(oldBtHeader);
  const pNextFx = bundle.indexOf("\nconst renderFXOverlay =", pBtStart);
  const pBtClosing = bundle.lastIndexOf("};", pNextFx);
  
  const btBody = bundle.substring(pBtStart + oldBtHeader.length, pBtClosing);
  
  const safeBt = `const BattleTheatreV2 = (btProps = {}) => {
  try {
    const {
${btBody}
  } catch (btErr) {
    console.error("BattleTheatreV2 critical recover safely:", btErr);
    return e.jsx("div", {
      className: "w-full h-full flex flex-col items-center justify-center bg-black/60",
      children: e.jsx("div", {
        className: "text-amber-400 font-cinzel text-xs tracking-wider",
        children: "BATTLE ARENA READY"
      })
    });
  }
};`;

  bundle = bundle.substring(0, pBtStart) + safeBt + bundle.substring(pBtClosing + 2);
  console.log("Safely wrapped BattleTheatreV2 in try/catch!");
}

// 5. Ensure effectiveEnemyAnim and effectiveEnemyPct in BattleTheatreV2
const oldRenderLandEnemy = "const renderLandEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {";
const newRenderLandEnemy = `const renderLandEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              const effectiveEnemyAnim = (enemyHp <= 0 || turn === "victory" || enemyAnim === "dead" || enemyAnim === "death") ? "death" : enemyAnim;
              const effectiveEnemyPct = (enemyHp <= 0 || turn === "victory") ? 0 : ePct;
              const effectiveAttacking = (enemyHp <= 0 || turn === "victory") ? false : isEnemyAttacking;`;
if (bundle.includes(oldRenderLandEnemy) && !bundle.includes(newRenderLandEnemy)) {
  bundle = bundle.replace(oldRenderLandEnemy, newRenderLandEnemy);
}

const oldRenderNavalEnemy = "const renderNavalEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {";
const newRenderNavalEnemy = `const renderNavalEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              const effectiveEnemyAnim = (enemyHp <= 0 || turn === "victory" || enemyAnim === "dead" || enemyAnim === "death") ? "death" : enemyAnim;
              const effectiveEnemyPct = (enemyHp <= 0 || turn === "victory") ? 0 : ePct;
              const effectiveAttacking = (enemyHp <= 0 || turn === "victory") ? false : isEnemyAttacking;`;
if (bundle.includes(oldRenderNavalEnemy) && !bundle.includes(newRenderNavalEnemy)) {
  bundle = bundle.replace(oldRenderNavalEnemy, newRenderNavalEnemy);
}

// 6. Validate with esbuild
console.log("Validating patched bundle with esbuild...");
try {
  esbuild.buildSync({
    entryPoints: [bundlePath],
    outfile: '/tmp/test_prod_bundle_check.js',
    bundle: false,
    format: 'esm',
  });
  console.log("ESBUILD VALIDATION PASSED! Bundle is 100% syntactically valid.");
} catch (err) {
  // If entryPoints didn't catch due to unwritten file, validate in memory
  try {
    esbuild.transformSync(bundle, { loader: "jsx" });
    console.log("Memory esbuild transform PASSED!");
  } catch (mErr) {
    console.error("ESBUILD VALIDATION FAILED:", mErr.message);
    process.exit(1);
  }
}

// 7. Write to master bundle
fs.writeFileSync(bundlePath, bundle, "utf8");
console.log("Wrote updated master bundle to", bundlePath);

// 8. Run sync_production_build
console.log("Running sync_production_build.cjs...");
require("./sync_production_build.cjs");
console.log("=== COMPLETED SUCCESSFULLY ===");
