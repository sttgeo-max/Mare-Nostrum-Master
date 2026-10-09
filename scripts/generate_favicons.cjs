const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 512x512 Master SVG Definition for Mare Nostrum II: Imperium Favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Background Imperial Crimson Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#7a0e1c"/>
      <stop offset="55%" stop-color="#42060f"/>
      <stop offset="100%" stop-color="#170206"/>
    </radialGradient>

    <!-- Gold Foil Metallic Gradient -->
    <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="20%" stop-color="#fbc02d"/>
      <stop offset="45%" stop-color="#d4af37"/>
      <stop offset="70%" stop-color="#aa7c11"/>
      <stop offset="90%" stop-color="#fbc02d"/>
      <stop offset="100%" stop-color="#fff9c4"/>
    </linearGradient>

    <!-- Bright Solar Glow Gradient -->
    <radialGradient id="solarGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#f59e0b" stop-opacity="0.45"/>
      <stop offset="80%" stop-color="#dc2626" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#140205" stop-opacity="0"/>
    </radialGradient>

    <!-- Drop Shadow for Gold Emblem -->
    <filter id="emblemShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.85"/>
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#d4af37" flood-opacity="0.3"/>
    </filter>

    <filter id="innerGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#fde047" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Base Rounded Container (Standard iOS App Icon / Favicon Frame) -->
  <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)" stroke="#d4af37" stroke-width="6"/>

  <!-- Subtle Rim Beading / Inner Roman Medallion Ring -->
  <circle cx="256" cy="256" r="226" fill="none" stroke="#d4af37" stroke-width="2.5" opacity="0.4" stroke-dasharray="6 8"/>
  <circle cx="256" cy="256" r="218" fill="none" stroke="url(#goldMetallic)" stroke-width="4" opacity="0.85"/>

  <!-- Sol Invictus Radiant Sunburst -->
  <g opacity="0.35" filter="url(#innerGlow)">
    <circle cx="256" cy="220" r="140" fill="url(#solarGlow)"/>
    <!-- 12 Solar Rays -->
    <path d="M 256 60 L 256 380 M 96 220 L 416 220 M 143 107 L 369 333 M 143 333 L 369 107 M 110 160 L 402 280 M 110 280 L 402 160" stroke="#fcd34d" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  </g>

  <!-- Main Emblem Group -->
  <g filter="url(#emblemShadow)">

    <!-- Naval Galley Rostrum & Warship Bow (Base Anchor) -->
    <g fill="url(#goldMetallic)">
      <!-- Ship Hull Base -->
      <path d="M 160 380 C 200 405 312 405 352 380 C 330 420 182 420 160 380 Z"/>
      <!-- Triple-Pointed Bronze Rostrum (Ram) -->
      <path d="M 230 395 L 256 430 L 282 395 L 256 405 Z"/>
      <path d="M 210 390 L 256 445 L 302 390 L 256 410 Z" opacity="0.7"/>
    </g>

    <!-- Imperial SPQR Banner Plaque -->
    <g fill="url(#goldMetallic)">
      <rect x="180" y="335" width="152" height="36" rx="4" stroke="#5b3a00" stroke-width="2"/>
      <!-- Plaque End Studs -->
      <circle cx="190" cy="353" r="3" fill="#3d2200"/>
      <circle cx="322" cy="353" r="3" fill="#3d2200"/>
      <!-- Classical SPQR Lettering -->
      <text x="256" y="360" font-family="'Cinzel', 'Trajan Pro', 'Times New Roman', serif" font-size="20" font-weight="900" fill="#261200" text-anchor="middle" letter-spacing="4">SPQR</text>
    </g>

    <!-- Imperial Aquila Eagle (Roman Empire Crest) -->
    <g fill="url(#goldMetallic)">
      <!-- Crown / Head looking right -->
      <path d="M 256 128 C 265 128 274 132 278 138 C 283 144 282 152 274 154 C 268 155 264 160 260 164 L 256 168 L 252 164 C 248 160 244 155 238 154 C 230 152 229 144 234 138 C 238 132 247 128 256 128 Z"/>
      <!-- Sharp Eagle Beak -->
      <path d="M 276 142 L 288 147 L 278 152 Z" fill="#fffeb3"/>
      <!-- Eagle Eye -->
      <circle cx="270" cy="142" r="2.5" fill="#261200"/>

      <!-- Outstretched Majestic Wings -->
      <!-- Right Wing -->
      <path d="M 256 168 C 290 145 350 140 400 165 C 380 190 350 210 320 220 C 340 210 375 200 390 185 C 365 210 330 235 295 245 C 320 240 355 230 370 215 C 340 235 305 255 270 260 L 256 210 Z"/>
      <!-- Left Wing -->
      <path d="M 256 168 C 222 145 162 140 112 165 C 132 190 162 210 192 220 C 172 210 137 200 122 185 C 147 210 182 235 217 245 C 192 240 157 230 142 215 C 172 235 207 255 242 260 L 256 210 Z"/>

      <!-- Eagle Body Shield & Feathered Torso -->
      <path d="M 256 165 C 275 185 280 220 275 270 C 268 295 244 295 237 270 C 232 220 237 185 256 165 Z"/>
      <!-- Feather Details -->
      <path d="M 246 190 C 256 198 266 190 256 205 M 244 210 C 256 218 268 210 256 225 M 244 230 C 256 238 268 230 256 245" stroke="#784800" stroke-width="2" fill="none"/>

      <!-- Eagle Tail Feathers Fan -->
      <path d="M 256 270 L 230 330 L 246 335 L 256 330 L 266 335 L 282 330 Z"/>

      <!-- Fulmen / Lightning Bolts in Talons -->
      <path d="M 215 285 L 240 290 L 230 300 L 260 295 L 245 315 L 256 295 L 270 315 L 260 295 L 285 300 L 272 290 L 295 285 L 265 285 L 256 275 L 247 285 Z" fill="#fff9c4"/>
    </g>

    <!-- Corona Triumphalis (Golden Laurel Wreath) -->
    <g fill="url(#goldMetallic)">
      <!-- Left Wreath Branch Leaves -->
      <g transform="translate(0, 0)">
        <path d="M 125 310 C 100 250 115 180 160 130 C 150 145 142 170 142 195 C 132 175 130 150 140 130 C 122 155 115 188 118 220 C 108 198 108 172 120 150 C 105 180 102 215 110 250 C 100 230 100 205 112 180 C 100 215 102 255 118 290 C 110 270 110 248 122 225 C 115 260 120 292 135 320 Z"/>
        <!-- Individual Leaf Pairs Left -->
        <path d="M 152 142 C 135 132 125 148 142 158 Z"/>
        <path d="M 138 172 C 118 162 110 180 128 188 Z"/>
        <path d="M 128 205 C 105 198 100 218 118 222 Z"/>
        <path d="M 122 242 C 98 238 95 258 114 258 Z"/>
        <path d="M 125 278 C 102 278 102 298 120 294 Z"/>
        <path d="M 135 310 C 115 315 118 332 132 325 Z"/>
      </g>

      <!-- Right Wreath Branch Leaves (Symmetric Mirror) -->
      <g transform="translate(512, 0) scale(-1, 1)">
        <path d="M 125 310 C 100 250 115 180 160 130 C 150 145 142 170 142 195 C 132 175 130 150 140 130 C 122 155 115 188 118 220 C 108 198 108 172 120 150 C 105 180 102 215 110 250 C 100 230 100 205 112 180 C 100 215 102 255 118 290 C 110 270 110 248 122 225 C 115 260 120 292 135 320 Z"/>
        <!-- Individual Leaf Pairs Right -->
        <path d="M 152 142 C 135 132 125 148 142 158 Z"/>
        <path d="M 138 172 C 118 162 110 180 128 188 Z"/>
        <path d="M 128 205 C 105 198 100 218 118 222 Z"/>
        <path d="M 122 242 C 98 238 95 258 114 258 Z"/>
        <path d="M 125 278 C 102 278 102 298 120 294 Z"/>
        <path d="M 135 310 C 115 315 118 332 132 325 Z"/>
      </g>

      <!-- Golden Laurel Ribbon Bow at Base -->
      <path d="M 256 335 C 240 325 220 338 232 350 C 245 358 256 345 256 335 Z"/>
      <path d="M 256 335 C 272 325 292 338 280 350 C 267 358 256 345 256 335 Z"/>
    </g>

    <!-- Star of Sol Invictus / Constantine Monogram Accent at Apex -->
    <g fill="#fffeb3">
      <polygon points="256,72 261,88 278,88 264,98 269,114 256,104 243,114 248,98 234,88 251,88"/>
      <circle cx="256" cy="93" r="14" fill="none" stroke="url(#goldMetallic)" stroke-width="2"/>
    </g>

  </g>
</svg>`;

async function generateFavicons() {
  const publicDir = path.join(__dirname, '../public');
  const distDir = path.join(__dirname, '../dist');

  // Delete obsolete .js file if exists
  if (fs.existsSync(path.join(__dirname, 'generate_favicons.js'))) {
    fs.unlinkSync(path.join(__dirname, 'generate_favicons.js'));
  }

  // 1. Write master SVG files
  fs.writeFileSync(path.join(publicDir, 'sol_invictus_favicon.svg'), svgContent, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sol_invictus_favicon.svg'), svgContent, 'utf8');
    fs.writeFileSync(path.join(distDir, 'favicon.svg'), svgContent, 'utf8');
  }

  console.log('Successfully wrote SVG favicons.');

  // 2. Generate PNG sizes using sharp
  const svgBuffer = Buffer.from(svgContent);

  const targets = [
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'apple-touch-icon-precomposed.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const target of targets) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, target.name), pngBuffer);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, target.name), pngBuffer);
    }
    console.log(`Generated ${target.name} (${target.size}x${target.size})`);
  }

  // 3. Generate favicon.ico (using 32x32 PNG)
  const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico32);
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'favicon.ico'), ico32);
  }
  console.log('Generated favicon.ico');
}

generateFavicons().catch(console.error);
