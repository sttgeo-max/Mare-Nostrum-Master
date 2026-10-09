const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

// Search for candidates of "Gx="
const candidates = [];
let pos = -1;
while ((pos = content.indexOf("Gx=", pos + 1)) !== -1) {
  candidates.push(pos);
}
console.log("Gx= candidates:", candidates);

// Let's write the first candidate to treasury_full.txt (usually it's the definition of the component)
const startPos = candidates.find(c => c > 1000000); // component definitions are usually later in the bundle
if (startPos) {
  fs.writeFileSync(path.join(__dirname, "treasury_full.txt"), content.substring(startPos, startPos + 25000), "utf8");
  console.log("Wrote treasury_full.txt from pos", startPos);
}
