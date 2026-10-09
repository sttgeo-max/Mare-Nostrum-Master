const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING CODEX & BESTIARY REFLECTIONS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Helper replacement with validation
function replaceUnique(str, target, replacement, label) {
  const idx = str.indexOf(target);
  if (idx === -1) {
    console.error(`ERROR: target for [${label}] not found!`);
    return str;
  }
  const secondIdx = str.indexOf(target, idx + target.length);
  if (secondIdx !== -1) {
    console.warn(`WARNING: target for [${label}] is not unique (found at ${idx} and ${secondIdx}). Replacing first occurrence.`);
  }
  console.log(`- Successfully replaced [${label}] at position ${idx}`);
  return str.substring(0, idx) + replacement + str.substring(idx + target.length);
}

// 1. UPDATE HELPER `la` TO INCLUDE SPECIAL ABILITY & BALANCED COMBAT BONUSES IN STAT BADGES
const targetLa = "la=t=>{if(!t)return[];const s=[];return t.bonusAttack&&s.push(`${t.bonusAttack>0?\"+\":\"\"}${t.bonusAttack} ATK\"),t.bonusDefense&&s.push(`${t.bonusDefense>0?\"+\":\"\"}${t.bonusDefense} DEF\"),t.bonusRoll&&s.push(`${t.bonusRoll>0?\"+\":\"\"}${t.bonusRoll} LUCK\"),t.addDice&&s.push(`+${t.addDice} D6 DICE\`),t.specialAttackBonus&&s.push(`+${t.specialAttackBonus}% TRIGGERS\`),t.forgeTier&&s.push(`FORGE TIER ${t.forgeTier}\`),t.setId&&s.push(\"SET ITEM\"),t.artifactLuck&&s.push(`+${t.artifactLuck}% Drop Rate\`),t.supplyDrain&&s.push(`-${t.supplyDrain} Supplies/Turn\`),t.lifeDrain&&s.push(`-${t.lifeDrain} HP/Turn\`),t.solidiDrain&&s.push(`-${t.solidiDrain} Solidi/Battle\`),t.famaPenalty&&s.push(`-${t.famaPenalty}% Fama\`),t.statusEffect&&s.push(`${t.statusEffect.toUpperCase()} (${t.statusChance}%)\`),t.ignoreArmorChance&&s.push(`+${t.ignoreArmorChance}% Pierce\`),t.lifestealPercent&&s.push(`+${t.lifestealPercent}% Lifesteal\`),t.critChance&&s.push(`+${t.critChance}% Crit\`),t.critChanceBonus&&s.push(`+${t.critChanceBonus}% Crit\`),t.critMultiplier&&s.push(`${t.critMultiplier}x Crit DMG\`),t.critMultiplierBonus&&s.push(`${t.critMultiplierBonus}x Crit DMG\`),t.supplyConservation&&s.push(`${t.supplyConservation}% Supply Save\`),t.solidiBonusPercent&&s.push(`+${t.solidiBonusPercent}% Solidi\`),t.famaBonusPercent&&s.push(`+${t.famaBonusPercent}% Fama\`),t.secondWind&&s.push(\"Second Wind\"),s},";

const newLa = `la=t=>{if(!t)return[];const s=[];return t.bonusAttack&&s.push(\`\${t.bonusAttack>0?"+":""}\${t.bonusAttack} ATK\`),t.bonusDefense&&s.push(\`\${t.bonusDefense>0?"+":""}\${t.bonusDefense} DEF\`),t.bonusRoll&&s.push(\`\${t.bonusRoll>0?"+":""}\${t.bonusRoll} LUCK\`),t.critChance&&s.push(\`+\${t.critChance}% CRIT\`),t.specialAbility&&s.push(\`✧ \${t.specialAbility.name} (\${t.specialAbility.effectType} \${t.specialAbility.value})\`),t.addDice&&s.push(\`+\${t.addDice} D6 DICE\`),t.specialAttackBonus&&s.push(\`+\${t.specialAttackBonus}% TRIGGERS\`),t.forgeTier&&s.push(\`FORGE TIER \${t.forgeTier}\`),t.setId&&s.push("SET ITEM"),t.artifactLuck&&s.push(\`+\${t.artifactLuck}% Drop Rate\`),t.supplyDrain&&s.push(\`-\${t.supplyDrain} Supplies/Turn\`),t.lifeDrain&&s.push(\`-\${t.lifeDrain} HP/Turn\`),t.solidiDrain&&s.push(\`-\${t.solidiDrain} Solidi/Battle\`),t.famaPenalty&&s.push(\`-\${t.famaPenalty}% Fama\`),t.statusEffect&&s.push(\`\${t.statusEffect.toUpperCase()} (\${t.statusChance}%)\`),t.ignoreArmorChance&&s.push(\`+\${t.ignoreArmorChance}% Pierce\`),t.lifestealPercent&&s.push(\`+\${t.lifestealPercent}% Lifesteal\`),t.critMultiplier&&s.push(\`\${t.critMultiplier}x Crit DMG\`),t.supplyConservation&&s.push(\`\${t.supplyConservation}% Supply Save\`),t.solidiBonusPercent&&s.push(\`+\${t.solidiBonusPercent}% Solidi\`),t.famaBonusPercent&&s.push(\`+\${t.famaBonusPercent}% Fama\`),t.secondWind&&s.push("Second Wind"),s},`;

bundle = replaceUnique(bundle, targetLa, newLa, "Enhanced la artifact badges helper");

// 2. ENHANCE BESTIARIVM CARD TOPDOWN MODEL TO RESOLVE ALL BEASTS & MONSTERS DIRECTLY
const targetCardTopDown = `topDownModel:W.domain==="sea"?((W.id&&(W.id.includes("kraken")||W.id.includes("leviathan")||W.id.includes("cetus")||W.id.includes("serpent")||W.id.includes("scylla")||W.id.includes("charybdis")))||(W.name&&(W.name.toLowerCase().includes("kraken")||W.name.toLowerCase().includes("leviathan")||W.name.toLowerCase().includes("cetus")||W.name.toLowerCase().includes("serpent"))))?"kraken":"ship":"legion",topDownFaction:W.faction||((W.usurperKey==="maxentius"||(W.id&&(W.id.includes("maxentian")||W.id.includes("rebel")||W.id.includes("licinian")||W.id.includes("gallica"))))?"rebel":(W.id&&(W.id.includes("roman")||W.id.includes("praetorian")||W.id.includes("centurion")))?"roman":W.domain==="sea"?"pirate":"punic"),topDownShipModelType:W.shipModelType||W.id,`;

const newCardTopDown = `topDownModel:(() => {
  const n = ((W.id || "") + " " + (W.name || "") + " " + (W.icon || "")).toLowerCase();
  if (n.includes("kraken") || n.includes("leviathan") || n.includes("cetus") || n.includes("serpent") || n.includes("scylla") || n.includes("charybdis")) return "kraken";
  if (n.includes("minotaur") || n.includes("colossus") || n.includes("titan")) return "minotaur";
  if (n.includes("medusa") || n.includes("gorgon")) return "medusa";
  if (n.includes("cerberus") || n.includes("hellhound")) return "cerberus";
  if (n.includes("elephant")) return "elephant";
  if (n.includes("wolf") || n.includes("lupus")) return "wolf";
  if (n.includes("lion") || n.includes("leo")) return "lion";
  if (n.includes("boar") || n.includes("aper")) return "boar";
  if (n.includes("bear") || n.includes("ursus")) return "bear";
  if (n.includes("scorpion")) return "scorpion";
  if (n.includes("siren")) return "siren";
  if (n.includes("poseidon") || n.includes("neptune") || n.includes("triton")) return "poseidon";
  return W.domain === "sea" ? "ship" : "legion";
})(),topDownFaction:W.faction||((W.usurperKey==="maxentius"||(W.id&&(W.id.includes("maxentian")||W.id.includes("rebel")||W.id.includes("licinian")||W.id.includes("gallica"))))?"rebel":(W.id&&(W.id.includes("roman")||W.id.includes("praetorian")||W.id.includes("centurion")))?"roman":W.domain==="sea"?"pirate":"punic"),topDownShipModelType:W.shipModelType||W.id,`;

bundle = replaceUnique(bundle, targetCardTopDown, newCardTopDown, "Bestiarivm card topDownModel resolver");

// 3. ENHANCE BESTIARIVM DETAIL MODAL TOPDOWN MODEL
const targetModalTopDown = `topDownModel:se.domain==="sea"?((se.id&&(se.id.includes("kraken")||se.id.includes("leviathan")||se.id.includes("cetus")||se.id.includes("serpent")||se.id.includes("scylla")||se.id.includes("charybdis")))||(se.name&&(se.name.toLowerCase().includes("kraken")||se.name.toLowerCase().includes("leviathan")||se.name.toLowerCase().includes("cetus")||se.name.toLowerCase().includes("serpent"))))?"kraken":"ship":"legion",topDownFaction:se.faction||((se.usurperKey==="maxentius"||(se.id&&(se.id.includes("maxentian")||se.id.includes("rebel")||se.id.includes("licinian")||se.id.includes("gallica"))))?"rebel":(se.id&&(se.id.includes("roman")||se.id.includes("praetorian")||se.id.includes("centurion")))?"roman":se.domain==="sea"?"pirate":"punic"),topDownShipModelType:se.shipModelType||se.id,`;

const newModalTopDown = `topDownModel:(() => {
  const n = ((se.id || "") + " " + (se.name || "") + " " + (se.icon || "")).toLowerCase();
  if (n.includes("kraken") || n.includes("leviathan") || n.includes("cetus") || n.includes("serpent") || n.includes("scylla") || n.includes("charybdis")) return "kraken";
  if (n.includes("minotaur") || n.includes("colossus") || n.includes("titan")) return "minotaur";
  if (n.includes("medusa") || n.includes("gorgon")) return "medusa";
  if (n.includes("cerberus") || n.includes("hellhound")) return "cerberus";
  if (n.includes("elephant")) return "elephant";
  if (n.includes("wolf") || n.includes("lupus")) return "wolf";
  if (n.includes("lion") || n.includes("leo")) return "lion";
  if (n.includes("boar") || n.includes("aper")) return "boar";
  if (n.includes("bear") || n.includes("ursus")) return "bear";
  if (n.includes("scorpion")) return "scorpion";
  if (n.includes("siren")) return "siren";
  if (n.includes("poseidon") || n.includes("neptune") || n.includes("triton")) return "poseidon";
  return se.domain === "sea" ? "ship" : "legion";
})(),topDownFaction:se.faction||((se.usurperKey==="maxentius"||(se.id&&(se.id.includes("maxentian")||se.id.includes("rebel")||se.id.includes("licinian")||se.id.includes("gallica"))))?"rebel":(se.id&&(se.id.includes("roman")||se.id.includes("praetorian")||se.id.includes("centurion")))?"roman":se.domain==="sea"?"pirate":"punic"),topDownShipModelType:se.shipModelType||se.id,`;

bundle = replaceUnique(bundle, targetModalTopDown, newModalTopDown, "Bestiarivm modal topDownModel resolver");

// 4. ENHANCE STATS & SPECIAL ABILITY DISPLAY IN BESTIARIVM DETAIL MODAL
const targetModalStatsBlock = `e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-center text-xs font-cinzel font-bold",children:[e.jsxs("div",{className:"p-2 bg-black/50 border border-[#b8860b]/40 rounded-xl flex flex-col items-center gap-1",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx(gn,{active:!0,colorType:"red",size:"md"}),e.jsx("span",{className:"text-[8.5px] text-[#d4af37] uppercase",children:"HP"})]}),e.jsx("span",{className:"text-sm font-black text-[#d4af37]",children:se.maxHp})]}),e.jsxs("div",{className:"p-2 bg-black/50 border border-amber-800 rounded-xl flex flex-col items-center gap-1",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx(gn,{active:!0,colorType:"gold",size:"md"}),e.jsx("span",{className:"text-[8.5px] text-amber-300/80 uppercase",children:"FAMA"})]}),e.jsxs("span",{className:"text-sm font-black text-[#F3E7C8]",children:["+",se.rewardFama]})]})]}),e.jsxs("div",{className:"p-2.5 bg-black/50 border border-[#b8860b]/40 rounded-xl flex flex-col sm:flex-row items-center justify-between text-[10.5px] font-cinzel gap-1",children:[e.jsxs("span",{className:"text-[#d4af37] flex items-center gap-1",children:[e.jsx(Yt,{className:"w-3.5 h-3.5 text-amber-300"})," BOUNTY: +",se.rewardSolidi," SOLIDI / +",se.rewardSupplies," SUPPLIES"]}),e.jsxs("span",{className:"text-amber-300 font-bold",children:["STANCE: ",se.attack>4?"PRUDENTIA (DEF)":"AUDACIA (ATK)"]})]})`;

const newModalStatsBlock = `e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-cinzel font-bold",children:[
  e.jsxs("div",{className:"p-2 bg-black/50 border border-red-900/60 rounded-xl flex flex-col items-center gap-0.5",children:[
    e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(gn,{active:!0,colorType:"red",size:"sm"}),e.jsx("span",{className:"text-[8px] text-red-300 uppercase",children:"MAX HP"})]}),
    e.jsx("span",{className:"text-sm font-black text-red-200",children:se.maxHp})
  ]}),
  e.jsxs("div",{className:"p-2 bg-black/50 border border-amber-900/60 rounded-xl flex flex-col items-center gap-0.5",children:[
    e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(gn,{active:!0,colorType:"gold",size:"sm"}),e.jsx("span",{className:"text-[8px] text-amber-300 uppercase",children:"ATTACK"})]}),
    e.jsx("span",{className:"text-sm font-black text-amber-200",children:se.attack || 12})
  ]}),
  e.jsxs("div",{className:"p-2 bg-black/50 border border-blue-900/60 rounded-xl flex flex-col items-center gap-0.5",children:[
    e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(gn,{active:!0,colorType:"blue",size:"sm"}),e.jsx("span",{className:"text-[8px] text-blue-300 uppercase",children:"ARMOR"})]}),
    e.jsx("span",{className:"text-sm font-black text-blue-200",children:se.defense || 4})
  ]}),
  e.jsxs("div",{className:"p-2 bg-black/50 border border-emerald-900/60 rounded-xl flex flex-col items-center gap-0.5",children:[
    e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(gn,{active:!0,colorType:"green",size:"sm"}),e.jsx("span",{className:"text-[8px] text-emerald-300 uppercase",children:"FAMA"})]}),
    e.jsxs("span",{className:"text-sm font-black text-emerald-200",children:["+",se.rewardFama]})
  ]})
]}),
se.specialAbility && e.jsxs("div",{className:"p-3 bg-gradient-to-br from-red-950/60 to-black/80 rounded-xl border border-red-500/40 shadow-inner space-y-1.5",children:[
  e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[
    e.jsxs("span",{className:"text-[10px] font-black font-cinzel text-amber-300 flex items-center gap-1.5 uppercase tracking-wider",children:[
      "⚡ SPECIAL ACTION: ", se.specialAbility.name
    ]}),
    e.jsxs("span",{className:"text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-red-900/80 text-red-200 border border-red-700",children:[
      se.specialAbility.type, " (", Math.round((se.specialAbility.multiplier || 1.6) * 100), "%)"
    ]})
  ]}),
  se.specialAbility.latinName && e.jsx("p",{className:"text-[9.5px] font-serif-body italic text-red-300/80",children:se.specialAbility.latinName}),
  e.jsx("p",{className:"text-[11px] font-serif-body text-stone-200 leading-relaxed",children:se.specialAbility.description})
]}),
e.jsxs("div",{className:"p-2.5 bg-black/50 border border-[#b8860b]/40 rounded-xl flex flex-col sm:flex-row items-center justify-between text-[10.5px] font-cinzel gap-1",children:[
  e.jsxs("span",{className:"text-[#d4af37] flex items-center gap-1",children:[e.jsx(Yt,{className:"w-3.5 h-3.5 text-amber-300"})," BOUNTY: +",se.rewardSolidi," SOLIDI / +",se.rewardSupplies," SUPPLIES"]}),
  e.jsxs("span",{className:"text-amber-300 font-bold",children:["THREAT TIER: ",se.isBoss ? "IMPERIAL BOSS" : se.level >= 5 ? "VETERAN THREAT" : "STANDARD CORSAIR"]})
]})`;

bundle = replaceUnique(bundle, targetModalStatsBlock, newModalStatsBlock, "Bestiarivm modal stats and special ability display");

// 5. UPDATE FULL ART FRESCO MODAL STATS TO PASS ATTACK, DEFENSE, AND SPECIAL ABILITY
const targetFullArtStats = `stats:[{label:"Max HP",value:se.maxHp,color:"text-[#d4af37] border-[#b8860b]/40"},{label:"Fama Reward",value:\`+\${se.rewardFama}\`,color:"text-amber-300 border-amber-800"}]`;

const newFullArtStats = `stats:[{label:"Max HP",value:se.maxHp,color:"text-red-400 border-red-800"},{label:"Attack",value:se.attack||12,color:"text-amber-300 border-amber-800"},{label:"Defense",value:se.defense||4,color:"text-blue-300 border-blue-800"},{label:"Fama Reward",value:\`+\${se.rewardFama}\`,color:"text-emerald-300 border-emerald-800"}]`;

bundle = replaceUnique(bundle, targetFullArtStats, newFullArtStats, "Full Art Fresco modal stats expansion");

// 6. VALIDATE WITH ESBUILD AND WRITE TO FILES
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, "utf8");
  console.log("SUCCESS: public/assets/index-V33.js validated and updated.");

  const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, "utf8");
    console.log("SUCCESS: dist/assets/index-V33.js synced.");
  }
} catch (e) {
  console.error("ERR: esbuild failed on bundle overhaul:", e.message);
  process.exit(1);
}
