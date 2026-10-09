const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "codex_full.txt"), "utf8");

function searchContextRange(query, size = 1000) {
  let idx = content.indexOf(query);
  if (idx !== -1) {
    console.log(`\n=== Context for "${query}" ===`);
    console.log(content.substring(idx - 200, idx + size));
  } else {
    console.log(`\n=== "${query}" NOT FOUND ===`);
  }
}

searchContextRange("m(\"PRINCIPIA\")");
searchContextRange("m(\"TACTICA\")");
searchContextRange("m(\"CATALOGUS\")");
searchContextRange("PRINCIPIA", 2000);
