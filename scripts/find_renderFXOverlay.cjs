const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../public/assets/index-V28.js");
const content = fs.readFileSync(file, "utf8");

const startPos = content.indexOf("const renderFXOverlay =");
console.log("startPos of renderFXOverlay:", startPos);
if (startPos !== -1) {
  fs.writeFileSync(
    path.join(__dirname, "combat_renderFXOverlay.txt"),
    content.substring(startPos, startPos + 10000),
    "utf8"
  );
  console.log("Wrote combat_renderFXOverlay.txt");
}
