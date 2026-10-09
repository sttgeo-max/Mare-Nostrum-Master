const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const keywords = ["miss", "MISS", "dodge", "evade"];
for (const keyword of keywords) {
  let pos = 0;
  let count = 0;
  while ((pos = content.indexOf(keyword, pos)) !== -1 && count < 5) {
    console.log(`Match for '${keyword}' at index ${pos}`);
    pos += keyword.length;
    count++;
  }
}
