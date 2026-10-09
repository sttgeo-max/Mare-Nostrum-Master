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

// 1. EXACT 2.5D Isometric Warship (with Full Cinematic 2.5D Death Animation)
const render2DShip = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "") => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
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
  const listY = isDead ? 18 : 0;
  const flip = isPlayer ? 1 : -1;

  return e.jsxs("g", {
    transform: \`translate(\${x}, \${y + listY}) scale(\${scale * flip}, \${scale})\`,
    opacity: isDead ? "0.85" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? (isFlag ? "bt_sinking_ship_pitch 2.6s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "bt_sinking_ship_pitch 2.1s cubic-bezier(0.25, 1, 0.5, 1) forwards") : "none"
    },
    className: "transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // Sinking Vortex Whirlpool & Foam for Dying Vessel
      isDead && e.jsxs("g", {
        id: "death-whirlpool-vortex",
        children: [
          e.jsx("ellipse", { cx: "0", cy: "28", rx: isFlag ? "90" : "68", ry: isFlag ? "26" : "18", fill: "none", stroke: "rgba(224,242,254,0.85)", strokeWidth: "3.5", strokeDasharray: "16 8", style: { animation: "bt_vortex_whirlpool 3s linear infinite" } }),
          e.jsx("ellipse", { cx: "0", cy: "28", rx: isFlag ? "60" : "44", ry: isFlag ? "16" : "11", fill: "rgba(2,6,23,0.9)", stroke: "rgba(56,189,248,0.85)", strokeWidth: "2" }),
          [-30, -14, 0, 18, 32].map((bx, bIdx) => e.jsx("circle", {
            key: "bub_" + bIdx,
            cx: bx,
            cy: 28 + (bIdx % 2 === 0 ? 3 : -3),
            r: 2.2 + (bIdx % 3),
            fill: "rgba(224,242,254,0.95)",
            stroke: "rgba(56,189,248,0.8)",
            strokeWidth: "0.8",
            style: { animation: "bt_bubble_rise " + (1.1 + bIdx * 0.22) + "s ease-out infinite" }
          }))
        ]
      }),
      // Hit / Attack Glow Ring
      isHit && e.jsx("ellipse", { cx: "0", cy: "10", rx: isFlag ? "80" : "60", ry: "22", fill: "rgba(239,68,68,0.5)" }),
      isAttacking && e.jsx("ellipse", { cx: "0", cy: "10", rx: isFlag ? "80" : "60", ry: "22", fill: "rgba(251,191,36,0.4)" }),
      // 1. Water Keel Shadow Ellipse
      e.jsx("ellipse", { cx: "0", cy: "22", rx: isFlag ? "72" : "54", ry: isFlag ? "16" : "12", fill: "#020617", opacity: "0.85" }),
      
      // 2. Trailing Stern V-Wake Foam
      !isDead && e.jsx("path", {
        d: isFlag ? "M -55,18 Q -85,22 -110,26 Q -85,16 -55,14 Z" : "M -40,15 Q -65,18 -85,22 Q -65,13 -40,12 Z",
        fill: "rgba(224,242,254,0.65)"
      }),
      // Bow Splash Wave
      !isDead && e.jsx("ellipse", { cx: isFlag ? "64" : "48", cy: "19", rx: "8", ry: "4", fill: "rgba(255,255,255,0.75)" }),

      // 3. 2.5D Dipping Oar Banks with Oar Sheer on Damage
      [-42, -30, -18, -6, 6, 18, 30, 42].map((oarX, idx) => {
        const isBroken = (isDamaged && (idx === 2 || idx === 5)) || (isCritical && (idx % 2 === 1)) || isDead;
        return e.jsxs("g", {
          key: \`oar_\${idx}\`,
          children: [
            // Starboard (Upper) Oar
            isBroken
              ? e.jsx("line", { x1: oarX, y1: "6", x2: oarX - 4, y2: "2", stroke: "#78350f", strokeWidth: "1.6", strokeLinecap: "round" })
              : e.jsx("line", { x1: oarX, y1: "6", x2: oarX - 10, y2: "-4", stroke: "#1c1917", strokeWidth: "1.6", strokeLinecap: "round" }),
            !isBroken && e.jsx("ellipse", { cx: oarX - 10, cy: "-4", rx: "1.6", ry: "1", fill: "#f8fafc", opacity: "0.85" }),
            // Port (Lower) Oar
            isBroken
              ? e.jsxs("g", {
                  children: [
                    e.jsx("line", { x1: oarX + 3, y1: "16", x2: oarX, y2: "20", stroke: "#78350f", strokeWidth: "1.8", strokeLinecap: "round" }),
                    e.jsx("line", { x1: oarX - 5, y1: "26", x2: oarX - 12, y2: "31", stroke: "#451a03", strokeWidth: "1.5", opacity: "0.75" }),
                    e.jsx("ellipse", { cx: oarX - 12, cy: "31", rx: "2", ry: "1.2", fill: "#f8fafc", opacity: "0.6" })
                  ]
                })
              : e.jsx("line", { x1: oarX + 3, y1: "16", x2: oarX - 7, y2: "29", stroke: "#1c1917", strokeWidth: "1.8", strokeLinecap: "round" }),
            !isBroken && e.jsx("ellipse", { cx: oarX - 7, cy: "29", rx: "1.8", ry: "1.2", fill: "#f8fafc", opacity: "0.9" })
          ]
        });
      }),

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
      !isDead && [-14, 2, 18].map((mX, idx) => e.jsxs("g", {
        key: \`m_\${idx}\`,
        children: [
          e.jsx("circle", { cx: mX, cy: "6", r: "2.4", fill: isPlayer ? "#fbbf24" : "#f43f5e" }),
          e.jsx("line", { x1: mX, y1: "7", x2: mX, y2: "12", stroke: isPlayer ? "#dc2626" : "#4c0519", strokeWidth: "2" })
        ]
      })),

      // 12. Central Mast & Billowing Square Sail
      !isDead && e.jsx("line", { x1: "0", y1: "-22", x2: "0", y2: "11", stroke: "#1f150e", strokeWidth: "3" }),
      !isDead && e.jsx("line", { x1: isFlag ? "-28" : "-20", y1: "-17", x2: isFlag ? "28" : "20", y2: "-17", stroke: "#2e1c0c", strokeWidth: "2.2" }),
      // Sail Canvas
      !isDead && e.jsx("path", {
        d: isFlag
          ? (isDamaged ? "M -26,-16 Q 0,-10 26,-16 Q 22,0 12,2 L 9,-3 L 0,4 Q -18,1 -26,-16 Z" : "M -26,-16 Q 0,-10 26,-16 Q 24,1 0,5 Q -24,1 -26,-16 Z")
          : "M -18,-16 Q 0,-11 18,-16 Q 16,-2 0,1 Q -16,-2 -18,-16 Z",
        fill: sailFabric,
        stroke: trimGold,
        strokeWidth: "1.2"
      }),

      // Sail Insignia (SPQR Eagle vs Tanit)
      !isDead && (isPlayer ? e.jsxs("g", {
        children: [
          e.jsx("path", { d: "M 0,-10 L -6,-3 L 0,-4 L 6,-3 Z", fill: "#fef08a" }),
          e.jsx("circle", { cx: "0", cy: "-12", r: "2", fill: "#fef08a" })
        ]
      }) : e.jsx("path", {
        d: isPunic ? "M -6,-11 Q 0,-1 6,-11 Q 0,-6 -6,-11 Z" : "M -6,-11 L 6,-1 M 6,-11 L -6,-1",
        stroke: "#fef08a",
        strokeWidth: "1.8",
        fill: isPunic ? "#fef08a" : "none"
      })),

      // 13. Dynamic Visible Damage & Hit Impact Debris
      isHit && e.jsxs("g", {
        children: [
          // Flying Timber Splinters & Blood Spray
          e.jsx("polygon", { points: "-8,4 -18,-6 -12,8", fill: "#f59e0b" }),
          e.jsx("polygon", { points: "12,2 24,-8 18,10", fill: "#78350f" }),
          e.jsx("polygon", { points: "4,-6 10,-18 2, -2", fill: "#dc2626" }),
          e.jsx("circle", { cx: "-12", cy: "-4", r: "3", fill: "#dc2626" }),
          e.jsx("circle", { cx: "16", cy: "-8", r: "2.5", fill: "#991b1b" })
        ]
      }),
      (isDamaged || isCritical) && e.jsxs("g", {
        children: [
          // Hull Fractures & Gash
          e.jsx("path", { d: "M -20,10 L -12,14 L -5,8 L 4,12", stroke: "#0f172a", strokeWidth: "1.8", fill: "none" }),
          e.jsx("circle", { cx: "-8", cy: "-8", r: "5", fill: "#27272a", opacity: "0.85" }),
          e.jsx("circle", { cx: "-4", cy: "-16", r: "7", fill: "#18181b", opacity: "0.75" }),
          // Embedded arrows & javelins in hull
          e.jsx("line", { x1: "-16", y1: "12", x2: "-26", y2: "6", stroke: "#451a03", strokeWidth: "1.4" }),
          e.jsx("polygon", { points: "-26,6 -29,4 -25,4", fill: "#cbd5e1" }),
          e.jsx("line", { x1: "18", y1: "10", x2: "10", y2: "3", stroke: "#475569", strokeWidth: "1.5" }),
          // Blood splatters on deck
          e.jsx("ellipse", { cx: "-2", cy: "9", rx: "8", ry: "2.5", fill: "rgba(185,28,28,0.85)" }),
          e.jsx("circle", { cx: "6", cy: "10", r: "2", fill: "#991b1b" }),
          // Floating timber planks & splinter shrapnel in water
          e.jsx("polygon", { points: "-35,22 -22,25 -26,20", fill: "#78350f", stroke: "#000", strokeWidth: "0.8" }),
          e.jsx("polygon", { points: "28,20 40,18 35,24", fill: "#b45309", stroke: "#000", strokeWidth: "0.8" }),
          // Critical Damage: Snapped Mast, Active Fires & Rising Smoke
          isCritical && e.jsxs("g", {
            children: [
              // Snapped Mainmast
              e.jsx("line", { x1: "0", y1: "-8", x2: "18", y2: "-24", stroke: "#451a03", strokeWidth: "2.5", strokeDasharray: "8,2" }),
              // Smoke plumes billowing into sky
              e.jsx("ellipse", { cx: "16", cy: "-20", rx: "9", ry: "6", fill: "rgba(30,41,59,0.75)", style: { animation: "bt_smoke_rise 1.5s ease-out infinite" } }),
              e.jsx("ellipse", { cx: "10", cy: "-30", rx: "13", ry: "8", fill: "rgba(15,23,42,0.6)", style: { animation: "bt_smoke_rise 1.8s ease-out infinite" } }),
              // Active Leaping Deck Flames
              e.jsx("polygon", { points: "10,-4 18,-18 26,-2", fill: "#f97316", style: { animation: "bt_flame_flicker 0.5s ease-in-out infinite alternate" } }),
              e.jsx("polygon", { points: "14,-2 19,-14 23,2", fill: "#fef08a", style: { animation: "bt_flame_flicker 0.4s ease-in-out infinite alternate" } }),
              e.jsx("circle", { cx: "18", cy: "2", r: "5", fill: "#dc2626", opacity: "0.9" }),
              e.jsx("circle", { cx: "14", cy: "-12", r: "1.5", fill: "#fbbf24", style: { animation: "bt_smoke_rise 0.8s ease-out infinite" } }),
              e.jsx("circle", { cx: "22", cy: "-16", r: "1.2", fill: "#f59e0b", style: { animation: "bt_smoke_rise 1.1s ease-out infinite" } }),
              e.jsx("path", { d: "M 10,2 L 18,-6 L 24,0 L 32,-4", stroke: "#000", strokeWidth: "1.5" })
            ]
          })
        ]
      }),

      // 14. CINEMATIC DEATH / SINKING INFERNO OVERLAY
      isDead && e.jsxs("g", {
        id: "death-cataclysm-ship-break",
        children: [
          // Gaping catastrophic hull breach
          e.jsx("path", { d: isFlag ? "M -6,8 L -1,30 L 7,10 Z" : "M -4,6 L 0,22 L 5,8 Z", fill: "#020617", stroke: "#000", strokeWidth: "1.8" }),
          e.jsx("path", { d: "M -5,14 Q 0,24 5,14", fill: "rgba(56,189,248,0.9)", opacity: "0.95" }),
          // Broken mast collapsed into waves
          e.jsx("line", { x1: "0", y1: "6", x2: "30", y2: "-6", stroke: "#2e1c0c", strokeWidth: "3.2", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 8,0 Q 22,8 35,-2 Q 28,14 15,8 Z", fill: sailFabric, opacity: "0.8" }),
          // Explosive Flying Splinter Shrapnel
          [[-24, -18], [-12, -30], [12, -26], [26, -16], [0, -36]].map((sp, sIdx) => e.jsx("polygon", {
            key: "dead_spl_" + sIdx,
            points: (sp[0] - 5) + "," + sp[1] + " " + (sp[0] + 5) + "," + (sp[1] - 4) + " " + sp[0] + "," + (sp[1] + 7),
            fill: sIdx % 2 === 0 ? "#f59e0b" : "#78350f",
            stroke: "#000",
            strokeWidth: "0.8",
            style: { animation: "bt_splinter_shrapnel 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite" }
          })),
          // Sinking Deck Inferno Flames & Black Greek Smoke Columns
          [-14, 2, 18].map((fX, fIdx) => e.jsxs("g", {
            key: "dead_fire_" + fIdx,
            transform: "translate(" + fX + ", 4)",
            children: [
              e.jsx("polygon", { points: "-8,2 0,-26 8,2", fill: "#f97316", style: { animation: "bt_flame_flicker " + (0.35 + fIdx * 0.08) + "s ease-in-out infinite alternate" } }),
              e.jsx("polygon", { points: "-5,2 0,-18 5,2", fill: "#fef08a", style: { animation: "bt_flame_flicker " + (0.28 + fIdx * 0.08) + "s ease-in-out infinite alternate" } }),
              e.jsx("ellipse", { cx: "0", cy: "-24", rx: "11", ry: "7", fill: "rgba(15,23,42,0.9)", style: { animation: "bt_smoke_rise " + (1.2 + fIdx * 0.3) + "s ease-out infinite" } }),
              e.jsx("ellipse", { cx: "4", cy: "-36", rx: "15", ry: "9", fill: "rgba(2,6,23,0.75)", style: { animation: "bt_smoke_rise " + (1.5 + fIdx * 0.3) + "s ease-out infinite" } })
            ]
          }))
        ]
      })
    ]
  });
};

// 2. EXACT 2.5D Isometric Legion (with Full Cinematic 2.5D Death Animation)
const render2DLegion = (x, y, isPlayer, role = "cohort", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "") => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isDamaged = hpPct <= 50 && !isDead;
  const isCritical = hpPct <= 25 && !isDead;
  const isCommander = role === "flagship" || role === "commander";
  const shieldColor = isPlayer ? "#991b1b" : (faction === "punic" ? "#701a75" : "#1e293b");
  const trimGold = isPlayer ? "#fbbf24" : "#f59e0b";
  const flip = isPlayer ? 1 : -1;

  return e.jsxs("g", {
    transform: \`translate(\${x}, \${y}) scale(\${scale * flip}, \${scale})\`,
    opacity: isDead ? "0.85" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none"
    },
    className: "transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // Hit / Attack Glow Ring
      isHit && e.jsx("ellipse", { cx: "0", cy: "10", rx: isCommander ? "64" : "48", ry: "18", fill: "rgba(239,68,68,0.5)" }),
      isAttacking && e.jsx("ellipse", { cx: "0", cy: "10", rx: isCommander ? "64" : "48", ry: "18", fill: "rgba(251,191,36,0.4)" }),
      // Ground Shadow Ellipse
      e.jsx("ellipse", { cx: "0", cy: "18", rx: isCommander ? "58" : "44", ry: "12", fill: "#000", opacity: "0.75" }),

      // Dust Puff Behind Cohort
      !isDead && isAttacking && e.jsx("ellipse", { cx: "-35", cy: "14", rx: "18", ry: "7", fill: "rgba(217,119,6,0.4)" }),

      // Back Rank (Helmets & Pilum Spears)
      !isDead && [-28, -14, 0, 14, 28].map((sX, idx) => e.jsxs("g", {
        key: \`br_\${idx}\`,
        children: [
          e.jsx("circle", { cx: sX, cy: "-2", r: "3.6", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "0.9" }),
          e.jsx("line", { x1: sX + 3, y1: "-16", x2: sX - 2, y2: "0", stroke: "#475569", strokeWidth: "1.6" }),
          e.jsx("polygon", { points: (sX+4) + ",-18 " + (sX+2) + ",-14 " + (sX+6) + ",-14", fill: "#e2e8f0" })
        ]
      })),

      // Front Rank (Interlocking Scutum Shield Wall)
      !isDead && [-32, -19, -6, 7, 20, 33].map((sX, idx) => e.jsxs("g", {
        key: \`fr_\${idx}\`,
        children: [
          e.jsx("rect", { x: sX, y: "4", width: "13", height: "20", rx: "1.8", fill: shieldColor, stroke: trimGold, strokeWidth: "1" }),
          e.jsx("circle", { cx: sX + 6.5, cy: "14", r: "2.2", fill: trimGold }),
          e.jsx("line", { x1: sX + 2, y1: "14", x2: sX + 11, y2: "14", stroke: trimGold, strokeWidth: "0.8" })
        ]
      })),

      // Centurion Commander & Aquila Standard (Player)
      !isDead && isPlayer && e.jsxs("g", {
        children: [
          e.jsx("line", { x1: "0", y1: "-24", x2: "0", y2: "10", stroke: "#78350f", strokeWidth: "2.4" }),
          e.jsx("circle", { cx: "0", cy: "-18", r: "3.5", fill: "#fbbf24", stroke: "#b45309", strokeWidth: "0.8" }),
          e.jsx("polygon", { points: "-5,-23 0,-28 5,-23", fill: "#fef08a" }),
          e.jsx("rect", { x: "1", y: "-17", width: "12", height: "8", fill: "#7e22ce", stroke: "#fbbf24", strokeWidth: "0.7" }),
          e.jsx("path", { d: "M -24,-9 Q -18,-14 -12,-9", stroke: "#dc2626", strokeWidth: "3", strokeLinecap: "round", fill: "none" })
        ]
      }),

      // Dynamic Legion Hit & Blood Damage Overlays
      isHit && e.jsxs("g", {
        children: [
          // Crimson Blood Splatter & Flying Broken Pilum
          e.jsx("circle", { cx: "-14", cy: "6", r: "4.5", fill: "#dc2626" }),
          e.jsx("circle", { cx: "8", cy: "2", r: "3.5", fill: "#991b1b" }),
          e.jsx("circle", { cx: "22", cy: "10", r: "4", fill: "#7f1d1d" }),
          e.jsx("line", { x1: "-18", y1: "-12", x2: "-28", y2: "-22", stroke: "#475569", strokeWidth: "1.8" }),
          e.jsx("polygon", { points: "-30,-25 -26,-20 -32,-20", fill: "#cbd5e1" })
        ]
      }),
      (isDamaged || isCritical) && e.jsxs("g", {
        children: [
          // Cracked Scutum Shield & Ground Bloodstain
          e.jsx("line", { x1: "-6", y1: "6", x2: "-2", y2: "22", stroke: "#0f172a", strokeWidth: "1.5" }),
          e.jsx("ellipse", { cx: "12", cy: "18", rx: "10", ry: "4", fill: "rgba(185,28,28,0.7)" }),
          // Embedded arrows in scuta shields
          [-22, 4, 18].map((aX, idx) => e.jsxs("g", {
            key: \`legion_arr_\${idx}\`,
            children: [
              e.jsx("line", { x1: aX + 2, y1: "12", x2: aX - 8, y2: "4", stroke: "#451a03", strokeWidth: "1.2" }),
              e.jsx("polygon", { points: (aX - 8) + ",4 " + (aX - 10) + ",2 " + (aX - 7) + ",2", fill: "#f8fafc" })
            ]
          })),
          // Trampled battleground dust & broken pilum shafts
          e.jsx("line", { x1: "-14", y1: "22", x2: "4", y2: "25", stroke: "#475569", strokeWidth: "1.6" }),
          e.jsx("line", { x1: "14", y1: "20", x2: "26", y2: "23", stroke: "#334155", strokeWidth: "1.4" }),
          isCritical && e.jsxs("g", {
            children: [
              // Fallen Legionaries & Broken Equipment
              e.jsx("rect", { x: "-24", y: "16", width: "14", height: "8", rx: "1", fill: shieldColor, transform: "rotate(35)", stroke: "#b45309", strokeWidth: "0.8" }),
              e.jsx("circle", { cx: "-30", cy: "18", r: "3", fill: "#ca8a04" }),
              e.jsx("line", { x1: "-34", y1: "20", x2: "-18", y2: "22", stroke: "#78350f", strokeWidth: "2" }),
              // Second casualty & large blood pool
              e.jsx("ellipse", { cx: "22", cy: "22", rx: "12", ry: "4.5", fill: "rgba(127,29,29,0.75)" }),
              e.jsx("circle", { cx: "24", cy: "19", r: "2.8", fill: "#ca8a04" }),
              e.jsx("line", { x1: "18", y1: "21", x2: "28", y2: "24", stroke: "#1e293b", strokeWidth: "1.8" }),
              // Rising battlefield dust/smoke
              e.jsx("ellipse", { cx: "0", cy: "22", rx: "20", ry: "6", fill: "rgba(120,53,15,0.3)", style: { animation: "bt_smoke_rise 1.6s ease-out infinite" } })
            ]
          })
        ]
      }),

      // 14. CINEMATIC LEGION ROUT & DEFEAT COLLAPSE
      isDead && e.jsxs("g", {
        id: "death-legion-rout-casualty",
        children: [
          // Expanding Rich Blood Pool
          e.jsx("ellipse", { cx: "0", cy: "22", rx: isCommander ? "48" : "36", ry: isCommander ? "16" : "12", fill: "rgba(153,27,27,0.85)", stroke: "#450a0a", strokeWidth: "1.5", style: { animation: "bt_blood_pool_expand 1.8s ease-out forwards" } }),
          e.jsx("ellipse", { cx: "8", cy: "20", rx: "22", ry: "8", fill: "rgba(220,38,38,0.9)" }),
          // Dropped / Fallen Aquila Eagle Standard
          e.jsx("line", { x1: "-14", y1: "24", x2: "18", y2: "22", stroke: "#78350f", strokeWidth: "2.4" }),
          e.jsx("circle", { cx: "18", cy: "22", r: "4.5", fill: "#fbbf24", stroke: "#b45309", strokeWidth: "1" }),
          e.jsx("polygon", { points: "16,18 24,22 16,26", fill: "#fef08a" }),
          // Shattered scutum shields lying in soil
          [-24, -8, 12, 28].map((sX, sIdx) => e.jsx("rect", {
            key: "dead_scu_" + sIdx,
            x: sX,
            y: "16",
            width: "14",
            height: "9",
            rx: "1.5",
            fill: shieldColor,
            stroke: "#fbbf24",
            strokeWidth: "0.8",
            transform: "rotate(" + (sIdx * 25 - 35) + " " + sX + " 16)"
          })),
          // Fallen Legionary Silhouettes
          [[-16, 20], [4, 24], [22, 18]].map((pos, pIdx) => e.jsxs("g", {
            key: "fallen_m_" + pIdx,
            children: [
              e.jsx("circle", { cx: pos[0], cy: pos[1], r: "3", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "0.8" }),
              e.jsx("line", { x1: pos[0] - 6, y1: pos[1] + 3, x2: pos[0] + 6, y2: pos[1] + 2, stroke: "#78350f", strokeWidth: "2.2" }),
              e.jsx("line", { x1: pos[0] + 2, y1: pos[1] - 4, x2: pos[0] - 8, y2: pos[1] + 4, stroke: "#475569", strokeWidth: "1.4" })
            ]
          })),
          // Swirling Battlefield Red Dust Cloud
          e.jsx("ellipse", { cx: "0", cy: "20", rx: "42", ry: "14", fill: "rgba(120,53,15,0.35)", style: { animation: "bt_dust_scatter 2.5s ease-out infinite" } }),
          // Ascending Golden / Crimson Elysium Martial Souls
          [-12, 0, 14].map((soulX, sIdx) => e.jsxs("g", {
            key: "soul_" + sIdx,
            transform: "translate(" + soulX + ", 14)",
            style: { animation: "bt_death_soul_ascend " + (1.4 + sIdx * 0.3) + "s ease-out infinite" },
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "2.5", fill: "#fef08a" }),
              e.jsx("circle", { cx: "0", cy: "0", r: "5.5", fill: "rgba(251,191,36,0.5)" })
            ]
          }))
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
  const abKw = (kw) => {
    if (!hoveredAbility) return false;
    if (typeof hoveredAbility === "string") return hoveredAbility.toLowerCase().includes(kw);
    const idStr = typeof hoveredAbility.id === "string" ? hoveredAbility.id : (typeof hoveredAbility.id === "number" ? String(hoveredAbility.id) : "");
    const nameStr = typeof hoveredAbility.name === "string" ? hoveredAbility.name : "";
    const typeStr = typeof hoveredAbility.type === "string" ? hoveredAbility.type : "";
    return idStr.toLowerCase().includes(kw) || nameStr.toLowerCase().includes(kw) || typeStr.toLowerCase().includes(kw);
  };

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

  const tod = String(timeOfDay || "DIES").toUpperCase();
  const reg = String(regionName || "").toLowerCase();

  // Regional Classifications
  const isEgyptLevant = reg.includes("alexandria") || reg.includes("egypt") || reg.includes("nile") || reg.includes("levant") || reg.includes("tyre") || reg.includes("palmyra") || reg.includes("gaza");
  const isRomeItaly = reg.includes("rome") || reg.includes("ostia") || reg.includes("ital") || reg.includes("tyrrhen") || reg.includes("tiber");
  const isCarthagePunic = reg.includes("carthage") || reg.includes("afric") || reg.includes("numid") || reg.includes("punic") || reg.includes("syrtis") || reg.includes("tripoli");
  const isHellasAegean = reg.includes("athen") || reg.includes("sparta") || reg.includes("corinth") || reg.includes("hellas") || reg.includes("aegean") || reg.includes("rhodes") || reg.includes("delphi");
  const isChokepoint = reg.includes("messina") || reg.includes("hellespont") || reg.includes("strait") || reg.includes("bosphorus") || reg.includes("fretum") || reg.includes("gibraltar") || reg.includes("milvian") || reg.includes("pons");
  const isShallows = reg.includes("cyclades") || reg.includes("syrtis") || reg.includes("rhodes") || reg.includes("balearic") || reg.includes("reef") || reg.includes("shoal") || reg.includes("creta") || reg.includes("cyprus");
  const isFortress = reg.includes("syracuse") || reg.includes("ravenna") || reg.includes("siege") || reg.includes("castra") || reg.includes("fortress") || reg.includes("massilia") || reg.includes("verona");
  const isNorthernFrontier = reg.includes("rhine") || reg.includes("danube") || reg.includes("alesia") || reg.includes("trier") || reg.includes("gallia") || reg.includes("germania") || reg.includes("britannia") || reg.includes("turin") || reg.includes("alps");
  const isMilvianRiver = reg.includes("milvian") || reg.includes("pons") || reg.includes("tiber") || reg.includes("rubicon");

  // Dynamic Root Container Sky Gradient by Time of Day & Domain
  const isDawn = tod === "AURORA" || tod === "DAWN";
  const isDusk = tod === "CREPUSCULUM" || tod === "DUSK" || tod === "VESPER";
  const isNight = tod === "NOX" || tod === "NIGHT";

  const arenaBgGradient = isNaval
    ? (isNight
        ? "linear-gradient(180deg, #01040a 0%, #030a16 28%, #06152b 62%, #010307 100%)"
        : isDusk
        ? "linear-gradient(180deg, #18051e 0%, #3b0a45 26%, #581c3b 58%, #0f0514 100%)"
        : isDawn
        ? "linear-gradient(180deg, #1a0c24 0%, #3a1532 26%, #5c2238 58%, #0a0410 100%)"
        : "linear-gradient(180deg, #020a16 0%, #051a32 28%, #082647 62%, #020710 100%)")
    : (isNight
        ? "linear-gradient(180deg, #050408 0%, #0c0a12 28%, #14101d 62%, #030205 100%)"
        : isDusk
        ? "linear-gradient(180deg, #240a0c 0%, #451515 28%, #4a2118 62%, #120404 100%)"
        : isDawn
        ? "linear-gradient(180deg, #210d18 0%, #3d1722 28%, #452119 62%, #0f0508 100%)"
        : "linear-gradient(180deg, #150d06 0%, #26190d 28%, #382512 62%, #0a0502 100%)");

  return e.jsxs("div", {
    id: "battle-theatre-v2-root",
    className: "relative w-full h-full flex-1 select-none my-0 transform-gpu overflow-hidden flex items-center justify-center",
    style: {
      willChange: "contents",
      transform: "translateZ(0)",
      background: arenaBgGradient
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
              @keyframes bt_star_twinkle {
                0%, 100% { opacity: 0.25; transform: scale(0.85); }
                50% { opacity: 0.95; transform: scale(1.15); }
              }
              @keyframes bt_beacon_sweep {
                0% { transform: rotate(-25deg); opacity: 0.35; }
                50% { transform: rotate(25deg); opacity: 0.9; }
                100% { transform: rotate(-25deg); opacity: 0.35; }
              }
              @keyframes bt_dash_p_salvo1 {
                0% { stroke-dashoffset: 100; opacity: 0; }
                4% { opacity: 1; }
                32% { stroke-dashoffset: -410; opacity: 1; }
                38% { stroke-dashoffset: -510; opacity: 0.8; }
                44% { stroke-dashoffset: -560; opacity: 0; }
                100% { stroke-dashoffset: -560; opacity: 0; }
              }
              @keyframes bt_burst_salvo1 {
                0%, 30% { transform: scale(0); opacity: 0; }
                36% { transform: scale(1.6); opacity: 1; }
                44% { transform: scale(1.2); opacity: 0.85; }
                52% { transform: scale(0.4); opacity: 0; }
                100% { transform: scale(0); opacity: 0; }
              }
              @keyframes bt_dash_p_salvo2 {
                0%, 14% { stroke-dashoffset: 100; opacity: 0; }
                18% { stroke-dashoffset: 100; opacity: 1; }
                50% { stroke-dashoffset: -410; opacity: 1; }
                56% { stroke-dashoffset: -510; opacity: 0.8; }
                62% { stroke-dashoffset: -560; opacity: 0; }
                100% { stroke-dashoffset: -560; opacity: 0; }
              }
              @keyframes bt_burst_salvo2 {
                0%, 48% { transform: scale(0); opacity: 0; }
                54% { transform: scale(1.6); opacity: 1; }
                62% { transform: scale(1.2); opacity: 0.85; }
                70% { transform: scale(0.4); opacity: 0; }
                100% { transform: scale(0); opacity: 0; }
              }
              @keyframes bt_dash_p_salvo3 {
                0%, 32% { stroke-dashoffset: 120; opacity: 0; }
                36% { stroke-dashoffset: 120; opacity: 1; }
                64% { stroke-dashoffset: -260; opacity: 1; }
                70% { stroke-dashoffset: -365; opacity: 0.8; }
                76% { stroke-dashoffset: -440; opacity: 0; }
                100% { stroke-dashoffset: -440; opacity: 0; }
              }
              @keyframes bt_burst_salvo3 {
                0%, 62% { transform: scale(0); opacity: 0; }
                68% { transform: scale(2.2); opacity: 1; }
                76% { transform: scale(1.5); opacity: 0.9; }
                86% { transform: scale(0.8); opacity: 0.5; }
                94% { transform: scale(0); opacity: 0; }
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
              @keyframes bt_hit_recoil {
                0% { transform: translateX(0); }
                20% { transform: translateX(-10px) rotate(-1deg); }
                45% { transform: translateX(5px) rotate(0.8deg); }
                70% { transform: translateX(-2px); }
                100% { transform: translateX(0); }
              }
              @keyframes bt_wave_shimmer {
                0%, 100% { opacity: 0.3; transform: translateX(0); }
                50% { opacity: 0.7; transform: translateX(8px); }
              }
            \`
          }),

          // 1A. Defs & Dynamic Atmospheric Gradients
          e.jsxs("defs", {
            children: [
              // Dynamic Sea Base Gradient by Time of Day
              e.jsxs("linearGradient", {
                id: "bt_sea_floor", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: isNight ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#01050c" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#051124" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#030c1c" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#010307" })
                ] : isDusk ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#140416" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#240b22" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#150618" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#07020a" })
                ] : isDawn ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#100618" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#1d0e26" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#110719" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#07020c" })
                ] : [
                  e.jsx("stop", { offset: "0%", stopColor: "#041224" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#082444" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#061b33" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#02070f" })
                ]
              }),

              // Wave Crest Glint Gradient (Adjusts to Celestial Tone)
              e.jsxs("linearGradient", {
                id: "bt_wave_crest", x1: "0%", y1: "0%", x2: "100%", y2: "0%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "transparent" }),
                  e.jsx("stop", { offset: "20%", stopColor: isNight ? "rgba(148,163,184,0.3)" : isDusk ? "rgba(251,146,60,0.35)" : isDawn ? "rgba(253,186,116,0.35)" : "rgba(56,189,248,0.4)" }),
                  e.jsx("stop", { offset: "50%", stopColor: isNight ? "rgba(224,242,254,0.75)" : isDusk ? "rgba(253,224,71,0.85)" : isDawn ? "rgba(254,240,138,0.85)" : "rgba(224,242,254,0.85)" }),
                  e.jsx("stop", { offset: "80%", stopColor: isNight ? "rgba(148,163,184,0.3)" : isDusk ? "rgba(251,146,60,0.35)" : isDawn ? "rgba(253,186,116,0.35)" : "rgba(56,189,248,0.4)" }),
                  e.jsx("stop", { offset: "100%", stopColor: "transparent" })
                ]
              }),

              // Dynamic Land Ground Terrain Gradient by Region & Time of Day
              e.jsxs("linearGradient", {
                id: "bt_land_terrain", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: isNight ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#08060a" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#120e18" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#0d0913" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#040206" })
                ] : isDusk ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#220b08" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#3a1510" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#240d0a" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0f0403" })
                ] : isDawn ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#1e0d14" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#33161f" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#210e15" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0d0408" })
                ] : isEgyptLevant ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#2a1705" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#45270d" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#331b08" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#170b02" })
                ] : isNorthernFrontier ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#10160d" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#1f2a18" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#141c10" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#080d05" })
                ] : [
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
          // 1B. BACKGROUND: DYNAMIC ATMOSPHERIC SKY & CELESTIAL LIGHTING
          // =================================================================
          e.jsxs("g", {
            id: "arena-celestial-sky-layer",
            children: [
              // A. Night Sky Constellations & Luna Crescent
              isNight && e.jsxs("g", {
                id: "celestial-nox-night",
                children: [
                  // Starlit Constellation Dots
                  [[80, 22, 1.2], [140, 38, 1.5], [210, 18, 0.9], [280, 32, 1.1], [360, 16, 1.4], [430, 35, 1.0], [510, 20, 1.3], [590, 30, 0.9], [740, 22, 1.2]].map((st, sIdx) => e.jsx("circle", {
                    key: "star_" + sIdx,
                    cx: st[0], cy: st[1], r: st[2],
                    fill: "#f8fafc",
                    opacity: 0.8,
                    style: { animation: "bt_star_twinkle " + (2.5 + (sIdx % 3) * 0.7) + "s ease-in-out infinite " + (sIdx * 0.3) + "s" }
                  })),
                  // Luminous Silver Diana / Luna Crescent Moon & Aura
                  e.jsxs("g", {
                    transform: "translate(675, 26)",
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "22", fill: "rgba(224,242,254,0.08)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#f1f5f9" }),
                      e.jsx("circle", { cx: "4", cy: "-2", r: "9", fill: "#030a16" })
                    ]
                  })
                ]
              }),

              // B. Sol Invictus Golden Noon Sun & Radiant Rays
              (!isNight && !isDusk && !isDawn) && e.jsxs("g", {
                id: "celestial-dies-sol-invictus",
                transform: "translate(670, 26)",
                children: [
                  // Outer Solar Radiant Corona Haze
                  e.jsx("circle", { cx: "0", cy: "0", r: "34", fill: "rgba(251,191,36,0.12)" }),
                  // 8-Point Sol Invictus Starburst Rays
                  [0, 45, 90, 135, 180, 225, 270, 315].map((ang, rIdx) => e.jsx("line", {
                    key: "sol_ray_" + rIdx,
                    x1: "0", y1: "0",
                    x2: Math.cos(ang * Math.PI / 180) * 22,
                    y2: Math.sin(ang * Math.PI / 180) * 22,
                    stroke: "#fbbf24", strokeWidth: "1.4", opacity: "0.75"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "9.5", fill: "#fef08a", stroke: "#f59e0b", strokeWidth: "1.5" })
                ]
              }),

              // C. Crepusculum / Dusk Sinking Sunset Orb
              isDusk && e.jsxs("g", {
                id: "celestial-dusk-sunset",
                transform: "translate(125, 45)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "48", ry: "20", fill: "rgba(249,115,22,0.18)" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "13", fill: "#fb923c", stroke: "#ef4444", strokeWidth: "1.2" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "9", fill: "#fef08a" })
                ]
              }),

              // D. Aurora / Dawn Rising Solar Rim
              isDawn && e.jsxs("g", {
                id: "celestial-dawn-aurora",
                transform: "translate(650, 32)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "44", ry: "18", fill: "rgba(253,186,116,0.2)" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "11", fill: "#fed7aa", stroke: "#f97316", strokeWidth: "1" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "7", fill: "#fef9c3" })
                ]
              })
            ]
          }),

          // =================================================================
          // 1C. BACKGROUND: MEDITERRANEAN OCEAN WAVES vs ROMAN TERRAIN
          // =================================================================
          isNaval ? e.jsxs("g", {
            id: "naval-ocean-background",
            children: [
              // Base Sea Fill
              e.jsx("rect", { x: "0", y: "0", width: "800", height: "380", fill: "url(#bt_sea_floor)" }),

              // Distant Dynamic Coastline & Headland
              e.jsx("path", {
                d: isNorthernFrontier
                  ? "M 0,105 L 0,65 L 120,40 L 250,75 L 380,30 L 520,70 L 680,35 L 800,85 L 800,105 Z"
                  : "M 0,105 L 0,60 Q 220,25 440,55 Q 660,85 800,40 L 800,105 Z",
                fill: isNight ? "#040e1c" : isDusk ? "#230b1e" : isDawn ? "#1a0b1f" : "#0b2440",
                opacity: "0.65"
              }),

              // Dynamic Regional Battlefield Landmarks & Topographies
              (() => {
                return e.jsxs("g", {
                  id: "dynamic-regional-theatre-scenery",
                  children: [
                    // Topography 1: Narrow Straits, Chokepoints & Cliff Flanks
                    isChokepoint && e.jsxs("g", {
                      id: "scenery-chokepoint-cliffs",
                      children: [
                        // Left Flank Sheer Cliff Wall
                        e.jsx("polygon", { points: "0,45 0,165 85,145 60,85 30,45", fill: "#1e293b", stroke: "#0f172a", strokeWidth: "1.2" }),
                        e.jsx("polygon", { points: "0,45 30,45 50,85 15,110 0,95", fill: "#334155", opacity: "0.8" }),
                        // Right Flank Sheer Cliff Wall
                        e.jsx("polygon", { points: "800,45 800,165 715,145 740,85 770,45", fill: "#1e293b", stroke: "#0f172a", strokeWidth: "1.2" }),
                        e.jsx("polygon", { points: "800,45 770,45 750,85 785,110 800,95", fill: "#334155", opacity: "0.8" }),
                        // Churning Tidal Current Rapids Lines
                        [120, 185, 250].map((rY, rIdx) => e.jsx("path", {
                          key: "rapids_" + rIdx,
                          d: "M 90," + rY + " Q 400," + (rY + 10) + " 710," + rY,
                          stroke: "rgba(224,242,254,0.7)",
                          strokeWidth: "1.8",
                          strokeDasharray: "18 10",
                          fill: "none",
                          opacity: "0.8"
                        })),
                        // Lookout Signal Watchtower with Brazier Flame
                        e.jsxs("g", {
                          transform: "translate(22, 36) scale(0.65)",
                          children: [
                            e.jsx("rect", { x: "-8", y: "0", width: "16", height: "24", fill: "#fef3c7", stroke: "#78350f", strokeWidth: "1" }),
                            e.jsx("circle", { cx: "0", cy: "-6", r: "4.5", fill: "#f59e0b", style: { animation: "bt_flame_flicker 0.4s ease-in-out infinite alternate" } })
                          ]
                        })
                      ]
                    }),

                    // Topography 2: Coral Reefs & Sunlit Shallows
                    isShallows && e.jsxs("g", {
                      id: "scenery-coral-shallows",
                      children: [
                        // Sunlit Turquoise Water Caustics in Center Arena
                        e.jsx("ellipse", { cx: "400", cy: "215", rx: "380", ry: "95", fill: "rgba(56,189,248,0.12)", stroke: "rgba(56,189,248,0.3)", strokeWidth: "1.5", strokeDasharray: "12 8" }),
                        // Submerged Coral Rock Heads & Breaking Foam
                        [[-180, 45], [-60, -35], [80, 50], [210, -30]].map((rf, rfIdx) => e.jsxs("g", {
                          key: "reef_" + rfIdx,
                          transform: "translate(" + (400 + rf[0]) + ", " + (215 + rf[1]) + ")",
                          children: [
                            e.jsx("ellipse", { cx: "0", cy: "0", rx: "28", ry: "10", fill: "none", stroke: "rgba(255,255,255,0.8)", strokeWidth: "1.8", strokeDasharray: "5 3" }),
                            e.jsx("polygon", { points: "-12,0 -4,-5 6,-2 12,3 -2,5", fill: "#2e1c0c", stroke: "#1c1917", strokeWidth: "1" }),
                            e.jsx("ellipse", { cx: "0", cy: "0", rx: "16", ry: "5", fill: "rgba(14,165,233,0.35)" })
                          ]
                        }))
                      ]
                    }),

                    // Topography 3: Coastal Fortress Sea Ramparts
                    isFortress && e.jsxs("g", {
                      id: "scenery-coastal-fortress-walls",
                      children: [
                        // Stone Sea Bastion along Coastline
                        e.jsx("polygon", { points: "0,52 800,52 800,82 0,82", fill: "#1e293b", stroke: "#0f172a", strokeWidth: "1.2" }),
                        [0, 80, 160, 240, 320, 400, 480, 560, 640, 720].map((bX, bIdx) => e.jsxs("g", {
                          key: "bastion_" + bIdx,
                          children: [
                            e.jsx("rect", { x: bX + 8, y: "42", width: "32", height: "16", fill: "#334155", stroke: "#0f172a", strokeWidth: "1" }),
                            e.jsx("rect", { x: bX + 14, y: "36", width: "20", height: "8", fill: "#475569", stroke: "#0f172a", strokeWidth: "0.8" }),
                            (bIdx % 2 === 0) && e.jsx("circle", { cx: bX + 24, cy: "34", r: "3", fill: "#f97316", style: { animation: "bt_flame_flicker 0.45s ease-in-out infinite alternate" } })
                          ]
                        }))
                      ]
                    }),

                    // Regional Cultural Landmark Switch
                    isEgyptLevant ? e.jsxs("g", {
                      id: "landmark-pharos-alexandria",
                      transform: "translate(695, 14) scale(0.8)",
                      opacity: "0.95",
                      children: [
                        // Sweeping Golden Beacon Beam across Water
                        e.jsx("polygon", {
                          points: "24,12 -380,180 -320,240",
                          fill: "rgba(254,240,138,0.18)",
                          style: { transformOrigin: "24px 12px", animation: "bt_beacon_sweep 5s ease-in-out infinite alternate" }
                        }),
                        e.jsx("path", { d: "M -50,48 L 40,48 L 30,42 L -40,42 Z", fill: "#1e293b", stroke: "#0f172a", strokeWidth: "0.8" }),
                        e.jsx("polygon", { points: "18,44 14,48 34,48 30,44", fill: "#fef3c7", stroke: "#d97706", strokeWidth: "0.8" }),
                        e.jsx("rect", { x: "18", y: "22", width: "12", height: "22", fill: "#fde68a", stroke: "#b45309", strokeWidth: "0.9" }),
                        e.jsx("rect", { x: "20", y: "14", width: "8", height: "8", fill: "#fef3c7", stroke: "#d97706", strokeWidth: "0.8" }),
                        e.jsx("circle", { cx: "24", cy: "12", r: "5.5", fill: "#f59e0b", style: { animation: "bt_flame_flicker 0.4s ease-in-out infinite alternate" } }),
                        e.jsx("circle", { cx: "24", cy: "12", r: "3", fill: "#fef08a" }),
                        e.jsx("polygon", { points: "24,5 18,14 30,14", fill: "#b45309", stroke: "#fbbf24", strokeWidth: "0.7" }),
                        // Great Library Papyrus Colonnades
                        e.jsx("rect", { x: "-38", y: "26", width: "36", height: "18", rx: "1", fill: "#fef3c7", stroke: "#b45309", strokeWidth: "0.9" }),
                        [-34, -26, -18, -10].map((clX, clIdx) => e.jsx("line", { key: "eg_cl_" + clIdx, x1: clX, y1: "26", x2: clX, y2: "44", stroke: "#78350f", strokeWidth: "1.5" }))
                      ]
                    }) : isRomeItaly ? e.jsxs("g", {
                      id: "landmark-ostia-harbor-arch",
                      transform: "translate(670, 18) scale(0.78)",
                      opacity: "0.95",
                      children: [
                        [-55, -30, -5].map((aX, aIdx) => e.jsxs("g", {
                          key: "aq_" + aIdx,
                          children: [
                            e.jsx("rect", { x: aX, y: "28", width: "5", height: "20", fill: "#78350f", opacity: "0.85" }),
                            e.jsx("path", { d: "M " + aX + ",28 Q " + (aX + 10) + ",22 " + (aX + 20) + ",28", stroke: "#b45309", strokeWidth: "1.8", fill: "none" }),
                            e.jsx("line", { x1: aX, y1: "22", x2: aX + 20, y2: "22", stroke: "#fbbf24", strokeWidth: "1.1" })
                          ]
                        })),
                        e.jsx("rect", { x: "20", y: "20", width: "30", height: "28", rx: "1", fill: "#fef3c7", stroke: "#b45309", strokeWidth: "1.2" }),
                        e.jsx("path", { d: "M 27,48 L 27,34 Q 35,27 43,34 L 43,48 Z", fill: "#030712" }),
                        e.jsx("polygon", { points: "18,20 35,12 52,20", fill: "#b45309", stroke: "#fbbf24", strokeWidth: "0.9" }),
                        e.jsx("circle", { cx: "35", cy: "10", r: "2.5", fill: "#f59e0b" }),
                        // Imperial Rostra Eagle Standard
                        e.jsx("line", { x1: "58", y1: "16", x2: "58", y2: "48", stroke: "#78350f", strokeWidth: "1.8" }),
                        e.jsx("polygon", { points: "54,16 62,16 58,10", fill: "#fbbf24" })
                      ]
                    }) : isCarthagePunic ? e.jsxs("g", {
                      id: "landmark-carthage-cothon",
                      transform: "translate(675, 18) scale(0.78)",
                      opacity: "0.95",
                      children: [
                        e.jsx("ellipse", { cx: "30", cy: "42", rx: "44", ry: "10", fill: "none", stroke: "#7e22ce", strokeWidth: "3.5", strokeDasharray: "10 4" }),
                        e.jsx("ellipse", { cx: "30", cy: "42", rx: "26", ry: "6", fill: "rgba(126,34,206,0.3)", stroke: "#f59e0b", strokeWidth: "1.5" }),
                        e.jsx("rect", { x: "20", y: "20", width: "20", height: "24", fill: "#f3e8ff", stroke: "#7e22ce", strokeWidth: "1.2" }),
                        e.jsx("polygon", { points: "16,20 30,10 44,20", fill: "#991b1b", stroke: "#f59e0b", strokeWidth: "0.8" }),
                        e.jsx("circle", { cx: "30", cy: "8", r: "3.2", fill: "#f59e0b" }),
                        e.jsx("path", { d: "M 25,26 Q 30,22 35,26 Q 30,24 25,26 Z", fill: "#fef08a" })
                      ]
                    }) : e.jsxs("g", {
                      id: "landmark-hellas-temple",
                      transform: "translate(680, 18) scale(0.76)",
                      opacity: "0.95",
                      children: [
                        e.jsx("polygon", { points: "-10,48 55,48 44,34 0,34", fill: "#334155", stroke: "#1e293b", strokeWidth: "0.8" }),
                        [6, 16, 26, 36].map((cX, cIdx) => e.jsx("line", {
                          key: "col_" + cIdx,
                          x1: cX, y1: "34", x2: cX, y2: "20",
                          stroke: "#f8fafc", strokeWidth: "2", strokeLinecap: "round"
                        })),
                        e.jsx("polygon", { points: "2,20 21,11 40,20", fill: "#fef3c7", stroke: "#d97706", strokeWidth: "1" }),
                        e.jsx("circle", { cx: "21", cy: "9", r: "2.8", fill: "#f59e0b", style: { animation: "bt_flame_flicker 0.45s ease-in-out infinite alternate" } })
                      ]
                    })
                  ]
                });
              })(),

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
                fill: isNight ? "rgba(224,242,254,0.22)" : isDusk ? "rgba(253,186,116,0.3)" : "rgba(224,242,254,0.35)",
                opacity: "0.5"
              }))
            ]
          }) : e.jsxs("g", {
            id: "land-campus-background",
            children: [
              // Base Land Terrain Fill
              e.jsx("rect", { x: "0", y: "0", width: "800", height: "380", fill: "url(#bt_land_terrain)" }),

              // Distant Dynamic Horizon: Mountains / Hills / Dunes
              e.jsx("path", {
                d: isNorthernFrontier
                  ? "M 0,105 L 0,50 L 100,20 L 220,65 L 360,15 L 500,55 L 660,20 L 800,65 L 800,105 Z"
                  : isEgyptLevant
                  ? "M 0,105 L 0,70 Q 200,45 400,65 Q 600,40 800,75 L 800,105 Z"
                  : "M 0,105 L 0,55 Q 240,15 480,50 Q 720,85 800,35 L 800,105 Z",
                fill: isNorthernFrontier ? (isNight ? "#0d140b" : "#24331e") : isEgyptLevant ? (isNight ? "#140c04" : "#4a2a0c") : (isNight ? "#100905" : "#3b2614"),
                opacity: "0.7"
              }),

              // Dynamic Land Battlefield Scenery & Monuments
              (() => {
                return e.jsxs("g", {
                  id: "dynamic-land-battlefield-scenery",
                  children: [
                    // A. Historic Milvian Bridge & Pontoon Span Riverhead (Pons Milvius)
                    isMilvianRiver ? e.jsxs("g", {
                      id: "scenery-milvian-bridge-crossing",
                      transform: "translate(620, 18) scale(0.8)",
                      opacity: "0.95",
                      children: [
                        // Stone Arch Bridge Span & Pontoon Boat Links
                        e.jsx("path", { d: "M -60,45 Q -25,25 10,45 Q 45,25 80,45 L 80,48 L -60,48 Z", fill: "#fef3c7", stroke: "#b45309", strokeWidth: "1.2" }),
                        // Tiber River Water under Spans
                        e.jsx("ellipse", { cx: "10", cy: "48", rx: "75", ry: "8", fill: "rgba(14,165,233,0.35)", stroke: "#38bdf8", strokeWidth: "1" }),
                        // Imperial Triumphal Archway on Bridgehead
                        e.jsx("rect", { x: "-35", y: "15", width: "22", height: "24", fill: "#fde68a", stroke: "#b45309", strokeWidth: "1" }),
                        e.jsx("path", { d: "M -30,39 L -30,27 Q -24,20 -18,27 L -18,39 Z", fill: "#1c1917" }),
                        // Celestial Chi-Rho Labarum Trophy Standard
                        e.jsx("line", { x1: "30", y1: "5", x2: "30", y2: "45", stroke: "#78350f", strokeWidth: "2" }),
                        e.jsx("circle", { cx: "30", cy: "8", r: "6", fill: "#fbbf24", stroke: "#d97706", strokeWidth: "1" }),
                        e.jsx("polygon", { points: "26,14 34,14 30,6", fill: "#991b1b" })
                      ]
                    }) : e.jsxs("g", {
                      id: "landmark-roman-castrum-camp",
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
                    })
                  ]
                });
              })(),

              // 2.5D Roman Stone Military Road Tracks
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
                fill: isNight ? "rgba(148,163,184,0.15)" : isDusk ? "rgba(249,115,22,0.2)" : "rgba(217,119,6,0.25)",
                stroke: isNight ? "rgba(71,85,105,0.4)" : "rgba(120,53,15,0.4)",
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
              // Salvo 1: Upper Escort Bow (148, 118) -> Enemy Escort Bow (652, 118)
              e.jsxs("g", {
                id: "player-salvo-lane-1",
                children: [
                  e.jsx("path", {
                    d: "M 148,118 Q 400,45 652,118",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "4.5",
                    strokeDasharray: "100 800",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo1 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M 148,118 Q 400,45 652,118",
                    stroke: "#ffffff",
                    strokeWidth: "1.8",
                    strokeDasharray: "60 840",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo1 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(652, 118)",
                    style: { animation: "bt_burst_salvo1 0.95s ease-out forwards" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#fef08a" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "22", fill: "rgba(245,158,11,0.65)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "34", fill: "none", stroke: "#fbbf24", strokeWidth: "1.5", opacity: "0.85" })
                    ]
                  })
                ]
              }),

              // Salvo 2: Lower Escort Bow (148, 312) -> Enemy Escort Bow (652, 312)
              e.jsxs("g", {
                id: "player-salvo-lane-2",
                children: [
                  e.jsx("path", {
                    d: "M 148,312 Q 400,240 652,312",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "4.5",
                    strokeDasharray: "100 800",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo2 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M 148,312 Q 400,240 652,312",
                    stroke: "#ffffff",
                    strokeWidth: "1.8",
                    strokeDasharray: "60 840",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo2 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(652, 312)",
                    style: { animation: "bt_burst_salvo2 0.95s ease-out forwards" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#fef08a" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "22", fill: "rgba(245,158,11,0.65)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "34", fill: "none", stroke: "#fbbf24", strokeWidth: "1.5", opacity: "0.85" })
                    ]
                  })
                ]
              }),

              // Salvo 3: Center Flagship Turret (225, 215) -> Enemy Flagship Turret (575, 215)
              e.jsxs("g", {
                id: "player-salvo-lane-3",
                children: [
                  e.jsx("path", {
                    d: "M 225,215 Q 400,125 575,215",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "6.5",
                    strokeDasharray: "120 700",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo3 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M 225,215 Q 400,125 575,215",
                    stroke: "#ffffff",
                    strokeWidth: "2.6",
                    strokeDasharray: "80 740",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo3 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(575, 215)",
                    style: { animation: "bt_burst_salvo3 0.95s ease-out forwards" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "16", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "30", fill: "rgba(245,158,11,0.8)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "46", fill: "none", stroke: "#fbbf24", strokeWidth: "2.5" }),
                      e.jsx("line", { x1: "-16", y1: "-16", x2: "16", y2: "16", stroke: "#fef08a", strokeWidth: "3.5" }),
                      e.jsx("line", { x1: "16", y1: "-16", x2: "-16", y2: "16", stroke: "#fef08a", strokeWidth: "3.5" })
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
              // Lane 1: Upper (652, 118 -> 148, 118)
              e.jsxs("g", {
                id: "enemy-salvo-lane-1",
                children: [
                  e.jsx("path", {
                    d: "M 652,118 Q 400,45 148,118",
                    stroke: "url(#bt_enemy_trail)",
                    strokeWidth: "4.5",
                    strokeDasharray: "100 800",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo1 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M 652,118 Q 400,45 148,118",
                    stroke: "#ffffff",
                    strokeWidth: "1.8",
                    strokeDasharray: "60 840",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo1 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(148, 118)",
                    style: { animation: "bt_burst_salvo1 0.95s ease-out forwards" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#fca5a5" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "22", fill: "rgba(239,68,68,0.65)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "34", fill: "none", stroke: "#ef4444", strokeWidth: "1.5", opacity: "0.85" })
                    ]
                  })
                ]
              }),

              // Lane 2: Lower (652, 312 -> 148, 312)
              e.jsxs("g", {
                id: "enemy-salvo-lane-2",
                children: [
                  e.jsx("path", {
                    d: "M 652,312 Q 400,240 148,312",
                    stroke: "url(#bt_enemy_trail)",
                    strokeWidth: "4.5",
                    strokeDasharray: "100 800",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo2 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M 652,312 Q 400,240 148,312",
                    stroke: "#ffffff",
                    strokeWidth: "1.8",
                    strokeDasharray: "60 840",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo2 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(148, 312)",
                    style: { animation: "bt_burst_salvo2 0.95s ease-out forwards" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#fca5a5" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "22", fill: "rgba(239,68,68,0.65)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "34", fill: "none", stroke: "#ef4444", strokeWidth: "1.5", opacity: "0.85" })
                    ]
                  })
                ]
              }),

              // Lane 3: Center (575, 215 -> 225, 215)
              e.jsxs("g", {
                id: "enemy-salvo-lane-3",
                children: [
                  e.jsx("path", {
                    d: "M 575,215 Q 400,125 225,215",
                    stroke: "url(#bt_enemy_trail)",
                    strokeWidth: "6.5",
                    strokeDasharray: "120 700",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo3 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M 575,215 Q 400,125 225,215",
                    stroke: "#ffffff",
                    strokeWidth: "2.6",
                    strokeDasharray: "80 740",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_dash_p_salvo3 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }
                  }),
                  e.jsxs("g", {
                    transform: "translate(225, 215)",
                    style: { animation: "bt_burst_salvo3 0.95s ease-out forwards" },
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "16", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "30", fill: "rgba(239,68,68,0.8)" }),
                      e.jsx("circle", { cx: "0", cy: "0", r: "46", fill: "none", stroke: "#ef4444", strokeWidth: "2.5" }),
                      e.jsx("line", { x1: "-16", y1: "-16", x2: "16", y2: "16", stroke: "#fca5a5", strokeWidth: "3.5" }),
                      e.jsx("line", { x1: "16", y1: "-16", x2: "-16", y2: "16", stroke: "#fca5a5", strokeWidth: "3.5" })
                    ]
                  })
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
          }),

          // 4G. FULL SET OF SPECTACULAR ARTIFACT & SPECIAL ABILITY ACTIVATIONS
          (hoveredAbility || playerAnim === "ability") && e.jsxs("g", {
            id: "spectacular-artifact-ability-overlays",
            children: [
              // 1. AQUILA IMPERIAL VEXILLUM (Regalia / Command Banners)
              (!hoveredAbility || abKw("aquila") || hoveredAbility?.type === "relic" || abKw("flag") || abKw("standard")) && e.jsxs("g", {
                transform: "translate(400, 190)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "110", fill: "rgba(251,191,36,0.15)", stroke: "#fbbf24", strokeWidth: "2", className: "animate-ping" }),
                  e.jsx("line", { x1: "0", y1: "-80", x2: "0", y2: "70", stroke: "#78350f", strokeWidth: "6", strokeLinecap: "round" }),
                  e.jsx("polygon", { points: "-35,-55 0,-85 35,-55 25,-45 0,-60 -25,-45", fill: "#fef08a", stroke: "#b45309", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "0", cy: "-85", r: "12", fill: "#fbbf24", stroke: "#d97706", strokeWidth: "2" }),
                  e.jsx("rect", { x: "-45", y: "-45", width: "90", height: "45", fill: "rgba(126,34,206,0.9)", stroke: "#fbbf24", strokeWidth: "2.5", rx: "4" }),
                  e.jsx("text", { x: "0", y: "-18", textAnchor: "middle", fill: "#fef08a", fontSize: "16", fontFamily: "Cinzel, serif", fontWeight: "900", letterSpacing: "3", children: "S.P.Q.R." })
                ]
              }),

              // 2. FULMEN OF JUPITER (Thunderbolt Artifact)
              (abKw("fulmen") || abKw("lightning") || abKw("thunder")) && e.jsxs("g", {
                id: "fulmen-jupiter-thunderbolt",
                children: [
                  e.jsx("path", { d: "M 575,0 L 590,80 L 565,140 L 595,215", fill: "none", stroke: "rgba(56,189,248,0.9)", strokeWidth: "9", strokeLinecap: "round" }),
                  e.jsx("path", { d: "M 575,0 L 590,80 L 565,140 L 595,215", fill: "none", stroke: "#ffffff", strokeWidth: "3", strokeLinecap: "round" }),
                  e.jsx("circle", { cx: "575", cy: "215", r: "45", fill: "rgba(56,189,248,0.4)", stroke: "#38bdf8", strokeWidth: "3", className: "animate-ping" })
                ]
              }),

              // 3. TRIDENT OF NEPTUNE / ABYSSAL WHIRLPOOL
              (abKw("neptune") || abKw("trident") || abKw("sea") || abKw("kraken")) && e.jsxs("g", {
                id: "neptune-trident-whirlpool",
                children: [
                  e.jsx("ellipse", { cx: "635", cy: "215", rx: "110", ry: "55", fill: "none", stroke: "#0284c7", strokeWidth: "5", strokeDasharray: "30 15", className: "animate-spin" }),
                  e.jsxs("g", {
                    transform: "translate(635, 170)",
                    children: [
                      e.jsx("line", { x1: "0", y1: "50", x2: "0", y2: "-40", stroke: "#38bdf8", strokeWidth: "6", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -25,-20 L -25,-55 L -18,-35 L 0,-40 L 18,-35 L 25,-55 L 25,-20", fill: "none", stroke: "#fef08a", strokeWidth: "4.5", strokeLinecap: "round" })
                    ]
                  })
                ]
              }),

              // 4. FORGE OF VULCAN (Incendiary Magma & Anvil)
              (abKw("vulcan") || abKw("forge") || abKw("fire") || abKw("catapult")) && e.jsxs("g", {
                id: "vulcan-forge-strike",
                children: [
                  [115, 215, 310].map((laneY, idx) => e.jsxs("g", {
                    key: \`vulcan_\${idx}\`,
                    transform: \`translate(610, \${laneY})\`,
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "35", fill: "rgba(249,115,22,0.45)", stroke: "#f97316", strokeWidth: "3", className: "animate-pulse" }),
                      e.jsx("polygon", { points: "-15,-10 15,-10 20,10 -20,10", fill: "#78350f", stroke: "#fbbf24", strokeWidth: "1.8" }),
                      e.jsx("circle", { cx: "0", cy: "-15", r: "8", fill: "#fef08a" })
                    ]
                  }))
                ]
              }),

              // 5. SOL INVICTUS / HARUSPEX AUGURY
              (abKw("sol") || abKw("augury") || abKw("omen") || abKw("crown")) && e.jsxs("g", {
                id: "sol-invictus-corona",
                transform: "translate(165, 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "95", fill: "rgba(251,191,36,0.15)", stroke: "#fef08a", strokeWidth: "3", strokeDasharray: "12 8" }),
                  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => e.jsx("line", {
                    key: \`sol_ray_\${idx}\`,
                    x1: "0", y1: "0",
                    x2: Math.cos(deg * Math.PI / 180) * 110,
                    y2: Math.sin(deg * Math.PI / 180) * 110,
                    stroke: "#fbbf24", strokeWidth: "2.5", strokeLinecap: "round", opacity: "0.8"
                  }))
                ]
              })
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
  esbuild.transformSync(js, { loader: "js" });
  
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
