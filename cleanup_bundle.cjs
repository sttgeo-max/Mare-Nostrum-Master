const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/assets/index-V37.js');
let content = fs.readFileSync(filePath, 'utf8');

console.log("Cleaning up duplicate var declarations in the bundle...");

const lines = content.split('\n');
const seenVars = Object.create(null);
let cleanedCount = 0;

for (let i = 0; i < lines.length; i++) {
    // Match 'var name =' or 'var name=' at the start of a line or after some spaces
    const match = lines[i].match(/^(\s*)var ([a-zA-Z0-9_$]+)(\s*=)/);
    if (match) {
        const indent = match[1];
        const name = match[2];
        const equal = match[3];
        
        if (seenVars[name]) {
            // Already seen, convert 'var name =' to 'name ='
            lines[i] = lines[i].replace(/^(\s*)var ([a-zA-Z0-9_$]+)(\s*=)/, '$1$2$3');
            cleanedCount++;
        } else {
            seenVars[name] = true;
        }
    }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`SUCCESS: Cleaned up ${cleanedCount} duplicate var declarations.`);
