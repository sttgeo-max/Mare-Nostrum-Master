const fs = require('fs');
const path = require('path');

console.log("=== CREATING & INJECTING ARTIFACT COMPARISON TOOL MODAL (REFINED) ===");

const bundlePath = path.join(__dirname, '..', 'public', 'assets', 'index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

// First restore original backup if needed or clean up
if (code.includes("CompareArtifactsModal")) {
  // Let's re-read from backup or clean up
}

// Define CompareArtifactsModal as a const arrow function or var
const compareModalCode = `
var CompareArtifactsModal = function({ itemA: initialA, itemB: initialB, allArtifacts = [], player, onEquip, onClose }) {
  var [selectedIdA, setSelectedIdA] = b.useState(initialA ? initialA.id : (allArtifacts[0] ? allArtifacts[0].id : ""));
  var [selectedIdB, setSelectedIdB] = b.useState(initialB ? initialB.id : (allArtifacts[1] ? allArtifacts[1].id : (allArtifacts[0] ? allArtifacts[0].id : "")));

  var artA = allArtifacts.find(function(x) { return x.id === selectedIdA; }) || initialA || allArtifacts[0];
  var artB = allArtifacts.find(function(x) { return x.id === selectedIdB; }) || initialB || allArtifacts[1] || allArtifacts[0];

  var equippedItems = player && player.equipped ? Object.values(player.equipped).filter(Boolean) : [];
  var isEquippedA = artA && equippedItems.some(function(x) { return x.id === artA.id; });
  var isEquippedB = artB && equippedItems.some(function(x) { return x.id === artB.id; });

  var compareWithEquippedSlot = function() {
    if (!artA || !player || !player.equipped) return;
    var slotKey = tx(artA.slot);
    var equippedCounterpart = player.equipped[slotKey];
    if (equippedCounterpart && equippedCounterpart.id !== artA.id) {
      setSelectedIdB(equippedCounterpart.id);
    }
  };

  if (!artA || !artB) return null;

  var stats = [
    { label: "ATTACK BONUS", key: "bonusAttack", valA: artA.bonusAttack || 0, valB: artB.bonusAttack || 0, unit: "" },
    { label: "DEFENSE BONUS", key: "bonusDefense", valA: artA.bonusDefense || 0, valB: artB.bonusDefense || 0, unit: "" },
    { label: "DICE ROLL BONUS", key: "bonusRoll", valA: artA.bonusRoll || 0, valB: artB.bonusRoll || 0, unit: "" },
    { label: "CRITICAL CHANCE", key: "critChance", valA: artA.critChance || 0, valB: artB.critChance || 0, unit: "%" },
    { label: "CRIT MULTIPLIER", key: "critMultiplier", valA: artA.critMultiplier || 1.5, valB: artB.critMultiplier || 1.5, unit: "x" },
    { label: "ARMOR PIERCING", key: "ignoreArmorChance", valA: artA.ignoreArmorChance || 0, valB: artB.ignoreArmorChance || 0, unit: "%" },
    { label: "LIFESTEAL", key: "lifestealPercent", valA: artA.lifestealPercent || 0, valB: artB.lifestealPercent || 0, unit: "%" },
    { label: "SOLIDUS PLUNDER", key: "solidiBonusPercent", valA: artA.solidiBonusPercent || 0, valB: artB.solidiBonusPercent || 0, unit: "%" },
    { label: "FAMA RENOWN", key: "famaBonusPercent", valA: artA.famaBonusPercent || 0, valB: artB.famaBonusPercent || 0, unit: "%" }
  ];

  var renderDelta = function(valA, valB, unit) {
    var diff = valA - valB;
    if (diff === 0) return e.jsx("span", { className: "text-[#b8860b]/60 text-[10px] font-mono" }, "=");
    var isPositive = diff > 0;
    return e.jsx("span", {
      className: "text-[10px] font-bold font-mono px-1.5 py-0.5 rounded " + (isPositive ? "text-emerald-400 bg-emerald-950/60 border border-emerald-800/40" : "text-rose-400 bg-rose-950/60 border border-rose-800/40")
    }, (isPositive ? "+" : "") + diff.toFixed(diff % 1 === 0 ? 0 : 1) + unit);
  };

  return e.jsx("div", {
    className: "fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in",
    onClick: onClose,
    children: e.jsxs("div", {
      className: "relative w-full max-w-4xl bg-[#080b12]/95 border-2 border-amber-600/80 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(184,134,11,0.2)] p-4 sm:p-6 text-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col justify-between custom-scrollbar",
      onClick: function(nt) { nt.stopPropagation(); },
      children: [
        e.jsxs("div", {
          className: "flex items-center justify-between border-b border-amber-800/80 pb-3 mb-4 shrink-0",
          children: [
            e.jsxs("div", {
              children: [
                e.jsxs("h2", {
                  className: "text-base sm:text-xl font-bold font-cinzel text-amber-300 flex items-center gap-2",
                  children: [e.jsx("span", {}, "⚔️"), " SPOLIA COMPARATOR · TACTICAL ARTIFACT ANALYSIS"]
                }),
                e.jsx("p", {
                  className: "text-[11px] font-serif-body text-[#b8860b]/90 italic mt-0.5",
                  children: "Side-by-side tactical evaluation of historical relics, passive stats, and sacred abilities."
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: onClose,
              className: "px-3 py-1.5 rounded-xl bg-stone-900 border border-amber-700/60 hover:border-amber-500 text-amber-300 hover:text-white font-bold font-cinzel text-xs transition-colors cursor-pointer",
              children: "✕ CLOSE"
            })
          ]
        }),

        e.jsxs("div", {
          className: "space-y-4 overflow-y-auto pr-1 flex-1 custom-scrollbar",
          children: [
            e.jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-black/60 rounded-xl border border-amber-900/60",
              children: [
                e.jsxs("div", {
                  className: "space-y-1",
                  children: [
                    e.jsx("label", { className: "text-[10px] font-bold font-cinzel text-amber-400 uppercase tracking-wider block" }, "PRIMARY ARTIFACT (A):"),
                    e.jsx("select", {
                      value: selectedIdA,
                      onChange: function(ev) { setSelectedIdA(ev.target.value); },
                      className: "w-full bg-stone-950 border border-amber-700/80 rounded-lg p-2 text-xs text-amber-200 font-cinzel focus:outline-none focus:border-amber-400 cursor-pointer",
                      children: allArtifacts.map(function(art) {
                        return e.jsx("option", { value: art.id, className: "bg-stone-950 text-amber-100" }, art.name + " (" + art.slot.replace("_", " ") + ")");
                      })
                    })
                  ]
                }),

                e.jsxs("div", {
                  className: "space-y-1",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        e.jsx("label", { className: "text-[10px] font-bold font-cinzel text-amber-400 uppercase tracking-wider block" }, "COMPARISON ARTIFACT (B):"),
                        artA && player && player.equipped && player.equipped[tx(artA.slot)] && player.equipped[tx(artA.slot)].id !== artA.id && e.jsx("button", {
                          type: "button",
                          onClick: compareWithEquippedSlot,
                          className: "text-[9px] font-bold font-cinzel text-amber-300 hover:text-white underline cursor-pointer",
                          children: "⚡ Compare with Equipped"
                        })
                      ]
                    }),
                    e.jsx("select", {
                      value: selectedIdB,
                      onChange: function(ev) { setSelectedIdB(ev.target.value); },
                      className: "w-full bg-stone-950 border border-amber-700/80 rounded-lg p-2 text-xs text-amber-200 font-cinzel focus:outline-none focus:border-amber-400 cursor-pointer",
                      children: allArtifacts.map(function(art) {
                        return e.jsx("option", { value: art.id, className: "bg-stone-950 text-amber-100" }, art.name + " (" + art.slot.replace("_", " ") + ")");
                      })
                    })
                  ]
                })
              ]
            }),

            e.jsxs("div", {
              className: "grid grid-cols-2 gap-3 sm:gap-4",
              children: [
                e.jsxs("div", {
                  className: "p-3.5 rounded-xl border " + (isEquippedA ? "bg-amber-950/20 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "bg-black/60 border-amber-900/60") + " relative flex flex-col justify-between space-y-2",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-start gap-2.5",
                      children: [
                        e.jsx("div", {
                          className: "w-12 h-12 shrink-0 flex items-center justify-center bg-black/50 rounded-lg border border-amber-700/60 overflow-hidden",
                          children: e.jsx(ii, { artifact: artA, size: "sm" })
                        }),
                        e.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            e.jsx("h4", { className: "text-xs sm:text-sm font-bold font-cinzel truncate " + El(artA.rarity) }, artA.name),
                            e.jsx("p", { className: "text-[10px] text-[#b8860b] font-serif-body italic truncate" }, artA.latinName),
                            e.jsxs("div", {
                              className: "flex flex-wrap items-center gap-1 mt-1",
                              children: [
                                e.jsx("span", { className: "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border " + Hi(artA.rarity) }, Ca(artA.rarity)),
                                e.jsx("span", { className: "text-[8px] font-bold text-[#d4af37] uppercase font-cinzel bg-black px-1.5 py-0.5 rounded border border-[#b8860b]/40" }, artA.slot.replace("_", " ")),
                                isEquippedA && e.jsx("span", { className: "text-[8px] font-black text-amber-300 bg-amber-900/60 px-1.5 py-0.5 rounded border border-amber-500" }, "EQUIPPED")
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    e.jsx("p", { className: "text-[10.5px] text-stone-300 font-serif-body italic leading-relaxed line-clamp-2 bg-black/40 p-2 rounded border border-amber-950/60" }, '"' + artA.description + '"')
                  ]
                }),

                e.jsxs("div", {
                  className: "p-3.5 rounded-xl border " + (isEquippedB ? "bg-amber-950/20 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "bg-black/60 border-amber-900/60") + " relative flex flex-col justify-between space-y-2",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-start gap-2.5",
                      children: [
                        e.jsx("div", {
                          className: "w-12 h-12 shrink-0 flex items-center justify-center bg-black/50 rounded-lg border border-amber-700/60 overflow-hidden",
                          children: e.jsx(ii, { artifact: artB, size: "sm" })
                        }),
                        e.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            e.jsx("h4", { className: "text-xs sm:text-sm font-bold font-cinzel truncate " + El(artB.rarity) }, artB.name),
                            e.jsx("p", { className: "text-[10px] text-[#b8860b] font-serif-body italic truncate" }, artB.latinName),
                            e.jsxs("div", {
                              className: "flex flex-wrap items-center gap-1 mt-1",
                              children: [
                                e.jsx("span", { className: "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border " + Hi(artB.rarity) }, Ca(artB.rarity)),
                                e.jsx("span", { className: "text-[8px] font-bold text-[#d4af37] uppercase font-cinzel bg-black px-1.5 py-0.5 rounded border border-[#b8860b]/40" }, artB.slot.replace("_", " ")),
                                isEquippedB && e.jsx("span", { className: "text-[8px] font-black text-amber-300 bg-amber-900/60 px-1.5 py-0.5 rounded border border-amber-500" }, "EQUIPPED")
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    e.jsx("p", { className: "text-[10.5px] text-stone-300 font-serif-body italic leading-relaxed line-clamp-2 bg-black/40 p-2 rounded border border-amber-950/60" }, '"' + artB.description + '"')
                  ]
                })
              ]
            }),

            e.jsxs("div", {
              className: "bg-black/70 rounded-xl border border-amber-900/80 p-3 overflow-hidden",
              children: [
                e.jsx("h4", { className: "text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider mb-2 text-center" }, "⚔️ COMBAT STATS & ATTRIBUTE COMPARISON"),
                e.jsxs("table", {
                  className: "w-full text-xs font-mono border-collapse",
                  children: [
                    e.jsx("thead", {
                      children: e.jsxs("tr", {
                        className: "border-b border-amber-900/80 text-[10px] text-[#b8860b] uppercase font-cinzel",
                        children: [
                          e.jsx("th", { className: "text-left py-1.5 px-2 w-1/3" }, "STAT METRIC"),
                          e.jsx("th", { className: "text-center py-1.5 px-2 w-1/4 text-amber-200" }, artA.name.split(" ")[0]),
                          e.jsx("th", { className: "text-center py-1.5 px-2 w-1/6 text-stone-400" }, "DELTA"),
                          e.jsx("th", { className: "text-center py-1.5 px-2 w-1/4 text-amber-200" }, artB.name.split(" ")[0])
                        ]
                      })
                    }),
                    e.jsx("tbody", {
                      className: "divide-y divide-amber-950/50",
                      children: stats.map(function(st) {
                        var hasValue = st.valA > 0 || st.valB > 0 || st.key === "bonusAttack" || st.key === "bonusDefense";
                        if (!hasValue) return null;
                        return e.jsxs("tr", {
                          className: "hover:bg-amber-950/20 transition-colors",
                          children: [
                            e.jsx("td", { className: "py-2 px-2 text-[10.5px] font-cinzel text-amber-100 font-bold" }, st.label),
                            e.jsx("td", { className: "text-center py-2 px-2 font-bold " + (st.valA > st.valB ? "text-emerald-400" : st.valA < st.valB ? "text-stone-400" : "text-amber-200") }, (st.valA > 0 ? "+" : "") + st.valA + st.unit),
                            e.jsx("td", { className: "text-center py-2 px-2" }, renderDelta(st.valA, st.valB, st.unit)),
                            e.jsx("td", { className: "text-center py-2 px-2 font-bold " + (st.valB > st.valA ? "text-emerald-400" : st.valB < st.valA ? "text-stone-400" : "text-amber-200") }, (st.valB > 0 ? "+" : "") + st.valB + st.unit)
                          ]
                        }, st.key);
                      })
                    })
                  ]
                })
              ]
            }),

            (artA.specialAbility || artB.specialAbility) && e.jsxs("div", {
              className: "bg-black/70 rounded-xl border border-amber-800/80 p-3 space-y-2",
              children: [
                e.jsx("h4", { className: "text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider text-center" }, "✨ SPECIAL ABILITY COMPARISON"),
                e.jsxs("div", {
                  className: "grid grid-cols-2 gap-3 pt-1",
                  children: [
                    e.jsx("div", {
                      className: "p-2.5 bg-black/50 rounded-lg border border-amber-900/60 text-xs space-y-1",
                      children: artA.specialAbility ? e.jsxs("div", {
                        children: [
                          e.jsxs("span", { className: "text-[10px] font-bold font-cinzel text-amber-300 flex items-center gap-1" }, ["✨ ", artA.specialAbility.name]),
                          e.jsx("p", { className: "text-[10.5px] font-serif-body text-stone-300 italic mt-0.5 leading-relaxed" }, artA.specialAbility.description),
                          e.jsxs("span", { className: "text-[9px] font-mono text-amber-400/90 block mt-1" }, ["EFFECT: " + artA.specialAbility.effectType + " (" + artA.specialAbility.value + ") • CD: " + artA.specialAbility.cooldownRounds + "T"])
                        ]
                      }) : e.jsx("span", { className: "text-[10px] font-serif-body italic text-stone-500" }, "No special active ability.")
                    }),

                    e.jsx("div", {
                      className: "p-2.5 bg-black/50 rounded-lg border border-amber-900/60 text-xs space-y-1",
                      children: artB.specialAbility ? e.jsxs("div", {
                        children: [
                          e.jsxs("span", { className: "text-[10px] font-bold font-cinzel text-amber-300 flex items-center gap-1" }, ["✨ ", artB.specialAbility.name]),
                          e.jsx("p", { className: "text-[10.5px] font-serif-body text-stone-300 italic mt-0.5 leading-relaxed" }, artB.specialAbility.description),
                          e.jsxs("span", { className: "text-[9px] font-mono text-amber-400/90 block mt-1" }, ["EFFECT: " + artB.specialAbility.effectType + " (" + artB.specialAbility.value + ") • CD: " + artB.specialAbility.cooldownRounds + "T"])
                        ]
                      }) : e.jsx("span", { className: "text-[10px] font-serif-body italic text-stone-500" }, "No special active ability.")
                    })
                  ]
                })
              ]
            })
          ]
        }),

        e.jsxs("div", {
          className: "pt-3 mt-3 border-t border-amber-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0",
          children: [
            e.jsxs("div", {
              className: "flex items-center gap-2 w-full sm:w-auto",
              children: [
                onEquip && artA && !isEquippedA && e.jsx("button", {
                  type: "button",
                  onClick: function() { onEquip(artA, tx(artA.slot)); },
                  className: "flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-black font-cinzel text-xs transition-colors cursor-pointer shadow-md",
                  children: "⚡ EQUIP " + artA.name.split(" ")[0]
                }),
                onEquip && artB && !isEquippedB && e.jsx("button", {
                  type: "button",
                  onClick: function() { onEquip(artB, tx(artB.slot)); },
                  className: "flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-black font-cinzel text-xs transition-colors cursor-pointer shadow-md",
                  children: "⚡ EQUIP " + artB.name.split(" ")[0]
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: onClose,
              className: "w-full sm:w-auto px-5 py-2 rounded-xl bg-stone-900 border border-amber-700/60 hover:border-amber-500 text-amber-300 font-bold font-cinzel text-xs transition-colors cursor-pointer text-center",
              children: "DONE"
            })
          ]
        })
      ]
    })
  });
};
`;

// Clean up previous attempts if present
let cleanCode = code;
if (cleanCode.includes("function CompareArtifactsModal")) {
  cleanCode = cleanCode.replace(/function CompareArtifactsModal[\s\S]*?px=/, "px=");
}
if (cleanCode.includes("var CompareArtifactsModal =")) {
  cleanCode = cleanCode.replace(/var CompareArtifactsModal =[\s\S]*?px=/, "px=");
}

// Prepend CompareArtifactsModal before `px=`
cleanCode = compareModalCode + "\npx=" + cleanCode.substring(cleanCode.indexOf("px=") + 3);

fs.writeFileSync(bundlePath, cleanCode, 'utf8');
console.log("=== REFINED ARTIFACT COMPARISON TOOL WRITTEN ===");
