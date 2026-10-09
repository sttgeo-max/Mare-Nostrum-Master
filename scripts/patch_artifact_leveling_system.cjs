const fs = require('fs');
const path = require('path');

console.log("=== IMPLEMENTING ARTIFACT LEVELING & ASCENSION SYSTEM ===");

const bundlePath = path.join(__dirname, '..', 'public', 'assets', 'index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

// Define RelicAltarTab component code
const relicAltarComponentCode = `
function RelicAltarTab({ player, setPlayer, onNotify }) {
  var [selectedRelicId, setSelectedRelicId] = b.useState(player && player.inventory && player.inventory[0] ? player.inventory[0].id : "art_worn_pugio");
  var [isLeveling, setIsLeveling] = b.useState(false);

  var allRelics = [...(player.inventory || []), ...Object.values(player.equipped || {}).filter(Boolean)];
  var relicMap = new Map();
  allRelics.forEach(function(r) { if (r && r.id) relicMap.set(r.id, r); });
  var uniqueRelics = Array.from(relicMap.values());

  var activeRelic = uniqueRelics.find(function(r) { return r.id === selectedRelicId; }) || uniqueRelics[0] || ia[0];

  if (!activeRelic) {
    return e.jsx("div", { className: "p-8 text-center text-amber-300 font-cinzel" }, "No artifacts found in inventory or loadout.");
  }

  var curLevel = activeRelic.level || 1;
  var curXp = activeRelic.xp || 0;
  var reqXp = curLevel * 200;
  var curAscension = activeRelic.ascension || (curLevel >= 10 ? 2 : (curLevel >= 5 ? 1 : 0));

  var essenceCost = curLevel * 25 + 25;
  var solidiCost = curLevel * 50 + 50;

  var canLevelUp = (player.essence || 0) >= essenceCost && (player.solidi || 0) >= solidiCost && curLevel < 10;
  var canAscend = curLevel >= 5 && curAscension < (curLevel >= 10 ? 2 : 1);

  // Infuse Essentia Level Up
  var handleLevelUp = function() {
    if (!canLevelUp) {
      if ((player.essence || 0) < essenceCost) onNotify("INSFFICIENT ESSENTIA! Salvage relics or win battles to acquire Pure Essentia.");
      else if ((player.solidi || 0) < solidiCost) onNotify("INSUFFICIENT SOLIDUS GOLD!");
      else if (curLevel >= 10) onNotify("RELIC HAS REACHED MAXIMUM MASTERY (LEVEL 10)!");
      return;
    }

    v.playCoin();
    setIsLeveling(true);
    setTimeout(function() { setIsLeveling(false); }, 600);

    setPlayer(function(prev) {
      var newEssence = (prev.essence || 0) - essenceCost;
      var newSolidi = (prev.solidi || 0) - solidiCost;

      var updateRelic = function(r) {
        if (!r || r.id !== activeRelic.id) return r;
        var nextLvl = (r.level || 1) + 1;
        var bonusAtkInc = nextLvl % 2 === 0 ? 1 : 0;
        var bonusDefInc = nextLvl % 3 === 0 ? 1 : 0;
        var bonusRollInc = nextLvl === 5 || nextLvl === 10 ? 1 : 0;
        var critInc = nextLvl === 5 || nextLvl === 10 ? 5 : 0;

        var updatedAbility = r.specialAbility ? Object.assign({}, r.specialAbility, {
          cooldownRounds: nextLvl === 10 ? Math.max(1, (r.specialAbility.cooldownRounds || 3) - 1) : r.specialAbility.cooldownRounds
        }) : r.specialAbility;

        return Object.assign({}, r, {
          level: nextLvl,
          xp: 0,
          ascension: nextLvl >= 10 ? 2 : (nextLvl >= 5 ? 1 : 0),
          bonusAttack: (r.bonusAttack || 0) + bonusAtkInc,
          bonusDefense: (r.bonusDefense || 0) + bonusDefInc,
          bonusRoll: (r.bonusRoll || 0) + bonusRollInc,
          critChance: (r.critChance || 0) + critInc,
          specialAbility: updatedAbility
        });
      };

      var newInv = (prev.inventory || []).map(updateRelic);
      var newEquipped = Object.assign({}, prev.equipped || {});
      Object.keys(newEquipped).forEach(function(k) {
        if (newEquipped[k] && newEquipped[k].id === activeRelic.id) {
          newEquipped[k] = updateRelic(newEquipped[k]);
        }
      });

      return Object.assign({}, prev, {
        essence: newEssence,
        solidi: newSolidi,
        inventory: newInv,
        equipped: newEquipped
      });
    });

    onNotify("⚡ " + activeRelic.name + " LEVELED UP TO LEVEL " + (curLevel + 1) + "!");
  };

  // Salvage Relic into Pure Essentia
  var handleSalvage = function() {
    if (uniqueRelics.length <= 1) {
      onNotify("CANNOT SALVAGE: You must keep at least 1 artifact!");
      return;
    }

    var isEquipped = Object.values(player.equipped || {}).some(function(e) { return e && e.id === activeRelic.id; });
    if (isEquipped) {
      onNotify("CANNOT SALVAGE EQUIPPED RELIC: Unequip it first!");
      return;
    }

    var essenceGained = (curLevel * 30) + (activeRelic.rarity === "DIVINUS" || activeRelic.rarity === "RELIQVIAE" ? 150 : 50);

    v.playItemPickup();
    setPlayer(function(prev) {
      var newInv = (prev.inventory || []).filter(function(r) { return r.id !== activeRelic.id; });
      return Object.assign({}, prev, {
        essence: (prev.essence || 0) + essenceGained,
        inventory: newInv
      });
    });

    onNotify("⚒️ SALVAGED " + activeRelic.name + " FOR +" + essenceGained + " PURE ESSENTIA!");
    setSelectedRelicId(uniqueRelics[0] ? uniqueRelics[0].id : "");
  };

  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in text-stone-200",
    children: [
      // Top Header Banner
      e.jsxs("div", {
        className: "p-4 bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 border border-amber-600/80 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4",
        children: [
          e.jsxs("div", {
            children: [
              e.jsxs("h3", { className: "text-base sm:text-lg font-bold font-cinzel text-amber-300 flex items-center gap-2", children: [e.jsx("span", {}, "⚡"), " IMPERIAL RELIC ALTAR · MASTERY & ASCENSION"] }),
              e.jsx("p", { className: "text-xs font-serif-body text-[#b8860b]/90 italic mt-0.5", children: "Infuse Pure Essentia to level up historical spolia, scale passive combat stats, and ascend sacred abilities." })
            ]
          }),
          e.jsxs("div", {
            className: "flex items-center gap-3 bg-black/60 px-4 py-2 rounded-xl border border-amber-800/80 shrink-0",
            children: [
              e.jsxs("div", { className: "text-center px-2", children: [e.jsx("span", { className: "text-[9px] font-mono text-amber-400 block" }, "PURE ESSENTIA"), e.jsxs("span", { className: "text-sm font-black font-mono text-amber-300", children: [(player.essence || 0).toLocaleString(), " ✨"] })] }),
              e.jsxs("div", { className: "text-center px-2 border-l border-amber-900/60", children: [e.jsx("span", { className: "text-[9px] font-mono text-amber-400 block" }, "SOLIDUS GOLD"), e.jsxs("span", { className: "text-sm font-black font-mono text-amber-300", children: [(player.solidi || 0).toLocaleString(), " 🪙"] })] })
            ]
          })
        ]
      }),

      // Relic Carousel / Selection Strip
      e.jsxs("div", {
        className: "flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar",
        children: uniqueRelics.map(function(rel) {
          var isSel = rel.id === activeRelic.id;
          var lvl = rel.level || 1;
          var asc = rel.ascension || (lvl >= 10 ? 2 : (lvl >= 5 ? 1 : 0));
          return e.jsxs("button", {
            type: "button",
            onClick: function() { setSelectedRelicId(rel.id); },
            className: "shrink-0 p-2.5 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-2.5 " + (isSel ? "bg-amber-950/40 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400 scale-102" : "bg-black/60 border-amber-900/40 hover:border-amber-700/60"),
            children: [
              e.jsx("div", { className: "w-9 h-9 shrink-0 flex items-center justify-center bg-black/50 rounded-lg border border-amber-800/60 overflow-hidden", children: e.jsx(ii, { artifact: rel, size: "sm" }) }),
              e.jsxs("div", {
                className: "min-w-0 pr-1",
                children: [
                  e.jsx("h5", { className: "text-xs font-bold font-cinzel text-amber-100 truncate max-w-[110px]" }, rel.name),
                  e.jsxs("div", {
                    className: "flex items-center gap-1.5 mt-0.5",
                    children: [
                      e.jsxs("span", { className: "text-[8.5px] font-bold font-mono text-amber-300 bg-black/60 px-1 py-0.5 rounded border border-amber-800/60" }, "LVL " + lvl),
                      asc > 0 && e.jsx("span", { className: "text-[8px] font-black text-amber-300 uppercase bg-amber-900/60 px-1 py-0.5 rounded border border-amber-500" }, asc === 2 ? "DIVINE" : "ASCENDED")
                    ]
                  })
                ]
              })
            ]
          }, rel.id);
        })
      }),

      // Active Relic Upgrade Focus Altar
      e.jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-12 gap-4 bg-black/70 border-2 border-amber-700/80 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden",
        children: [
          // Left Relic Display Card
          e.jsxs("div", {
            className: "md:col-span-5 bg-stone-950/80 border border-amber-800/80 rounded-xl p-4 flex flex-col items-center justify-between text-center relative shadow-inner",
            children: [
              e.jsx("div", { className: "w-24 h-24 my-2 flex items-center justify-center bg-black/60 rounded-2xl border-2 border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.25)] overflow-hidden", children: e.jsx(ii, { artifact: activeRelic, size: "slot" }) }),
              e.jsx("h4", { className: "text-base font-bold font-cinzel text-amber-200 mt-2" }, activeRelic.name),
              e.jsx("p", { className: "text-xs text-[#b8860b] font-serif-body italic mb-2" }, activeRelic.latinName),
              e.jsxs("div", {
                className: "flex flex-wrap items-center justify-center gap-1.5 mb-3",
                children: [
                  e.jsx("span", { className: "text-[9px] font-bold uppercase px-2 py-0.5 rounded border " + Hi(activeRelic.rarity) }, Ca(activeRelic.rarity)),
                  e.jsx("span", { className: "text-[9px] font-bold text-[#d4af37] uppercase font-cinzel bg-black px-2 py-0.5 rounded border border-[#b8860b]/40" }, activeRelic.slot.replace("_", " ")),
                  e.jsx("span", { className: "text-[9px] font-black text-amber-300 bg-amber-900/60 px-2 py-0.5 rounded border border-amber-500" }, "RANK " + curAscension)
                ]
              }),
              e.jsx("p", { className: "text-xs text-stone-300 font-serif-body italic leading-relaxed bg-black/50 p-3 rounded-lg border border-amber-900/60 w-full" }, '"' + activeRelic.description + '"')
            ]
          }),

          // Right Upgrade & Ascension Progress Matrix
          e.jsxs("div", {
            className: "md:col-span-7 flex flex-col justify-between space-y-4",
            children: [
              // Level & XP Bar Box
              e.jsxs("div", {
                className: "bg-stone-950/80 border border-amber-800/80 rounded-xl p-3.5 space-y-2",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center justify-between text-xs font-cinzel font-bold text-amber-300",
                    children: [
                      e.jsxs("span", { children: ["RELIC MASTERY LEVEL ", curLevel, " / 10"] }),
                      e.jsxs("span", { className: "font-mono text-amber-200", children: [curLevel >= 10 ? "MAX LEVEL" : curXp + " / " + reqXp + " XP"] })
                    ]
                  }),
                  e.jsx("div", {
                    className: "w-full h-3 bg-black/80 rounded-full border border-amber-800/60 overflow-hidden p-0.5",
                    children: e.jsx("div", { className: "h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]", style: { width: (curLevel >= 10 ? 100 : Math.min(100, Math.max(5, (curXp / reqXp) * 100))) + "%" } })
                  })
                ]
              }),

              // Next Level Stat Preview Matrix
              e.jsxs("div", {
                className: "bg-black/80 border border-amber-900/80 rounded-xl p-3.5 space-y-2",
                children: [
                  e.jsx("h5", { className: "text-xs font-bold font-cinzel text-amber-400 uppercase tracking-wider mb-1" }, "⚔️ ATTRIBUTE SCALING PREVIEW:"),
                  e.jsxs("div", {
                    className: "grid grid-cols-2 gap-2 text-xs font-mono",
                    children: [
                      e.jsxs("div", { className: "bg-stone-950 p-2 rounded border border-amber-950 flex items-center justify-between", children: [e.jsx("span", { className: "text-stone-400 font-cinzel text-[10px]" }, "ATTACK BONUS:"), e.jsxs("span", { className: "font-bold text-amber-300", children: ["+", activeRelic.bonusAttack || 0, curLevel < 10 && (curLevel + 1) % 2 === 0 ? " ➔ +" + ((activeRelic.bonusAttack || 0) + 1) : ""] })] }),
                      e.jsxs("div", { className: "bg-stone-950 p-2 rounded border border-amber-950 flex items-center justify-between", children: [e.jsx("span", { className: "text-stone-400 font-cinzel text-[10px]" }, "DEFENSE BONUS:"), e.jsxs("span", { className: "font-bold text-amber-300", children: ["+", activeRelic.bonusDefense || 0, curLevel < 10 && (curLevel + 1) % 3 === 0 ? " ➔ +" + ((activeRelic.bonusDefense || 0) + 1) : ""] })] }),
                      e.jsxs("div", { className: "bg-stone-950 p-2 rounded border border-amber-950 flex items-center justify-between", children: [e.jsx("span", { className: "text-stone-400 font-cinzel text-[10px]" }, "DICE ROLL:"), e.jsxs("span", { className: "font-bold text-amber-300", children: ["+", activeRelic.bonusRoll || 0] })] }),
                      e.jsxs("div", { className: "bg-stone-950 p-2 rounded border border-amber-950 flex items-center justify-between", children: [e.jsx("span", { className: "text-stone-400 font-cinzel text-[10px]" }, "CRIT CHANCE:"), e.jsxs("span", { className: "font-bold text-amber-300", children: [(activeRelic.critChance || 0) + "%"] })] })
                    ]
                  })
                ]
              }),

              // Special Ability Milestone Box
              activeRelic.specialAbility && e.jsxs("div", {
                className: "bg-black/80 border border-amber-800/80 rounded-xl p-3 space-y-1",
                children: [
                  e.jsxs("span", { className: "text-[10px] font-bold font-cinzel text-amber-300 flex items-center gap-1" }, ["✨ ", activeRelic.specialAbility.name, curLevel >= 10 ? " (MAX ASCENDED)" : ""]),
                  e.jsx("p", { className: "text-[10.5px] font-serif-body text-stone-300 italic leading-relaxed" }, activeRelic.specialAbility.description),
                  e.jsxs("span", { className: "text-[9px] font-mono text-amber-400/90 block mt-1" }, ["EFFECT: " + activeRelic.specialAbility.effectType + " (" + activeRelic.specialAbility.value + ") • COOLDOWN: " + activeRelic.specialAbility.cooldownRounds + " TURNS"])
                ]
              }),

              // Action Buttons Row
              e.jsxs("div", {
                className: "flex flex-col sm:flex-row items-center gap-2.5 pt-1",
                children: [
                  e.jsxs("button", {
                    type: "button",
                    onClick: handleLevelUp,
                    disabled: curLevel >= 10,
                    className: "flex-1 w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-black font-cinzel text-xs transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2",
                    children: [
                      e.jsx("span", {}, "⚡"),
                      curLevel >= 10 ? "MAX MASTERY REACHED" : "INFUSE ESSENTIA (+1 LEVEL)",
                      curLevel < 10 && e.jsxs("span", { className: "text-[10px] font-mono opacity-90", children: ["(" + essenceCost + " ✨ · " + solidiCost + " 🪙)"] })
                    ]
                  }),
                  e.jsxs("button", {
                    type: "button",
                    onClick: handleSalvage,
                    className: "w-full sm:w-auto py-2.5 px-4 rounded-xl bg-stone-900 border border-amber-800/80 hover:border-rose-600 hover:text-rose-300 text-amber-300 font-bold font-cinzel text-xs transition-colors cursor-pointer text-center shrink-0",
                    children: ["⚒️ SALVAGE FOR ESSENTIA"]
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}
`;

// Insert RelicAltarTab before function px or var px
if (!code.includes("function RelicAltarTab")) {
  if (code.includes("function CompareArtifactsModal")) {
    code = code.replace("function CompareArtifactsModal(", relicAltarComponentCode + "\nfunction CompareArtifactsModal(");
  } else {
    code = code.replace("var px=", relicAltarComponentCode + "\nvar px=");
  }
}

// Add {id:"ALTAR",label:"⚡ RELIC ALTAR"} tab to Armamentarium top tabs list
const oldTabsArray = `[{id:"TRIAD",label:"🏛️ TRIAD LOADOUT"},{id:"INVENTORY",label:\`🏺 RELIQUIARIUM (\${P.length})\`},{id:"CARDS",label:"📜 TACTICAL CARDS"},{id:"DICE",label:\`🎲 ALEA VAULT (\${E.length})\`}]`;
const newTabsArray = `[{id:"TRIAD",label:"🏛️ TRIAD LOADOUT"},{id:"ALTAR",label:"⚡ RELIC ALTAR & MASTERY"},{id:"INVENTORY",label:\`🏺 RELIQUIARIUM (\${P.length})\`},{id:"CARDS",label:"📜 TACTICAL CARDS"},{id:"DICE",label:\`🎲 ALEA VAULT (\${E.length})\`}]`;

if (code.includes(oldTabsArray)) {
  code = code.replace(oldTabsArray, newTabsArray);
  console.log("-> Injected ⚡ RELIC ALTAR & MASTERY tab button into Armamentarium header.");
}

// Render RelicAltarTab when armaTab === "ALTAR" inside px return statement
if (!code.includes("armaTab===\"ALTAR\"&&e.jsx(RelicAltarTab")) {
  const renderPoint = `(armaTab==="TRIAD"||armaTab==="LOADOUT")&&e.jsxs("div",{className:"space-y-5 animate-fade-in",children:[`;
  const renderReplacement = `armaTab==="ALTAR"&&e.jsx(RelicAltarTab,{player:t,setPlayer:s,onNotify:w}),(armaTab==="TRIAD"||armaTab==="LOADOUT")&&e.jsxs("div",{className:"space-y-5 animate-fade-in",children:[`;
  code = code.replace(renderPoint, renderReplacement);
  console.log("-> Rendered RelicAltarTab when armaTab === 'ALTAR'.");
}

fs.writeFileSync(bundlePath, code, 'utf8');
console.log("=== ARTIFACT LEVELING & ASCENSION SYSTEM PATCH APPLIED SUCCESSFULLY ===");
