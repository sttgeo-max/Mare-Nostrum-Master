const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const keywords = [
  "hitFx.map",
  "floatingText.map",
  "spawnFX",
  "spawnText",
  "hitFx"
];

for (const keyword of keywords) {
  let pos = 0;
  let count = 0;
  while ((pos = content.indexOf(keyword, pos)) !== -1 && count < 3) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(content.length, pos + keyword.length + 350);
    console.log(`--- Match for '${keyword}' at index ${pos} ---`);
    console.log(content.substring(start, end));
    console.log("\n");
    pos += keyword.length;
    count++;
  }
}
