const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== SYNCHRONIZING FULL PRODUCTION BUILD ===");

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');
const bundlePath = path.join(publicDir, 'assets/index-V37.js');

// 1. Verify bundle syntax with esbuild
console.log("1. Validating index-V37.js with esbuild...");
try {
  esbuild.buildSync({
    entryPoints: [bundlePath],
    outfile: '/tmp/test_prod_bundle.js',
    bundle: false,
    format: 'esm',
  });
  console.log("ESBUILD VALIDATION PASSED! Bundle is 100% valid JavaScript.");
} catch (e) {
  console.error("ESBUILD VALIDATION FAILED:", e.message);
  process.exit(1);
}

// 2. Prepare dist directory
console.log("2. Syncing public/ into dist/...");
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Helper to recursively copy directories
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(publicDir, distDir);

// 3. Copy index.html to dist/index.html
const indexHtmlPath = path.join(rootDir, 'index.html');
const distHtmlPath = path.join(distDir, 'index.html');
fs.copyFileSync(indexHtmlPath, distHtmlPath);

// 4. Update cachebuster timestamps and sync all bundle version files in public/assets and dist/assets
const ver37Path = path.join(__dirname, 'sync_all_bundle_versions.cjs');
if (fs.existsSync(ver37Path)) {
  require(ver37Path);
}

console.log("3. Verifying dist build integrity...");
const distBundlePath = path.join(distDir, 'assets/index-V37.js');
if (fs.existsSync(distBundlePath)) {
  const size = fs.statSync(distBundlePath).size;
  console.log(`dist/assets/index-V37.js verified (${(size / 1024 / 1024).toFixed(2)} MB).`);
} else {
  console.error("Missing dist/assets/index-V37.js!");
  process.exit(1);
}

console.log("=== PRODUCTION BUILD COMPLETE & READY ===");
