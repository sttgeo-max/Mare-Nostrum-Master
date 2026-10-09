const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for where the player unit is rendered on the map.
// Usually, we render the player avatar/ship/legion medallion at some coordinates.
// Let's search for "playerMode" or "player_coastal_anchor" or "player" near translation/transform style
let idx = 0;
while ((idx = js.indexOf("player_coastal_anchor", idx)) !== -1) {
  console.log(`=== Player Render Match at ${idx} ===`);
  console.log(js.substring(idx - 1000, idx + 1000));
  idx += 30;
}
