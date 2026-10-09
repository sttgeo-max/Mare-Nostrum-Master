const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== INJECTING MASTERWORK FULL-BLEED ARENA ENVIRONMENTS (ZERO BARS) ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Find the return of BattleTheatreV2
const pReturn = bundle.indexOf('return e.jsxs("div", {\n    id: "battle-theatre-v2-root"');
const pSvgStart = bundle.indexOf('e.jsxs("svg", {\n        viewBox: "0 0 800 380"', pReturn);
const pUnitsStart = bundle.indexOf('// === DYNAMIC UNIT DISPATCH WITH MASTERWORK 2.5D VISUAL ENGINE ===', pSvgStart);

if (pReturn === -1 || pSvgStart === -1 || pUnitsStart === -1) {
  console.error("Could not find landmarks in BattleTheatreV2:", { pReturn, pSvgStart, pUnitsStart });
  process.exit(1);
}

// Full-Bleed Environment System replacing the old SVG background
const masterworkFullBleedEnvSystem = `// 1. FULL-BLEED MASTERWORK 2.5D BATTLEFIELD ENVIRONMENT (EDGE-TO-EDGE, ZERO BARS)
      e.jsxs("svg", {
        viewBox: "0 0 1000 600",
        preserveAspectRatio: "none",
        className: "absolute inset-0 w-full h-full pointer-events-none select-none",
        children: [
          // Background Gradient Defs
          e.jsxs("defs", {
            children: [
              // Sea Base Sky & Water Gradients
              e.jsxs("linearGradient", {
                id: "fb_sky_grad", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: isNight ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#020617" }),
                  e.jsx("stop", { offset: "45%", stopColor: "#0f172a" }),
                  e.jsx("stop", { offset: "75%", stopColor: "#1e1b4b" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#09090b" })
                ] : isDusk ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#1e1b4b" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#701a75" }),
                  e.jsx("stop", { offset: "65%", stopColor: "#c2410c" }),
                  e.jsx("stop", { offset: "88%", stopColor: "#f59e0b" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
                ] : isDawn ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#1e1b4b" }),
                  e.jsx("stop", { offset: "40%", stopColor: "#831843" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#db2777" }),
                  e.jsx("stop", { offset: "90%", stopColor: "#fde047" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
                ] : [
                  e.jsx("stop", { offset: "0%", stopColor: "#0369a1" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#0284c7" }),
                  e.jsx("stop", { offset: "65%", stopColor: "#38bdf8" }),
                  e.jsx("stop", { offset: "85%", stopColor: "#bae6fd" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
                ]
              }),

              // Deep Ocean Floor Gradient
              e.jsxs("linearGradient", {
                id: "fb_sea_deep", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: isNight ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#051124" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#030c1c" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#010307" })
                ] : isDusk ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#3b0764" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#1e1b4b" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
                ] : isDawn ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#4c0519" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#1e1b4b" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0c0a09" })
                ] : [
                  e.jsx("stop", { offset: "0%", stopColor: "#075985" }),
                  e.jsx("stop", { offset: "30%", stopColor: "#0369a1" }),
                  e.jsx("stop", { offset: "65%", stopColor: "#0c4a6e" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#082f49" })
                ]
              }),

              // Land Ground Terrain Gradient
              e.jsxs("linearGradient", {
                id: "fb_land_ground", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: isNight ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#110e18" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#0d0913" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#040206" })
                ] : isDusk ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#451a03" }),
                  e.jsx("stop", { offset: "40%", stopColor: "#291307" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#120804" })
                ] : isDawn ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#33161f" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#210e15" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0d0408" })
                ] : isEgyptLevant ? [
                  e.jsx("stop", { offset: "0%", stopColor: "#78350f" }),
                  e.jsx("stop", { offset: "40%", stopColor: "#92400e" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#451a03" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#1c1917" })
                ] : [
                  e.jsx("stop", { offset: "0%", stopColor: "#3f220f" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#4a2810" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#2e1809" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#140b04" })
                ]
              }),

              // Sun / Moon Glow
              e.jsxs("radialGradient", {
                id: "fb_celestial_glow", cx: "50%", cy: "50%", r: "50%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: isNight ? "#ffffff" : isDusk ? "#fbbf24" : "#fef08a", stopOpacity: "1" }),
                  e.jsx("stop", { offset: "35%", stopColor: isNight ? "#93c5fd" : isDusk ? "#f97316" : "#f59e0b", stopOpacity: "0.6" }),
                  e.jsx("stop", { offset: "75%", stopColor: isNight ? "#3b82f6" : isDusk ? "#dc2626" : "#d97706", stopOpacity: "0.2" }),
                  e.jsx("stop", { offset: "100%", stopColor: "transparent", stopOpacity: "0" })
                ]
              })
            ]
          }),

          // 1. SKY CANVAS (FULL BLEED)
          e.jsx("rect", { x: "0", y: "0", width: "1000", height: "600", fill: "url(#fb_sky_grad)" }),

          // 2. CELESTIAL ORB (SOL INVICTUS / LUNA GLOW)
          e.jsxs("g", {
            transform: "translate(500, 75)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "85", fill: "url(#fb_celestial_glow)", className: "animate-pulse" }),
              e.jsx("circle", { cx: "0", cy: "0", r: isNight ? "18" : "26", fill: isNight ? "#f8fafc" : "#fef08a" }),
              // God rays / Solar Flare
              !isNight && [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => e.jsx("line", {
                key: "sun_ray_" + i,
                x1: "0", y1: "0",
                x2: Math.cos(deg * Math.PI / 180) * 120,
                y2: Math.sin(deg * Math.PI / 180) * 120,
                stroke: "rgba(254,240,138,0.25)",
                strokeWidth: "2",
                strokeLinecap: "round"
              }))
            ]
          }),

          // 3. STARRY CONSTELLATIONS AT NIGHT
          isNight && e.jsxs("g", {
            children: [
              [ { cx: 120, cy: 45, r: 2 }, { cx: 240, cy: 35, r: 1.5 }, { cx: 380, cy: 60, r: 2 }, { cx: 640, cy: 30, r: 2.2 }, { cx: 780, cy: 55, r: 1.8 }, { cx: 890, cy: 40, r: 2 } ].map((st, i) => e.jsx("circle", {
                key: "star_" + i,
                cx: st.cx,
                cy: st.cy,
                r: st.r,
                fill: "#ffffff",
                className: "animate-ping"
              }))
            ]
          }),

          // 4. CLOUDS & ATMOSPHERIC MIST
          e.jsxs("g", {
            opacity: isNight ? "0.35" : "0.55",
            children: [
              e.jsx("path", { d: "M 0,90 Q 180,60 360,95 Q 540,65 720,90 Q 900,65 1000,85 L 1000,140 L 0,140 Z", fill: isDusk ? "rgba(194,65,12,0.4)" : isNight ? "rgba(30,27,75,0.4)" : "rgba(255,255,255,0.35)" }),
              e.jsx("path", { d: "M 0,115 Q 220,90 440,120 Q 660,95 880,120 Q 950,105 1000,115 L 1000,165 L 0,165 Z", fill: isDusk ? "rgba(124,45,18,0.3)" : "rgba(255,255,255,0.25)" })
            ]
          }),

          // =========================================================================
          // === 5A. NAVAL ENVIRONMENT (MEDITERRANEAN THEATRUM NAVALE) ===
          // =========================================================================
          isNaval ? e.jsxs("g", {
            id: "fb_naval_backdrop",
            children: [
              // Distant Mediterranean Archipelago Mountains & Capri Cliffs
              e.jsx("path", {
                d: "M 0,150 Q 120,115 250,140 Q 380,110 520,145 Q 680,115 820,140 Q 920,120 1000,145 L 1000,195 L 0,195 Z",
                fill: isNight ? "#061329" : isDusk ? "#2e1065" : isDawn ? "#4a044e" : "#0c4a6e",
                opacity: "0.9"
              }),
              e.jsx("path", {
                d: "M 0,165 Q 160,135 320,160 Q 500,135 680,165 Q 850,140 1000,160 L 1000,195 L 0,195 Z",
                fill: isNight ? "#020c1b" : isDusk ? "#1e1b4b" : isDawn ? "#3b0764" : "#0369a1",
                opacity: "0.95"
              }),

              // Pharos Lighthouse & Coastal Roman Watchtower Beacon on Horizon
              e.jsxs("g", {
                transform: "translate(860, 115)",
                children: [
                  e.jsx("rect", { x: "-6", y: "0", width: "12", height: "35", fill: "#fef3c7", stroke: "#78350f", strokeWidth: "1" }),
                  e.jsx("polygon", { points: "-8,0 0,-10 8,0", fill: "#dc2626", stroke: "#fbbf24", strokeWidth: "1" }),
                  e.jsx("circle", { cx: "0", cy: "-2", r: "5", fill: "#fef08a", className: "animate-ping" }),
                  // Sweeping Lighthouse Light Beam across sea
                  e.jsx("polygon", { points: "0,-2 -400,80 -380,120", fill: "rgba(254,240,138,0.22)" })
                ]
              }),

              // FULL-BLEED ROLLING OCEAN BODY (FROM HORIZON Y=175 TO BOTTOM Y=600)
              e.jsx("rect", { x: "0", y: "175", width: "1000", height: "425", fill: "url(#fb_sea_deep)" }),

              // 5 Layered Depth Planes of Rolling Ocean Waves
              [
                { y: 210, h: 18, op: 0.45, col: "rgba(224,242,254,0.3)" },
                { y: 270, h: 24, op: 0.6, col: "rgba(186,230,253,0.4)" },
                { y: 340, h: 32, op: 0.75, col: "rgba(125,211,252,0.45)" },
                { y: 430, h: 42, op: 0.85, col: "rgba(56,189,248,0.5)" },
                { y: 530, h: 55, op: 0.95, col: "rgba(255,255,255,0.6)" }
              ].map((wave, idx) => e.jsxs("g", {
                key: "sea_wave_tier_" + idx,
                children: [
                  e.jsx("path", {
                    d: "M 0," + wave.y + " Q 250," + (wave.y - wave.h) + " 500," + wave.y + " Q 750," + (wave.y + wave.h) + " 1000," + wave.y + " L 1000,600 L 0,600 Z",
                    fill: isNight ? "#030c1c" : isDusk ? "#1e1b4b" : "#0284c7",
                    opacity: (0.35 + idx * 0.12).toString()
                  }),
                  e.jsx("path", {
                    d: "M 0," + wave.y + " Q 250," + (wave.y - wave.h) + " 500," + wave.y + " Q 750," + (wave.y + wave.h) + " 1000," + wave.y,
                    fill: "none",
                    stroke: wave.col,
                    strokeWidth: (2 + idx * 0.8).toString(),
                    strokeLinecap: "round"
                  })
                ]
              })),

              // Swimming Dolphins in Background
              e.jsxs("g", {
                transform: "translate(420, 240)",
                opacity: "0.75",
                children: [
                  e.jsx("path", { d: "M 0,0 Q 15,-18 30,-5 Q 35,-12 40,-8 Q 28,8 0,0 Z", fill: "#38bdf8" }),
                  e.jsx("circle", { cx: "32", cy: "6", r: "4", fill: "rgba(255,255,255,0.7)" })
                ]
              })
            ]
          }) :

          // =========================================================================
          // === 5B. LAND ENVIRONMENT (ROMAN CAMPUS BELLICUS) ===
          // =========================================================================
          e.jsxs("g", {
            id: "fb_land_backdrop",
            children: [
              // Distant Apennine / Alpine Mountain Peaks
              e.jsx("path", {
                d: "M 0,150 L 140,80 L 280,155 L 420,70 L 560,160 L 720,75 L 860,150 L 1000,90 L 1000,200 L 0,200 Z",
                fill: isNight ? "#09090b" : isDusk ? "#3b0764" : isDawn ? "#4a044e" : "#1e293b",
                opacity: "0.85"
              }),
              e.jsx("path", {
                d: "M 0,170 Q 200,120 400,165 Q 650,115 850,165 Q 940,140 1000,170 L 1000,205 L 0,205 Z",
                fill: isNight ? "#18181b" : isDusk ? "#451a03" : isDawn ? "#2e1065" : "#334155",
                opacity: "0.9"
              }),

              // Distant Double-Tier Roman Aqueduct Arches spanning the horizon
              e.jsxs("g", {
                transform: "translate(120, 125)",
                children: [
                  e.jsx("line", { x1: "0", y1: "0", x2: "320", y2: "0", stroke: "#fef3c7", strokeWidth: "4.5" }),
                  [0, 40, 80, 120, 160, 200, 240, 280].map((ax, i) => e.jsxs("g", {
                    key: "aqueduct_arch_" + i,
                    transform: "translate(" + ax + ", 0)",
                    children: [
                      e.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "45", stroke: "#fef3c7", strokeWidth: "4" }),
                      e.jsx("path", { d: "M 0,0 Q 20,-14 40,0", fill: "none", stroke: "#fef3c7", strokeWidth: "3" }),
                      e.jsx("path", { d: "M 0,20 Q 20,8 40,20", fill: "none", stroke: "#fef3c7", strokeWidth: "2.5" })
                    ]
                  }))
                ]
              }),

              // Distant Roman Acropolis Temple on Horizon Hill
              e.jsxs("g", {
                transform: "translate(760, 120)",
                children: [
                  e.jsx("polygon", { points: "-35,0 0,-18 35,0", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1.2" }),
                  [-25, -12, 0, 12, 25].map((cx, i) => e.jsx("line", {
                    key: "col_" + i,
                    x1: cx, y1: "0", x2: cx, y2: "26",
                    stroke: "#fef3c7", strokeWidth: "3"
                  })),
                  e.jsx("rect", { x: "-38", y: "26", width: "76", height: "6", fill: "#d97706" })
                ]
              }),

              // FULL-BLEED ROLLING TERRAIN BODY (FROM HORIZON Y=175 TO BOTTOM Y=600)
              e.jsx("rect", { x: "0", y: "175", width: "1000", height: "425", fill: "url(#fb_land_ground)" }),

              // 4 Multi-Tier Rolling Earth & Dirt Dunes
              [
                { y: 220, col: isNight ? "#18181b" : "#451a03", h: 20 },
                { y: 300, col: isNight ? "#120e18" : "#573012", h: 28 },
                { y: 400, col: isNight ? "#0d0913" : "#4a2810", h: 36 },
                { y: 510, col: isNight ? "#060408" : "#3b1e0a", h: 48 }
              ].map((tier, idx) => e.jsx("path", {
                key: "terrain_tier_" + idx,
                d: "M 0," + tier.y + " Q 280," + (tier.y - tier.h) + " 550," + tier.y + " Q 820," + (tier.y + tier.h) + " 1000," + tier.y + " L 1000,600 L 0,600 Z",
                fill: tier.col,
                opacity: (0.8 + idx * 0.05).toString()
              })),

              // Roman Military Highway (Via Appia) Paved Basalt Stones
              [240, 320, 410, 500].map((ry, idx) => e.jsxs("g", {
                key: "via_appia_" + idx,
                children: [
                  e.jsx("line", { x1: "40", y1: ry, x2: "960", y2: ry, stroke: "#1c1917", strokeWidth: (3 + idx * 0.8).toString() }),
                  e.jsx("line", { x1: "40", y1: ry - 1, x2: "960", y2: ry - 1, stroke: "#d97706", strokeWidth: (1.5 + idx * 0.5).toString(), strokeDasharray: "25 12" })
                ]
              })),

              // Roman Campfire & Watch Brazier with Flickering Flame Smoke
              e.jsxs("g", {
                transform: "translate(490, 260)",
                children: [
                  e.jsx("polygon", { points: "-15,10 15,10 10,-5 -10,-5", fill: "#78350f", stroke: "#fbbf24", strokeWidth: "1.5" }),
                  e.jsx("ellipse", { cx: "0", cy: "-8", rx: "12", ry: "16", fill: "url(#grad-greek-fire)", className: "animate-pulse" }),
                  e.jsx("circle", { cx: "0", cy: "-26", r: "8", fill: "rgba(87,83,78,0.6)", className: "animate-ping" })
                ]
              }),

              // Iconic Mediterranean Umbrella Pine Trees (Pinus pinea)
              [ { x: 80, y: 220, s: 0.8 }, { x: 920, y: 240, s: 0.9 }, { x: 180, y: 310, s: 0.65 } ].map((tree, idx) => e.jsxs("g", {
                key: "pine_tree_" + idx,
                transform: "translate(" + tree.x + ", " + tree.y + ") scale(" + tree.s + ")",
                children: [
                  e.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "-50", stroke: "#451a03", strokeWidth: "5", strokeLinecap: "round" }),
                  e.jsx("ellipse", { cx: "0", cy: "-55", rx: "32", ry: "16", fill: "#14532d", stroke: "#052e16", strokeWidth: "1" }),
                  e.jsx("ellipse", { cx: "0", cy: "-62", rx: "24", ry: "12", fill: "#166534" })
                ]
              }))
            ]
          }),

          // Edge Vignette Shading
          e.jsx("rect", { x: "0", y: "0", width: "1000", height: "600", fill: "url(#fb_vignette)", opacity: "0.6" })
        ]
      }),

      // 2. FOREGROUND UNITS, WEAPONS & COMBAT FX LAYER (CENTERED VIEWBOX 0 0 800 380)
      e.jsxs("svg", {
        viewBox: "0 0 800 380",
        preserveAspectRatio: "xMidYMid meet",
        className: "relative z-10 w-full h-full object-contain pointer-events-none select-none overflow-visible",
        children: [
          // Embedded Keyframes & Dynamic Shaders
          e.jsx("style", {
            children: \`
              @keyframes bt_gladius_cleave {
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
              @keyframes bt_javelin_flight {
                0% { transform: translate3d(0,0,0); opacity: 0; }
                15% { opacity: 1; }
                85% { opacity: 1; }
                100% { transform: translate3d(430px,0,0); opacity: 0; }
              }
            \`
          }),

          // Shaders & Gradients for Weapons and Shields
          e.jsxs("defs", {
            children: [
              e.jsxs("linearGradient", {
                id: "grad-gladius-edge", x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
                  e.jsx("stop", { offset: "40%", stopColor: "#ffffff" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#f59e0b" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#ef4444" })
                ]
              }),
              e.jsxs("radialGradient", {
                id: "grad-greek-fire", cx: "50%", cy: "50%", r: "50%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#f97316" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#dc2626" }),
                  e.jsx("stop", { offset: "100%", stopColor: "transparent" })
                ]
              })
            ]
          }),

          `;

bundle = bundle.substring(0, pSvgStart) + masterworkFullBleedEnvSystem + bundle.substring(pUnitsStart);

// Validate with esbuild
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js updated with Masterwork Full-Bleed Environment Engine!");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
