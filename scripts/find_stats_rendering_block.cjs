const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "arma_full.txt"), "utf8");

function searchStatsRender() {
  const matches = [];
  let pos = -1;
  while ((pos = content.indexOf("K", pos + 1)) !== -1) {
    if (pos > 5000 && pos < 20000) {
      matches.push(pos);
    }
  }
  console.log("K occurrences inside JSX render range (5000-20000):", matches);
  for (let m of matches) {
    console.log(`Around ${m}:`, content.substring(m - 80, m + 220));
  }
}

searchStatsRender();
