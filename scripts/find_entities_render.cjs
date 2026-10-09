const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for drawing paths for movement
// Common phrases: e.jsx("path", { d: ... }), or drawing of campaign/fleet movement
// Let's find any occurrences of "stroke" with colors associated with routes (e.g. brown, solid, sea, etc.)
// "brown" or "ochre" or "#" colors?
// Let's search for keywords: "path", "line", "circle", "d:"
// Wait, the prompt says: "Replace the thick solid sea bar with a thin, softly colored blue-white route. Replace the large brown land dots with a fine ochre route."
// Let's search for "brown" or "stroke" or color codes in the JS file.
const regex = /stroke:"[^"]*"/g;
let match;
const foundColors = new Set();
while ((match = regex.exec(js)) !== null) {
  foundColors.add(match[0]);
}
console.log("Found stroke colors:", Array.from(foundColors).slice(0, 50));

// Also let's search for "dots" or how the land movement or sea movement is drawn.
// Let's look for "sea" or "land" or "movement" variables.
const indexMap = js.indexOf("MediterraneanMapSVG");
if (indexMap !== -1) {
  console.log("MediterraneanMapSVG index:", indexMap);
  console.log(js.substring(indexMap - 500, indexMap + 500));
}

// Let's search for "fleet" or "legion" movement drawing
// Let's search for ".currentWaypointIndex" or ".waypoints" again to see where they are referenced elsewhere.
let wIdx = 0;
while ((wIdx = js.indexOf("waypoints", wIdx)) !== -1) {
  console.log(`Waypoint index ${wIdx}: ${js.substring(wIdx - 150, wIdx + 150)}`);
  wIdx += 10;
}
