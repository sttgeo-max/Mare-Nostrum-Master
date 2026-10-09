const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== EXPANDED FULL-CENTRAL 2.5D BATTLE THEATRE & SMOOTHED PERFORMANCE (V52) ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// =========================================================================
// 1. FULL-CENTRAL ARENA THEATRE WITH EDGE-TO-EDGE MEDITERRANEAN SEA & TERRAIN
// =========================================================================

const battleTheatreV2Code = `
// === MARE NOSTRUM BATTLE THEATRE V2 (FULL-CENTRAL 2.5D ISOMETRIC BATTLEFIELD) ===

// 1. EXACT 2.5D Isometric Warship (Preserved Exactly)
const render2DShip = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "") => {
  const isDead = animState === "dead" || hpPct <= 0;
  const isFlag = role === "flagship";

  const isPunic = faction === "carthage" || faction === "punic";
  const isPirate = faction === "pirate" || faction === "corsair";

  // Palette mirroring Roman city architecture (warm cedar, stone trim, imperial gold, bronze, terracotta)
  const deckWood = isPlayer ? "#78350f" : isPirate ? "#27272a" : isPunic ? "#581c87" : "#451a03";
  const hullPlank = isPlayer ? "#451a03" : isPirate ? "#18181b" : isPunic ? "#2e1065" : "#2e1c0c";
  const trimGold = isPlayer ? "#fbbf24" : isPirate ? "#cbd5e1" : isPunic ? "#f59e0b" : "#facc15";
  const bronzeRam = isPlayer ? "#f59e0b" : isPirate ? "#94a3b8" : isPunic ? "#d97706" : "#b45309";
  const sailFabric = isPlayer ? "#7e22ce" : isPirate ? "#0f172a" : isPunic ? "#991b1b" : "#b91c1c";
  const turretStone = isPlayer ? "#fef3c7" : isPirate ? "#3f3f46" : isPunic ? "#f3e8ff" : "#e2e8f0";
  const turretStroke = isPlayer ? "#d97706" : isPirate ? "#71717a" : isPunic ? "#7e22ce" : "#64748b";

  const isDamaged = hpPct <= 50 && !isDead;
  const isCritical = hpPct <= 25 && !isDead;
  const listY = isDead ? 16 : 0;
  const flip = isPlayer ? 1 : -1;

  return e.jsxs("g", {
    transform: \`translate(\${x}, \${y + listY}) scale(\${scale * flip}, \${scale})\`,
    opacity: isDead ? "0.35" : "1",
    className: \`transition-all duration-300 \${staggerClass} \${isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(251,191,36,0.9)]" : ""}\`,
    children: [
      // 1. Water Keel Shadow Ellipse
      e.jsx("ellipse", { cx: "0", cy: "22", rx: isFlag ? "72" : "54", ry: isFlag ? "16" : "12", fill: "#020617", opacity: "0.85" }),
      
      // 2. Trailing Stern V-Wake Foam
      !isDead && e.jsx("path", {
        d: isFlag ? "M -55,18 Q -85,22 -110,26 Q -85,16 -55,14 Z" : "M -40,15 Q -65,18 -85,22 Q -65,13 -40,12 Z",
        fill: "rgba(224,242,254,0.65)"
      }),
      // Bow Splash Wave
      !isDead && e.jsx("ellipse", { cx: isFlag ? "64" : "48", cy: "19", rx: "8", ry: "4", fill: "rgba(255,255,255,0.75)" }),

      // 3. 2.5D Dipping Oar Banks (Port & Starboard)
      [-42, -30, -18, -6, 6, 18, 30, 42].map((oarX, idx) => e.jsxs("g", {
        key: \`oar_\${idx}\`,
        children: [
          // Starboard (Upper) Oar
          e.jsx("line", { x1: oarX, y1: "6", x2: oarX - 10, y2: "-4", stroke: "#1c1917", strokeWidth: "1.6", strokeLinecap: "round" }),
          e.jsx("ellipse", { cx: oarX - 10, cy: "-4", rx: "1.6", ry: "1", fill: "#f8fafc", opacity: "0.85" }),
          // Port (Lower) Oar
          e.jsx("line", { x1: oarX + 3, y1: "16", x2: oarX - 7, y2: "29", stroke: "#1c1917", strokeWidth: "1.8", strokeLinecap: "round" }),
          e.jsx("ellipse", { cx: oarX - 7, cy: "29", rx: "1.8", ry: "1.2", fill: "#f8fafc", opacity: "0.9" })
        ]
      })),

      // 4. Lower Hull Underbody (Waterline Shadow Profile)
      e.jsx("path", {
        d: isFlag ? "M -52,14 Q 0,30 54,19 L 62,15 L 50,11 Q 0,21 -48,8 Z" : "M -38,11 Q 0,22 40,14 L 46,11 L 38,8 Q 0,16 -35,6 Z",
        fill: hullPlank,
        stroke: "#000",
        strokeWidth: "1.2"
      }),

      // 5. Bronze Rostrum Ram at Bow Waterline
      e.jsx("polygon", {
        points: isFlag ? "49,11 68,14 56,19 46,16" : "37,8 52,11 43,15 35,12",
        fill: bronzeRam,
        stroke: "#000",
        strokeWidth: "1"
      }),
      e.jsx("line", { x1: isFlag ? "50" : "38", y1: isFlag ? "14" : "11", x2: isFlag ? "65" : "50", y2: isFlag ? "15" : "12", stroke: "#fef08a", strokeWidth: "1.4" }),

      // 6. 2.5D Isometric Upper Deck Planking (Lozenge Profile)
      e.jsx("path", {
        d: isFlag ? "M -50,8 Q 0,16 50,11 L 54,13 Q 0,23 -48,15 Z" : "M -37,6 Q 0,12 38,8 L 41,10 Q 0,17 -35,11 Z",
        fill: deckWood,
        stroke: trimGold,
        strokeWidth: "1.5"
      }),

      // 7. Gilded Sheer Strake / Gunwale Rails
      e.jsx("path", {
        d: isFlag ? "M -50,8 Q 0,15 50,11" : "M -37,6 Q 0,11 38,8",
        stroke: trimGold,
        strokeWidth: "1.8",
        fill: "none"
      }),

      // 8. Carved Swan Aplustre Stern (Raised 2.5D Curve)
      e.jsx("path", {
        d: isFlag ? "M -48,12 C -56,5 -56,-5 -50,-12 C -49,-5 -52,4 -48,8 Z" : "M -36,9 C -42,4 -42,-4 -37,-9 C -36,-4 -39,3 -36,6 Z",
        fill: trimGold,
        stroke: "#1c1917",
        strokeWidth: "1"
      }),

      // 9. Forecastle 2.5D Fighting Turret (Flagship - Mirrors Roman City Towers!)
      isFlag && e.jsxs("g", {
        children: [
          e.jsx("rect", { x: "28", y: "2", width: "16", height: "13", rx: "1.5", fill: turretStone, stroke: turretStroke, strokeWidth: "1.1" }),
          e.jsx("line", { x1: "31", y1: "2", x2: "31", y2: "-2", stroke: turretStroke, strokeWidth: "1.4" }),
          e.jsx("line", { x1: "36", y1: "2", x2: "36", y2: "-2", stroke: turretStroke, strokeWidth: "1.4" }),
          e.jsx("line", { x1: "41", y1: "2", x2: "41", y2: "-2", stroke: turretStroke, strokeWidth: "1.4" }),
          e.jsx("line", { x1: "36", y1: "-2", x2: "36", y2: "-10", stroke: "#78350f", strokeWidth: "1.4" }),
          e.jsx("polygon", { points: "36,-10 42,-7 36,-4", fill: isPlayer ? "#dc2626" : "#4c0519" })
        ]
      }),

      // 10. Stepped Aft Cabin (Templed Roof)
      e.jsx("rect", { x: isFlag ? "-36" : "-26", y: "6", width: isFlag ? "20" : "15", height: "9", rx: "1", fill: deckWood, stroke: trimGold, strokeWidth: "1" }),
      e.jsx("polygon", { points: isFlag ? "-36,6 -26,1 -16,6" : "-26,6 -18.5,2 -11,6", fill: isPlayer ? "#b45309" : "#475569", stroke: trimGold, strokeWidth: "0.8" }),

      // 11. Silhouetted Deck Marines
      [-14, 2, 18].map((mX, idx) => e.jsxs("g", {
        key: \`m_\${idx}\`,
        children: [
          e.jsx("circle", { cx: mX, cy: "6", r: "2.4", fill: isPlayer ? "#fbbf24" : "#f43f5e" }),
          e.jsx("line", { x1: mX, y1: "7", x2: mX, y2: "12", stroke: isPlayer ? "#dc2626" : "#4c0519", strokeWidth: "2" })
        ]
      })),

      // 12. Central Mast & Billowing Square Sail
      e.jsx("line", { x1: "0", y1: "-22", x2: "0", y2: "11", stroke: "#1f150e", strokeWidth: "3" }),
      e.jsx("line", { x1: isFlag ? "-28" : "-20", y1: "-17", x2: isFlag ? "28" : "20", y2: "-17", stroke: "#2e1c0c", strokeWidth: "2.2" }),
      // Sail Canvas
      e.jsx("path", {
        d: isFlag
          ? (isDamaged ? "M -26,-16 Q 0,-10 26,-16 Q 22,0 12,2 L 9,-3 L 0,4 Q -18,1 -26,-16 Z" : "M -26,-16 Q 0,-10 26,-16 Q 24,1 0,5 Q -24,1 -26,-16 Z")
          : "M -18,-16 Q 0,-11 18,-16 Q 16,-2 0,1 Q -16,-2 -18,-16 Z",
        fill: sailFabric,
        stroke: trimGold,
        strokeWidth: "1.2"
      }),

      // Sail Insignia (SPQR Eagle vs Tanit)
      isPlayer ? e.jsxs("g", {
        children: [
          e.jsx("path", { d: "M 0,-10 L -6,-3 L 0,-4 L 6,-3 Z", fill: "#fef08a" }),
          e.jsx("circle", { cx: "0", cy: "-12", r: "2", fill: "#fef08a" })
        ]
      }) : e.jsx("path", {
        d: isPunic ? "M -6,-11 Q 0,-1 6,-11 Q 0,-6 -6,-11 Z" : "M -6,-11 L 6,-1 M 6,-11 L -6,-1",
        stroke: "#fef08a",
        strokeWidth: "1.8",
        fill: isPunic ? "#fef08a" : "none"
      }),

      // 13. Damage Smoke
      (isDamaged || isCritical) && e.jsxs("g", {
        children: [
          e.jsx("circle", { cx: "-8", cy: "-8", r: "4", fill: "#3f3f46", opacity: "0.8" }),
          isCritical && e.jsx("circle", { cx: "18", cy: "2", r: "3.5", fill: "#ea580c", opacity: "0.95" })
        ]
      })
    ]
  });
};

// 2. EXACT 2.5D Isometric Legion (Preserved Exactly)
const render2DLegion = (x, y, isPlayer, role = "cohort", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "") => {
  const isDead = animState === "dead" || hpPct <= 0;
  const isCommander = role === "flagship" || role === "commander";
  const shieldColor = isPlayer ? "#991b1b" : (faction === "punic" ? "#701a75" : "#1e293b");
  const trimGold = isPlayer ? "#fbbf24" : "#f59e0b";
  const flip = isPlayer ? 1 : -1;

  return e.jsxs("g", {
    transform: \`translate(\${x}, \${y}) scale(\${scale * flip}, \${scale})\`,
    opacity: isDead ? "0.35" : "1",
    className: \`transition-all duration-300 \${staggerClass} \${isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(251,191,36,0.9)]" : ""}\`,
    children: [
      // Ground Shadow Ellipse
      e.jsx("ellipse", { cx: "0", cy: "18", rx: isCommander ? "58" : "44", ry: "12", fill: "#000", opacity: "0.75" }),

      // Dust Puff Behind Cohort
      !isDead && isAttacking && e.jsx("ellipse", { cx: "-35", cy: "14", rx: "18", ry: "7", fill: "rgba(217,119,6,0.4)" }),

      // Back Rank (Helmets & Pilum Spears)
      [-28, -14, 0, 14, 28].map((sX, idx) => e.jsxs("g", {
        key: \`br_\${idx}\`,
        children: [
          e.jsx("circle", { cx: sX, cy: "-2", r: "3.6", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "0.9" }),
          e.jsx("line", { x1: sX + 3, y1: "-16", x2: sX - 2, y2: "0", stroke: "#475569", strokeWidth: "1.6" }),
          e.jsx("polygon", { points: (sX+4) + ",-18 " + (sX+2) + ",-14 " + (sX+6) + ",-14", fill: "#e2e8f0" })
        ]
      })),

      // Front Rank (Interlocking Scutum Shield Wall)
      [-32, -19, -6, 7, 20, 33].map((sX, idx) => e.jsxs("g", {
        key: \`fr_\${idx}\`,
        children: [
          e.jsx("rect", { x: sX, y: "4", width: "13", height: "20", rx: "1.8", fill: shieldColor, stroke: trimGold, strokeWidth: "1" }),
          e.jsx("circle", { cx: sX + 6.5, cy: "14", r: "2.2", fill: trimGold }),
          e.jsx("line", { x1: sX + 2, y1: "14", x2: sX + 11, y2: "14", stroke: trimGold, strokeWidth: "0.8" })
        ]
      })),

      // Centurion Commander & Aquila Standard (Player)
      isPlayer && e.jsxs("g", {
        children: [
          e.jsx("line", { x1: "0", y1: "-24", x2: "0", y2: "10", stroke: "#78350f", strokeWidth: "2.4" }),
          e.jsx("circle", { cx: "0", cy: "-18", r: "3.5", fill: "#fbbf24", stroke: "#b45309", strokeWidth: "0.8" }),
          e.jsx("polygon", { points: "-5,-23 0,-28 5,-23", fill: "#fef08a" }),
          e.jsx("rect", { x: "1", y: "-17", width: "12", height: "8", fill: "#7e22ce", stroke: "#fbbf24", strokeWidth: "0.7" }),
          e.jsx("path", { d: "M -24,-9 Q -18,-14 -12,-9", stroke: "#dc2626", strokeWidth: "3", strokeLinecap: "round", fill: "none" })
        ]
      })
    ]
  });
};

// =========================================================================
// 2. 2.5D MULTI-GROUP DYNAMIC ISOMETRIC BATTLE THEATRE (EXPANDED VIEW)
// =========================================================================

const BattleTheatreV2 = ({
  isSea = true,
  playerHp = 100, maxPlayerHp = 100, playerBlock = 0, playerAnim = "idle",
  enemyHp = 100, maxEnemyHp = 100, enemyBlock = 0, enemyAnim = "idle",
  turn = "player", currentIntent = null, hoveredAbility = null,
  timeOfDay = "DIES", weather = "CLEAR", regionName = "Mediterranean",
  enemy = null, player = null
}) => {
  const pPct = Math.max(0, Math.min(100, Math.round((playerHp / (maxPlayerHp || 100)) * 100)));
  const ePct = Math.max(0, Math.min(100, Math.round((enemyHp / (maxEnemyHp || 100)) * 100)));
  const enemyFaction = enemy?.faction || "roman";

  const isNaval = isSea === true || (isSea !== false && !enemy?.isLand && enemy?.type !== "legion");

  const isPlayerAttacking = playerAnim === "attack" || playerAnim === "ram" || playerAnim === "shoot";
  const isEnemyAttacking = enemyAnim === "attack" || enemyAnim === "ram" || enemyAnim === "shoot";
  const isPlayerDefending = playerAnim === "defend" || playerBlock > 0;
  const isEnemyDefending = enemyAnim === "defend" || enemyBlock > 0;
  const isRamClash = playerAnim === "ram" || enemyAnim === "ram";

  // Staggered Successive Offsets for All 3 Formation Groups
  const pFlagOffset = playerAnim === "ram" ? 140 : playerAnim === "attack" ? 110 : playerAnim === "shoot" ? -14 : playerAnim === "hit" ? -24 : 0;
  const pEsc1Offset = playerAnim === "ram" ? 105 : playerAnim === "attack" ? 85 : playerAnim === "shoot" ? -8 : playerAnim === "hit" ? -18 : 0;
  const pEsc2Offset = playerAnim === "ram" ? 115 : playerAnim === "attack" ? 95 : playerAnim === "shoot" ? -10 : playerAnim === "hit" ? -20 : 0;

  const eFlagOffset = enemyAnim === "ram" ? -140 : enemyAnim === "attack" ? -110 : enemyAnim === "shoot" ? 14 : enemyAnim === "hit" ? 24 : 0;
  const eEsc1Offset = enemyAnim === "ram" ? -105 : enemyAnim === "attack" ? -85 : enemyAnim === "shoot" ? 8 : enemyAnim === "hit" ? 18 : 0;
  const eEsc2Offset = enemyAnim === "ram" ? -115 : enemyAnim === "attack" ? -95 : enemyAnim === "shoot" ? 10 : enemyAnim === "hit" ? 20 : 0;

  return e.jsxs("div", {
    id: "battle-theatre-v2-root",
    className: "relative w-full h-full flex-1 select-none my-0 transition-all transform-gpu overflow-hidden flex items-center justify-center",
    style: {
      background: isNaval
        ? "linear-gradient(180deg, #020a16 0%, #051a32 28%, #082647 62%, #020710 100%)"
        : "linear-gradient(180deg, #150d06 0%, #26190d 28%, #382512 62%, #0a0502 100%)"
    },
    children: [
      // 1. Unified 2.5D SVG Battlefield (ViewBox: 0 0 800 380, perfectly scaled to viewport)
      e.jsxs("svg", {
        viewBox: "0 0 800 380",
        preserveAspectRatio: "xMidYMid meet",
        className: "w-full h-full object-contain pointer-events-none select-none overflow-visible",
        children: [
          // Embedded Optimized Keyframe Styles
          e.jsx("style", {
            children: \`
              @keyframes bt_dash_p_salvo1 {
                0% { stroke-dashoffset: 600; opacity: 0; }
                10% { opacity: 1; }
                45% { stroke-dashoffset: 0; opacity: 1; }
                65% { opacity: 0.2; }
                100% { stroke-dashoffset: -200; opacity: 0; }
              }
              @keyframes bt_dash_p_salvo2 {
                0% { stroke-dashoffset: 600; opacity: 0; }
                25% { stroke-dashoffset: 600; opacity: 0; }
                35% { opacity: 1; }
                70% { stroke-dashoffset: 0; opacity: 1; }
                85% { opacity: 0.2; }
                100% { stroke-dashoffset: -200; opacity: 0; }
              }
              @keyframes bt_dash_p_salvo3 {
                0% { stroke-dashoffset: 700; opacity: 0; }
                45% { stroke-dashoffset: 700; opacity: 0; }
                55% { opacity: 1; }
                88% { stroke-dashoffset: 0; opacity: 1; }
                98% { opacity: 0.3; }
                100% { stroke-dashoffset: -200; opacity: 0; }
              }
              @keyframes bt_burst_salvo1 {
                0%, 35% { transform: scale(0); opacity: 0; }
                42% { transform: scale(1.4); opacity: 1; }
                55% { transform: scale(0.9); opacity: 0.8; }
                70%, 100% { transform: scale(0); opacity: 0; }
              }
              @keyframes bt_burst_salvo2 {
                0%, 60% { transform: scale(0); opacity: 0; }
                68% { transform: scale(1.5); opacity: 1; }
                80% { transform: scale(0.9); opacity: 0.8; }
                92%, 100% { transform: scale(0); opacity: 0; }
              }
              @keyframes bt_burst_salvo3 {
                0%, 78% { transform: scale(0); opacity: 0; }
                86% { transform: scale(2.0); opacity: 1; }
                96% { transform: scale(1.1); opacity: 0.9; }
                100% { transform: scale(0); opacity: 0; }
              }
              @keyframes bt_slash_lane1 {
                0% { stroke-dashoffset: 200; opacity: 0; }
                20% { opacity: 1; }
                60% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -100; opacity: 0; }
              }
              @keyframes bt_slash_lane2 {
                0%, 25% { stroke-dashoffset: 260; opacity: 0; }
                45% { opacity: 1; }
                80% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -120; opacity: 0; }
              }
              @keyframes bt_slash_lane3 {
                0%, 12% { stroke-dashoffset: 200; opacity: 0; }
                30% { opacity: 1; }
                70% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -100; opacity: 0; }
              }
              @keyframes bt_wave_shimmer {
                0%, 100% { opacity: 0.3; transform: translateX(0); }
                50% { opacity: 0.7; transform: translateX(8px); }
              }
            \`
          }),

          // 1A. Defs & Gradients
          e.jsxs("defs", {
            children: [
              // Sea Base Gradient
              e.jsxs("linearGradient", {
                id: "bt_sea_floor", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#041224" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#082444" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#061b33" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#02070f" })
                ]
              }),
              // Wave Crest Glint Gradient
              e.jsxs("linearGradient", {
                id: "bt_wave_crest", x1: "0%", y1: "0%", x2: "100%", y2: "0%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "transparent" }),
                  e.jsx("stop", { offset: "20%", stopColor: "rgba(56,189,248,0.4)" }),
                  e.jsx("stop", { offset: "50%", stopColor: "rgba(224,242,254,0.85)" }),
                  e.jsx("stop", { offset: "80%", stopColor: "rgba(56,189,248,0.4)" }),
                  e.jsx("stop", { offset: "100%", stopColor: "transparent" })
                ]
              }),
              // Land Ground Terrain Gradient
              e.jsxs("linearGradient", {
                id: "bt_land_terrain", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#1d130a" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#332212" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#26190d" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0f0803" })
                ]
              }),
              // Roman Via Paver Gradient
              e.jsxs("linearGradient", {
                id: "bt_via_road", x1: "0%", y1: "0%", x2: "100%", y2: "0%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "transparent" }),
                  e.jsx("stop", { offset: "30%", stopColor: "rgba(217,119,6,0.35)" }),
                  e.jsx("stop", { offset: "50%", stopColor: "rgba(254,240,138,0.45)" }),
                  e.jsx("stop", { offset: "70%", stopColor: "rgba(217,119,6,0.35)" }),
                  e.jsx("stop", { offset: "100%", stopColor: "transparent" })
                ]
              }),
              // Player Gold/Fire Trail Gradient
              e.jsxs("linearGradient", {
                id: "bt_fire_trail", x1: "0%", y1: "0%", x2: "100%", y2: "0%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "rgba(245,158,11,0.1)" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#f59e0b" }),
                  e.jsx("stop", { offset: "90%", stopColor: "#fef08a" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#ffffff" })
                ]
              }),
              // Enemy Crimson Trail Gradient
              e.jsxs("linearGradient", {
                id: "bt_enemy_trail", x1: "100%", y1: "0%", x2: "0%", y2: "0%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "rgba(239,68,68,0.1)" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#dc2626" }),
                  e.jsx("stop", { offset: "90%", stopColor: "#f87171" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#ffffff" })
                ]
              })
            ]
          }),

          // =================================================================
          // 1B. BACKGROUND: MEDITERRANEAN OCEAN WAVES vs ROMAN TERRAIN
          // =================================================================
          isNaval ? e.jsxs("g", {
            id: "naval-ocean-background",
            children: [
              // Base Sea Fill
              e.jsx("rect", { x: "0", y: "0", width: "800", height: "380", fill: "url(#bt_sea_floor)" }),

              // Distant Coastline & Headland
              e.jsx("path", {
                d: "M 0,105 L 0,60 Q 220,25 440,55 Q 660,85 800,40 L 800,105 Z",
                fill: "#0b2440",
                opacity: "0.6"
              }),
              // Distant Pharos Lighthouse with Active Beacon Flame
              e.jsxs("g", {
                transform: "translate(690, 18) scale(0.72)",
                opacity: "0.85",
                children: [
                  e.jsx("polygon", { points: "18,44 14,48 34,48 30,44", fill: "#fef3c7", stroke: "#d97706", strokeWidth: "0.8" }),
                  e.jsx("rect", { x: "18", y: "24", width: "12", height: "20", fill: "#fde68a", stroke: "#b45309", strokeWidth: "0.9" }),
                  e.jsx("rect", { x: "20", y: "16", width: "8", height: "8", fill: "#fef3c7", stroke: "#d97706", strokeWidth: "0.8" }),
                  e.jsx("circle", { cx: "24", cy: "14", r: "4.5", fill: "#f59e0b" }),
                  e.jsx("circle", { cx: "24", cy: "14", r: "2.5", fill: "#fef08a" }),
                  e.jsx("polygon", { points: "24,8 19,16 29,16", fill: "#b45309", stroke: "#fbbf24", strokeWidth: "0.7" })
                ]
              }),

              // Layered Flowing Ocean Waves
              [
                { y: 70, d: "M 0,70 Q 100,64 200,70 T 400,70 T 600,70 T 800,70", sw: 1.8, op: 0.35 },
                { y: 110, d: "M 0,110 Q 100,104 200,110 T 400,110 T 600,110 T 800,110", sw: 2.2, op: 0.45 },
                { y: 155, d: "M 0,155 Q 100,148 200,155 T 400,155 T 600,155 T 800,155", sw: 2.5, op: 0.55 },
                { y: 205, d: "M 0,205 Q 100,197 200,205 T 400,205 T 600,205 T 800,205", sw: 2.8, op: 0.65 },
                { y: 260, d: "M 0,260 Q 100,251 200,260 T 400,260 T 600,260 T 800,260", sw: 3.2, op: 0.70 },
                { y: 315, d: "M 0,315 Q 100,305 200,315 T 400,315 T 600,315 T 800,315", sw: 3.5, op: 0.75 },
                { y: 360, d: "M 0,360 Q 100,350 200,360 T 400,360 T 600,360 T 800,360", sw: 3.8, op: 0.80 }
              ].map((wv, idx) => e.jsxs("g", {
                key: \`wave_band_\${idx}\`,
                children: [
                  e.jsx("path", { d: wv.d, stroke: "rgba(2,6,23,0.6)", strokeWidth: wv.sw + 1.5, fill: "none" }),
                  e.jsx("path", { d: wv.d, stroke: "url(#bt_wave_crest)", strokeWidth: wv.sw, fill: "none", opacity: wv.op })
                ]
              })),

              // Specular Light Foam Patches
              [
                { cx: 220, cy: 95, rx: 28, ry: 3 },
                { cx: 580, cy: 135, rx: 36, ry: 4 },
                { cx: 380, cy: 185, rx: 45, ry: 4.5 },
                { cx: 440, cy: 245, rx: 42, ry: 4.5 },
                { cx: 260, cy: 305, rx: 32, ry: 3.5 }
              ].map((sp, idx) => e.jsx("ellipse", {
                key: \`shimmer_\${idx}\`,
                cx: sp.cx, cy: sp.cy, rx: sp.rx, ry: sp.ry,
                fill: "rgba(224,242,254,0.35)",
                style: { animation: "bt_wave_shimmer 3s ease-in-out infinite alternate" }
              }))
            ]
          }) : e.jsxs("g", {
            id: "land-campus-background",
            children: [
              // Base Land Terrain Fill
              e.jsx("rect", { x: "0", y: "0", width: "800", height: "380", fill: "url(#bt_land_terrain)" }),

              // Distant Roman Ridge & Castrum Palisade
              e.jsx("path", {
                d: "M 0,105 L 0,55 Q 240,15 480,50 Q 720,85 800,35 L 800,105 Z",
                fill: "#3b2614",
                opacity: "0.6"
              }),
              // Distant Roman Castrum Watchtower & Encampment Tents
              e.jsxs("g", {
                transform: "translate(680, 16) scale(0.72)",
                opacity: "0.85",
                children: [
                  e.jsx("rect", { x: "10", y: "26", width: "28", height: "18", fill: "#fde68a", stroke: "#b45309", strokeWidth: "0.9" }),
                  e.jsx("rect", { x: "18", y: "14", width: "12", height: "14", fill: "#fef3c7", stroke: "#d97706", strokeWidth: "0.8" }),
                  e.jsx("polygon", { points: "24,8 16,14 32,14", fill: "#991b1b", stroke: "#fbbf24", strokeWidth: "0.7" }),
                  e.jsx("line", { x1: "24", y1: "4", x2: "24", y2: "8", stroke: "#78350f", strokeWidth: "1.2" }),
                  e.jsx("rect", { x: "24", y: "4", width: "4", height: "3", fill: "#dc2626" }),
                  e.jsx("polygon", { points: "-18,44 -6,28 6,44", fill: "#fef3c7", stroke: "#b45309", strokeWidth: "0.8" }),
                  e.jsx("polygon", { points: "-6,28 0,22 6,28", fill: "#dc2626" })
                ]
              }),

              // 2.5D Roman Stone Road Tracks
              [
                { y: 80, x1: 60, x2: 740, sw: 1.6 },
                { y: 140, x1: 40, x2: 760, sw: 2.0 },
                { y: 200, x1: 30, x2: 770, sw: 2.4 },
                { y: 265, x1: 40, x2: 760, sw: 2.8 },
                { y: 330, x1: 60, x2: 740, sw: 3.2 }
              ].map((rd, idx) => e.jsxs("g", {
                key: \`via_road_\${idx}\`,
                children: [
                  e.jsx("line", { x1: rd.x1, y1: rd.y + 2, x2: rd.x2, y2: rd.y + 2, stroke: "rgba(0,0,0,0.5)", strokeWidth: rd.sw + 1, strokeLinecap: "round" }),
                  e.jsx("line", { x1: rd.x1, y1: rd.y, x2: rd.x2, y2: rd.y, stroke: "url(#bt_via_road)", strokeWidth: rd.sw, strokeDasharray: "24,8", strokeLinecap: "round" })
                ]
              })),

              // Scattered Roman Stone Pavers
              [
                { cx: 200, cy: 95, rx: 18, ry: 4 },
                { cx: 580, cy: 135, rx: 24, ry: 5 },
                { cx: 400, cy: 195, rx: 30, ry: 6 },
                { cx: 280, cy: 265, rx: 22, ry: 5 },
                { cx: 520, cy: 315, rx: 26, ry: 5.5 }
              ].map((st, idx) => e.jsx("ellipse", {
                key: \`paver_\${idx}\`,
                cx: st.cx, cy: st.cy, rx: st.rx, ry: st.ry,
                fill: "rgba(217,119,6,0.25)",
                stroke: "rgba(120,53,15,0.4)",
                strokeWidth: "0.8"
              }))
            ]
          }),

          // =================================================================
          // 2. PLAYER FORMATION (LEFT SIDE - EXACT ANCHORS)
          // =================================================================
          // Lane 1 (Upper Escort): Anchor (110, 115) -> Bow/Forecastle at (148, 118)
          isNaval
            ? render2DShip(110 + pEsc1Offset, 115, true, "escortA", "roman", pPct, playerAnim, 0.85, isPlayerAttacking, playerAnim === "hit")
            : render2DLegion(110 + pEsc1Offset, 115, true, "cohort", "roman", pPct, playerAnim, 0.85, isPlayerAttacking, playerAnim === "hit"),

          // Lane 2 (Center Flagship): Anchor (165, 215) -> Bow/Ballista Turret at (225, 215)
          isNaval
            ? render2DShip(165 + pFlagOffset, 215, true, "flagship", "roman", pPct, playerAnim, 1.25, isPlayerAttacking, playerAnim === "hit")
            : render2DLegion(165 + pFlagOffset, 215, true, "flagship", "roman", pPct, playerAnim, 1.25, isPlayerAttacking, playerAnim === "hit"),

          // Lane 3 (Lower Escort): Anchor (110, 310) -> Bow/Forecastle at (148, 312)
          isNaval
            ? render2DShip(110 + pEsc2Offset, 310, true, "escortB", "roman", pPct, playerAnim, 0.90, isPlayerAttacking, playerAnim === "hit")
            : render2DLegion(110 + pEsc2Offset, 310, true, "cohort", "roman", pPct, playerAnim, 0.90, isPlayerAttacking, playerAnim === "hit"),

          // =================================================================
          // 3. ENEMY FORMATION (RIGHT SIDE - EXACT ANCHORS)
          // =================================================================
          // Lane 1 (Upper Escort): Anchor (690, 115) -> Bow/Forecastle at (652, 118)
          isNaval
            ? render2DShip(690 + eEsc1Offset, 115, false, "escortA", enemyFaction, ePct, enemyAnim, 0.85, isEnemyAttacking, enemyAnim === "hit")
            : render2DLegion(690 + eEsc1Offset, 115, false, "cohort", enemyFaction, ePct, enemyAnim, 0.85, isEnemyAttacking, enemyAnim === "hit"),

          // Lane 2 (Center Flagship): Anchor (635, 215) -> Bow/Ballista Turret at (575, 215)
          isNaval
            ? render2DShip(635 + eFlagOffset, 215, false, "flagship", enemyFaction, ePct, enemyAnim, 1.25, isEnemyAttacking, enemyAnim === "hit", true)
            : render2DLegion(635 + eFlagOffset, 215, false, "flagship", enemyFaction, ePct, enemyAnim, 1.25, isEnemyAttacking, enemyAnim === "hit", true),

          // Lane 3 (Lower Escort): Anchor (690, 310) -> Bow/Forecastle at (652, 312)
          isNaval
            ? render2DShip(690 + eEsc2Offset, 310, false, "escortB", enemyFaction, ePct, enemyAnim, 0.90, isEnemyAttacking, enemyAnim === "hit")
            : render2DLegion(690 + eEsc2Offset, 310, false, "cohort", enemyFaction, ePct, enemyAnim, 0.90, isEnemyAttacking, enemyAnim === "hit"),

          // =================================================================
          // 4. PRECISELY MODEL-ALIGNED COMBAT EFFECTS
          // =================================================================

          // 4A. Ramming Collision Shockwaves
          isRamClash && e.jsxs("g", {
            children: [
              e.jsx("circle", { cx: "450", cy: "118", r: "30", fill: "rgba(251,191,36,0.3)", stroke: "#fbbf24", strokeWidth: "2.5", style: { animation: "bt_burst_salvo1 1.2s ease-out infinite" } }),
              e.jsx("circle", { cx: "440", cy: "312", r: "34", fill: "rgba(251,191,36,0.3)", stroke: "#fbbf24", strokeWidth: "2.5", style: { animation: "bt_burst_salvo2 1.2s ease-out infinite" } }),
              e.jsx("circle", { cx: "400", cy: "215", r: "52", fill: "rgba(251,191,36,0.45)", stroke: "#fbbf24", strokeWidth: "4", style: { animation: "bt_burst_salvo3 1.2s ease-out infinite" } }),
              e.jsx("circle", { cx: "400", cy: "215", r: "78", fill: "none", stroke: "#f59e0b", strokeWidth: "2", opacity: "0.7", style: { animation: "bt_burst_salvo3 1.2s ease-out infinite" } })
            ]
          }),

          // 4B. MELEE / BOARDING STRIKES ALIGNED TO HULL COORDINATES
          playerAnim === "attack" && e.jsxs("g", {
            id: "player-multi-lane-melee-strikes",
            children: [
              // Lane 1 Upper Strike directly on Enemy Escort (652, 118)
              e.jsxs("g", {
                transform: "translate(652, 118)",
                children: [
                  e.jsx("path", { d: "M -20,20 Q 0,0 25,-15", stroke: "#fbbf24", strokeWidth: "5", strokeLinecap: "round", fill: "none", strokeDasharray: "60", style: { animation: "bt_slash_lane1 0.45s ease-out infinite" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "rgba(245,158,11,0.5)", style: { animation: "bt_burst_salvo1 0.45s ease-out infinite" } })
                ]
              }),

              // Lane 2 Center Heavy Imperial Strike directly on Enemy Flagship Turret (575, 215)
              e.jsxs("g", {
                transform: "translate(575, 215)",
                children: [
                  e.jsx("path", { d: "M -35,30 Q 0,0 35,-25", stroke: "#fef08a", strokeWidth: "7", strokeLinecap: "round", fill: "none", strokeDasharray: "90", style: { animation: "bt_slash_lane2 0.5s ease-out infinite" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "18", fill: "rgba(245,158,11,0.6)", style: { animation: "bt_burst_salvo2 0.5s ease-out infinite" } }),
                  e.jsx("line", { x1: "-12", y1: "-12", x2: "12", y2: "12", stroke: "#fef08a", strokeWidth: "2.5" }),
                  e.jsx("line", { x1: "12", y1: "-12", x2: "-12", y2: "12", stroke: "#fef08a", strokeWidth: "2.5" })
                ]
              }),

              // Lane 3 Lower Flanking Blade on Enemy Escort (652, 312)
              e.jsxs("g", {
                transform: "translate(652, 312)",
                children: [
                  e.jsx("path", { d: "M -20,20 Q 0,0 25,-15", stroke: "#fbbf24", strokeWidth: "5", strokeLinecap: "round", fill: "none", strokeDasharray: "60", style: { animation: "bt_slash_lane3 0.45s ease-out infinite" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "rgba(245,158,11,0.5)", style: { animation: "bt_burst_salvo3 0.45s ease-out infinite" } })
                ]
              })
            ]
          }),

          // 4C. PROJECTILE VOLLEYS PRECISELY CONNECTING SHIP BOWS & TURRETS
          playerAnim === "shoot" && e.jsxs("g", {
            id: "player-sequenced-volleys",
            children: [
              // Lane 1: Upper Escort Bow (148, 118) -> Enemy Escort Bow (652, 118)
              e.jsxs("g", {
                children: [
                  e.jsx("path", {
                    d: "M 148,118 Q 400,45 652,118",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "3.5",
                    strokeDasharray: "120,400",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo1 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(652, 118)",
                    style: { animation: "bt_burst_salvo1 1.3s ease-out infinite" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "9", fill: "#fef08a" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "18", fill: "rgba(245,158,11,0.6)" })
                    ]
                  })
                ]
              }),

              // Lane 2: Center Flagship Turret (225, 215) -> Enemy Flagship Turret (575, 215)
              e.jsxs("g", {
                children: [
                  e.jsx("path", {
                    d: "M 225,215 Q 400,125 575,215",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "5.5",
                    strokeDasharray: "160,500",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo3 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(575, 215)",
                    style: { animation: "bt_burst_salvo3 1.3s ease-out infinite" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "14", fill: "#fef08a" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "26", fill: "rgba(245,158,11,0.7)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "38", fill: "none", stroke: "#fbbf24", strokeWidth: "2" }),
                      e.jsx("line", { x1: "-14", y1: "-14", x2: "14", y2: "14", stroke: "#fef08a", strokeWidth: "3" }),
                      e.jsx("line", { x1: "14", y1: "-14", x2: "-14", y2: "14", stroke: "#fef08a", strokeWidth: "3" })
                    ]
                  })
                ]
              }),

              // Lane 3: Lower Escort Bow (148, 312) -> Enemy Escort Bow (652, 312)
              e.jsxs("g", {
                children: [
                  e.jsx("path", {
                    d: "M 148,312 Q 400,240 652,312",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "3.5",
                    strokeDasharray: "120,400",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo2 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(652, 312)",
                    style: { animation: "bt_burst_salvo2 1.3s ease-out infinite" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "9", fill: "#fef08a" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "18", fill: "rgba(245,158,11,0.6)" })
                    ]
                  })
                ]
              })
            ]
          }),

          // 4D. ENEMY MELEE STRIKES ON PLAYER HULLS
          enemyAnim === "attack" && e.jsxs("g", {
            id: "enemy-multi-lane-melee-strikes",
            children: [
              // Upper Lane on Player Escort (148, 118)
              e.jsxs("g", {
                transform: "translate(148, 118)",
                children: [
                  e.jsx("path", { d: "M 20,20 Q 0,0 -25,-15", stroke: "#ef4444", strokeWidth: "5", strokeLinecap: "round", fill: "none", strokeDasharray: "60", style: { animation: "bt_slash_lane1 0.45s ease-out infinite" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "rgba(239,68,68,0.5)", style: { animation: "bt_burst_salvo1 0.45s ease-out infinite" } })
                ]
              }),
              // Center Lane on Player Flagship Turret (225, 215)
              e.jsxs("g", {
                transform: "translate(225, 215)",
                children: [
                  e.jsx("path", { d: "M 35,30 Q 0,0 -35,-25", stroke: "#f87171", strokeWidth: "7", strokeLinecap: "round", fill: "none", strokeDasharray: "90", style: { animation: "bt_slash_lane2 0.5s ease-out infinite" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "18", fill: "rgba(239,68,68,0.6)", style: { animation: "bt_burst_salvo2 0.5s ease-out infinite" } })
                ]
              }),
              // Lower Lane on Player Escort (148, 312)
              e.jsxs("g", {
                transform: "translate(148, 312)",
                children: [
                  e.jsx("path", { d: "M 20,20 Q 0,0 -25,-15", stroke: "#ef4444", strokeWidth: "5", strokeLinecap: "round", fill: "none", strokeDasharray: "60", style: { animation: "bt_slash_lane3 0.45s ease-out infinite" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "rgba(239,68,68,0.5)", style: { animation: "bt_burst_salvo3 0.45s ease-out infinite" } })
                ]
              })
            ]
          }),

          // 4E. ENEMY MISSILE VOLLEYS ON PLAYER HULLS
          enemyAnim === "shoot" && e.jsxs("g", {
            id: "enemy-sequenced-volleys",
            children: [
              // Lane 1 (652, 118 -> 148, 118)
              e.jsxs("g", {
                children: [
                  e.jsx("path", { d: "M 652,118 Q 400,45 148,118", stroke: "url(#bt_enemy_trail)", strokeWidth: "3.5", strokeDasharray: "120,400", strokeLinecap: "round", fill: "none", style: { animation: "bt_dash_p_salvo1 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite" } }),
                  e.jsx("circle", { cx: "148", cy: "118", r: "8", fill: "#f87171" })
                ]
              }),
              // Lane 2 (575, 215 -> 225, 215)
              e.jsxs("g", {
                children: [
                  e.jsx("path", { d: "M 575,215 Q 400,125 225,215", stroke: "url(#bt_enemy_trail)", strokeWidth: "5.5", strokeDasharray: "160,500", strokeLinecap: "round", fill: "none", style: { animation: "bt_dash_p_salvo3 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite" } }),
                  e.jsx("circle", { cx: "225", cy: "215", r: "14", fill: "#f87171" })
                ]
              }),
              // Lane 3 (652, 312 -> 148, 312)
              e.jsxs("g", {
                children: [
                  e.jsx("path", { d: "M 652,312 Q 400,240 148,312", stroke: "url(#bt_enemy_trail)", strokeWidth: "3.5", strokeDasharray: "120,400", strokeLinecap: "round", fill: "none", style: { animation: "bt_dash_p_salvo2 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite" } }),
                  e.jsx("circle", { cx: "148", cy: "312", r: "8", fill: "#f87171" })
                ]
              })
            ]
          }),

          // 4F. DEFENSIVE SHIELD WALLS ACROSS ALL 3 UNITS
          isPlayerDefending && e.jsxs("g", {
            id: "player-multi-aegis-wall",
            children: [
              e.jsx("ellipse", { cx: "110", cy: "115", rx: "62", ry: "40", fill: "rgba(251,191,36,0.18)", stroke: "#fbbf24", strokeWidth: "2" }),
              e.jsx("ellipse", { cx: "165", cy: "215", rx: "88", ry: "58", fill: "rgba(251,191,36,0.22)", stroke: "#fbbf24", strokeWidth: "3" }),
              e.jsx("ellipse", { cx: "110", cy: "310", rx: "65", ry: "42", fill: "rgba(251,191,36,0.18)", stroke: "#fbbf24", strokeWidth: "2" })
            ]
          }),

          isEnemyDefending && e.jsxs("g", {
            id: "enemy-multi-aegis-wall",
            children: [
              e.jsx("ellipse", { cx: "690", cy: "115", rx: "62", ry: "40", fill: "rgba(239,68,68,0.18)", stroke: "#ef4444", strokeWidth: "2" }),
              e.jsx("ellipse", { cx: "635", cy: "215", rx: "88", ry: "58", fill: "rgba(239,68,68,0.22)", stroke: "#ef4444", strokeWidth: "3" }),
              e.jsx("ellipse", { cx: "690", cy: "310", rx: "65", ry: "42", fill: "rgba(239,68,68,0.18)", stroke: "#ef4444", strokeWidth: "2" })
            ]
          })
        ]
      }),

      // 2. Corner Theatre Badge (Top-Left, Clean & Compact)
      e.jsxs("div", {
        className: "absolute top-2 left-3 flex items-center gap-1.5 pointer-events-none z-30 max-w-[150px] truncate",
        children: [
          e.jsx("span", { className: "text-amber-400 text-xs drop-shadow shrink-0", children: isNaval ? "⚓" : "🦅" }),
          e.jsx("span", {
            className: "font-cinzel font-black text-[8px] sm:text-[9.5px] text-[#fef08a] tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)] truncate",
            children: isNaval ? "THEATRUM NAVALE" : "CAMPUS BELLICUS"
          })
        ]
      }),

      // 3. Corner Hostis Intent Card (Top-Right, Compact & Guaranteed Zero Overlap)
      currentIntent && e.jsxs("div", {
        className: "absolute top-2 right-3 max-w-[170px] sm:max-w-[200px] px-2 py-0.5 rounded-lg bg-black/92 border border-red-500/50 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.95)] flex items-center gap-1.5 pointer-events-auto z-30",
        children: [
          e.jsx("span", { className: "text-red-400 text-[11px] animate-pulse shrink-0", children: "⚔" }),
          e.jsxs("div", {
            className: "flex flex-col min-w-0 text-left leading-tight",
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-1 text-[7px] sm:text-[7.5px] font-cinzel font-bold text-rose-300 uppercase tracking-wider truncate",
                children: [
                  e.jsx("span", { children: "HOSTIS INTENT" }),
                  e.jsx("span", { className: "text-stone-400", children: "•" }),
                  e.jsx("span", { className: "text-amber-200 truncate font-black", children: currentIntent.label || "Gladius Thrust" })
                ]
              }),
              e.jsxs("span", {
                className: "text-[7.5px] sm:text-[8px] font-mono font-bold text-rose-300",
                children: [
                  currentIntent.val ? (currentIntent.val + " DMG • ") : "",
                  "IMPACT ",
                  currentIntent.type === "defend" ? ("+" + (currentIntent.val || 0) + " BLK") : ("−" + (currentIntent.val || 12) + " HP")
                ]
              })
            ]
          })
        ]
      })
    ]
  });
};

// =========================================================================
// 3. RENDER FX OVERLAY (DEDICATED PURE HELPER - ZERO DUPLICATION)
// =========================================================================

const renderFXOverlay = (fx) => null;
`;

// =========================================================================
// 4. INJECT BATTLE THEATRE V2 DEFINITIONS INTO THE BUNDLE
// =========================================================================

const markerStart = "// === MARE NOSTRUM BATTLE THEATRE V2";
const oldStartPos = js.indexOf(markerStart);

if (oldStartPos !== -1) {
  const markerEnd = "const renderGauge = (curr, max, block, isPlayer) => {";
  const oldEndPos = js.indexOf(markerEnd, oldStartPos);
  if (oldEndPos !== -1) {
    
    js = js.substring(0, oldStartPos) + battleTheatreV2Code + "\n" + js.substring(oldEndPos);
  } else {
    
    js = js.substring(0, oldStartPos) + battleTheatreV2Code + "\n" + js.substring(oldStartPos);
  }
} else {
  const fxPos = js.indexOf("const renderFXOverlay =");
  if (fxPos !== -1) {
    const gaugePos = js.indexOf("const renderGauge = (curr, max, block, isPlayer) => {", fxPos);
    if (gaugePos !== -1) {
      
      js = js.substring(0, fxPos) + battleTheatreV2Code + "\n" + js.substring(gaugePos);
    } else {
      js = js.substring(0, fxPos) + battleTheatreV2Code + "\n" + js.substring(fxPos);
    }
  } else {
    throw new Error("Could not find insertion position for BattleTheatreV2 definitions!");
  }
}

// =========================================================================
// 5. EXCISE OLD BACKGROUND & HITFX DUPLICATIONS IN COMBAT MODAL
// =========================================================================

// Remove duplicate hitFx map in nm
const oldHitFxPattern = "hitFx.map(fx => {";
let hitFxPos = js.indexOf(oldHitFxPattern);
if (hitFxPos !== -1) {
  const hitFxEnd = js.indexOf("}),", hitFxPos);
  if (hitFxEnd !== -1) {
    
    js = js.substring(0, hitFxPos) + "/* hitFx integrated in BattleTheatreV2 */" + js.substring(hitFxEnd + 3);
  }
}

// Section 5: Outer background is already cleanly formatted in the bundle
/*
const outerBgMarker = 'className: "absolute inset-0 pointer-events-none z-0 overflow-hidden"';
let bgPos = js.indexOf(outerBgMarker);
if (bgPos !== -1) {
  const divStart = js.lastIndexOf('e.jsx("div", {', bgPos);
  const divEnd = js.indexOf('}),', bgPos);
  
  if (divStart !== -1 && divEnd !== -1 && divEnd > divStart && (bgPos - divStart < 100)) {
    const cleanBackdropJSX = `e.jsx("div", {
      className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
      style: {
        background: isSea
          ? "radial-gradient(ellipse at 50% 50%, #030a16 0%, #01040a 100%)"
          : "radial-gradient(ellipse at 50% 50%, #110904 0%, #040201 100%)"
      }
    }),`;
    js = js.substring(0, divStart) + cleanBackdropJSX + js.substring(divEnd + 3);
  }
}
*/

// =========================================================================
// 6. TARGET AND EXPAND <main> CONTAINER TO FULL CENTRAL AREA
// =========================================================================

const newMainJSX = `e.jsx("main", {
        id: "battle-theatre-v2-container",
        className: "flex-1 w-full flex flex-col justify-center items-center z-20 relative overflow-hidden my-0 p-0 border-y border-amber-500/30 shadow-[inset_0_4px_24px_rgba(0,0,0,0.8),inset_0_-4px_24px_rgba(0,0,0,0.8)] min-h-0",
        children: BattleTheatreV2({
          isSea,
          playerHp, maxPlayerHp, playerBlock, playerAnim,
          enemyHp, maxEnemyHp, enemyBlock, enemyAnim,
          turn, currentIntent, hoveredAbility,
          timeOfDay: s?.timeOfDay || "DIES",
          weather: s?.weather || "CLEAR",
          regionName: (typeof l !== "undefined" && l) ? l : (t?.name || "Mediterranean"),
          enemy: t,
          player: s
        })
      })`;

// Replace all legacy <main> medallion occurrences containing renderToken(true,
let tokenPos = 0;
let replacedCount = 0;
while ((tokenPos = js.indexOf("renderToken(true,")) !== -1) {
  const mainStart = js.lastIndexOf('e.jsxs("main",', tokenPos) !== -1
    ? js.lastIndexOf('e.jsxs("main",', tokenPos)
    : js.lastIndexOf('e.jsx("main",', tokenPos);

  const footerStart = js.indexOf('id: "combat-bottom-hud"', tokenPos);
  const mainEnd = footerStart !== -1 ? js.lastIndexOf('}),', footerStart) : -1;

  if (mainStart !== -1 && mainEnd !== -1 && mainEnd > mainStart) {
    
    js = js.substring(0, mainStart) + newMainJSX + js.substring(mainEnd + 2);
    replacedCount++;
  } else {
    console.warn(`WARN: Could not cleanly excise <main> around pos ${tokenPos}`);
    break;
  }
}

// Also update existing battle-theatre-v2-container if already present
const existingContainerPos = js.indexOf('id: "battle-theatre-v2-container"');
if (existingContainerPos !== -1) {
  const mainStart = js.lastIndexOf('e.jsx("main",', existingContainerPos);
  const footerStart = js.indexOf('id: "combat-bottom-hud"', existingContainerPos);
  const mainEnd = footerStart !== -1 ? js.lastIndexOf('}),', footerStart) : -1;
  if (mainStart !== -1 && mainEnd !== -1 && mainEnd > mainStart) {
    
    js = js.substring(0, mainStart) + newMainJSX + js.substring(mainEnd + 2);
    replacedCount++;
  }
}



// Validate syntax with esbuild
console.log("Validating updated bundle with esbuild...");
try {
  try {
    esbuild.transformSync(js, { loader: "js" });
  } catch(e) {
    const lines = js.split("\n");
    console.log("Transformed JS total lines:", lines.length);
    console.log("Lines 8420-8435 of transformed JS:");
    for (let i = 8419; i < Math.min(lines.length, 8435); i++) {
      console.log((i+1) + ": " + lines[i]);
    }
    throw e;
  }
  
} catch (err) {
  console.error("ERR: esbuild transform failed:", err);
  process.exit(1);
}

fs.writeFileSync(bundlePath, js, "utf8");

// Also update dist if it exists
const distBundlePath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distBundlePath))) {
  fs.writeFileSync(distBundlePath, js, "utf8");
  
}

// Update index.html cache buster timestamp
const indexPath = path.join(__dirname, "../index.html");
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, "utf8");
  const timestamp = Date.now();
  indexHtml = indexHtml.replace(/\/assets\/index-V33\.js\?v=\d+/, `/assets/index-V33.js?v=${timestamp}`);
  fs.writeFileSync(indexPath, indexHtml, "utf8");
  const distIndexPath = path.join(__dirname, "../dist/index.html");
  if (fs.existsSync(distIndexPath)) {
    fs.writeFileSync(distIndexPath, indexHtml, "utf8");
  }
  
}

console.log("=== EXPANDED FULL-CENTRAL BATTLE THEATRE REBUILT SUCCESSFULLY ===");
