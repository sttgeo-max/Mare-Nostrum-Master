const fs = require('fs');
const path = require('path');

console.log("=== DEFINING MISSING MYTHIC UNIT RENDER HELPERS (render2DSeaMonster & render2DSiren) ===");

const files = ['public/assets/index-V33.js', 'public/assets/index-V37.js', 'dist/assets/index-V33.js', 'dist/assets/index-V37.js'];

const helperDefinitions = `
const render2DSeaMonster = (x, y, isPlayer = false, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return typeof renderMasterwork2DMedallionUnit === "function"
    ? renderMasterwork2DMedallionUnit(x, y, isPlayer, "flagship", faction || "mythic", hpPct, animState, scale * 1.35, isAttacking, isHit, false, "Kraken", 3, "ship")
    : null;
};
const render2DSiren = (x, y, isPlayer = false, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return typeof renderMasterwork2DMedallionUnit === "function"
    ? renderMasterwork2DMedallionUnit(x, y, isPlayer, "escortA", faction || "greek", hpPct, animState, scale * 1.15, isAttacking, isHit, false, "Siren", 2, "ship")
    : null;
};
`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  if (!code.includes("const render2DSeaMonster")) {
    let pTarget = code.indexOf("const render2DPoseidonAvatar");
    if (pTarget !== -1) {
      code = code.replace("const render2DPoseidonAvatar", helperDefinitions + "\nconst render2DPoseidonAvatar");
      fs.writeFileSync(file, code, 'utf8');
      console.log("SUCCESS: Defined render2DSeaMonster & render2DSiren in", file);
    } else {
      console.warn("Could not find render2DPoseidonAvatar target in", file);
    }
  } else {
    console.log("render2DSeaMonster already defined in", file);
  }
});

// Sync master bundle across all version files
const syncScript = path.join(__dirname, 'sync_all_bundle_versions.cjs');
if (fs.existsSync(syncScript)) {
  require(syncScript);
}

console.log("=== COMPLETED MYTHIC UNIT RENDER HELPERS FIX ===");
