const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

let pos = 0;
while ((pos = content.indexOf("renderToken(", pos)) !== -1) {
  const start = Math.max(0, pos - 150);
  const end = Math.min(content.length, pos + 250);
  console.log(`--- Match at ${pos} ---`);
  console.log(content.substring(start, end));
  console.log("\n");
  pos += "renderToken(".length;
}
