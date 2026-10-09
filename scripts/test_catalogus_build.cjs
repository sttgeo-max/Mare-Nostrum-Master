const fs = require("fs");
const path = require("path");

// Read build_clean_v34.cjs
let code = fs.readFileSync(path.join(__dirname, "build_clean_v34.cjs"), "utf8");

// Check where sa is defined
const saMarker = 'sa=[{id:"liburna_minor",';
console.log("sa marker found:", code.includes(saMarker));

// Check where PlayerMapToken is defined
const pmtMarker = 'zo.displayName="PlayerMapToken"';
console.log("PlayerMapToken marker found:", code.includes(pmtMarker));

// Check where catTab is rendered
const catTabMarker = '["BESTIARIVM", "RELIQVIAE", "NAVALIA"].map(';
console.log("catTab marker found:", code.includes(catTabMarker));

// Check where FloatingMiniMenu has rankTitle
const miniMenuMarker = 'const rankTitle = ix(lvlInfo.currentLevel);';
console.log("miniMenuMarker found:", code.includes(miniMenuMarker));
