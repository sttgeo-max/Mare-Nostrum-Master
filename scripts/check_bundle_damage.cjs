const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V33.js");
if (!fs.existsSync(file)) {
  console.log("index-V33.js does not exist yet. We should run a build first!");
  process.exit(0);
}
const content = fs.readFileSync(file, "utf8");

const p1 = content.indexOf("const renderTokenBattleDamage =");
console.log("renderTokenBattleDamage pos:", p1);
if (p1 !== -1) {
  console.log(content.substring(p1, p1 + 500));
}

const p2 = content.indexOf("const renderFXOverlay =");
console.log("renderFXOverlay pos:", p2);
if (p2 !== -1) {
  console.log(content.substring(p2, p2 + 500));
}
