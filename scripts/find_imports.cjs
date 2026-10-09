const fs = require("fs");
const code = fs.readFileSync("public/assets/index-V37.js", "utf8");

// Search for import statements
const importRegex = /import\s+[\s\S]*?\s+from\s+['"][^'"]+['"]/g;
let m;
while ((m = importRegex.exec(code)) !== null) {
  console.log("Import at", m.index, ":", m[0].substring(0, 100));
}
