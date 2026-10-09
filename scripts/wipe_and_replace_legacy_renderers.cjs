const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== REPLACING ENTIRE LEGACY RENDER2D SECTION WITH 2.5D MEDALLION ART ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const pStart = bundle.lastIndexOf("const render2DShip =", 2559701);
const pEnd = bundle.indexOf("const BattleTheatreV2 = ({");

if (pStart === -1 || pEnd === -1) {
  console.error("ERROR: pStart or pEnd not found!", { pStart, pEnd });
  process.exit(1);
}

// 1. MASTERWORK 2.5D SHIP (DIRECT 1:1 MIRROR OF MEDALLION IMG_5436)
const masterworkShip = `const render2DShip = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship";
  const flip = isPlayer ? 1 : -1;
  const shipTier = Math.min(5, Math.max(1, tier || 1));

  const isRoman = faction === "roman" || faction === "player";
  const isPunic = faction === "punic";
  const isGreek = faction === "greek";

  const sailGrad = isRoman 
    ? (shipTier >= 4 ? "url(#sl_prp_rom)" : "#6b21a8") 
    : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const hullWoodL = isRoman ? "url(#hl_wd_l_rom)" : "#451a03";
  const hullWoodR = isRoman ? "url(#hl_wd_r_rom)" : "#78350f";
  const ramBronze = "url(#rst_bz_rom)";
  const goldTrim = shipTier >= 4 ? "#fef08a" : "#facc15";

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_ship_death_sink 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // Base Depth Shadow
      e.jsx("ellipse", { cx: "0", cy: "36", rx: isFlag ? "72" : "54", ry: "18", fill: "#000000", opacity: "0.6" }),

      // 1. Foaming Azure Mediterranean Wave Base (Direct Mirror of Medallion IMG_5436)
      e.jsxs("g", {
        id: "medallion-ocean-waves",
        children: [
          e.jsx("path", { d: "M -60,28 C -45,22 -30,34 -12,27 C 6,21 22,33 38,26 C 50,20 62,32 70,28 L 70,42 C 50,46 -20,46 -60,42 Z", fill: "url(#ocn_bg_rom)", opacity: "0.95" }),
          e.jsx("path", { d: "M -56,30 C -42,24 -28,35 -10,29 C 8,23 24,35 40,28 C 52,22 62,33 68,30", fill: "none", stroke: "#e0f2fe", strokeWidth: "2.4", strokeLinecap: "round" }),
          e.jsx("path", { d: "M -20,33 C -10,31 -2,34 6,37", fill: "none", stroke: "#ffffff", strokeWidth: "2", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 18,33 C 28,31 36,34 44,37", fill: "none", stroke: "#ffffff", strokeWidth: "2", strokeLinecap: "round" }),
          [-45, -15, 20, 50].map((wx, i) => e.jsx("circle", { key: "foam_" + i, cx: wx, cy: "34", r: "1.4", fill: "#ffffff" }))
        ]
      }),

      // 2. Synchronized Rowing Oars (Extended Outward Slicing Waves)
      !isDead && e.jsxs("g", {
        stroke: "#a17e4d",
        strokeWidth: "2.2",
        strokeLinecap: "round",
        className: isAttacking ? "animate-oar-sweep" : "",
        children: [
          [-42, -32, -22, -12, -2].map((ox, i) => e.jsx("line", { key: "oar_l_" + i, x1: ox, y1: 14 + i * 2, x2: ox - 18, y2: 32 + i * 2 })),
          [10, 20, 30, 40, 50].map((ox, i) => e.jsx("line", { key: "oar_r_" + i, x1: ox, y1: 22 - i * 2, x2: ox + 18, y2: 38 - i * 2 }))
        ]
      }),

      // 3. 2.5D Ship Hull Planking & Bronze Wale (Direct Mirror of Medallion IMG_5436)
      e.jsxs("g", {
        id: "medallion-ship-hull",
        children: [
          e.jsx("path", { d: "M 0,32 L -48,12 C -36,5 -18,4 0,6 Z", fill: hullWoodL, stroke: "#270e02", strokeWidth: "1" }),
          e.jsx("path", { d: "M 0,32 L 48,12 C 36,5 18,4 0,6 Z", fill: hullWoodR, stroke: "#270e02", strokeWidth: "1" }),
          e.jsx("path", { d: "M -40,14 Q -20,17 0,24 Q 20,17 40,14", fill: "none", stroke: "#270e02", strokeWidth: "1.2" }),
          e.jsx("path", { d: "M -32,18 Q -16,22 0,28 Q 16,22 32,18", fill: "none", stroke: "#270e02", strokeWidth: "1.2" }),
          e.jsx("path", { d: "M -48,11 Q 0,16 48,11 L 48,13 Q 0,18 -48,13 Z", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.6" })
        ]
      }),

      // 4. Overlapping Roman Bulwark Scuta Shields (Along Gunwale)
      !isDead && e.jsxs("g", {
        id: "medallion-cataphract-shields",
        fill: goldTrim,
        stroke: "#78350f",
        strokeWidth: "0.8",
        children: [
          [-38, -28, -18, -8, 8, 18, 28, 38].map((sx, idx) => e.jsxs("g", {
            key: "sh_" + idx,
            children: [
              e.jsx("circle", { cx: sx, cy: 12 + Math.abs(sx) * 0.08, r: "3.5", fill: idx < 4 ? "#eab308" : "#ca8a04" }),
              e.jsx("circle", { cx: sx, cy: 12 + Math.abs(sx) * 0.08, r: "1.2", fill: "#fef08a" })
            ]
          }))
        ]
      }),

      // 5. Forecastle Fighting Platform with Battlements
      !isDead && e.jsxs("g", {
        id: "medallion-forecastle-tower",
        children: [
          e.jsx("path", { d: "M -26,-2 L 26,-2 L 22,12 L -22,12 Z", fill: "#5c2606", stroke: "#ca8a04", strokeWidth: "1.2" }),
          [-22, -10, 2, 14].map((bx, i) => e.jsx("rect", { key: "cren_" + i, x: bx, y: "-6", width: "8", height: "5", fill: goldTrim, rx: "0.5" })),
          e.jsx("rect", { x: "-7", y: "0", width: "14", height: "9", rx: "2", fill: "#18181b", stroke: "#eab308", strokeWidth: "1" }),
          e.jsx("circle", { cx: "0", cy: "4.5", r: "3", fill: "#fef08a" })
        ]
      }),

      // 6. Center Cast Bronze Rostrum Ram
      !isDead && e.jsxs("g", {
        id: "medallion-rostrum-ram",
        className: isAttacking ? "animate-rostrum-ram-thrust" : "",
        children: [
          e.jsx("polygon", { points: "-3,6 3,6 2,30 -2,30", fill: ramBronze }),
          e.jsx("polygon", { points: "-6,28 6,28 3,40 0,43 -3,40", fill: ramBronze, stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("line", { x1: "0", y1: "28", x2: "0", y2: "41", stroke: "#fef08a", strokeWidth: "1.4" }),
          e.jsx("circle", { cx: "0", cy: "30", r: "2", fill: "#fef08a" })
        ]
      }),

      // 7. Rigging Stays, Mast & Yardarm
      !isDead && e.jsxs("g", {
        children: [
          e.jsx("line", { x1: "0", y1: "-56", x2: "-46", y2: "12", stroke: "#cbd5e1", strokeWidth: "1", opacity: "0.65" }),
          e.jsx("line", { x1: "0", y1: "-56", x2: "46", y2: "12", stroke: "#cbd5e1", strokeWidth: "1", opacity: "0.65" }),
          e.jsx("rect", { x: "-2.5", y: "-62", width: "5", height: "66", rx: "1.5", fill: "#451a03", stroke: "#270e02", strokeWidth: "0.8" }),
          e.jsx("rect", { x: "-42", y: "-50", width: "84", height: "4", rx: "2", fill: "#78350f", stroke: "#451a03", strokeWidth: "0.8" })
        ]
      }),

      // 8. Billowing Imperial Purple Sail with Golden Aquila Wing Emblem (Direct Mirror of Medallion IMG_5436)
      !isDead && e.jsxs("g", {
        id: "medallion-billowing-sail",
        children: [
          e.jsx("path", { d: "M -36,-48 Q 0,-54 36,-48 L 31,-12 Q 0,-2 -31,-12 Z", fill: sailGrad, stroke: goldTrim, strokeWidth: "1.6" }),
          e.jsx("path", { d: "M -30,-46 Q 0,-50 30,-46 L 27,-42 Q 0,-46 -27,-42 Z", fill: "#ffffff", opacity: "0.3" }),
          e.jsx("path", { d: "-14,-46 Q -10,-28 -12,-10", stroke: "#3b0764", strokeWidth: "1.4", fill: "none", opacity: "0.7" }),
          e.jsx("path", { d: "14,-46 Q 10,-28 12,-10", stroke: "#3b0764", strokeWidth: "1.4", fill: "none", opacity: "0.7" }),

          // Golden Aquila Imperial Eagle & Laurel Wreath
          e.jsxs("g", {
            transform: "translate(0, -30) scale(1.15)",
            children: [
              e.jsx("path", { d: "M -13,6 C -17,-2 -13,-10 0,-12 C 13,-10 17,-2 13,6 C 10,1 7,-6 0,-8 C -7,-6 -10,1 -13,6 Z", fill: goldTrim, opacity: "0.9" }),
              e.jsx("path", { d: "M 0,-10 L 4,-6 L 14,-8 L 9,-2 L 13,4 L 6,3 L 0,8 L -6,3 L -13,4 L -9,-2 L -14,-8 L -4,-6 Z", fill: "#fef08a", stroke: "#ca8a04", strokeWidth: "0.8" }),
              e.jsx("circle", { cx: "0", cy: "-7", r: "2.5", fill: "#fef08a" }),
              e.jsx("polygon", { points: "-5,8 5,8 2,11 6,11 0,15 -2,11 -6,11", fill: "#fde047" })
            ]
          }),

          e.jsx("path", { d: "M 0,-61 L 20,-56 L 0,-51 Z", fill: "#ef4444", stroke: goldTrim, strokeWidth: "0.8" }),
          e.jsx("circle", { cx: "0", cy: "-62", r: "2.8", fill: goldTrim })
        ]
      }),

      // 9. Dynamic Progressive Naval Damage (Persistent Splinters, Tattered Sails, Smoke, Inferno)
      (hpPct < 75) && e.jsxs("g", {
        id: "ship-dynamic-splinters-tier1",
        children: [
          [-28, 6, 32].map((ox, i) => e.jsx("line", { key: "splinter_oar_" + i, x1: ox, y1: 18, x2: ox + 14, y2: 34, stroke: "#451a03", strokeWidth: "2.8", strokeDasharray: "6 3" })),
          e.jsx("path", { d: "M -15,14 L 8,20 L 0,24 Z", fill: "#0c0a09" })
        ]
      }),
      (hpPct < 45) && e.jsxs("g", {
        id: "ship-dynamic-tattered-sails-tier2",
        children: [
          e.jsx("path", { d: "M -10,-35 Q -2,-25 -6,-15 Q 0,-25 8,-30", stroke: "#1c1917", strokeWidth: "3.5", fill: "none" }),
          e.jsx("polygon", { points: "0,-40 12,-30 6,-22", fill: "#1c1917" }),
          [-18, 15].map((smkX, i) => e.jsx("circle", { key: "smk_" + i, cx: smkX, cy: "-10", r: 8 + i * 4, fill: "rgba(87,83,78,0.7)", className: "animate-ping" }))
        ]
      }),
      (hpPct < 25) && e.jsxs("g", {
        id: "ship-dynamic-hull-inferno-tier3",
        children: [
          e.jsx("path", { d: "M -25,24 L 20,26 L -5,36 Z", fill: "#0369a1", opacity: "0.85" }),
          e.jsx("path", { d: "M -25,-10 Q -15,-40 -2,-10 Q 10,-45 22,-10 Z", fill: "url(#grad-greek-fire)", opacity: "0.9", className: "animate-pulse" }),
          [-20, -5, 12, 25].map((cx, i) => e.jsx("circle", { key: "cnd_" + i, cx: cx, cy: -20 - (i % 2) * 10, r: "2.5", fill: "#fef08a" }))
        ]
      })
    ]
  });
};`;

// 2. MASTERWORK 2.5D LEGION (DIRECT 1:1 MIRROR OF MEDALLION IMG_5435)
const masterworkLegion = `const render2DLegion = (x, y, isPlayer, role = "cohort", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isCommander = role === "flagship" || role === "commander";
  const flip = isPlayer ? 1 : -1;
  const legionTier = Math.min(5, Math.max(1, tier || 1));

  const isRoman = faction === "roman" || faction === "player";
  const isPunic = faction === "punic";
  const isGreek = faction === "greek";

  const scutumGrad = isRoman 
    ? "url(#scutum-grad-roman)" 
    : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const goldTrim = legionTier >= 4 ? "#fef08a" : "#facc15";
  const plumeGrad = isRoman ? "url(#crest-plume-roman)" : "#dc2626";
  const bronzeBase = "#a17e4d";

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // Base Depth Shadow
      e.jsx("ellipse", { cx: "0", cy: "36", rx: isCommander ? "62" : "48", ry: "16", fill: "#000000", opacity: "0.6" }),

      // 1. Dual Crossed Roman Pila Spears Behind Shield (Direct Mirror of Medallion IMG_5435)
      !isDead && e.jsxs("g", {
        id: "medallion-crossed-pila",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          e.jsx("line", { x1: "-38", y1: "-38", x2: "38", y2: "38", stroke: "#78350f", strokeWidth: "4", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "-38,-38 -30,-41 -35,-32", fill: "#e2e8f0", stroke: "#475569", strokeWidth: "1" }),
          e.jsx("circle", { cx: "-22", cy: "-22", r: "3.5", fill: "#64748b" }),
          e.jsx("line", { x1: "38", y1: "-38", x2: "-38", y2: "38", stroke: "#78350f", strokeWidth: "4", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "38,-38 30,-41 35,-32", fill: "#e2e8f0", stroke: "#475569", strokeWidth: "1" }),
          e.jsx("circle", { cx: "22", cy: "-22", r: "3.5", fill: "#64748b" })
        ]
      }),

      // 2. High Roman Centurion Galea Helmet with Sweeping Transverse Red Crest Plume (Direct Mirror of Medallion IMG_5435)
      !isDead && e.jsxs("g", {
        id: "medallion-centurion-galea",
        transform: "translate(0, -22)",
        children: [
          e.jsx("path", { d: "M -32,-8 C -18,-20 18,-20 32,-8 C 20,-14 -20,-14 -32,-8 Z", fill: plumeGrad, stroke: "#991b1b", strokeWidth: "0.8" }),
          e.jsx("path", { d: "M -18,-8 C -18,-13 18,-13 18,-8 L 16,0 C 16,3 -16,3 -16,0 Z", fill: bronzeBase, stroke: goldTrim, strokeWidth: "1.2" }),
          e.jsx("path", { d: "M -9,-2 C -9,-6 9,-6 9,-2 L 7,6 L -7,6 Z", fill: "#b45309" }),
          e.jsx("path", { d: "-15,-5 L -17,6 L -11,3 Z", fill: bronzeBase }),
          e.jsx("path", { d: "15,-5 L 17,6 L 11,3 Z", fill: bronzeBase })
        ]
      }),

      // 3. Imperial Roman Curved Tower Scutum (Direct Mirror of Medallion IMG_5435)
      e.jsxs("g", {
        id: "medallion-scutum-shield",
        children: [
          e.jsx("rect", { x: "-24", y: "-18", width: "48", height: "58", rx: "7", fill: scutumGrad, stroke: goldTrim, strokeWidth: "2.4", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.85))" }),
          e.jsx("rect", { x: "-21", y: "-15", width: "42", height: "52", rx: "5", fill: "none", stroke: goldTrim, strokeWidth: "0.9", opacity: "0.8" }),

          // Winged Jupiter Lightning Bolts
          e.jsx("path", { d: "M -20,11 Q -10,1 -1,11 Q -10,21 -20,11 Z", fill: goldTrim }),
          e.jsx("path", { d: "M 20,11 Q 10,1 1,11 Q 10,21 20,11 Z", fill: goldTrim }),
          e.jsx("polygon", { points: "0,-4 3,6 0,9 -3,6", fill: "#fef08a" }),
          e.jsx("polygon", { points: "0,26 3,16 0,13 -3,16", fill: "#fef08a" }),

          // Central Raised Golden Umbo Boss with Winged Diamond / Eye of Rome
          e.jsx("circle", { cx: "0", cy: "11", r: "8.5", fill: "#a68c52", stroke: "#fef08a", strokeWidth: "1.8" }),
          e.jsx("circle", { cx: "0", cy: "11", r: "4", fill: "#fef08a" }),
          e.jsx("circle", { cx: "0", cy: "11", r: "1.8", fill: "#78350f" }),

          // Bottom Curved Bronze Scutum Rim
          e.jsx("path", { d: "-24,40 Q 0,48 24,40", fill: "none", stroke: "#eab308", strokeWidth: "2.4", strokeLinecap: "round" })
        ]
      }),

      // 4. Dynamic Progressive Legion Damage (Dirt/Blood Decals, Broken Scuta, Casualties)
      (hpPct < 75) && e.jsxs("g", {
        id: "legion-dynamic-dirt-blood-tier1",
        children: [
          e.jsx("ellipse", { cx: "-12", cy: "36", rx: "18", ry: "6", fill: "#7f1d1d", opacity: "0.85" }),
          e.jsx("line", { x1: "-18", y1: "20", x2: "-26", y2: "36", stroke: "#451a03", strokeWidth: "2.6" }),
          e.jsx("line", { x1: "20", y1: "22", x2: "28", y2: "36", stroke: "#451a03", strokeWidth: "2.4" })
        ]
      }),
      (hpPct < 45) && e.jsxs("g", {
        id: "legion-dynamic-fallen-soldier-tier2",
        children: [
          e.jsxs("g", {
            transform: "translate(-20, 32)",
            children: [
              e.jsx("rect", { x: "-10", y: "-3", width: "20", height: "7", rx: "2", fill: "#b91c1c" }),
              e.jsx("circle", { cx: "-12", cy: "-1", r: "3.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "0.8" }),
              e.jsx("ellipse", { cx: "0", cy: "4", rx: "14", ry: "4.5", fill: "#991b1b" })
            ]
          }),
          e.jsxs("g", {
            transform: "translate(18, 30) rotate(35)",
            children: [
              e.jsx("rect", { x: "-6", y: "-10", width: "12", height: "20", rx: "2.5", fill: "#991b1b", stroke: "#000", strokeWidth: "1" }),
              e.jsx("line", { x1: "-6", y1: "-1", x2: "6", y2: "3", stroke: "#000", strokeWidth: "1.8" }),
              e.jsx("circle", { cx: "0", cy: "0", r: "2.5", fill: "#facc15" })
            ]
          })
        ]
      }),
      (hpPct < 25) && e.jsxs("g", {
        id: "legion-dynamic-battle-carnage-tier3",
        children: [
          e.jsxs("g", {
            transform: "translate(12, 34)",
            children: [
              e.jsx("rect", { x: "-8", y: "-2.5", width: "16", height: "5", rx: "1.5", fill: "#1c1917" }),
              e.jsx("line", { x1: "-10", y1: "4", x2: "6", y2: "4", stroke: "#f1f5f9", strokeWidth: "1.8" }),
              e.jsx("line", { x1: "-10", y1: "1.5", x2: "-10", y2: "6.5", stroke: "#facc15", strokeWidth: "2" })
            ]
          }),
          e.jsx("ellipse", { cx: "0", cy: "36", rx: "40", ry: "10", fill: "rgba(153,27,27,0.75)" }),
          e.jsx("path", { d: "M 0 16 Q -5 -5 -2 -18 Q 5 -5 2 16 Z", fill: "rgba(120,53,15,0.7)", className: "animate-pulse" })
        ]
      })
    ]
  });
};`;

// 3. FACTION & MONSTER 2.5D MEDALLION HELPERS
const masterworkAuxiliaryModels = `
const render2DBarbarianWarband = (x, y, isPlayer, faction = "barbarian", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "cohort", "barbarian", hpPct, animState, scale, isAttacking, isHit);
};

const render2DGreekPhalanx = (x, y, isPlayer, faction = "greek", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "cohort", "greek", hpPct, animState, scale, isAttacking, isHit);
};

const render2DPunicInfantry = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "cohort", "punic", hpPct, animState, scale, isAttacking, isHit);
};

const render2DWarElephant = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "commander", "punic", hpPct, animState, scale * 1.25, isAttacking, isHit);
};

const render2DSeaMonster = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DShip(x, y, isPlayer, "flagship", "barbarian", hpPct, animState, scale * 1.3, isAttacking, isHit);
};

const render2DSiren = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DShip(x, y, isPlayer, "escortA", "greek", hpPct, animState, scale, isAttacking, isHit);
};

const render2DPoseidonAvatar = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DShip(x, y, isPlayer, "flagship", "greek", hpPct, animState, scale * 1.4, isAttacking, isHit);
};

const render2DMinotaur = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "commander", "punic", hpPct, animState, scale * 1.3, isAttacking, isHit);
};

const render2DGorgon = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "cohort", "greek", hpPct, animState, scale * 1.1, isAttacking, isHit);
};

const render2DCerberus = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "commander", "barbarian", hpPct, animState, scale * 1.2, isAttacking, isHit);
};

const render2DWolfPack = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "cohort", "barbarian", hpPct, animState, scale * 0.9, isAttacking, isHit);
};

const render2DAfricanLion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "commander", "punic", hpPct, animState, scale * 1.1, isAttacking, isHit);
};

const render2DHercynianBoar = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "cohort", "barbarian", hpPct, animState, scale * 1.05, isAttacking, isHit);
};

const render2DAlpineBear = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "commander", "barbarian", hpPct, animState, scale * 1.25, isAttacking, isHit);
};

const render2DScorpion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return render2DLegion(x, y, isPlayer, "cohort", "punic", hpPct, animState, scale * 0.95, isAttacking, isHit);
};
`;

const completeReplacement = masterworkShip + "\n\n" + masterworkLegion + "\n\n" + masterworkAuxiliaryModels + "\n\n";

bundle = bundle.substring(0, pStart) + completeReplacement + bundle.substring(pEnd);

try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, "utf8");
  console.log("SUCCESS: Entire legacy unit rendering block completely wiped and replaced with 2.5D Medallion art!");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, "utf8");
    console.log("SUCCESS: dist bundle synced.");
  }
} catch (err) {
  console.error("ERR: esbuild transform failed:", err.message);
  process.exit(1);
}
