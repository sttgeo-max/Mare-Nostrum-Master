const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for where activeVoyageRemaining is used to draw lines
let idx = 0;
while ((idx = js.indexOf("activeVoyageRemaining", idx)) !== -1) {
  const context = js.substring(idx - 100, idx + 300);
  if (context.includes("e.jsx") || context.includes("svg") || context.includes("line") || context.includes("path")) {
    console.log(`=== Draw Match at ${idx} ===`);
    console.log(context);
  }
  idx += 15;
}
