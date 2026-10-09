const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "arma_full.txt"), "utf8");

function showRangeAround(keyword, size = 1000) {
  let idx = content.indexOf(keyword);
  if (idx !== -1) {
    console.log(`\n=== Range around "${keyword}" (index ${idx}) ===`);
    console.log(content.substring(idx - 100, idx + size));
  } else {
    console.log(`\n=== "${keyword}" NOT FOUND ===`);
  }
}

showRangeAround("map(tab => e.jsx");
showRangeAround(".map(tab");
