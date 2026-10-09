const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

const keywords = [
  "mountain",
  "road",
  "route",
  "terrain",
  "YOUR TURN",
  "side-hud",
  "status-bar",
  "dpad-socket"
];

keywords.forEach(kw => {
  let idx = 0;
  let count = 0;
  while ((idx = js.indexOf(kw, idx)) !== -1) {
    count++;
    if (count <= 3) {
      const snip = js.substring(Math.max(0, idx - 120), Math.min(js.length, idx + kw.length + 120));
      console.log(`[FOUND ${kw}] at ${idx}: ${snip.replace(/\n/g, " ").trim()}`);
    }
    idx += kw.length;
  }
  console.log(`Keyword "${kw}" found ${count} times.`);
});
