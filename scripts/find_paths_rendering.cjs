const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for stroke/strokeWidth/strokeDasharray patterns or campaign map path rendering
// Let's search for "line" or "path" or "stroke" or "route" or "dot" in React components.
// We can find where the campaign paths are drawn.
console.log("Searching for path rendering patterns in bundle...");

const keywords = [
  "path-line", "route-line", "movement-path", "drawPath", "renderPath",
  "strokeDasharray", "strokeWidth", "waypoint", "trail", "dots"
];

keywords.forEach(kw => {
  let idx = 0;
  let count = 0;
  while ((idx = js.indexOf(kw, idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`Keyword "${kw}" match ${count} at ${idx}: ${js.substring(idx - 60, idx + 100)}`);
    }
    idx += kw.length;
  }
  console.log(`Keyword "${kw}": total matches = ${count}`);
});
