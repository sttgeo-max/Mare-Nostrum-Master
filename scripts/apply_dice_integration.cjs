const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING REFINED MASTERWORK DICE ANIMATIONS & DROP SYSTEM ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. INJECT REFINED DICE STATES INTO COMBAT ARENA
console.log("- Injecting Omen states and rolling number cycle into Combat Arena...");
const hpState = 'const [playerHp, setPlayerHp] = b.useState(isSea ? (s.fleetHp || 100) : (s.legionHp || 100));';
const diceStateMarker = 'const [diceRoll, setDiceRoll] = b.useState';
const diceState = `
  const [diceRoll, setDiceRoll] = b.useState({d1: 1, d2: 1});
  const [rollingDiceVals, setRollingDiceVals] = b.useState({d1: 1, d2: 1});
  const [isRollingDice, setIsRollingDice] = b.useState(false);
  const [diceTotal, setDiceTotal] = b.useState(0);
  const [diceBonus, setDiceBonus] = b.useState(1.0);
  const [turnDiceRolled, setTurnDiceRolled] = b.useState(false);
  const [omenMessage, setOmenMessage] = b.useState("");
  const [lootedDieData, setLootedDieData] = b.useState(null);
`;

if (js.includes(hpState) && !js.includes(diceStateMarker)) {
    js = js.replace(hpState, hpState + diceState);
} else {
    console.log("[INFO] Ensuring rollingDiceVals and lootedDieData are present in states...");
    if (!js.includes("rollingDiceVals")) {
      js = js.replace("const [diceRoll, setDiceRoll] = b.useState({d1: 1, d2: 1});", "const [diceRoll, setDiceRoll] = b.useState({d1: 1, d2: 1});\n  const [rollingDiceVals, setRollingDiceVals] = b.useState({d1: 1, d2: 1});\n  const [lootedDieData, setLootedDieData] = b.useState(null);");
    }
}

// 2. ADD rollTacticalDice FUNCTION & MASTERWORK 3D DIE RENDERER
console.log("- Updating rollTacticalDice function & Masterwork 3D Die Renderer...");
const rollDiceMarker = 'const rollTacticalDice = () => {';
const rollOmenFunc = `
  const activeOmen = s?.activeAugury || null;
  const rawOmenDie = (activeOmen?.dieType || activeOmen?.diceType || (activeOmen?.sides ? ("D" + activeOmen.sides) : null) || "D6").toString().toUpperCase();
  const omenSides = rawOmenDie.includes("20") ? 20 : rawOmenDie.includes("12") ? 12 : rawOmenDie.includes("10") ? 10 : rawOmenDie.includes("8") ? 8 : rawOmenDie.includes("4") ? 4 : 6;
  const activeOmenDieType = "D" + omenSides;

  const renderOmenDieIcon = (dieType, isRolling, rolled, value, playerObj, size = "md", isRight = false) => {
    const eqDice = (typeof ji === "function" ? ji(playerObj) : (typeof rs !== "undefined" ? rs[0] : { material: "gold", borderColor: "#d4af37", numeralColor: "#1a1004", name: "Alea" }));
    const borderCol = eqDice.borderColor || "#d4af37";
    const numCol = eqDice.numeralColor || "#1a1004";
    const bgGrad = eqDice.textureGradient || "linear-gradient(135deg, #fef08a 0%, #eab308 50%, #854d0e 100%)";
    const romanMap = { 1:"I", 2:"II", 3:"III", 4:"IV", 5:"V", 6:"VI", 7:"VII", 8:"VIII", 9:"IX", 10:"X", 11:"XI", 12:"XII", 13:"XIII", 14:"XIV", 15:"XV", 16:"XVI", 17:"XVII", 18:"XVIII", 19:"XIX", 20:"XX" };
    const defaultDisplay = dieType === "D4" ? "IV" : dieType === "D8" ? "VIII" : dieType === "D10" ? "X" : dieType === "D12" ? "XII" : dieType === "D20" ? "XX" : "VI";
    const displayVal = (isRolling || rolled) && value ? (romanMap[value] || value) : defaultDisplay;
    const isLarge = size === "xl";
    const sizeClasses = isLarge ? "w-20 h-20 sm:w-24 sm:h-24" : "w-7 h-7 sm:w-8 sm:h-8";
    
    // Distinct left/right tumbling animation with physics bounce
    const animClass = isRolling 
      ? (isLarge ? (isRight ? "animate-[bt_dice_tumble_right_0.85s_cubic-bezier(0.25,1,0.5,1)_forwards]" : "animate-[bt_dice_tumble_left_0.85s_cubic-bezier(0.25,1,0.5,1)_forwards]") : "scale-110 rotate-12 brightness-125") 
      : (isLarge ? "animate-[bt_dice_glow_pulse_3s_ease-in-out_infinite]" : "hover:scale-105");

    if (dieType === "D6") {
      return e.jsxs("div", {
        className: \`relative \${sizeClasses} rounded-2xl sm:rounded-3xl flex items-center justify-center select-none transition-all duration-300 transform-gpu shrink-0 \${animClass}\`,
        style: {
          background: bgGrad,
          border: isLarge ? "3px solid " + borderCol : "1.5px solid " + borderCol,
          boxShadow: isLarge 
            ? "inset 2.5px 2.5px 5px rgba(255,255,255,0.85), inset -3.5px -3.5px 7px rgba(0,0,0,0.7), 0 16px 32px rgba(0,0,0,0.9), 0 0 16px " + (eqDice.glowColor || "rgba(245,158,11,0.4)") 
            : "inset 1px 1px 2px rgba(255,255,255,0.7), inset -1.5px -1.5px 3px rgba(0,0,0,0.6), 0 3px 8px rgba(0,0,0,0.6)"
        },
        children: [
          // Top & side bevel highlights
          e.jsx("div", { className: "absolute top-0 inset-x-0 h-2 sm:h-2.5 rounded-t-2xl bg-gradient-to-b from-white/80 to-transparent pointer-events-none" }),
          e.jsx("div", { className: "absolute left-0 inset-y-0 w-2 sm:w-2.5 rounded-l-2xl bg-gradient-to-r from-white/60 to-transparent pointer-events-none" }),
          // Inner Roman border
          e.jsx("div", { className: "absolute inset-1.5 rounded-xl border border-black/25 pointer-events-none" }),
          e.jsx("span", {
            className: \`relative z-10 font-cinzel font-black \${isLarge ? "text-2xl sm:text-3xl" : "text-xs sm:text-[13px]"} tracking-tight drop-shadow select-none leading-none\`,
            style: { 
              color: numCol, 
              textShadow: isLarge ? "2px 2px 0px rgba(255,255,255,0.55), -2px -2px 0px rgba(0,0,0,0.45)" : "1px 1px 0px rgba(255,255,255,0.4), -1px -1px 0px rgba(0,0,0,0.3)" 
            },
            children: displayVal
          }),
          // Ornate Corner Brass Rivets
          e.jsx("div", { className: \`absolute \${isLarge ? "top-2 left-2 w-2 h-2" : "top-0.5 left-0.5 w-0.5 h-0.5"} rounded-full shadow\`, style: { background: borderCol, border: "0.5px solid " + numCol } }),
          e.jsx("div", { className: \`absolute \${isLarge ? "top-2 right-2 w-2 h-2" : "top-0.5 right-0.5 w-0.5 h-0.5"} rounded-full shadow\`, style: { background: borderCol, border: "0.5px solid " + numCol } }),
          e.jsx("div", { className: \`absolute \${isLarge ? "bottom-2 left-2 w-2 h-2" : "bottom-0.5 left-0.5 w-0.5 h-0.5"} rounded-full shadow\`, style: { background: borderCol, border: "0.5px solid " + numCol } }),
          e.jsx("div", { className: \`absolute \${isLarge ? "bottom-2 right-2 w-2 h-2" : "bottom-0.5 right-0.5 w-0.5 h-0.5"} rounded-full shadow\`, style: { background: borderCol, border: "0.5px solid " + numCol } })
        ]
      });
    }

    return e.jsxs("div", {
      className: \`relative \${sizeClasses} flex items-center justify-center select-none transition-all duration-300 transform-gpu shrink-0 \${animClass}\`,
      children: [
        e.jsxs("svg", {
          viewBox: "0 0 100 100",
          className: "w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] overflow-visible",
          children: [
            e.jsxs("defs", {
              children: [
                e.jsxs("linearGradient", {
                  id: "omen_die_grad_" + dieType + (isRight ? "_r" : "_l"),
                  x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                  children: [
                    e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
                    e.jsx("stop", { offset: "35%", stopColor: "#eab308" }),
                    e.jsx("stop", { offset: "75%", stopColor: "#a16207" }),
                    e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
                  ]
                })
              ]
            }),
            dieType === "D4" && e.jsxs("g", {
              children: [
                e.jsx("polygon", { points: "50,10 90,82 10,82", fill: "url(#omen_die_grad_" + dieType + (isRight ? "_r" : "_l") + ")", stroke: borderCol, strokeWidth: isLarge ? "5.5" : "3.5", strokeLinejoin: "round" }),
                e.jsx("polygon", { points: "50,10 50,54 10,82", fill: "rgba(255,255,255,0.25)" }),
                e.jsx("polygon", { points: "10,82 50,54 90,82", fill: "rgba(0,0,0,0.35)" }),
                e.jsx("line", { x1: "50", y1: "10", x2: "50", y2: "54", stroke: "rgba(255,255,255,0.75)", strokeWidth: "2" }),
                e.jsx("line", { x1: "10", y1: "82", x2: "50", y2: "54", stroke: "rgba(0,0,0,0.45)", strokeWidth: "1.5" }),
                e.jsx("line", { x1: "90", y1: "82", x2: "50", y2: "54", stroke: "rgba(0,0,0,0.45)", strokeWidth: "1.5" }),
                e.jsx("text", { x: "50", y: "68", textAnchor: "middle", dominantBaseline: "central", fontFamily: "Cinzel, serif", fontWeight: "900", fontSize: isLarge ? "26" : "20", fill: numCol, children: displayVal })
              ]
            }),
            dieType === "D8" && e.jsxs("g", {
              children: [
                e.jsx("polygon", { points: "50,6 92,50 50,94 8,50", fill: "url(#omen_die_grad_" + dieType + (isRight ? "_r" : "_l") + ")", stroke: borderCol, strokeWidth: isLarge ? "5.5" : "3.5", strokeLinejoin: "round" }),
                e.jsx("polygon", { points: "8,50 50,6 50,50", fill: "rgba(255,255,255,0.3)" }),
                e.jsx("polygon", { points: "50,6 92,50 50,50", fill: "rgba(255,255,255,0.14)" }),
                e.jsx("polygon", { points: "8,50 50,50 50,94", fill: "rgba(0,0,0,0.2)" }),
                e.jsx("polygon", { points: "50,50 92,50 50,94", fill: "rgba(0,0,0,0.4)" }),
                e.jsx("line", { x1: "8", y1: "50", x2: "92", y2: "50", stroke: borderCol, strokeWidth: "2", opacity: "0.9" }),
                e.jsx("line", { x1: "50", y1: "6", x2: "50", y2: "94", stroke: borderCol, strokeWidth: "2", opacity: "0.9" }),
                e.jsx("text", { x: "50", y: "52", textAnchor: "middle", dominantBaseline: "central", fontFamily: "Cinzel, serif", fontWeight: "900", fontSize: isLarge ? "26" : "20", fill: numCol, children: displayVal })
              ]
            }),
            dieType === "D10" && e.jsxs("g", {
              children: [
                e.jsx("polygon", { points: "50,6 92,36 76,92 24,92 8,36", fill: "url(#omen_die_grad_" + dieType + (isRight ? "_r" : "_l") + ")", stroke: borderCol, strokeWidth: isLarge ? "5.5" : "3.5", strokeLinejoin: "round" }),
                e.jsx("polygon", { points: "8,36 50,6 50,50", fill: "rgba(255,255,255,0.28)" }),
                e.jsx("polygon", { points: "50,6 92,36 50,50", fill: "rgba(255,255,255,0.12)" }),
                e.jsx("polygon", { points: "8,36 50,50 24,92", fill: "rgba(0,0,0,0.18)" }),
                e.jsx("polygon", { points: "50,50 92,36 76,92", fill: "rgba(0,0,0,0.32)" }),
                e.jsx("polygon", { points: "24,92 50,50 76,92", fill: "rgba(0,0,0,0.25)" }),
                e.jsx("line", { x1: "50", y1: "6", x2: "50", y2: "50", stroke: "rgba(255,255,255,0.75)", strokeWidth: "2" }),
                e.jsx("line", { x1: "8", y1: "36", x2: "50", y2: "50", stroke: borderCol, strokeWidth: "1.6", opacity: "0.85" }),
                e.jsx("line", { x1: "92", y1: "36", x2: "50", y2: "50", stroke: borderCol, strokeWidth: "1.6", opacity: "0.85" }),
                e.jsx("text", { x: "50", y: "52", textAnchor: "middle", dominantBaseline: "central", fontFamily: "Cinzel, serif", fontWeight: "900", fontSize: isLarge ? "25" : "19", fill: numCol, children: displayVal })
              ]
            }),
            dieType === "D12" && e.jsxs("g", {
              children: [
                e.jsx("polygon", { points: "50,6 92,35 76,90 24,90 8,35", fill: "url(#omen_die_grad_" + dieType + (isRight ? "_r" : "_l") + ")", stroke: borderCol, strokeWidth: isLarge ? "5.5" : "3.5", strokeLinejoin: "round" }),
                e.jsx("polygon", { points: "50,26 74,42 66,72 34,72 26,42", fill: "rgba(255,255,255,0.18)", stroke: borderCol, strokeWidth: "2" }),
                e.jsx("line", { x1: "50", y1: "6", x2: "50", y2: "26", stroke: borderCol, strokeWidth: "1.8" }),
                e.jsx("line", { x1: "92", y1: "35", x2: "74", y2: "42", stroke: borderCol, strokeWidth: "1.8" }),
                e.jsx("line", { x1: "76", y1: "90", x2: "66", y2: "72", stroke: borderCol, strokeWidth: "1.8" }),
                e.jsx("line", { x1: "24", y1: "90", x2: "34", y2: "72", stroke: borderCol, strokeWidth: "1.8" }),
                e.jsx("line", { x1: "8", y1: "35", x2: "26", y2: "42", stroke: borderCol, strokeWidth: "1.8" }),
                e.jsx("text", { x: "50", y: "54", textAnchor: "middle", dominantBaseline: "central", fontFamily: "Cinzel, serif", fontWeight: "900", fontSize: isLarge ? "23" : "17", fill: numCol, children: displayVal })
              ]
            }),
            dieType === "D20" && e.jsxs("g", {
              children: [
                e.jsx("polygon", { points: "50,6 90,28 90,74 50,96 10,74 10,28", fill: "url(#omen_die_grad_" + dieType + (isRight ? "_r" : "_l") + ")", stroke: borderCol, strokeWidth: isLarge ? "5.5" : "3.5", strokeLinejoin: "round" }),
                e.jsx("polygon", { points: "50,30 80,74 20,74", fill: "rgba(255,255,255,0.24)", stroke: borderCol, strokeWidth: "2" }),
                e.jsx("line", { x1: "50", y1: "6", x2: "50", y2: "30", stroke: "rgba(255,255,255,0.75)", strokeWidth: "1.8" }),
                e.jsx("line", { x1: "50", y1: "6", x2: "10", y2: "28", stroke: borderCol, strokeWidth: "1.6" }),
                e.jsx("line", { x1: "50", y1: "6", x2: "90", y2: "28", stroke: borderCol, strokeWidth: "1.6" }),
                e.jsx("line", { x1: "10", y1: "28", x2: "20", y2: "74", stroke: borderCol, strokeWidth: "1.6" }),
                e.jsx("line", { x1: "90", y1: "28", x2: "80", y2: "74", stroke: borderCol, strokeWidth: "1.6" }),
                e.jsx("line", { x1: "20", y1: "74", x2: "50", y2: "96", stroke: borderCol, strokeWidth: "1.6" }),
                e.jsx("line", { x1: "80", y1: "74", x2: "50", y2: "96", stroke: borderCol, strokeWidth: "1.6" }),
                e.jsx("text", { x: "50", y: "56", textAnchor: "middle", dominantBaseline: "central", fontFamily: "Cinzel, serif", fontWeight: "900", fontSize: isLarge ? "22" : "16", fill: numCol, children: displayVal })
              ]
            })
          ]
        })
      ]
    });
  };

  const rollTacticalDice = () => {
    if (turnDiceRolled || isRollingDice || turn !== "player") return;
    setIsRollingDice(true);
    setTurnDiceRolled(true);
    const eqDice = (typeof ji === "function" ? ji(s) : (typeof rs !== "undefined" ? rs[0] : { bonusAttack: 0, bonusLuck: 0, material: "bone" }));
    if (typeof v !== "undefined" && v.playMaterialDiceRoll) {
      v.playMaterialDiceRoll(eqDice?.material || "bone");
    } else if (typeof v !== "undefined" && v.playDiceRoll) {
      v.playDiceRoll();
    }

    // High-speed cycling of Roman numerals during the roll tumble animation
    const rollInterval = setInterval(() => {
      setRollingDiceVals({
        d1: Math.floor(Math.random() * omenSides) + 1,
        d2: Math.floor(Math.random() * omenSides) + 1
      });
    }, 35);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      const minVal = eqDice?.minimumDieValue || 1;
      const d1 = Math.max(minVal, Math.floor(Math.random() * (omenSides - minVal + 1)) + minVal);
      const d2 = Math.max(minVal, Math.floor(Math.random() * (omenSides - minVal + 1)) + minVal);
      const total = d1 + d2;
      setDiceRoll({ d1, d2 });
      setRollingDiceVals({ d1, d2 });
      setDiceTotal(total);
      setIsRollingDice(false);
      
      if (typeof v !== "undefined" && v.playMaterialDiceLand) {
        v.playMaterialDiceLand(eqDice?.material || "bone");
      }
      
      // Bronze die perk: bonus block
      if (eqDice?.material === "bronze") {
        setPlayerBlock(prev => prev + 4);
        spawnText("+4 BLOCK (Corinthian Bronze)", true, "#38bdf8");
      }
      
      const maxVal = omenSides * 2;
      const highVal = Math.round(maxVal * 0.75);
      const midVal = Math.round(maxVal * 0.55);
      const lowVal = Math.round(maxVal * 0.28);
      
      let mult = 1.0;
      let msg = "";
      let color = "#F3E7C8";
      
      if (total >= highVal) {
        mult = 1.6;
        msg = "+60% ATK • DIVINE ADVANTAGE! ⚔️";
        color = "#fbbf24";
      } else if (total >= midVal) {
        mult = 1.3;
        msg = "+30% ATK • TACTICAL FAVOR 🛡️";
        color = "#38bdf8";
      } else if (total <= lowVal) {
        mult = 0.6;
        msg = "-40% ATK • ILL OMEN ⚠️";
        color = "#f87171";
      } else {
        mult = 1.1;
        msg = "+10% ATK • STEADY FORTUNE ⚖️";
        color = "#e2e8f0";
      }
      
      setDiceBonus(mult);
      setOmenMessage(msg);
      spawnText(msg, true, color);
    }, 340);
  };
`;

const playCardMarker = 'const playTacticalCard = (card) => {';
if (js.includes(playCardMarker) && !js.includes(rollDiceMarker) && !js.includes("const activeOmen =")) {
    js = js.replace(playCardMarker, rollOmenFunc + playCardMarker);
} else if (js.includes("const activeOmen =") || js.includes(rollDiceMarker)) {
    const pStart = js.indexOf("const activeOmen =") !== -1 ? js.indexOf("const activeOmen =") : js.indexOf(rollDiceMarker);
    const pEnd = js.indexOf(playCardMarker, pStart);
    if (pStart !== -1 && pEnd !== -1) {
        js = js.substring(0, pStart) + rollOmenFunc + js.substring(pEnd);
    }
}

// 3. UPDATE playAbility TO USE STORED OMEN + PASSIVE STATS
console.log("- Updating playAbility to use Omen and Dice Stats...");
const oldPlayAbilityDamage = "const isCrit = Math.random() < 0.25;      let dmg = ability.dmg;      if (isCrit) dmg = Math.floor(dmg * 1.5);";

const newPlayAbilityDamage = `
      const eqDice = (typeof ji === "function" ? ji(s) : (typeof rs !== "undefined" ? rs[0] : { bonusAttack: 0, bonusLuck: 0, critDamageBonus: 0 }));
      const dLuck = eqDice?.bonusLuck || 0;
      const dAtk = eqDice?.bonusAttack || 0;
      
      const isCrit = Math.random() < (0.25 + (dLuck / 100));
      let dmg = Math.round((ability.dmg + dAtk) * (diceBonus || 1.0));
      
      if (isCrit) {
        dmg = Math.floor(dmg * (1.5 + (eqDice?.critDamageBonus || 0)));
        if (typeof v !== 'undefined' && v.playCriticalHit) v.playCriticalHit();
      }
      
      // Clear omen after use
      if (diceBonus !== 1.0) {
        setDiceBonus(1.0);
        setOmenMessage("");
      }
`;

if (js.includes(oldPlayAbilityDamage)) {
    js = js.replace(oldPlayAbilityDamage, newPlayAbilityDamage);
}

// 4. UPDATE playTacticalCard TO USE STORED OMEN + PASSIVE STATS
console.log("- Updating playTacticalCard to use Omen and Dice Stats...");
const oldCardDmgLine = 'const dmg = rawDmg > 0 ? Math.round((rawDmg + bonusAtk) * talentDmgMult) : 0;';
const newCardDmgLine = `
    const playerDice = typeof ji === "function" ? ji(s) : (typeof rs !== "undefined" ? rs[0] : {bonusAttack: 0, bonusLuck: 0});
    const dAtk = playerDice?.bonusAttack || 0;
    const dLuck = playerDice?.bonusLuck || 0;
    
    let dmg = rawDmg > 0 ? Math.round((rawDmg + bonusAtk + dAtk) * talentDmgMult * (diceBonus || 1.0)) : 0;
    
    const critChance = ((card.critChance || 20) + dLuck) / 100;
    const isCritC = Math.random() < critChance;
    
    // Clear omen after use
    if (diceBonus !== 1.0) {
      setDiceBonus(1.0);
      setOmenMessage("");
    }
`;

if (js.includes(oldCardDmgLine)) {
    js = js.replace(oldCardDmgLine, newCardDmgLine);
}

// 5. INJECT "DIVINE OMEN" BUTTON INTO UI WITH MASTERWORK DIE
console.log("- Injecting Omen button with Masterwork Die into Tactical Hand...");
const handUIPattern = /children:\s*\[\s*\.\.\.displayedTacticalCards\.map\(\(card,\s*cardIdx\)\s*=>\s*\{/;
const omenButtonMarker = 'renderOmenDieIcon(activeOmenDieType';
const omenButtonJSX = 'e.jsxs("button", {' +
    '  type: "button",' +
    '  disabled: turnDiceRolled || isRollingDice || turn !== "player",' +
    '  onClick: rollTacticalDice,' +
    '  className: `snap-center shrink-0 flex flex-col items-center justify-center w-[88px] xs:w-[96px] sm:w-[108px] h-[70px] sm:h-[76px] p-1.5 rounded-xl border-2 border-amber-400/70 bg-gradient-to-b from-[#1c1917]/95 via-amber-950/40 to-black/98 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_12px_rgba(245,158,11,0.2)] ${turnDiceRolled ? "opacity-50 cursor-default" : "hover:border-amber-300 hover:scale-105 cursor-pointer active:scale-95"}`,' +
    '  children: [' +
    '    renderOmenDieIcon(activeOmenDieType, isRollingDice, turnDiceRolled, isRollingDice ? rollingDiceVals?.d1 : diceRoll?.d1, s, "md", false),' +
    '    e.jsx("span", { className: "text-[7.5px] sm:text-[8px] font-cinzel font-black text-amber-300 mt-1 text-center leading-none", children: turnDiceRolled ? (diceTotal >= Math.round(omenSides * 1.5) ? "+60% ATK" : diceTotal >= Math.round(omenSides * 1.1) ? "+30% ATK" : diceTotal <= Math.round(omenSides * 0.5) ? "-40% ATK" : "+10% ATK") : "DIVINE OMEN" }),' +
    '    e.jsx("span", { className: "text-[6px] font-mono text-amber-400/90 mt-0.5", children: turnDiceRolled ? `ROLL: ${diceTotal} (NEXT ATK)` : `ROLL ALEA (${activeOmenDieType})` })' +
    '  ]' +
    '}),';

const oldOmenButtonBlock = /e\.jsxs\("button",\s*\{\s*type:\s*"button",\s*disabled:\s*turnDiceRolled\s*\|\|\s*isRollingDice\s*\|\|\s*turn\s*!==\s*"player"[\s\S]*?renderOmenDieIcon\(activeOmenDieType[\s\S]*?\]\}\),/;
if (oldOmenButtonBlock.test(js)) {
    js = js.replace(oldOmenButtonBlock, omenButtonJSX);
} else if (handUIPattern.test(js) && !js.includes(omenButtonMarker)) {
    js = js.replace(handUIPattern, (match) => {
        const parts = match.split('children: [');
        return parts[0] + 'children: [' + omenButtonJSX + ' ' + parts[1];
    });
}

// 6. INJECT 3D MASTERWORK DICE ARENA TRAY & OVERLAY INTO JSX
console.log("- Injecting Masterwork 3D Tumbling Dice Arena Tray...");
const jsxAnchor = 'className:"absolute inset-0 w-full h-full z-0 overflow-hidden",children:[';
const diceJSX = 'e.jsx(ie.div, { ' +
    'id: "arena-3d-tumbling-dice-overlay", ' +
    'initial: { opacity: 0, scale: 0.8, y: 30 }, ' +
    'animate: { ' +
        'opacity: (isRollingDice || (diceTotal > 0 && turnDiceRolled)) ? 1 : 0, ' +
        'scale: isRollingDice ? 1.06 : 1, ' +
        'y: (isRollingDice || (diceTotal > 0 && turnDiceRolled)) ? 0 : 30 ' +
    '}, ' +
    'className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[135%] z-[60] flex flex-col items-center gap-3.5 pointer-events-none select-none", ' +
    'children: [ ' +
        // Masterwork Roman Tesserae Velvet Tray
        'e.jsxs("div", { ' +
            'className: "relative px-8 py-5 rounded-[2.5rem] bg-gradient-to-b from-[#1c1917]/95 via-[#0c0a09]/98 to-black border-2 border-amber-500/80 shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_2px_8px_rgba(255,255,255,0.2),0_0_30px_rgba(245,158,11,0.25)] flex flex-col items-center", ' +
            'children: [ ' +
                // Roman Laurel Garland Trim
                'e.jsxs("div", { className: "absolute -top-3 px-4 py-0.5 rounded-full bg-amber-950 border border-amber-400 text-[9px] font-cinzel font-black text-amber-300 uppercase tracking-widest shadow-md flex items-center gap-1.5", children: [ ' +
                    'e.jsx("span", { children: "🌿" }), ' +
                    'e.jsx("span", { children: typeof ji === "function" ? (ji(s)?.name || "ALEA IACTA EST") : "ALEA IACTA EST" }), ' +
                    'e.jsx("span", { children: "🌿" }) ' +
                '] }), ' +
                // Rolling 3D Dice Pair Container
                'e.jsxs("div", { className: "relative flex items-center gap-8 sm:gap-12 mt-1 mb-1", children: [ ' +
                    // Die 1 (Left) with Dynamic Number Cycling
                    'e.jsxs("div", { className: "relative flex flex-col items-center", children: [ ' +
                        'renderOmenDieIcon(activeOmenDieType, isRollingDice, turnDiceRolled, isRollingDice ? rollingDiceVals?.d1 : diceRoll?.d1, s, "xl", false), ' +
                        'e.jsx("div", { className: "w-14 h-3 rounded-full bg-black/75 blur-sm mt-2 transform-gpu animate-[bt_dice_shadow_tumble_0.85s_ease-out_forwards]" }) ' +
                    '] }), ' +
                    // Die 2 (Right) with Dynamic Number Cycling
                    'e.jsxs("div", { className: "relative flex flex-col items-center", children: [ ' +
                        'renderOmenDieIcon(activeOmenDieType, isRollingDice, turnDiceRolled, isRollingDice ? rollingDiceVals?.d2 : diceRoll?.d2, s, "xl", true), ' +
                        'e.jsx("div", { className: "w-14 h-3 rounded-full bg-black/75 blur-sm mt-2 transform-gpu animate-[bt_dice_shadow_tumble_0.85s_ease-out_forwards]" }) ' +
                    '] }) ' +
                '] }) ' +
            '] ' +
        '}), ' +
        // Outcome Blessing & Damage Modifer Banner
        '(!isRollingDice && diceTotal > 0) ? e.jsxs("div", { ' +
            'className: "px-5 py-3 rounded-2xl bg-black/95 border-2 border-amber-400/90 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.95),0_0_28px_rgba(245,158,11,0.4)] flex flex-col items-center text-center gap-1.5 min-w-[240px] max-w-[340px] animate-fade-in", ' +
            'children: [ ' +
                'e.jsxs("div", { className: "flex items-center gap-1.5", children: [' +
                    'e.jsx("span", { className: "text-amber-400 text-xs", children: "🏛️" }), ' +
                    'e.jsx("span", { className: "font-cinzel font-black text-[11px] sm:text-xs text-amber-300 tracking-widest uppercase drop-shadow", children: diceTotal >= Math.round(omenSides * 1.5) ? "DIVINE ADVANTAGE" : diceTotal >= Math.round(omenSides * 1.1) ? "TACTICAL FAVOR" : diceTotal <= Math.round(omenSides * 0.5) ? "ILL OMEN" : "STEADY FORTUNE" }), ' +
                    'e.jsx("span", { className: "text-amber-400 text-xs", children: "🏛️" }) ' +
                '] }), ' +
                'e.jsxs("div", { className: "flex items-center justify-center gap-2 bg-amber-950/80 px-4 py-1 rounded-full border border-amber-500/60 shadow-inner", children: [' +
                    'e.jsx("span", { className: "font-cinzel text-[10px] text-amber-200/90 font-bold", children: "TESSERAE ROLL:" }), ' +
                    'e.jsxs("span", { className: "font-mono text-sm sm:text-base font-black text-amber-300", children: [diceTotal, " (", diceRoll?.d1 || 1, "+", diceRoll?.d2 || 1, ")"] }) ' +
                '] }), ' +
                'e.jsx("div", { className: `text-[10.5px] sm:text-[11px] font-sans font-black leading-tight px-3 py-1.5 rounded-lg w-full ${diceTotal >= Math.round(omenSides * 1.5) ? "text-amber-200 bg-amber-900/80 border border-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.35)]" : diceTotal >= Math.round(omenSides * 1.1) ? "text-sky-200 bg-sky-950/80 border border-sky-500/70" : diceTotal <= Math.round(omenSides * 0.5) ? "text-rose-200 bg-rose-950/80 border border-rose-600/70" : "text-stone-200 bg-stone-900/80 border border-stone-700/70"}`, children: diceTotal >= Math.round(omenSides * 1.5) ? "+60% Damage to next attack this turn! ⚔️" : diceTotal >= Math.round(omenSides * 1.1) ? "+30% Damage to next attack this turn! 🛡️" : diceTotal <= Math.round(omenSides * 0.5) ? "-40% Reduced Damage on next attack! ⚠️" : "+10% Bonus Damage to next attack ⚖️" }), ' +
                'e.jsx("span", { className: "text-[8.5px] font-serif-body italic text-stone-300/95", children: diceTotal >= Math.round(omenSides * 1.5) ? "Jupiter smiles upon the eagles. Mars guides your strike." : diceTotal >= Math.round(omenSides * 1.1) ? "Minerva grants tactical clarity. Hostis defenses falter." : diceTotal <= Math.round(omenSides * 0.5) ? "Dark omens cloud the sky. Your next blow is glancing." : "The die is cast (Alea Iacta Est). Fortune holds steady." }) ' +
            '] ' +
        '}) : null ' +
    '] ' +
'}), ';

if (js.includes("id: \"arena-3d-tumbling-dice-overlay\"")) {
    const pDStart = js.indexOf("id: \"arena-3d-tumbling-dice-overlay\"");
    const pDBox = js.lastIndexOf("e.jsx(ie.div", pDStart);
    const pDEnd = js.indexOf("] }), ", pDStart);
    if (pDBox !== -1 && pDEnd !== -1) {
        js = js.substring(0, pDBox) + diceJSX + js.substring(pDEnd + 6);
    }
} else if (js.includes(jsxAnchor)) {
    js = js.replace(jsxAnchor, jsxAnchor + diceJSX);
}

// 7. INJECT COMBAT VICTORY ALEA LOOT DROP ROLL & CELEBRATION CARD
console.log("- Injecting Combat Victory Alea Loot Drops & Spolia Card...");
const apState = 'const [actionPoints, setActionPoints] = b.useState(3);';
const aleaDropLogic = `
  b.useEffect(() => {
    if (turn === "victory" && typeof s !== "undefined" && typeof setGameState === "function") {
      // 40% chance on victory (or 100% if player only has starter die) to discover and unlock a new Roman Alea set
      const curUnlocked = s.unlockedDice || ["dice_bone"];
      const unownedDice = typeof rs !== "undefined" ? rs.filter(d => !curUnlocked.includes(d.id)) : [];
      if (unownedDice.length > 0 && (curUnlocked.length === 1 || Math.random() < 0.40)) {
        const lootedDie = unownedDice[Math.floor(Math.random() * unownedDice.length)];
        setLootedDieData(lootedDie);
        setGameState(prev => {
          const cur = prev?.unlockedDice || ["dice_bone"];
          if (cur.includes(lootedDie.id)) return prev;
          return {
            ...prev,
            unlockedDice: [...cur, lootedDie.id]
          };
        });
        if (typeof spawnText === "function") {
          spawnText("🎲 NEW ALEA DISCOVERED: " + lootedDie.name + "!", true, "#fbbf24");
        }
      }
    }
  }, [turn]);
`;

if (!js.includes("setLootedDieData(lootedDie)") && js.includes(apState)) {
    js = js.replace(apState, apState + aleaDropLogic);
}

// 8. INJECT LOOTED ALEA CARD INTO COMBAT VICTORY SCREEN
console.log("- Injecting Looted Alea Card into Victory Spoils UI...");
const spoilsHeader = 'e.jsx("span", { className: "text-[10px] font-cinzel font-black text-[#C9A351] tracking-widest uppercase", children: "SPOLIA BELLI (WAR SPOILS)" })';
const lootedAleaCardJSX = `
            lootedDieData ? e.jsxs("div", {
              className: "w-full mb-3 p-3 rounded-2xl bg-gradient-to-r from-amber-950/80 via-black/90 to-amber-950/80 border-2 border-amber-400 shadow-[0_8px_24px_rgba(245,158,11,0.35)] flex items-center gap-3.5 animate-bounce-subtle",
              children: [
                e.jsxs("div", {
                  className: "relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 border-amber-400 shadow-md",
                  style: { background: lootedDieData.textureGradient || "linear-gradient(135deg, #fef08a 0%, #eab308 100%)" },
                  children: [
                    e.jsx("span", { className: "font-cinzel font-black text-sm text-stone-950 leading-none", children: "VI" }),
                    e.jsx("div", { className: "absolute -top-1 -right-1 px-1 bg-amber-400 text-stone-950 font-black text-[7px] rounded-full uppercase", children: lootedDieData.rarity || "RARE" })
                  ]
                }),
                e.jsxs("div", {
                  className: "min-w-0 flex-1 text-left",
                  children: [
                    e.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      e.jsx("span", { className: "text-[9px] font-cinzel font-black text-amber-300 uppercase tracking-wider", children: "🎲 RARE TESSERAE DISCOVERED!" }),
                      e.jsx("span", { className: "text-[8px] font-mono text-amber-400/80", children: "[" + (lootedDieData.latinName || lootedDieData.name) + "]" })
                    ]}),
                    e.jsx("div", { className: "text-[11px] font-cinzel font-black text-stone-100 truncate", children: lootedDieData.name }),
                    e.jsx("div", { className: "text-[8.5px] font-sans text-amber-200/90 leading-tight mt-0.5", children: lootedDieData.specialPerk || lootedDieData.description })
                  ]
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => {
                    if (typeof setGameState === "function") {
                      setGameState(p => ({ ...p, equippedDiceId: lootedDieData.id }));
                      if (typeof spawnText === "function") spawnText("EQUIPPED: " + lootedDieData.name, true, "#38bdf8");
                    }
                  },
                  className: "px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-cinzel font-black text-[9px] uppercase tracking-wider shadow shrink-0 cursor-pointer transition-all",
                  children: "EQUIP ALEA"
                })
              ]
            }) : null,
`;

if (js.includes(spoilsHeader) && !js.includes("🎲 RARE TESSERAE DISCOVERED!")) {
    js = js.replace(spoilsHeader, spoilsHeader + "," + lootedAleaCardJSX);
}

// 9. RESET STATES ON TURN END
console.log("- Setting up state resets on endTurn...");
const endTurnMarker = 'const endTurn = () => {';
const resetMarker = 'setTurnDiceRolled(false);';
const resetStates = 'setTurnDiceRolled(false); setDiceBonus(1.0); setOmenMessage(""); setDiceTotal(0);';
if (js.includes(endTurnMarker) && !js.includes(resetMarker)) {
    js = js.replace(endTurnMarker, endTurnMarker + resetStates);
}

console.log("Validating updated bundle with esbuild...");
try {
    esbuild.transformSync(js, { loader: "jsx" });
    fs.writeFileSync(bundlePath, js, "utf8");

    const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
    if (fs.existsSync(path.dirname(distPath))) {
      fs.writeFileSync(distPath, js, "utf8");
    }
    console.log("SUCCESS: apply_dice_integration.cjs applied refined masterwork dice animations and drop mechanics.");
} catch (e) {
    console.error("ERR: esbuild validation failed:", e.message);
    process.exit(1);
}
