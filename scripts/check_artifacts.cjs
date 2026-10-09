const fs = require('fs');
const code = fs.readFileSync('public/assets/index-V37.js', 'utf8');

let pos = 0;
let seen = new Set();
while ((pos = code.indexOf('art_', pos)) !== -1) {
  const start = code.lastIndexOf('{', pos);
  const end = code.indexOf('}', pos);
  if (start !== -1 && end !== -1 && end > start && end - start < 1000) {
    const chunk = code.substring(start, end + 1);
    let idMatch = chunk.match(/id["']?:\s*["']([^"']+)["']/);
    if (idMatch && !seen.has(idMatch[1])) {
      seen.add(idMatch[1]);
      let nameMatch = chunk.match(/name["']?:\s*["']([^"']+)["']/);
      let slotMatch = chunk.match(/slot["']?:\s*["']([^"']+)["']/);
      let rarityMatch = chunk.match(/rarity["']?:\s*["']([^"']+)["']/);
      let atkMatch = chunk.match(/bonusAttack["']?:\s*(\d+)/);
      let defMatch = chunk.match(/bonusDefense["']?:\s*(\d+)/);
      let rollMatch = chunk.match(/bonusRoll["']?:\s*(\d+)/);
      console.log(`${idMatch[1]} | ${nameMatch ? nameMatch[1] : ''} | Slot: ${slotMatch ? slotMatch[1] : ''} | Rarity: ${rarityMatch ? rarityMatch[1] : ''} | Atk: ${atkMatch ? atkMatch[1] : 0} | Def: ${defMatch ? defMatch[1] : 0} | Roll: ${rollMatch ? rollMatch[1] : 0}`);
    }
  }
  pos += 5;
}
console.log(`Total Unique Artifacts in DB: ${seen.size}`);
