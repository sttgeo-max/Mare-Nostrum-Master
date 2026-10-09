const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== TRANSFORMING COMBAT THEATRE TO 2.5D MASTERWORK MEDALLION MODELS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const pShipStart = bundle.indexOf("const render2DShip =");
const pLegionStart = bundle.indexOf("const render2DLegion =", pShipStart);
const pNextFunc = bundle.indexOf("const render2DPoseidonAvatar =", pLegionStart);

if (pShipStart === -1 || pLegionStart === -1 || pNextFunc === -1) {
  console.error("Could not find function boundaries in bundle:", { pShipStart, pLegionStart, pNextFunc });
  process.exit(1);
}

const masterwork25DEngine = `const render2DShip = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship";
  const flip = isPlayer ? 1 : -1;
  const shipTier = Math.min(5, Math.max(1, tier || 1));
  const isBarb = faction === "barbarian" || faction === "vandal" || faction === "hostis";
  const isPunic = faction === "punic" || faction === "carthage";
  const isGreek = faction === "greek" || faction === "ptolemaic";

  // Masterwork Medallion Palette & Relief Colors
  const hullPlankDark = isPlayer
    ? (shipTier >= 4 ? "#290e04" : "#3b1506")
    : (isBarb ? "#18110c" : isPunic ? "#2d0a38" : isGreek ? "#0a192f" : "#241209");

  const hullPlankMid = isPlayer
    ? (shipTier >= 4 ? "#632709" : "#7c310c")
    : (isBarb ? "#362214" : isPunic ? "#531864" : isGreek ? "#132c4e" : "#4a2412");

  const hullPlankLight = isPlayer
    ? (shipTier >= 4 ? "#944516" : "#aa4f19")
    : (isBarb ? "#523722" : isPunic ? "#7b2594" : isGreek ? "#1d4474" : "#69361c");

  const bronzeGold = isPlayer
    ? (shipTier >= 4 ? "#fef08a" : "#fbbf24")
    : (isBarb ? "#94a3b8" : isPunic ? "#fbbf24" : isGreek ? "#67e8f9" : "#e2e8f0");

  const bronzeDark = isPlayer
    ? "#92400e"
    : (isBarb ? "#334155" : isPunic ? "#78350f" : isGreek ? "#0e7490" : "#475569");

  const sailPrimary = isPlayer
    ? (shipTier >= 5 ? "#4a044e" : shipTier >= 3 ? "#7f1d1d" : "#991b1b")
    : (isBarb ? "#44403c" : isPunic ? "#581c87" : isGreek ? "#0369a1" : "#78350f");

  const sailHighlight = isPlayer
    ? (shipTier >= 5 ? "#701a75" : shipTier >= 3 ? "#991b1b" : "#b91c1c")
    : (isBarb ? "#57534e" : isPunic ? "#7e22ce" : isGreek ? "#0284c7" : "#92400e");

  const sailEmblemColor = isPlayer ? "#fde047" : (isBarb ? "#dc2626" : isPunic ? "#fbbf24" : "#ffffff");

  // Dimensional sizes for 2.5D hull
  const bowLength = isFlag ? 160 : 120;
  const sternLength = isFlag ? -125 : -95;
  const hullH = isFlag ? 36 : 28;

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.85))"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : ""),
    children: [
      // 1. 2.5D HYDRODYNAMIC WATER FOAM WAKE & DISPLACEMENT
      !isDead && e.jsxs("g", {
        id: "v33_water_wake_25d",
        children: [
          e.jsx("ellipse", { cx: "-5", cy: "30", rx: isFlag ? "160" : "120", ry: isFlag ? "26" : "18", fill: "rgba(14,165,233,0.22)", className: "animate-pulse" }),
          e.jsx("ellipse", { cx: "10", cy: "27", rx: isFlag ? "130" : "95", ry: isFlag ? "16" : "12", fill: "rgba(224,242,254,0.4)" }),
          e.jsx("path", {
            d: "M " + (bowLength - 40) + " 22 Q " + (bowLength + 25) + " 28 " + (bowLength + 45) + " 36 Q " + (bowLength + 10) + " 34 " + (bowLength - 20) + " 26 Z",
            fill: "rgba(255,255,255,0.8)"
          }),
          e.jsx("path", {
            d: "M " + (sternLength - 10) + " 22 Q " + (sternLength - 50) + " 30 " + (sternLength - 70) + " 38 Q " + (sternLength - 35) + " 32 " + sternLength + " 25 Z",
            fill: "rgba(186,230,253,0.5)"
          })
        ]
      }),

      // 2. 2.5D LOWER HULL WITH CARVED PLANKING & WATERLINE SHADING
      e.jsxs("g", {
        id: "v33_lower_hull_25d",
        children: [
          // Keel base shadow
          e.jsx("path", {
            d: "M " + sternLength + " 18 Q 0 34 " + (bowLength - 20) + " 24 L " + bowLength + " 16 Q 0 42 " + (sternLength - 15) + " 16 Z",
            fill: "#0c0a09"
          }),
          // Lower Hull Tier Planks (Dark oak/cedar with wood grain relief)
          e.jsx("path", {
            d: "M " + sternLength + " 10 Q 0 28 " + (bowLength - 25) + " 16 L " + bowLength + " 12 Q 0 34 " + (sternLength - 10) + " 16 Z",
            fill: hullPlankDark,
            stroke: "#0c0a09",
            strokeWidth: "1"
          }),
          // Mid Hull Tier Planks
          e.jsx("path", {
            d: "M " + (sternLength + 5) + " 2 Q 0 20 " + (bowLength - 30) + " 8 L " + (bowLength - 25) + " 16 Q 0 28 " + sternLength + " 10 Z",
            fill: hullPlankMid,
            stroke: hullPlankDark,
            strokeWidth: "1.2"
          }),
          // Upper Hull Wales (Reinforced Bronze-Studded Gunwales)
          e.jsx("path", {
            d: "M " + (sternLength + 10) + " -4 Q 0 12 " + (bowLength - 35) + " 0 L " + (bowLength - 30) + " 8 Q 0 20 " + (sternLength + 5) + " 2 Z",
            fill: hullPlankLight,
            stroke: bronzeDark,
            strokeWidth: "1.2"
          })
        ]
      }),

      // 3. 2.5D OAR BANKS (MULTI-TIERED SWEEPING REMI WITH BRONZE OARPORTS)
      !isDead && e.jsxs("g", {
        id: "v33_oars_25d",
        children: (isFlag
          ? [-80, -62, -44, -26, -8, 10, 28, 46, 64, 82, 100]
          : [-60, -42, -24, -6, 12, 30, 48, 66]
        ).map((ox, idx) => e.jsxs("g", {
          key: "oar_25d_" + idx,
          transform: "translate(" + ox + ", 12)",
          children: [
            // Bronze Oarport Seal
            e.jsx("ellipse", { cx: "0", cy: "0", rx: "3", ry: "2.2", fill: "#1c1917", stroke: bronzeGold, strokeWidth: "0.8" }),
            // 2.5D Oar Loom (Angled backward with 3D perspective)
            e.jsx("line", { x1: "0", y1: "0", x2: "-22", y2: "18", stroke: "#78350f", strokeWidth: "2.8", strokeLinecap: "round" }),
            e.jsx("line", { x1: "-1", y1: "-1", x2: "-23", y2: "17", stroke: "#d97706", strokeWidth: "1.2", strokeLinecap: "round" }),
            // Gilded Bronze Oar Blade
            e.jsx("polygon", {
              points: "-20,16 -32,25 -27,27 -16,19",
              fill: bronzeGold,
              stroke: "#78350f",
              strokeWidth: "0.6"
            }),
            // Blade Water Splash
            e.jsx("circle", { cx: "-29", cy: "26", r: "2", fill: "rgba(255,255,255,0.75)" })
          ]
        }))
      }),

      // 4. 2.5D TOP DECK SURFACE & PLANKING (ISOMETRIC PERSPECTIVE)
      e.jsxs("g", {
        id: "v33_top_deck_25d",
        children: [
          // Isometric Deck Planking (Trapezoidal plane showing top surface)
          e.jsx("path", {
            d: "M " + (sternLength + 15) + " -8 L " + (bowLength - 40) + " -6 L " + (bowLength - 35) + " 0 L " + (sternLength + 10) + " -4 Z",
            fill: "#d97706",
            stroke: "#78350f",
            strokeWidth: "1"
          }),
          // Deck Seam Stripes
          [-60, -30, 0, 30, 60].map((dx, i) => e.jsx("line", {
            key: "deck_seam_" + i,
            x1: dx,
            y1: "-7",
            x2: dx + 4,
            y2: "-1",
            stroke: "#78350f",
            strokeWidth: "1",
            opacity: "0.6"
          }))
        ]
      }),

      // 5. 2.5D MASTERWORK EMBOSSED SCUTA SHIELD-WALL ALONG GUNWALES
      e.jsxs("g", {
        id: "v33_gunwale_scuta_25d",
        children: (isFlag
          ? [-85, -65, -45, -25, -5, 15, 35, 55, 75, 95]
          : [-65, -45, -25, -5, 15, 35, 55]
        ).map((sx, idx) => e.jsxs("g", {
          key: "shield_25d_" + idx,
          transform: "translate(" + sx + ", -6) rotate(3)",
          children: [
            // Shield Body (Curved Roman Scutum or Faction Round Shield)
            isBarb ? e.jsx("circle", {
              cx: "0",
              cy: "0",
              r: "7.5",
              fill: idx % 2 === 0 ? "#1c1917" : "#451a03",
              stroke: "#94a3b8",
              strokeWidth: "1.4"
            }) : e.jsx("rect", {
              x: "-5",
              y: "-8",
              width: "10",
              height: "16",
              rx: "2",
              fill: isPunic ? "#581c87" : isGreek ? "#0369a1" : "#991b1b",
              stroke: bronzeGold,
              strokeWidth: "1.2"
            }),
            // Central Embossed Bronze Umbo Boss
            e.jsx("circle", {
              cx: "0",
              cy: "0",
              r: "2.4",
              fill: bronzeGold,
              stroke: "#78350f",
              strokeWidth: "0.6"
            }),
            // Winged Thunderbolt / Faction Shield Accent
            !isBarb && e.jsx("path", {
              d: "M -3 -4 L 0 -2 L 3 -4 M -3 4 L 0 2 L 3 4",
              fill: "none",
              stroke: bronzeGold,
              strokeWidth: "0.8"
            })
          ]
        }))
      }),

      // 6. 2.5D SCULPTED MASTERWORK PROW & ROSTRUM (BRONZE RAM WITH RELIEF)
      e.jsxs("g", {
        id: "v33_sculpted_prow_25d",
        children: [
          // Prow Stem Post (Curving upward elegantly)
          e.jsx("path", {
            d: "M " + (bowLength - 35) + " 0 Q " + (bowLength - 10) + " -18 " + (bowLength - 5) + " -32 L " + (bowLength + 2) + " -30 Q " + bowLength + " -10 " + (bowLength - 20) + " 8 Z",
            fill: hullPlankLight,
            stroke: bronzeDark,
            strokeWidth: "1.2"
          }),

          // Sculpted Roman Bronze Rostrum Ram (Triple-Fluked Beak or Animal Figurehead)
          isBarb ? e.jsxs("g", {
            // Barbarian Beast / Dragon Figurehead
            transform: "translate(" + (bowLength - 10) + ", -18)",
            children: [
              e.jsx("polygon", { points: "0,0 22,-8 14,8 24,14 0,16", fill: "#1c1917", stroke: "#94a3b8", strokeWidth: "1.5" }),
              e.jsx("circle", { cx: "10", cy: "-2", r: "2", fill: "#ef4444" })
            ]
          }) : e.jsxs("g", {
            // Masterwork Roman Imperial Aquila (Eagle Head) / Bronze Rostrum
            transform: "translate(" + (bowLength - 18) + ", 6)",
            children: [
              // Bronze ram housing
              e.jsx("path", {
                d: "M 0,-8 L 26,-4 L 32,4 L 18,12 L 0,8 Z",
                fill: bronzeGold,
                stroke: "#78350f",
                strokeWidth: "1.5"
              }),
              // Triple-Pronged Battering Beak
              e.jsx("path", {
                d: "M 22,-3 L 36,-1 L 24,1 M 24,2 L 38,5 L 22,7 M 20,8 L 34,11 L 18,13",
                stroke: "#451a03",
                strokeWidth: "2",
                strokeLinecap: "round"
              }),
              // Embossed Gorgoneion / Eagle Eye Medallion on Ram
              e.jsx("circle", { cx: "12", cy: "2", r: "4.5", fill: "#b45309", stroke: bronzeGold, strokeWidth: "1" }),
              e.jsx("circle", { cx: "12", cy: "2", r: "2", fill: "#1c1917" })
            ]
          }),

          // Prow Decorative Acroterion / Standard Mount
          e.jsx("circle", {
            cx: bowLength - 2,
            cy: "-32",
            r: "5",
            fill: bronzeGold,
            stroke: "#78350f",
            strokeWidth: "1"
          })
        ]
      }),

      // 7. 2.5D STERN APLUSTRE & HELMSMAN TOWER
      e.jsxs("g", {
        id: "v33_stern_aplustre_25d",
        children: [
          // Stern Post curving upward into classical Roman Aplustre fan
          e.jsx("path", {
            d: "M " + (sternLength + 15) + " -4 Q " + (sternLength - 15) + " -18 " + (sternLength - 28) + " -38 L " + (sternLength - 22) + " -40 Q " + (sternLength - 8) + " -20 " + (sternLength + 20) + " -6 Z",
            fill: hullPlankLight,
            stroke: bronzeDark,
            strokeWidth: "1.2"
          }),
          // Gilded Aplustre Fan Blades (Imperial Swan/Lotus Tail)
          [-35, -28, -21].map((deg, i) => e.jsx("line", {
            key: "aplustre_blade_" + i,
            x1: sternLength - 25,
            y1: "-39",
            x2: (sternLength - 25) + Math.cos(deg * Math.PI / 180) * 18,
            y2: -39 + Math.sin(deg * Math.PI / 180) * 18,
            stroke: bronzeGold,
            strokeWidth: "2.2",
            strokeLinecap: "round"
          })),
          // Steering Oars (Gubernacula / Dual Stern Rudders)
          e.jsx("line", {
            x1: sternLength + 5,
            y1: "4",
            x2: sternLength - 30,
            y2: "32",
            stroke: "#78350f",
            strokeWidth: "3.5",
            strokeLinecap: "round"
          }),
          e.jsx("polygon", {
            points: (sternLength - 26) + ",26 " + (sternLength - 38) + ",36 " + (sternLength - 32) + ",38 " + (sternLength - 22) + ",28",
            fill: bronzeGold,
            stroke: "#78350f",
            strokeWidth: "0.8"
          })
        ]
      }),

      // 8. 2.5D CASTELLUM (FIGHTING ARCHER TOWER ON FLAGSHIP)
      isFlag && e.jsxs("g", {
        id: "v33_flagship_castellum_25d",
        transform: "translate(40, -18)",
        children: [
          // Tower Platform
          e.jsx("rect", { x: "-14", y: "-22", width: "28", height: "22", rx: "2", fill: hullPlankMid, stroke: bronzeGold, strokeWidth: "1.2" }),
          // Crenellated Parapets
          [-10, 0, 10].map((cx, i) => e.jsx("rect", {
            key: "crenel_" + i,
            x: cx - 3,
            y: "-26",
            width: "6",
            height: "5",
            fill: bronzeGold,
            stroke: "#78350f",
            strokeWidth: "0.8"
          })),
          // Archer on Tower
          e.jsx("circle", { cx: "0", cy: "-28", r: "3", fill: bronzeGold }),
          e.jsx("line", { x1: "0", y1: "-25", x2: "6", y2: "-20", stroke: "#991b1b", strokeWidth: "2" })
        ]
      }),

      // 9. 2.5D RIGGING, MAST & BILLOWING EMBOSSED MEDALLION SAIL
      e.jsxs("g", {
        id: "v33_mainsail_rigging_25d",
        children: [
          // Main Mast (Hardwood Timber with Gold Rings)
          e.jsx("line", { x1: "-5", y1: "0", x2: "-5", y2: "-85", stroke: "#451a03", strokeWidth: "5.5", strokeLinecap: "round" }),
          e.jsx("line", { x1: "-4", y1: "0", x2: "-4", y2: "-85", stroke: bronzeGold, strokeWidth: "1.2" }),
          // Forestays and Shrouds (Rigging Ropes)
          e.jsx("line", { x1: "-5", y1: "-82", x2: bowLength - 40, y2: "-6", stroke: "rgba(254,240,138,0.35)", strokeWidth: "1.2" }),
          e.jsx("line", { x1: "-5", y1: "-82", x2: sternLength + 20, y2: "-6", stroke: "rgba(254,240,138,0.35)", strokeWidth: "1.2" }),
          // Yardarm (Cross spar)
          e.jsx("line", { x1: isFlag ? "-55" : "-42", y1: "-80", x2: isFlag ? "45" : "32", y2: "-76", stroke: "#78350f", strokeWidth: "3.8", strokeLinecap: "round" }),

          // Billowing 2.5D Square Mainsail with Masterwork Shading
          e.jsx("path", {
            d: isFlag
              ? "M -52 -78 Q -5 -84 42 -74 Q 52 -38 38 -20 Q -5 -12 -46 -24 Q -60 -48 -52 -78 Z"
              : "M -40 -78 Q -5 -83 30 -75 Q 38 -42 26 -22 Q -5 -15 -34 -25 Q -46 -50 -40 -78 Z",
            fill: sailPrimary,
            stroke: bronzeDark,
            strokeWidth: "1.8"
          }),
          // Sail Billow Highlight (3D Curved Inner Core)
          e.jsx("path", {
            d: isFlag
              ? "M -42 -72 Q -5 -78 32 -68 Q 40 -40 28 -26 Q -5 -18 -36 -28 Q -48 -50 -42 -72 Z"
              : "M -32 -72 Q -5 -77 22 -69 Q 28 -44 18 -27 Q -5 -20 -26 -30 Q -36 -52 -32 -72 Z",
            fill: sailHighlight,
            opacity: "0.85"
          }),

          // EMBOSSED MASTERWORK MEDALLION EMBLEM ON SAIL
          isPlayer ? e.jsxs("g", {
            // Imperial Laurel Wreath & S.P.Q.R. Insignia
            transform: "translate(-5, -48)",
            children: [
              // Golden Laurel Wreath Crown
              e.jsx("circle", { cx: "0", cy: "0", r: isFlag ? "16" : "12", fill: "none", stroke: sailEmblemColor, strokeWidth: "2", strokeDasharray: "6 3" }),
              // Gilded S.P.Q.R. Roman Monogram
              e.jsx("text", {
                x: "0",
                y: isFlag ? "4" : "3",
                textAnchor: "middle",
                fill: sailEmblemColor,
                fontSize: isFlag ? "11" : "8",
                fontFamily: "Cinzel, serif",
                fontWeight: "900",
                letterSpacing: "1",
                children: "SPQR"
              })
            ]
          }) : (isBarb ? e.jsxs("g", {
            // Barbarian Crossed Battleaxes / Raven Insignia
            transform: "translate(-5, -48)",
            children: [
              e.jsx("line", { x1: "-10", y1: "-10", x2: "10", y2: "10", stroke: "#dc2626", strokeWidth: "2.5" }),
              e.jsx("line", { x1: "10", y1: "-10", x2: "-10", y2: "10", stroke: "#dc2626", strokeWidth: "2.5" }),
              e.jsx("circle", { cx: "0", cy: "0", r: "4", fill: "#fef08a" })
            ]
          }) : isPunic ? e.jsxs("g", {
            // Carthaginian Solar Disc & Crescent
            transform: "translate(-5, -48)",
            children: [
              e.jsx("circle", { cx: "0", cy: "-2", r: "6", fill: "#fbbf24" }),
              e.jsx("path", { d: "M -9 4 Q 0 10 9 4 Q 0 6 -9 4 Z", fill: "#fbbf24" })
            ]
          }) : e.jsxs("g", {
            // Greek Hellenistic Owl / Trident
            transform: "translate(-5, -48)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "8", fill: "none", stroke: "#ffffff", strokeWidth: "1.8" }),
              e.jsx("line", { x1: "0", y1: "-10", x2: "0", y2: "10", stroke: "#ffffff", strokeWidth: "2" })
            ]
          })),

          // Masthead Imperial Vexillum Pennant
          e.jsxs("g", {
            transform: "translate(-5, -85)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "3", fill: bronzeGold }),
              e.jsx("polygon", {
                points: isPlayer ? "0,0 24,-4 0,-8" : "0,0 -24,-4 0,-8",
                fill: isPlayer ? "#dc2626" : (isBarb ? "#1c1917" : "#7e22ce"),
                stroke: bronzeGold,
                strokeWidth: "0.8"
              })
            ]
          })
        ]
      }),

      // 10. PROGRESSIVE DAMAGE OVERLAYS (BROKEN OARS, SHREDDED SAILS, SMOKE & FLAMES)
      (hpPct < 75) && e.jsxs("g", {
        id: "status-fx-ship",
        children: [
          // Broken oar stubs
          [-35, 10, 45].map((ox, i) => e.jsx("line", {
            key: "brk_oar_" + i,
            x1: ox,
            y1: "12",
            x2: ox + 14,
            y2: "26",
            stroke: "#451a03",
            strokeWidth: "2.8",
            strokeDasharray: "8 4"
          })),
          (hpPct < 45) && e.jsxs("g", {
            children: [
              e.jsx("path", { d: "M -20 -40 Q -10 -30 -15 -20 Q -5 -30 5 -35", stroke: "#1c1917", strokeWidth: "3.5", fill: "none" }),
              [-20, 25].map((smkX, i) => e.jsx("circle", {
                key: "smk_" + i,
                cx: smkX,
                cy: "-10",
                r: 8 + i * 4,
                fill: "rgba(87,83,78,0.7)",
                className: "animate-ping"
              }))
            ]
          }),
          (hpPct < 25) && e.jsxs("g", {
            children: [
              e.jsx("path", { d: "M -35 6 Q -20 -25 -5 6 Q 15 -30 30 6 Z", fill: "url(#grad-greek-fire)", opacity: "0.9", className: "animate-pulse" }),
              [-30, -10, 15, 35].map((cx, i) => e.jsx("circle", {
                key: "cinder_" + i,
                cx: cx,
                cy: -15 - (i % 2) * 10,
                r: "2.5",
                fill: "#fef08a"
              }))
            ]
          })
        ]
      })
    ]
  });
};

const render2DLegion = (x, y, isPlayer, role = "cohort", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship" || role === "centurion" || role === "legatus";
  const flip = isPlayer ? 1 : -1;
  const legTier = Math.min(5, Math.max(1, tier || 1));
  const isBarb = faction === "barbarian" || faction === "vandal" || faction === "hostis";
  const isPunic = faction === "punic" || faction === "carthage";

  const goldTrim = legTier >= 4 ? "#fef08a" : (legTier >= 3 ? "#fde047" : "#fbbf24");
  const tunicRed = isPlayer
    ? (legTier >= 4 ? "#7f1d1d" : "#991b1b")
    : (isBarb ? "#362214" : isPunic ? "#581c87" : "#1e3a8a");
  const armorSteel = isPlayer ? "#e2e8f0" : (isBarb ? "#475569" : "#cbd5e1");
  const shieldColor = isPlayer ? "#991b1b" : (isBarb ? "#1c1917" : isPunic ? "#581c87" : "#1e3a8a");

  // Multi-soldier 2.5D cohort positions
  const formationSoldiers = isFlag
    ? [
        { ox: -30, oy: 18, isLeader: false },
        { ox: 30, oy: 18, isLeader: false },
        { ox: -15, oy: 6, isLeader: false },
        { ox: 15, oy: 6, isLeader: false },
        { ox: 0, oy: -10, isLeader: true } // Centurion / Legatus at center apex
      ]
    : [
        { ox: -22, oy: 14, isLeader: false },
        { ox: 22, oy: 14, isLeader: false },
        { ox: 0, oy: 0, isLeader: false }
      ];

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.85))"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : ""),
    children: [
      // 1. DUST & GROUND SHADOWS
      !isDead && e.jsxs("g", {
        id: "v33_legion_ground_shadow_25d",
        children: [
          e.jsx("ellipse", { cx: "0", cy: "30", rx: isFlag ? "55" : "40", ry: isFlag ? "16" : "12", fill: "rgba(0,0,0,0.45)" }),
          e.jsx("ellipse", { cx: "0", cy: "28", rx: isFlag ? "40" : "28", ry: isFlag ? "10" : "8", fill: "rgba(120,53,15,0.25)" })
        ]
      }),

      // 2. 2.5D COHORT SOLDIERS (LAYERED BACK-TO-FRONT)
      !isDead && formationSoldiers.map((soldier, idx) => e.jsxs("g", {
        key: "soldier_25d_" + idx,
        transform: "translate(" + soldier.ox + ", " + soldier.oy + ")",
        children: [
          // Body & Tunic
          e.jsx("rect", { x: "-7", y: "-2", width: "14", height: "20", rx: "3", fill: tunicRed, stroke: "#0c0a09", strokeWidth: "0.8" }),

          // Lorica Segmentata (Tiered Iron & Brass Breastplate with Embossed Highlights)
          e.jsx("rect", { x: "-6", y: "-1", width: "12", height: "13", rx: "2", fill: armorSteel, stroke: goldTrim, strokeWidth: "1" }),
          [-1, 3, 7].map((plateY, pi) => e.jsx("line", {
            key: "seg_plate_" + pi,
            x1: "-5",
            y1: plateY,
            x2: "5",
            y2: plateY,
            stroke: goldTrim,
            strokeWidth: "0.8"
          })),

          // Pteruges Leather Skirt Straps
          [-4, -1, 2, 5].map((px, pi) => e.jsx("line", {
            key: "pteruges_" + pi,
            x1: px,
            y1: "12",
            x2: px,
            y2: "17",
            stroke: "#78350f",
            strokeWidth: "1.5"
          })),

          // Greaved Legs & Caligae Boots
          e.jsx("line", { x1: "-3", y1: "17", x2: "-3", y2: "26", stroke: armorSteel, strokeWidth: "2.4" }),
          e.jsx("line", { x1: "3", y1: "17", x2: "3", y2: "26", stroke: armorSteel, strokeWidth: "2.4" }),
          e.jsx("ellipse", { cx: "-3", cy: "26", rx: "2.5", ry: "1.5", fill: "#451a03" }),
          e.jsx("ellipse", { cx: "3", cy: "26", rx: "2.5", ry: "1.5", fill: "#451a03" }),

          // Galea Helmet with Cheek Guards
          e.jsx("circle", { cx: "0", cy: "-7", r: "5.5", fill: soldier.isLeader ? goldTrim : armorSteel, stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("path", { d: "M -5 -6 L -3 0 M 5 -6 L 3 0", stroke: soldier.isLeader ? goldTrim : armorSteel, strokeWidth: "1.5" }),

          // Centurion Transverse Red Horsehair Crest (Crista Transversa) / Standard Helmet
          soldier.isLeader ? e.jsxs("g", {
            children: [
              e.jsx("ellipse", { cx: "0", cy: "-13", rx: "9", ry: "3.5", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "0.8" }),
              [-6, -2, 2, 6].map((hx, hi) => e.jsx("line", {
                key: "crest_hair_" + hi,
                x1: hx,
                y1: "-13",
                x2: hx,
                y2: "-17",
                stroke: "#ef4444",
                strokeWidth: "1"
              }))
            ]
          }) : e.jsx("ellipse", { cx: "0", cy: "-12", rx: "3", ry: "2", fill: "#dc2626" }),

          // Curved 2.5D Roman Scutum Shield
          e.jsxs("g", {
            transform: "translate(-8, 3) rotate(-6)",
            children: [
              // Shield Body
              isBarb ? e.jsx("circle", { cx: "0", cy: "0", r: "9", fill: "#1c1917", stroke: "#94a3b8", strokeWidth: "1.2" }) : e.jsx("rect", {
                x: "-5",
                y: "-11",
                width: "10",
                height: "22",
                rx: "2",
                fill: shieldColor,
                stroke: goldTrim,
                strokeWidth: "1.2"
              }),
              // Embossed Golden Umbo Boss
              e.jsx("circle", { cx: "0", cy: "0", r: "3", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
              // Winged Jupiter Fulmen Lightning Motif
              !isBarb && e.jsx("path", {
                d: "M -3 -6 L 0 -2 L 3 -6 M -3 6 L 0 2 L 3 6",
                fill: "none",
                stroke: goldTrim,
                strokeWidth: "1"
              })
            ]
          }),

          // Gladius Shortsword / Pilum Spear Held in Right Hand
          soldier.isLeader ? e.jsxs("g", {
            // Raised Gladius with Gold Pommel
            transform: "translate(8, 0) rotate(25)",
            children: [
              e.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "-18", stroke: "#ffffff", strokeWidth: "2.4", strokeLinecap: "round" }),
              e.jsx("line", { x1: "-3", y1: "-2", x2: "3", y2: "-2", stroke: goldTrim, strokeWidth: "1.5" }),
              e.jsx("circle", { cx: "0", cy: "2", r: "1.8", fill: goldTrim })
            ]
          }) : e.jsxs("g", {
            // Pilum Heavy Javelin
            transform: "translate(8, 4)",
            children: [
              e.jsx("line", { x1: "0", y1: "15", x2: "0", y2: "-25", stroke: "#78350f", strokeWidth: "2.2", strokeLinecap: "round" }),
              e.jsx("line", { x1: "0", y1: "-25", x2: "0", y2: "-36", stroke: "#94a3b8", strokeWidth: "1.4" }),
              e.jsx("polygon", { points: "0,-38 -2,-34 2,-34", fill: "#f1f5f9" })
            ]
          })
        ]
      })),

      // 3. IMPERIAL AQUILA STANDARD (BEARER ON FLAGSHIP COHORT)
      isFlag && !isDead && e.jsxs("g", {
        id: "v33_aquila_standard_25d",
        transform: "translate(24, -12)",
        children: [
          // Gilded Shaft
          e.jsx("line", { x1: "0", y1: "35", x2: "0", y2: "-42", stroke: "#78350f", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "0", cy: "-42", r: "3", fill: goldTrim }),
          // Golden Aquila (Imperial Eagle) Relief
          e.jsx("polygon", { points: "-12,-48 0,-62 12,-48 8,-44 0,-52 -8,-44", fill: goldTrim, stroke: "#b45309", strokeWidth: "1" }),
          // S.P.Q.R. Vexillum Banner
          e.jsx("rect", { x: "-15", y: "-40", width: "30", height: "18", fill: "#991b1b", stroke: goldTrim, strokeWidth: "1.5", rx: "1" }),
          e.jsx("text", {
            x: "0",
            y: "-27",
            textAnchor: "middle",
            fill: goldTrim,
            fontSize: "6.5",
            fontFamily: "Cinzel, serif",
            fontWeight: "900",
            letterSpacing: "1",
            children: "SPQR"
          })
        ]
      }),

      // 4. PROGRESSIVE CASUALTY OVERLAYS (BLOOD POOLS, FALLEN SOLDIERS, BROKEN WEAPONS)
      (hpPct < 75) && e.jsxs("g", {
        id: "status-fx-legion",
        children: [
          e.jsx("ellipse", { cx: "-15", cy: "28", rx: "18", ry: "6", fill: "#7f1d1d", opacity: "0.85" }),
          e.jsx("line", { x1: "-22", y1: "15", x2: "-30", y2: "29", stroke: "#451a03", strokeWidth: "2.6" }),
          (hpPct < 45) && e.jsxs("g", {
            transform: "translate(22, 25) rotate(35)",
            children: [
              e.jsx("rect", { x: "-7", y: "-12", width: "14", height: "24", rx: "3", fill: shieldColor, stroke: "#000", strokeWidth: "1.2" }),
              e.jsx("line", { x1: "-7", y1: "-2", x2: "7", y2: "4", stroke: "#000", strokeWidth: "2" }),
              e.jsx("circle", { cx: "0", cy: "0", r: "3", fill: goldTrim })
            ]
          }),
          (hpPct < 25) && e.jsxs("g", {
            children: [
              e.jsx("ellipse", { cx: "0", cy: "28", rx: "48", ry: "12", fill: "rgba(153,27,27,0.75)" }),
              e.jsx("path", { d: "M 0 10 Q -6 -15 -2 -30 Q 6 -15 2 10 Z", fill: "rgba(120,53,15,0.7)", className: "animate-pulse" })
            ]
          })
        ]
      })
    ]
  });
};

`;

bundle = bundle.substring(0, pShipStart) + masterwork25DEngine + bundle.substring(pNextFunc);

try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js updated with 2.5D Masterwork Medallion Models!");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
