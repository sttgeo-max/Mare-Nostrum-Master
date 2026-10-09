const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const startPos = content.indexOf("ux=({player:");
console.log("startPos of ux:", startPos);
if (startPos !== -1) {
  fs.writeFileSync(path.join(__dirname, "arma_full.txt"), content.substring(startPos, startPos + 35000), "utf8");
  console.log("Wrote arma_full.txt");
} else {
  // Let's search for just "ux="
  const candidates = [];
  let pos = -1;
  while ((pos = content.indexOf("ux=", pos + 1)) !== -1) {
    candidates.push(pos);
  }
  console.log("ux= candidates:", candidates);
}
