const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, "../public/assets/index-V28.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Search for GRAECIA or green territory colors
const searchTerms = ["graecia", "#", "fill:", "color", "green", "territory", "province"];
const matches = [];

function searchKeyword(keyword, contextLength = 200) {
  let index = 0;
  while ((index = js.indexOf(keyword, index)) !== -1) {
    matches.push(`FOUND "${keyword}" AT ${index}: ${js.substring(index - 100, index + keyword.length + 100)}`);
    index += keyword.length;
    if (matches.length > 50) break;
  }
}

searchKeyword("GRAECIA");
searchKeyword("graecia");

fs.writeFileSync(path.join(__dirname, "search_regions_results.txt"), matches.join("\n"), "utf8");
console.log("Done.");
