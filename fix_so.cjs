const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/assets/index-V37.js');
let content = fs.readFileSync(filePath, 'utf8');

console.log("Renaming conflicting 'So' variables with unique prefixes...");

// First use a unique prefix
content = content.replace('var So = function(x) {', 'var MN_So_Region = function(x) {');
content = content.replace('var So = function(t) {', 'var MN_So_Bounds = function(t) {');

const lines = content.split('\n');
let firstSoLine = -1;
let secondSoLine = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('var MN_So_Region = function(x) {')) firstSoLine = i;
    if (lines[i].includes('var MN_So_Bounds = function(t) {')) secondSoLine = i;
}

console.log("First So at line " + (firstSoLine + 1));
console.log("Second So at line " + (secondSoLine + 1));

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('So(')) {
        if (i < secondSoLine) {
            lines[i] = lines[i].replace(/\bSo\b\(/g, 'MN_So_Region(');
        } else {
            lines[i] = lines[i].replace(/\bSo\b\(/g, 'MN_So_Bounds(');
        }
    }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log("SUCCESS: Fixed So shadowing conflict.");
