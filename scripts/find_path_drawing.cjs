const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// We found De.current is assigned waypoints at 2661840.
// Let's find other places where De.current is referenced in index-V33.js
let idx = 0;
while ((idx = js.indexOf("De.current", idx)) !== -1) {
  console.log(`=== De.current match at ${idx} ===`);
  console.log(js.substring(idx - 150, idx + 350));
  idx += 10;
}
