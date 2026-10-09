const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, "../public/assets/index-V28.js");
const js = fs.readFileSync(bundlePath, "utf8");

const results = [];
function searchPattern(pattern, length = 300) {
  let index = 0;
  while ((index = js.indexOf(pattern, index)) !== -1) {
    results.push(`FOUND "${pattern}" AT ${index}:`);
    results.push(js.substring(index - 100, index + length));
    results.push('-'.repeat(40));
    index += pattern.length;
    if (results.length > 40) break;
  }
}

searchPattern("id:\"greece\"");
searchPattern("id:\"graecia\"");
searchPattern("province_");
searchPattern("provinceColor");
searchPattern("fill:\"#");

fs.writeFileSync(path.join(__dirname, "locate_land_regions_results.txt"), results.join("\n"), "utf8");
console.log("Done. Results length: " + results.length);
