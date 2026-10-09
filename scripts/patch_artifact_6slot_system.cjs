const fs = require('fs');
const path = require('path');

console.log("=== APPLYING 6-SLOT EXPANDED ARTIFACT & RECLASSIFICATION SYSTEM ===");

const bundlePath = path.join(__dirname, '..', 'public', 'assets', 'index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

// 1. Reclassify specific artifacts in the catalog
console.log("1. Reclassifying artifact categories...");

code = code.replace(
  '{"id":"art_rostrum_carthage","name":"Naval Rostrum of Gaius Duilius","latinName":"Rostrum Duilii","historicalFigure":"Consul Gaius Duilius (Victor of Mylae)","slot":"WEAPON_2H"',
  '{"id":"art_rostrum_carthage","name":"Naval Rostrum of Gaius Duilius","latinName":"Rostrum Duilii","historicalFigure":"Consul Gaius Duilius (Victor of Mylae)","slot":"NAVAL_RAM"'
);

code = code.replace(
  '{"id":"art_corvus_bridge","name":"Boarding Corvus of Duilius","latinName":"Corvus Mylarum","historicalFigure":"Gaius Duilius & Roman Naval Architects","slot":"ACCESSORY"',
  '{"id":"art_corvus_bridge","name":"Boarding Corvus of Duilius","latinName":"Corvus Mylarum","historicalFigure":"Gaius Duilius & Roman Naval Architects","slot":"SIEGE_EQUIPMENT"'
);

code = code.replace(
  '{"id":"art_syracusan_mirror","name":"Burning Mirror of Archimedes","latinName":"Speculum Archimedeum","historicalFigure":"Archimedes of Syracuse (Master of Geometric Siegecraft)","slot":"SHIELD"',
  '{"id":"art_syracusan_mirror","name":"Burning Mirror of Archimedes","latinName":"Speculum Archimedeum","historicalFigure":"Archimedes of Syracuse (Master of Geometric Siegecraft)","slot":"SIEGE_EQUIPMENT"'
);

code = code.replace(
  '{"id":"art_corinthian_helm","name":"Corinthian Helm of Miltiades","latinName":"Galea Marathonis","historicalFigure":"Miltiades the Younger (Victor of Marathon)","slot":"ARMOR"',
  '{"id":"art_corinthian_helm","name":"Corinthian Helm of Miltiades","latinName":"Galea Marathonis","historicalFigure":"Miltiades the Younger (Victor of Marathon)","slot":"HELMET"'
);

code = code.replace(
  '{"id":"art_numidian_javelins","name":"Javelins of King Masinissa","latinName":"Iacula Masinissae","historicalFigure":"King Masinissa of Numidia","slot":"WEAPON_1H"',
  '{"id":"art_numidian_javelins","name":"Javelins of King Masinissa","latinName":"Iacula Masinissae","historicalFigure":"King Masinissa of Numidia","slot":"RANGED_WEAPON"'
);

// 2. Update slot mapping function tx(t)
console.log("2. Updating slot type mapping function tx(t)...");

const oldTxRegex = /function tx\(t\)\{return t==="ARMOR"\|\|t==="RING"\?"REGALIA":t==="WEAPON"\|\|t==="WEAPON_1H"\|\|t==="WEAPON_2H"\|\|t==="SHIELD"\?"STANDARDS":t==="SCROLL"\|\|t==="ACCESSORY"\?"DOCTRINE":null\}/;

const newTxCode = `function tx(t){if(!t)return null;if(t==="WEAPON"||t==="WEAPON_1H"||t==="WEAPON_2H"||t==="RANGED_WEAPON")return"WEAPON";if(t==="SHIELD"||t==="NAVAL_RAM"||t==="SIEGE_EQUIPMENT"||t==="PARMA")return"OFF_HAND";if(t==="ARMOR"||t==="HELMET"||t==="CUIRASS"||t==="LORICA")return"ARMOR";if(t==="RING"||t==="AMULET"||t==="BULLA"||t==="SIGNET")return"SIGNET";if(t==="SCROLL"||t==="STRATAGEM"||t==="CODEX"||t==="BOOKS")return"DOCTRINE";if(t==="ACCESSORY"||t==="ASTROLABE"||t==="LEDGER"||t==="DIOPTRA")return"AUXILIARY";return"WEAPON";}`;

if (oldTxRegex.test(code)) {
  code = code.replace(oldTxRegex, newTxCode);
  console.log("Updated tx(t) successfully!");
} else {
  console.log("Warning: old tx(t) pattern not matched directly, attempting flexible replace...");
  code = code.replace(/function tx\(t\)\{[^}]+\}/, newTxCode);
}

// 3. Update Ui spheres array to 6 dedicated spheres
console.log("3. Expanding Ui spheres array to 6 dedicated slots...");

const oldUiStart = code.indexOf('Ui=[{id:"REGALIA"');
if (oldUiStart !== -1) {
  const oldUiEnd = code.indexOf('}];function Yo', oldUiStart) + 2;
  const oldUiSlice = code.substring(oldUiStart, oldUiEnd);

  const newUiSlice = `Ui=[
  {
    id:"WEAPON",
    name:"Supreme Weaponry & Arms",
    latinName:"Ferrum Imperatoris",
    subtitle:"Main-Hand Melee & Ranged Armaments",
    auraTitle:"Aura of the Gladiator",
    description:"Masterwork blades, spears, javelins, and ranged bows forged for personal martial prowess.",
    resonancePerkTitle:"VIRTUS ARMARUM RESONANCE",
    resonancePerkDescription:"+15% Critical Strike multiplier & +10% Melee Impact Damage across all battle theatres.",
    accentColor:"#ef4444",
    glowColor:"rgba(239, 68, 68, 0.4)",
    badgeBg:"bg-red-950/80 text-red-200 border-red-600",
    borderColor:"border-red-600/70",
    icon:"Swords",
    slots:[{slotKey:"WEAPON",name:"Main-Hand Weapon",latinName:"Gladius & Ferrum",sphereId:"WEAPON",allowedTypes:["WEAPON","WEAPON_1H","WEAPON_2H","RANGED_WEAPON"],archetype:"Primary Arms",description:"Gladii, spathae, dory spears, or Numidian javelins.",echelonTarget:"VANGUARD",icon:"Swords"}]
  },
  {
    id:"OFF_HAND",
    name:"Shields, Rams & Siegecraft",
    latinName:"Scuta, Rostra & Tormenta",
    subtitle:"Defensive Shields & Naval Siege Engines",
    auraTitle:"Wall of Iron & Bronze",
    description:"Legionary scuta, naval rams, burning mirrors, and corvus boarding bridges.",
    resonancePerkTitle:"SCUTUM & ROSTRUM RESONANCE",
    resonancePerkDescription:"+20% Armor deflection & +25% Boarding / Ramming damage in fleet combat.",
    accentColor:"#f59e0b",
    glowColor:"rgba(245, 158, 11, 0.4)",
    badgeBg:"bg-amber-950/80 text-amber-200 border-amber-600",
    borderColor:"border-amber-600/70",
    icon:"Shield",
    slots:[{slotKey:"OFF_HAND",name:"Off-Hand & Siege",latinName:"Scutum & Rostrum",sphereId:"OFF_HAND",allowedTypes:["SHIELD","NAVAL_RAM","SIEGE_EQUIPMENT","PARMA"],archetype:"Defensive Armament",description:"Scutum shields, naval rams, or siege mirrors.",echelonTarget:"VANGUARD",icon:"Shield"}]
  },
  {
    id:"ARMOR",
    name:"Imperial Armor & Helms",
    latinName:"Lorica & Galea Augusti",
    subtitle:"Body Cuirasses, Helms & Military Cloaks",
    auraTitle:"Imperial Invulnerability",
    description:"Segmented plate armor, muscle cuirasses, and bronze officer helmets.",
    resonancePerkTitle:"LORICA IMPERIALIS RESONANCE",resonancePerkDescription:"+20% Max HP threshold & +15% damage reduction against physical strikes.",
    accentColor:"#eab308",
    glowColor:"rgba(234, 179, 8, 0.4)",
    badgeBg:"bg-yellow-950/80 text-yellow-200 border-yellow-600",
    borderColor:"border-yellow-600/70",
    icon:"Crown",
    slots:[{slotKey:"ARMOR",name:"Body Armor & Helm",latinName:"Lorica & Galea",sphereId:"ARMOR",allowedTypes:["ARMOR","HELMET","CUIRASS","LORICA"],archetype:"Protective Armor",description:"Lorica segmentata, hamata, or Corinthian helmets.",echelonTarget:"TOTAL_FORMATION",icon:"Crown"}]
  },
  {
    id:"SIGNET",
    name:"Sovereign Signets & Rings",
    latinName:"Anuli & Amuleta",
    subtitle:"Intaglio Signet Rings & Sacred Amulets",
    auraTitle:"Sovereign Mandate",
    description:"Engraved signets, Punic sun disks, and imperial gold bullas.",
    resonancePerkTitle:"ANULUS MAJESTATIS RESONANCE",
    resonancePerkDescription:"+20% Solidi plunder & +25% Imperial Fama gain per victory.",
    accentColor:"#a855f7",
    glowColor:"rgba(168, 85, 247, 0.4)",
    badgeBg:"bg-purple-950/80 text-purple-200 border-purple-600",
    borderColor:"border-purple-600/70",
    icon:"Crown",
    slots:[{slotKey:"SIGNET",name:"Signet & Amulet",latinName:"Anulus & Amuletum",sphereId:"SIGNET",allowedTypes:["RING","AMULET","BULLA","SIGNET"],archetype:"Signet Ring",description:"Poison signets, Sol Invictus rings, or sacred amulets.",echelonTarget:"TOTAL_FORMATION",icon:"Crown"}]
  },
  {
    id:"DOCTRINE",
    name:"Military Treatises & Codices",
    latinName:"Commentarii & Libri",
    subtitle:"Command Treatises, Scrolls & Blueprints",
    auraTitle:"Mastery of Strategy",
    description:"Caesar's Commentaries, Stoic meditations, and Sibylline prophecy scrolls.",
    resonancePerkTitle:"DISCIPLINA BELLICA RESONANCE",
    resonancePerkDescription:"+1 Tactical Card Redraw per combat & -20% Supply consumption.",
    accentColor:"#3b82f6",
    glowColor:"rgba(59, 130, 246, 0.4)",
    badgeBg:"bg-blue-950/80 text-blue-200 border-blue-600",
    borderColor:"border-blue-600/70",
    icon:"Sparkles",
    slots:[{slotKey:"DOCTRINE",name:"Tactical Codex",latinName:"Commentarii & Codex",sphereId:"DOCTRINE",allowedTypes:["SCROLL","STRATAGEM","CODEX","BOOKS"],archetype:"Command Treatise",description:"Commentaries, Sibylline books, or treatises.",echelonTarget:"TOTAL_FORMATION",icon:"Sparkles"}]
  },
  {
    id:"AUXILIARY",
    name:"Naval Instruments & Relics",
    latinName:"Apparatus & Astrolabia",
    subtitle:"Astrolabes, Dioptrae & Trade Ledgers",
    auraTitle:"Eye of the Navigator",
    description:"Navigational astrolabes, survey dioptrae, and merchant ledgers.",
    resonancePerkTitle:"NAUTICA PRECISION RESONANCE",
    resonancePerkDescription:"+3 Patrol Vision radius & -15% Port commodity purchase prices.",
    accentColor:"#06b6d4",
    glowColor:"rgba(6, 182, 212, 0.4)",
    badgeBg:"bg-cyan-950/80 text-cyan-200 border-cyan-600",
    borderColor:"border-cyan-600/70",
    icon:"Sparkles",
    slots:[{slotKey:"AUXILIARY",name:"Nautical Auxiliary",latinName:"Astrolabium & Tabulae",sphereId:"AUXILIARY",allowedTypes:["ACCESSORY","ASTROLABE","LEDGER","DIOPTRA"],archetype:"Navigational Tool",description:"Astrolabes, dioptrae, or trade ledgers.",echelonTarget:"TOTAL_FORMATION",icon:"Sparkles"}]
  }
]`;

  code = code.replace(oldUiSlice, newUiSlice);
  console.log("Replaced Ui spheres array successfully!");
}

// 4. Update initial equipped object defaults
console.log("4. Updating default equipped objects across codebase...");
code = code.replace(/equipped:\{REGALIA:null,STANDARDS:null,DOCTRINE:null\}/g, 'equipped:{WEAPON:null,OFF_HAND:null,ARMOR:null,SIGNET:null,DOCTRINE:null,AUXILIARY:null}');

// Write back updated code
fs.writeFileSync(bundlePath, code, 'utf8');
console.log("=== 6-SLOT SYSTEM PATCH COMPLETE ===");
