const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING ANIMAL & MONSTER MODELS MATCHING MEDALLIONS ===");
const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Load monster SVGs from test_monster_svgs.cjs
const testMonstersPath = path.join(__dirname, 'test_monster_svgs.cjs');
const monsterSource = fs.readFileSync(testMonstersPath, 'utf8');
const pSvgsStart = monsterSource.indexOf("const masterMonsterSVGs = {");
const pSvgsEnd = monsterSource.indexOf("};\n\nconsole.log", pSvgsStart);
const monsterSvgDefs = monsterSource.substring(pSvgsStart + "const masterMonsterSVGs = {".length, pSvgsEnd);

// Monster combat model dispatcher
const monsterCombatSystemCode = `
// === MASTERWORK ANIMAL & MONSTER COMBAT ENGINE (MATCHING MEDALLIONS) ===
const MONSTER_SVG_MAP = {
${monsterSvgDefs}
};

const renderMonsterModel = (mKey, isNaval, hpPct, isAttacking, takesHit, isDead) => {
  const normKey = (mKey || "").toLowerCase();
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
        opacity: isDead ? "0.4" : "0.75"
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
          // Elephant Body
          e.jsx("path", {
            d: "M -55 12 Q -68 -32 -24 -38 Q 30 -40 56 -12 Q 68 12 50 30 L 34 30 L 25 12 L -12 12 L -22 30 L -42 30 Z",
            fill: "#475569",
            stroke: "#1e293b",
            strokeWidth: "2.4"
          }),
          e.jsx("rect", { x: "-38", y: "10", width: "18", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
          e.jsx("rect", { x: "24", y: "10", width: "20", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
          // Royal Punic Saddlecloth
          e.jsx("path", { d: "M -32 -20 Q 4 -24 38 -20 L 32 12 Q 0 16 -26 12 Z", fill: "#701a75", stroke: "#f59e0b", strokeWidth: "2.4" }),
          [-20, -5, 10, 25].map((tx, i) => e.jsx("circle", { key: "tassel_" + i, cx: tx, cy: "14", r: "2.2", fill: "#fef08a" })),
          // Howdah Tower with Archer
          !isDead && e.jsxs("g", {
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
          // Head, Armor, Tusks, Trunk
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
          // Mahout
          !isDead && e.jsxs("g", {
            id: "elephant-mahout",
            transform: "translate(28, -32)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "5.5", fill: "#d97706" }),
              e.jsx("line", { x1: "2", y1: "0", x2: "12", y2: "10", stroke: "#fef08a", strokeWidth: "2.2" })
            ]
          })
        ]
      }) : e.jsx("g", {
        transform: "translate(-45, -45) scale(0.9)",
        children: MONSTER_SVG_MAP[svgKey] 
          ? MONSTER_SVG_MAP[svgKey]({ width: "90", height: "90" })
          : (MONSTER_SVG_MAP["african_lion"] ? MONSTER_SVG_MAP["african_lion"]({ width: "90", height: "90" }) : null)
      }),

      // 3. PROGRESSIVE INJURIES & CARNAGE ACCORDING TO HP:
      (hpPct < 90) && e.jsxs("g", {
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

      (hpPct < 75) && e.jsxs("g", {
        id: "monster-injuries-tier2",
        children: [
          e.jsx("ellipse", { cx: "-12", cy: "28", rx: "26", ry: "8", fill: "#7f1d1d", opacity: "0.9" }),
          e.jsx("path", { d: "M -18,-8 L 12,14", stroke: "#1c1917", strokeWidth: "3.2", strokeLinecap: "round" }),
          e.jsx("path", { d: "M -18,-8 L 12,14", stroke: "#dc2626", strokeWidth: "1.8", strokeLinecap: "round" })
        ]
      }),

      (hpPct < 55) && e.jsxs("g", {
        id: "monster-injuries-tier3",
        children: [
          e.jsx("ellipse", { cx: "14", cy: "30", rx: "22", ry: "7", fill: "#450a0a" }),
          e.jsx("path", { d: "M 4,-16 L -8,2 L 10,8", stroke: "#7f1d1d", strokeWidth: "2.8", fill: "none" }),
          [-18, 18].map((dx, i) => e.jsx("circle", { key: "m_dust_" + i, cx: dx, cy: "24", r: "14", fill: isNaval ? "rgba(56,189,248,0.3)" : "rgba(120,53,15,0.35)", className: "animate-pulse" }))
        ]
      }),

      (hpPct < 35) && e.jsxs("g", {
        id: "monster-injuries-tier4",
        children: [
          e.jsx("ellipse", { cx: "0", cy: "30", rx: "48", ry: "12", fill: "rgba(153,27,27,0.85)" }),
          [-28, -6, 16, 32].map((sx, i) => e.jsx("ellipse", { key: "m_splat_" + i, cx: sx, cy: 28 + (i % 2) * 4, rx: "8", ry: "3.5", fill: "#991b1b" })),
          e.jsx("path", { d: "M -25,0 Q 0,-24 25,0 Q 0,24 -25,0 Z", fill: "rgba(153,27,27,0.3)", className: "animate-pulse" })
        ]
      }),

      (hpPct < 15 || isDead) && e.jsxs("g", {
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
};
`;

// Insert MONSTER_SVG_MAP and renderMonsterModel right before renderMasterwork2DMedallionUnit
const pMed = bundle.indexOf("const renderMasterwork2DMedallionUnit =");
if (pMed === -1) {
  console.error("Could not find renderMasterwork2DMedallionUnit!");
  process.exit(1);
}

bundle = bundle.substring(0, pMed) + monsterCombatSystemCode + "\n" + bundle.substring(pMed);

// Now patch renderMasterwork2DMedallionUnit to detect monsters
const isNavalDecl = `const isNaval = unitCategory === "ship";`;
const isMonsterDetect = `const isNaval = unitCategory === "ship";
  const mKeyRaw = (customEmblem || "").toLowerCase();
  const isMonsterBeast = mKeyRaw.includes("elephant") || mKeyRaw.includes("lion") || mKeyRaw.includes("wolf") || mKeyRaw.includes("bear") || mKeyRaw.includes("boar") || mKeyRaw.includes("scorpion") || mKeyRaw.includes("minotaur") || mKeyRaw.includes("cyclops") || mKeyRaw.includes("gorgon") || mKeyRaw.includes("medusa") || mKeyRaw.includes("cerberus") || mKeyRaw.includes("kraken") || mKeyRaw.includes("leviathan") || mKeyRaw.includes("cetus") || mKeyRaw.includes("serpent") || mKeyRaw.includes("scylla") || mKeyRaw.includes("charybdis") || mKeyRaw.includes("siren") || mKeyRaw.includes("poseidon") || mKeyRaw.includes("triton") || mKeyRaw.includes("ghost");
`;

bundle = bundle.replace(isNavalDecl, isMonsterDetect);

// Now patch children of renderMasterwork2DMedallionUnit
const targetChildrenStart = `children: [
      // =========================================================================
      // 1. NAVAL WARSHIP WITH FULL MODEL DAMAGE & PROGRESSIVE CARNAGE
      // =========================================================================
      isNaval && e.jsxs("g", {`;

const monsterDispatchChildren = `children: [
      isMonsterBeast && renderMonsterModel(customEmblem, isNaval, hpPct, isAttacking, takesHit, isDead),
      !isMonsterBeast && isNaval && e.jsxs("g", {`;

if (bundle.includes(targetChildrenStart)) {
  bundle = bundle.replace(targetChildrenStart, monsterDispatchChildren);
  bundle = bundle.replace(`!isNaval && e.jsxs("g", {\n        id: "land-legion-medallion-body",`, `!isMonsterBeast && !isNaval && e.jsxs("g", {\n        id: "land-legion-medallion-body",`);
  console.log("Successfully plugged monster model renderer into renderMasterwork2DMedallionUnit!");
} else {
  console.error("Could not find targetChildrenStart in bundle!");
  process.exit(1);
}

// Replace helpers from pSea to pBattle
const pSea = bundle.indexOf("const render2DSeaMonster =");
const pBattle = bundle.indexOf("const BattleTheatreV2 =");

if (pSea === -1 || pBattle === -1) {
  console.error("Could not find pSea or pBattle in bundle!");
  process.exit(1);
}

const newHelpers = `const render2DSeaMonster = (x, y, isPlayer = false, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, emblemType = "kraken") => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "flagship", faction || "mythic", hpPct, animState, scale * 1.35, isAttacking, isHit, false, "", 3, "ship", emblemType || "kraken");
};

const render2DSiren = (x, y, isPlayer = false, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "escortA", faction || "greek", hpPct, animState, scale * 1.25, isAttacking, isHit, false, "", 2, "ship", "siren");
};

const render2DPoseidonAvatar = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "flagship", faction || "greek", hpPct, animState, scale * 1.45, isAttacking, isHit, false, "", 4, "ship", "poseidon");
};

const render2DWarElephant = (x, y, isPlayer = false, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "punic", hpPct, animState, scale * 1.35, isAttacking, isHit, false, "", 3, "legion", "elephant");
};

const render2DMinotaur = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "punic", hpPct, animState, scale * 1.35, isAttacking, isHit, false, "", 3, "legion", "minotaur");
};

const render2DCyclops = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "punic", hpPct, animState, scale * 1.4, isAttacking, isHit, false, "", 3, "legion", "cyclops");
};

const render2DGorgon = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "greek", hpPct, animState, scale * 1.25, isAttacking, isHit, false, "", 2, "legion", "medusa");
};

const render2DCerberus = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "barbarian", hpPct, animState, scale * 1.3, isAttacking, isHit, false, "", 3, "legion", "cerberus");
};

const render2DWolfPack = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "barbarian", hpPct, animState, scale * 1.05, isAttacking, isHit, false, "", 2, "legion", "wolf");
};

const render2DAfricanLion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "punic", hpPct, animState, scale * 1.25, isAttacking, isHit, false, "", 3, "legion", "lion");
};

const render2DHercynianBoar = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "barbarian", hpPct, animState, scale * 1.15, isAttacking, isHit, false, "", 2, "legion", "boar");
};

const render2DAlpineBear = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "barbarian", hpPct, animState, scale * 1.35, isAttacking, isHit, false, "", 3, "legion", "bear");
};

const render2DScorpion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "punic", hpPct, animState, scale * 1.1, isAttacking, isHit, false, "", 2, "legion", "scorpion");
};`;

bundle = bundle.substring(0, pSea) + newHelpers + ";\n" + bundle.substring(pBattle);
console.log("Replaced monster helpers before BattleTheatreV2!");

// Update BattleTheatreV2 renderLandEnemy and renderNavalEnemy to support all types
const oldLandNavalCheck = `            const isMinotaurUnit = !isNaval && (eName.includes("minotaur") || eId.includes("minotaur") || eName.includes("colossus") || eName.includes("titan") || eName.includes("cyclops") || eType.includes("minotaur"));`;
const newLandNavalCheck = `            const isCyclopsUnit = !isNaval && (eName.includes("cyclops") || eId.includes("cyclops") || eType.includes("cyclops"));
            const isMinotaurUnit = !isNaval && !isCyclopsUnit && (eName.includes("minotaur") || eId.includes("minotaur") || eName.includes("colossus") || eName.includes("titan") || eType.includes("minotaur"));`;

bundle = bundle.replace(oldLandNavalCheck, newLandNavalCheck);

const oldLandReturn = `              if (isMinotaurUnit) return render2DMinotaur(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");`;
const newLandReturn = `              if (isCyclopsUnit) return render2DCyclops(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isMinotaurUnit) return render2DMinotaur(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");`;

bundle = bundle.replace(oldLandReturn, newLandReturn);

// Also update naval monster identification to pass exact emblem type
const oldNavalReturn = `            const renderNavalEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              if (isPoseidon) return render2DPoseidonAvatar(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSiren) return render2DSiren(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSeaBeast) return render2DSeaMonster(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");`;

const newNavalReturn = `            const renderNavalEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              if (isPoseidon) return render2DPoseidonAvatar(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSiren) return render2DSiren(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSeaBeast) {
                const sType = (eName.includes("cetus") || eId.includes("cetus") || eName.includes("leviathan") || eId.includes("leviathan")) ? "cetus_atlantic_leviathan" : (eName.includes("serpent") || eId.includes("serpent")) ? "atlantic_sea_serpent" : (eName.includes("charybdis") || eId.includes("charybdis")) ? "charybdis_whirlpool_beast" : (eName.includes("scylla") || eId.includes("scylla")) ? "sirens_scylla_monster" : (eName.includes("ghost") || eId.includes("ghost")) ? "atlantic_ghost_ship" : "abyssal_kraken_submerged";
                return render2DSeaMonster(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit", sType);
              }`;

bundle = bundle.replace(oldNavalReturn, newNavalReturn);

// Validate bundle with esbuild
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: index-V33.js patched with authentic animal & monster models matching medallions!");
} catch (err) {
  console.error("ESBUILD TRANSFORMATION FAILED:", err.message);
  process.exit(1);
}
