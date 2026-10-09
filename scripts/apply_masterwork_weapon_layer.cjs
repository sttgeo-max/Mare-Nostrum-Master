const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING MASTERWORK WEAPON ANIMATIONS LAYER TO BUNDLE ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const targetStr = `                  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => e.jsx("line", {
                    key: \`sol_ray_\${idx}\`,
                    x1: "0", y1: "0",
                    x2: Math.cos(deg * Math.PI / 180) * 110,
                    y2: Math.sin(deg * Math.PI / 180) * 110,
                    stroke: "#fbbf24", strokeWidth: "2.5", strokeLinecap: "round", opacity: "0.8"
                  }))
                ]
              })
            ]
          })`;

const pTarget = bundle.indexOf(targetStr);
console.log("pTarget:", pTarget);

if (pTarget === -1) {
  console.error("Failed to find target string");
  process.exit(1);
}

const masterworkWeaponLayerCode = `,

          // === 4H. COMPLETE MASTERWORK WEAPON & COMBAT ANIMATIONS LAYER ===
          e.jsxs("g", {
            id: "masterwork-weapon-animations-layer",
            children: [
              // 1. SAGITTARII ARROW SALVO / FIRE ARROWS
              (activeCombatFX?.type?.includes("arrow") || activeCombatFX?.type === "arrow_fire" || activeCombatFX?.type === "arrow_fire_travel") && e.jsxs("g", {
                id: "fx-arrow-salvo-flight",
                children: [
                  [ { sy: 140, ey: 120, delay: "0s" }, { sy: 200, ey: 210, delay: "0.06s" }, { sy: 260, ey: 290, delay: "0.12s" } ].map((arr, i) => e.jsxs("g", {
                    key: "arr_" + i,
                    style: { animation: "bt_arrow_flight 0.45s ease-out forwards", animationDelay: arr.delay },
                    children: [
                      e.jsx("line", { x1: "210", y1: arr.sy, x2: "620", y2: arr.ey, stroke: "rgba(251,191,36,0.5)", strokeWidth: "2", strokeDasharray: "16 8" }),
                      e.jsx("path", { d: "M 610 " + arr.ey + " L 625 " + arr.ey + " L 616 " + (arr.ey - 4) + " M 625 " + arr.ey + " L 616 " + (arr.ey + 4), fill: "none", stroke: "#fbbf24", strokeWidth: "3.5" }),
                      e.jsx("circle", { cx: "622", cy: arr.ey, r: "6", fill: "#ef4444", className: "animate-ping" })
                    ]
                  }))
                ]
              }),

              // 2. ROMAN PILUM VOLLEY / JAVELIN LAUNCH
              (activeCombatFX?.type?.includes("javelin") || activeCombatFX?.type?.includes("pilum")) && e.jsxs("g", {
                id: "fx-pilum-volley",
                children: [
                  [ { sy: 160, ey: 140, d: "0s" }, { sy: 240, ey: 270, d: "0.08s" } ].map((pil, i) => e.jsxs("g", {
                    key: "pil_" + i,
                    style: { animation: "bt_javelin_flight 0.48s cubic-bezier(0.25, 1, 0.5, 1) forwards", animationDelay: pil.d },
                    children: [
                      e.jsx("line", { x1: "200", y1: pil.sy, x2: "630", y2: pil.ey, stroke: "#78350f", strokeWidth: "4.5", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "605", y1: pil.ey, x2: "635", y2: pil.ey, stroke: "#94a3b8", strokeWidth: "3.2", strokeLinecap: "round" }),
                      e.jsx("polygon", { points: "635," + pil.ey + " 623," + (pil.ey - 4) + " 623," + (pil.ey + 4), fill: "#f1f5f9" })
                    ]
                  }))
                ]
              }),

              // 3. GLADIUS CLEAVE & SWORD SLASH
              (activeCombatFX?.type?.includes("gladius") || activeCombatFX?.type?.includes("sword") || activeCombatFX?.type?.includes("slash") || activeCombatFX?.type?.includes("cleave")) && e.jsxs("g", {
                id: "fx-gladius-slash",
                transform: "translate(" + (activeCombatFX?.isPlayer ? 190 : 610) + ", 210)",
                children: [
                  e.jsx("path", {
                    d: "M -60 -55 Q 10 -15 65 55",
                    fill: "none",
                    stroke: "url(#grad-gladius-edge)",
                    strokeWidth: "7",
                    strokeLinecap: "round",
                    style: { animation: "bt_gladius_cleave 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M -40 -35 Q 15 -5 45 40",
                    fill: "none",
                    stroke: "#ffffff",
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                    opacity: "0.9"
                  }),
                  [-18, 0, 18].map((off, i) => e.jsx("circle", {
                    key: "spark_" + i,
                    cx: off * 2,
                    cy: off * 2.2,
                    r: "3.5",
                    fill: "#fef08a",
                    className: "animate-ping"
                  }))
                ]
              }),

              // 4. BALLISTA BOLT & CATAPULT STRIKE
              (activeCombatFX?.type?.includes("ballista") || activeCombatFX?.type?.includes("catapult")) && e.jsxs("g", {
                id: "fx-ballista-bolt",
                children: [
                  e.jsx("line", { x1: "180", y1: "215", x2: "625", y2: "215", stroke: "rgba(245,158,11,0.6)", strokeWidth: "8", strokeDasharray: "25 15" }),
                  e.jsx("line", { x1: "220", y1: "215", x2: "640", y2: "215", stroke: "#78350f", strokeWidth: "6", strokeLinecap: "round" }),
                  e.jsx("polygon", { points: "650,215 625,207 625,223", fill: "#e2e8f0", stroke: "#0f172a", strokeWidth: "1.5" }),
                  e.jsx("circle", { cx: "635", cy: "215", r: "28", fill: "rgba(239,68,68,0.4)", stroke: "#ef4444", strokeWidth: "3", className: "animate-ping" })
                ]
              }),

              // 5. GREEK FIRE SPRAY & NAPTHA BURST
              (activeCombatFX?.type?.includes("fire") || activeCombatFX?.type?.includes("greek") || activeCombatFX?.type?.includes("flame")) && e.jsxs("g", {
                id: "fx-greek-fire-spray",
                children: [
                  [ { x: 380, y: 190, r: 24 }, { x: 480, y: 205, r: 38 }, { x: 590, y: 215, r: 52 }, { x: 640, y: 215, r: 42 } ].map((fb, idx) => e.jsx("circle", {
                    key: "greek_fire_" + idx,
                    cx: fb.x,
                    cy: fb.y,
                    r: fb.r,
                    fill: "url(#grad-greek-fire)",
                    opacity: "0.85",
                    className: "animate-pulse"
                  })),
                  e.jsx("path", { d: "M 200 215 Q 400 160 635 210 Q 400 265 200 215 Z", fill: "rgba(249,115,22,0.35)", opacity: "0.9" })
                ]
              }),

              // 6. ROSTRUM RAMMING PROW IMPACT
              (activeCombatFX?.type?.includes("ram") || activeCombatFX?.type?.includes("impact")) && e.jsxs("g", {
                id: "fx-ramming-prow-impact",
                transform: "translate(605, 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "50", fill: "none", stroke: "#38bdf8", strokeWidth: "5", strokeDasharray: "15 10", className: "animate-ping" }),
                  e.jsx("polygon", { points: "-30,-22 15,0 -30,22", fill: "#d97706", stroke: "#fef08a", strokeWidth: "2" }),
                  [-20, -5, 12, 25].map((sp, i) => e.jsx("line", {
                    key: "splint_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.sin(i * 1.5) * 35,
                    y2: Math.cos(i * 1.5) * 35,
                    stroke: "#78350f",
                    strokeWidth: "3.5",
                    strokeLinecap: "round"
                  }))
                ]
              }),

              // 7. CORVUS BOARDING BRIDGE & GRAPPLE
              (activeCombatFX?.type?.includes("corvus") || activeCombatFX?.type?.includes("grapple") || activeCombatFX?.type?.includes("hook")) && e.jsxs("g", {
                id: "fx-corvus-assault",
                children: [
                  e.jsx("line", { x1: "210", y1: "185", x2: "590", y2: "205", stroke: "#451a03", strokeWidth: "10", strokeLinecap: "square" }),
                  e.jsx("polygon", { points: "590,205 605,215 595,225 580,215", fill: "#0f172a", stroke: "#e2e8f0", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "595", cy: "215", r: "22", fill: "rgba(239,68,68,0.35)", stroke: "#ef4444", strokeWidth: "2.5", className: "animate-ping" })
                ]
              }),

              // 8. OAR SHEAR MANEUVER
              activeCombatFX?.type?.includes("oar") && e.jsxs("g", {
                id: "fx-oar-shear-snapping",
                transform: "translate(580, 215)",
                children: [
                  [-25, -10, 8, 24].map((ox, i) => e.jsx("line", {
                    key: "oar_break_" + i,
                    x1: ox,
                    y1: "-20",
                    x2: ox + 15,
                    y2: "20",
                    stroke: "#78350f",
                    strokeWidth: "3",
                    strokeDasharray: "8 4"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "35", fill: "rgba(56,189,248,0.3)", stroke: "#38bdf8", strokeWidth: "2", className: "animate-ping" })
                ]
              }),

              // 9. WAR ELEPHANT TRAMPLE SHOCKWAVE
              (activeCombatFX?.type?.includes("elephant") || activeCombatFX?.type?.includes("trample")) && e.jsxs("g", {
                id: "fx-war-elephant-shockwave",
                transform: "translate(605, 230)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "65", fill: "none", stroke: "#d97706", strokeWidth: "5", strokeDasharray: "20 12", className: "animate-ping" }),
                  e.jsx("ellipse", { cx: "0", cy: "15", rx: "75", ry: "25", fill: "rgba(120,53,15,0.45)" })
                ]
              }),

              // 10. TESTUDO FORMATION DEFENSE AURA
              (activeCombatFX?.type?.includes("testudo") || activeCombatFX?.type === "block") && e.jsxs("g", {
                id: "fx-testudo-shield-wall",
                transform: "translate(" + (activeCombatFX?.isPlayer ? 190 : 610) + ", 210)",
                children: [
                  e.jsx("rect", { x: "-28", y: "-48", width: "56", height: "96", rx: "8", fill: "rgba(251,191,36,0.3)", stroke: "#fef08a", strokeWidth: "4" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "14", fill: "#fef08a", stroke: "#78350f", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "58", fill: "none", stroke: "#38bdf8", strokeWidth: "3", strokeDasharray: "12 8", className: "animate-ping" })
                ]
              }),

              // 11. JUPITER WRATH & DIVINE LIGHTNING
              (activeCombatFX?.type?.includes("lightning") || activeCombatFX?.type?.includes("tempestas")) && e.jsxs("g", {
                id: "fx-jupiter-wrath-lightning",
                children: [
                  e.jsx("path", { d: "M 610 0 L 625 75 L 595 130 L 620 215", fill: "none", stroke: "#38bdf8", strokeWidth: "8", strokeLinecap: "round" }),
                  e.jsx("path", { d: "M 610 0 L 625 75 L 595 130 L 620 215", fill: "none", stroke: "#ffffff", strokeWidth: "3", strokeLinecap: "round" }),
                  e.jsx("circle", { cx: "615", cy: "215", r: "42", fill: "rgba(56,189,248,0.45)", stroke: "#ffffff", strokeWidth: "2.5", className: "animate-ping" })
                ]
              }),

              // 12. MARS AEGIS & WAR BRONZE RADIANCE
              (activeCombatFX?.type?.includes("mars") || activeCombatFX?.type?.includes("buff")) && e.jsxs("g", {
                id: "fx-mars-aegis-aura",
                transform: "translate(190, 210)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "55", fill: "none", stroke: "#fbbf24", strokeWidth: "3.5", strokeDasharray: "15 8", className: "animate-spin" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "65", fill: "rgba(251,191,36,0.2)", stroke: "#fef08a", strokeWidth: "2", className: "animate-ping" })
                ]
              }),

              // 13. POSEIDON TRIDENT VORTEX
              activeCombatFX?.type?.includes("poseidon") && e.jsxs("g", {
                id: "fx-poseidon-trident-vortex",
                transform: "translate(605, 215)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "90", ry: "45", fill: "none", stroke: "#0284c7", strokeWidth: "4.5", strokeDasharray: "20 10", className: "animate-spin" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "40", fill: "rgba(14,165,233,0.35)", className: "animate-ping" })
                ]
              }),

              // 14. FORTUNA WEALTH BURST
              activeCombatFX?.type?.includes("fortuna") && e.jsxs("g", {
                id: "fx-fortuna-coin-burst",
                transform: "translate(190, 210)",
                children: [
                  [ { ox: -20, oy: -25 }, { ox: 20, oy: -20 }, { ox: -15, oy: 20 }, { ox: 25, oy: 25 } ].map((c, idx) => e.jsx("circle", {
                    key: "coin_" + idx,
                    cx: c.ox,
                    cy: c.oy,
                    r: "8",
                    fill: "#fbbf24",
                    stroke: "#78350f",
                    strokeWidth: "1.5",
                    className: "animate-bounce"
                  }))
                ]
              }),

              // 15. SPQR LEGIONARY STANDARD RADIANCE
              (activeCombatFX?.type?.includes("spqr") || activeCombatFX?.type?.includes("aquila")) && e.jsxs("g", {
                id: "fx-spqr-standard-radiance",
                transform: "translate(400, 190)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "80", fill: "rgba(251,191,36,0.2)", stroke: "#fbbf24", strokeWidth: "2.5", className: "animate-ping" })
                ]
              })
            ]
          })`;

const insertionPoint = pTarget + targetStr.length;
bundle = bundle.substring(0, insertionPoint) + masterworkWeaponLayerCode + bundle.substring(insertionPoint);

try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js updated with masterwork weapon layer.");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
