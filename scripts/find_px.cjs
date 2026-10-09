const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const results = [];
let pos = -1;
while ((pos = content.indexOf("px=", pos + 1)) !== -1) {
  results.push(pos);
}
console.log("px= occurrences:", results);
for (let r of results) {
  console.log(`Around ${r}:`, content.substring(r - 100, r + 400));
}
