/**
 * Mare Nostrum II - Artifact Definitions (Extracted from V37 Bundle)
 */

export interface ArtifactSpecialAbility {
  id: string;
  name: string;
  latinName: string;
  description: string;
  effectType: string;
  value: number;
  cooldownRounds: number;
  [key: string]: any;
}

export interface ArtifactRecord {
  id: string;
  name: string;
  latinName: string;
  historicalFigure: string;
  slot: string;
  domain: string;
  rarity: string;
  specialAbility?: ArtifactSpecialAbility;
  description: string;
  [key: string]: any;
}

export const ARTIFACTS: ArtifactRecord[] = [
  {
    "id": "art_lance_longinus",
    "name": "Holy Lance of Longinus",
    "latinName": "Lancea Longini",
    "historicalFigure": "Saint Longinus (Roman Centurion at Golgotha)",
    "slot": "WEAPON_2H",
    "domain": "universal",
    "rarity": "RELIQUIAE",
    "bonusAttack": 5,
    "bonusDefense": 1,
    "bonusRoll": 1,
    "critChance": 25,
    "lifestealPercent": 15,
    "ignoreArmorChance": 35,
    "specialAbility": {
      "id": "lance_bleed",
      "name": "Holy Laceration",
      "latinName": "Vulneratio Sacra",
      "description": "Strikes with celestial fury, dealing 48 damage and inflicting severe arterial bleeding while restoring 15 HP.",
      "effectType": "BLEED",
      "value": 48,
      "cooldownRounds": 3
    },
    "description": "The sanctified iron spearhead of the Roman centurion Longinus. Pierces through any physical barrier, causing agonizing bleeding and siphoning divine vigor."
  },
  {
    "id": "art_true_cross",
    "name": "Fragment of the True Cross",
    "latinName": "Fragmentum Verae Crucis",
    "historicalFigure": "Saint Helena (Empress Augusta & Mother of Constantine)",
    "slot": "ACCESSORY",
    "domain": "universal",
    "rarity": "RELIQUIAE",
    "bonusAttack": 1,
    "bonusDefense": 5,
    "bonusRoll": 2,
    "damageReductionPercent": 20,
    "specialAbility": {
      "id": "true_cross_miracle",
      "name": "In Hoc Signo Vinces",
      "latinName": "Victoria Divina",
      "description": "Bathes the legions in celestial light, instantly restoring 65 HP and dispelling terror.",
      "effectType": "HEAL",
      "value": 65,
      "cooldownRounds": 4
    },
    "description": "Preserved splinter of the sacred wood recovered by Empress Helena in Jerusalem. Encases the bearer in an impenetrable divine shield and restores vital vitality."
  },
  {
    "id": "art_crown_thorns",
    "name": "Holy Crown of Thorns",
    "latinName": "Corona Spinea",
    "historicalFigure": "The Passion Relic of Jerusalem",
    "slot": "ACCESSORY",
    "domain": "universal",
    "rarity": "RELIQUIAE",
    "bonusAttack": 6,
    "bonusDefense": 0,
    "bonusRoll": 1,
    "critChance": 30,
    "curse": "Cursed Recoil: Piercing spines inflict 6 recoil damage upon the bearer when activated.",
    "specialAbility": {
      "id": "crown_martyrdom",
      "name": "Wrath of Martyrdom",
      "latinName": "Ira Passionis",
      "description": "Unleashes devastating divine retribution for 62 damage against the enemy, suffering 6 recoil HP.",
      "effectType": "CURSE",
      "value": 62,
      "cooldownRounds": 3
    },
    "description": "The circlet of desert jujube thorns bound in beaten electrum wire. Demands blood sacrifice, trading the bearer's vitality for immense destructive vengeance."
  },
  {
    "id": "art_shroud_turin",
    "name": "Holy Shroud of Edessa",
    "latinName": "Mandylion Edessenum",
    "historicalFigure": "King Abgar V of Edessa",
    "slot": "SCROLL",
    "domain": "universal",
    "rarity": "RELIQUIAE",
    "bonusAttack": 0,
    "bonusDefense": 4,
    "bonusRoll": 2,
    "damageReductionPercent": 15,
    "specialAbility": {
      "id": "shroud_resurrect",
      "name": "Shroud of Resurrection",
      "latinName": "Resurrectio Corporis",
      "description": "Unfurls the sacred herringbone cloth to seal fatal wounds, instantly healing 55 HP.",
      "effectType": "HEAL",
      "value": 55,
      "cooldownRounds": 3
    },
    "description": "Ancient Syrian weave bearing the sepia imprint of the divine likeness. Cures poisoned flesh and breathes new life into shattered cohorts."
  },
  {
    "id": "art_seal_solomon",
    "name": "The Seal of Solomon",
    "latinName": "Sigillum Salomonis",
    "historicalFigure": "King Solomon (Master of Mystic Rings)",
    "slot": "RING",
    "domain": "universal",
    "rarity": "RELIQUIAE",
    "bonusAttack": 4,
    "bonusDefense": 3,
    "bonusRoll": 3,
    "curse": "Occult Tax: Consumes +1 solidi per turn in dark tithes.",
    "specialAbility": {
      "id": "solomon_petrify",
      "name": "Turn to Stone",
      "latinName": "In Saxum Verti",
      "description": "Invokes the archaic hexagram seal, petrifying the enemy commander into solid stone for 52 crushing damage.",
      "effectType": "PETRIFY",
      "value": 52,
      "cooldownRounds": 4
    },
    "description": "Brass and iron signet ring engraved with the sacred pentalpha. Binds demons, calms tempests, and turns the flesh and weapons of foes into brittle basalt stone."
  },
  {
    "id": "art_paludamentum_aurelian",
    "name": "Paludamentum of Aurelian",
    "latinName": "Paludamentum Aureliani",
    "historicalFigure": "Emperor Aurelian (Restitutor Orbis)",
    "slot": "ARMOR",
    "domain": "land",
    "rarity": "DIVINUS",
    "bonusAttack": 3,
    "bonusDefense": 5,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "aurelian_rally",
      "name": "Restorer of the World",
      "latinName": "Restitutor Orbis",
      "description": "Rallies Roman banners under the rising sun, restoring 45 HP and bolstering morale.",
      "effectType": "HEAL",
      "value": 45,
      "cooldownRounds": 3
    },
    "description": "The imperial crimson-purple cloak worn by Aurelian as he crushed Zenobia and reunited the shattered empire. Inspires invincible courage across all ranks."
  },
  {
    "id": "art_diadem_constantine",
    "name": "Imperial Diadem of Constantine",
    "latinName": "Diadema Constantini",
    "historicalFigure": "Constantine the Great (First Christian Emperor)",
    "slot": "RING",
    "domain": "universal",
    "rarity": "DIVINUS",
    "bonusAttack": 4,
    "bonusDefense": 3,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "constantine_decree",
      "name": "Imperial Decree",
      "latinName": "Decretum Augusti",
      "description": "Proclaims imperial supremacy, releasing a shockwave of divine authority for 54 damage.",
      "effectType": "DAMAGE",
      "value": 54,
      "cooldownRounds": 3
    },
    "description": "The pearled electrum royal band forged for Constantine's triumph at the Milvian Bridge. Grants sovereign command and unmatched battlefield authority."
  },
  {
    "id": "art_signet_sol",
    "name": "Signet of Sol Invictus",
    "latinName": "Anulus Solis Invicti",
    "historicalFigure": "The Sun Cult of Emperor Aurelian",
    "slot": "RING",
    "domain": "universal",
    "rarity": "DIVINUS",
    "bonusAttack": 4,
    "bonusDefense": 2,
    "bonusRoll": 2,
    "critChance": 25,
    "specialAbility": {
      "id": "sol_flare",
      "name": "Solar Flare",
      "latinName": "Lux Invicta",
      "description": "Ignites a blinding burst of midday solar fire, scorching enemy battle lines for 50 fire damage.",
      "effectType": "FIRE",
      "value": 50,
      "cooldownRounds": 3
    },
    "description": "Heavy gold signet carrying the twelve radiating solar rays of the Unconquered Sun. Blinds enemy archers and sets shields ablaze."
  },
  {
    "id": "art_trident_neptune",
    "name": "Trident of Neptune",
    "latinName": "Tridens Neptuni",
    "historicalFigure": "Neptune / Poseidon (Lord of the Mediterranean Abyss)",
    "slot": "WEAPON_2H",
    "domain": "sea",
    "rarity": "DIVINUS",
    "bonusAttack": 6,
    "bonusDefense": 2,
    "bonusRoll": 1,
    "critChance": 20,
    "specialAbility": {
      "id": "tidal_deluge",
      "name": "Tidal Deluge",
      "latinName": "Diluvium Marinum",
      "description": "Summons a roaring wall of saltwater and sea foam, crushing the enemy fleet for 56 damage.",
      "effectType": "DAMAGE",
      "value": 56,
      "cooldownRounds": 3
    },
    "description": "Three-pronged sea-bronze trident discovered in the sunken ruins off Crete. Controls Mediterranean whirlpools and shatters timber hulls with earthquake force."
  },
  {
    "id": "art_aegis_jupiter",
    "name": "Aegis of Minerva",
    "latinName": "Aegis Minervae",
    "historicalFigure": "Minerva / Athena (Goddess of Strategic War & Wisdom)",
    "slot": "SHIELD",
    "domain": "universal",
    "rarity": "DIVINUS",
    "bonusAttack": 2,
    "bonusDefense": 6,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "gorgon_petrify",
      "name": "Gorgon Petrification",
      "latinName": "Visus Medusae",
      "description": "Unveils the snarling bronze gorgoneion, turning enemy attackers to rigid stone for 50 crushing damage.",
      "effectType": "PETRIFY",
      "value": 50,
      "cooldownRounds": 4
    },
    "description": "Golden circular buckler fringed with living bronze serpents and centering the screaming mask of Medusa. Freezes the hearts and limbs of oncoming attackers into solid stone."
  },
  {
    "id": "art_pharos_prism",
    "name": "Light Prism of Ptolemy",
    "latinName": "Prisma Pharotis",
    "historicalFigure": "Ptolemy II Philadelphus & Sostratus of Cnidus",
    "slot": "ACCESSORY",
    "domain": "sea",
    "rarity": "DIVINUS",
    "bonusAttack": 4,
    "bonusDefense": 2,
    "bonusRoll": 3,
    "specialAbility": {
      "id": "pharos_beam",
      "name": "Beacon Incineration",
      "latinName": "Ignis Pharotis",
      "description": "Channels focused optical sunlight through the Alexandrian prism, burning the foe for 48 fire damage.",
      "effectType": "FIRE",
      "value": 48,
      "cooldownRounds": 3
    },
    "description": "Faceted quartz optic retrieved from the pinnacle of the Lighthouse of Alexandria. Pierces ocean fog and ignites enemy sailcloth across vast horizons."
  },
  {
    "id": "art_emerald_tablet",
    "name": "The Emerald Tablet of Hermes",
    "latinName": "Tabula Smaragdina",
    "historicalFigure": "Hermes Trismegistus (Father of Mediterranean Alchemy)",
    "slot": "SCROLL",
    "domain": "universal",
    "rarity": "DIVINUS",
    "bonusAttack": 4,
    "bonusDefense": 3,
    "bonusRoll": 3,
    "specialAbility": {
      "id": "hermes_transmute",
      "name": "As Above, So Below",
      "latinName": "Sicut Superius",
      "description": "Transmutes enemy kinetic momentum into explosive arcane shock for 52 damage.",
      "effectType": "DAMAGE",
      "value": 52,
      "cooldownRounds": 3
    },
    "description": "A solid slab of crystalline green beryl inscribed with cryptic Phoenician alchemical formulas. Bends the physical elements to the bearer's iron will."
  },
  {
    "id": "art_greek_fire_siphon",
    "name": "Siphon of Callinicus",
    "latinName": "Sipho Callinici",
    "historicalFigure": "Callinicus of Heliopolis (Architect of Greek Fire)",
    "slot": "WEAPON_2H",
    "domain": "sea",
    "rarity": "DIVINUS",
    "bonusAttack": 6,
    "bonusDefense": 0,
    "bonusRoll": 1,
    "critChance": 20,
    "specialAbility": {
      "id": "greek_fire_jet",
      "name": "Greek Fire Jet",
      "latinName": "Flamma Graeca",
      "description": "Sprays pressurized naphtha and quicklime, engulfing enemy ships in inextinguishable flames for 54 fire damage.",
      "effectType": "FIRE",
      "value": 54,
      "cooldownRounds": 3
    },
    "description": "Cast bronze dragon-head nozzle mounted on a bronze force pump. Projects boiling liquid bitumen that burns even upon the surface of the sea."
  },
  {
    "id": "art_byzantine_pyrophoros",
    "name": "Pyrophoros Projector of Proclus",
    "latinName": "Pyrophorus Procli",
    "historicalFigure": "Proclus the Philosopher & Neoplatonist Engineer",
    "slot": "ACCESSORY",
    "domain": "universal",
    "rarity": "DIVINUS",
    "bonusAttack": 5,
    "bonusDefense": 1,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "proclus_flame",
      "name": "Sulfur Firestorm",
      "latinName": "Tempestas Ignis",
      "description": "Hurls pressurized ceramic grenades of sulfur and pitch, dealing 50 fiery blast damage.",
      "effectType": "FIRE",
      "value": 50,
      "cooldownRounds": 3
    },
    "description": "Ornate brass pressure cylinder sealed with lead gaskets. Discharges volatile incendiary compounds that consume enemy fortifications in blistering flame."
  },
  {
    "id": "art_lorica_plumata",
    "name": "Feathered Lorica of Aurelian",
    "latinName": "Lorica Plumata Aureliani",
    "historicalFigure": "Emperor Aurelian (The Sun Emperor)",
    "slot": "ARMOR",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 2,
    "bonusDefense": 5,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "plumata_shield",
      "name": "Aegis of the Sun",
      "latinName": "Aegis Solis",
      "description": "Deflects incoming missile volleys with feathered iron scales, erecting a 42 point defensive shield.",
      "effectType": "SHIELD",
      "value": 42,
      "cooldownRounds": 3
    },
    "description": "Exquisite armor combining interlocking ringmail with miniature feathered iron scales. Worn by Roman cavalry officers to turn aside both arrows and thrusting spears."
  },
  {
    "id": "art_scutum_praetorian",
    "name": "Scutum of Horatius Cocles",
    "latinName": "Scutum Horatii",
    "historicalFigure": "Horatius Cocles (Hero of the Sublician Bridge)",
    "slot": "SHIELD",
    "domain": "land",
    "rarity": "PRAECLARUS",
    "bonusAttack": 1,
    "bonusDefense": 5,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "horatius_wall",
      "name": "Bridgehead Bulwark",
      "latinName": "Murus Pontis",
      "description": "Holds the breach against overwhelming odds, constructing an impenetrable 44 point defensive barrier.",
      "effectType": "SHIELD",
      "value": 44,
      "cooldownRounds": 3
    },
    "description": "Heavy rectangular curved plywood shield bound in rawhide and riveted with iron. Commemorates Horatius standing alone against the Etruscan host."
  },
  {
    "id": "art_gladius_hispaniensis",
    "name": "Gladius of Julius Caesar",
    "latinName": "Gladius Divi Iulii",
    "historicalFigure": "Gaius Julius Caesar (Conqueror of Gaul & Dictator)",
    "slot": "WEAPON_1H",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 5,
    "bonusDefense": 1,
    "bonusRoll": 2,
    "critChance": 25,
    "ignoreArmorChance": 35,
    "specialAbility": {
      "id": "caesar_thrust",
      "name": "Veni Vidi Vici",
      "latinName": "Ictus Caesaris",
      "description": "A flawless tactical thrust that pierces armor for 48 damage and demoralizes the enemy line.",
      "effectType": "DAMAGE",
      "value": 48,
      "cooldownRounds": 3
    },
    "description": "Toledo-forged Spanish sword carried by Caesar from the siege of Alesia to the plains of Pharsalus. Balanced for lethal stabbing within close melee."
  },
  {
    "id": "art_augustus_bulla",
    "name": "Golden Bulla of Young Augustus",
    "latinName": "Bulla Divi Augusti",
    "historicalFigure": "Octavian / Caesar Augustus",
    "slot": "RING",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 1,
    "bonusDefense": 4,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "augustus_ward",
      "name": "Apotheosis Ward",
      "latinName": "Tutela Divina",
      "description": "Invokes Julian ancestral protection, generating a 38 point defensive ward.",
      "effectType": "SHIELD",
      "value": 38,
      "cooldownRounds": 3
    },
    "description": "Hollow gold locket worn around the neck of boy Octavian before he donned the toga virilis. Imbued with imperial destiny and divine favor."
  },
  {
    "id": "art_spartan_dory",
    "name": "Dory of King Leonidas",
    "latinName": "Dory Leonidou",
    "historicalFigure": "King Leonidas I of Sparta (Thermopylae)",
    "slot": "WEAPON_2H",
    "domain": "land",
    "rarity": "PRAECLARUS",
    "bonusAttack": 4,
    "bonusDefense": 3,
    "bonusRoll": 1,
    "critChance": 15,
    "specialAbility": {
      "id": "spartan_thrust",
      "name": "Molon Labe",
      "latinName": "Ictus Spartanus",
      "description": "Impales the enemy vanguard with an unyielding spear thrust for 44 piercing damage.",
      "effectType": "DAMAGE",
      "value": 44,
      "cooldownRounds": 3
    },
    "description": "Eight-foot cornel-wood spear with leaf-shaped bronze head and four-sided iron butt-spike (sauroter). Held the narrow pass against the Persian Empire."
  },
  {
    "id": "art_syrian_composite_bow",
    "name": "Bow of Philoctetes",
    "latinName": "Arcus Philoctetae",
    "historicalFigure": "Philoctetes & Heracles (The Archer of Troy)",
    "slot": "WEAPON_2H",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 4,
    "bonusDefense": 0,
    "bonusRoll": 2,
    "critChance": 35,
    "specialAbility": {
      "id": "hydra_bleed",
      "name": "Hydra Venom Bleed",
      "latinName": "Venenum Hydrae",
      "description": "Fires an arrow steeped in virulent hydra venom, dealing 42 damage and causing deep arterial bleeding.",
      "effectType": "BLEED",
      "value": 42,
      "cooldownRounds": 3
    },
    "description": "Laminated horn, wood, and sinew recurve bow gifted by dying Heracles. Its arrows never miss and leave weeping, necrotic wounds."
  },
  {
    "id": "art_boudicca_scythe",
    "name": "Chariot Scythe of Boudicca",
    "latinName": "Falx Boudiccae",
    "historicalFigure": "Queen Boudicca of the Iceni",
    "slot": "WEAPON_2H",
    "domain": "land",
    "rarity": "PRAECLARUS",
    "bonusAttack": 5,
    "bonusDefense": 0,
    "bonusRoll": 0,
    "critChance": 30,
    "specialAbility": {
      "id": "boudicca_reap",
      "name": "Whirlwind Reaping",
      "latinName": "Messis Cruenta",
      "description": "Reaps through enemy formations like a spinning wheel blade, tearing flesh for 46 bleeding damage.",
      "effectType": "BLEED",
      "value": 46,
      "cooldownRounds": 3
    },
    "description": "Hardened curved iron blade bolted to the axle of a British war chariot. Dismembers infantry lines and leaves a trail of crimson carnage."
  },
  {
    "id": "art_gladiator_sica",
    "name": "Sica of Spartacus",
    "latinName": "Sica Spartaci",
    "historicalFigure": "Spartacus (Thracian Gladiator & Rebel Leader)",
    "slot": "WEAPON_1H",
    "domain": "land",
    "rarity": "PRAECLARUS",
    "bonusAttack": 4,
    "bonusDefense": 1,
    "bonusRoll": 1,
    "critChance": 25,
    "ignoreArmorChance": 40,
    "specialAbility": {
      "id": "sica_lacerate",
      "name": "Arena Laceration",
      "latinName": "Laceratio Arenae",
      "description": "Hooks around enemy shields to slice tendons, inflicting 40 arterial bleed damage.",
      "effectType": "BLEED",
      "value": 40,
      "cooldownRounds": 2
    },
    "description": "Curved Thracian dagger designed to reach around legionary scuta shields. Symbolizes the fury of the gladiators who broke Rome's legions in Campania."
  },
  {
    "id": "art_dacian_draco_standard",
    "name": "Draco Standard of Decebalus",
    "latinName": "Draco Dacicus",
    "historicalFigure": "King Decebalus of Dacia (Nemesis of Trajan)",
    "slot": "SHIELD",
    "domain": "land",
    "rarity": "PRAECLARUS",
    "bonusAttack": 3,
    "bonusDefense": 3,
    "bonusRoll": 2,
    "critChance": 15,
    "specialAbility": {
      "id": "draco_howl",
      "name": "Howl of the Draco",
      "latinName": "Ululatus Draconis",
      "description": "Wind screams through the bronze wolf jaws, rattling enemy composure for 40 terror damage.",
      "effectType": "DAMAGE",
      "value": 40,
      "cooldownRounds": 2
    },
    "description": "Hollow bronze wolf head with open fangs mounted on a pole with a fluttering crimson silk tube. Howls in the mountain winds, striking dread into Roman hearts."
  },
  {
    "id": "art_cataphract_scale",
    "name": "Scale Barding of Shapur I",
    "latinName": "Lorica Draconis Sassanica",
    "historicalFigure": "Shapur I (King of Kings of the Sasanian Empire)",
    "slot": "ARMOR",
    "domain": "land",
    "rarity": "PRAECLARUS",
    "bonusAttack": 2,
    "bonusDefense": 5,
    "bonusRoll": 0,
    "specialAbility": {
      "id": "iron_juggernaut",
      "name": "Iron Juggernaut",
      "latinName": "Impetus Ferreus",
      "description": "Locks dense iron scales against kinetic shock, raising a 42 point bulwark.",
      "effectType": "SHIELD",
      "value": 42,
      "cooldownRounds": 3
    },
    "description": "Thick overlapping bronze and iron scale mail designed for royal Persian armored horsemen. Completely deflects javelins and arrows."
  },
  {
    "id": "art_elephant_tusk_shield",
    "name": "Ivory Shield of Pyrrhus",
    "latinName": "Clipeus Epirotes",
    "historicalFigure": "King Pyrrhus of Epirus (Victor of Heraclea)",
    "slot": "SHIELD",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 2,
    "bonusDefense": 4,
    "bonusRoll": 0,
    "specialAbility": {
      "id": "elephant_charge",
      "name": "War Elephant Trample",
      "latinName": "Impetus Elephantorum",
      "description": "Drives spiked ivory tusks forward, crushing enemy ranks for 38 heavy damage.",
      "effectType": "DAMAGE",
      "value": 38,
      "cooldownRounds": 3
    },
    "description": "Massive round shield rimmed with polished North African war elephant tusks. Used by Epirote guards to break the charges of Roman maniples."
  },
  {
    "id": "art_tolosa_gold",
    "name": "Cursed Gold of Tolosa",
    "latinName": "Aurum Tolosanum",
    "historicalFigure": "Quintus Servilius Caepio (Sacker of the Sacred Lakes)",
    "slot": "RING",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 6,
    "bonusDefense": -2,
    "bonusRoll": 2,
    "critChance": 25,
    "curse": "Cursed Hubris: -2 Defense penalty from the ancient wrath of Apollo.",
    "specialAbility": {
      "id": "curse_delphi",
      "name": "Curse of Delphi",
      "latinName": "Maledictio Tolosana",
      "description": "Unleashes the dark fury of despoiled temples for 56 damage, at the cost of 5 recoil damage.",
      "effectType": "CURSE",
      "value": 56,
      "cooldownRounds": 3
    },
    "description": "Sacred Celtic gold bullion pillaged from the sacred lakes of Toulouse. Bestows immense ferocious combat power at the cost of the bearer's defense and stamina."
  },
  {
    "id": "art_antonine_itinerary",
    "name": "Itinerary of Emperor Antoninus",
    "latinName": "Itinerarium Antonini",
    "historicalFigure": "Emperor Antoninus Pius (Architect of Imperial Highways)",
    "slot": "SCROLL",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 1,
    "bonusDefense": 3,
    "bonusRoll": 3,
    "specialAbility": {
      "id": "antonine_roads",
      "name": "Imperial Logistics",
      "latinName": "Logistica Militaris",
      "description": "Coordinates paved highway logistics, bolstering cohorts with 34 shield and fresh provisions.",
      "effectType": "SHIELD",
      "value": 34,
      "cooldownRounds": 2
    },
    "description": "Master survey recording the distances, post-stations, and forts along every Roman military road across Britannia, Gaul, Hispania, and the Levant."
  },
  {
    "id": "art_lorica_segmentata",
    "name": "Imperial Lorica of Trajan",
    "latinName": "Lorica Traiani",
    "historicalFigure": "Emperor Trajan (Optimus Princeps)",
    "slot": "ARMOR",
    "domain": "land",
    "rarity": "PRAECLARUS",
    "bonusAttack": 1,
    "bonusDefense": 5,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "trajan_discipline",
      "name": "Iron Discipline",
      "latinName": "Disciplina Traiani",
      "description": "Locks the legion in an immovable wall of steel, providing 38 shield.",
      "effectType": "SHIELD",
      "value": 38,
      "cooldownRounds": 3
    },
    "description": "Articulated iron girth hoops fastened with internal leather straps and brass buckle hinges. The iconic armor worn during Trajan's conquest of Dacia."
  },
  {
    "id": "art_commentarii_caesar",
    "name": "Commentaries of Julius Caesar",
    "latinName": "Commentarii de Bello Gallico",
    "historicalFigure": "Gaius Julius Caesar (The Roman Statesman & Historian)",
    "slot": "SCROLL",
    "domain": "universal",
    "rarity": "PRAECLARUS",
    "bonusAttack": 3,
    "bonusDefense": 2,
    "bonusRoll": 3,
    "specialAbility": {
      "id": "caesar_strategy",
      "name": "Tactical Flanking",
      "latinName": "Motus Caesaris",
      "description": "Executes Caesar's lightning flanking maneuvers, dealing 44 precision damage.",
      "effectType": "DAMAGE",
      "value": 44,
      "cooldownRounds": 3
    },
    "description": "Seven rolls of fine Alexandrian papyrus containing Caesar's firsthand tactical notes from the Gallic campaigns. A masterclass in speed, siegecraft, and decisive command."
  },
  {
    "id": "art_greek_astrolabe",
    "name": "Astrolabe of Hipparchus",
    "latinName": "Astrolabium Nicaeense",
    "historicalFigure": "Hipparchus of Nicaea (Founder of Trigonometry)",
    "slot": "ACCESSORY",
    "domain": "sea",
    "rarity": "PRAECLARUS",
    "bonusAttack": 2,
    "bonusDefense": 2,
    "bonusRoll": 4,
    "specialAbility": {
      "id": "hipparchus_navigate",
      "name": "Celestial Precision",
      "latinName": "Directio Astrorum",
      "description": "Calculates precise celestial arcs, striking enemy vulnerabilities for 40 damage.",
      "effectType": "DAMAGE",
      "value": 40,
      "cooldownRounds": 2
    },
    "description": "Graduated bronze astronomical instrument featuring a revolving rete of Mediterranean star pointers. Unlocks unerring night navigation and artillery precision."
  },
  {
    "id": "art_rostrum_carthage",
    "name": "Naval Rostrum of Gaius Duilius",
    "latinName": "Rostrum Duilii",
    "historicalFigure": "Consul Gaius Duilius (Victor of Mylae)",
    "slot": "WEAPON_2H",
    "domain": "sea",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 4,
    "bonusDefense": 2,
    "bonusRoll": 0,
    "critChance": 25,
    "specialAbility": {
      "id": "rostrum_ram",
      "name": "Rammed Prow Crush",
      "latinName": "Fractura Rostri",
      "description": "Drives the bronze underwater beak into enemy hulls for 42 crushing naval damage.",
      "effectType": "DAMAGE",
      "value": 42,
      "cooldownRounds": 3
    },
    "description": "Triple-finned bronze naval ram salvaged from a Carthaginian quinquereme. Mounted on the Columna Rostrata in the Roman Forum to honor naval supremacy."
  },
  {
    "id": "art_corvus_bridge",
    "name": "Boarding Corvus of Duilius",
    "latinName": "Corvus Mylarum",
    "historicalFigure": "Gaius Duilius & Roman Naval Architects",
    "slot": "ACCESSORY",
    "domain": "sea",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 3,
    "bonusDefense": 2,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "corvus_drop",
      "name": "Raven's Beak Impale",
      "latinName": "Ictus Corvi",
      "description": "Drops the iron spike to pin the enemy vessel, enabling legionnaires to swarm aboard for 38 damage.",
      "effectType": "DAMAGE",
      "value": 38,
      "cooldownRounds": 2
    },
    "description": "Thirty-six foot boarding gangway fitted with a massive downward iron beak. Turned sea battles into infantry melees, crushing Carthage at Mylae."
  },
  {
    "id": "art_syracusan_mirror",
    "name": "Burning Mirror of Archimedes",
    "latinName": "Speculum Archimedeum",
    "historicalFigure": "Archimedes of Syracuse (Master of Geometric Siegecraft)",
    "slot": "SHIELD",
    "domain": "sea",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 3,
    "bonusDefense": 3,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "archimedes_burn",
      "name": "Solar Convergence",
      "latinName": "Ignis Solaris",
      "description": "Focuses Mediterranean sun rays into a searing beam, setting sails ablaze for 44 fire damage.",
      "effectType": "FIRE",
      "value": 44,
      "cooldownRounds": 3
    },
    "description": "Parabolic hexagonal mirror of polished bronze and silver. Used during the siege of Syracuse to set Roman galley sails on fire from the city ramparts."
  },
  {
    "id": "art_sibylline_leaves",
    "name": "Sibylline Books of Prophecy",
    "latinName": "Libri Sibyllini",
    "historicalFigure": "The Cumaean Sibyl & King Tarquin the Proud",
    "slot": "SCROLL",
    "domain": "universal",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 1,
    "bonusDefense": 3,
    "bonusRoll": 3,
    "specialAbility": {
      "id": "sibyl_ward",
      "name": "Prophetic Foresight",
      "latinName": "Prodigium Deorum",
      "description": "Interprets divine omens to anticipate enemy blows, generating 36 shield.",
      "effectType": "SHIELD",
      "value": 36,
      "cooldownRounds": 3
    },
    "description": "Sacred parchment rolls of Greek hexameters preserved in stone chests beneath the Capitoline Temple of Jupiter. Consulted by the Senate only in times of direst peril."
  },
  {
    "id": "art_philosopher_scroll",
    "name": "Meditations of Marcus Aurelius",
    "latinName": "Meditationes Aurelii",
    "historicalFigure": "Emperor Marcus Aurelius (The Stoic Emperor)",
    "slot": "SCROLL",
    "domain": "universal",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 1,
    "bonusDefense": 4,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "stoic_calm",
      "name": "Stoic Imperturbability",
      "latinName": "Aequanimitas",
      "description": "Masters fear and pain through iron will, instantly restoring 40 HP.",
      "effectType": "HEAL",
      "value": 40,
      "cooldownRounds": 3
    },
    "description": "Private Greek philosophical reflections recorded in military tents along the frozen Danubian frontier. Hardens the commander against fear and despair."
  },
  {
    "id": "art_gallic_chainmail",
    "name": "Lorica Hamata of Vercingetorix",
    "latinName": "Lorica Hamata Arverna",
    "historicalFigure": "Vercingetorix (Chieftain of the Arverni)",
    "slot": "ARMOR",
    "domain": "universal",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 1,
    "bonusDefense": 3,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "hamata_deflect",
      "name": "Ringmail Deflection",
      "latinName": "Deflexio Ferrea",
      "description": "Interlocking iron rings absorb cutting blows, absorbing 30 points of damage.",
      "effectType": "SHIELD",
      "value": 30,
      "cooldownRounds": 2
    },
    "description": "Iron chainmail shirt made from alternating rows of punched solid washers and riveted rings with doubled shoulder guards. Mastered by Celtic ironmongers."
  },
  {
    "id": "art_falcata_hispania",
    "name": "Falcata of Hannibal Barca",
    "latinName": "Falcata Barcae",
    "historicalFigure": "Hannibal Barca (Commander of Carthage)",
    "slot": "WEAPON_1H",
    "domain": "land",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 4,
    "bonusDefense": 0,
    "bonusRoll": 1,
    "critChance": 30,
    "specialAbility": {
      "id": "falcata_cleave",
      "name": "Cannae Laceration",
      "latinName": "Caedes Cannensis",
      "description": "A forward-weighted downward chop that inflicts severe bleeding for 40 damage.",
      "effectType": "BLEED",
      "value": 40,
      "cooldownRounds": 2
    },
    "description": "Iberian curved steel sword featuring an asymmetrical weight distribution and a stallion-head bronze pommel. Cleaves through bronze helms and shields."
  },
  {
    "id": "art_corinthian_helm",
    "name": "Corinthian Helm of Miltiades",
    "latinName": "Galea Marathonis",
    "historicalFigure": "Miltiades the Younger (Victor of Marathon)",
    "slot": "ARMOR",
    "domain": "universal",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 1,
    "bonusDefense": 3,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "corinthian_dread",
      "name": "Bronze Visage",
      "latinName": "Terror Aeneus",
      "description": "The impassive bronze gaze paralyzes enemy resolve, inflicting 34 shock damage.",
      "effectType": "DAMAGE",
      "value": 34,
      "cooldownRounds": 2
    },
    "description": "Single-sheet hammered bronze helmet covering the entire face with narrow almond eye slits and a prominent nose guard. Dedication offered at Olympia."
  },
  {
    "id": "art_carthaginian_baal_amulet",
    "name": "Sun Disk of Baal-Hammon",
    "latinName": "Amuletum Phoenicium",
    "historicalFigure": "Hamilcar Barca & Punic High Priests",
    "slot": "RING",
    "domain": "sea",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 3,
    "bonusDefense": 2,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "baal_heal",
      "name": "Punic Resurgence",
      "latinName": "Renovatio Punica",
      "description": "Invokes ancient Phoenician vows, reviving fleet crew and healing 36 HP.",
      "effectType": "HEAL",
      "value": 36,
      "cooldownRounds": 3
    },
    "description": "Gold crescent moon embracing an electrum solar disk with red carnelian inlays. Worn by Punic sea captains embarking from the circular military port of Carthage."
  },
  {
    "id": "art_ring_hannibal",
    "name": "Poison Signet of Hannibal",
    "latinName": "Anulus Veneni Hannibalis",
    "historicalFigure": "Hannibal Barca (The Lion of Carthage)",
    "slot": "RING",
    "domain": "universal",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 5,
    "bonusDefense": -1,
    "bonusRoll": 1,
    "critChance": 30,
    "lifestealPercent": 20,
    "curse": "Poisoner's Penalty: -1 Defense penalty due to volatile venom hollows.",
    "specialAbility": {
      "id": "vampire_venom",
      "name": "Vampiric Venom",
      "latinName": "Haustus Sanguinis",
      "description": "Siphons the lifeforce of the enemy commander, dealing 44 damage and healing 33 HP.",
      "effectType": "VAMPIRIC",
      "value": 44,
      "cooldownRounds": 3
    },
    "description": "Heavy iron signet with a concealed carnelian bezel concealing lethal Bithynian venom. Hannibal wore it until his final hour rather than fall alive into Roman hands."
  },
  {
    "id": "art_alexandrian_dioptra",
    "name": "Dioptra of Hero of Alexandria",
    "latinName": "Dioptra Alexandrina",
    "historicalFigure": "Hero of Alexandria (The Geometer & Mechanician)",
    "slot": "ACCESSORY",
    "domain": "universal",
    "rarity": "ILLUSTRIS",
    "bonusAttack": 3,
    "bonusDefense": 1,
    "bonusRoll": 3,
    "critChance": 25,
    "specialAbility": {
      "id": "hero_ballistics",
      "name": "Ballistic Precision",
      "latinName": "Ictus Geometricus",
      "description": "Computes exact parabolic trajectories to deal 38 precision damage.",
      "effectType": "DAMAGE",
      "value": 38,
      "cooldownRounds": 2
    },
    "description": "Brass sighting disk with graduated azimuth angles, geared cog wheels, and level vials. Revolutionized Mediterranean surveying, tunnel excavation, and ballista sights."
  },
  {
    "id": "art_merchants_ledger",
    "name": "Tyrian Trade Ledger",
    "latinName": "Tabulae Tyriorum",
    "historicalFigure": "The Merchant Fleet Guild of Tyre and Leptis Magna",
    "slot": "SCROLL",
    "domain": "sea",
    "rarity": "INSIGNIS",
    "bonusAttack": 1,
    "bonusDefense": 2,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "mercenary_bribe",
      "name": "Mercenary Contract",
      "latinName": "Auxilium Emptum",
      "description": "Deploys sudden mercenary reserves to absorb 28 points of incoming enemy damage.",
      "effectType": "SHIELD",
      "value": 28,
      "cooldownRounds": 2
    },
    "description": "Bound papyrus account book detailing purple dye shipments, silver trade weights, and mercenary hiring terms across the Levant and Western Mediterranean."
  },
  {
    "id": "art_iron_cuirass",
    "name": "Muscled Cuirass of Mars Ultor",
    "latinName": "Thorax Martis Ultoris",
    "historicalFigure": "Mars Ultor (Mars the Avenger)",
    "slot": "ARMOR",
    "domain": "land",
    "rarity": "INSIGNIS",
    "bonusAttack": 2,
    "bonusDefense": 3,
    "bonusRoll": 0,
    "specialAbility": {
      "id": "mars_riposte",
      "name": "Avenger's Riposte",
      "latinName": "Ultio Martis",
      "description": "Retaliates against enemy aggression with a punishing blow for 32 damage.",
      "effectType": "DAMAGE",
      "value": 32,
      "cooldownRounds": 2
    },
    "description": "Cast bronze and hammered iron cuirass sculpted with anatomical chest muscles, nipples, and navel. Worn by Roman tribunes and legates."
  },
  {
    "id": "art_veteran_scutum",
    "name": "Scutum of Legio X Equestris",
    "latinName": "Scutum Legionis X",
    "historicalFigure": "Legio X Equestris (Caesar's Elite Praetorian Legion)",
    "slot": "SHIELD",
    "domain": "land",
    "rarity": "INSIGNIS",
    "bonusAttack": 1,
    "bonusDefense": 3,
    "bonusRoll": 0,
    "specialAbility": {
      "id": "veteran_slam",
      "name": "Shield Wall Slam",
      "latinName": "Impulsus Scuti",
      "description": "Drives the iron central boss into the enemy line for 28 damage.",
      "effectType": "DAMAGE",
      "value": 28,
      "cooldownRounds": 2
    },
    "description": "Curved wood and linen scutum showing sword notches and spear scars from the Rhine to the Nile. Emblazoned with the bull emblem of the Tenth Legion."
  },
  {
    "id": "art_numidian_javelins",
    "name": "Javelins of King Masinissa",
    "latinName": "Iacula Masinissae",
    "historicalFigure": "King Masinissa of Numidia",
    "slot": "WEAPON_1H",
    "domain": "universal",
    "rarity": "INSIGNIS",
    "bonusAttack": 3,
    "bonusDefense": 0,
    "bonusRoll": 1,
    "critChance": 20,
    "specialAbility": {
      "id": "numidian_volley",
      "name": "Skirmish Volley",
      "latinName": "Emissio Iaculorum",
      "description": "Flings a rapid barrage of barbed javelins for 30 ranged damage.",
      "effectType": "DAMAGE",
      "value": 30,
      "cooldownRounds": 2
    },
    "description": "Slender ash reed javelins with barbed iron points used by Numidian light horsemen to harass and break heavy infantry."
  },
  {
    "id": "art_worn_pugio",
    "name": "Pugio of Marcus Brutus",
    "latinName": "Pugio Bruti",
    "historicalFigure": "Marcus Junius Brutus (Ides of March)",
    "slot": "WEAPON_1H",
    "domain": "universal",
    "rarity": "VULGARIS",
    "bonusAttack": 2,
    "bonusDefense": 0,
    "bonusRoll": 2,
    "critChance": 35,
    "specialAbility": {
      "id": "brutus_stab",
      "name": "Ides of March",
      "latinName": "Idus Martiae",
      "description": "A swift assassin thrust slipped past armor for 32 bleeding damage.",
      "effectType": "BLEED",
      "value": 32,
      "cooldownRounds": 2
    },
    "description": "Wide double-edged leaf blade dagger with damascened silver sheath. Kept concealed beneath senatorian togas."
  },
  {
    "id": "art_wooden_parma",
    "name": "Parma of Arminius",
    "latinName": "Parma Cherusca",
    "historicalFigure": "Arminius of the Cherusci",
    "slot": "SHIELD",
    "domain": "universal",
    "rarity": "VULGARIS",
    "bonusAttack": 0,
    "bonusDefense": 2,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "parma_parry",
      "name": "Auxiliary Deflection",
      "latinName": "Defensio Parmae",
      "description": "Catches enemy weapon strikes cleanly, providing 24 shield.",
      "effectType": "SHIELD",
      "value": 24,
      "cooldownRounds": 2
    },
    "description": "Round wooden buckler reinforced with iron boss and rawhide rim. Used by Germanic auxiliary cavalry serving Rome."
  },
  {
    "id": "art_tunic_centurion",
    "name": "Subarmalis of Centurion Pullo",
    "latinName": "Subarmalis Titi Pullonis",
    "historicalFigure": "Titus Pullo (Heroic Centurion of Legio XI)",
    "slot": "ARMOR",
    "domain": "universal",
    "rarity": "VULGARIS",
    "bonusAttack": 1,
    "bonusDefense": 1,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "centurion_grit",
      "name": "Centurion's Grit",
      "latinName": "Fortitudo Centurionis",
      "description": "Rallies tired men through stubborn courage, restoring 26 HP.",
      "effectType": "HEAL",
      "value": 26,
      "cooldownRounds": 2
    },
    "description": "Heavy quilted linen and woolen undergarment padded with horsehair and finished with leather shoulder pteruges."
  },
  {
    "id": "art_bronze_signet",
    "name": "Signet of the Plebeian Tribune",
    "latinName": "Anulus Tribuni Plebis",
    "historicalFigure": "Tiberius & Gaius Gracchus (Tribunes of the People)",
    "slot": "RING",
    "domain": "universal",
    "rarity": "VULGARIS",
    "bonusAttack": 0,
    "bonusDefense": 2,
    "bonusRoll": 1,
    "specialAbility": {
      "id": "tribune_ward",
      "name": "Tribunician Inviolability",
      "latinName": "Sacrosanctitas",
      "description": "Invokes plebeian legal inviolability, erecting 26 shield.",
      "effectType": "SHIELD",
      "value": 26,
      "cooldownRounds": 2
    },
    "description": "Simple cast bronze signet ring worn by Roman tribunes as a symbol of their sworn constitutional inviolability (sacrosanctitas)."
  },
  {
    "id": "art_legion_roster",
    "name": "Laterculum of Trajan",
    "latinName": "Laterculum Traiani",
    "historicalFigure": "Emperor Trajan & Imperial Staff",
    "slot": "SCROLL",
    "domain": "universal",
    "rarity": "VULGARIS",
    "bonusAttack": 1,
    "bonusDefense": 1,
    "bonusRoll": 2,
    "specialAbility": {
      "id": "muster_cohort",
      "name": "Reserve Muster",
      "latinName": "Cohortis Evocatio",
      "description": "Summons veteran reservists to reinforce the formation for 24 shield.",
      "effectType": "SHIELD",
      "value": 24,
      "cooldownRounds": 2
    },
    "description": "Imperial papyrus muster roll detailing legionary cohorts, centuries, pay records, and tactical reserves across all Roman provinces."
  }
];
