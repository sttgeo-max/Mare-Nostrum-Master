const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "arma_full.txt"), "utf8");

function showMatch(query, before = 100, after = 500) {
  let idx = content.indexOf(query);
  if (idx !== -1) {
    console.log(`\n--- Match for "${query}" at ${idx} ---`);
    console.log(content.substring(idx - before, idx + after));
  } else {
    console.log(`\n--- "${query}" NOT FOUND ---`);
  }
}

showMatch("EQUIPMENT");
showMatch("Loadout");
showMatch("Inventory");
showMatch("stats");
showMatch("Combat");
showMatch("Dossier");
showMatch("tab");
showMatch("Weapon");
showMatch("Helmet");
showMatch("Armor");
showMatch("Shield");
