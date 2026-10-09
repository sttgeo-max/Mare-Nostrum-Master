const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

function search(query, label) {
  let pos = -1;
  const results = [];
  while ((pos = content.indexOf(query, pos + 1)) !== -1) {
    results.push(pos);
  }
  console.log(`${label} ("${query}"): found ${results.length} occurrences. Positions:`, results.slice(0, 10));
  return results;
}

search("key:\"arma-", "Arma Key");
search("key:\"codex-", "Codex Key");
search("key:\"treasury-", "Treasury Key");
search("Arma & Reliquiae", "Arma String");
search("PRINCIPIA", "Principia");
search("Tabularium", "Tabularium");
search("AERARIUM", "Aerarium");
search("aerarium-", "Aerarium key lowercase");
search("key:\"mini-menu-", "Mini-menu key");
search("key:\"basalt-menu-", "Basalt-menu key");
search("const Codex = ", "Codex definition");
search("const Arma = ", "Arma definition");
search("const Treasury = ", "Treasury definition");
search("const Aerarium = ", "Aerarium definition");
search("e.jsx(Codex,", "Codex element");
search("e.jsx(Arma,", "Arma element");
search("e.jsx(Treasury,", "Treasury element");
