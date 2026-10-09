const fs = require('fs');
const path = require('path');

console.log("=== APPLYING CLOUDRUN CREDENTIALS & 401 PREVENTATIVE FIX ===");

// 1. Inject global credentials guard at the top of index.html
const indexHtmlFiles = ['index.html', 'dist/index.html'];

const fetchGuardScript = `
    <script>
    (function() {
      // Force same-origin credentials on all fetch requests so Cloud Run proxy never gets cookie-less requests (which trigger 401)
      if (typeof window !== "undefined" && typeof window.fetch === "function" && !window.__CLOUDRUN_CREDENTIALS_GUARD__) {
        window.__CLOUDRUN_CREDENTIALS_GUARD__ = true;
        var origFetch = window.fetch;
        window.fetch = function(resource, init) {
          var opts = init ? Object.assign({}, init) : {};
          if (!opts.credentials || opts.credentials === "omit") {
            opts.credentials = "same-origin";
          }
          return origFetch.call(this, resource, opts);
        };
      }
    })();
    </script>`;

indexHtmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  if (!html.includes("__CLOUDRUN_CREDENTIALS_GUARD__")) {
    html = html.replace("<head>", "<head>\n" + fetchGuardScript);
    fs.writeFileSync(file, html, 'utf8');
    console.log("SUCCESS: Injected CloudRun credentials guard into", file);
  }
});

// 2. Patch Vite module preloader in all index-V*.js bundle files in public/assets and dist/assets
const assetDirs = ['public/assets', 'dist/assets'];

assetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  files.forEach(f => {
    if (f.startsWith('index-V') && f.endsWith('.js')) {
      const filePath = path.join(dir, f);
      let code = fs.readFileSync(filePath, 'utf8');

      // Replace modulepreload credentials="omit" with credentials="same-origin"
      let oldPreloaderSnippet = `o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin"`;
      let newPreloaderSnippet = `l.credentials="same-origin"`;

      if (code.includes(oldPreloaderSnippet)) {
        code = code.replace(oldPreloaderSnippet, newPreloaderSnippet);
        fs.writeFileSync(filePath, code, 'utf8');
        console.log("SUCCESS: Patched module preloader credentials in", filePath);
      }
    }
  });
});

console.log("=== COMPLETED CLOUDRUN CREDENTIALS & 401 FIX ===");
