const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const startPos = content.indexOf("const spawnFX =");
console.log("startPos of spawnFX:", startPos);
if (startPos !== -1) {
  fs.writeFileSync(
    path.join(__dirname, "combat_spawnFX.txt"),
    content.substring(startPos - 200, startPos + 5000),
    "utf8"
  );
  console.log("Wrote combat_spawnFX.txt");
}
