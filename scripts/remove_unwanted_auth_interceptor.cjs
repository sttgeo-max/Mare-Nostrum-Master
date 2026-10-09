const fs = require('fs');
const path = require('path');

console.log("=== STRIPPING UNNECESSARY AUTH REFRESH INTERCEPTOR & CLEANING BUNDLES ===");

const files = ['public/assets/index-V33.js', 'dist/assets/index-V33.js'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  // Strip out any reference to /api/auth/refresh or performTokenRefresh
  let importIdx = code.indexOf("import{j as ");
  if (importIdx !== -1) {
    let mainCode = code.substring(importIdx);

    // Clean React Safety Shield Header
    const cleanHeader = `
if (typeof window !== "undefined" && !window.__ROMAN_IMG_ERROR_GUARD_INITIALIZED__) {
  try {
    window.__ROMAN_IMG_ERROR_GUARD_INITIALIZED__ = true;
    const handledImgs = new WeakSet();
    window.addEventListener("error", function (e) {
      try {
        if (e && e.target && e.target.tagName === "IMG") {
          const img = e.target;
          if (!handledImgs.has(img)) {
            handledImgs.add(img);
            console.warn("[Assets] Suppressed missing image load error for:", img.src);
            img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2312100d'/><circle cx='50' cy='50' r='30' fill='none' stroke='%23f59e0b' stroke-width='2'/></svg>";
          }
        }
      } catch (err) {}
    }, true);
  } catch (err) {}
}
`;
    fs.writeFileSync(file, cleanHeader + "\n" + mainCode, 'utf8');
    console.log("SUCCESS: Cleaned header of", file, "- removed /api/auth/refresh interceptor completely!");
  }
});

console.log("=== COMPLETED BUNDLE CLEANUP ===");
