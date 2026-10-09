const fs = require('fs');
const path = require('path');

console.log("=== FIXING ISSEA TDZ VARIABLE INITIALIZATION IN COMBATMODAL ===");

const files = ['public/assets/index-V33.js', 'dist/assets/index-V33.js'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let b = fs.readFileSync(file, 'utf8');

  // Replace the problematic typeof isSea check with direct calculation from props
  const badLine = `const isNaval = typeof isSea !== "undefined" ? isSea : true;`;
  const fixedLine = `const isNaval = !o && t?.domain === 'sea';`;

  if (b.includes(badLine)) {
    b = b.replace(badLine, fixedLine);
    fs.writeFileSync(file, b, 'utf8');
    console.log("SUCCESS: Replaced isNaval TDZ check in", file);
  } else {
    console.log("Warning: badLine not found directly in", file, "- searching pattern...");
    let pBad = b.indexOf("typeof isSea !== \"undefined\"");
    if (pBad !== -1) {
      let pStartLine = b.lastIndexOf("const isNaval", pBad);
      let pEndLine = b.indexOf(";", pBad);
      if (pStartLine !== -1 && pEndLine !== -1) {
        let oldStr = b.substring(pStartLine, pEndLine + 1);
        b = b.replace(oldStr, fixedLine);
        fs.writeFileSync(file, b, 'utf8');
        console.log("SUCCESS: Updated isNaval line in", file);
      }
    }
  }
});

console.log("=== COMPLETED ISSEA TDZ FIX ===");
