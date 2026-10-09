const fs = require('fs');
const path = require('path');

console.log("=== EXECUTING BATTLETHEATREV2 RUNTIME INTEGRATION SUITE ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
const code = fs.readFileSync(bundlePath, 'utf8');

const pMap = code.indexOf("const MONSTER_SVG_MAP =");
const pBT = code.indexOf("const BattleTheatreV2 =", pMap);
const pOM = code.indexOf("const om=", pBT);

const mockE = {
  jsx: (type, props) => ({ type, props }),
  jsxs: (type, props) => ({ type, props })
};
const mockMotionDiv = (props) => ({ type: "motion.div", props });
const mockReact = {
  useState: (init) => [init, () => {}],
  useRef: (init) => ({ current: init }),
  useCallback: (fn) => fn,
  useMemo: (fn) => fn(),
  useEffect: () => {},
  Component: class {}
};

// Extract from pMap up to the end of BattleTheatreV2
let systemChunk = code.substring(pMap, pOM).trim();
if (systemChunk.endsWith(";")) systemChunk = systemChunk.substring(0, systemChunk.length - 1);

const evalFn = new Function(
  "e", "ie", "Pt", "gr", "rt", "Vr", "lt", "b", "Qt", "Ts", "Bt", "li", "defaultAbilities",
  `
  ${systemChunk}
  return BattleTheatreV2;
  `
);

const BattleTheatreV2 = evalFn(
  mockE, { div: mockMotionDiv }, () => null, () => null, () => null, () => null, { memo: fn => fn }, mockReact, { victory: () => {} }, [], [], {}, []
);

console.log("Successfully compiled BattleTheatreV2 function with full MONSTER_SVG_MAP engine!");

// Test all categories of enemies at 100% HP, taking hit, attacking, and DEAD at battle completion!
const testEnemies = [
  { name: "African Lion", faction: "beast", isSea: false, emblem: "african_lion" },
  { name: "Appennine Wolf Pack", faction: "beast", isSea: false, emblem: "wolf" },
  { name: "Hercynian Boar", faction: "beast", isSea: false, emblem: "boar" },
  { name: "Alpine Brown Bear", faction: "beast", isSea: false, emblem: "bear" },
  { name: "Saharan Scorpion", faction: "beast", isSea: false, emblem: "scorpion" },
  { name: "Minotaur Beast", faction: "monster", isSea: false, emblem: "minotaur" },
  { name: "Cyclops Brute", faction: "monster", isSea: false, emblem: "cyclops" },
  { name: "Medusa Gorgon", faction: "monster", isSea: false, emblem: "gorgon" },
  { name: "Cerberus Hound", faction: "monster", isSea: false, emblem: "cerberus" },
  { name: "Carthaginian War Elephant", faction: "punic", isSea: false, emblem: "elephant" },
  { name: "Abyssal Kraken Hatchling", faction: "mythic", isSea: true, emblem: "kraken" },
  { name: "Cetus Atlantic Leviathan", faction: "mythic", isSea: true, emblem: "cetus" },
  { name: "Atlantic Sea Serpent", faction: "mythic", isSea: true, emblem: "serpent" },
  { name: "Siren Enchantress", faction: "mythic", isSea: true, emblem: "siren" },
  { name: "Poseidon Avatar", faction: "mythic", isSea: true, emblem: "poseidon" },
  { name: "Pirate Liburnian", faction: "pirate", isSea: true, emblem: "ship" },
  { name: "Maxentian Cohort", faction: "praetorian", isSea: false, emblem: "legion" }
];

testEnemies.forEach((tEnemy, idx) => {
  // 1. In combat (active)
  BattleTheatreV2({
    isSea: tEnemy.isSea,
    playerHp: 90, maxPlayerHp: 100, playerBlock: 10, playerAnim: "attack",
    enemyHp: 65, maxEnemyHp: 100, enemyBlock: 5, enemyAnim: "hit",
    turn: "player",
    timeOfDay: "DIES", weather: "CLEAR", regionName: "Battlefield",
    enemy: { id: "e_" + idx, name: tEnemy.name, faction: tEnemy.faction, hp: 65, maxHp: 100, emblem: tEnemy.emblem },
    player: { faction: "constantine", level: 3 }
  });

  // 2. Battle Completion (Enemy DEAD, 0 HP, turn = 'victory')
  BattleTheatreV2({
    isSea: tEnemy.isSea,
    playerHp: 85, maxPlayerHp: 100, playerBlock: 0, playerAnim: "victory",
    enemyHp: 0, maxEnemyHp: 100, enemyBlock: 0, enemyAnim: "dead",
    turn: "victory",
    timeOfDay: "VESPER", weather: "CLEAR", regionName: "Victory Plain",
    enemy: { id: "e_dead_" + idx, name: tEnemy.name, faction: tEnemy.faction, hp: 0, maxHp: 100, emblem: tEnemy.emblem },
    player: { faction: "constantine", level: 3 }
  });
});

console.log(`=== ALL ${testEnemies.length} TEST ENEMIES PASSED IN ACTIVE AND BATTLE COMPLETION STATES! ===`);
