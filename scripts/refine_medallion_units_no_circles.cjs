const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== REMOVING ALL CIRCLES AROUND/UNDER UNITS & ENHANCING CENTURION HELMETS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. REWRITE renderMasterwork2DMedallionUnit (from its start to const BattleTheatreV2)
const pUnitFunc = bundle.indexOf("const renderMasterwork2DMedallionUnit =");
const pBattleTheatre = bundle.indexOf("const BattleTheatreV2 =", pUnitFunc);

if (pUnitFunc === -1 || pBattleTheatre === -1) {
  console.error("Could not find renderMasterwork2DMedallionUnit boundaries:", { pUnitFunc, pBattleTheatre });
  process.exit(1);
}

const refinedMedallionUnitCode = `const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1, unitCategory = "ship", customEmblem = "") => {
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

  const goldTrim = unitTier >= 4 ? "#fef08a" : "#fbbf24";
  const bronzeBase = "#a17e4d";
  const scutumGrad = isRoman ? "url(#shd_carm_rom)" : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const sailGrad = isRoman ? (unitTier >= 4 ? "url(#sl_prp_rom)" : "#7e22ce") : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const plumeColor = isRoman ? "#dc2626" : (isPunic ? "#9333ea" : "#2563eb");
  const armorSteel = "url(#lgn_arm_rom)";

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
      // NO CIRCLES OR SHADOW PADS UNDERNEATH - COMPLETELY CLEAN NATURAL GROUND & OCEAN INTEGRATION

      // =========================================================================
      // 1. NAVAL WARSHIP (NATURAL WATER DISPLACEMENT - NO ISOLATED BLUE BLOCKS)
      // =========================================================================
      isNaval && e.jsxs("g", {
        id: "naval-medallion-body",
        children: [
          // Natural Hydrodynamic Wave Foam & Water Contact Lines (Blends seamlessly with background sea)
          !isDead && e.jsxs("g", {
            id: "hull-sea-contact-lines",
            children: [
              e.jsx("path", {
                d: "M -55,26 Q -25,30 0,26 Q 25,30 55,26",
                fill: "none",
                stroke: "rgba(224,242,254,0.7)",
                strokeWidth: "2",
                strokeLinecap: "round"
              }),
              e.jsx("path", {
                d: "M -40,30 Q 0,35 40,30",
                fill: "none",
                stroke: "rgba(255,255,255,0.85)",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              }),
              // Prow wave crest splash
              e.jsx("path", {
                d: "M -8,24 Q 0,18 8,24",
                fill: "none",
                stroke: "#ffffff",
                strokeWidth: "2.5",
                strokeLinecap: "round"
              }),
              // Spray droplets
              [-30, -12, 12, 30].map((wx, i) => e.jsx("circle", {
                key: "foam_drop_" + i,
                cx: wx,
                cy: 28 + (i % 2) * 3,
                r: "1.2",
                fill: "#ffffff",
                opacity: "0.85"
              }))
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

          // 2.5D Ship Hull Planking & Bronze Wales
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

          // Bulwark Shields Line along Gunwales
          !isDead && e.jsxs("g", {
            id: "medallion-cataphract-shields",
            fill: goldTrim,
            stroke: "#78350f",
            strokeWidth: "0.8",
            children: [
              [-36, -26, -16, 16, 26, 36].map((sx, i) => e.jsx("rect", { key: "shd_" + i, x: sx - 4, y: "5", width: "8", height: "10", rx: "2", fill: isRoman ? "url(#shd_carm_rom)" : (isPunic ? "#701a75" : "#1e3a8a") })),
              [-36, -26, -16, 16, 26, 36].map((sx, i) => e.jsx("circle", { key: "shd_b_" + i, cx: sx, cy: "10", r: "1.6", fill: goldTrim }))
            ]
          }),

          // Gilded Roman Bronze Rostrum Ram
          e.jsxs("g", {
            id: "medallion-rostrum-ram",
            children: [
              e.jsx("polygon", { points: "0,16 -7,26 7,26", fill: "url(#rst_bz_rom)", stroke: "#78350f", strokeWidth: "1.2" }),
              e.jsx("polygon", { points: "0,28 -5,24 0,18 5,24", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2" }),
              e.jsx("circle", { cx: "0", cy: "22", r: "2.4", fill: "#b45309", stroke: "#fef08a", strokeWidth: "0.8" }),
              e.jsx("circle", { cx: "0", cy: "22", r: "1.2", fill: "#000000" })
            ]
          }),

          // Rigging, Mast & Billowing Imperial Mainsail with SPQR Emblem
          e.jsxs("g", {
            id: "medallion-mainsail-system",
            children: [
              e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "-48", stroke: "#451a03", strokeWidth: "4.5", strokeLinecap: "round" }),
              e.jsx("line", { x1: "-1", y1: "-4", x2: "-1", y2: "-48", stroke: goldTrim, strokeWidth: "1" }),
              e.jsx("line", { x1: "0", y1: "-46", x2: "-46", y2: "4", stroke: "rgba(254,240,138,0.4)", strokeWidth: "1" }),
              e.jsx("line", { x1: "0", y1: "-46", x2: "46", y2: "4", stroke: "rgba(254,240,138,0.4)", strokeWidth: "1" }),
              e.jsx("line", { x1: "-38", y1: "-44", x2: "38", y2: "-44", stroke: "#78350f", strokeWidth: "3", strokeLinecap: "round" }),

              // Mainsail Canvas
              e.jsx("path", {
                d: "M -34,-42 C -18,-46 18,-46 34,-42 C 40,-24 36,-6 28,-2 C 14,2 -14,2 -28,-2 C -36,-6 -40,-24 -34,-42 Z",
                fill: sailGrad,
                stroke: goldTrim,
                strokeWidth: "1.5"
              }),
              e.jsx("path", {
                d: "M -26,-38 C -14,-41 14,-41 26,-38 C 30,-22 28,-8 22,-5 C 10,-2 -10,-2 -22,-5 C -28,-8 -30,-22 -26,-38 Z",
                fill: "rgba(255,255,255,0.12)"
              }),

              // Imperial Roman Laurel Wreath & SPQR Monogram on Sail
              isRoman ? e.jsxs("g", {
                transform: "translate(0, -22)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "none", stroke: goldTrim, strokeWidth: "1.8", strokeDasharray: "5 2.5" }),
                  e.jsx("text", {
                    x: "0",
                    y: "3",
                    textAnchor: "middle",
                    fill: goldTrim,
                    fontSize: "7.5",
                    fontFamily: "Cinzel, serif",
                    fontWeight: "900",
                    letterSpacing: "0.8",
                    children: "SPQR"
                  })
                ]
              }) : (isPunic ? e.jsxs("g", {
                transform: "translate(0, -22)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "-2", r: "5", fill: "#fbbf24" }),
                  e.jsx("path", { d: "M -7 3 Q 0 8 7 3 Q 0 5 -7 3 Z", fill: "#fbbf24" })
                ]
              }) : e.jsxs("g", {
                transform: "translate(0, -22)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "7", fill: "none", stroke: "#ffffff", strokeWidth: "1.5" }),
                  e.jsx("line", { x1: "0", y1: "-8", x2: "0", y2: "8", stroke: "#ffffff", strokeWidth: "1.8" })
                ]
              })),

              // Masthead Vexillum Pennant
              e.jsxs("g", {
                transform: "translate(0, -48)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "2.5", fill: goldTrim }),
                  e.jsx("polygon", { points: isPlayer ? "0,0 18,-3 0,-6" : "0,0 -18,-3 0,-6", fill: "#dc2626", stroke: goldTrim, strokeWidth: "0.6" })
                ]
              })
            ]
          })
        ]
      }),

      // =========================================================================
      // 2. LEGIONARY COHORT (PROMINENT CENTURION HELMETS & ARMORED SHOULDERS)
      // =========================================================================
      !isNaval && e.jsxs("g", {
        id: "legion-medallion-body",
        children: [
          // Dual Crossed Roman Pila Spears / Steel Gladius
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

          // PROMINENT CENTURION & LEGIONARY HELMET (GALEA) & ARMORED SHOULDERS
          !isDead && e.jsxs("g", {
            id: "medallion-centurion-galea-prominent",
            transform: "translate(0, -28)",
            children: [
              // Armored Shoulders (Humeralia & Lorica Segmentata Plates)
              e.jsx("path", {
                d: "M -28,14 Q -14,4 0,6 Q 14,4 28,14 L 26,22 Q 0,18 -26,22 Z",
                fill: armorSteel,
                stroke: goldTrim,
                strokeWidth: "1.4"
              }),
              // Leather Pteruges Straps
              [-18, -9, 9, 18].map((px, pi) => e.jsx("line", {
                key: "ptg_leg_" + pi,
                x1: px,
                y1: "20",
                x2: px,
                y2: "26",
                stroke: "#78350f",
                strokeWidth: "2"
              })),

              // Polished Bronze Roman Galea Dome Helmet
              e.jsx("ellipse", { cx: "0", cy: "2", rx: "11", ry: "10", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.4" }),
              // Brow Guard (Visiere) & Nasal Protector
              e.jsx("path", { d: "M -10 2 Q 0 -3 10 2", fill: "none", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
              e.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "9", stroke: "#78350f", strokeWidth: "2" }),

              // Hinged Cheek Guards (Paragnathides) on Left & Right
              e.jsx("polygon", { points: "-10,2 -14,11 -8,11", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),
              e.jsx("polygon", { points: "10,2 14,11 8,11", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),

              // Sweeping Transverse Red Horsehair Crest (Crista Transversa) for Centurions / Plume for Legionaries
              isFlag ? e.jsxs("g", {
                // Centurion Wide Sweeping Crimson Crest
                transform: "translate(0, -8)",
                children: [
                  e.jsx("rect", { x: "-8", y: "0", width: "16", height: "4.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1", rx: "1" }),
                  e.jsx("path", {
                    d: "M -28,-2 Q 0,-18 28,-2 Q 22,5 0,-1 Q -22,5 -28,-2 Z",
                    fill: plumeColor,
                    stroke: "#991b1b",
                    strokeWidth: "1.2"
                  }),
                  // Bristle Highlights
                  [-20, -14, -7, 7, 14, 20].map((hx, hi) => e.jsx("line", {
                    key: "crest_hair_pt_" + hi,
                    x1: hx,
                    y1: "-3",
                    x2: hx * 1.15,
                    y2: "-10",
                    stroke: "#fca5a5",
                    strokeWidth: "1.2"
                  }))
                ]
              }) : e.jsxs("g", {
                // Legionary Longitudinal Plume
                transform: "translate(0, -8)",
                children: [
                  e.jsx("rect", { x: "-4", y: "0", width: "8", height: "3.5", fill: goldTrim }),
                  e.jsx("ellipse", { cx: "0", cy: "-6", rx: "7", ry: "8", fill: plumeColor, stroke: "#991b1b", strokeWidth: "1" })
                ]
              })
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

              // Central Bronze Umbo Boss (Winged Fulmen Medallion)
              e.jsx("ellipse", { cx: "0", cy: "11", rx: "10", ry: "8", fill: "url(#rst_bz_rom)", stroke: "#78350f", strokeWidth: "1.4" }),
              e.jsx("circle", { cx: "0", cy: "11", r: "3.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),

              // Winged Jupiter Fulmen Lightning Bolts
              e.jsx("path", { d: "M -14,0 L 0,6 L 14,0 M -14,22 L 0,16 L 14,22", fill: "none", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" }),
              e.jsx("path", { d: "M -10,-4 L 0,4 L 10,-4 M -10,26 L 0,18 L 10,26", fill: "none", stroke: goldTrim, strokeWidth: "1.2", strokeLinecap: "round" }),

              // Corner Reinforcement Brackets
              e.jsx("path", { d: "M -23,-13 L -23,-17 L -18,-17", fill: "none", stroke: goldTrim, strokeWidth: "2" }),
              e.jsx("path", { d: "M 23,-13 L 23,-17 L 18,-17", fill: "none", stroke: goldTrim, strokeWidth: "2" }),
              e.jsx("path", { d: "M -23,35 L -23,39 L -18,39", fill: "none", stroke: goldTrim, strokeWidth: "2" }),
              e.jsx("path", { d: "M 23,35 L 23,39 L 18,39", fill: "none", stroke: goldTrim, strokeWidth: "2" })
            ]
          })
        ]
      }),

      // =========================================================================
      // 3. PROGRESSIVE VISCERAL DAMAGE TIERS (PRESERVED)
      // =========================================================================
      (hpPct < 90) && e.jsxs("g", {
        id: isNaval ? "status-fx-ship-tier1" : "status-fx-legion-tier1",
        children: [
          [-35, -15, 10, 30].map((ax, i) => e.jsxs("g", {
            key: "dmg_hit_" + i,
            transform: "translate(" + ax + ", 6) rotate(" + (i % 2 === 0 ? 30 : -25) + ")",
            children: [
              e.jsx("line", { x1: "0", y1: "0", x2: "-14", y2: "0", stroke: "#78350f", strokeWidth: "1.8" }),
              e.jsx("polygon", { points: "0,0 -3,-2 -3,2", fill: "#94a3b8" }),
              e.jsx("path", { d: "M -14 0 L -18 -3 M -14 0 L -18 3", stroke: "#ef4444", strokeWidth: "1.2" })
            ]
          }))
        ]
      }),

      (hpPct < 75) && e.jsxs("g", {
        id: isNaval ? "status-fx-ship-tier2" : "status-fx-legion-tier2",
        children: [
          isNaval ? e.jsxs("g", {
            children: [
              [-30, 0, 30].map((ox, i) => e.jsx("line", { key: "oar_d_" + i, x1: ox, y1: "12", x2: ox - 10, y2: "20", stroke: "#451a03", strokeWidth: "2.8", strokeDasharray: "5 3" })),
              e.jsx("path", { d: "M -18 -35 L -10 -20 L -15 -10", fill: "none", stroke: "#0c0a09", strokeWidth: "3.5" })
            ]
          }) : e.jsxs("g", {
            children: [
              e.jsx("ellipse", { cx: "-12", cy: "28", rx: "18", ry: "6", fill: "#7f1d1d", opacity: "0.9" }),
              e.jsx("ellipse", { cx: "14", cy: "29", rx: "14", ry: "5", fill: "#991b1b", opacity: "0.85" })
            ]
          })
        ]
      }),

      (hpPct < 55) && e.jsxs("g", {
        id: isNaval ? "status-fx-ship-tier3" : "status-fx-legion-tier3",
        children: [
          [-20, 15].map((smkX, i) => e.jsx("circle", {
            key: "smoke_c_" + i,
            cx: smkX,
            cy: -15 - i * 10,
            r: 10 + i * 4,
            fill: "rgba(41,37,36,0.85)",
            className: "animate-ping"
          })),
          e.jsx("path", { d: "M -25 8 Q -15 -10 0 8 Q 15 -12 25 8 Z", fill: "url(#grad-greek-fire)", opacity: "0.95", className: "animate-pulse" })
        ]
      }),

      (hpPct < 35) && e.jsxs("g", {
        id: isNaval ? "status-fx-ship-tier4" : "status-fx-legion-tier4",
        children: [
          isNaval ? e.jsx("line", { x1: "0", y1: "-25", x2: "28", y2: "-15", stroke: "#451a03", strokeWidth: "5", strokeLinecap: "round" }) : null,
          e.jsx("path", { d: "M -40 10 Q -20 -25 0 10 Q 20 -30 40 10 Z", fill: "#ef4444", opacity: "0.85", className: "animate-bounce" }),
          [-30, -10, 10, 30].map((cx, i) => e.jsx("circle", {
            key: "ember_c_" + i,
            cx: cx,
            cy: -15 - (i % 3) * 8,
            r: "2.8",
            fill: "#fef08a",
            className: "animate-ping"
          }))
        ]
      }),

      (hpPct < 15) && e.jsxs("g", {
        id: isNaval ? "status-fx-ship-tier5" : "status-fx-legion-tier5",
        children: [
          e.jsx("ellipse", { cx: "0", cy: "22", rx: "45", ry: "10", fill: "rgba(69,10,10,0.95)" })
        ]
      })
    ]
  });
};

`;

bundle = bundle.substring(0, pUnitFunc) + refinedMedallionUnitCode + bundle.substring(pBattleTheatre);

// 2. ELIMINATE CIRCLES IN player-multi-aegis-wall AND enemy-multi-aegis-wall
const pAegis = bundle.indexOf('isPlayerDefending && e.jsxs("g", {\n            id: "player-multi-aegis-wall"');
const pAegisEnd = bundle.indexOf('// 4G. FULL SET OF SPECTACULAR ARTIFACT', pAegis);

if (pAegis !== -1 && pAegisEnd !== -1) {
  const masterworkTestudoBarrier = `isPlayerDefending && e.jsxs("g", {
            id: "player-multi-aegis-wall",
            style: { animation: "bt_scutum_wall_pulse 1.8s ease-in-out infinite" },
            children: [
              // Linear Testudo Scutum Barrier in Front of Fleet / Legion (NO CIRCLES AROUND MODELS)
              [ { x: 195, y: 115 }, { x: 250, y: 215 }, { x: 195, y: 310 } ].map((pos, idx) => e.jsxs("g", {
                key: "p_testudo_barrier_" + idx,
                transform: "translate(" + pos.x + ", " + pos.y + ")",
                children: [
                  e.jsx("rect", { x: "-6", y: "-36", width: "16", height: "72", rx: "3", fill: "url(#shd_carm_rom)", stroke: "#fbbf24", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "2", cy: "0", r: "5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
                  e.jsx("line", { x1: "-4", y1: "-38", x2: "-4", y2: "38", stroke: "#fef08a", strokeWidth: "3", strokeLinecap: "round" }),
                  [-18, 0, 18].map((spY, si) => e.jsx("circle", {
                    key: "spark_def_" + si,
                    cx: "12",
                    cy: spY,
                    r: "2.5",
                    fill: "#fef08a",
                    className: "animate-ping"
                  }))
                ]
              }))
            ]
          }),

          isEnemyDefending && e.jsxs("g", {
            id: "enemy-multi-aegis-wall",
            style: { animation: "bt_scutum_wall_pulse 1.8s ease-in-out infinite" },
            children: [
              // Linear Testudo Scutum Barrier for Enemy (NO CIRCLES AROUND MODELS)
              [ { x: 605, y: 115 }, { x: 550, y: 215 }, { x: 605, y: 310 } ].map((pos, idx) => e.jsxs("g", {
                key: "e_testudo_barrier_" + idx,
                transform: "translate(" + pos.x + ", " + pos.y + ")",
                children: [
                  e.jsx("rect", { x: "-10", y: "-36", width: "16", height: "72", rx: "3", fill: "#450a0a", stroke: "#ef4444", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "-2", cy: "0", r: "5", fill: "#f87171", stroke: "#450a0a", strokeWidth: "1" }),
                  e.jsx("line", { x1: "4", y1: "-38", x2: "4", y2: "38", stroke: "#ef4444", strokeWidth: "3", strokeLinecap: "round" }),
                  [-18, 0, 18].map((spY, si) => e.jsx("circle", {
                    key: "e_spark_def_" + si,
                    cx: "-12",
                    cy: spY,
                    r: "2.5",
                    fill: "#fca5a5",
                    className: "animate-ping"
                  }))
                ]
              }))
            ]
          }),

          `;
  bundle = bundle.substring(0, pAegis) + masterworkTestudoBarrier + bundle.substring(pAegisEnd);
  console.log("SUCCESS: Replaced circular aegis wall with linear Testudo Scutum barrier.");
}

try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js validated and saved.");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
