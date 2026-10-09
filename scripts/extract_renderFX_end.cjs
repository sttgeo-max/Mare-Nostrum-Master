const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const startPos = 2331500;
fs.writeFileSync(
  path.join(__dirname, "combat_renderFX_end.txt"),
  content.substring(startPos, startPos + 8000),
  "utf8"
);
console.log("Wrote combat_renderFX_end.txt");
