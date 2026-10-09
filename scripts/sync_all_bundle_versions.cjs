const fs = require('fs');
const path = require('path');

console.log("=== SYNCING PATCHED BUNDLE TO ALL INDEX VERSION FILES ===");

const masterBundlePath = path.join(__dirname, '../public/assets/index-V37.js');
const masterCode = fs.readFileSync(masterBundlePath, 'utf8');

const dirs = ['public/assets', 'dist/assets'];
const verStr = "V37_" + Date.now();

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    if (f.startsWith('index-V') && f.endsWith('.js')) {
      const filePath = path.join(dir, f);
      fs.writeFileSync(filePath, masterCode, 'utf8');
      console.log(`Synced master bundle into ${filePath}`);
    }
  });
});

// Update index.html and dist/index.html to point to index-V37.js
const htmlFiles = ['index.html', 'dist/index.html'];
htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace script src to point to index-V37.js
  html = html.replace(/index-V[0-9]+\.js(\?v=[0-9A-Za-z_]+)?/g, `index-V37.js?v=${verStr}`);
  html = html.replace(/var\s+LATEST_VER\s*=\s*[\"'][0-9A-Za-z_]+[\"']/g, `var LATEST_VER = "${verStr}"`);
  html = html.replace(/var\s+LATEST_VER\s+[\"'][0-9A-Za-z_]+[\"']/g, `var LATEST_VER = "${verStr}"`);

  fs.writeFileSync(file, html, 'utf8');
  console.log(`Updated ${file} script tag to index-V37.js?v=${verStr}`);
});

console.log("=== ALL BUNDLE VERSIONS FULLY SYNCED AND UPGRADED ===");
