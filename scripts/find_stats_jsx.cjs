const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "arma_full.txt"), "utf8");

function searchReferences(varName) {
  let pos = -1;
  const results = [];
  while ((pos = content.indexOf(varName, pos + 1)) !== -1) {
    if (pos > 3000) { // skip definition area
      results.push(pos);
    }
  }
  console.log(`References to "${varName}" (after index 3000): found ${results.length} occurrences. Positions:`, results);
  for (let r of results) {
    console.log(`Around pos ${r}:`, content.substring(r - 100, r + 400));
  }
}

searchReferences("Ge");
searchReferences("Be");
searchReferences("J");
searchReferences("z");
