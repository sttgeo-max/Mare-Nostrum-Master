const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

function extract(pos, length, filename) {
  const start = Math.max(0, pos - length / 2);
  const end = Math.min(content.length, pos + length / 2);
  fs.writeFileSync(path.join(__dirname, filename), content.substring(start, end), "utf8");
  console.log(`Wrote ${filename} from position ${start} to ${end}`);
}

extract(1807483, 15000, "context_codex.txt");
extract(2859748, 15000, "context_treasury.txt");
