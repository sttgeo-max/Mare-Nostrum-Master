const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

// Search for playAbility
const startPos = content.indexOf("const playAbility =");
console.log("startPos of playAbility:", startPos);
if (startPos !== -1) {
  fs.writeFileSync(
    path.join(__dirname, "combat_slice_playAbility.txt"),
    content.substring(startPos, startPos + 30000),
    "utf8"
  );
  console.log("Wrote combat_slice_playAbility.txt");
}

const damagePos = content.indexOf("const renderTokenBattleDamage =");
console.log("damagePos of renderTokenBattleDamage:", damagePos);
if (damagePos !== -1) {
  fs.writeFileSync(
    path.join(__dirname, "combat_slice_battleDamage.txt"),
    content.substring(damagePos, damagePos + 10000),
    "utf8"
  );
  console.log("Wrote combat_slice_battleDamage.txt");
}
