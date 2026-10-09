const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING BESPOKE COLOR PALETTES & REMOVING REDUNDANT DOMAIN TEXT ===");

// 1. Restore from V36 as pristine base
fs.copyFileSync(path.join(__dirname, '../public/assets/index-V36.js'), path.join(__dirname, '../public/assets/index-V37.js'));
const filePath = path.join(__dirname, '../public/assets/index-V37.js');
let code = fs.readFileSync(filePath, 'utf8');

// 2. Apply Top HUD Specialization (Compass, Acies Triplex, Stances)
require('./apply_top_hud_specialization.cjs');
code = fs.readFileSync(filePath, 'utf8');

// 3. Replace renderTacticalHandUI with Differentiated Sea/Land Palettes & Clean Cards
let pHand = code.indexOf("renderTacticalHandUI = () => {");
if (pHand === -1) {
  pHand = code.indexOf("renderTacticalHandUI =");
}
let pDamage = code.indexOf("const renderTokenBattleDamage =");

if (pHand === -1 || pDamage === -1) {
  console.error("Could not locate renderTacticalHandUI bounds!");
  process.exit(1);
}

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
console.log("Successfully replaced renderTacticalHandUI!");

// 4. Update combat-bottom-hud footer style
const oldFooterStyle = `style: {          paddingBottom: "max(calc(env(safe-area-inset-bottom, 0px) + 12px), 22px)",          background: "linear-gradient(0deg, rgba(8, 14, 28, 0.99) 0%, rgba(6, 11, 24, 0.97) 65%, rgba(10, 18, 36, 0.95) 100%)",          borderTop: "2px solid rgba(212, 175, 55, 0.45)",          boxShadow: "0 -12px 36px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 215, 0, 0.25)"        },`;

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

if (code.includes(oldFooterStyle)) {
  code = code.replace(oldFooterStyle, newFooterStyle);
  console.log("Successfully replaced footer style with exact string match!");
} else {
  console.warn("Could not find exact oldFooterStyle; searching index...");
}

// 5. Update defaultAbilities with refined descriptors and domain-matched styling
const oldDefaultAb = `const defaultAbilities = [    {       id: 1,       type: isSea ? 'ram' : 'sword',       name: isSea ? 'Ram Speed' : 'Gladius',       dmg: 15,       cost: 1,       tag: '15 DMG',      desc: isSea ? 'Full speed ramming impact. Deals 15 hull damage with 25% crit chance.' : 'Standard gladius strike. Deals 15 damage with 25% crit chance.',       variant: 'gold',       emblem: isSea ? 'anchor' : 'swords'     },    {       id: 2,       type: 'block',       name: isSea ? 'Navis Testudo' : 'Testudo',       def: 10,       cost: 1,       tag: '+10 DEF',      desc: isSea ? 'Form reinforced deck shields. Grants +10 Defense against incoming attacks.' : 'Form protective shield wall. Grants +10 Defense against incoming attacks.',       variant: 'teal',       emblem: 'shield'     },    {       id: 3,       type: 'projectile',       name: isSea ? 'Ballista' : 'Pilum',       dmg: 10,       cost: 1,       tag: '10 DMG • BLEED',      desc: isSea ? 'Heavy ballista bolt. Deals 10 damage and inflicts deep bleed.' : 'Heavy pilum volley. Deals 10 damage and inflicts deep bleed.',       effect: 'bleed',       variant: 'crimson',       emblem: 'target'     },    {       id: 4,       type: 'archers',       name: isSea ? 'Fire Arrows' : 'Archers',       dmg: 12,       cost: 1,       tag: isSea ? '12 DMG • BURN' : '12 DMG • RANGED',      desc: isSea ? 'Volley of flaming pitch arrows. Deals 12 ranged fire damage.' : 'Auxiliary Cretan and Syrian archers volley. Deals 12 ranged damage.',       effect: isSea ? 'burn' : 'ranged',       variant: 'purple',       emblem: isSea ? 'flame' : 'target'     }  ];`;

const newDefaultAb = `const defaultAbilities = [
    { 
      id: 1, 
      type: isSea ? 'ram' : 'sword', 
      name: isSea ? 'Ram Speed' : 'Gladius', 
      dmg: 15, 
      cost: 1, 
      tag: '15 DMG',
      desc: isSea ? 'Full speed ramming impact. Deals 15 hull damage with 25% crit chance.' : 'Standard gladius strike. Deals 15 damage with 25% crit chance.', 
      variant: isSea ? 'teal' : 'gold', 
      emblem: isSea ? 'anchor' : 'swords' 
    },
    { 
      id: 2, 
      type: 'block', 
      name: isSea ? 'Navis Testudo' : 'Testudo', 
      def: 10, 
      cost: 1, 
      tag: '+10 DEF',
      desc: isSea ? 'Reinforced deck shields. Grants +10 Defense against incoming attacks.' : 'Protective shield wall. Grants +10 Defense against incoming attacks.', 
      variant: isSea ? 'navy' : 'stone', 
      emblem: 'shield' 
    },
    { 
      id: 3, 
      type: 'projectile', 
      name: isSea ? 'Ballista' : 'Pilum', 
      dmg: 10, 
      cost: 1, 
      tag: '10 DMG • BLEED',
      desc: isSea ? 'Heavy ballista bolt. Deals 10 damage and inflicts bleed.' : 'Heavy pilum volley. Deals 10 damage and inflicts bleed.', 
      effect: 'bleed', 
      variant: 'crimson', 
      emblem: 'target' 
    },
    { 
      id: 4, 
      type: 'archers', 
      name: isSea ? 'Fire Arrows' : 'Archers', 
      dmg: 12, 
      cost: 1, 
      tag: isSea ? '12 DMG • BURN' : '12 DMG • RANGED',
      desc: isSea ? 'Volley of flaming pitch arrows. Deals 12 ranged fire damage.' : 'Auxiliary archers volley. Deals 12 ranged damage.', 
      effect: isSea ? 'burn' : 'ranged', 
      variant: isSea ? 'amber' : 'purple', 
      emblem: isSea ? 'flame' : 'target' 
    }
  ];`;

if (code.includes(oldDefaultAb)) {
  code = code.replace(oldDefaultAb, newDefaultAb);
  console.log("Successfully updated defaultAbilities with exact match!");
}

// 6. Update action deck colors & tooltips
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
console.log("Syntax validation PASSED!");

// Write updated file
fs.writeFileSync(filePath, code, 'utf8');
console.log("Wrote updated index-V37.js!");
