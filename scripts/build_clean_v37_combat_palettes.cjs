const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== COMPOSING CLEAN V37 WITH DIVERGENT COMBAT PALETTES ===");

// 1. Load V36
const v36Path = path.join(__dirname, '../public/assets/index-V36.js');
let code = fs.readFileSync(v36Path, 'utf8');
console.log("Loaded V36, initial length:", code.length);

// Verify V36 syntax
esbuild.transformSync(code, { loader: 'jsx' });
console.log("V36 baseline is valid!");

// 2. Apply Top HUD Specialization (Compass for Sea, Triplex for Land)
let pTopSub = code.indexOf('className: "w-full flex items-center justify-between px-1 text-[8px]');
if (pTopSub !== -1) {
  let pTopSubEnd = code.indexOf('id: "battle-theatre-v2-container"', pTopSub);
  if (pTopSubEnd !== -1) {
    let pBeforeTheatre = code.lastIndexOf('}),', pTopSubEnd);
    if (pBeforeTheatre !== -1) {
      const bespokeTopRow = `className: "w-full flex items-center justify-between px-1.5 py-0.5 text-[8.5px] sm:text-[10px] font-cinzel font-black tracking-wider border-b transition-all duration-300 " + (isSea ? "bg-[#041124]/90 border-cyan-500/30 text-cyan-200" : "bg-[#180505]/90 border-amber-500/30 text-amber-200"),
          children: [
            isSea ? e.jsxs("div", {
              className: "flex items-center gap-2 text-cyan-300 font-mono tracking-wider",
              children: [
                e.jsx("span", { className: "text-cyan-400 font-bold", children: "🧭 VENTUS: AQUILO ↗ • 14 KTS" }),
                e.jsx("span", { className: "text-cyan-500/70", children: "•" }),
                e.jsx("span", { className: "text-[7.5px] sm:text-[8.5px] text-cyan-200/90 font-cinzel font-bold", children: "VELUM FAVENS (+1 RAM)" })
              ]
            }) : e.jsxs("div", {
              className: "flex items-center gap-2 text-amber-300 font-mono tracking-wider",
              children: [
                e.jsx("span", { className: "text-amber-400 font-bold", children: "🦅 FORMATION: ACIES TRIPLEX" }),
                e.jsx("span", { className: "text-amber-500/70", children: "•" }),
                e.jsx("span", { className: "text-[7.5px] sm:text-[8.5px] text-amber-200/90 font-cinzel font-bold", children: "TESTUDO ACTIVE (+10 BLK)" })
              ]
            }),
            isSea ? e.jsxs("div", {
              className: "flex items-center gap-1.5 text-cyan-400/90 font-mono text-[8px]",
              children: [
                e.jsx("span", { children: "⚓ DISTANS: MEDIVM" }),
                e.jsx("span", { className: "text-cyan-500/60", children: "➔" }),
                e.jsx("span", { className: "text-cyan-300 font-bold", children: "BOARDING READY" })
              ]
            }) : e.jsxs("div", {
              className: "flex items-center gap-1.5 text-amber-400/90 font-mono text-[8px]",
              children: [
                e.jsx("span", { children: "🏛️ TERRAIN: COLLIS" }),
                e.jsx("span", { className: "text-amber-500/60", children: "➔" }),
                e.jsx("span", { className: "text-amber-300 font-bold", children: "ELEVATED VANTAGE" })
              ]
            })
          ]
        })`;
      code = code.substring(0, pTopSub) + bespokeTopRow + code.substring(pBeforeTheatre + 2);
      console.log("Applied bespoke Top HUD row!");
    }
  }
}

// 3. Replace renderTacticalHandUI with Differentiated Sea/Land Palettes & Clean Cards (Zero Redundant Domain Text)
let pHand = code.indexOf("renderTacticalHandUI = () => {");
if (pHand === -1) pHand = code.indexOf("renderTacticalHandUI =");
let pDamage = code.indexOf("const renderTokenBattleDamage =");

if (pHand !== -1 && pDamage !== -1) {
  const newTacticalHandUI = `renderTacticalHandUI = () => {
    const hasCards = displayedTacticalCards && displayedTacticalCards.length > 0;
    const isLocked = turn !== "player";
    
    // Bespoke Thematic Headers & Omen Die Palette for Sea vs Land
    const headerTitle = isSea ? "CARDAE CLASSIS • NAVAL HAND" : "CARDAE LEGIONIS • TACTICAL HAND";
    const headerColor = isSea ? "text-cyan-300" : "text-amber-300";
    const headerIconColor = isSea ? "text-cyan-400" : "text-amber-400";
    const subCounterColor = isSea ? "text-cyan-400/80" : "text-amber-400/80";

    const omenDieBg = isSea
      ? "from-[#071933]/98 via-[#041124]/95 to-[#020914]/98 border-cyan-400/80 shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_14px_rgba(6,182,212,0.3)]"
      : "from-[#260a0a]/98 via-[#180505]/95 to-[#0a0202]/98 border-amber-400/80 shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_14px_rgba(245,158,11,0.3)]";
    const omenDieTextColor = isSea ? "text-cyan-300" : "text-amber-300";
    const omenDieSubColor = isSea ? "text-cyan-400/90" : "text-amber-400/90";

    return e.jsxs("div", {
      className: "w-full max-w-2xl mx-auto flex flex-col gap-1 z-30 select-none px-1",
      children: [
        e.jsxs("div", {
          className: \`flex items-center justify-between px-2.5 text-[8.5px] sm:text-[9.5px] font-cinzel font-black \${headerColor} tracking-wider uppercase\`,
          children: [
            e.jsxs("div", {
              className: "flex items-center gap-1.5",
              children: [
                e.jsx("span", { className: headerIconColor, children: isSea ? "⚓" : "📜" }),
                e.jsx("span", { children: headerTitle })
              ]
            }),
            e.jsxs("span", {
              className: \`text-[8px] font-mono \${subCounterColor} font-bold\`,
              children: ["SWIPE → (", displayedTacticalCards.length, " CARDS)"]
            })
          ]
        }),
        e.jsxs("div", {
          className: "w-full flex items-center gap-2 overflow-x-auto snap-x snap-mandatory pt-2 pb-1.5 px-2 justify-start sm:justify-center no-scrollbar scroll-smooth touch-pan-x relative",
          style: { scrollbarWidth: "none", WebkitOverflowScrolling: "touch" },
          children: [
            e.jsxs("button", {
              type: "button",
              disabled: turnDiceRolled || isRollingDice || turn !== "player",
              onClick: rollTacticalDice,
              className: \`snap-center shrink-0 flex flex-col items-center justify-center w-[88px] xs:w-[96px] sm:w-[108px] h-[70px] sm:h-[76px] p-1.5 rounded-xl border-2 bg-gradient-to-b \${omenDieBg} transition-all \${turnDiceRolled ? "opacity-50 cursor-default" : isSea ? "hover:border-cyan-300 hover:scale-105 cursor-pointer active:scale-95" : "hover:border-amber-300 hover:scale-105 cursor-pointer active:scale-95"}\`,
              children: [
                renderOmenDieIcon(activeOmenDieType, isRollingDice, turnDiceRolled, isRollingDice ? rollingDiceVals?.d1 : diceRoll?.d1, s, "md", false),
                e.jsx("span", { className: \`text-[7.5px] sm:text-[8px] font-cinzel font-black \${omenDieTextColor} mt-1 text-center leading-none\`, children: turnDiceRolled ? (diceTotal >= Math.round(omenSides * 1.5) ? "+60% ATK" : diceTotal >= Math.round(omenSides * 1.1) ? "+30% ATK" : diceTotal <= Math.round(omenSides * 0.5) ? "-40% ATK" : "+10% ATK") : "DIVINE OMEN" }),
                e.jsx("span", { className: \`text-[6px] font-mono \${omenDieSubColor} mt-0.5\`, children: turnDiceRolled ? \`ROLL: \${diceTotal} (NEXT ATK)\` : \`ROLL ALEA (\${activeOmenDieType})\` })
              ]
            }),
            ...displayedTacticalCards.map((card, cardIdx) => {
              const isAffordable = actionPoints >= card.cost;
              const isSelected = hoveredAbility?.name === card.name;
              
              // Differentiated Sea vs Land Combat Card Palettes (Zero Redundant Domain Text)
              let roleGradient = "";
              let roleTextColor = "";
              let roleBadgeBg = "";
              let roleBadgeText = "";
              let statBadge = null;

              if (isSea) {
                // Sea Combat Palette: Oceanic Sapphire, Deep Marine Cyan, Nautical Teal/Bronze
                if (card.role === "ATTACK") {
                  roleGradient = "from-[#1a1236]/98 via-[#0e1730]/95 to-[#040d1e]/98 border-cyan-500/80 shadow-[0_4px_14px_rgba(6,182,212,0.22)]";
                  roleTextColor = "text-cyan-300";
                  roleBadgeBg = "bg-cyan-950/90";
                  roleBadgeText = "text-cyan-200 border-cyan-500/60";
                  statBadge = card.damageMultiplier ? { text: \`+\${card.damageMultiplier}x DMG\`, bg: "bg-cyan-950/90 text-cyan-200 border border-cyan-500/60" } : null;
                } else if (card.role === "DEFENSE") {
                  roleGradient = "from-[#032e52]/98 via-[#031d36]/95 to-[#020d1c]/98 border-sky-400/80 shadow-[0_4px_14px_rgba(56,189,248,0.25)]";
                  roleTextColor = "text-sky-300";
                  roleBadgeBg = "bg-sky-950/90";
                  roleBadgeText = "text-sky-200 border-sky-400/60";
                  statBadge = card.blockAmount ? { text: \`+\${card.blockAmount} BLK\`, bg: "bg-sky-950/90 text-sky-200 border border-sky-400/60" } : null;
                } else {
                  roleGradient = "from-[#07332c]/98 via-[#05211e]/95 to-[#020f0e]/98 border-teal-400/80 shadow-[0_4px_14px_rgba(45,212,191,0.25)]";
                  roleTextColor = "text-teal-300";
                  roleBadgeBg = "bg-teal-950/90";
                  roleBadgeText = "text-teal-200 border-teal-400/60";
                  statBadge = card.healAmount ? { text: \`+\${card.healAmount} HP\`, bg: "bg-emerald-950/90 text-emerald-200 border border-emerald-500/60" } : card.bonusRedraws ? { text: \`+\${card.bonusRedraws} REDRAW\`, bg: "bg-teal-950/90 text-teal-200 border border-teal-500/60" } : null;
                }
              } else {
                // Land Combat Palette: Imperial Roman Crimson, Castra Iron/Bronze, Sun Aureus Gold
                if (card.role === "ATTACK") {
                  roleGradient = "from-[#440a0a]/98 via-[#280606]/95 to-[#140202]/98 border-rose-500/80 shadow-[0_4px_14px_rgba(244,63,94,0.25)]";
                  roleTextColor = "text-rose-300";
                  roleBadgeBg = "bg-rose-950/90";
                  roleBadgeText = "text-rose-200 border-rose-600/70";
                  statBadge = card.damageMultiplier ? { text: \`+\${card.damageMultiplier}x DMG\`, bg: "bg-rose-950/90 text-rose-200 border border-rose-700/60" } : null;
                } else if (card.role === "DEFENSE") {
                  roleGradient = "from-[#281b10]/98 via-[#1a120a]/95 to-[#0c0804]/98 border-amber-600/80 shadow-[0_4px_14px_rgba(217,119,6,0.25)]";
                  roleTextColor = "text-amber-400";
                  roleBadgeBg = "bg-stone-900/90";
                  roleBadgeText = "text-amber-200 border-amber-600/60";
                  statBadge = card.blockAmount ? { text: \`+\${card.blockAmount} BLK\`, bg: "bg-amber-950/90 text-amber-200 border border-amber-600/60" } : null;
                } else {
                  roleGradient = "from-[#3d2406]/98 via-[#241503]/95 to-[#100901]/98 border-yellow-500/80 shadow-[0_4px_14px_rgba(234,179,8,0.25)]";
                  roleTextColor = "text-amber-300";
                  roleBadgeBg = "bg-amber-950/90";
                  roleBadgeText = "text-amber-200 border-amber-500/60";
                  statBadge = card.healAmount ? { text: \`+\${card.healAmount} HP\`, bg: "bg-emerald-950/90 text-emerald-200 border border-emerald-600/60" } : card.bonusRedraws ? { text: \`+\${card.bonusRedraws} REDRAW\`, bg: "bg-amber-950/90 text-amber-200 border border-amber-600/60" } : null;
                }
              }

              if (!statBadge) {
                if (card.blockAmount) statBadge = { text: \`+\${card.blockAmount} BLK\`, bg: isSea ? "bg-sky-950/90 text-sky-200 border border-sky-400/60" : "bg-amber-950/90 text-amber-200 border border-amber-600/60" };
                else if (card.healAmount) statBadge = { text: \`+\${card.healAmount} HP\`, bg: "bg-emerald-950/90 text-emerald-200 border border-emerald-600/60" };
              }

              const roleLabel = card.role === "ATTACK" ? "⚔ ATK" : card.role === "DEFENSE" ? "🛡️ DEF" : "⚡ TAC";

              return e.jsxs("button", {
                key: card.id,
                type: "button",
                disabled: !isAffordable,
                onClick: () => isAffordable && playTacticalCard(card),
                onMouseEnter: () => setHoveredAbility({
                  name: card.name,
                  desc: card.description || card.tag || "Execute tactical combat maneuver",
                  cost: card.cost
                }),
                onMouseLeave: () => setHoveredAbility(null),
                className: \`snap-center shrink-0 flex flex-col justify-between w-[84px] xs:w-[92px] sm:w-[104px] h-[68px] sm:h-[74px] p-1.5 rounded-xl border bg-gradient-to-b \${roleGradient} \${
                  isSelected
                    ? isSea
                      ? "ring-2 ring-cyan-300 border-cyan-300 scale-[1.04] shadow-[0_0_16px_rgba(6,182,212,0.7)] z-20"
                      : "ring-2 ring-amber-300 border-amber-300 scale-[1.04] shadow-[0_0_16px_rgba(251,191,36,0.7)] z-20"
                    : isAffordable
                    ? isSea
                      ? "hover:scale-[1.03] hover:border-cyan-300 cursor-pointer active:scale-95 shadow-md"
                      : "hover:scale-[1.03] hover:border-amber-300 cursor-pointer active:scale-95 shadow-md"
                    : "opacity-40 border-stone-800 bg-stone-950/90 cursor-not-allowed"
                } transition-all duration-150 text-left select-none relative group\`,
                children: [
                  e.jsxs("div", {
                    className: "flex items-center justify-between w-full pointer-events-none",
                    children: [
                      e.jsx("span", {
                        className: \`text-[7px] sm:text-[7.5px] font-cinzel font-black tracking-wider px-1 py-0.2 rounded border \${roleBadgeBg} \${roleBadgeText}\`,
                        children: roleLabel
                      }),
                      e.jsxs("span", {
                        className: \`px-1.5 py-0.2 rounded-full text-[8px] sm:text-[8.5px] font-mono font-black border \${
                          isAffordable
                            ? isSea
                              ? "bg-cyan-500/30 text-cyan-200 border-cyan-400 shadow-sm"
                              : "bg-amber-500/30 text-amber-200 border-amber-400 shadow-sm"
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
                      statBadge ? e.jsx("span", {
                        className: \`text-[6.5px] sm:text-[7px] font-mono font-bold px-1 py-0.2 rounded \${statBadge.bg}\`,
                        children: statBadge.text
                      }) : e.jsx("span", {
                        className: "text-[7.5px] font-serif-body italic text-stone-300 line-clamp-1",
                        children: card.tag || "Tactical Action"
                      }),
                      e.jsx("span", {
                        className: "text-[9px] opacity-75 group-hover:opacity-100 transition-opacity",
                        children: card.role === "ATTACK" ? "⚔" : card.role === "DEFENSE" ? "🛡" : "⚡"
                      })
                    ]
                  })
                ]
              });
            }),
            e.jsx("div", { className: "w-8 shrink-0 h-1" })
          ]
        })
      ]
    });
  };
  `;
  code = code.substring(0, pHand) + newTacticalHandUI + code.substring(pDamage);
  console.log("Replaced renderTacticalHandUI cleanly!");
}

// 4. Update combat-bottom-hud footer style
let pFooter = code.indexOf('id: "combat-bottom-hud",');
if (pFooter !== -1) {
  let pStyle = code.indexOf("style: {", pFooter);
  let pStyleEnd = code.indexOf("},", pStyle);
  if (pStyle !== -1 && pStyleEnd !== -1) {
    const newFooterStyle = `style: {
          paddingBottom: "max(calc(env(safe-area-inset-bottom, 0px) + 12px), 22px)",
          background: isSea
            ? "linear-gradient(0deg, rgba(2, 8, 20, 0.99) 0%, rgba(4, 16, 36, 0.97) 65%, rgba(6, 24, 52, 0.95) 100%)"
            : "linear-gradient(0deg, rgba(16, 6, 6, 0.99) 0%, rgba(28, 10, 12, 0.97) 65%, rgba(40, 14, 16, 0.95) 100%)",
          borderTop: isSea
            ? "2px solid rgba(56, 189, 248, 0.55)"
            : "2px solid rgba(212, 175, 55, 0.55)",
          boxShadow: isSea
            ? "0 -12px 36px rgba(2, 12, 28, 0.95), inset 0 1px 0 rgba(56, 189, 248, 0.35)"
            : "0 -12px 36px rgba(18, 4, 4, 0.95), inset 0 1px 0 rgba(255, 215, 0, 0.35)"
        },`;
    code = code.substring(0, pStyle) + newFooterStyle + code.substring(pStyleEnd + 2);
    console.log("Updated combat-bottom-hud footer style!");
  }
}

// 5. Update bottom action deck sub-header and colors
code = code.replace(
  'turn === "player" ? "text-amber-300" : "text-rose-400/90"',
  'turn === "player" ? (isSea ? "text-cyan-300" : "text-amber-300") : "text-rose-400/90"'
);

code = code.replace(
  'turn === "player" ? "text-amber-400 animate-pulse" : "text-rose-400 animate-pulse"',
  'turn === "player" ? (isSea ? "text-cyan-400 animate-pulse" : "text-amber-400 animate-pulse") : "text-rose-400 animate-pulse"'
);

// Verify with esbuild
console.log("Validating syntax with esbuild...");
esbuild.transformSync(code, { loader: 'jsx' });
console.log("✓ ALL SYNTAX CHECKS PASSED!");

const outPath = path.join(__dirname, '../public/assets/index-V37.js');
fs.writeFileSync(outPath, code, 'utf8');
console.log("✓ Wrote updated public/assets/index-V37.js!");
