const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "codex_full.txt"), "utf8");

function showMatch(query, before = 100, after = 500) {
  let idx = content.indexOf(query);
  if (idx !== -1) {
    console.log(`\n--- Match for "${query}" at ${idx} ---`);
    console.log(content.substring(idx - before, idx + after));
  } else {
    console.log(`\n--- "${query}" NOT FOUND ---`);
  }
}

showMatch("Journal");
showMatch("Pax Romana");
showMatch("New Voyage");
showMatch("Forces");
showMatch("Supplies");
showMatch("PRINCIPIA");
showMatch("TACTICA");
showMatch("CATALOGUS");
showMatch("Header");
showMatch("className:\"font-cinzel font-bold text-lg sm:text-2xl text-amber-100 uppercase\"");
