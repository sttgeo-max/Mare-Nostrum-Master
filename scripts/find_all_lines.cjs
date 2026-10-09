const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for strokeWidth or x1 or y1 or strokeLinecap near rendering code
let idx = 0;
while ((idx = js.indexOf("strokeWidth", idx)) !== -1) {
  const context = js.substring(idx - 100, idx + 150);
  if (context.includes("e.jsx") || context.includes("e.jsxs")) {
    console.log(`=== Line Match at ${idx} ===`);
    console.log(context);
  }
  idx += 11;
}
