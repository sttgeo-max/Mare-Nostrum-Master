const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const startPos = content.indexOf("Mx=({player:t,setPlayer:s");
console.log("startPos of Mx:", startPos);
if (startPos !== -1) {
  // Let's grab the next 45,000 chars to cover the whole Codex (Mx)
  fs.writeFileSync(path.join(__dirname, "codex_full.txt"), content.substring(startPos, startPos + 45000), "utf8");
  console.log("Wrote codex_full.txt");
}
