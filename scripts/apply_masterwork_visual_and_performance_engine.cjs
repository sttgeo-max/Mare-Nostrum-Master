const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== COMPREHENSIVE MASTERWORK 2.5D VISUAL ENGINE & 60FPS COMBAT OPTIMIZATION ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. INJECT 60FPS GPU-ACCELERATED KEYFRAMES IN BattleTheatreV2 SVG STYLE
const targetKeyframeSearch = "@keyframes bt_star_twinkle {";
const gpuKeyframes = `@keyframes bt_gladius_cleave {
                0% { stroke-dashoffset: 160; opacity: 0; transform: translate3d(0,0,0) scale(0.6) rotate(-25deg); }
                18% { opacity: 1; stroke-dashoffset: 0; transform: translate3d(0,0,0) scale(1.15) rotate(0deg); }
                75% { opacity: 1; transform: translate3d(0,0,0) scale(1.0) rotate(8deg); }
                100% { opacity: 0; transform: translate3d(0,0,0) scale(0.9); }
              }
              @keyframes bt_shield_shatter {
                0% { transform: translate3d(0,0,0) scale(0.4) rotate(0deg); opacity: 0; }
                20% { transform: translate3d(0,0,0) scale(1.2) rotate(-5deg); opacity: 1; }
                60% { transform: translate3d(0,0,0) scale(1.0) rotate(5deg); opacity: 0.95; }
                100% { transform: translate3d(0,0,0) scale(0.8) rotate(15deg); opacity: 0; }
              }
              @keyframes bt_blood_splatter {
                0% { r: 2; opacity: 1; transform: translate3d(0,0,0); }
                60% { r: 35; opacity: 0.85; transform: translate3d(0,0,0); }
                100% { r: 55; opacity: 0; transform: translate3d(0,0,0); }
              }
              @keyframes bt_divine_retribution {
                0% { transform: translate3d(0,0,0) scale(0.2) rotate(0deg); opacity: 0; }
                25% { transform: translate3d(0,0,0) scale(1.1) rotate(90deg); opacity: 1; }
                75% { transform: translate3d(0,0,0) scale(1.0) rotate(270deg); opacity: 0.9; }
                100% { transform: translate3d(0,0,0) scale(0.4) rotate(360deg); opacity: 0; }
              }
              @keyframes bt_scutum_wall_pulse {
                0% { transform: translate3d(0,0,0) scale(0.94); opacity: 0.7; }
                50% { transform: translate3d(0,0,0) scale(1.03); opacity: 1; }
                100% { transform: translate3d(0,0,0) scale(0.94); opacity: 0.7; }
              }
              @keyframes bt_arrow_flight {
                0% { stroke-dashoffset: 600; opacity: 0; transform: translate3d(0,0,0); }
                8% { opacity: 1; }
                85% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -120; opacity: 0; }
              }
              @keyframes bt_javelin_spin {
                0% { stroke-dashoffset: 500; opacity: 0; transform: translate3d(0,0,0) scaleY(1); }
                10% { opacity: 1; }
                80% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -100; opacity: 0; }
              }
              @keyframes bt_ram_surge {
                0% { transform: translate3d(0,0,0); }
                40% { transform: translate3d(55px,0,0); }
                65% { transform: translate3d(65px,0,0); }
                100% { transform: translate3d(0,0,0); }
              }
              @keyframes bt_corvus_drop {
                0% { transform: translate3d(0,0,0) rotate(-75deg); opacity: 0; }
                15% { opacity: 1; }
                60% { transform: translate3d(0,0,0) rotate(0deg); opacity: 1; }
                85% { transform: translate3d(0,0,0) rotate(0deg); opacity: 0.9; }
                100% { transform: translate3d(0,0,0) rotate(-10deg); opacity: 0; }
              }
              @keyframes bt_claw_swipe {
                0% { stroke-dashoffset: 120; opacity: 0; transform: translate3d(0,0,0) scale(0.6) rotate(-15deg); }
                20% { opacity: 1; stroke-dashoffset: 0; transform: translate3d(0,0,0) scale(1.1) rotate(0deg); }
                80% { opacity: 1; transform: translate3d(0,0,0) scale(1.0) rotate(5deg); }
                100% { opacity: 0; transform: translate3d(0,0,0) scale(0.95); }
              }
              @keyframes bt_grapple_hurl {
                0% { stroke-dashoffset: 400; opacity: 0; transform: translate3d(0,0,0); }
                15% { opacity: 1; }
                75% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -60; opacity: 0; }
              }
              @keyframes bt_greek_fire_jet {
                0% { stroke-dashoffset: 350; opacity: 0; transform: translate3d(0,0,0); }
                10% { opacity: 0.9; }
                50% { stroke-dashoffset: 0; opacity: 1; }
                85% { opacity: 0.8; }
                100% { stroke-dashoffset: -100; opacity: 0; }
              }
              @keyframes bt_shockwave_ring {
                0% { r: 5; opacity: 1; stroke-width: 6; transform: translate3d(0,0,0); }
                100% { r: 65; opacity: 0; stroke-width: 0.5; transform: translate3d(0,0,0); }
              }
              @keyframes bt_star_twinkle {`;

if (bundle.includes(targetKeyframeSearch)) {
  bundle = bundle.replace(targetKeyframeSearch, gpuKeyframes);
  console.log("- Injected 60FPS GPU-accelerated Keyframes into BattleTheatreV2.");
} else {
  console.error("ERROR: targetKeyframeSearch not found!");
}

// 2. BUILD THE MASTERWORK 2.5D VISUAL TRANSFORMATION ENGINE FOR ALL UNITS & MONSTERS
// Create renderMasterwork2DMedallionUnit function right before BattleTheatreV2
const pBt = bundle.indexOf("const BattleTheatreV2 = ({");

const visualEngineCode = `
// =========================================================================
// === MASTERWORK 2.5D VISUAL TRANSFORMATION ENGINE (MEDALLION ART SYMMETRY) ===
// =========================================================================
const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1, unitCategory = "ship", customEmblem = "") => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship" || role === "commander";
  const flip = isPlayer ? 1 : -1;
  const unitTier = Math.min(5, Math.max(1, tier || 1));
  const isNaval = unitCategory === "ship";

  // Medallion Palette Matching
  const isRoman = faction === "roman" || faction === "player";
  const isPunic = faction === "punic";
  const isGreek = faction === "greek";
  const isBarb = faction === "barbarian" || faction === "pirate";

  const goldTrim = unitTier >= 4 ? "#fef08a" : "#facc15";
  const bronzeBase = "#a17e4d";
  const scutumGrad = isRoman ? "url(#scutum-grad-roman)" : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const sailGrad = isRoman ? (unitTier >= 4 ? "url(#sl_prp_rom)" : "#6b21a8") : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const plumeGrad = isRoman ? "url(#crest-plume-roman)" : "#dc2626";

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead 
        ? (isNaval ? "bt_ship_death_sink 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "bt_legion_death_collapse 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards")
        : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // 0. Base Tactile Foundation & Shadow
      e.jsx("ellipse", { cx: "0", cy: "36", rx: isFlag ? "72" : "52", ry: "18", fill: "#000000", opacity: "0.6" }),

      // -------------------------------------------------------------
      // 1. NAVAL UNIT (Direct Mirror of Masterwork Medallion IMG_5436)
      // -------------------------------------------------------------
      isNaval && e.jsxs("g", {
        id: "naval-medallion-body",
        children: [
          // Foaming Mediterranean Oceanic Wave Base
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

          // Synchronized Rowing Oars Slicing the Waves
          !isDead && e.jsxs("g", {
            stroke: bronzeBase,
            strokeWidth: "2.2",
            strokeLinecap: "round",
            className: isAttacking ? "animate-oar-sweep" : "",
            children: [
              [-42, -32, -22, -12, -2].map((ox, i) => e.jsx("line", { key: "oar_l_" + i, x1: ox, y1: 14 + i * 2, x2: ox - 18, y2: 32 + i * 2 })),
              [10, 20, 30, 40, 50].map((ox, i) => e.jsx("line", { key: "oar_r_" + i, x1: ox, y1: 22 - i * 2, x2: ox + 18, y2: 38 - i * 2 }))
            ]
          }),

          // 2.5D Ship Hull Planking & Bronze Wale
          e.jsxs("g", {
            id: "medallion-ship-hull",
            children: [
              e.jsx("path", { d: "M 0,32 L -48,12 C -36,5 -18,4 0,6 Z", fill: isRoman ? "url(#hl_wd_l_rom)" : "#451a03", stroke: "#270e02", strokeWidth: "1" }),
              e.jsx("path", { d: "M 0,32 L 48,12 C 36,5 18,4 0,6 Z", fill: isRoman ? "url(#hl_wd_r_rom)" : "#78350f", stroke: "#270e02", strokeWidth: "1" }),
              e.jsx("path", { d: "M -40,14 Q -20,17 0,24 Q 20,17 40,14", fill: "none", stroke: "#270e02", strokeWidth: "1.2" }),
              e.jsx("path", { d: "M -32,18 Q -16,22 0,28 Q 16,22 32,18", fill: "none", stroke: "#270e02", strokeWidth: "1.2" }),
              e.jsx("path", { d: "M -48,11 Q 0,16 48,11 L 48,13 Q 0,18 -48,13 Z", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.6" })
            ]
          }),

          // Bulwark Shields Line
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

          // Forecastle Fighting Platform
          !isDead && e.jsxs("g", {
            id: "medallion-forecastle-tower",
            children: [
              e.jsx("path", { d: "M -26,-2 L 26,-2 L 22,12 L -22,12 Z", fill: "#5c2606", stroke: "#ca8a04", strokeWidth: "1.2" }),
              [-22, -10, 2, 14].map((bx, i) => e.jsx("rect", { key: "cren_" + i, x: bx, y: "-6", width: "8", height: "5", fill: goldTrim, rx: "0.5" })),
              e.jsx("rect", { x: "-7", y: "0", width: "14", height: "9", rx: "2", fill: "#18181b", stroke: "#eab308", strokeWidth: "1" }),
              e.jsx("circle", { cx: "0", cy: "4.5", r: "3", fill: "#fef08a" })
            ]
          }),

          // Cast Bronze Rostrum Ram
          !isDead && e.jsxs("g", {
            id: "medallion-rostrum-ram",
            className: isAttacking ? "animate-rostrum-ram-thrust" : "",
            children: [
              e.jsx("polygon", { points: "-3,6 3,6 2,30 -2,30", fill: "url(#rst_bz_rom)" }),
              e.jsx("polygon", { points: "-6,28 6,28 3,40 0,43 -3,40", fill: "url(#rst_bz_rom)", stroke: "#78350f", strokeWidth: "1" }),
              e.jsx("line", { x1: "0", y1: "28", x2: "0", y2: "41", stroke: "#fef08a", strokeWidth: "1.4" }),
              e.jsx("circle", { cx: "0", cy: "30", r: "2", fill: "#fef08a" })
            ]
          }),

          // Mast, Yardarm & Rigging
          !isDead && e.jsxs("g", {
            children: [
              e.jsx("line", { x1: "0", y1: "-56", x2: "-46", y2: "12", stroke: "#cbd5e1", strokeWidth: "1", opacity: "0.65" }),
              e.jsx("line", { x1: "0", y1: "-56", x2: "46", y2: "12", stroke: "#cbd5e1", strokeWidth: "1", opacity: "0.65" }),
              e.jsx("rect", { x: "-2.5", y: "-62", width: "5", height: "66", rx: "1.5", fill: "#451a03", stroke: "#270e02", strokeWidth: "0.8" }),
              e.jsx("rect", { x: "-42", y: "-50", width: "84", height: "4", rx: "2", fill: "#78350f", stroke: "#451a03", strokeWidth: "0.8" })
            ]
          }),

          // Billowing Imperial Sail with Golden Aquila
          !isDead && e.jsxs("g", {
            id: "medallion-billowing-sail",
            children: [
              e.jsx("path", { d: "M -36,-48 Q 0,-54 36,-48 L 31,-12 Q 0,-2 -31,-12 Z", fill: sailGrad, stroke: goldTrim, strokeWidth: "1.6" }),
              e.jsx("path", { d: "M -30,-46 Q 0,-50 30,-46 L 27,-42 Q 0,-46 -27,-42 Z", fill: "#ffffff", opacity: "0.3" }),
              e.jsx("path", { d: "M -14,-46 Q -10,-28 -12,-10", stroke: "#3b0764", strokeWidth: "1.4", fill: "none", opacity: "0.7" }),
              e.jsx("path", { d: "M 14,-46 Q 10,-28 12,-10", stroke: "#3b0764", strokeWidth: "1.4", fill: "none", opacity: "0.7" }),

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

          // DYNAMIC ENVIRONMENT DEGRADATION: PERSISTENT TIMBER SPLINTERS, TATTERED SAILS & SMOKE
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
      }),

      // -------------------------------------------------------------
      // 2. LEGION UNIT (Direct Mirror of Masterwork Medallion IMG_5435)
      // -------------------------------------------------------------
      !isNaval && e.jsxs("g", {
        id: "legion-medallion-body",
        children: [
          // Dual Crossed Roman Pila Spears Behind Shield
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

          // Centurion Galea Helmet with Transverse Red Plume
          !isDead && e.jsxs("g", {
            id: "medallion-centurion-galea",
            transform: "translate(0, -22)",
            children: [
              e.jsx("path", { d: "M -32,-8 C -18,-20 18,-20 32,-8 C 20,-14 -20,-14 -32,-8 Z", fill: plumeGrad, stroke: "#991b1b", strokeWidth: "0.8" }),
              e.jsx("path", { d: "M -18,-8 C -18,-13 18,-13 18,-8 L 16,0 C 16,3 -16,3 -16,0 Z", fill: bronzeBase, stroke: goldTrim, strokeWidth: "1.2" }),
              e.jsx("path", { d: "M -9,-2 C -9,-6 9,-6 9,-2 L 7,6 L -7,6 Z", fill: "#b45309" }),
              e.jsx("path", { d: "M -15,-5 L -17,6 L -11,3 Z", fill: bronzeBase }),
              e.jsx("path", { d: "M 15,-5 L 17,6 L 11,3 Z", fill: bronzeBase })
            ]
          }),

          // Imperial Roman Curved Tower Scutum
          e.jsxs("g", {
            id: "medallion-scutum-shield",
            children: [
              e.jsx("rect", { x: "-24", y: "-18", width: "48", height: "58", rx: "7", fill: scutumGrad, stroke: goldTrim, strokeWidth: "2.4", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.85))" }),
              e.jsx("rect", { x: "-21", y: "-15", width: "42", height: "52", rx: "5", fill: "none", stroke: goldTrim, strokeWidth: "0.9", opacity: "0.8" }),
              e.jsx("path", { d: "M -20,11 Q -10,1 -1,11 Q -10,21 -20,11 Z", fill: goldTrim }),
              e.jsx("path", { d: "M 20,11 Q 10,1 1,11 Q 10,21 20,11 Z", fill: goldTrim }),
              e.jsx("polygon", { points: "0,-4 3,6 0,9 -3,6", fill: "#fef08a" }),
              e.jsx("polygon", { points: "0,26 3,16 0,13 -3,16", fill: "#fef08a" }),
              e.jsx("circle", { cx: "0", cy: "11", r: "8.5", fill: "#a68c52", stroke: "#fef08a", strokeWidth: "1.8" }),
              e.jsx("circle", { cx: "0", cy: "11", r: "4", fill: "#fef08a" }),
              e.jsx("circle", { cx: "0", cy: "11", r: "1.8", fill: "#78350f" }),
              e.jsx("path", { d: "M -24,40 Q 0,48 24,40", fill: "none", stroke: "#eab308", strokeWidth: "2.4", strokeLinecap: "round" })
            ]
          }),

          // DYNAMIC ENVIRONMENT DEGRADATION: BLOOD/DIRT DECALS, BROKEN SCUTA & FALLEN CASUALTIES
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
      })
    ]
  });
};
`;

bundle = bundle.substring(0, pBt) + visualEngineCode + "\n" + bundle.substring(pBt);
console.log("- Injected 2.5D Masterwork Transformation Visual Engine (renderMasterwork2DMedallionUnit).");

// 3. MAP BattleTheatreV2 FORMATION DISPATCH TO USE THE 2.5D VISUAL TRANSFORMATION ENGINE
const pDispatchSearch = bundle.indexOf("// === DYNAMIC UNIT DISPATCH WITH MONSTER ENCOUNTERS & LEVEL PROGRESSION ===");
const pEffectsSearch = bundle.indexOf("// 4. PRECISELY MODEL-ALIGNED COMBAT EFFECTS", pDispatchSearch);

if (pDispatchSearch !== -1 && pEffectsSearch !== -1) {
  const masterworkDispatchCode = `// === DYNAMIC UNIT DISPATCH WITH MASTERWORK 2.5D VISUAL ENGINE ===
          ...(() => {
            const pLvl = Math.max(1, (player && player.level) || (typeof s !== "undefined" && s.level) || Math.floor(((typeof s !== "undefined" && s.fama) || 0) / 60) + 1);
            const pLegTier = Math.min(5, Math.max(1, (player && player.legionTier) || (typeof s !== "undefined" && s.legionTier) || (pLvl >= 8 ? 5 : pLvl >= 6 ? 4 : pLvl >= 4 ? 3 : pLvl >= 2 ? 2 : 1)));
            const pFltTier = Math.min(5, Math.max(1, (player && player.fleetTier) || (typeof s !== "undefined" && s.fleetTier) || (pLvl >= 8 ? 5 : pLvl >= 6 ? 4 : pLvl >= 4 ? 3 : pLvl >= 2 ? 2 : 1)));
            
            const eName = ((enemy && (enemy.name || enemy.title || enemy.latinName)) || "").toLowerCase();
            const eType = ((enemy && enemy.type) || "").toLowerCase();
            const eCat = ((enemy && enemy.category) || "").toLowerCase();
            const eId = ((enemy && enemy.id) || "").toLowerCase();
            const eIcon = ((enemy && enemy.icon) || "").toLowerCase();

            // Monster & Animal Classifications
            const isPoseidon = isNaval && (eName.includes("poseidon") || eName.includes("neptun") || eId.includes("poseidon"));
            const isSiren = isNaval && (eName.includes("siren") || eName.includes("scylla") || eId.includes("siren") || eIcon.includes("siren"));
            const isSeaBeast = isNaval && (isPoseidon || isSiren || eType.includes("monster") || eType.includes("beast") || eType.includes("serpent") || eType.includes("kraken") || eType.includes("hydra") || eType.includes("leviathan") || eName.includes("serpent") || eName.includes("kraken") || eName.includes("hydra") || eName.includes("leviathan") || eName.includes("scylla") || eName.includes("charybdis") || eName.includes("monster") || eId.includes("kraken") || eId.includes("serpent"));
            
            const isElephantUnit = !isNaval && (eType.includes("elephant") || eName.includes("elephant") || eId.includes("elephant") || eCat.includes("elephant") || (enemyFaction === "punic" && (eName.includes("vanguard") || (enemy && enemy.hasElephant))));
            const isMinotaurUnit = !isNaval && (eName.includes("minotaur") || eId.includes("minotaur") || eName.includes("colossus") || eName.includes("titan") || eName.includes("cyclops") || eType.includes("minotaur"));
            const isGorgonUnit = !isNaval && (eName.includes("gorgon") || eName.includes("medusa") || eId.includes("medusa") || eId.includes("gorgon"));
            const isCerberusUnit = !isNaval && (eName.includes("cerberus") || eId.includes("cerberus") || eName.includes("hellhound"));
            const isWolfUnit = !isNaval && (eName.includes("wolf") || eId.includes("wolf") || eName.includes("lupus") || eIcon.includes("wolf"));
            const isLionUnit = !isNaval && (eName.includes("lion") || eId.includes("lion") || eName.includes("leo") || eIcon.includes("lion"));
            const isBoarUnit = !isNaval && (eName.includes("boar") || eId.includes("boar") || eName.includes("aper") || eIcon.includes("boar"));
            const isBearUnit = !isNaval && (eName.includes("bear") || eId.includes("bear") || eName.includes("ursus") || eIcon.includes("bear"));
            const isScorpionUnit = !isNaval && (eName.includes("scorpion") || eId.includes("scorpion") || eIcon.includes("scorpion"));
            const isAnyLandAnimal = isElephantUnit || isMinotaurUnit || isGorgonUnit || isCerberusUnit || isWolfUnit || isLionUnit || isBoarUnit || isBearUnit || isScorpionUnit;

            const renderLandEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              if (isElephantUnit) return isFlagUnit ? render2DWarElephant(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit") : renderMasterwork2DMedallionUnit(laneX, laneY, false, "cohort", enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit", false, "", 2, "legion");
              if (isMinotaurUnit) return render2DMinotaur(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isGorgonUnit) return render2DGorgon(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isCerberusUnit) return render2DCerberus(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isWolfUnit) return render2DWolfPack(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isLionUnit) return render2DAfricanLion(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isBoarUnit) return render2DHercynianBoar(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isBearUnit) return render2DAlpineBear(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isScorpionUnit) return render2DScorpion(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              return renderMasterwork2DMedallionUnit(laneX, laneY, false, isFlagUnit ? "commander" : "cohort", enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit", false, "", 2, "legion");
            };

            const renderNavalEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              if (isPoseidon) return render2DPoseidonAvatar(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSiren) return render2DSiren(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSeaBeast) return render2DSeaMonster(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              return renderMasterwork2DMedallionUnit(laneX, laneY, false, isFlagUnit ? "flagship" : "escortA", enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit", false, "", isFlagUnit ? 3 : 2, "ship");
            };

            return [
              // =================================================================
              // 2. PLAYER FORMATION (2.5D MASTERWORK MEDALLION ENGINE)
              // =================================================================
              // Lane 1 (Upper Escort)
              isNaval
                ? renderMasterwork2DMedallionUnit(110 + pEsc1Offset, 115, true, "escortA", "roman", pPct, playerAnim, 0.85, isPlayerAttacking, playerAnim === "hit", false, "", pFltTier, "ship")
                : renderMasterwork2DMedallionUnit(110 + pEsc1Offset, 115, true, "cohort", "roman", pPct, playerAnim, 0.85, isPlayerAttacking, playerAnim === "hit", false, "", pLegTier, "legion"),

              // Lane 2 (Center Flagship / Commander Cohort)
              isNaval
                ? renderMasterwork2DMedallionUnit(165 + pFlagOffset, 215, true, "flagship", "roman", pPct, playerAnim, 1.25, isPlayerAttacking, playerAnim === "hit", false, "", pFltTier, "ship")
                : renderMasterwork2DMedallionUnit(165 + pFlagOffset, 215, true, "commander", "roman", pPct, playerAnim, 1.25, isPlayerAttacking, playerAnim === "hit", false, "", pLegTier, "legion"),

              // Lane 3 (Lower Escort)
              isNaval
                ? renderMasterwork2DMedallionUnit(110 + pEsc2Offset, 310, true, "escortB", "roman", pPct, playerAnim, 0.90, isPlayerAttacking, playerAnim === "hit", false, "", pFltTier, "ship")
                : renderMasterwork2DMedallionUnit(110 + pEsc2Offset, 310, true, "cohort", "roman", pPct, playerAnim, 0.90, isPlayerAttacking, playerAnim === "hit", false, "", pLegTier, "legion"),

              // =================================================================
              // 3. ENEMY FORMATION (2.5D MASTERWORK MEDALLION ENGINE)
              // =================================================================
              isNaval ? renderNavalEnemy(690 + eEsc1Offset, 115, false, 0.85) : renderLandEnemy(690 + eEsc1Offset, 115, false, 0.85),
              isNaval ? renderNavalEnemy(635 + eFlagOffset, 215, true, 1.30) : renderLandEnemy(635 + eFlagOffset, 215, true, 1.30),
              isNaval ? renderNavalEnemy(690 + eEsc2Offset, 310, false, 0.90) : renderLandEnemy(690 + eEsc2Offset, 310, false, 0.90)
            ];
          })(),
          `;

  bundle = bundle.substring(0, pDispatchSearch) + masterworkDispatchCode + bundle.substring(pEffectsSearch);
  console.log("- Successfully connected 2.5D Masterwork Transformation Visual Engine to BattleTheatreV2 formation dispatch!");
} else {
  console.error("ERROR: Could not locate formation dispatch bounds!");
}

// 4. INJECT COMPLETE MASTERWORK WEAPONS & DEFENSE LAYER
const targetSvgEnd = 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)"\n            }\n          })';
const pSvgGrad = bundle.indexOf(targetSvgEnd);

if (pSvgGrad !== -1 && !bundle.includes('id: "masterwork-weapon-animations-layer"')) {
  const insertPos = pSvgGrad + targetSvgEnd.length;
  const masterworkWeaponLayer = `,
          // =========================================================================
          // === 60FPS GPU-ACCELERATED MASTERWORK WEAPONS & ARTIFACT LAYER ===
          // =========================================================================
          e.jsxs("g", {
            id: "masterwork-weapon-animations-layer",
            className: "pointer-events-none select-none",
            children: [
              // 1. ARROW SALVO / SAGITTARII VOLLEY
              (activeCombatFX && (activeCombatFX.type === "arrow_fire" || activeCombatFX.type === "fire_arrow" || activeCombatFX.type === "arrow_fire_travel")) && e.jsxs("g", {
                id: "fx-arrow-salvo-flight",
                children: [
                  [ { sy: 115, ey: 118, arc: 45, d: "0s" }, { sy: 215, ey: 215, arc: 125, d: "0.06s" }, { sy: 310, ey: 312, arc: 240, d: "0.12s" } ].map((lane, idx) => {
                    const isFire = activeCombatFX.type === "fire_arrow";
                    const sx = activeCombatFX.isPlayer ? 635 : 165;
                    const ex = activeCombatFX.isPlayer ? 165 : 635;
                    const pth = "M " + sx + " " + lane.sy + " Q 400 " + lane.arc + " " + ex + " " + lane.ey;
                    return e.jsxs("g", { key: "arr_lane_" + idx, children: [
                      e.jsx("path", {
                        d: pth,
                        stroke: isFire ? "#f97316" : "#fef08a",
                        strokeWidth: isFire ? "3.8" : "2.4",
                        strokeDasharray: "45 600",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_arrow_flight 0.48s cubic-bezier(0.2, 0.6, 0.35, 1) " + lane.d + " forwards", willChange: "transform, opacity" }
                      }),
                      e.jsx("path", {
                        d: pth,
                        stroke: "#ffffff",
                        strokeWidth: "1.5",
                        strokeDasharray: "18 627",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_arrow_flight 0.48s cubic-bezier(0.2, 0.6, 0.35, 1) " + lane.d + " forwards", willChange: "transform, opacity" }
                      }),
                      isFire && e.jsx("circle", {
                        cx: ex,
                        cy: lane.ey,
                        r: "18",
                        fill: "rgba(249,115,22,0.65)",
                        style: { animation: "bt_burst_salvo2 0.45s 0.32s ease-out forwards", willChange: "transform, opacity" }
                      })
                    ]});
                  })
                ]
              }),

              // 2. PILUM & VELITES JAVELIN LAUNCH
              (activeCombatFX && (activeCombatFX.type === "javelin_launch" || activeCombatFX.type === "javelin_launch_travel")) && e.jsxs("g", {
                id: "fx-javelin-launch-flight",
                children: [
                  [ { sy: 135, ey: 125, d: "0s" }, { sy: 215, ey: 215, d: "0.05s" }, { sy: 295, ey: 305, d: "0.1s" } ].map((lane, idx) => {
                    const sx = activeCombatFX.isPlayer ? 620 : 180;
                    const ex = activeCombatFX.isPlayer ? 180 : 620;
                    const pth = "M " + sx + " " + lane.sy + " Q 400 " + (lane.sy - 30) + " " + ex + " " + lane.ey;
                    return e.jsxs("g", { key: "jav_lane_" + idx, children: [
                      e.jsx("path", {
                        d: pth,
                        stroke: "#78350f",
                        strokeWidth: "4.2",
                        strokeDasharray: "55 500",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_javelin_spin 0.45s cubic-bezier(0.16, 1, 0.3, 1) " + lane.d + " forwards", willChange: "transform, opacity" }
                      }),
                      e.jsx("path", {
                        d: pth,
                        stroke: "#f8fafc",
                        strokeWidth: "2.6",
                        strokeDasharray: "20 535",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_javelin_spin 0.45s cubic-bezier(0.16, 1, 0.3, 1) " + lane.d + " forwards", willChange: "transform, opacity" }
                      }),
                      e.jsx("circle", {
                        cx: ex,
                        cy: lane.ey,
                        r: "24",
                        fill: "rgba(254,240,138,0.8)",
                        stroke: "#f59e0b",
                        strokeWidth: "2.5",
                        style: { animation: "bt_shockwave_ring 0.35s 0.28s ease-out forwards", willChange: "transform, opacity" }
                      })
                    ]});
                  })
                ]
              }),

              // 3. BRONZE ROSTRUM RAM & DIEKPLOUS COLLISION
              (activeCombatFX && (activeCombatFX.type === "ram_impact" || activeCombatFX.type === "ram_charge")) && e.jsxs("g", {
                id: "fx-bronze-rostrum-ram-collision",
                transform: "translate(" + (activeCombatFX.isPlayer ? 165 : 635) + ", 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "55", fill: "rgba(251,191,36,0.4)", stroke: "#f59e0b", strokeWidth: "4", style: { animation: "bt_shockwave_ring 0.45s ease-out forwards", willChange: "transform, opacity" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "85", fill: "none", stroke: "#fef08a", strokeWidth: "2.5", opacity: "0.85", style: { animation: "bt_shockwave_ring 0.55s 0.08s ease-out forwards", willChange: "transform, opacity" } }),
                  [-40, -20, 0, 20, 40].map((deg, i) => e.jsx("line", {
                    key: "splinter_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(deg * Math.PI / 180) * 50,
                    y2: Math.sin(deg * Math.PI / 180) * 50,
                    stroke: "#78350f",
                    strokeWidth: "3.2",
                    strokeLinecap: "round"
                  })),
                  e.jsx("polygon", {
                    points: activeCombatFX.isPlayer ? "20,-14 55,0 20,14" : "-20,-14 -55,0 -20,14",
                    fill: "#fef08a",
                    stroke: "#b45309",
                    strokeWidth: "2"
                  })
                ]
              }),

              // 4. CORVUS BOARDING ASSAULT & HARPAX GRAPPLE
              (activeCombatFX && (activeCombatFX.type === "corvus_boarding" || activeCombatFX.type === "grapple_hook")) && e.jsxs("g", {
                id: "fx-corvus-boarding-bridge",
                children: [
                  e.jsxs("g", {
                    transform: "translate(" + (activeCombatFX.isPlayer ? 320 : 480) + ", 215)",
                    style: { animation: "bt_corvus_drop 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards", willChange: "transform, opacity" },
                    children: [
                      e.jsx("rect", { x: "-80", y: "-14", width: "160", height: "28", fill: "#573012", stroke: "#f59e0b", strokeWidth: "2.5", rx: "3" }),
                      e.jsx("line", { x1: "-80", y1: "-14", x2: "80", y2: "-14", stroke: "#b45309", strokeWidth: "2" }),
                      e.jsx("line", { x1: "-80", y1: "14", x2: "80", y2: "14", stroke: "#b45309", strokeWidth: "2" }),
                      e.jsx("polygon", { points: "70,-12 100,0 70,12", fill: "#f1f5f9", stroke: "#0f172a", strokeWidth: "2" }),
                      e.jsx("line", { x1: "-70", y1: "-22", x2: "-40", y2: "-14", stroke: "#94a3b8", strokeWidth: "3.5", strokeDasharray: "4 2" })
                    ]
                  }),
                  e.jsx("circle", {
                    cx: activeCombatFX.isPlayer ? 220 : 580,
                    cy: "215",
                    r: "42",
                    fill: "rgba(245,158,11,0.45)",
                    stroke: "#fbbf24",
                    strokeWidth: "3",
                    style: { animation: "bt_shockwave_ring 0.4s 0.2s ease-out forwards", willChange: "transform, opacity" }
                  })
                ]
              }),

              // 5. BEAST CLAW / FANG / GORE SWIPE
              (activeCombatFX && (activeCombatFX.type === "beast_claw" || activeCombatFX.type === "claw_slash")) && e.jsxs("g", {
                id: "fx-beast-claw-swipe",
                transform: "translate(" + (activeCombatFX.isPlayer ? 180 : 620) + ", 215)",
                children: [
                  [-20, 0, 20].map((offsetY, i) => e.jsx("path", {
                    key: "claw_" + i,
                    d: "M -40 " + (offsetY - 30) + " Q 0 " + offsetY + " 40 " + (offsetY + 30),
                    stroke: "#dc2626",
                    strokeWidth: "7",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "140",
                    style: { animation: "bt_claw_swipe 0.45s ease-out forwards", willChange: "transform, opacity" }
                  })),
                  [-20, 0, 20].map((offsetY, i) => e.jsx("path", {
                    key: "claw_edge_" + i,
                    d: "M -40 " + (offsetY - 30) + " Q 0 " + offsetY + " 40 " + (offsetY + 30),
                    stroke: "#fecaca",
                    strokeWidth: "2.6",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "140",
                    style: { animation: "bt_claw_swipe 0.45s ease-out forwards", willChange: "transform, opacity" }
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "35", fill: "rgba(220,38,38,0.6)", style: { animation: "bt_blood_splatter 0.4s ease-out forwards", willChange: "transform, opacity" } })
                ]
              }),

              // 6. GLADIUS DECISIVE CLEAVE & SWORD SLASH
              (activeCombatFX && activeCombatFX.type === "sword_slash") && e.jsxs("g", {
                id: "fx-gladius-decisive-cleave",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("path", {
                    d: "M -55,-45 Q 0,0 55,45",
                    stroke: "#fef08a",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "160",
                    style: { animation: "bt_gladius_cleave 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards", willChange: "transform, opacity" }
                  }),
                  e.jsx("path", {
                    d: "M -55,-45 Q 0,0 55,45",
                    stroke: "#ffffff",
                    strokeWidth: "3",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "160",
                    style: { animation: "bt_gladius_cleave 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards", willChange: "transform, opacity" }
                  }),
                  [0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => e.jsx("line", {
                    key: "gladius_spark_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(ang * Math.PI / 180) * 28,
                    y2: Math.sin(ang * Math.PI / 180) * 28,
                    stroke: "#fbbf24",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "20", fill: "rgba(254,240,138,0.7)", style: { animation: "bt_shockwave_ring 0.35s ease-out forwards", willChange: "transform, opacity" } })
                ]
              }),

              // 7. GREEK FIRE SPRAY / INCENDIARY CATAPULT
              (activeCombatFX && (activeCombatFX.type === "fire_spray" || activeCombatFX.type === "ignis")) && e.jsxs("g", {
                id: "fx-greek-fire-incendiary-jet",
                children: [
                  e.jsx("path", {
                    d: activeCombatFX.isPlayer ? "M 580 215 Q 400 170 180 215" : "M 180 215 Q 400 170 580 215",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "10",
                    strokeDasharray: "120 400",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_greek_fire_jet 0.52s ease-out forwards", willChange: "transform, opacity" }
                  }),
                  [ { x: 0, y: 0, r: 38 }, { x: -18, y: -22, r: 28 }, { x: 18, y: 18, r: 32 } ].map((pos, i) => e.jsx("circle", {
                    key: "fire_burst_" + i,
                    cx: (activeCombatFX.isPlayer ? 180 : 580) + pos.x,
                    cy: 215 + pos.y,
                    r: pos.r,
                    fill: "rgba(249,115,22,0.75)",
                    stroke: "#fef08a",
                    strokeWidth: "2.5",
                    style: { animation: "bt_shockwave_ring 0.45s " + (i * 0.08) + "s ease-out forwards", willChange: "transform, opacity" }
                  }))
                ]
              }),

              // 8. OAR SHEAR CUTTING BLADE
              (activeCombatFX && activeCombatFX.type === "oar_shear") && e.jsxs("g", {
                id: "fx-oar-shear-shatter",
                transform: "translate(" + (activeCombatFX.isPlayer ? 170 : 630) + ", 215)",
                children: [
                  e.jsx("path", {
                    d: "M -45,-45 L 45,45",
                    stroke: "#fbbf24",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    style: { animation: "bt_claw_swipe 0.4s ease-out forwards", willChange: "transform, opacity" }
                  }),
                  [ -35, -12, 12, 35 ].map((oy, i) => e.jsx("line", {
                    key: "snapped_oar_" + i,
                    x1: "-18",
                    y1: oy,
                    x2: "28",
                    y2: oy + 10,
                    stroke: "#78350f",
                    strokeWidth: "3.5",
                    strokeLinecap: "round"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "35", fill: "rgba(245,158,11,0.5)", style: { animation: "bt_shockwave_ring 0.35s ease-out forwards", willChange: "transform, opacity" } })
                ]
              }),

              // 9. WAR ELEPHANT TRAMPLE
              (activeCombatFX && activeCombatFX.type === "war_elephant_trample") && e.jsxs("g", {
                id: "fx-elephant-trample-shockwave",
                transform: "translate(" + (activeCombatFX.isPlayer ? 180 : 620) + ", 235)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "80", ry: "40", fill: "rgba(180,83,9,0.4)", stroke: "#b45309", strokeWidth: "4.5", style: { animation: "bt_shockwave_ring 0.5s ease-out forwards", willChange: "transform, opacity" } }),
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "120", ry: "55", fill: "none", stroke: "#fef08a", strokeWidth: "2.5", style: { animation: "bt_shockwave_ring 0.6s 0.08s ease-out forwards", willChange: "transform, opacity" } }),
                  [-50, -20, 20, 50].map((dx, i) => e.jsx("line", {
                    key: "dust_" + i,
                    x1: dx,
                    y1: "0",
                    x2: dx * 1.6,
                    y2: "-30",
                    stroke: "#92400e",
                    strokeWidth: "4",
                    strokeLinecap: "round"
                  }))
                ]
              }),

              // 10. ARTIFACT RETRIBUTION / RADIANT DIVINE BEAM
              (activeCombatFX && (activeCombatFX.type === "retaliation" || activeCombatFX.type === "divine_ray" || activeCombatFX.type === "curse")) && e.jsxs("g", {
                id: "fx-artifact-divine-retribution",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "65", fill: "rgba(254,240,138,0.35)", stroke: "#fef08a", strokeWidth: "3.5", style: { animation: "bt_divine_retribution 0.6s ease-out forwards", willChange: "transform, opacity" } }),
                  [0, 60, 120, 180, 240, 300].map((ang, i) => e.jsx("line", {
                    key: "div_beam_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(ang * Math.PI / 180) * 85,
                    y2: Math.sin(ang * Math.PI / 180) * 85,
                    stroke: "#fef08a",
                    strokeWidth: "4",
                    strokeLinecap: "round"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "30", fill: "#ffffff", stroke: "#fbbf24", strokeWidth: "2" })
                ]
              }),

              // 11. SHIELD BLOCK IMPACT WITH SCUTUM BOSS DEFLECTION
              (activeCombatFX && activeCombatFX.type === "block") && e.jsxs("g", {
                id: "fx-shield-block-impact",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("rect", {
                    x: "-28",
                    y: "-38",
                    width: "56",
                    height: "76",
                    rx: "8",
                    fill: "rgba(56,189,248,0.3)",
                    stroke: "#38bdf8",
                    strokeWidth: "3.5",
                    style: { animation: "bt_shield_shatter 0.45s ease-out forwards", willChange: "transform, opacity" }
                  }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "16", fill: "#fef08a", stroke: "#b45309", strokeWidth: "2" }),
                  [-60, -30, 0, 30, 60].map((ang, i) => e.jsx("line", {
                    key: "def_spark_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(ang * Math.PI / 180) * 45,
                    y2: Math.sin(ang * Math.PI / 180) * 45,
                    stroke: "#38bdf8",
                    strokeWidth: "3",
                    strokeLinecap: "round"
                  }))
                ]
              }),

              // 12. ARTERIAL BLEED / BLOODBURST
              (activeCombatFX && activeCombatFX.type === "bleed") && e.jsxs("g", {
                id: "fx-bleed-bloodburst",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "42", fill: "rgba(220,38,38,0.7)", style: { animation: "bt_blood_splatter 0.45s ease-out forwards", willChange: "transform, opacity" } }),
                  [-40, -15, 15, 40].map((deg, i) => e.jsx("circle", {
                    key: "blood_drop_" + i,
                    cx: Math.cos(deg * Math.PI / 180) * 35,
                    cy: Math.sin(deg * Math.PI / 180) * 35,
                    r: "6",
                    fill: "#991b1b"
                  }))
                ]
              })
            ]
          })`;
  bundle = bundle.substring(0, insertPos) + masterworkWeaponLayer + bundle.substring(insertPos);
  console.log("- Injected complete 60FPS GPU-accelerated Masterwork Weapons & Artifacts Layer.");
}

// 5. VALIDATE WITH ESBUILD & SAVE
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, "utf8");
  console.log("SUCCESS: public/assets/index-V33.js validated and updated.");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, "utf8");
    console.log("SUCCESS: dist/assets/index-V33.js synced.");
  }
} catch (err) {
  console.error("ERR: esbuild transform failed:", err.message);
  process.exit(1);
}
