const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/assets/index-V37.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
    // Look for 'j' as a word, not preceded by a dot
    // And excluding declarations or obvious function contexts
    if (line.match(/\b(?<!\.)j\b/) && !line.includes('var j') && !line.includes('function j') && i < 2341) {
        // If it's a top-level assignment or use
        if (line.match(/^\s*j\s*=/) || line.match(/^\s*[^/]*\bj\b/)) {
            // Check if it's NOT inside a function or object literal property
            // (Simple heuristic: check indentation and lack of colon before)
            if (!line.includes(':') || line.indexOf(':') > line.indexOf('j')) {
                console.log(`${i + 1}: ${line.trim()}`);
            }
        }
    }
});
