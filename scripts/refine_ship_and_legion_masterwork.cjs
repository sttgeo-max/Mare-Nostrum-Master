const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== REFINING SHIPS (INTEGRATED WATER, NO CIRCLES) & LEGIONS (CENTURION HELMETS) ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const pShipStart = bundle.indexOf("const render2DShip =");
const pLegionStart = bundle.indexOf("const render2DLegion =", pShipStart);
const pNextFunc = bundle.indexOf("const render2DPoseidonAvatar =", pLegionStart);

if (pShipStart === -1 || pLegionStart === -1 || pNextFunc === -1) {
  console.error("Could not find boundaries:", { pShipStart, pLegionStart, pNextFunc });
  process.exit(1);
}

const refinedShipAndLegionCode = `const render2DShip = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship";
  const flip = isPlayer ? 1 : -1;
  const shipTier = Math.min(5, Math.max(1, tier || 1));
  const isRoman = faction === "roman" || faction === "player";
  const isPunic = faction === "punic";
  const isGreek = faction === "greek";

  const sailGrad = isRoman
    ? (shipTier >= 4 ? "url(#sl_prp_rom)" : "#7e22ce")
    : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const hullWoodL = isRoman ? "url(#hl_wd_l_rom)" : "#451a03";
  const hullWoodR = isRoman ? "url(#hl_wd_r_rom)" : "#78350f";
  const ramBronze = "url(#rst_bz_rom)";
  const goldTrim = shipTier >= 4 ? "#fef08a" : "#fbbf24";

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_ship_death_sink 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // 1. NATURAL SEA INTEGRATION (NO CIRCLES, NO CUTOUT WATER BLOCK - SEAMLESS WAVE CONTACT)
      !isDead && e.jsxs("g", {
        id: "seamless-hull-sea-contact",
        children: [
          // Dynamic translucent water contact ripples
          e.jsx("path", {
            d: "M -55,24 Q -25,28 0,24 Q 25,28 55,24",
            fill: "none",
            stroke: "rgba(224,242,254,0.65)",
            strokeWidth: "2",
            strokeLinecap: "round"
          }),
          e.jsx("path", {
            d: "M -40,28 Q 0,33 40,28",
            fill: "none",
            stroke: "rgba(255,255,255,0.75)",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }),
          // Hydrodynamic prow bow splash
          e.jsx("path", {
            d: "M -6,22 Q 0,16 6,22",
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: "2.5",
            strokeLinecap: "round"
          }),
          // Fine sea spray droplets
          [-28, -12, 14, 30].map((dx, di) => e.jsx("circle", {
            key: "spray_" + di,
            cx: dx,
            cy: 25 + (di % 2) * 3,
            r: "1.2",
            fill: "#ffffff",
            opacity: "0.8"
          }))
        ]
      }),

      // 2. Synchronized Rowers / Dual-Bank Oar Sweeps (Remi)
      !isDead && e.jsxs("g", {
        id: "medallion-oar-banks",
        children: (isFlag
          ? [-48, -36, -24, -12, 0, 12, 24, 36, 48]
          : [-36, -24, -12, 0, 12, 24, 36]
        ).map((ox, idx) => {
          const isLeft = ox < 0;
          return e.jsxs("g", {
            key: "oar_rem_" + idx,
            children: [
              // Upper Oar Loom
              e.jsx("line", {
                x1: ox,
                y1: 10 + Math.abs(ox) * 0.12,
                x2: ox + (isLeft ? -14 : 14),
                y2: 24 + Math.abs(ox) * 0.15,
                stroke: "#d97706",
                strokeWidth: "2.4",
                strokeLinecap: "round"
              }),
              // Gilded Bronze Oar Blade
              e.jsx("polygon", {
                points: (ox + (isLeft ? -12 : 12)) + "," + (22 + Math.abs(ox) * 0.15) + " " + (ox + (isLeft ? -18 : 18)) + "," + (27 + Math.abs(ox) * 0.15) + " " + (ox + (isLeft ? -14 : 14)) + "," + (28 + Math.abs(ox) * 0.15),
                fill: goldTrim,
                stroke: "#78350f",
                strokeWidth: "0.6"
              }),
              // Lower Oar Loom
              e.jsx("line", {
                x1: ox + (isLeft ? -3 : 3),
                y1: 14 + Math.abs(ox) * 0.12,
                x2: ox + (isLeft ? -11 : 11),
                y2: 26 + Math.abs(ox) * 0.15,
                stroke: "#92400e",
                strokeWidth: "1.8",
                strokeLinecap: "round"
              })
            ]
          });
        })
      }),

      // 3. 2.5D Warship Hull & Bulwarks (Layered Wood Planking & Bronze Wales)
      e.jsxs("g", {
        id: "medallion-warship-hull",
        children: [
          // Lower Hull Left Planking
          e.jsx("path", {
            d: "M -52,14 C -36,8 -14,16 0,22 L 0,6 C -14,2 -36,-4 -52,14 Z",
            fill: hullWoodL,
            stroke: "#290e04",
            strokeWidth: "1.2"
          }),
          // Lower Hull Right Planking
          e.jsx("path", {
            d: "M 52,14 C 36,8 14,16 0,22 L 0,6 C 14,2 36,-4 52,14 Z",
            fill: hullWoodR,
            stroke: "#290e04",
            strokeWidth: "1.2"
          }),
          // Upper Deck Bulwarks & Gunwale Trim
          e.jsx("path", {
            d: "M -54,12 C -36,4 -14,12 0,16 C 14,12 36,4 54,12 L 50,7 C 34,0 14,8 0,11 C -14,8 -34,0 -50,7 Z",
            fill: goldTrim,
            stroke: "#78350f",
            strokeWidth: "1"
          }),
          // Central Cathead & Deck Post
          e.jsx("rect", { x: "-2.5", y: "-2", width: "5", height: "18", fill: "#451a03", stroke: goldTrim, strokeWidth: "0.8" }),
          // Bronze Railing Studs
          [-38, -26, -14, 14, 26, 38].map((rx, ri) => e.jsx("circle", {
            key: "stud_" + ri,
            cx: rx,
            cy: 8,
            r: "1.8",
            fill: goldTrim,
            stroke: "#78350f",
            strokeWidth: "0.6"
          }))
        ]
      }),

      // 4. Heavy Roman Bronze Rostrum Ram (Triple-Fluked Beak)
      e.jsxs("g", {
        id: "medallion-bronze-rostrum",
        children: [
          // Central Ramming Prow Column
          e.jsx("polygon", {
            points: "0,16 -7,26 7,26",
            fill: ramBronze,
            stroke: "#78350f",
            strokeWidth: "1.2"
          }),
          // Triple-Pronged Bronze Spike
          e.jsx("polygon", {
            points: "0,28 -5,24 0,18 5,24",
            fill: goldTrim,
            stroke: "#78350f",
            strokeWidth: "1"
          }),
          // Gorgoneion Eye Medallion on Rostrum
          e.jsx("circle", { cx: "0", cy: "22", r: "2.5", fill: "#b45309", stroke: "#fef08a", strokeWidth: "0.8" }),
          e.jsx("circle", { cx: "0", cy: "22", r: "1.2", fill: "#000000" })
        ]
      }),

      // 5. Rigging, Main Mast & Billowing Imperial Mainsail with SPQR Crest
      e.jsxs("g", {
        id: "medallion-mainsail-system",
        children: [
          // Hardwood Timber Mast with Gold Rings
          e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "-48", stroke: "#451a03", strokeWidth: "4.5", strokeLinecap: "round" }),
          e.jsx("line", { x1: "-1", y1: "-4", x2: "-1", y2: "-48", stroke: goldTrim, strokeWidth: "1" }),
          // Forestays and Shrouds Rigging Lines
          e.jsx("line", { x1: "0", y1: "-46", x2: "-46", y2: "4", stroke: "rgba(254,240,138,0.4)", strokeWidth: "1" }),
          e.jsx("line", { x1: "0", y1: "-46", x2: "46", y2: "4", stroke: "rgba(254,240,138,0.4)", strokeWidth: "1" }),
          // Cross Yardarm Spar
          e.jsx("line", { x1: "-38", y1: "-44", x2: "38", y2: "-44", stroke: "#78350f", strokeWidth: "3", strokeLinecap: "round" }),

          // Billowing Roman Imperial Mainsail
          e.jsx("path", {
            d: "M -34,-42 C -18,-46 18,-46 34,-42 C 40,-24 36,-6 28,-2 C 14,2 -14,2 -28,-2 C -36,-6 -40,-24 -34,-42 Z",
            fill: sailGrad,
            stroke: goldTrim,
            strokeWidth: "1.5"
          }),
          // Sail Depth Shadow & Inner Highlight
          e.jsx("path", {
            d: "M -26,-38 C -14,-41 14,-41 26,-38 C 30,-22 28,-8 22,-5 C 10,-2 -10,-2 -22,-5 C -28,-8 -30,-22 -26,-38 Z",
            fill: "rgba(255,255,255,0.12)"
          }),

          // Embossed Masterwork Medallion Emblem on Sail
          isRoman ? e.jsxs("g", {
            transform: "translate(0, -22)",
            children: [
              // Golden Laurel Wreath Crown
              e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "none", stroke: goldTrim, strokeWidth: "1.8", strokeDasharray: "5 2.5" }),
              // Gilded S.P.Q.R. Roman Monogram
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

          // Masthead Imperial Vexillum Pennant
          e.jsxs("g", {
            transform: "translate(0, -48)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "2.5", fill: goldTrim }),
              e.jsx("polygon", { points: isPlayer ? "0,0 18,-3 0,-6" : "0,0 -18,-3 0,-6", fill: "#dc2626", stroke: goldTrim, strokeWidth: "0.6" })
            ]
          })
        ]
      }),

      // 6. PROGRESSIVE VISCERAL DAMAGE TIERS (PRESERVED)
      (hpPct < 90) && e.jsxs("g", {
        id: "status-fx-ship-tier1",
        children: [
          [-35, -15, 10, 30].map((ax, i) => e.jsxs("g", {
            key: "arr_hit_" + i,
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
        id: "status-fx-ship-tier2",
        children: [
          [-30, 0, 30].map((ox, i) => e.jsxs("g", {
            key: "oar_debris_" + i,
            children: [
              e.jsx("line", { x1: ox, y1: "12", x2: ox - 10, y2: "20", stroke: "#451a03", strokeWidth: "2.8", strokeDasharray: "5 3" }),
              e.jsx("polygon", { points: (ox - 8) + ",18 " + (ox - 4) + ",22 " + (ox - 12) + ",22", fill: "#d97706" })
            ]
          })),
          e.jsx("path", { d: "M -18 -35 L -10 -20 L -15 -10", fill: "none", stroke: "#0c0a09", strokeWidth: "3.5" })
        ]
      }),

      (hpPct < 55) && e.jsxs("g", {
        id: "status-fx-ship-tier3",
        children: [
          [-20, 15].map((smkX, i) => e.jsx("circle", {
            key: "smoke_cloud_" + i,
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
        id: "status-fx-ship-tier4",
        children: [
          e.jsx("line", { x1: "0", y1: "-25", x2: "28", y2: "-15", stroke: "#451a03", strokeWidth: "5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M -40 10 Q -20 -25 0 10 Q 20 -30 40 10 Z", fill: "#ef4444", opacity: "0.85", className: "animate-bounce" }),
          [-30, -10, 10, 30].map((cx, i) => e.jsx("circle", {
            key: "ember_" + i,
            cx: cx,
            cy: -15 - (i % 3) * 8,
            r: "2.8",
            fill: "#fef08a",
            className: "animate-ping"
          }))
        ]
      }),

      (hpPct < 15) && e.jsxs("g", {
        id: "status-fx-ship-tier5",
        children: [
          e.jsx("ellipse", { cx: "0", cy: "15", rx: "65", ry: "14", fill: "rgba(3,105,161,0.7)" })
        ]
      })
    ]
  });
};

const render2DLegion = (x, y, isPlayer, role = "cohort", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isCommander = role === "flagship" || role === "commander" || role === "centurion" || role === "legatus";
  const flip = isPlayer ? 1 : -1;
  const legionTier = Math.min(5, Math.max(1, tier || 1));
  const isRoman = faction === "roman" || faction === "player";
  const isPunic = faction === "punic";
  const isGreek = faction === "greek";

  const scutumGrad = isRoman ? "url(#shd_carm_rom)" : (isPunic ? "#701a75" : isGreek ? "#1e3a8a" : "#451a03");
  const goldTrim = legionTier >= 4 ? "#fef08a" : "#fbbf24";
  const plumeColor = isRoman ? "#dc2626" : (isPunic ? "#9333ea" : "#2563eb");
  const armorSteel = "url(#lgn_arm_rom)";

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // NO CIRCLE SHADOW UNDERNEATH (CLEAN TERRAIN INTEGRATION)

      // 1. Dual Crossed Roman Pila Spears / Steel Gladius
      !isDead && e.jsxs("g", {
        id: "medallion-crossed-weapons",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          e.jsx("line", { x1: "-34", y1: "-34", x2: "34", y2: "34", stroke: "#78350f", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "-34,-34 -26,-37 -31,-28", fill: "#e2e8f0", stroke: "#475569", strokeWidth: "1" }),
          e.jsx("line", { x1: "34", y1: "-34", x2: "-34", y2: "34", stroke: "#78350f", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "34,-34 26,-37 31,-28", fill: "#e2e8f0", stroke: "#475569", strokeWidth: "1" })
        ]
      }),

      // 2. ROMAN CENTURION / LEGIONARY HELMET (GALEA) & ARMORED SHOULDERS (RISING BEHIND SHIELD)
      !isDead && e.jsxs("g", {
        id: "centurion-galea-helmet-system",
        transform: "translate(0, -26)",
        children: [
          // Armored Shoulders (Humeralia & Lorica Segmentata Plates)
          e.jsx("path", {
            d: "M -24,10 Q -12,2 0,4 Q 12,2 24,10 L 22,18 Q 0,14 -22,18 Z",
            fill: armorSteel,
            stroke: goldTrim,
            strokeWidth: "1.2"
          }),
          // Leather Pteruges Straps
          [-16, -8, 8, 16].map((px, pi) => e.jsx("line", {
            key: "ptg_" + pi,
            x1: px,
            y1: "16",
            x2: px,
            y2: "22",
            stroke: "#78350f",
            strokeWidth: "2"
          })),

          // Bronze Roman Galea Dome Helmet
          e.jsx("ellipse", { cx: "0", cy: "2", rx: "9", ry: "8", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2" }),
          // Brow Guard (Visiere) & Nose Guard
          e.jsx("path", { d: "M -8 2 Q 0 -2 8 2", fill: "none", stroke: "#78350f", strokeWidth: "1.8", strokeLinecap: "round" }),
          e.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "7", stroke: "#78350f", strokeWidth: "1.5" }),

          // Hinged Cheek Guards (Paragnathides) on Left & Right
          e.jsx("polygon", { points: "-8,2 -11,9 -6,9", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
          e.jsx("polygon", { points: "8,2 11,9 6,9", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),

          // Majestic Transverse Red Horsehair Crest (Crista Transversa) for Centurions / Plume for Legionaries
          isCommander ? e.jsxs("g", {
            // Centurion / Officer Transverse Sweeping Red Crest
            transform: "translate(0, -6)",
            children: [
              // Gilded Crest Box Mount
              e.jsx("rect", { x: "-6", y: "0", width: "12", height: "4", fill: "#fef08a", stroke: "#78350f", strokeWidth: "0.8", rx: "1" }),
              // Full Sweeping Horsehair Plume Arc
              e.jsx("path", {
                d: "M -22,-2 Q 0,-14 22,-2 Q 18,3 0,-1 Q -18,3 -22,-2 Z",
                fill: plumeColor,
                stroke: "#991b1b",
                strokeWidth: "1"
              }),
              // Feather & Bristle Highlights
              [-16, -10, -4, 4, 10, 16].map((hx, hi) => e.jsx("line", {
                key: "crest_hair_" + hi,
                x1: hx,
                y1: "-3",
                x2: hx * 1.15,
                y2: "-8",
                stroke: "#fca5a5",
                strokeWidth: "1"
              }))
            ]
          }) : e.jsxs("g", {
            // Rank-and-File Legionary Longitudinal Plume
            transform: "translate(0, -6)",
            children: [
              e.jsx("rect", { x: "-2", y: "0", width: "4", height: "3", fill: goldTrim }),
              e.jsx("ellipse", { cx: "0", cy: "-4", rx: "5", ry: "6", fill: plumeColor, stroke: "#991b1b", strokeWidth: "0.8" })
            ]
          })
        ]
      }),

      // 3. Curved Roman Scutum Shield with Winged Jupiter Thunderbolts
      e.jsxs("g", {
        id: "medallion-roman-scutum-body",
        children: [
          // Carmine Scutum Shield Body
          e.jsx("rect", {
            x: "-24",
            y: "-26",
            width: "48",
            height: "56",
            rx: "6",
            fill: scutumGrad,
            stroke: goldTrim,
            strokeWidth: "2"
          }),
          // Inner Gilded Border Rim
          e.jsx("rect", {
            x: "-21",
            y: "-23",
            width: "42",
            height: "50",
            rx: "4",
            fill: "none",
            stroke: goldTrim,
            strokeWidth: "1",
            opacity: "0.7"
          }),

          // Central Embossed Bronze Umbo Boss (Winged Fulmen Medallion)
          e.jsx("ellipse", { cx: "0", cy: "2", rx: "10", ry: "7", fill: "url(#rst_bz_rom)", stroke: "#78350f", strokeWidth: "1.2" }),
          e.jsx("circle", { cx: "0", cy: "2", r: "3.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),

          // Winged Jupiter Fulmen Lightning Bolts (Upper & Lower Wings)
          e.jsx("path", {
            d: "M -14,-10 L 0,-4 L 14,-10 M -14,14 L 0,8 L 14,14",
            fill: "none",
            stroke: goldTrim,
            strokeWidth: "1.8",
            strokeLinecap: "round"
          }),
          e.jsx("path", {
            d: "M -10,-14 L 0,-6 L 10,-14 M -10,18 L 0,10 L 10,18",
            fill: "none",
            stroke: goldTrim,
            strokeWidth: "1.2",
            strokeLinecap: "round"
          }),

          // Corner Bronze Reinforcement Brackets
          e.jsx("path", { d: "M -23,-20 L -23,-25 L -18,-25", fill: "none", stroke: goldTrim, strokeWidth: "2" }),
          e.jsx("path", { d: "M 23,-20 L 23,-25 L 18,-25", fill: "none", stroke: goldTrim, strokeWidth: "2" }),
          e.jsx("path", { d: "M -23,24 L -23,29 L -18,29", fill: "none", stroke: goldTrim, strokeWidth: "2" }),
          e.jsx("path", { d: "M 23,24 L 23,29 L 18,29", fill: "none", stroke: goldTrim, strokeWidth: "2" })
        ]
      }),

      // 4. PROGRESSIVE CASUALTY & GORE TIERS (PRESERVED)
      (hpPct < 90) && e.jsxs("g", {
        id: "status-fx-legion-tier1",
        children: [
          [-16, 8, 18].map((px, i) => e.jsxs("g", {
            key: "stuck_pilum_" + i,
            transform: "translate(" + px + ", 6) rotate(" + (i % 2 === 0 ? 25 : -35) + ")",
            children: [
              e.jsx("line", { x1: "0", y1: "-18", x2: "0", y2: "6", stroke: "#78350f", strokeWidth: "2" }),
              e.jsx("line", { x1: "0", y1: "-18", x2: "0", y2: "-24", stroke: "#94a3b8", strokeWidth: "1.2" })
            ]
          }))
        ]
      }),

      (hpPct < 75) && e.jsxs("g", {
        id: "status-fx-legion-tier2",
        children: [
          e.jsx("ellipse", { cx: "-12", cy: "28", rx: "18", ry: "6", fill: "#7f1d1d", opacity: "0.9" }),
          e.jsx("ellipse", { cx: "14", cy: "29", rx: "14", ry: "5", fill: "#991b1b", opacity: "0.85" }),
          e.jsxs("g", {
            transform: "translate(-18, 26) rotate(35)",
            children: [
              e.jsx("rect", { x: "-5", y: "-8", width: "10", height: "16", rx: "2", fill: scutumGrad, stroke: "#000", strokeWidth: "1" }),
              e.jsx("line", { x1: "-5", y1: "0", x2: "5", y2: "3", stroke: "#000", strokeWidth: "2" })
            ]
          })
        ]
      }),

      (hpPct < 55) && e.jsxs("g", {
        id: "status-fx-legion-tier3",
        children: [
          e.jsxs("g", {
            transform: "translate(-6, 26)",
            children: [
              e.jsx("ellipse", { cx: "0", cy: "3", rx: "20", ry: "7", fill: "#450a0a" }),
              e.jsx("rect", { x: "-10", y: "-2", width: "20", height: "6", rx: "2", fill: "#991b1b" }),
              e.jsx("circle", { cx: "-12", cy: "-2", r: "3.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" })
            ]
          })
        ]
      }),

      (hpPct < 35) && e.jsxs("g", {
        id: "status-fx-legion-tier4",
        children: [
          e.jsxs("g", {
            transform: "translate(16, 27)",
            children: [
              e.jsx("ellipse", { cx: "0", cy: "3", rx: "16", ry: "6", fill: "#7f1d1d" }),
              e.jsx("rect", { x: "-8", y: "-2", width: "16", height: "5", rx: "1", fill: "#1c1917" })
            ]
          }),
          [-20, 0, 20].map((sx, i) => e.jsx("ellipse", {
            key: "carnage_splat_" + i,
            cx: sx,
            cy: 28,
            rx: "7",
            ry: "3",
            fill: "rgba(185,28,28,0.9)"
          }))
        ]
      }),

      (hpPct < 15) && e.jsxs("g", {
        id: "status-fx-legion-tier5",
        children: [
          e.jsx("ellipse", { cx: "0", cy: "28", rx: "45", ry: "10", fill: "rgba(69,10,10,0.95)" })
        ]
      })
    ]
  });
};
`;

bundle = bundle.substring(0, pShipStart) + refinedShipAndLegionCode + bundle.substring(pNextFunc);

try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js updated with refined ships and centurion-helmeted legions!");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
