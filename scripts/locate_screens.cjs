const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

function searchContext(keyword, label, before = 100, after = 500) {
  let idx = content.indexOf(keyword);
  if (idx !== -1) {
    console.log(`=== ${label} ("${keyword}") at index ${idx} ===`);
    console.log(content.substring(idx - before, idx + after));
  } else {
    console.log(`=== ${label} NOT FOUND ===`);
  }
}

searchContext("Arma & Reliquiae", "Arma Header Title", 200, 1500);
searchContext("PRINCIPIA", "Codex Tab/Header", 100, 1000);
searchContext("AERARIUM", "Aerarium Page Title", 100, 1000);
