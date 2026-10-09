const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let b = fs.readFileSync(bundlePath, 'utf8');

const p = b.indexOf("if (dmg > 0) {");
const pEnd = b.indexOf("let hitDelay = 220;", p);

const newCardWeaponDetection = `if (dmg > 0) {
      const cid = (card.id || "").toLowerCase();
      const atype = (card.actionType || "").toLowerCase();
      const cname = (card.name || "").toLowerCase();
      const sEffect = (card.statusEffect || "").toLowerCase();
      const kw = (card.keywords || []).map(k => String(k).toLowerCase());
      
      let weaponAnim = 'sword_slash';
      if (atype === 'corvus' || cid.includes('corvus') || cname.includes('corvus') || kw.includes('corvus') || kw.includes('boarding')) {
        weaponAnim = 'corvus_boarding';
      } else if (atype === 'grapple' || cid.includes('grapple') || cid.includes('harpax') || cname.includes('harpax') || kw.includes('grapple')) {
        weaponAnim = 'grapple_hook';
      } else if (atype === 'shear' || cid.includes('shear') || cid.includes('diekplous') || cname.includes('shear') || kw.includes('shear')) {
        weaponAnim = 'oar_shear';
      } else if (atype === 'ram' || cid.includes('ram') || cname.includes('ram') || kw.includes('ram') || cid.includes('cutwater') || cid.includes('cathead') || kw.includes('maelstrom')) {
        weaponAnim = 'ram_impact';
      } else if (atype === 'claw' || cid.includes('claw') || cname.includes('claw') || cid.includes('beast') || cid.includes('fang') || cid.includes('bite') || cid.includes('pounce') || cid.includes('gore') || kw.includes('beast') || cid.includes('frenzy') || cid.includes('blood_frenzy')) {
        weaponAnim = 'beast_claw';
      } else if (atype === 'fire' || sEffect === 'fire' || cid.includes('greek_fire') || cid.includes('onager') || cname.includes('ignis') || cname.includes('fire')) {
        weaponAnim = 'fire_spray';
      } else if (cid.includes('fire_arrow') || cid.includes('ignitae') || (atype === 'volley' && sEffect === 'fire') || cname.includes('fire arrow')) {
        weaponAnim = 'fire_arrow';
      } else if (atype === 'poison' || sEffect === 'poison' || cid.includes('venom') || cid.includes('hydra') || cname.includes('toxic') || cname.includes('venom')) {
        weaponAnim = 'poison_spray';
      } else if (atype === 'lifesteal' || sEffect === 'life_steal' || cid.includes('siphon') || cid.includes('sanguine') || cname.includes('siphon')) {
        weaponAnim = 'life_steal';
      } else if (atype === 'lightning' || sEffect === 'lightning_bolt' || cid.includes('lightning') || cid.includes('jupiter') || cid.includes('fulmen') || cid.includes('tempestas')) {
        weaponAnim = 'lightning_bolt';
      } else if (cid.includes('pilum') || cid.includes('javelin') || cid.includes('plumbatae') || atype === 'javelin' || cid.includes('velites') || cname.includes('pilum') || cname.includes('javelin') || cname.includes('dart')) {
        weaponAnim = 'javelin_launch';
      } else if (cid.includes('scorpio') || cid.includes('ballista') || atype === 'siege' || cname.includes('ballista') || cname.includes('scorpio') || cname.includes('bolt')) {
        weaponAnim = 'ballista_shot';
      } else if (cid.includes('archer') || cid.includes('sagittarii') || atype === 'volley' || cname.includes('archer') || cname.includes('salvo') || cname.includes('arrow')) {
        weaponAnim = 'arrow_fire';
      } else if (cid.includes('elephant') || cname.includes('elephant') || atype === 'trample') {
        weaponAnim = 'war_elephant_trample';
      } else {
        weaponAnim = 'sword_slash';
      }
      `;

const updated = b.substring(0, p) + newCardWeaponDetection + b.substring(pEnd);
esbuild.transformSync(updated, { loader: "jsx" });
fs.writeFileSync(bundlePath, updated, "utf8");

const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
if (fs.existsSync(distPath)) {
  fs.writeFileSync(distPath, updated, "utf8");
}
console.log("SUCCESS: Applied card weapon anim dispatch and synced.");
