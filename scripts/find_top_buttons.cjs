const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

const p1 = js.indexOf('top-hud-codex-btn');
if (p1 !== -1) {
  console.log("Found top-hud-codex-btn at index " + p1);
  console.log(js.substring(p1 - 200, p1 + 600));
} else {
  console.log("top-hud-codex-btn not found!");
}

const p2 = js.indexOf('top-hud-settings-btn');
if (p2 !== -1) {
  console.log("Found top-hud-settings-btn at index " + p2);
  console.log(js.substring(p2 - 200, p2 + 600));
} else {
  console.log("top-hud-settings-btn not found!");
}
