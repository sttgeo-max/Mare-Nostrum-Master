const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const startPos = 2314000;
fs.writeFileSync(
  path.join(__dirname, "combat_renderFX_rest.txt"),
  content.substring(startPos, startPos + 18000),
  "utf8"
);
console.log("Wrote combat_renderFX_rest.txt");
