const fs = require('fs');
const path = require('path');

console.log("=== TESTING COMBAT MODAL INITIALIZATION FOR ALL ENEMIES ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
const code = fs.readFileSync(bundlePath, 'utf8');

// Extract nm / om (CombatModal) function body
const pBT = code.indexOf("const BattleTheatreV2 =");
const pOm = code.indexOf("om=lt.memo(nm)", pBT);
const pNm = code.lastIndexOf("const nm=", pOm);

const nmCode = code.substring(pNm, pOm).trim();
console.log("Extracted CombatModal (nm) code length:", nmCode.length);

const mockE = {
  jsx: (type, props) => ({ type, props }),
  jsxs: (type, props) => ({ type, props })
};

const mockMotionDiv = (props) => ({ type: "motion.div", props });

try {
  const evalFn = new Function(
    "e", "ie", "Pt", "gr", "rt", "Vr", "lt", "b", "Qt", "Ts", "Bt", "li", "defaultAbilities", "BattleTheatreV2",
    `
    ${nmCode}
    return nm;
    `
  );

  const mockReact = {
    useState: (init) => [typeof init === "function" ? init() : init, () => {}],
    useRef: (init) => ({ current: init }),
    useCallback: (fn) => fn,
    useMemo: (fn) => fn(),
    useEffect: () => {},
    Component: class {}
  };

  const CombatModalComponent = evalFn(
    mockE, { div: mockMotionDiv }, () => null, () => null, () => null, () => null, { memo: fn => fn }, mockReact, { victory: () => {} }, [], [], {}, [],
    () => mockE.jsx("div", { id: "mock_theatre" })
  );

  console.log("Successfully compiled CombatModal (nm) component!");

  // Test initiating combat against various enemies
  const testEnemies = [
    { id: "garrison_pons_milvius", name: "Milvian Bridge Garrison", domain: "land", maxHp: 100, hp: 100, attack: 10, defense: 2 },
    { id: "garrison_rome", name: "Roma Castra Praetoria", domain: "land", maxHp: 120, hp: 120, attack: 14, defense: 4 },
    { id: "pirate_liburnian_1", name: "Corsair Liburnian", domain: "sea", maxHp: 80, hp: 80, attack: 8, defense: 1 },
    { id: "maxentius_boss", name: "Emperor Maxentius", domain: "land", maxHp: 250, hp: 250, attack: 20, defense: 8, isBoss: true }
  ];

  testEnemies.forEach((enemy, idx) => {
    console.log(`Test ${idx + 1}: Initiating combat against ${enemy.name} (${enemy.id})...`);
    const res = CombatModalComponent({
      enemy: enemy,
      player: { faction: "constantine", level: 2, solidi: 500, maxLegionHp: 100, legionHp: 100 },
      setPlayer: () => {},
      onClose: () => {},
      isDetachment: true,
      locationName: "Milvian Bridge"
    });
    console.log(`Test ${idx + 1} PASSED! Root type:`, res.type);
  });

  console.log("=== ALL COMBAT MODAL INITIALIZATION TESTS PASSED 100% ===");
} catch (err) {
  console.error("CRITICAL EXCEPTION IN COMBAT MODAL TEST:", err.stack || err.message);
  process.exit(1);
}
