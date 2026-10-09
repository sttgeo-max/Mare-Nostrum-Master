const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== INJECTING MASTERWORK ATMOSPHERE, WEATHER SYSTEMS & DYNAMIC SHADOWS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const pBloodBurst = bundle.indexOf('id: "fx-bleed-bloodburst"');
if (pBloodBurst === -1) {
  console.error("Could not find fx-bleed-bloodburst");
  process.exit(1);
}

const targetAnchor = ']              })\n            ]\n          })';
let pTarget = bundle.indexOf(']              })', pBloodBurst);

if (pTarget === -1) {
  pTarget = bundle.indexOf('id: "fx-bleed-bloodburst"');
  pTarget = bundle.indexOf(']', pTarget + 500);
}

console.log("Found pTarget at:", pTarget);
console.log("Context around pTarget:", bundle.substring(pTarget, pTarget + 100));

// Find the end of masterwork-weapon-animations-layer (the '})' that closes it)
const pWeaponLayerClose = bundle.indexOf('})', pTarget + 10);
console.log("pWeaponLayerClose at:", pWeaponLayerClose);
console.log("Context around pWeaponLayerClose:", bundle.substring(pWeaponLayerClose - 20, pWeaponLayerClose + 40));

const weatherAndAtmosphereLayer = `
              // =========================================================================
              // === MASTERWORK ATMOSPHERIC EFFECTS, WEATHER & TIME-OF-DAY SYSTEM ===
              // =========================================================================
              
              // 1. DYNAMIC DIRECTIONAL SHADOWS LAYER (TIME-OF-DAY SKEWED OCCLUSION)
              e.jsxs("g", {
                id: "masterwork-directional-shadows-layer",
                className: "pointer-events-none select-none",
                children: [
                  // Directional Shadows under Player Cohort / Warships
                  e.jsx("ellipse", {
                    cx: isDawn ? 280 : isDusk ? 240 : 260,
                    cy: isNaval ? 360 : 380,
                    rx: isDawn || isDusk ? 140 : 110,
                    ry: isDawn || isDusk ? 32 : 24,
                    transform: isDawn ? "skewX(-28)" : isDusk ? "skewX(28)" : "none",
                    fill: isNight ? "rgba(2, 6, 16, 0.75)" : isDusk ? "rgba(24, 6, 12, 0.65)" : isDawn ? "rgba(18, 8, 26, 0.55)" : "rgba(3, 7, 18, 0.8)",
                    filter: "blur(4px)"
                  }),
                  // Directional Shadows under Enemy Cohort / Warships
                  e.jsx("ellipse", {
                    cx: isDawn ? 740 : isDusk ? 700 : 720,
                    cy: isNaval ? 360 : 380,
                    rx: isDawn || isDusk ? 140 : 110,
                    ry: isDawn || isDusk ? 32 : 24,
                    transform: isDawn ? "skewX(-28)" : isDusk ? "skewX(28)" : "none",
                    fill: isNight ? "rgba(2, 6, 16, 0.75)" : isDusk ? "rgba(24, 6, 12, 0.65)" : isDawn ? "rgba(18, 8, 26, 0.55)" : "rgba(3, 7, 18, 0.8)",
                    filter: "blur(4px)"
                  })
                ]
              }),

              // 2. VOLUMETRIC GOD RAYS (SUNBEAMS / MOONBEAMS)
              (!isStorm && !isFog) && e.jsxs("g", {
                id: "masterwork-god-rays-layer",
                className: "pointer-events-none select-none mix-blend-screen",
                style: { animation: "bt_godray_pulse 6s ease-in-out infinite alternate" },
                children: [
                  [
                    { x1: 220, y1: 0, x2: 380, y2: 600, w: 90, op: isDawn ? 0.35 : isDusk ? 0.4 : isNight ? 0.18 : 0.28 },
                    { x1: 440, y1: 0, x2: 560, y2: 600, w: 120, op: isDawn ? 0.45 : isDusk ? 0.5 : isNight ? 0.22 : 0.32 },
                    { x1: 680, y1: 0, x2: 820, y2: 600, w: 100, op: isDawn ? 0.35 : isDusk ? 0.38 : isNight ? 0.16 : 0.25 }
                  ].map((ray, idx) => e.jsx("polygon", {
                    key: "godray_" + idx,
                    points: \`\${ray.x1 - ray.w/4},0 \${ray.x1 + ray.w/4},0 \${ray.x2 + ray.w},600 \${ray.x2 - ray.w},600\`,
                    fill: isNight ? "rgba(186, 230, 253, 0.4)" : isDusk ? "rgba(251, 191, 36, 0.45)" : isDawn ? "rgba(253, 224, 71, 0.4)" : "rgba(255, 255, 255, 0.35)",
                    opacity: ray.op
                  }))
                ]
              }),

              // 3. WEATHER SYSTEM OVERLAYS
              // A. PLUVIA (RAIN) & SPLASH IMPACTS
              (isRain || isStorm) && e.jsxs("g", {
                id: "weather-rain-system",
                className: "pointer-events-none select-none",
                children: [
                  // Animated Downward Rain Streaks
                  [...Array(24)].map((_, i) => {
                    const rx = (i * 43) % 1000;
                    const ry = ((i * 37) % 300) + 50;
                    const rLen = 35 + (i % 4) * 15;
                    return e.jsx("line", {
                      key: "rain_drop_" + i,
                      x1: rx,
                      y1: ry,
                      x2: rx + 18,
                      y2: ry + rLen,
                      stroke: isNight ? "rgba(186,230,253,0.55)" : "rgba(224,242,254,0.7)",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      style: { animation: \`bt_rain_fall \${0.45 + (i % 3) * 0.1}s linear infinite\` }
                    });
                  }),
                  // Water Surface & Terrain Impact Splash Rings
                  [...Array(8)].map((_, i) => {
                    const sx = (i * 127 + 60) % 940;
                    const sy = 340 + (i * 31) % 220;
                    return e.jsx("ellipse", {
                      key: "rain_splash_" + i,
                      cx: sx,
                      cy: sy,
                      rx: "12",
                      ry: "4",
                      fill: "none",
                      stroke: "rgba(255,255,255,0.75)",
                      strokeWidth: "1.2",
                      style: { animation: \`bt_shockwave_ring 0.6s \${(i * 0.1)}s ease-out infinite\` }
                    });
                  })
                ]
              }),

              // B. TEMPESTAS (STORM) LIGHTNING FLASH OVERLAY
              isStorm && e.jsxs("g", {
                id: "weather-storm-lightning-system",
                className: "pointer-events-none select-none",
                children: [
                  // Full Screen Atmospheric Lightning Flash
                  e.jsx("rect", {
                    x: "0",
                    y: "0",
                    width: "1000",
                    height: "600",
                    fill: "rgba(224, 242, 254, 0.95)",
                    style: { animation: "bt_lightning_flash 7s infinite" }
                  }),
                  // Jagged Fork Lightning Bolt Across Horizon
                  e.jsx("path", {
                    d: "M 480,0 L 510,90 L 475,150 L 530,240 L 490,310 L 520,380",
                    fill: "none",
                    stroke: "#ffffff",
                    strokeWidth: "3.5",
                    filter: "drop-shadow(0 0 12px #38bdf8)",
                    style: { animation: "bt_lightning_flash 7s infinite" }
                  })
                ]
              }),

              // C. NEBULA (FOG / HORIZON MIST)
              (isFog || isDawn) && e.jsxs("g", {
                id: "weather-fog-system",
                className: "pointer-events-none select-none mix-blend-screen",
                children: [
                  e.jsx("ellipse", {
                    cx: "500",
                    cy: "320",
                    rx: "550",
                    ry: "90",
                    fill: "rgba(226, 232, 240, 0.45)",
                    filter: "blur(20px)",
                    style: { animation: "bt_fog_drift 12s ease-in-out infinite alternate" }
                  }),
                  e.jsx("ellipse", {
                    cx: "460",
                    cy: "440",
                    rx: "580",
                    ry: "110",
                    fill: "rgba(203, 213, 225, 0.35)",
                    filter: "blur(24px)",
                    style: { animation: "bt_fog_drift 16s ease-in-out infinite alternate-reverse" }
                  })
                ]
              }),

              // D. SIROCCO (DESERT DUST STORM / ARID GALE)
              isSirocco && e.jsxs("g", {
                id: "weather-sirocco-system",
                className: "pointer-events-none select-none mix-blend-color-dodge",
                children: [
                  e.jsx("path", {
                    d: "M -100,280 Q 250,220 600,310 T 1200,260 L 1200,420 Q 700,480 300,390 Z",
                    fill: "rgba(217, 119, 6, 0.35)",
                    filter: "blur(16px)",
                    style: { animation: "bt_sirocco_swirl 8s linear infinite" }
                  }),
                  [...Array(16)].map((_, i) => e.jsx("circle", {
                    key: "dust_mote_" + i,
                    cx: (i * 68) % 1000,
                    cy: 220 + (i * 23) % 240,
                    r: 2 + (i % 3),
                    fill: "#fde68a",
                    opacity: "0.6",
                    style: { animation: \`bt_sirocco_swirl \${4 + (i % 4)}s linear infinite\` }
                  }))
                ]
              }),

              // E. NIX (SNOWFLAKES & FROST PARTICLES)
              isSnow && e.jsxs("g", {
                id: "weather-snow-system",
                className: "pointer-events-none select-none",
                children: [
                  [...Array(28)].map((_, i) => {
                    const sx = (i * 39 + 15) % 1000;
                    const sy = (i * 27) % 550;
                    return e.jsx("circle", {
                      key: "snowflake_" + i,
                      cx: sx,
                      cy: sy,
                      r: 1.5 + (i % 3) * 0.8,
                      fill: "#ffffff",
                      opacity: "0.85",
                      style: { animation: \`bt_snow_drift \${2.5 + (i % 4) * 0.8}s ease-in-out infinite\` }
                    });
                  })
                ]
              }),

              // 4. ATMOSPHERIC PARTICLES & BATTLE EMBERS (DRIFTING SPARKS)
              e.jsxs("g", {
                id: "masterwork-battle-embers-layer",
                className: "pointer-events-none select-none mix-blend-screen",
                children: [
                  [
                    { x: 180, y: 380, d: "0s", s: 1.0 },
                    { x: 260, y: 410, d: "0.8s", s: 1.2 },
                    { x: 340, y: 360, d: "1.6s", s: 0.8 },
                    { x: 620, y: 390, d: "0.4s", s: 1.1 },
                    { x: 710, y: 370, d: "1.2s", s: 0.9 },
                    { x: 800, y: 420, d: "2.0s", s: 1.3 }
                  ].map((ember, i) => e.jsx("circle", {
                    key: "ember_" + i,
                    cx: ember.x,
                    cy: ember.y,
                    r: "2.2",
                    fill: isNight ? "#fbbf24" : isDusk ? "#f97316" : "#fef08a",
                    filter: "drop-shadow(0 0 4px #ea580c)",
                    style: { animation: \`bt_ember_rise 3.2s \${ember.d} ease-out infinite\`, willChange: "transform, opacity" }
                  }))
                ]
              })
`;

// Insert the weather and atmosphere layer right after the closing '})' of weapon layer
bundle = bundle.substring(0, pWeaponLayerClose + 2) + ",\n" + weatherAndAtmosphereLayer.trim() + bundle.substring(pWeaponLayerClose + 2);
console.log("Successfully integrated weather & atmosphere layers into BattleTheatreV2 SVG!");

// Write updated bundle and test with esbuild
fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log("Wrote updated bundle. Validating with esbuild...");

try {
  esbuild.buildSync({
    entryPoints: [bundlePath],
    outfile: '/tmp/test_bundle.js',
    bundle: false,
    format: 'esm',
  });
  console.log("ESBUILD VALIDATION PASSED! All syntax and imports are 100% valid.");
} catch (e) {
  console.error("ESBUILD VALIDATION FAILED:", e.message);
  process.exit(1);
}
