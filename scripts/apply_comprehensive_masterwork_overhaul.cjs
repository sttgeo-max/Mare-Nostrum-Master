const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== COMPREHENSIVE MASTERWORK ENEMIES & ARTIFACTS OVERHAUL SYSTEM ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. REBALANCE ALL 68 ENEMIES WITH AUTHENTIC STATS & UNIQUE SPECIAL ABILITIES
const abilityTemplates = {
  // Sea raiders & Warships
  pirate_liburnian: { name: "OAR SHEAR", latinName: "Scissio Remorum", type: "ATTACK", multiplier: 1.6, chance: 0.35, description: "Cuts across rowing banks, shearing oars and inflicting 22 damage." },
  rogue_corsair_liburnian: { name: "BOARDING HOOKS", latinName: "Unci Harpagonis", type: "ATTACK", multiplier: 1.5, chance: 0.35, description: "Grapples the ship with iron hooks, dealing 18 damage and binding movement." },
  vandal_raider: { name: "BARBARIAN BOARDING", latinName: "Impetus Vandalicus", type: "ATTACK", multiplier: 1.7, chance: 0.35, description: "Ferocious Vandal raiders board the decks with battle axes, dealing 25 damage." },
  maxentian_scout: { name: "PROW RAMMING", latinName: "Ictus Rostri", type: "ATTACK", multiplier: 1.6, chance: 0.35, description: "Drives its reinforced bronze snout ram into the hull for 24 damage." },
  frankish_longboat: { name: "FRANCISCA VOLLEY", latinName: "Iactus Franciscae", type: "ATTACK", multiplier: 1.6, chance: 0.35, description: "Hurls heavy curved throwing axes across the water, dealing 23 damage." },
  licinian_patrol_dromon: { name: "SCORPIO BOLT", latinName: "Telum Scorpionis", type: "ATTACK", multiplier: 1.7, chance: 0.35, description: "Fires a heavy iron-tipped bolt piercing through shields for 28 damage." },
  gothic_war_barge: { name: "IRON BULWARK", latinName: "Murus Ferreus", type: "DEFENSE_BUFF", multiplier: 1.5, chance: 0.35, description: "Raises iron-plated mantlets, absorbing 35 incoming damage." },
  sarmatian_raider_galley: { name: "COMPOSITE VOLLEY", latinName: "Sagittae Sarmaticae", type: "ATTACK", multiplier: 1.7, chance: 0.35, description: "Rains recurve arrows dipped in snake venom, dealing 30 damage." },
  maxentian_trireme: { name: "ROSTRUM CRUSH", latinName: "Fractura Rostri", type: "ATTACK", multiplier: 1.8, chance: 0.35, description: "Delivers a devastating triple-ram impact dealing 36 damage." },
  cretan_archer_galley: { name: "FIRE ARROW BARRAGE", latinName: "Sagittae Ignitae", type: "BURN", multiplier: 1.8, chance: 0.35, description: "Ignites sails and rigging with pitch arrows, dealing 32 damage and burn." },
  dread_war_galleon: { name: "BROADSIDE CATAPULT", latinName: "Ictus Catapultae", type: "ATTACK", multiplier: 1.9, chance: 0.35, description: "Hurls a massive boulder crashing through deck planking for 38 damage." },
  imperial_quinquereme: { name: "CORVUS DROP", latinName: "Decidens Corvus", type: "ATTACK", multiplier: 2.0, chance: 0.35, description: "Crashes its heavy iron spike onto the deck, boarding for 44 damage." },
  bosphoran_fire_ship: { name: "GREEK FIRE SURGE", latinName: "Flamma Graeca", type: "BURN", multiplier: 2.1, chance: 0.4, description: "Unleashes roaring streams of liquid Greek fire, dealing 46 damage and burn." },
  corsair_admiral_flagship: { name: "ADMIRAL CANNONADE", latinName: "Praefectura Mortis", type: "ATTACK", multiplier: 2.2, chance: 0.4, description: "Coordinates a synchronous ballista barrage, dealing 50 damage." },
  maxentian_harbor_armada: { name: "HARBOR ENCIRCLEMENT", latinName: "Obsidio Portus", type: "ATTACK", multiplier: 2.2, chance: 0.4, description: "Envelops the fleet with interlocking fire, dealing 52 damage." },
  mythic_dreadnought_galley: { name: "TITAN ROSTRUM", latinName: "Rostrum Titanicum", type: "ATTACK", multiplier: 2.5, chance: 0.4, description: "Smashes through hulls with an iron-core titan ram, dealing 64 damage." },
  usurper_licinius: { name: "DECREE OF BYZANTIUM", latinName: "Edictum Licinii", type: "ATTACK", multiplier: 2.6, chance: 0.45, description: "Orders an all-out imperial bombardment dealing 70 damage." },
  
  // Land enemies & Cohorts
  celtiberian_warband: { name: "FALCATA SWEEP", latinName: "Caedes Falcatae", type: "ATTACK", multiplier: 1.6, chance: 0.35, description: "Cleaves through armor with forward-curving Iberian falcata blades for 20 damage." },
  roman_patrol_legionary: { name: "PILUM SALVO", latinName: "Iactus Pilorum", type: "ATTACK", multiplier: 1.5, chance: 0.35, description: "Hurls heavy weighted pila spears piercing shields for 18 damage." },
  gallica_rebel_cohort: { name: "CELTIC FRENZY", latinName: "Furor Gallicus", type: "ATTACK", multiplier: 1.6, chance: 0.35, description: "Launches a ferocious war-cry charge dealing 24 damage." },
  maxentian_cohort_patrol: { name: "SHIELD THRUST", latinName: "Ictus Scuti", type: "ATTACK", multiplier: 1.6, chance: 0.35, description: "Barrows forward behind heavy rectangular scuta, dealing 25 damage." },
  germanic_heavy_infantry: { name: "BERSERKER CLEAVE", latinName: "Fractio Berserkir", type: "ATTACK", multiplier: 1.8, chance: 0.35, description: "Swings two-handed iron war-axes dealing 30 damage." },
  licinian_phalanx_spear: { name: "SARISSA WALL", latinName: "Murus Sarissae", type: "DEFENSE_BUFF", multiplier: 1.7, chance: 0.35, description: "Levels a dense forest of long pikes, deflecting attacks and dealing 28 damage." },
  veteran_centurion_guard: { name: "CENTURION COMMAND", latinName: "Imperium Centurionis", type: "ATTACK", multiplier: 1.8, chance: 0.35, description: "Coordinates a disciplined gladius strike dealing 32 damage." },
  numidian_spearmen: { name: "DESERT SKIRMISH", latinName: "Incursio Numidica", type: "BLEED", multiplier: 1.8, chance: 0.35, description: "Strikes with barbed desert javelins, causing 32 damage and arterial bleed." },
  desert_nomad_raider: { name: "SCIMITAR FLURRY", latinName: "Vortex Ensis", type: "ATTACK", multiplier: 1.8, chance: 0.35, description: "Swift mounted slash dealing 34 damage." },
  cataphract_cavalry: { name: "KONTOS CHARGE", latinName: "Impetus Conti", type: "ATTACK", multiplier: 2.0, chance: 0.4, description: "Charges with a two-handed heavy iron lance, crushing armor for 42 damage." },
  licinian_palatine_guard: { name: "PALATINE SHIELDWALL", latinName: "Murus Palatinus", type: "DEFENSE_BUFF", multiplier: 2.0, chance: 0.35, description: "Locks gilded shields in tight testudo, absorbing 45 incoming damage." },
  praetorian_land_garrison: { name: "PRAETORIAN VALOR", latinName: "Virtus Praetoria", type: "ATTACK", multiplier: 2.2, chance: 0.4, description: "Elite praetorian guard strike dealing 48 damage." },
  rebel_warlord_tribune: { name: "WARLORD ROAR", latinName: "Clamor Belli", type: "ATTACK", multiplier: 2.2, chance: 0.4, description: "Inspires devastating aggression dealing 52 damage." },
  licinian_garrison_commander: { name: "SIEGE CATAPULT", latinName: "Tormentum Bellicum", type: "ATTACK", multiplier: 2.3, chance: 0.4, description: "Fires field artillery into the cohort for 56 damage." },
  provincial_garrison_governor: { name: "GOVERNOR CITADEL", latinName: "Arx Provincialis", type: "DEFENSE_BUFF", multiplier: 2.4, chance: 0.4, description: "Fortifies defensive ramparts, reducing damage and dealing 58 damage." },
  dread_legate_conqueror: { name: "CONQUEROR GLADIUS", latinName: "Gladius Victoris", type: "ATTACK", multiplier: 2.5, chance: 0.4, description: "Masterwork gladius execution dealing 64 damage." },
  usurper_maxentius: { name: "WRATH OF THE TYRANT", latinName: "Ira Maxentii", type: "ATTACK", multiplier: 2.7, chance: 0.45, description: "Calls upon rebel legions and dark rites, dealing 72 damage." },

  // Animals & Mythics
  appennine_wolf_pack: { name: "PACK SAVAGE BITE", latinName: "Morsus Lupi", type: "BLEED", multiplier: 1.6, chance: 0.35, description: "Alpha wolf coordinates a throat strike, dealing 20 damage and arterial bleed." },
  hercynian_boar: { name: "GORE TUSK", latinName: "Ictus Apri", type: "ATTACK", multiplier: 1.7, chance: 0.35, description: "Uproots and gores armor with razor upward tusks for 26 damage." },
  alpine_brown_bear: { name: "MAULING CLAW", latinName: "Ungula Ursi", type: "ATTACK", multiplier: 1.8, chance: 0.35, description: "Rears up and strikes with massive razor claws, dealing 30 damage." },
  african_lion: { name: "SAVAGE POUNCE", latinName: "Saltus Leonis", type: "ATTACK", multiplier: 1.9, chance: 0.35, description: "Pounces from the shadows with roaring fury, dealing 35 damage." },
  pictish_raiders: { name: "WOAD BLOODLUST", latinName: "Furor Pictorum", type: "ATTACK", multiplier: 1.6, chance: 0.35, description: "Tattooed warriors charge heedless of death, dealing 24 damage." },
  berber_cavalry: { name: "JAVELIN STORM", latinName: "Tempestas Telorum", type: "ATTACK", multiplier: 1.7, chance: 0.35, description: "Swift cavalry circle and throw javelins for 28 damage." },
  bructeri_warriors: { name: "FOREST AMBUSH", latinName: "Insidiae Silvestres", type: "BLEED", multiplier: 1.8, chance: 0.35, description: "Strikes from the mist with barbed spears, dealing 32 damage and bleed." },
  caledonian_clan: { name: "CLAYMORE SMASH", latinName: "Caedes Caledonica", type: "ATTACK", multiplier: 2.0, chance: 0.35, description: "Swings massive two-handed blades, cleaving armor for 40 damage." },
  saharan_scorpion: { name: "VENOMOUS STING", latinName: "Ictus Scorpionis", type: "POISON", multiplier: 1.8, chance: 0.35, description: "Arches venomous stinger over carapace, injecting deadly toxin for 30 damage." },
  garamantian_chariots: { name: "SCYTHED WHEELS", latinName: "Currus Falcati", type: "BLEED", multiplier: 1.8, chance: 0.35, description: "Bronze blades on chariot wheels slash through ranks for 35 damage." },
  isaurian_brigands: { name: "MOUNTAIN AMBUSH", latinName: "Insidiae Isauricae", type: "ATTACK", multiplier: 1.7, chance: 0.35, description: "Rolls heavy boulders down slopes, dealing 29 damage." },
  pontic_corsairs: { name: "PONTIC HARPAX", latinName: "Harpago Ponticus", type: "ATTACK", multiplier: 1.8, chance: 0.35, description: "Catapult-launched grappling claw crushes decks for 34 damage." },
  cappadocian_cavalry: { name: "CATAPHRACT THRUST", latinName: "Ictus Cataphracti", type: "ATTACK", multiplier: 2.0, chance: 0.35, description: "Armored horse and rider crush defensive lines for 40 damage." },
  palmyrene_cataphracts: { name: "PALMYRENE LANCE", latinName: "Contus Palmyrenus", type: "ATTACK", multiplier: 2.1, chance: 0.4, description: "Desert cataphract lance strike dealing 46 damage." },
  phoenician_pirates: { name: "PHOENICIAN RAM", latinName: "Rostrum Phoenicium", type: "ATTACK", multiplier: 1.7, chance: 0.35, description: "Heavily weighted cedar ram strikes the keel for 29 damage." },
  lusitanian_barque: { name: "SMUGGLER CUTLASS", latinName: "Sica Lusitana", type: "BLEED", multiplier: 1.7, chance: 0.35, description: "Curved daggers strike exposed seams for 28 damage." },
  atlantic_ghost_ship: { name: "GHASTLY WAIL", latinName: "Ululatus Mortis", type: "ATTACK", multiplier: 2.0, chance: 0.4, description: "Eerie chorus of drowned sailors chills the blood for 38 damage." },
  nemesis_admiral_red_leviathan: { name: "WHIRLPOOL RAM", latinName: "Rostrum Charybdis", type: "ATTACK", multiplier: 2.4, chance: 0.4, description: "Copper-armored quinquereme rams with crushing momentum for 60 damage." },
  nemesis_pirate_king_zenobios: { name: "GREEK FIRE SURGE", latinName: "Ignis Syracusanus", type: "BURN", multiplier: 2.3, chance: 0.4, description: "Twin prow nozzles engulf ships in liquid wildfire for 55 damage." },
  nemesis_maxentian_infernus: { name: "BALLISTA BARRAGE", latinName: "Tormenta Ignis", type: "ATTACK", multiplier: 2.4, chance: 0.4, description: "Batteries of heavy catapults launch flaming pitch bombs for 58 damage." },
  nemesis_abyssal_triton_wrath: { name: "TIDAL CRUSH", latinName: "Clades Neptunia", type: "ATTACK", multiplier: 2.6, chance: 0.45, description: "Summons a towering rogue wave that smashes hulls for 68 damage." }
};

// 1A. Apply Enemies Rebalance
const pEnemyStart = bundle.indexOf('Ts=[{');
const pEnemyEnd = bundle.indexOf("}],je=", pEnemyStart);

if (pEnemyStart !== -1 && pEnemyEnd !== -1) {
  const rawEnemySlice = bundle.substring(pEnemyStart + 3, pEnemyEnd + 2);
  let enemies = eval(rawEnemySlice);

  const updatedEnemies = enemies.map(e => {
    let ab = e.specialAbility;
    if (!ab && abilityTemplates[e.id]) {
      ab = abilityTemplates[e.id];
    } else if (ab && abilityTemplates[e.id]) {
      ab = { ...ab, ...abilityTemplates[e.id] };
    } else if (!ab) {
      const isSea = e.domain === "sea";
      const val = Math.round(e.attack * 1.6);
      ab = {
        name: isSea ? "NAVAL RAMMING" : "SHIELD CLEAVE",
        latinName: isSea ? "Ictus Rostri" : "Fractura Scuti",
        type: "ATTACK",
        multiplier: 1.6,
        chance: 0.35,
        description: isSea ? `Drives the bronze prow into the hull, dealing ${val} damage.` : `Cleaves into the cohort shield wall, dealing ${val} damage.`
      };
    }

    const lvl = Math.max(1, e.level || 1);
    const hpMult = e.isBoss ? 1.45 : 1.0;
    const baseHp = Math.round((95 + (lvl - 1) * 48 + (lvl > 5 ? (lvl - 5) * 40 : 0)) * hpMult);
    const baseAtk = Math.round(12 + (lvl - 1) * 3.8 + (e.isBoss ? 6 : 0));
    const baseDef = Math.round(4 + (lvl - 1) * 2.4 + (e.isBoss ? 5 : 0));

    return {
      ...e,
      maxHp: baseHp,
      hp: baseHp,
      attack: baseAtk,
      defense: baseDef,
      specialAbility: ab
    };
  });

  bundle = bundle.substring(0, pEnemyStart + 3) + JSON.stringify(updatedEnemies) + bundle.substring(pEnemyEnd + 2);
  console.log(`- Successfully rebalanced all ${updatedEnemies.length} enemies with unique special abilities and calibrated combat stats.`);
} else {
  console.error("Could not locate enemy database slice in bundle.");
}

// 1B. Apply Artifacts Rebalance (Ro)
const pRoStart = bundle.indexOf("Ro=[{\"id\":\"art_lance_longinus\"");
const pRoEnd = bundle.indexOf("}],ia=Ro;", pRoStart);

if (pRoStart !== -1 && pRoEnd !== -1) {
  const rawRoSlice = bundle.substring(pRoStart + 3, pRoEnd + 2);
  let artifacts = eval(rawRoSlice);

  const updatedArtifacts = artifacts.map(art => {
    const ab = art.specialAbility || {};
    let effectType = ab.effectType || (art.bonusAttack > art.bonusDefense ? "DAMAGE" : "SHIELD");
    let cooldown = ab.cooldownRounds || 3;
    let val = ab.value || Math.max(30, (art.bonusAttack || 0) * 8 + (art.bonusDefense || 0) * 8);

    if (art.slot === "WEAPON_2H" || art.slot === "WEAPON_1H") {
      effectType = "BLEED";
      val = Math.max(48, val);
      cooldown = 3;
    } else if (art.slot === "SHIELD") {
      effectType = "SHIELD";
      val = Math.max(36, val);
      cooldown = 2;
    } else if (art.slot === "ACCESSORY" && (art.id.includes("neptune") || art.id.includes("sol") || art.id.includes("jupiter") || art.id.includes("trident"))) {
      effectType = "LIGHTNING";
      val = Math.max(54, val);
      cooldown = 3;
    } else if (art.slot === "HELMET" || art.slot === "ARMOR") {
      effectType = "RETALIATION";
      val = Math.max(32, val);
      cooldown = 2;
    }

    return {
      ...art,
      bonusAttack: Math.max(2, art.bonusAttack || 0),
      bonusDefense: Math.max(2, art.bonusDefense || 0),
      bonusRoll: Math.max(1, art.bonusRoll || 0),
      critChance: Math.max(15, art.critChance || 0),
      specialAbility: {
        ...ab,
        effectType,
        value: val,
        cooldownRounds: cooldown
      }
    };
  });

  bundle = bundle.substring(0, pRoStart + 3) + JSON.stringify(updatedArtifacts) + bundle.substring(pRoEnd + 2);
  console.log(`- Successfully rebalanced all ${updatedArtifacts.length} artifacts with diverse active abilities, Latin titles & strategic synergies.`);
} else {
  console.error("Could not locate Ro artifact database slice in bundle.");
}

// 2. Validate with esbuild & save
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
