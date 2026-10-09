const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/assets/index-V37.js');
let content = fs.readFileSync(filePath, 'utf8');

console.log("Definitive cleanup of all duplicate var declarations...");

// We want to match all 'var name =' occurrences, even if not at start of line
// But we should be careful not to match inside strings.
// Since this is a minified bundle, we can assume var is followed by a name.

const seenVars = Object.create(null);
let cleanedCount = 0;

// This regex matches 'var name =' or 'var name='
// We use a function replacement to check seenVars
const result = content.replace(/\bvar\s+([a-zA-Z0-9_$]+)\s*=/g, (match, name) => {
    if (seenVars[name]) {
        cleanedCount++;
        return `${name} =`;
    } else {
        seenVars[name] = true;
        return match;
    }
});

fs.writeFileSync(filePath, result, 'utf8');
console.log(`SUCCESS: Cleaned up ${cleanedCount} duplicate var declarations.`);
