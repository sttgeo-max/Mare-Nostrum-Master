const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING ARENA STABILITY & MASTERWORK ATMOSPHERE/WEATHER/SHADOWS/TIME-OF-DAY ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. ARENA STABILITY FIX: Ensure Combat Footer never collapses or resizes the battle arena when opponent attacks
const searchFooterStart = "turn === 'player' ? renderTacticalHandUI() : null,";
const pSearchStart = bundle.indexOf(searchFooterStart);

if (pSearchStart === -1) {
  console.error("Could not find searchFooterStart in bundle");
  process.exit(1);
}

// Find where this footer conditional ends
const pRetreat = bundle.indexOf("setShowRetreatConfirm(true)", pSearchStart);
const pFooterEnd = bundle.indexOf("}) : null", pRetreat);

if (pFooterEnd === -1) {
  console.error("Could not find pFooterEnd");
  process.exit(1);
}

const originalFooterBlock = bundle.substring(pSearchStart, pFooterEnd + 9);
console.log("Original footer block length:", originalFooterBlock.length);

// Build stable footer replacement that keeps exact identical height and dimensions during enemy attacks
const stableFooterCode = `
          // 1. TACTICAL HAND CONTAINER (Fixed Height to Prevent Layout Shift)
          e.jsx("div", {
            className: "w-full max-w-2xl min-h-[46px] flex items-center justify-center transition-all duration-300",
            children: turn === 'player' 
              ? (typeof renderTacticalHandUI === "function" ? renderTacticalHandUI() : null)
              : e.jsxs("div", {
                  className: "flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/40 shadow-inner",
                  children: [
                    e.jsx("span", { className: "text-amber-400 font-serif-title text-[10px] sm:text-xs tracking-widest font-black uppercase", children: "HOSTIS EXECUTING TACTICAL MANEUVER" }),
                    e.jsx("span", { className: "w-2 h-2 rounded-full bg-rose-500 animate-ping" }),
                    e.jsx("span", { className: "text-rose-300 font-mono text-[9px] font-bold", children: "STAND FAST • HOLD THE LINE" })
                  ]
                })
          }),

          // 2. COMMAND DISCIPLINES DECK (Invariant Height for Zero Battle Arena Resize)
          e.jsxs("div", {
            className: "flex flex-col gap-1.5 w-full max-w-2xl mx-auto py-1 min-h-[105px] justify-between",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between w-full px-2 text-[8.5px] sm:text-[9.5px] font-cinzel font-black tracking-wider uppercase border-t border-amber-500/25 pt-1.5 transition-colors duration-300 " + (turn === "player" ? "text-amber-300" : "text-rose-400/90"),
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      e.jsx("span", { className: turn === "player" ? "text-amber-400 animate-pulse" : "text-rose-400 animate-pulse", children: turn === "player" ? "⚡" : "⚔" }),
                      e.jsx("span", { children: turn === "player" ? "COMMAND DISCIPLINES (DISCIPLINA BELLICA)" : "ENEMY ATTACK IN PROGRESS (HOSTIS AGIT)" })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      e.jsx("span", { className: turn === "player" ? "text-amber-400/80 font-mono font-bold text-[8px]" : "text-stone-500 font-mono font-bold text-[8px]", children: turn === "player" ? "ACTIONS" : "LOCKED" }),
                      e.jsx("span", { className: "text-rose-400/80 font-mono font-bold text-[8px]", children: "DISENGAGE" })
                    ]
                  })
                ]
              }),
              e.jsxs("div", {
                className: "flex items-center justify-between gap-1.5 sm:gap-4 w-full px-1",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar pt-1 pb-1 px-1 " + (turn === "player" ? "" : "opacity-40 pointer-events-none grayscale-[40%]"),
                    children: [
                      ...defaultAbilities.map(ability => {
                        const isAffordable = turn === "player" && actionPoints >= ability.cost;
                        return e.jsxs("div", {
                          key: ability.id,
                          onMouseEnter: () => turn === "player" && setHoveredAbility(ability),
                          onMouseLeave: () => turn === "player" && setHoveredAbility(null),
                          className: "flex flex-col items-center gap-0.5 group relative select-none shrink-0",
                          children: [
                            e.jsxs("div", {
                              className: "relative",
                              children: [
                                e.jsx(Vr, {
                                  onClick: () => isAffordable && playAbility(ability),
                                  disabled: !isAffordable,
                                  variant: ability.variant,
                                  emblem: ability.emblem,
                                  showGlow: isAffordable,
                                  title: \`\${ability.name} (\${ability.cost} AP)\`
                                }),
                                e.jsx("div", {
                                  className: \`absolute -top-1 -right-1 w-4 h-4 rounded-full border text-[8.5px] font-mono font-black flex items-center justify-center shadow pointer-events-none \${isAffordable ? "bg-black/95 border-amber-400 text-amber-300" : "bg-rose-950/90 border-rose-600 text-rose-300"}\`,
                                  children: ability.cost
                                })
                              ]
                            }),
                            e.jsx("span", {
                              className: \`font-cinzel font-black text-[8px] sm:text-[9.5px] tracking-tight leading-none uppercase transition-colors text-center whitespace-normal break-words max-w-[64px] sm:max-w-[80px] \${isAffordable ? "text-amber-200 group-hover:text-amber-300 drop-shadow" : "text-stone-500"}\`,
                              children: ability.name
                            }),
                            e.jsx("span", {
                              className: \`font-mono text-[7px] sm:text-[8px] font-bold -mt-0.5 truncate max-w-[56px] sm:max-w-[70px] text-center \${isAffordable ? "text-amber-400/90" : "text-stone-600"}\`,
                              children: ability.tag
                            })
                          ]
                        });
                      }),
                      e.jsx("div", { className: "w-8 shrink-0 h-1" })
                    ]
                  }),
                  e.jsx("div", { className: "w-[1.5px] h-10 bg-amber-500/40 shrink-0 mx-0.5" }),
                  e.jsxs("div", {
                    className: "flex items-center gap-2 sm:gap-3 shrink-0",
                    children: [
                      e.jsxs("div", {
                        className: "flex flex-col items-center gap-0.5 cursor-pointer group select-none active:scale-95 " + (turn === "player" ? "" : "opacity-40 pointer-events-none"),
                        children: [
                          e.jsx(Vr, {
                            onClick: () => { if (turn === "player" && actionPoints >= 0) endTurn(); },
                            variant: "gold",
                            emblem: "hourglass",
                            showGlow: turn === "player" && actionPoints === 0,
                            title: "End Turn (Finis)"
                          }),
                          e.jsx("span", {
                            className: "font-cinzel font-black text-[9px] sm:text-[10px] text-amber-300 group-hover:text-amber-200 tracking-wider uppercase drop-shadow",
                            children: "End Turn"
                          }),
                          e.jsx("span", {
                            className: "font-mono text-[7.5px] sm:text-[8px] text-amber-400 font-bold -mt-0.5",
                            children: "FINIS"
                          })
                        ]
                      }),
                      e.jsxs("div", {
                        className: "flex flex-col items-center gap-0.5 cursor-pointer group select-none active:scale-95",
                        children: [
                          e.jsx(Vr, {
                            onClick: () => setShowRetreatConfirm(true),
                            variant: "crimson",
                            emblem: "target",
                            showGlow: false,
                            title: "Retreat (Recede)"
                          }),
                          e.jsx("span", {
                            className: "font-cinzel font-black text-[9px] sm:text-[10px] text-rose-300 group-hover:text-rose-200 tracking-wider uppercase drop-shadow",
                            children: "Retreat"
                          }),
                          e.jsx("span", {
                            className: "font-mono text-[7.5px] sm:text-[8px] text-rose-400 font-bold -mt-0.5",
                            children: "RECEDE"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
`;

bundle = bundle.replace(originalFooterBlock, stableFooterCode.trim());
console.log("Applied stable footer layout!");

// 2. MASTERWORK ATMOSPHERE, WEATHER, SHADOWS, TIME-OF-DAY ENHANCEMENTS IN BATTLETHEATREV2
// Let us inspect the beginning of BattleTheatreV2 SVG in the bundle
const svgAnchor = 'id: "battle-theatre-v2-root",';
const pSvgRoot = bundle.indexOf(svgAnchor);
console.log("pSvgRoot found at:", pSvgRoot);

// Let's also check and enhance the weather variable resolution at the top of BattleTheatreV2
const pTodDef = bundle.indexOf("const tod = String(timeOfDay || \"DIES\").toUpperCase();", pSvgRoot - 2500);
if (pTodDef !== -1) {
  const pWeatherInject = `
  const tod = String(timeOfDay || "DIES").toUpperCase();
  const wStr = String(weather || "CLEAR").toUpperCase();
  const isRain = wStr.includes("RAIN") || wStr.includes("PLUVIA");
  const isStorm = wStr.includes("STORM") || wStr.includes("TEMPEST") || wStr.includes("TEMPESTAS");
  const isFog = wStr.includes("FOG") || wStr.includes("NEBULA") || wStr.includes("MIST");
  const isSirocco = wStr.includes("SIROCCO") || wStr.includes("DUST") || (reg.includes("egypt") && wStr.includes("WIND"));
  const isSnow = wStr.includes("SNOW") || wStr.includes("NIX") || (reg.includes("rhine") && (tod === "NOX" || wStr.includes("WINTER")));
`;
  bundle = bundle.replace("const tod = String(timeOfDay || \"DIES\").toUpperCase();", pWeatherInject.trim());
  console.log("Enhanced weather and time-of-day variables!");
}

// 3. Inject Masterwork CSS keyframes for Weather & Atmospheric lighting if not present
const cssKeyframes = `
@keyframes bt_lightning_flash {
  0%, 88%, 94%, 100% { opacity: 0; }
  89%, 93% { opacity: 0.95; }
  90% { opacity: 0.2; }
  92% { opacity: 0.8; }
}
@keyframes bt_rain_fall {
  0% { transform: translateY(-120px) translateX(-30px); }
  100% { transform: translateY(600px) translateX(150px); }
}
@keyframes bt_snow_drift {
  0% { transform: translateY(-40px) translateX(0px); }
  50% { transform: translateY(300px) translateX(40px); }
  100% { transform: translateY(640px) translateX(-20px); }
}
@keyframes bt_fog_drift {
  0% { transform: translateX(-60px); opacity: 0.35; }
  50% { transform: translateX(40px); opacity: 0.65; }
  100% { transform: translateX(-60px); opacity: 0.35; }
}
@keyframes bt_sirocco_swirl {
  0% { transform: translateX(-100px) translateY(10px); opacity: 0.25; }
  50% { transform: translateX(80px) translateY(-15px); opacity: 0.55; }
  100% { transform: translateX(200px) translateY(5px); opacity: 0.25; }
}
@keyframes bt_godray_pulse {
  0%, 100% { opacity: 0.22; }
  50% { opacity: 0.45; }
}
@keyframes bt_ember_rise {
  0% { transform: translateY(0px) translateX(0px) scale(0.8); opacity: 0.9; }
  50% { transform: translateY(-80px) translateX(15px) scale(1.1); opacity: 0.6; }
  100% { transform: translateY(-180px) translateX(-10px) scale(0.5); opacity: 0; }
}
`;

// Insert the CSS into index.html or dist/index.html if not already present
['index.html', 'dist/index.html'].forEach(htmlFile => {
  if (fs.existsSync(htmlFile)) {
    let html = fs.readFileSync(htmlFile, 'utf8');
    if (!html.includes('bt_lightning_flash')) {
      html = html.replace('</head>', `<style id="masterwork-atmosphere-fx">\n${cssKeyframes}\n</style>\n</head>`);
      fs.writeFileSync(htmlFile, html, 'utf8');
      console.log(`Injected masterwork atmosphere CSS into ${htmlFile}`);
    }
  }
});

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
  console.log("ESBUILD VALIDATION PASSED! No syntax errors.");
} catch (e) {
  console.error("ESBUILD VALIDATION FAILED:", e.message);
  process.exit(1);
}
