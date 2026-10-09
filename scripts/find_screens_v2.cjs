const fs = require('fs');
const path = require('path');

const bundlePath = path.resolve(__dirname, '../public/assets/index-V28.js');
const js = fs.readFileSync(bundlePath, 'utf8');

function findComponent(text, contextLines = 20000) {
    const idx = js.indexOf(text);
    if (idx === -1) {
        console.log(`Text "${text}" not found.`);
        return;
    }
    const start = Math.max(0, idx - contextLines);
    const end = Math.min(js.length, idx + contextLines);
    console.log(`Found "${text}" at index ${idx}.`);
    console.log(`Range: ${start} - ${end}`);
    // Try to find the start of the function/component
    // Usually something like "const Xx=({..." or "Xx=t=>..."
    return { idx, start, end };
}

console.log("Searching for ARMA component...");
findComponent("Arma & Reliquiae");

console.log("\nSearching for CODEX component...");
findComponent("Forces and Supplies");

console.log("\nSearching for TREASURY component...");
findComponent("Aerarium");
