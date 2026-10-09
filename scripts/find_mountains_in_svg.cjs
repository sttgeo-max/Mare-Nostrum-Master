const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for typical mountain group start
const targets = ['id:"mountains"', 'className:"mountain"', 'id:"mountain-g"'];
targets.forEach(t => {
  const idx = js.indexOf(t);
  if (idx !== -1) {
    console.log(`FOUND MOUNTAIN ELEMENT ${t} at ${idx}:`);
    console.log(js.substring(idx - 100, idx + 1000));
  } else {
    console.log(`NOT FOUND: ${t}`);
  }
});
