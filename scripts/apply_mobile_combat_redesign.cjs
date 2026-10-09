const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING MOBILE COMBAT SCREEN REDESIGN FOR IPHONE WIDTH ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. UPDATE renderToken SO SHIP/COMMANDER NAMES DO NOT CLIP OR TRUNCATE AWKWARDLY
const tokenTarget = js.includes("truncate w-full ${isPlayer ? 'text-[#F3E7C8]' : 'text-rose-200'}")
  ? "truncate w-full ${isPlayer ? 'text-[#F3E7C8]' : 'text-rose-200'}"
  : "truncate w-full ${isPlayer ? 'text-amber-200' : 'text-rose-200'}";
if (js.includes(tokenTarget)) {
  const isAmber = tokenTarget.includes("text-amber-200");
  js = js.replace(
    tokenTarget,
    `line-clamp-2 leading-tight w-full max-w-[125px] sm:max-w-[155px] text-center whitespace-normal break-words \${isPlayer ? '${isAmber ? "text-amber-200" : "text-[#F3E7C8]"}' : 'text-rose-200'}`
  );
  
} else {
  console.warn("WARN: Could not match tokenTarget.");
}

// 2. UPDATE TOP HUD SHIP NAMES
const playerHeaderMarker = 'className: "font-cinzel font-black text-amber-300 text-[9.5px] sm:text-xs tracking-wider uppercase truncate max-w-[90px] xs:max-w-[130px] sm:max-w-[220px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"';
if (js.includes(playerHeaderMarker)) {
  js = js.replace(
    playerHeaderMarker,
    'className: "font-cinzel font-black text-amber-300 text-[10px] sm:text-xs tracking-wide uppercase leading-tight line-clamp-2 min-w-0 flex-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"'
  );
  
}

const enemyHeaderMarker = 'className: "font-cinzel font-black text-rose-300 text-[9.5px] sm:text-xs tracking-wider uppercase truncate max-w-[90px] xs:max-w-[130px] sm:max-w-[220px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"';
if (js.includes(enemyHeaderMarker)) {
  js = js.replace(
    enemyHeaderMarker,
    'className: "font-cinzel font-black text-rose-300 text-[10px] sm:text-xs tracking-wide uppercase leading-tight line-clamp-2 min-w-0 flex-1 text-right drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"'
  );
  
}

// 3. ENHANCE renderGauge FOR CLEAR HP FRACTIONS & BLOCK
const gaugeMarker = 'className: "flex flex-col gap-0.5 w-28 sm:w-36 md:w-48"';
if (js.includes(gaugeMarker)) {
  js = js.replace(
    gaugeMarker,
    'className: "flex flex-col gap-0.5 w-full min-w-[105px] max-w-[150px] sm:max-w-[210px]"'
  );
  
}

// 4. ENHANCE MAIN MIDDLE ARENA (OPEN MIDDLE AREA FOR INTENT, HOVERED PREVIEW & RESULT)
const midMarker = "min-w-0 max-w-[140px] sm:max-w-[210px]";
const midPos = js.indexOf(midMarker);
if (midPos !== -1) {
  const p1 = js.lastIndexOf('e.jsxs("div", {', midPos);
  const p2 = js.indexOf('renderToken(false,', midPos);
  if (p1 !== -1 && p2 !== -1) {
    const newChunk = `e.jsxs("div", {
            className: "flex-1 flex flex-col items-center justify-center gap-1.5 z-20 px-1 select-none min-w-0 max-w-[180px] sm:max-w-[260px] relative pointer-events-none",
            children: [
              currentIntent && e.jsxs("div", {
                className: "w-full p-2 rounded-xl bg-gradient-to-b from-[#2d0808]/95 via-[#180404]/95 to-[#0b0202]/98 border border-red-500/80 shadow-[0_4px_18px_rgba(220,38,38,0.5)] flex flex-col items-center text-center gap-1 pointer-events-auto",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-cinzel font-black text-rose-300 tracking-widest uppercase",
                    children: [
                      e.jsx("span", { className: "text-red-400 animate-pulse", children: "⚔" }),
                      e.jsx("span", { children: "HOSTIS INTENT" }),
                      e.jsx("span", { className: "text-red-400 animate-pulse", children: "⚔" })
                    ]
                  }),
                  e.jsx("span", {
                    className: "font-cinzel font-black text-[10px] sm:text-xs text-amber-100 leading-tight drop-shadow",
                    children: currentIntent.label
                  }),
                  e.jsxs("span", {
                    className: "text-[8px] sm:text-[8.5px] font-mono font-bold text-rose-200 bg-black/70 px-2 py-0.5 rounded-full border border-red-800/60",
                    children: [
                      "EXPECTED IMPACT: ",
                      currentIntent.type === "defend" ? \`+\${currentIntent.val} BLK\` : \`-\${currentIntent.val} HP\`
                    ]
                  })
                ]
              }),
              hoveredAbility && e.jsxs("div", {
                className: "w-full p-2 rounded-xl bg-gradient-to-b from-[#2a1a08]/95 via-[#1a1004]/95 to-[#0d0702]/98 border border-amber-400/80 shadow-[0_4px_18px_rgba(245,158,11,0.5)] flex flex-col items-center text-center gap-0.5 pointer-events-auto",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center justify-between w-full text-[8px] font-mono font-bold text-amber-300 px-1",
                    children: [
                      e.jsx("span", { className: "uppercase tracking-wider font-cinzel text-amber-400", children: "TARGET: HOSTIS" }),
                      e.jsxs("span", { className: "bg-amber-950 px-1.5 py-0.2 rounded border border-amber-500/60 text-amber-200", children: [hoveredAbility.cost, " AP"] })
                    ]
                  }),
                  e.jsx("span", {
                    className: "font-cinzel font-black text-[10.5px] sm:text-xs text-amber-100 leading-tight drop-shadow",
                    children: hoveredAbility.name
                  }),
                  e.jsx("span", {
                    className: "text-[8.5px] sm:text-[9.5px] font-serif-body italic text-stone-200 leading-tight",
                    children: hoveredAbility.desc
                  })
                ]
              }),
              !hoveredAbility && e.jsx("div", {
                className: "flex items-center justify-center opacity-30 hover:opacity-50 transition-opacity my-1",
                children: e.jsx(rt, { size: 28, variant: "bronze", emblem: "swords", className: "shrink-0" })
              })
            ]
          }),\n          `;
    js = js.substring(0, p1) + newChunk + js.substring(p2);
    
  }
}

// 5. REDESIGN renderTacticalHandUI FOR CLEAR MOBILE HORIZONTAL SCROLL & SNAP
const handStart = js.indexOf("const renderTacticalHandUI =");
if (handStart !== -1) {
  const p2 = js.indexOf("const renderTokenBattleDamage =", handStart);
  if (p2 !== -1) {
    const newHandFn = `const renderTacticalHandUI = () => {
    if (!displayedTacticalCards || displayedTacticalCards.length === 0) return null;
    return e.jsxs("div", {
      className: "w-full max-w-2xl mx-auto flex flex-col gap-1 z-30 select-none px-1",
      children: [
        e.jsxs("div", {
          className: "flex items-center justify-between px-2.5 text-[8.5px] sm:text-[9.5px] font-cinzel font-black text-amber-300 tracking-wider uppercase",
          children: [
            e.jsxs("div", {
              className: "flex items-center gap-1.5",
              children: [
                e.jsx("span", { className: "text-amber-400", children: "📜" }),
                e.jsx("span", { children: "TACTICAL HAND CARDS (CARDAE TACTICAE)" })
              ]
            }),
            e.jsxs("span", {
              className: "text-[8px] font-mono text-amber-400/80 font-bold",
              children: ["SWIPE → (", displayedTacticalCards.length, " CARDS)"]
            })
          ]
        }),
        e.jsxs("div", {
          className: "w-full flex items-center gap-2 overflow-x-auto snap-x snap-mandatory pt-3 pb-2 px-2 justify-start sm:justify-center no-scrollbar scroll-smooth touch-pan-x relative",
          style: { scrollbarWidth: "none", WebkitOverflowScrolling: "touch" },
          children: [
            ...displayedTacticalCards.map((card, cardIdx) => {
            const isAffordable = actionPoints >= card.cost;
            const isSelected = hoveredAbility?.name === card.name;
            const roleGradient = card.role === "ATTACK"
              ? "from-[#3a0e0e]/95 via-[#1e0808]/95 to-[#0f0404]/98 border-rose-600/80"
              : card.role === "DEFENSE"
              ? "from-[#08223e]/95 via-[#041224]/95 to-[#020810]/98 border-sky-500/80"
              : "from-[#382208]/95 via-[#1f1204]/95 to-[#0f0802]/98 border-amber-500/80";
            const roleTextColor = card.role === "ATTACK" ? "text-rose-300" : card.role === "DEFENSE" ? "text-sky-300" : "text-amber-300";
            const statBadge = card.damageMultiplier
              ? { text: \`+\${card.damageMultiplier}x DMG\`, bg: "bg-rose-950/90 text-rose-300 border border-rose-700/60" }
              : card.blockAmount
              ? { text: \`+\${card.blockAmount} BLK\`, bg: "bg-sky-950/90 text-sky-300 border border-sky-700/60" }
              : card.healAmount
              ? { text: \`+\${card.healAmount} HP\`, bg: "bg-emerald-950/90 text-emerald-300 border border-emerald-700/60" }
              : card.bonusRedraws
              ? { text: \`+\${card.bonusRedraws} REDRAW\`, bg: "bg-amber-950/90 text-amber-300 border border-amber-700/60" }
              : null;
            return e.jsxs("button", {
              key: card.id,
              type: "button",
              disabled: !isAffordable,
              onClick: () => isAffordable && playTacticalCard(card),
              onMouseEnter: () => setHoveredAbility({
                name: card.name,
                desc: \`\${card.domain === "sea" ? "⚓ Classis Only" : card.domain === "land" ? "🦅 Legio Only" : "✦ Universal"} • \${card.description || card.tag}\`,
                cost: card.cost
              }),
              onMouseLeave: () => setHoveredAbility(null),
              className: \`snap-center shrink-0 flex flex-col justify-between w-[84px] xs:w-[92px] sm:w-[104px] h-[68px] sm:h-[74px] p-1.5 rounded-xl border bg-gradient-to-b \${roleGradient} \${
                isSelected
                  ? "ring-2 ring-amber-300 border-amber-300 scale-[1.04] shadow-[0_0_16px_rgba(251,191,36,0.7)] z-20"
                  : isAffordable
                  ? "hover:scale-[1.03] hover:border-amber-400 cursor-pointer active:scale-95 shadow-md"
                  : "opacity-40 border-stone-800 bg-stone-950/90 cursor-not-allowed"
              } transition-all duration-150 text-left select-none relative group\`,
              children: [
                e.jsxs("div", {
                  className: "flex items-center justify-between w-full pointer-events-none",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [
                        e.jsx("span", {
                          className: \`text-[7.5px] sm:text-[8px] font-cinzel font-black tracking-wider \${roleTextColor}\`,
                          children: card.role ? card.role.slice(0, 3) : "TAC"
                        }),
                        e.jsx("span", {
                          className: \`text-[6.5px] sm:text-[7px] font-mono font-bold px-1 py-0.2 rounded border \${
                            card.domain === "sea"
                              ? "bg-sky-950/90 text-sky-300 border-sky-500/60"
                              : card.domain === "land"
                              ? "bg-amber-950/90 text-amber-300 border-amber-600/60"
                              : "bg-purple-950/90 text-purple-200 border-purple-600/60"
                          }\`,
                          children: card.domain === "sea" ? "⚓ SEA" : card.domain === "land" ? "🦅 LAND" : "✦ ALL"
                        })
                      ]
                    }),
                    e.jsxs("span", {
                      className: \`px-1.5 py-0.2 rounded-full text-[8px] sm:text-[8.5px] font-mono font-black border \${
                        isAffordable
                          ? "bg-amber-500/30 text-amber-200 border-amber-400 shadow-sm"
                          : "bg-rose-950/90 text-rose-300 border-rose-600/80"
                      }\`,
                      children: [card.cost, " AP"]
                    })
                  ]
                }),
                e.jsx("span", {
                  className: "font-cinzel font-black text-[8.5px] sm:text-[9.5px] text-stone-100 leading-tight line-clamp-1 pointer-events-none drop-shadow-sm",
                  children: card.shortName || card.name
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between w-full pointer-events-none",
                  children: [
                    e.jsx("span", {
                      className: "text-[7.5px] font-serif-body italic text-stone-300 line-clamp-1 opacity-90",
                      children: card.shortDesc || card.tag || card.latinName || ""
                    }),
                    statBadge ? e.jsx("span", {
                      className: \`text-[7px] sm:text-[7.5px] font-mono font-bold px-1 rounded \${statBadge.bg}\`,
                      children: statBadge.text
                    }) : null
                  ]
                })
              ]
            });
          }),
          e.jsx("div", { className: "w-8 shrink-0 h-1" })
        ] })
      ]
    });
  };

  `;
    js = js.substring(0, handStart) + newHandFn + js.substring(p2);
    
  }
}

// 6. REDESIGN BOTTOM HUD COMMAND DISCIPLINES & SEPARATED END TURN / RETREAT BUTTONS
const defaultAbilitiesPos = js.indexOf("defaultAbilities.map");
if (defaultAbilitiesPos !== -1) {
  const p1 = js.lastIndexOf("turn === 'player' ? e.jsxs(\"div\",", defaultAbilitiesPos);
  const p2 = js.indexOf(": turn === 'enemy' ?", defaultAbilitiesPos);
  if (p1 !== -1 && p2 !== -1) {
    const newBtm = `turn === "player" ? e.jsxs("div", {
            className: "flex flex-col gap-1.5 w-full max-w-2xl mx-auto py-1",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between w-full px-2 text-[8.5px] sm:text-[9.5px] font-cinzel font-black text-amber-300 tracking-wider uppercase border-t border-amber-500/25 pt-1.5",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      e.jsx("span", { className: "text-amber-400", children: "⚡" }),
                      e.jsx("span", { children: "COMMAND DISCIPLINES (DISCIPLINA BELLICA)" })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      e.jsx("span", { className: "text-amber-400/80 font-mono font-bold text-[8px]", children: "ACTIONS" }),
                      e.jsx("span", { className: "text-rose-400/80 font-mono font-bold text-[8px]", children: "DISENGAGE" })
                    ]
                  })
                ]
              }),
              e.jsxs("div", {
                className: "flex items-center justify-between gap-1.5 sm:gap-4 w-full px-1",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar pt-2.5 pb-1 px-1",
                    children: [
                      ...defaultAbilities.map(ability => {
                      const isAffordable = actionPoints >= ability.cost;
                      return e.jsxs("div", {
                        key: ability.id,
                        onMouseEnter: () => setHoveredAbility(ability),
                        onMouseLeave: () => setHoveredAbility(null),
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
                  ] }),
                  e.jsx("div", { className: "w-[1.5px] h-10 bg-amber-500/40 shrink-0 mx-0.5" }),
                  e.jsxs("div", {
                    className: "flex items-center gap-2 sm:gap-3 shrink-0",
                    children: [
                      e.jsxs("div", {
                        className: "flex flex-col items-center gap-0.5 cursor-pointer group select-none active:scale-95",
                        children: [
                          e.jsx(Vr, {
                            onClick: () => { if (actionPoints >= 0) endTurn(); },
                            variant: "gold",
                            emblem: "hourglass",
                            showGlow: actionPoints === 0,
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
          }) `;
    js = js.substring(0, p1) + newBtm + js.substring(p2);
    
  }
}

// 7. ADJUST SUNSET POSITION (MOVE TO HORIZON, CENTERED AWAY FROM SHIPS & HUD)
const sunPosMarker = 'style:{left:n==="AVRORA"?"12%":n==="VESPER"?"82%":"48%",top:n==="DIES"?"12%":"48%"}';
if (js.includes(sunPosMarker)) {
  js = js.replace(
    sunPosMarker,
    'style:{left:n==="AVRORA"?"12%":n==="VESPER"?"50%":"48%",top:n==="DIES"?"12%":n==="VESPER"?"28%":"48%"}'
  );
  
} else {
  console.warn("WARN: Could not find sunset position marker.");
}

// 8. REMOVE BACKGROUND SUN DISK TO ELIMINATE CIRCULAR ARTIFACT
const sunDiskMarker = 'e.jsx("div",{className:"w-16 h-16 rounded-full bg-white relative z-10",style:{boxShadow:`0 0 60px 10px ${x.lightColor}, 0 0 120px 30px rgba(254,240,138,0.25)`,animation:"sun-shimmer 12s ease-in-out infinite"}})';
if (js.includes(sunDiskMarker)) {
  js = js.replace(sunDiskMarker, "null");
  
} else {
  console.warn("WARN: Could not find sun disk marker.");
}

// 9. CONSTRAIN SHIELD/SHIP TOKENS TO SHRINK GRACEFULLY TO VIEWPORT
const tokenContainerMarker = 'className: "relative flex flex-col items-center justify-center z-20 shrink-0 w-[105px] sm:w-[130px] md:w-[155px]"';
if (js.includes(tokenContainerMarker)) {
  js = js.replace(
    tokenContainerMarker,
    'className: "relative flex flex-col items-center justify-center z-20 shrink min-w-0 w-[94px] xs:w-[115px] sm:w-[130px] md:w-[155px]"'
  );
  
}

const tokenMedallionScaleMarker = 'className: "flex items-center justify-center scale-90 sm:scale-100 md:scale-115 relative w-[110px] h-[110px]"';
if (js.includes(tokenMedallionScaleMarker)) {
  js = js.replace(
    tokenMedallionScaleMarker,
    'className: "flex items-center justify-center scale-[0.72] xs:scale-90 sm:scale-100 md:scale-115 relative w-[110px] h-[110px]"'
  );
  
}

// 10. CONSTRAIN MAIN ARENA PADDING AND GAP TO PREVENT OVERFLOW
const mainContainerMarker = 'className: "flex-1 w-full max-w-4xl mx-auto flex items-center justify-between px-2 sm:px-8 md:px-12 z-20 relative overflow-visible my-auto"';
if (js.includes(mainContainerMarker)) {
  js = js.replace(
    mainContainerMarker,
    'className: "flex-1 w-full max-w-4xl mx-auto flex items-center justify-between gap-1 px-1.5 sm:px-8 md:px-12 z-20 relative overflow-visible my-auto"'
  );
  
}

// 11. DELIBERATELY ABBREVIATE OR WRAP TOP ACTION BANNER TEXT
const topActionBannerMarker = 'className: `px-2.5 sm:px-3.5 py-1 rounded-full border text-[8px] sm:text-[10px] font-cinzel font-black tracking-widest uppercase shadow-md ${turn === \'player\' ? \'bg-emerald-950/90 border-emerald-400/90 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]\' : \'bg-rose-950/90 border-rose-500/90 text-rose-300 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.4)]\'}`';
if (js.includes(topActionBannerMarker)) {
  js = js.replace(
    topActionBannerMarker,
    'className: `px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[7.5px] xs:text-[8px] sm:text-[10px] font-cinzel font-black tracking-wider uppercase text-center shadow-md leading-none max-w-[65px] xs:max-w-[85px] sm:max-w-none break-words ${turn === \'player\' ? \'bg-emerald-950/90 border-emerald-400/90 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]\' : \'bg-rose-950/90 border-rose-500/90 text-rose-300 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.4)]\'}`'
  );
  js = js.replace(
    'children: turn === \'player\' ? "IMPERATOR ACTS" : "HOSTIS AGIT"',
    'children: turn === \'player\' ? "IMPERATOR" : "HOSTIS ACTS"'
  );
  
}

// 12. REMOVE TRAPEZOIDAL GOD-RAY / SPOTLIGHT OVERLAYS ENTIRELY
const rayOverlayMarker = '!i&&(n==="DIES"||n==="AVRORA")&&e.jsxs("div",{className:"absolute inset-0 pointer-events-none opacity-40 opacity-20 overflow-hidden",children:[e.jsx("div",{className:"absolute -top-20 left-1/4 w-32 h-[140%] bg-gradient-to-b from-amber-100 via-amber-200/40 to-transparent rotate-12  transform origin-top"}),e.jsx("div",{className:"absolute -top-20 left-1/2 w-44 h-[140%] bg-gradient-to-b from-yellow-50 via-amber-100/30 to-transparent -rotate-6  transform origin-top"}),e.jsx("div",{className:"absolute -top-20 left-3/4 w-28 h-[140%] bg-gradient-to-b from-amber-100 via-orange-200/20 to-transparent -rotate-18  transform origin-top"})]}),';
if (js.includes(rayOverlayMarker)) {
  js = js.replace(rayOverlayMarker, "null,");
  
}

// 13. RENDER DARK CONTINUOUS SEA WITH SPARSE RIPPLES AND NARROW BROKEN REFLECTION
const seaBlockStart = '!["mountain_pass","wooded_valley","desert_sands","roman_colonnade","imperial_city"].includes(t)&&e.jsx("div",{className:"absolute bottom-0 inset-x-0 h-64 z-10 overflow-visible"';
const seaBlockPos = js.indexOf(seaBlockStart);
if (seaBlockPos !== -1) {
  const seaBlockEndMarker = 'delay-1500"})]})]})})()})';
  const seaBlockEndPos = js.indexOf(seaBlockEndMarker, seaBlockPos);
  if (seaBlockEndPos !== -1) {
    const fullOriginalSeaBlock = js.substring(seaBlockPos, seaBlockEndPos + seaBlockEndMarker.length);
    const newSeaBlock = `!["mountain_pass","wooded_valley","desert_sands","roman_colonnade","imperial_city"].includes(t)&&e.jsxs("div",{
      className: "absolute bottom-0 inset-x-0 h-[220px] bg-gradient-to-b from-[#02050e] via-[#010206] to-[#000102] border-t border-[#0e1b2f]/35 z-10 overflow-hidden",
      children: [
        e.jsx("div", { className: "absolute top-[12%] left-[15%] w-[45px] h-[1.2px] bg-sky-950/15 rounded-full pointer-events-none" }),
        e.jsx("div", { className: "absolute top-[25%] left-[72%] w-[60px] h-[1.2px] bg-sky-950/12 rounded-full pointer-events-none" }),
        e.jsx("div", { className: "absolute top-[38%] left-[28%] w-[50px] h-[1.2px] bg-sky-950/12 rounded-full pointer-events-none" }),
        e.jsx("div", { className: "absolute top-[48%] left-[80%] w-[40px] h-[1.2px] bg-sky-950/10 rounded-full pointer-events-none" }),
        e.jsx("div", { className: "absolute top-[60%] left-[8%] w-[55px] h-[1.2px] bg-sky-950/10 rounded-full pointer-events-none" }),
        e.jsx("div", { className: "absolute top-[70%] left-[62%] w-[65px] h-[1.2px] bg-sky-950/12 rounded-full pointer-events-none" }),
        e.jsx("div", { className: "absolute top-[82%] left-[42%] w-[48px] h-[1.2px] bg-sky-950/8 rounded-full pointer-events-none" }),
        e.jsx("div", { className: "absolute top-[90%] left-[20%] w-[35px] h-[1.2px] bg-sky-950/8 rounded-full pointer-events-none" }),
        n === "VESPER" && e.jsxs("div", {
          className: "absolute top-0 w-12 flex flex-col items-center gap-[4px] opacity-[0.5] pointer-events-none z-10",
          style: { left: "50%", transform: "translateX(-24px)" },
          children: [
            e.jsx("div", { className: "w-10 h-[2px] bg-amber-500/40 rounded-full" }),
            e.jsx("div", { className: "w-6 h-[2px] bg-amber-500/35 rounded-full" }),
            e.jsx("div", { className: "w-8 h-[2px] bg-orange-500/30 rounded-full" }),
            e.jsx("div", { className: "w-4 h-[2px] bg-orange-600/25 rounded-full" }),
            e.jsx("div", { className: "w-5 h-[2px] bg-orange-500/20 rounded-full" }),
            e.jsx("div", { className: "w-3 h-[2px] bg-amber-500/15 rounded-full" }),
            e.jsx("div", { className: "w-4 h-[1.5px] bg-amber-600/10 rounded-full" }),
            e.jsx("div", { className: "w-2 h-[1.5px] bg-orange-600/8 rounded-full" })
          ]
        })
      ]
    })`;
    js = js.replace(fullOriginalSeaBlock, newSeaBlock);
    
  }
}

// VALIDATE BUNDLE WITH ESBUILD
try {
  esbuild.transformSync(js, { loader: "js" });
  
} catch (err) {
  console.error("ERR: ESBuild validation error in mobile combat redesign:", err.message);
  process.exit(1);
}

fs.writeFileSync(bundlePath, js, "utf8");

