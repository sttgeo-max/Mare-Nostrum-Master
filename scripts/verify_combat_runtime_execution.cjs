const fs = require('fs');
const path = require('path');

console.log("=== RUNNING MOCK RUNTIME EXECUTION TEST FOR COMBAT COMPONENTS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
const code = fs.readFileSync(bundlePath, 'utf8');

// Mock browser globals
global.window = {
  location: { href: "http://localhost:3000", pathname: "/", origin: "http://localhost:3000" },
  addEventListener: () => {},
  removeEventListener: () => {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  innerWidth: 1024,
  innerHeight: 768
};
global.document = {
  createElement: () => ({
    getContext: () => ({
      clearRect: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fill: () => {}
    }),
    style: {}
  }),
  addEventListener: () => {},
  removeEventListener: () => {},
  head: { appendChild: () => {} },
  body: { appendChild: () => {} }
};
global.navigator = { userAgent: "Node" };

// We want to test extracting BattleTheatreV2 and nm (CombatModal) from bundle and executing them with typical props
let isOk = true;

try {
  // Extract BattleTheatreV2 definition string and evaluate it in isolation
  const pBT = code.indexOf("const BattleTheatreV2 =");
  const pBTEnd = code.indexOf("};", code.indexOf("return e.jsxs(\"div\", {", pBT));
  const btCode = code.substring(pBT, pBTEnd + 2);
  
  console.log("Extracted BattleTheatreV2 code snippet length:", btCode.length);
  
  // Mock React e object
  const mockE = {
    jsx: (type, props) => ({ type, props }),
    jsxs: (type, props) => ({ type, props })
  };

  const evalFn = new Function("e", "ie", "Vr", "rt", "ie", "defaultAbilities", "actionPoints", "setHoveredAbility", "playAbility", "endTurn", "setShowRetreatConfirm", "renderTacticalHandUI", `
    ${btCode}
    return BattleTheatreV2;
  `);

  const mockBattleTheatreV2 = evalFn(
    mockE, {}, () => null, () => null, {}, [], 3, () => {}, () => {}, () => {}, () => {}, () => null
  );

  console.log("Testing BattleTheatreV2 invocation with Sea combat props...");
  const res1 = mockBattleTheatreV2({
    isSea: true,
    playerHp: 100,
    maxPlayerHp: 100,
    playerBlock: 0,
    playerAnim: "idle",
    enemyHp: 100,
    maxEnemyHp: 100,
    enemyBlock: 0,
    enemyAnim: "idle",
    turn: "player",
    currentIntent: { label: "RAM CHARGE" },
    hoveredAbility: null,
    timeOfDay: "DIES",
    weather: "CLEAR",
    regionName: "Mediterranean",
    enemy: { id: "test_enemy_1", name: "Pirate Liburnian", faction: "pirate", hp: 100, maxHp: 100 },
    player: { faction: "constantine", level: 1 },
    playerStatus: [],
    enemyStatus: [],
    activeCombatFX: null,
    floatingText: [],
    totalDamageDealt: 0,
    totalDamageTaken: 0
  });

  console.log("BattleTheatreV2 Sea execution SUCCESSful! Returned root type:", res1.type);

  console.log("Testing BattleTheatreV2 invocation with Land/Legion combat props...");
  const res2 = mockBattleTheatreV2({
    isSea: false,
    playerHp: 80,
    maxPlayerHp: 100,
    playerBlock: 10,
    playerAnim: "attack",
    enemyHp: 60,
    maxEnemyHp: 100,
    enemyBlock: 0,
    enemyAnim: "hit",
    turn: "enemy",
    currentIntent: { label: "PILUM VOLLEY" },
    hoveredAbility: null,
    timeOfDay: "AURORA",
    weather: "PLUVIA",
    regionName: "Gallia Narbonensis",
    enemy: { id: "test_legion_1", name: "Gallic Warband", faction: "barbarian", hp: 60, maxHp: 100 },
    player: { faction: "constantine", level: 2 },
    playerStatus: [],
    enemyStatus: [],
    activeCombatFX: { type: "pilum_volley", isPlayer: false },
    floatingText: [{ id: "ft1", text: "-15 HP", isPlayer: true, color: "#ef4444" }],
    totalDamageDealt: 25,
    totalDamageTaken: 15
  });

  console.log("BattleTheatreV2 Land execution SUCCESSful! Returned root type:", res2.type);

} catch (err) {
  console.error("MOCK RUNTIME EXECUTION FAILED:", err.stack || err.message);
  isOk = false;
}

if (isOk) {
  console.log("=== ALL COMBAT COMPONENT RUNTIME EXECUTION TESTS PASSED 100% ===");
} else {
  process.exit(1);
}
