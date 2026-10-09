const fs = require('fs');
const path = require('path');

console.log("=== FIXING ARROW FUNCTION SYNTAX IN PX ===");

const bundlePath = path.join(__dirname, '..', 'public', 'assets', 'index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

// Fix var px=({player:t...}) { to var px=({player:t...}) => {
code = code.replace("var px=({player:t,setPlayer:s,defaultSubTab:a=\"RELIQVIAE\",onClose:r}){", "var px=({player:t,setPlayer:s,defaultSubTab:a=\"RELIQVIAE\",onClose:r})=>{\n");

fs.writeFileSync(bundlePath, code, 'utf8');
console.log("=== ARROW FUNCTION SYNTAX FIXED ===");
