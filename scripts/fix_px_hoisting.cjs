const fs = require('fs');
const path = require('path');

console.log("=== REFINING PX FUNCTION SYNTAX ===");

const bundlePath = path.join(__dirname, '..', 'public', 'assets', 'index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

// Replace function px(...) => { with function px(...) {
if (code.includes("function px({player:t,setPlayer:s,defaultSubTab:a=\"RELIQVIAE\",onClose:r})=>")) {
  code = code.replace("function px({player:t,setPlayer:s,defaultSubTab:a=\"RELIQVIAE\",onClose:r})=>", "function px({player:t,setPlayer:s,defaultSubTab:a=\"RELIQVIAE\",onClose:r})");
}

fs.writeFileSync(bundlePath, code, 'utf8');
console.log("=== PX FUNCTION DECLARATION SYNTAX FIXED ===");
