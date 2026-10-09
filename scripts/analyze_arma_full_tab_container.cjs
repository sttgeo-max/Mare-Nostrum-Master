const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "arma_full.txt"), "utf8");

const key = 'setArmaTab(tab.id)';
let idx = content.indexOf(key);
if (idx !== -1) {
  // let's print 1200 characters before this key to see the parent container of the tabs
  console.log(content.substring(idx - 1000, idx + 400));
}
