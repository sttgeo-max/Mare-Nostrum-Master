const fs = require("fs");
const path = require("path");

let v33Script = fs.readFileSync(path.join(__dirname, "build_clean_v33.cjs"), "utf8");

// Load the 21 SVGs we generated
const masterSvgCode = fs.readFileSync(path.join(__dirname, "master_svg_catalog.cjs"), "utf8");
const svgStart = masterSvgCode.indexOf("const masterShipAndLegionDefs = {");
const svgEnd = masterSvgCode.lastIndexOf("};");
const svgsObjectBody = masterSvgCode.slice(svgStart + "const masterShipAndLegionDefs = {".length, svgEnd).trim();

// 1. Where Ze is extended in build script:
const zeMarker = "Object.assign(Ze, {";
const zeIdx = v33Script.indexOf(zeMarker);
if (zeIdx === -1) {
  throw new Error("Cannot find Object.assign(Ze in v33Script");
}

// In v33Script, inject masterShipAndLegionSVGs right into Object.assign(Ze, { ... })
const newZeAssign = `Object.assign(Ze, {
${svgsObjectBody},
`;
v33Script = v33Script.replace(zeMarker, newZeAssign);

// 2. Update targetName resolution in rt to handle unique ships and legions:
const oldTargetMarker = `    // Sea Monsters & Beasts`;
const newTargetLogic = `    // Acquirable Warships (11 Unique Ship Classes)
    if (allStr.includes("liburna_minor") || allStr.includes("liburnian skiff")) return "ship_liburna_minor";
    if (allStr.includes("liburna_bellica") || allStr.includes("liburnian galley")) return "ship_liburna_bellica";
    if (allStr.includes("trireme_cataphracta") || allStr.includes("heavy trireme")) return "ship_trireme_cataphracta";
    if (allStr.includes("trireme_imperialis") || (allStr.includes("trireme") && !allStr.includes("heavy") && !allStr.includes("cataphract"))) return "ship_trireme_imperialis";
    if (allStr.includes("quadrireme_praetoriana") || allStr.includes("heavy quadrireme")) return "ship_quadrireme_praetoriana";
    if (allStr.includes("quadrireme_augusta") || (allStr.includes("quadrireme") && !allStr.includes("heavy") && !allStr.includes("praetor"))) return "ship_quadrireme_augusta";
    if (allStr.includes("quinquereme_constantinia") || allStr.includes("imperial quinquereme")) return "ship_quinquereme_constantinia";
    if (allStr.includes("quinquereme_victoria") || allStr.includes("quinquereme") || allStr.includes("penteres")) return "ship_quinquereme_victoria";
    if (allStr.includes("dromon_ignifer") || allStr.includes("dromon") || allStr.includes("fire dromon") || allStr.includes("ignifer")) return "ship_dromon_ignifer";
    if (allStr.includes("hexareme_imperatoris") || allStr.includes("hexareme") || allStr.includes("hexeres")) return "ship_hexareme_imperatoris";
    if (allStr.includes("deceres_ptolemaica") || allStr.includes("deceres") || allStr.includes("alexandrian deceres")) return "ship_deceres_ptolemaica";

    // Acquirable Land Legions & Cohorts (10 Unique Legion Classes)
    if (allStr.includes("legion_velites") || allStr.includes("velites") || allStr.includes("tironum") || allStr.includes("skirmishers")) return "legion_velites";
    if (allStr.includes("legion_hastati") || allStr.includes("hastati") || allStr.includes("limitanea")) return "legion_hastati";
    if (allStr.includes("legion_principes") || allStr.includes("principes") || allStr.includes("veteranorum")) return "legion_principes";
    if (allStr.includes("legion_triarii") || allStr.includes("triarii") || allStr.includes("martiorum")) return "legion_triarii";
    if (allStr.includes("legion_cohort") || allStr.includes("primigenia") || (allStr.includes("cohort") && !allStr.includes("praetor") && !allStr.includes("tiron"))) return "legion_cohort";
    if (allStr.includes("legion_equites") || allStr.includes("equites") || allStr.includes("equitum") || allStr.includes("shock cavalry")) return "legion_equites";
    if (allStr.includes("legion_cataphract") || allStr.includes("clibanarii") || allStr.includes("cataphract")) return "legion_cataphract";
    if (allStr.includes("legion_praetorian") || allStr.includes("praetorian") || allStr.includes("praetoria")) return "legion_praetorian";
    if (allStr.includes("legion_palatinae") || allStr.includes("palatinae") || allStr.includes("scholae")) return "legion_palatinae";
    if (allStr.includes("legion_invicta") || allStr.includes("divina") || allStr.includes("triumphatrix") || allStr.includes("sacrum imperium")) return "legion_invicta";

    // Dynamic Level-Up Resolution for Player & Roman forces
    if (m === "player" || (d === "ship" && m === "roman") || (d === "legion" && m === "roman")) {
      const plvl = y || 1;
      if (d === "ship" || (!d && (allStr.includes("ship") || allStr.includes("fleet") || allStr.includes("sea")))) {
        if (plvl >= 10) return "ship_deceres_ptolemaica";
        if (plvl >= 9) return "ship_hexareme_imperatoris";
        if (plvl >= 8) return "ship_quinquereme_constantinia";
        if (plvl >= 7) return "ship_quinquereme_victoria";
        if (plvl >= 6) return "ship_quadrireme_praetoriana";
        if (plvl >= 5) return "ship_quadrireme_augusta";
        if (plvl >= 4) return "ship_trireme_cataphracta";
        if (plvl >= 3) return "ship_trireme_imperialis";
        if (plvl >= 2) return "ship_liburna_bellica";
        return "ship_liburna_minor";
      }
      if (d === "legion" || (!d && (allStr.includes("legion") || allStr.includes("land") || allStr.includes("army") || allStr.includes("cohort")))) {
        if (plvl >= 10) return "legion_invicta";
        if (plvl >= 9) return "legion_palatinae";
        if (plvl >= 8) return "legion_praetorian";
        if (plvl >= 7) return "legion_cataphract";
        if (plvl >= 6) return "legion_equites";
        if (plvl >= 5) return "legion_cohort";
        if (plvl >= 4) return "legion_triarii";
        if (plvl >= 3) return "legion_principes";
        if (plvl >= 2) return "legion_hastati";
        return "legion_velites";
      }
    }

    // Sea Monsters & Beasts`;

v33Script = v33Script.replace(oldTargetMarker, newTargetLogic);

// 3. Update Header comment & log
v33Script = v33Script.replace(
  "=== ENFORCING MASTER MEDALLION, COMMODITY, AUGURY & ARCHITECTURAL SYSTEM (V33) ===",
  "=== ENFORCING DYNAMIC SHIP & LEGION MASTERWORK MEDALLION PROGRESSION & CATALOGUS (V34) ==="
);

// 4. Update index paths to V34
v33Script = v33Script.replace(/index-V33\.js/g, "index-V34.js");
v33Script = v33Script.replace(/V33_\${timestamp}/g, "V34_${timestamp}");
v33Script = v33Script.replace(/index-V32\.js/g, "index-V33.js");

// 5. Append V34 transform step before esbuild validation
const v34TransformStep = `
  // === V34: UPGRADE SHIPS & LEGIONS WITH MASTERWORK MEDALLIONS & CATALOGUS ===
  console.log("Upgrading Ships (sa) with unique Masterwork Emblems...");

  // Update sa ship definitions to assign unique masterwork emblems
  const shipEmblemUpdates = {
    liburna_minor: "ship_liburna_minor",
    liburna_bellica: "ship_liburna_bellica",
    trireme_imperialis: "ship_trireme_imperialis",
    trireme_cataphracta: "ship_trireme_cataphracta",
    quadrireme_augusta: "ship_quadrireme_augusta",
    quadrireme_praetoriana: "ship_quadrireme_praetoriana",
    quinquereme_victoria: "ship_quinquereme_victoria",
    quinquereme_constantinia: "ship_quinquereme_constantinia",
    dromon_ignifer: "ship_dromon_ignifer",
    hexareme_imperatoris: "ship_hexareme_imperatoris",
    deceres_ptolemaica: "ship_deceres_ptolemaica"
  };

  Object.entries(shipEmblemUpdates).forEach(([shipId, newEmblem]) => {
    const needle = 'id:"' + shipId + '",';
    const sPos = cleanJs.indexOf(needle);
    if (sPos !== -1) {
      const ePos = cleanJs.indexOf('emblem:"', sPos);
      if (ePos !== -1 && ePos < sPos + 1000) {
        const quoteClose = cleanJs.indexOf('"', ePos + 8);
        cleanJs = cleanJs.slice(0, ePos) + 'emblem:"' + newEmblem + '"' + cleanJs.slice(quoteClose + 1);
        console.log("OK: Assigned " + newEmblem + " to " + shipId);
      }
    }
  });

  // Inject romanLegions catalog right after sa definition
  const deceresNeedle = 'modelType:"deceres",emblem:"ship_deceres_ptolemaica",variant:"radiant"}];';
  const saEndIdx = cleanJs.indexOf(deceresNeedle);
  if (saEndIdx !== -1) {
    const romanLegionsDef = \`;
const romanLegions = [
  { id: "legion_velites", name: "Border Velites Skirmishers", latinName: "Cohors Velitum & Tironum", tier: 1, classification: "Light Skirmishers", description: "Agile light infantry armed with javelins and wolf pelts. Masters of harass-and-fade border tactics.", historicalNote: "Stationed along the Rhine and Danubian limes, velites probed dense enemy forests before the main legion engaged.", stats: { hp: 100, attack: 14, defense: 6, shock: 10, discipline: 65, morale: 70 }, specialTrait: { name: "Wolfskin Ambush", latinName: "Insidiae Lupinae", description: "+15% opening combat strike evasion and unaffected by swamp terrain attrition." }, emblem: "legion_velites", variant: "bronze" },
  { id: "legion_hastati", name: "Frontier Hastati Cohort", latinName: "Cohors Hastatorum Limitanea", tier: 2, classification: "Frontier Infantry", description: "Young Roman citizens armed with the curved scutum and pilum. Steadfast defenders of the imperial limes.", historicalNote: "First line of the republican and early imperial maniple, absorbing enemy charges with iron discipline.", stats: { hp: 120, attack: 18, defense: 10, shock: 16, discipline: 72, morale: 75 }, specialTrait: { name: "Pilum Volley Disruption", latinName: "Iactio Pilorum", description: "Barbed pilum volley shatters enemy shields, lowering enemy defense by 25% on round 1." }, emblem: "legion_hastati", variant: "sand_gold" },
  { id: "legion_principes", name: "Veteran Principes Line", latinName: "Ordo Principum Veteranorum", tier: 3, classification: "Heavy Battle Line", description: "Hardened veterans in lorica hamata chainmail. Forms the solid backbone of the second fighting line.", historicalNote: "Men in the prime of military age who sustained the brunt of intense close-quarters combat across Gaul and Hispania.", stats: { hp: 140, attack: 24, defense: 14, shock: 22, discipline: 80, morale: 82 }, specialTrait: { name: "Gallic Mail Resilience", latinName: "Lorica Hamata", description: "Absorbs 20% of incoming melee damage and reduces enemy critical strike chance." }, emblem: "legion_principes", variant: "iron" },
  { id: "legion_triarii", name: "Triarii Vanguard Phalanx", latinName: "Ordo Triariorum Martiorum", tier: 4, classification: "Elite Spear Cohort", description: "Respected veterans of a hundred campaigns. When the situation is dire, Rome relies on the Triarii.", historicalNote: "'Res ad triarios rediit' - a Roman proverb denoting the ultimate, unbreakable last stand of the Republic.", stats: { hp: 165, attack: 30, defense: 20, shock: 28, discipline: 88, morale: 90 }, specialTrait: { name: "Hasta Wall of Mars", latinName: "Murus Martius", description: "Long spear wall grants complete immunity to cavalry shock damage and repels flanking maneuvers." }, emblem: "legion_triarii", variant: "silver" },
  { id: "legion_cohort", name: "Imperial Legionary Cohort", latinName: "Legio Primigenia Invicta", tier: 5, classification: "Heavy Legionaries", description: "The peak of Roman military engineering. Clad in Lorica Segmentata banded steel and disciplined to perfection.", historicalNote: "The standardized legionary of the Principate who conquered Britannia and held Dacia against all barbarian incursions.", stats: { hp: 190, attack: 38, defense: 26, shock: 35, discipline: 92, morale: 92 }, specialTrait: { name: "Testudo Formation", latinName: "Testudo Defensiva", description: "Interlocking curved scuta absorb 50% of incoming ranged missile fire and siege ballista salvos." }, emblem: "legion_cohort", variant: "gold" },
  { id: "legion_equites", name: "Imperial Shock Equites", latinName: "Ala Equitum Imperialis", tier: 6, classification: "Heavy Cavalry", description: "Armored noble horsemen bearing the Draco standard. Strikes devastating blows into enemy rear echelons.", historicalNote: "Highborn cavalry wings tasked with breaking unbroken barbarian warbands and hunting fleeing commanders.", stats: { hp: 215, attack: 46, defense: 30, shock: 48, discipline: 86, morale: 88 }, specialTrait: { name: "Draco Wedge Charge", latinName: "Cuneus Equitum", description: "High-speed wedge assault inflicts immediate morale panic, forcing enemies to skip their first counterattack." }, emblem: "legion_equites", variant: "silver" },
  { id: "legion_cataphract", name: "Iron Clibanarii Heavy Lancers", latinName: "Equites Clibanarii Ferrei", tier: 7, classification: "Super-Heavy Cavalry", description: "Completely enclosed in scale and articulated iron plate, rider and warhorse alike. A shattering iron avalanche.", historicalNote: "Adapted from Eastern adversaries, Clibanarii were mobile iron ovens capable of crushing any infantry line.", stats: { hp: 245, attack: 55, defense: 38, shock: 60, discipline: 94, morale: 92 }, specialTrait: { name: "Iron Kontos Impact", latinName: "Impetus Konti", description: "Heavy two-handed lance charge deals 1.5x damage against fortified and armored adversaries." }, emblem: "legion_cataphract", variant: "iron" },
  { id: "legion_praetorian", name: "Praetorian Imperial Guard", latinName: "Cohors Praetoria Augusta", tier: 8, classification: "Imperial Bodyguard", description: "Elite palace guard handpicked by the Caesar. Unmatched swordsmen distinguished by purple cloaks and scorpion crests.", historicalNote: "The personal bodyguard of Roman emperors, equipped with finest Damascus steel gladii and gilded helmets.", stats: { hp: 275, attack: 64, defense: 44, shock: 54, discipline: 98, morale: 98 }, specialTrait: { name: "Imperator's Aegis", latinName: "Aegis Caesaris", description: "Absorbs a fatal battlefield strike once per engagement, instantly restoring 30% legion HP." }, emblem: "legion_praetorian", variant: "imperial_purple" },
  { id: "legion_palatinae", name: "Scholae Palatinae Constantinia", latinName: "Scholae Palatinae Divinae", tier: 9, classification: "Constantinian Guard", description: "Emperor Constantine's personal sacred companions marching under the heavenly sign of the Chi-Rho Labarum.", historicalNote: "Cavalry and heavy infantry guard created by Constantine after the disbanding of the rebellious Praetorians.", stats: { hp: 310, attack: 74, defense: 50, shock: 65, discipline: 100, morale: 100 }, specialTrait: { name: "In Hoc Signo Vinces", latinName: "Victoria Constantinia", description: "+25% total damage against rebel cohorts and mythological beasts with divine battle aura." }, emblem: "legion_palatinae", variant: "imperial_purple" },
  { id: "legion_invicta", name: "Sacrum Imperium Cohors Invicta", latinName: "Cohors Aeterna Triumphatrix", tier: 10, classification: "Divine Golden Cohort", description: "Legendary immortal cohorts crowned with Apollo's radiate diadem and wielding consecrated golden spathas.", historicalNote: "The supreme apotheosis of Roman arms, an eternal vanguard revered as demigods across Mare Nostrum.", stats: { hp: 350, attack: 85, defense: 60, shock: 78, discipline: 100, morale: 100 }, specialTrait: { name: "Sol Invictus Radiance", latinName: "Lux Aeterna", description: "Passive regeneration of 15 HP per combat turn and immunity to all negative combat status effects." }, emblem: "legion_invicta", variant: "radiant" }
];
function getPlayerLegion(p) {
  if (p && p.equippedLegionId) {
    const found = romanLegions.find(x => x.id === p.equippedLegionId);
    if (found) return found;
  }
  const lvl = (p && p.level) || 1;
  const tier = Math.max(1, Math.min(10, lvl));
  return romanLegions[tier - 1] || romanLegions[0];
}
\`;
    const insPos = saEndIdx + deceresNeedle.length;
    cleanJs = cleanJs.slice(0, insPos) + romanLegionsDef + cleanJs.slice(insPos);
    
  }

  // Update PlayerMapToken to pass level, unit id, and dynamically calculate land medallion variant
  const oldPmtVariant = 'j=b.useMemo(()=>{if(!x)return"imperial_purple";switch(u.variant){case"teal_sea":return"teal_sea";case"imperial_purple":return"imperial_purple";case"gold":return"gold";case"porphyry_red":return"porphyry_red";case"silver":return"silver";case"radiant":return"radiant";default:return"sand_gold"}},[x,u.variant])';
  const newPmtVariant = 'j=b.useMemo(()=>{if(!x){const plvl=t.level||1;return plvl>=10?"radiant":plvl>=8?"imperial_purple":plvl>=5?"gold":plvl>=4?"silver":plvl>=3?"iron":plvl>=2?"sand_gold":"bronze"}switch(u.variant){case"teal_sea":return"teal_sea";case"imperial_purple":return"imperial_purple";case"gold":return"gold";case"porphyry_red":return"porphyry_red";case"silver":return"silver";case"radiant":return"radiant";default:return"sand_gold"}},[x,u.variant,t.level])';
  if (cleanJs.includes(oldPmtVariant)) {
    cleanJs = cleanJs.replace(oldPmtVariant, newPmtVariant);
    
  }

  const oldPmtRt = 'topDownShipModelType:u.modelType,isHeroic:!0,isElaborate:!0,showGlow:!0';
  const newPmtRt = 'topDownShipModelType:u.id||u.modelType,level:t.level||1,isHeroic:!0,isElaborate:!0,showGlow:!0';
  if (cleanJs.includes(oldPmtRt)) {
    cleanJs = cleanJs.replace(oldPmtRt, newPmtRt);
    
  }

  // Upgrade Catalogus in Mx:
  // 1. Update tab navigation list
  const oldCatTabs = '["BESTIARIVM", "RELIQVIAE", "NAVALIA"].map(';
  const newCatTabs = '["WARSHIPS", "LEGIONS", "BESTIARIVM", "RELIQVIAE"].map(';
  if (cleanJs.includes(oldCatTabs)) {
    cleanJs = cleanJs.replace(oldCatTabs, newCatTabs);
    
  }

  // Update tab button label rendering:
  const oldTabLabel = 'children: tab}))}),catTab==="BESTIARIVM"';
  const newTabLabel = 'children: tab === "WARSHIPS" ? "WARSHIPS (NAVALIA)" : tab === "LEGIONS" ? "LEGIONS (EXERCITUS)" : tab}))}),catTab==="LEGIONS" && e.jsxs("div",{className:"space-y-4 p-4 sm:p-5 rounded-2xl border border-[#b8860b]/40 bg-[#061e22]/60 shadow-xl bg-slate-950/90",children:[e.jsxs("div",{className:"border-b border-[#b8860b]/40 pb-3 flex flex-wrap justify-between items-center gap-2",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-base sm:text-lg font-bold text-stone-200 font-cinzel flex items-center gap-2",children:[e.jsx(yr,{className:"w-5 h-5 text-[#d4af37]"}),"IMPERIAL LEGIONS & AUXILIARY COHORTS"]}),e.jsx("p",{className:"text-xs text-[#d4af37] font-serif-body",children:"Command compendium of Rome’s land forces across the Empire. Legions advance automatically with commander rank."})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:"text-xs font-mono font-bold text-[#d4af37] bg-[#04282c] px-3 py-1.5 rounded-xl border border-[#b8860b]/40 flex items-center gap-1.5 shadow-sm",children:[e.jsx(yr,{className:"w-3.5 h-3.5 text-[#d4af37]"}),e.jsxs("span",{children:["ACTIVE COMMAND: ",(getPlayerLegion(t).name).toUpperCase()]})]})]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 pt-2",children:romanLegions.map(W=>{const isCurrent=(t.equippedLegionId||getPlayerLegion(t).id)===W.id,isUnlocked=(t.level||1)>=W.tier;return e.jsxs("div",{key:W.id,className:\`p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-3 \${isCurrent?"bg-[#142930] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.01]":isUnlocked?"bg-black/60 border-[#8b6508]/30 hover:border-[#b8860b]/40 hover:bg-[#053238]":"bg-black/40 border-stone-900 opacity-60"}\`,children:[e.jsxs("div",{className:"flex items-start justify-between gap-2",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(rt,{size:42,variant:W.variant,emblem:W.emblem,showGlow:!0,isHeroic:!0}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs font-black font-cinzel text-stone-100 uppercase",children:W.name}),e.jsx("div",{className:"text-[10px] text-[#d4af37] font-serif-body italic",children:W.latinName})]})]}),e.jsxs("span",{className:"text-[9px] font-mono font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded border border-amber-800 shrink-0",children:["TIER ",W.tier]})]}),e.jsxs("div",{className:"p-2 rounded-lg bg-black/40 border border-stone-800/80 space-y-1.5",children:[e.jsxs("div",{className:"flex justify-between text-[10px] font-mono",children:[e.jsx("span",{className:"text-stone-400",children:"STRENGTH (HP)"}),e.jsx("span",{className:"text-emerald-400 font-bold",children:W.stats.hp})]}),e.jsxs("div",{className:"flex justify-between text-[10px] font-mono",children:[e.jsx("span",{className:"text-stone-400",children:"ATTACK / DEFENSE"}),e.jsxs("span",{className:"text-amber-300 font-bold",children:[W.stats.attack," / ",W.stats.defense]})]}),e.jsxs("div",{className:"flex justify-between text-[10px] font-mono",children:[e.jsx("span",{className:"text-stone-400",children:"SHOCK IMPETUS"}),e.jsx("span",{className:"text-red-400 font-bold",children:W.stats.shock})]}),e.jsxs("div",{className:"flex justify-between text-[10px] font-mono",children:[e.jsx("span",{className:"text-stone-400",children:"DISCIPLINE & MORALE"}),e.jsxs("span",{className:"text-cyan-300 font-bold",children:[W.stats.discipline," / ",W.stats.morale]})]})]}),e.jsxs("div",{className:"text-[10px] text-stone-300 font-serif-body italic border-l-2 border-amber-600/60 pl-2",children:[e.jsx("span",{className:"font-bold text-amber-300 not-italic block",children:W.specialTrait.name}),W.specialTrait.description]}),e.jsx("button",{type:"button",onClick:()=>{if(s&&isUnlocked){v.playSwordClash();s(prev=>({...prev,equippedLegionId:W.id}));Y("Legion Deployed",W.name+" takes the imperial vanguard.","gold")}},disabled:!isUnlocked||isCurrent,className:\`w-full py-1.5 rounded-lg font-cinzel text-xs font-bold transition-all text-center cursor-pointer \${isCurrent?"bg-amber-500/20 text-amber-300 border border-amber-500/50 cursor-default":isUnlocked?"bg-amber-600 hover:bg-amber-500 text-black border border-amber-400 shadow-sm":"bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed"}\`,children:isCurrent?"ACTIVE COMMAND IN FIELD":isUnlocked?"DEPLOY AS BATTLE COHORT":"UNLOCKED AT LEVEL "+W.tier})]})})})]}),catTab==="BESTIARIVM"';

  if (cleanJs.includes(oldTabLabel)) {
    cleanJs = cleanJs.replace(oldTabLabel, newTabLabel);
    
  }

  // Update catTab condition for Warships so both WARSHIPS and NAVALIA render the shipyard
  cleanJs = cleanJs.replace('catTab==="NAVALIA"', '(catTab==="WARSHIPS"||catTab==="NAVALIA")');

  // Inject Masterwork Medallion right into each Warship card header
  const oldShipCardHeader = 'e.jsxs("div",{className:"flex items-start justify-between gap-1.5",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs font-black font-cinzel text-stone-100 uppercase",children:W.name}),e.jsx("div",{className:"text-[10px] text-[#d4af37] font-serif-body italic",children:W.latinName})]}),e.jsxs("span",{className:"text-[9px] font-mono font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded border border-amber-800 shrink-0",children:["T",W.tier]})]}),e.jsxs("div",{className:"h-28 bg-slate-900/90 rounded-lg border border-[#b8860b]/40 relative overflow-hidden flex items-center justify-center p-1.5",children:[e.jsx("div",{className:"w-full h-full scale-90",children:e.jsx(Yi,{modelType:W.modelType';

  const newShipCardHeader = 'e.jsxs("div",{className:"flex items-start justify-between gap-1.5",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(rt,{size:38,variant:W.variant,emblem:W.emblem,showGlow:!0,isHeroic:!0}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs font-black font-cinzel text-stone-100 uppercase",children:W.name}),e.jsx("div",{className:"text-[10px] text-[#d4af37] font-serif-body italic",children:W.latinName})]})]}),e.jsxs("span",{className:"text-[9px] font-mono font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded border border-amber-800 shrink-0",children:["T",W.tier]})]}),e.jsxs("div",{className:"h-28 bg-slate-900/90 rounded-lg border border-[#b8860b]/40 relative overflow-hidden flex items-center justify-center p-1.5",children:[e.jsx("div",{className:"w-full h-full scale-90",children:e.jsx(Yi,{modelType:W.modelType';

  if (cleanJs.includes(oldShipCardHeader)) {
    cleanJs = cleanJs.replace(oldShipCardHeader, newShipCardHeader);
    
  }
`;

const esbuildMarker = 'console.log("Validating updated bundle with esbuild...");';
const esbuildPos = v33Script.indexOf(esbuildMarker);
if (esbuildPos === -1) {
  throw new Error("Cannot find esbuild validation marker in build script");
}

v33Script = v33Script.slice(0, esbuildPos) + v34TransformStep + "\n  " + v33Script.slice(esbuildPos);

fs.writeFileSync(path.join(__dirname, "build_clean_v34.cjs"), v33Script, "utf8");
console.log("Clean build_clean_v34.cjs assembled successfully!");
