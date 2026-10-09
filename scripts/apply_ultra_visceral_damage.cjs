const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING COMPLETE HIGH-FIDELITY DAMAGE & CARNAGE SYSTEMS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. SHIP DAMAGE REPLACEMENT
const shipTargetStr = `(hpPct < 75) && e.jsxs("g", {
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
      })`;

const ultraShipDamage = `// === MULTI-TIER VISCERAL SHIP BATTLE DAMAGE ===
      (hpPct < 90) && e.jsxs("g", {
        id: "status-fx-ship-tier1",
        children: [
          // Stuck enemy arrows in hull & deck rails
          [-55, -25, 10, 40, 70].map((ax, i) => e.jsxs("g", {
            key: "arr_hit_" + i,
            transform: "translate(" + ax + ", -4) rotate(" + (i % 2 === 0 ? 30 : -25) + ")",
            children: [
              e.jsx("line", { x1: "0", y1: "0", x2: "-16", y2: "0", stroke: "#78350f", strokeWidth: "2" }),
              e.jsx("polygon", { points: "0,0 -4,-2 -4,2", fill: "#94a3b8" }),
              e.jsx("path", { d: "M -16 0 L -20 -3 M -16 0 L -20 3", stroke: "#ef4444", strokeWidth: "1.5" })
            ]
          })),
          // Hull gashes and splinter lines
          [-40, 0, 35].map((gx, i) => e.jsx("line", {
            key: "gash_" + i,
            x1: gx,
            y1: 8 + (i % 2) * 4,
            x2: gx + 18,
            y2: 6 + (i % 2) * 4,
            stroke: "#0c0a09",
            strokeWidth: "3",
            strokeDasharray: "6 3"
          }))
        ]
      }),

      (hpPct < 75) && e.jsxs("g", {
        id: "status-fx-ship-tier2",
        children: [
          // Broken oars trailing and snapping in waves
          [-60, -30, 0, 30, 60].map((ox, i) => e.jsxs("g", {
            key: "oar_debris_" + i,
            children: [
              e.jsx("line", { x1: ox, y1: "12", x2: ox - 12, y2: "22", stroke: "#451a03", strokeWidth: "3.2", strokeDasharray: "6 4" }),
              e.jsx("polygon", { points: (ox - 10) + ",20 " + (ox - 6) + ",24 " + (ox - 14) + ",24", fill: "#d97706" })
            ]
          })),
          // Large jagged tears in sail cloth
          e.jsx("path", { d: "M -25 -65 L -15 -45 L -22 -35 L -10 -25", fill: "none", stroke: "#0c0a09", strokeWidth: "4.5" }),
          e.jsx("polygon", { points: "-20,-55 -8,-45 -18,-40", fill: "#0c0a09" }),
          e.jsx("path", { d: "M 15 -60 L 25 -40 L 18 -30", fill: "none", stroke: "#0c0a09", strokeWidth: "3.5" })
        ]
      }),

      (hpPct < 55) && e.jsxs("g", {
        id: "status-fx-ship-tier3",
        children: [
          // Hull breaches with sea foam surging in
          e.jsx("ellipse", { cx: "25", cy: "22", rx: "20", ry: "8", fill: "#0369a1", opacity: "0.9" }),
          e.jsx("path", { d: "M 10 22 Q 25 14 40 22 Q 25 30 10 22 Z", fill: "#e0f2fe", opacity: "0.85", className: "animate-pulse" }),
          // Dark billowing smoke clouds rising from deck
          [-35, -5, 30].map((smkX, i) => e.jsx("circle", {
            key: "smoke_cloud_" + i,
            cx: smkX,
            cy: -20 - i * 12,
            r: 14 + i * 5,
            fill: "rgba(41,37,36,0.85)",
            className: "animate-ping"
          })),
          // Burning mid-deck flames
          e.jsx("path", { d: "M -40 -2 Q -25 -24 -10 -2 Q 5 -28 20 -2 Z", fill: "url(#grad-greek-fire)", opacity: "0.95", className: "animate-pulse" })
        ]
      }),

      (hpPct < 35) && e.jsxs("g", {
        id: "status-fx-ship-tier4",
        children: [
          // Snapped mast at heavy angle
          e.jsx("line", { x1: "-5", y1: "-40", x2: "45", y2: "-25", stroke: "#451a03", strokeWidth: "6.5", strokeLinecap: "round" }),
          // Hull inferno
          e.jsx("path", { d: "M -60 4 Q -35 -45 -10 4 Q 15 -50 40 4 Q 65 -35 85 4 Z", fill: "#ef4444", opacity: "0.85", className: "animate-bounce" }),
          e.jsx("path", { d: "M -45 2 Q -25 -35 0 2 Q 25 -40 50 2 Z", fill: "#fbbf24", opacity: "0.95", className: "animate-pulse" }),
          // Exploding fire embers
          [-50, -30, -10, 10, 30, 50, 70].map((cx, i) => e.jsx("circle", {
            key: "ember_" + i,
            cx: cx + Math.sin(i * 2) * 15,
            cy: -20 - (i % 4) * 12,
            r: "3.5",
            fill: "#fef08a",
            className: "animate-ping"
          }))
        ]
      }),

      (hpPct < 15) && e.jsxs("g", {
        id: "status-fx-ship-tier5",
        children: [
          // Heavy sinking list angle and seawater covering lower deck
          e.jsx("rect", { x: "-140", y: "15", width: "280", height: "40", fill: "rgba(3,105,161,0.65)", rx: "10" }),
          // Fallen crew overboard in water
          [-55, 15, 65].map((px, i) => e.jsxs("g", {
            key: "crew_overboard_" + i,
            transform: "translate(" + px + ", 32)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "4", fill: "#fde047" }),
              e.jsx("line", { x1: "-3", y1: "0", x2: "-8", y2: "-8", stroke: "#991b1b", strokeWidth: "2" }),
              e.jsx("line", { x1: "3", y1: "0", x2: "8", y2: "-8", stroke: "#991b1b", strokeWidth: "2" }),
              e.jsx("circle", { cx: "0", cy: "0", r: "9", fill: "none", stroke: "#ffffff", strokeWidth: "1.5", className: "animate-ping" })
            ]
          }))
        ]
      })`;

if (bundle.includes(shipTargetStr)) {
  bundle = bundle.replace(shipTargetStr, ultraShipDamage);
  console.log("- Ship damage upgraded to 5-tier ultra-visceral system.");
} else {
  console.error("Could not find shipTargetStr in bundle");
  process.exit(1);
}

// 2. LEGION DAMAGE REPLACEMENT
const legionTargetStr = `(hpPct < 75) && e.jsxs("g", {
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
              e.jsx("path", { d: "M 0 10 Q -6 -15 -2 -30 Q 6 -15 2 10 Z", fill: "rgba(120,53,15,0.7)", className: "animate-pulse" })\n            ]\n          })\n        ]\n      })`;

const ultraLegionDamage = `// === MULTI-TIER VISCERAL LEGION CARNAGE & CASUALTIES ===
      (hpPct < 90) && e.jsxs("g", {
        id: "status-fx-legion-tier1",
        children: [
          // Stuck pila & arrows in ground & shields
          [-28, 12, 34].map((px, i) => e.jsxs("g", {
            key: "stuck_pilum_" + i,
            transform: "translate(" + px + ", 18) rotate(" + (i % 2 === 0 ? 25 : -35) + ")",
            children: [
              e.jsx("line", { x1: "0", y1: "-22", x2: "0", y2: "8", stroke: "#78350f", strokeWidth: "2.5" }),
              e.jsx("line", { x1: "0", y1: "-22", x2: "0", y2: "-30", stroke: "#94a3b8", strokeWidth: "1.5" })
            ]
          })),
          // Blood droplets on dust
          [-15, 5, 25].map((bx, i) => e.jsx("circle", {
            key: "blood_drop_" + i,
            cx: bx,
            cy: 28 + (i % 2) * 3,
            r: "2.8",
            fill: "#991b1b"
          }))
        ]
      }),

      (hpPct < 75) && e.jsxs("g", {
        id: "status-fx-legion-tier2",
        children: [
          // Expanding dark crimson blood pools
          e.jsx("ellipse", { cx: "-18", cy: "28", rx: "24", ry: "8", fill: "#7f1d1d", opacity: "0.9" }),
          e.jsx("ellipse", { cx: "22", cy: "30", rx: "18", ry: "6", fill: "#991b1b", opacity: "0.85" }),
          // Broken discarded scuta on ground
          e.jsxs("g", {
            transform: "translate(-25, 25) rotate(40)",
            children: [
              e.jsx("rect", { x: "-6", y: "-10", width: "12", height: "20", rx: "2", fill: shieldColor, stroke: "#000", strokeWidth: "1.2" }),
              e.jsx("line", { x1: "-6", y1: "0", x2: "6", y2: "4", stroke: "#000", strokeWidth: "2.5" }),
              e.jsx("circle", { cx: "0", cy: "0", r: "2.5", fill: goldTrim })
            ]
          }),
          // Shattered gladius shortsword on dirt
          e.jsxs("g", {
            transform: "translate(15, 30) rotate(-15)",
            children: [
              e.jsx("line", { x1: "-8", y1: "0", x2: "6", y2: "0", stroke: "#f1f5f9", strokeWidth: "2.4" }),
              e.jsx("line", { x1: "-8", y1: "-2", x2: "-8", y2: "2", stroke: goldTrim, strokeWidth: "2" }),
              e.jsx("circle", { cx: "-10", cy: "0", r: "1.5", fill: goldTrim })
            ]
          })
        ]
      }),

      (hpPct < 55) && e.jsxs("g", {
        id: "status-fx-legion-tier3",
        children: [
          // Fallen Roman Soldier on Ground (Dead / Wounded Centurion)
          e.jsxs("g", {
            transform: "translate(-10, 26)",
            children: [
              // Blood pool beneath fallen body
              e.jsx("ellipse", { cx: "0", cy: "4", rx: "26", ry: "9", fill: "#450a0a" }),
              // Body & Lorica Segmentata
              e.jsx("rect", { x: "-12", y: "-3", width: "24", height: "8", rx: "2", fill: tunicRed }),
              e.jsx("rect", { x: "-10", y: "-2", width: "18", height: "6", rx: "1", fill: armorSteel, stroke: goldTrim, strokeWidth: "0.8" }),
              // Fallen Helmet with Broken Red Plume
              e.jsx("circle", { cx: "-14", cy: "-2", r: "4.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
              e.jsx("path", { d: "M -16 -4 L -22 -8", stroke: "#dc2626", strokeWidth: "2", strokeLinecap: "round" })
            ]
          }),
          // Thick billowing battle dust
          [-20, 20].map((dx, i) => e.jsx("circle", {
            key: "battle_dust_" + i,
            cx: dx,
            cy: "24",
            r: "16",
            fill: "rgba(120,53,15,0.35)",
            className: "animate-pulse"
          }))
        ]
      }),

      (hpPct < 35) && e.jsxs("g", {
        id: "status-fx-legion-tier4",
        children: [
          // Second Fallen Comrade on Flank
          e.jsxs("g", {
            transform: "translate(22, 28)",
            children: [
              e.jsx("ellipse", { cx: "0", cy: "4", rx: "22", ry: "8", fill: "#7f1d1d" }),
              e.jsx("rect", { x: "-10", y: "-2", width: "20", height: "7", rx: "2", fill: "#1c1917" }),
              e.jsx("line", { x1: "-12", y1: "5", x2: "8", y2: "5", stroke: "#f1f5f9", strokeWidth: "2" })
            ]
          }),
          // Heavy gore splatters across battlefield
          [-30, -10, 10, 30].map((sx, i) => e.jsx("ellipse", {
            key: "carnage_splat_" + i,
            cx: sx,
            cy: 28 + (i % 3) * 3,
            rx: "10",
            ry: "4",
            fill: "rgba(185,28,28,0.9)"
          })),
          e.jsx("path", { d: "M -35 15 Q 0 -15 35 15 Q 0 35 -35 15 Z", fill: "rgba(153,27,27,0.35)", className: "animate-pulse" })
        ]
      }),

      (hpPct < 15) && e.jsxs("g", {
        id: "status-fx-legion-tier5",
        children: [
          // Devastated Ground Saturated in Blood
          e.jsx("ellipse", { cx: "0", cy: "28", rx: "60", ry: "15", fill: "rgba(69,10,10,0.95)" }),
          // Smashed Imperial Eagle Standard broken on ground
          e.jsxs("g", {
            transform: "translate(5, 29) rotate(70)",
            children: [
              e.jsx("line", { x1: "0", y1: "-30", x2: "0", y2: "20", stroke: "#451a03", strokeWidth: "3.5", strokeDasharray: "10 5" }),
              e.jsx("polygon", { points: "-10,-35 0,-45 10,-35", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),
              e.jsx("rect", { x: "-12", y: "-30", width: "24", height: "14", fill: "#7f1d1d", stroke: goldTrim, strokeWidth: "1" })
            ]
          })
        ]
      })`;

if (bundle.includes(legionTargetStr)) {
  bundle = bundle.replace(legionTargetStr, ultraLegionDamage);
  console.log("- Legion damage upgraded to 5-tier ultra-visceral system.");
} else {
  console.error("Could not find legionTargetStr in bundle");
  process.exit(1);
}

// Validate with esbuild
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js updated with ultra-visceral damage systems!");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
