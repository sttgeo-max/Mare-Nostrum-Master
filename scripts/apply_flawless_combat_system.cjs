const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING FLAWLESS MASTERWORK COMBAT SYSTEM ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. INJECT MASTERWORK KEYFRAMES
const targetKeyframeSearch = "@keyframes bt_arrow_flight {";
const newKeyframes = `@keyframes bt_gladius_cleave {
                0% { stroke-dashoffset: 160; opacity: 0; transform: scale(0.6) rotate(-25deg); }
                18% { opacity: 1; stroke-dashoffset: 0; transform: scale(1.15) rotate(0deg); }
                75% { opacity: 1; transform: scale(1.0) rotate(8deg); }
                100% { opacity: 0; transform: scale(0.9); }
              }
              @keyframes bt_shield_shatter {
                0% { transform: scale(0.4) rotate(0deg); opacity: 0; }
                20% { transform: scale(1.2) rotate(-5deg); opacity: 1; }
                60% { transform: scale(1.0) rotate(5deg); opacity: 0.95; }
                100% { transform: scale(0.8) rotate(15deg); opacity: 0; }
              }
              @keyframes bt_blood_splatter {
                0% { r: 2; opacity: 1; }
                60% { r: 35; opacity: 0.85; }
                100% { r: 55; opacity: 0; }
              }
              @keyframes bt_divine_retribution {
                0% { transform: scale(0.2) rotate(0deg); opacity: 0; }
                25% { transform: scale(1.1) rotate(90deg); opacity: 1; }
                75% { transform: scale(1.0) rotate(270deg); opacity: 0.9; }
                100% { transform: scale(0.4) rotate(360deg); opacity: 0; }
              }
              @keyframes bt_scutum_wall_pulse {
                0% { transform: scale(0.94); opacity: 0.7; }
                50% { transform: scale(1.03); opacity: 1; }
                100% { transform: scale(0.94); opacity: 0.7; }
              }
              @keyframes bt_arrow_flight {`;

if (!bundle.includes("bt_gladius_cleave") && bundle.includes(targetKeyframeSearch)) {
  bundle = bundle.replace(targetKeyframeSearch, newKeyframes);
  console.log("- Keyframes injected successfully.");
}

// 2. UPGRADE SHIELD WALL TO INTERLOCKING ROMAN SCUTUM TESTUDO (NOT JUST CIRCLES)
const pAegisStart = bundle.indexOf('id: "player-multi-aegis-wall"');
if (pAegisStart !== -1) {
  const pAegisBlockStart = bundle.lastIndexOf("isPlayerDefending", pAegisStart);
  const pAegisBlockEnd = bundle.indexOf("// 4G.", pAegisStart);
  
  const newMasterworkShieldWall = `isPlayerDefending && e.jsxs("g", {
            id: "player-multi-aegis-wall",
            style: { animation: "bt_scutum_wall_pulse 1.8s ease-in-out infinite" },
            children: [
              // Interlocking curved Roman Scutum Wall across All Lanes
              [ { x: 125, y: 115 }, { x: 195, y: 215 }, { x: 125, y: 310 } ].map((pos, idx) => e.jsxs("g", {
                key: "p_scutum_wall_" + idx,
                transform: "translate(" + pos.x + ", " + pos.y + ")",
                children: [
                  e.jsx("rect", { x: "-22", y: "-42", width: "44", height: "84", rx: "8", fill: "rgba(251,191,36,0.25)", stroke: "#fef08a", strokeWidth: "3.5" }),
                  e.jsx("rect", { x: "-18", y: "-38", width: "36", height: "76", rx: "6", fill: "#991b1b", stroke: "#fbbf24", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1.5" }),
                  e.jsx("path", { d: "M -12 -18 L 0 -10 L 12 -18 M -12 18 L 0 10 L 12 18", fill: "none", stroke: "#fef08a", strokeWidth: "2" }),
                  e.jsx("line", { x1: "-24", y1: "-46", x2: "-24", y2: "46", stroke: "#f59e0b", strokeWidth: "4", strokeLinecap: "round" })
                ]
              }))
            ]
          }),

          isEnemyDefending && e.jsxs("g", {
            id: "enemy-multi-aegis-wall",
            style: { animation: "bt_scutum_wall_pulse 1.8s ease-in-out infinite" },
            children: [
              [ { x: 675, y: 115 }, { x: 605, y: 215 }, { x: 675, y: 310 } ].map((pos, idx) => e.jsxs("g", {
                key: "e_scutum_wall_" + idx,
                transform: "translate(" + pos.x + ", " + pos.y + ")",
                children: [
                  e.jsx("rect", { x: "-22", y: "-42", width: "44", height: "84", rx: "8", fill: "rgba(239,68,68,0.25)", stroke: "#fca5a5", strokeWidth: "3.5" }),
                  e.jsx("rect", { x: "-18", y: "-38", width: "36", height: "76", rx: "6", fill: "#450a0a", stroke: "#ef4444", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#f87171", stroke: "#450a0a", strokeWidth: "1.5" }),
                  e.jsx("path", { d: "M -12 -18 L 0 -10 L 12 -18 M -12 18 L 0 10 L 12 18", fill: "none", stroke: "#ef4444", strokeWidth: "2" }),
                  e.jsx("line", { x1: "24", y1: "-46", x2: "24", y2: "46", stroke: "#ef4444", strokeWidth: "4", strokeLinecap: "round" })
                ]
              }))
            ]
          }),

          `;
  bundle = bundle.substring(0, pAegisBlockStart) + newMasterworkShieldWall + bundle.substring(pAegisBlockEnd);
  console.log("- Upgraded Shield Wall to interlocking Roman Scutum Testudo defense.");
}

// 3. PROGRESSIVE PHYSICAL DAMAGE FOR SHIPS (BROKEN OARS, SHREDDED SAILS, HOLED HULL, SMOKE, FIRE)
const pShipFx = bundle.indexOf('status-fx-ship');
if (pShipFx !== -1 && !bundle.includes('ship-physical-damage-tier1')) {
  const pChildren = bundle.indexOf('children: [', pShipFx);
  const insertPos = pChildren + 'children: ['.length;
  const newShipDamage = `
            // === PROGRESSIVE SHIP DAMAGE (BROKEN OARS, SHREDDED SAILS, HOLED HULL, SMOKE) ===
            (hpPct < 75) && e.jsxs("g", {
              id: "ship-physical-damage-tier1",
              children: [
                [-35, 10, 45].map((ox, i) => e.jsx("line", {
                  key: "broken_oar_" + i,
                  x1: ox,
                  y1: gunwaleY + 12,
                  x2: ox + 18,
                  y2: gunwaleY + 28,
                  stroke: "#451a03",
                  strokeWidth: "2.8",
                  strokeDasharray: "8 4"
                })),
                e.jsx("path", { d: "M -20 " + (gunwaleY + 8) + " L 10 " + (gunwaleY + 14) + " L 0 " + (gunwaleY + 18) + " Z", fill: "#0c0a09" })
              ]
            }),
            (hpPct < 45) && e.jsxs("g", {
              id: "ship-physical-damage-tier2",
              children: [
                e.jsx("path", { d: "M -15 -25 Q -5 -15 -10 -5 Q -2 -15 8 -20", stroke: "#1c1917", strokeWidth: "3.5", fill: "none" }),
                e.jsx("polygon", { points: "0,-30 15,-20 8,-12", fill: "#1c1917" }),
                [-25, 20].map((smkX, i) => e.jsx("circle", {
                  key: "smoke_" + i,
                  cx: smkX,
                  cy: gunwaleY - 6,
                  r: 8 + i * 4,
                  fill: "rgba(87,83,78,0.7)",
                  className: "animate-ping"
                }))
              ]
            }),
            (hpPct < 25) && e.jsxs("g", {
              id: "ship-physical-damage-tier3-catastrophic",
              children: [
                e.jsx("path", { d: "M -40 " + (keelY - 4) + " L 30 " + (keelY - 2) + " L -10 " + (keelY + 8) + " Z", fill: "#0369a1", opacity: "0.85" }),
                e.jsx("path", { d: "M -35 " + gunwaleY + " Q -20 " + (gunwaleY - 35) + " -5 " + gunwaleY + " Q 15 " + (gunwaleY - 40) + " 30 " + gunwaleY + " Z", fill: "url(#grad-greek-fire)", opacity: "0.9", className: "animate-pulse" }),
                [-30, -10, 15, 35].map((cx, i) => e.jsx("circle", {
                  key: "cinder_" + i,
                  cx: cx,
                  cy: gunwaleY - 20 - (i % 2) * 10,
                  r: "2.5",
                  fill: "#fef08a"
                }))
              ]
            }),`;
  bundle = bundle.substring(0, insertPos) + newShipDamage + bundle.substring(insertPos);
  console.log("- Injected progressive ship damage and broken timbers.");
}

// 4. PROGRESSIVE PHYSICAL DAMAGE FOR LEGIONS (BLOOD, FALLEN SOLDIERS, BROKEN SCUTA, DISCARDED GLADII)
const pLegionFx = bundle.indexOf('status-fx-legion');
if (pLegionFx !== -1 && !bundle.includes('legion-battle-casualties-tier1')) {
  const pChildren = bundle.indexOf('children: [', pLegionFx);
  const insertPos = pChildren + 'children: ['.length;
  const newLegionDamage = `
            // === PROGRESSIVE LEGION BATTLE CARNAGE & CASUALTIES ===
            (hpPct < 75) && e.jsxs("g", {
              id: "legion-battle-casualties-tier1",
              children: [
                e.jsx("ellipse", { cx: "-15", cy: "28", rx: "18", ry: "6", fill: "#7f1d1d", opacity: "0.85" }),
                e.jsx("line", { x1: "-22", y1: "15", x2: "-30", y2: "29", stroke: "#451a03", strokeWidth: "2.6" }),
                e.jsx("line", { x1: "25", y1: "18", x2: "32", y2: "29", stroke: "#451a03", strokeWidth: "2.4" })
              ]
            }),
            (hpPct < 45) && e.jsxs("g", {
              id: "legion-battle-casualties-tier2",
              children: [
                e.jsxs("g", {
                  transform: "translate(-25, 26)",
                  children: [
                    e.jsx("rect", { x: "-12", y: "-4", width: "24", height: "8", rx: "2", fill: tunicRed }),
                    e.jsx("circle", { cx: "-14", cy: "-2", r: "4", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
                    e.jsx("ellipse", { cx: "0", cy: "4", rx: "16", ry: "5", fill: "#991b1b" })
                  ]
                }),
                e.jsxs("g", {
                  transform: "translate(22, 25) rotate(35)",
                  children: [
                    e.jsx("rect", { x: "-7", y: "-12", width: "14", height: "24", rx: "3", fill: shieldColor, stroke: "#000", strokeWidth: "1.2" }),
                    e.jsx("line", { x1: "-7", y1: "-2", x2: "7", y2: "4", stroke: "#000", strokeWidth: "2" }),
                    e.jsx("circle", { cx: "0", cy: "0", r: "3", fill: goldTrim })
                  ]
                })
              ]
            }),
            (hpPct < 25) && e.jsxs("g", {
              id: "legion-battle-casualties-tier3-carnage",
              children: [
                e.jsxs("g", {
                  transform: "translate(15, 27)",
                  children: [
                    e.jsx("rect", { x: "-10", y: "-3", width: "20", height: "6", rx: "2", fill: "#1c1917" }),
                    e.jsx("line", { x1: "-12", y1: "5", x2: "8", y2: "5", stroke: "#f1f5f9", strokeWidth: "2" }),
                    e.jsx("line", { x1: "-12", y1: "2", x2: "-12", y2: "8", stroke: goldTrim, strokeWidth: "2.5" })
                  ]
                }),
                e.jsx("ellipse", { cx: "0", cy: "28", rx: "48", ry: "12", fill: "rgba(153,27,27,0.75)" }),
                e.jsx("path", { d: "M 0 10 Q -6 -15 -2 -30 Q 6 -15 2 10 Z", fill: "rgba(120,53,15,0.7)", className: "animate-pulse" })
              ]
            }),`;
  bundle = bundle.substring(0, insertPos) + newLegionDamage + bundle.substring(insertPos);
  console.log("- Injected legion casualties, blood pools, fallen legionaries, and broken shields.");
}

// 5. VALIDATE WITH ESBUILD & WRITE
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
