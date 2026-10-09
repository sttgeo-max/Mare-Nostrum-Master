const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/assets/index-V37.js');
const content = fs.readFileSync(filePath, 'utf8');

console.log("Wrapping bundle in IIFE for scope isolation...");

const lines = content.split('\n');
// Find the first import line
let firstImportIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
        firstImportIndex = i;
        break;
    }
}

if (firstImportIndex === -1) {
    console.error("No import statement found!");
    process.exit(1);
}

const importLines = lines.slice(0, firstImportIndex + 1);
const otherLines = lines.slice(firstImportIndex + 1);

const wrapped = importLines.join('\n') + 
    '\n\n(function() {\n' + 
    otherLines.join('\n') + 
    '\n})();';

fs.writeFileSync(filePath, wrapped, 'utf8');
console.log("SUCCESS: Bundle wrapped in IIFE.");
