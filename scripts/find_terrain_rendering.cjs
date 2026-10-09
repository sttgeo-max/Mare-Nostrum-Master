const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

const target = "terrainReliefShade";
const idx = js.indexOf(target);
if (idx !== -1) {
  const start = Math.max(0, idx - 1200);
  const end = Math.min(js.length, idx + 4000);
  console.log("FOUND MAP SVG DEFINITION DETAILS:");
  console.log(js.substring(start, end));
} else {
  console.log("NOT FOUND");
}
