const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING DICE MECHANICS INTEGRATION (HARUSPEX OMEN) ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. INJECT DICE STATES INTO COMBAT CONTROLLER
// Find where playerHp is initialized as a landmark
const stateLandmark = 'const [playerHp, setPlayerHp] = b.useState(';
const diceStates = 'const [diceBonus, setDiceBonus] = b.useState(1.0);' +
    'const [turnDiceRolled, setTurnDiceRolled] = b.useState(false);' +
    'const [omenMessage, setOmenMessage] = b.useState("");';

if (js.includes(stateLandmark)) {
    js = js.replace(stateLandmark, diceStates + stateLandmark);
    
}

// 2. ADD rollTacticalDice FUNCTION
// This will be called by the new UI button
const rollOmenFunc = `
  const rollTacticalDice = () => {
    if (turnDiceRolled || isRollingDice || turn !== "player") return;
    setIsRollingDice(true);
    setTurnDiceRolled(true);
    if (typeof v !== "undefined" && v.playDiceRoll) v.playDiceRoll();
    
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const total = d1 + d2;
      setDiceRoll({ d1, d2 });
      setDiceTotal(total);
      setIsRollingDice(false);
      if (typeof v !== "undefined" && v.playDiceLand) v.playDiceLand();
      
      let mult = 1.0;
      let msg = "";
      let color = "#F3E7C8";
      
      if (total >= 10) {
        mult = 1.5;
        msg = "DIVINE ADVANTAGE! ⚔️";
        color = "#fbbf24";
      } else if (total >= 7) {
        mult = 1.2;
        msg = "TACTICAL OMEN 🛡️";
        color = "#38bdf8";
      } else if (total <= 3) {
        mult = 0.7;
        msg = "ILL OMEN... ⚠️";
        color = "#f87171";
      } else {
        mult = 1.1;
        msg = "ALEA IACTA EST";
      }
      
      setDiceBonus(mult);
      setOmenMessage(msg);
      spawnText(msg, true, color);
    }, 1000);
  };
`;

const playCardMarker = 'const playTacticalCard = (card) => {';
if (js.includes(playCardMarker)) {
    js = js.replace(playCardMarker, rollOmenFunc + playCardMarker);
    
}

// 3. APPLY DICE BONUSES TO playTacticalCard
// We'll update the dmg calculation to use diceBonus and equipment stats.
const oldDmgCalc = 'const dmg = rawDmg > 0 ? Math.round((rawDmg + bonusAtk) * talentDmgMult) : 0;';
const newDmgCalc = 'const playerDice = typeof ji === "function" ? ji(s) : (typeof rs !== "undefined" ? rs[0] : {bonusAttack: 0, bonusLuck: 0});' +
    'const dAtk = playerDice?.bonusAttack || 0;' +
    'const dLuck = playerDice?.bonusLuck || 0;' +
    'const dmg = rawDmg > 0 ? Math.round((rawDmg + bonusAtk + dAtk) * talentDmgMult * (diceBonus || 1.0)) : 0;' +
    'if(diceBonus !== 1.0) setDiceBonus(1.0);' +
    'if(omenMessage) setOmenMessage("");';

if (js.includes(oldDmgCalc)) {
    js = js.replace(oldDmgCalc, newDmgCalc);
    
}

// Update crit chance
const oldCrit = 'const isCrit = Math.random() < critChance;';
const newCrit = 'const isCrit = Math.random() < (critChance + (typeof dLuck !== "undefined" ? dLuck / 100 : 0));';
if (js.includes(oldCrit)) {
    js = js.replace(oldCrit, newCrit);
    
}

// 4. INJECT "DIVINE OMEN" BUTTON INTO UI
// We'll put it in renderTacticalHandUI, before the cards mapping.
const handUIStart = 'children: [            ...displayedTacticalCards.map((card, cardIdx) => {';
const omenButtonJSX = 'e.jsxs("button", {' +
    '  type: "button",' +
    '  disabled: turnDiceRolled || isRollingDice || turn !== "player",' +
    '  onClick: rollTacticalDice,' +
    '  className: `snap-center shrink-0 flex flex-col items-center justify-center w-[84px] xs:w-[92px] sm:w-[104px] h-[68px] sm:h-[74px] p-1.5 rounded-xl border border-amber-500/50 bg-gradient-to-b from-[#1c1917]/95 to-black/98 transition-all ${turnDiceRolled ? "opacity-50 cursor-default" : "hover:border-amber-300 hover:scale-105 shadow-lg cursor-pointer active:scale-95"}`,' +
    '  children: [' +
    '    e.jsx(rt, { variant: "gold", emblem: "spqr", size: 24, className: isRollingDice ? "animate-spin" : "" }),' +
    '    e.jsx("span", { className: "text-[7.5px] sm:text-[8px] font-cinzel font-black text-amber-300 mt-1", children: turnDiceRolled ? (diceTotal + " OMEN") : "DIVINE OMEN" }),' +
    '    e.jsx("span", { className: "text-[6px] font-mono text-amber-500/80", children: turnDiceRolled ? "FATE SEALED" : "ROLL ALEA (0 AP)" })' +
    '  ]' +
    '}),';

if (js.includes(handUIStart)) {
    js = js.replace(handUIStart, 'children: [' + omenButtonJSX + ' ...displayedTacticalCards.map((card, cardIdx) => {');
    
}

// 5. RESET STATES ON TURN END
const endTurnMarker = 'const endTurn = () => {';
const resetStates = 'setTurnDiceRolled(false); setDiceBonus(1.0); setOmenMessage(""); setDiceTotal(0);';
if (js.includes(endTurnMarker)) {
    js = js.replace(endTurnMarker, endTurnMarker + resetStates);
    
}

console.log("Validating updated bundle with esbuild...");
try {
    esbuild.transformSync(js, { loader: "jsx" });
    
    fs.writeFileSync(bundlePath, js, "utf8");
} catch (e) {
    console.error("ERR: esbuild validation failed:", e.message);
}

console.log("=== OMEN INTEGRATION COMPLETE ===");
