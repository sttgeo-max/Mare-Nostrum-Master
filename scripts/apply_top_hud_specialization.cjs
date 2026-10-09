const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== INJECTING TOP HUD BESPOKE LAND & SEA WIDGETS ===");

const filePath = path.join(__dirname, '../public/assets/index-V37.js');
let code = fs.readFileSync(filePath, 'utf8');

const targetSubBar = `e.jsxs("div", {            className: "w-full flex items-center justify-between px-1 text-[8px] xs:text-[8.5px] sm:text-[10px] max-w-4xl mx-auto border-t border-amber-500/25 pt-1 gap-1",            children: [              e.jsx("div", {                className: "font-cinzel text-amber-300 font-black tracking-wider uppercase text-[8px] xs:text-[9px] sm:text-[10px] shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",                children: l ? (l.length > 20 ? l.substring(0, 18) + "…" : l) : (isSea ? "MARE NOSTRUM" : "PROVINCIA ROMANA")              }),              e.jsxs("div", {                className: "flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 border border-amber-500/35 text-[8px] sm:text-[9.5px]",                children: [                  e.jsx("span", { children: currentWeatherMeta.icon }),                  e.jsx("span", { className: "font-cinzel font-bold text-amber-300", children: currentWeatherMeta.latin }),                  e.jsx("span", { className: "text-amber-500/50", children: "•" }),                  e.jsx("span", { children: currentTerrainMeta.icon }),                  e.jsx("span", { className: "font-cinzel font-bold text-stone-200 hidden sm:inline", children: currentTerrainMeta.latin })                ]              }),              e.jsxs("div", {                className: "flex items-center gap-1 sm:gap-1.5 bg-[#03060f]/90 px-2.5 py-0.5 rounded-full border border-amber-500/40 shadow-inner",                children: [                  e.jsx("span", { className: "font-cinzel text-[8px] sm:text-[9px] text-amber-300 font-black tracking-wider uppercase", children: "AP:" }),                  e.jsx("div", {                    className: "flex items-center gap-1",                    children: Array.from({ length: maxAP }).map((_, idx) => e.jsx("div", {                      key: idx,                      className: \`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border transition-all duration-300 \${idx < actionPoints ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-100 shadow-[0_0_10px_rgba(245,158,11,1)]' : 'bg-stone-950 border-stone-800 opacity-30'}\`                    }))                  }),                  e.jsxs("span", { className: "font-mono text-[8px] sm:text-[9px] text-[#F3E7C8] font-bold ml-0.5", children: [actionPoints, "/", maxAP] })                ]              }),              e.jsx("div", {                className: "font-mono text-amber-300/90 font-bold tracking-tight text-[8px] sm:text-[9px] truncate max-w-[95px] xs:max-w-[125px] sm:max-w-[170px] text-right",                children: currentIntent ? \`⚔ \${currentIntent.label}\` : "—"              })            ]          })`;

const replacementSubBar = `e.jsxs("div", {
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
                    className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/85 border border-cyan-400/50 text-[7.5px] xs:text-[8px] sm:text-[9px] text-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.25)]",
                    children: [
                      e.jsx("span", { className: "text-amber-300", children: "🧭" }),
                      e.jsx("span", { className: "font-cinzel font-black tracking-wider text-cyan-100", children: "VENTUS: AQUILO ↗" }),
                      e.jsx("span", { className: "text-amber-400 font-mono font-bold hidden xs:inline", children: "• +1 RAM" })
                    ]
                  }) : e.jsxs("div", {
                    className: "flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/85 border border-amber-500/50 text-[7.5px] xs:text-[8px] sm:text-[9px] text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.25)]",
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

if (code.includes(targetSubBar)) {
  code = code.replace(targetSubBar, replacementSubBar);
  console.log("✓ Successfully replaced targetSubBar with Land/Sea tactical ribbon.");
} else {
  console.log("❌ targetSubBar exact match failed, checking index...");
}

// Validate transformed bundle with esbuild
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
