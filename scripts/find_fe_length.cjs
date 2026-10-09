const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

let idx = 0;
while ((idx = js.indexOf("fe.length>0", idx)) !== -1) {
  console.log(`Match at ${idx}: ${js.substring(idx, idx + 300)}`);
  idx += 12;
}
