const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "check_fx_overlay_compilation.cjs"), "utf8");
const lines = content.split("\n");
console.log("Lines 80 to 110:");
for (let i = 80; i < 110; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
