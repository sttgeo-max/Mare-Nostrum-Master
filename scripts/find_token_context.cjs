const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const pos = 2304117;
fs.writeFileSync(
  path.join(__dirname, "combat_token_context.txt"),
  content.substring(pos - 3000, pos + 2000),
  "utf8"
);
console.log("Wrote combat_token_context.txt");
