const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING BESPOKE LAND & SEA COMBAT SPECIALIZATION ===");

const filePath = path.join(__dirname, '../public/assets/index-V37.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Precise replacement of renderGauge
const oldGaugePrefix = "const renderGauge = (curr, max, block, isPlayer) => {";
const pGaugeStart = code.indexOf(oldGaugePrefix);
if (pGaugeStart !== -1) {
  // Find the end of renderGauge function
  const pGaugeEnd = code.indexOf("};\n", pGaugeStart) !== -1 
    ? code.indexOf("};\n", pGaugeStart) + 2 
    : code.indexOf("};", pGaugeStart) + 2;

  const newGaugeFunc = `const renderGauge = (curr, max, block, isPlayer) => {
    const pct = Math.min(100, Math.max(0, (curr / max) * 100));
    const subMetricPct = Math.min(100, Math.max(20, Math.round(pct * 0.92 + 8)));
    return e.jsxs("div", {
      className: "flex flex-col gap-0.5 w-full min-w-[105px] max-w-[150px] sm:max-w-[210px]",
      children: [
        e.jsxs("div", {
          className: \`flex items-center justify-between text-[9px] sm:text-[10.5px] font-mono font-bold tracking-wider \${isPlayer ? 'text-[#F3E7C8]' : 'text-rose-200'}\`,
          children: [
            e.jsxs("span", { children: [Math.floor(curr), "/", max] }),
            block > 0 && e.jsxs("span", {
              className: "text-sky-300 flex items-center gap-0.5 text-[8px] sm:text-[9px]",
              children: [
                e.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-2.5 h-2.5", children: e.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }) }),
                "+", block
              ]
            })
          ]
        }),
        e.jsx("div", {
          className: "h-2 sm:h-2.5 w-full bg-black/90 rounded-full border border-[#C9A351]/40 overflow-hidden relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)]",
          children: e.jsx("div", {
            className: \`h-full transition-all duration-300 rounded-full \${isPlayer ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-gradient-to-r from-red-800 via-rose-600 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]'}\`,
            style: {
              width: \`\${pct}%\`
            }
          })
        }),
        e.jsxs("div", {
          className: "flex items-center justify-between text-[7px] sm:text-[8px] font-mono tracking-tighter opacity-90 px-0.5",
          children: [
            isSea ? e.jsxs("span", {
              className: isPlayer ? "text-cyan-300 font-bold" : "text-stone-400",
              children: [isPlayer ? "⚓ REMES: " : "CREW: ", subMetricPct, "%"]
            }) : e.jsxs("span", {
              className: isPlayer ? "text-amber-300 font-bold" : "text-stone-400",
              children: [isPlayer ? "🦅 DISCIPLINA: " : "MORALE: ", subMetricPct > 50 ? (isPlayer ? "INTREPIDUS" : "STEADFAST") : "TITUBANS"]
            }),
            e.jsx("span", {
              className: isPlayer ? "text-amber-400/90 font-bold" : "text-rose-400/90",
              children: isSea ? (isPlayer ? "VELUM 100%" : "HULL") : (isPlayer ? "ACIES I" : "HOSTIS")
            })
          ]
        })
      ]
    });
  };`;

  code = code.substring(0, pGaugeStart) + newGaugeFunc + code.substring(pGaugeEnd);
  console.log("✓ Successfully replaced renderGauge with bespoke Land and Sea gauges.");
} else {
  console.log("❌ Could not locate renderGauge anchor.");
}

// 2. Precise replacement of combat-top-hud sub-bar
const oldSubBarAnchor = `e.jsxs("div", {
            className: "w-full flex items-center justify-between px-1 text-[8px] xs:text-[8.5px] sm:text-[10px] max-w-4xl mx-auto border-t border-amber-500/25 pt-1 gap-1",`;

const pSubBarStart = code.indexOf(oldSubBarAnchor);
if (pSubBarStart !== -1) {
  // Find where this div ends before battle-theatre-v2-container
  const pTheatreContainer = code.indexOf(`id: "battle-theatre-v2-container"`, pSubBarStart);
  if (pTheatreContainer !== -1) {
    // Find the closing of this subbar div right before e.jsx("main"
    const pSubBarEnd = code.lastIndexOf(`]          })        ]`, pTheatreContainer);
    
    if (pSubBarEnd !== -1) {
      const newSubBarJSX = `e.jsxs("div", {
            className: "w-full flex flex-col gap-1 max-w-4xl mx-auto border-t border-amber-500/30 pt-1 px-1",
            children: [
              e.jsxs("div", {
                className: "w-full flex items-center justify-between text-[8px] xs:text-[8.5px] sm:text-[10px] gap-1",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-1.5 shrink-0",
                    children: [
                      e.jsx("span", {
                        className: "px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-500/50 font-cinzel text-[7px] xs:text-[8px] sm:text-[8.5px] font-black text-amber-300 tracking-wider uppercase",
                        children: isSea ? "🌊 MARE" : "🏛️ CASTRA"
                      }),
                      e.jsx("span", {
                        className: "font-cinzel text-amber-200 font-bold tracking-wider uppercase text-[8px] xs:text-[8.5px] sm:text-[9.5px] truncate max-w-[100px] xs:max-w-[130px] sm:max-w-[180px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",
                        children: l ? (l.length > 20 ? l.substring(0, 18) + "…" : l) : (isSea ? "MARE NOSTRUM" : "PROVINCIA ROMANA")
                      })
                    ]
                  }),
                  isSea ? e.jsxs("div", {
                    className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-[7.5px] xs:text-[8px] sm:text-[9px] text-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.25)]",
                    children: [
                      e.jsx("span", { className: "text-amber-300", children: "🧭" }),
                      e.jsx("span", { className: "font-cinzel font-black tracking-wider text-cyan-100", children: "VENTUS: AQUILO ↗" }),
                      e.jsx("span", { className: "text-amber-400 font-mono font-bold hidden xs:inline", children: "• +1 RAM" })
                    ]
                  }) : e.jsxs("div", {
                    className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-[7.5px] xs:text-[8px] sm:text-[9px] text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.25)]",
                    children: [
                      e.jsx("span", { className: "text-amber-400", children: "🏔️" }),
                      e.jsx("span", { className: "font-cinzel font-black tracking-wider text-amber-100", children: "ALTITUDO: HIGH GROUND" }),
                      e.jsx("span", { className: "text-emerald-400 font-mono font-bold hidden xs:inline", children: "• +15% PILUM" })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center gap-1.5 shrink-0",
                    children: [
                      e.jsxs("div", {
                        className: "flex items-center gap-1 bg-[#03060f]/90 px-2 py-0.5 rounded-full border border-amber-500/40 shadow-inner",
                        children: [
                          e.jsx("span", { className: "font-cinzel text-[7.5px] sm:text-[8.5px] text-amber-300 font-black uppercase", children: "AP:" }),
                          e.jsx("div", {
                            className: "flex items-center gap-0.5",
                            children: Array.from({ length: maxAP }).map((_, idx) => e.jsx("div", {
                              key: idx,
                              className: \`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border transition-all duration-300 \${idx < actionPoints ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-100 shadow-[0_0_8px_rgba(245,158,11,1)]' : 'bg-stone-950 border-stone-800 opacity-30'}\`
                            }))
                          }),
                          e.jsxs("span", { className: "font-mono text-[7.5px] sm:text-[8.5px] text-[#F3E7C8] font-bold ml-0.5", children: [actionPoints, "/", maxAP] })
                        ]
                      }),
                      e.jsx("div", {
                        className: "font-mono text-amber-300/90 font-bold tracking-tight text-[7.5px] sm:text-[8.5px] truncate max-w-[85px] xs:max-w-[110px] text-right",
                        children: currentIntent ? \`⚔ \${currentIntent.label}\` : "—"
                      })
                    ]
                  })
                ]
              }),
              e.jsxs("div", {
                className: "w-full flex items-center justify-between text-[7px] xs:text-[7.5px] sm:text-[8.5px] px-1 font-cinzel font-bold border-t border-amber-500/15 pt-0.5 text-stone-300",
                children: [
                  isSea ? e.jsxs("div", {
                    className: "flex items-center gap-1 sm:gap-2",
                    children: [
                      e.jsx("span", { className: "text-amber-400 font-black", children: "NAVAL RANGE:" }),
                      e.jsx("span", { className: "text-cyan-300 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/30", children: "⚓ DISTANS" }),
                      e.jsx("span", { className: "text-stone-500 hidden xs:inline", children: "➔" }),
                      e.jsx("span", { className: "text-stone-400 hidden xs:inline", children: "⚡ CURSUS (RAM)" }),
                      e.jsx("span", { className: "text-stone-500 hidden sm:inline", children: "➔" }),
                      e.jsx("span", { className: "text-stone-500 hidden sm:inline", children: "⚔ INCURSIO" })
                    ]
                  }) : e.jsxs("div", {
                    className: "flex items-center gap-1 sm:gap-2",
                    children: [
                      e.jsx("span", { className: "text-amber-400 font-black", children: "FORMATION:" }),
                      e.jsx("span", { className: "text-amber-300 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/30", children: "🛡️ TESTUDO" }),
                      e.jsx("span", { className: "text-stone-500 hidden xs:inline", children: "•" }),
                      e.jsx("span", { className: "text-stone-400 hidden xs:inline", children: "⚔ HASTATI" }),
                      e.jsx("span", { className: "text-stone-500 hidden sm:inline", children: "•" }),
                      e.jsx("span", { className: "text-stone-500 hidden sm:inline", children: "🦅 TRIARII" })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center gap-1 text-amber-400/90 font-mono text-[7px] sm:text-[8px]",
                    children: [
                      e.jsx("span", { children: currentWeatherMeta.icon }),
                      e.jsx("span", { className: "hidden xs:inline uppercase", children: currentWeatherMeta.latin })
                    ]
                  })
                ]
              })
            ]
          })`;

      code = code.substring(0, pSubBarStart) + newSubBarJSX + code.substring(pSubBarEnd);
      console.log("✓ Successfully injected bespoke Land & Sea sub-bar HUD widgets.");
    }
  }
}

// 3. Update bottom HUD banner for Land vs Sea distinction
const oldBottomBanner = `e.jsx("span", { children: turn === "player" ? "COMMAND DISCIPLINES (DISCIPLINA BELLICA)" : "ENEMY ATTACK IN PROGRESS (HOSTIS AGIT)" })`;
const newBottomBanner = `e.jsx("span", { children: turn === "player" ? (isSea ? "ADMIRALTY TACTICS • CLASSIS IMPERIALIS (VENTUS FAVENS)" : "LEGIONARY TACTICS • ACIES TRIPLEX (DISCIPLINA ROMANA)") : "HOSTIS STRIKE IN PROGRESS • PREPARE FOR IMPACT" })`;

if (code.includes(oldBottomBanner)) {
  code = code.replace(oldBottomBanner, newBottomBanner);
  console.log("✓ Successfully updated bottom HUD banner for Land vs Sea distinction.");
}

// 4. Validate transformed bundle with esbuild
console.log("Validating transformed bundle with esbuild...");
try {
  esbuild.transformSync(code, { loader: 'jsx' });
  console.log("✓ Bundle syntax verified perfectly with esbuild!");
  fs.writeFileSync(filePath, code, 'utf8');
  console.log("✓ Successfully wrote updated index-V37.js!");
} catch (err) {
  console.error("❌ ESBuild Validation Error:", err.message);
  process.exit(1);
}
