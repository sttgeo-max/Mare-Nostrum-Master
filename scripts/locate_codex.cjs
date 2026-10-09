const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

function searchContextBack(keyword, startFrom = 0) {
  let idx = content.indexOf(keyword, startFrom);
  if (idx !== -1) {
    console.log(`=== BACK CONTEXT of "${keyword}" ===`);
    console.log(content.substring(idx - 2500, idx + 500));
  }
}

searchContextBack("initialSubTab:x,onClose:u})");
