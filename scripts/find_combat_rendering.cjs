const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

// Let's search for some function names or keywords
const keywords = [
  "battleDamage",
  "blood",
  "renderTokenBattleDamage",
  "playAbility",
  "playAbilityCard",
  "playAttackAnimation",
  "combatAction",
  "setCombatAnimation",
  "combatAnimation",
  "combatState"
];

for (const keyword of keywords) {
  let pos = 0;
  let count = 0;
  while ((pos = content.indexOf(keyword, pos)) !== -1 && count < 5) {
    const start = Math.max(0, pos - 200);
    const end = Math.min(content.length, pos + keyword.length + 300);
    console.log(`--- Match for '${keyword}' at index ${pos} ---`);
    console.log(content.substring(start, end));
    console.log("\n");
    pos += keyword.length;
    count++;
  }
}
