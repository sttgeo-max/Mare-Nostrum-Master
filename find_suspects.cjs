const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/assets/index-V37.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const suspects = ['j', 'y', 'w', 'b', 'e', 's', 't', 'a', 'r', 'o', 'l', 'n', 'c', 'i', 'p', 'x', 'u', 'd', 'm', 'h', 'g'];

lines.forEach((line, i) => {
    // Match line that starts with 'name =' or '  name =' where name is in suspects
    const match = line.match(/^(\s*)([a-zA-Z0-9_$]{1,2})\s*=/);
    if (match) {
        const indent = match[1];
        const name = match[2];
        if (suspects.includes(name)) {
            console.log(`${i + 1}: ${line.trim()}`);
        }
    }
});
