const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for where fe or De.current are used in JSX/drawing.
// For example: fe.map or De.current.map or similar drawing code
let idx = 0;
while ((idx = js.indexOf(".map", idx)) !== -1) {
  const context = js.substring(idx - 100, idx + 200);
  if (context.includes("fe") || context.includes("De") || context.includes("waypoints") || context.includes("path")) {
    console.log(`=== Match at ${idx} ===`);
    console.log(context);
  }
  idx += 4;
}
