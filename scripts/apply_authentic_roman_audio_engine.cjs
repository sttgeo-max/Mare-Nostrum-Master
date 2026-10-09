/**
 * Apply Authentic Roman Audio Engine (Mare Nostrum II: Empire)
 * 
 * Beefs up the Web Audio API synthesizer with authentic Roman military & Mediterranean sounds:
 * 1. Cornu War Horn (Cornicen circular brass horn with rich harmonic overtone series & lip-buzz swell)
 * 2. Buccina (Bucinator heraldic tactical fanfare triad & piercing battle call)
 * 3. Lituus Fanfare (Roman Equites cavalry trumpet)
 * 4. Tuba Romana (Straight bronze military trumpet command blast)
 * 5. Caligae Stomp & Marching Step (Iron hobnailed legionary boot crunch on stone roads)
 * 6. Scutum Wall & Shield Block (Heavy curved lime-wood shield slam, iron umbo boss deflection & Testudo lock)
 * 7. Gladius Clash (High-carbon Roman steel blade impact, edge scraping friction & ringing overtones)
 * 8. Pilum Barrage (Whipping javelin flight whoosh, shield penetration crunch & soft-iron neck bending twang)
 * 9. Rostrum Ramming Attack & Hull Collision (Catastrophic bronze beak crush, splintering oak timbers & foaming water surge)
 * 10. Hortator Oar Stroke (Hardwood mallet on sounding block + synchronized trireme 170-oar dip & rowlock groan)
 * 11. Sagittarii Arrow Salvo (Bowstring release snap, whistling arrow flight & peppering shield impacts)
 * 12. Ballista Twang & Launch (Torsion sinew skein release, timber winch snap & whistling heavy bolt)
 * 13. Greek Fire Siphon (Pressurized bronze siphon hiss, roaring naphtha fireball & crackling water flame)
 * 14. Corvus Boarding Bridge Drop (Pulley rope whir, heavy deck slam & raven-beak iron spike fracture)
 * 15. Solidi & Aureus Gold Clink (Pure crystal-clear Roman gold coin acoustic resonance & multi-coin drops)
 * 16. Haruspex Incantation & Augury (Sacred bronze temple bowl gong 174 Hz, incense drone & divine omen chimes)
 * 17. Triumphal Ovation & Victory Fanfare (Imperial triumph in Roman Dorian mode with cornua, tubae & tympanum drum march)
 * 18. Tessera Click & Roman HUD Tap (Crisp bone/bronze gaming token tap on marble)
 * 19. Papyrus Scroll Open (Textured Egyptian papyrus chart unrolling with faint wax seal crackle)
 * 20. Port Docking (Mooring hemp rope groan, harbor bell chime & stone quay swell)
 * 
 * Also hooks up tactical card plays to weapon-specific authentic Roman sound effects!
 */

const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

function applyRomanAudioEngine() {
  console.log("=== APPLYING AUTHENTIC ROMAN AUDIO ENGINE (V53) ===");
  const targetPath = path.join(__dirname, "../public/assets/index-V33.js");
  let bundle = fs.readFileSync(targetPath, "utf8");

  // Define the comprehensive Roman Audio Engine prototype methods:
  const romanAudioExtensions = `
// === AUTHENTIC ROMAN AUDIO SYNTHESIS ENGINE ===
(function() {
  if (typeof Dd === "undefined" || !Dd.prototype) return;

  const P = Dd.prototype;

  // 1. CALIGAE STOMP & LEGIONARY MARCH (Hobnailed boots on stone/deck)
  P.playCaligaeStomp = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Layer A: Sharp iron hobnail (clavi caligarii) click on stone
    const nailNoise = this.ctx.createBufferSource();
    nailNoise.buffer = this.createNoiseBuffer(this.ctx, 0.06);
    const nailFilter = this.ctx.createBiquadFilter();
    nailFilter.type = "bandpass";
    nailFilter.frequency.setValueAtTime(3200, t);
    nailFilter.Q.value = 6.0;
    const nailGain = this.ctx.createGain();
    nailGain.gain.setValueAtTime(0.35 * vol, t);
    nailGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    nailNoise.connect(nailFilter);
    nailFilter.connect(nailGain);
    this.routeWithReverb(nailGain, nailGain, 0.15, pan);
    this.registerNodeCleanup(nailNoise, nailFilter, nailGain);
    nailNoise.start(t);
    nailNoise.stop(t + 0.06);

    // Layer B: Dual metallic ping of hobnail striking stone
    [1920, 2450].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + idx * 0.008);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.18 * vol, t + idx * 0.008);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(g);
      this.routeWithReverb(g, g, 0.12, pan);
      this.registerNodeCleanup(osc, g);
      osc.start(t + idx * 0.008);
      osc.stop(t + 0.05);
    });

    // Layer C: Heavy rawhide sole & legionary heel thud
    const heelOsc = this.ctx.createOscillator();
    heelOsc.type = "triangle";
    heelOsc.frequency.setValueAtTime(88, t);
    heelOsc.frequency.exponentialRampToValueAtTime(38, t + 0.12);
    const heelFilter = this.ctx.createBiquadFilter();
    heelFilter.type = "lowpass";
    heelFilter.frequency.setValueAtTime(190, t);
    const heelGain = this.ctx.createGain();
    heelGain.gain.setValueAtTime(0, t);
    heelGain.gain.linearRampToValueAtTime(0.45 * vol, t + 0.015);
    heelGain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    heelOsc.connect(heelFilter);
    heelFilter.connect(heelGain);
    this.routeWithReverb(heelGain, heelGain, 0.22, pan);
    this.registerNodeCleanup(heelOsc, heelFilter, heelGain);
    heelOsc.start(t);
    heelOsc.stop(t + 0.18);

    // Layer D: Faint armor clatter (lorica segmentata iron plates)
    const armorNoise = this.ctx.createBufferSource();
    armorNoise.buffer = this.createNoiseBuffer(this.ctx, 0.08);
    const armorFilter = this.ctx.createBiquadFilter();
    armorFilter.type = "highpass";
    armorFilter.frequency.setValueAtTime(4200, t + 0.02);
    const armorGain = this.ctx.createGain();
    armorGain.gain.setValueAtTime(0.12 * vol, t + 0.02);
    armorGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    armorNoise.connect(armorFilter);
    armorFilter.connect(armorGain);
    this.routeWithReverb(armorGain, armorGain, 0.18, pan);
    this.registerNodeCleanup(armorNoise, armorFilter, armorGain);
    armorNoise.start(t + 0.02);
    armorNoise.stop(t + 0.1);
  };

  // Override standard marching step with authentic caligae stomp
  P.playMarchingStep = function(pan = 0) {
    this.playCaligaeStomp(pan);
  };

  // 2. CORNU WAR HORN (The mighty circular brass horn of the Cornicen)
  P.playCornuWarHorn = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.notification) Qt.notification(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Harmonic natural series of the Roman Cornu: F#2 (92.5Hz), C#3 (138.6Hz), F#3 (185Hz)
    const baseFreq = 92.5;
    const sawOsc = this.ctx.createOscillator();
    sawOsc.type = "sawtooth";
    // Lip-buzz attack slide (+16Hz over 50ms)
    sawOsc.frequency.setValueAtTime(baseFreq - 14, t);
    sawOsc.frequency.exponentialRampToValueAtTime(baseFreq + 46, t + 0.45);
    sawOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, t + 1.1);

    const triOsc = this.ctx.createOscillator();
    triOsc.type = "triangle";
    triOsc.frequency.setValueAtTime((baseFreq - 14) * 2, t);
    triOsc.frequency.exponentialRampToValueAtTime((baseFreq + 46) * 2, t + 0.45);
    triOsc.frequency.exponentialRampToValueAtTime((baseFreq * 1.5) * 2, t + 1.1);

    // Sub-bass chest resonance
    const subOsc = this.ctx.createOscillator();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(baseFreq, t);

    // Subtle lip flutter vibrato (5.5 Hz)
    const lfo = this.ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(5.5, t);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(14, t);
    lfoGain.gain.exponentialRampToValueAtTime(4, t + 1.5);
    lfo.connect(lfoGain);
    lfoGain.connect(sawOsc.frequency);
    lfoGain.connect(triOsc.frequency);

    // Resonant horn bell acoustic impedance filter sweep
    const hornFilter = this.ctx.createBiquadFilter();
    hornFilter.type = "lowpass";
    hornFilter.frequency.setValueAtTime(280, t);
    hornFilter.frequency.linearRampToValueAtTime(2200, t + 0.35);
    hornFilter.frequency.exponentialRampToValueAtTime(700, t + 1.8);
    hornFilter.Q.value = 3.5;

    // Amplitude envelope: swelling brass attack, powerful sustain, natural decay
    const mainGain = this.ctx.createGain();
    mainGain.gain.setValueAtTime(0, t);
    mainGain.gain.linearRampToValueAtTime(0.42 * vol, t + 0.18);
    mainGain.gain.setValueAtTime(0.4 * vol, t + 1.1);
    mainGain.gain.exponentialRampToValueAtTime(0.001, t + 2.1);

    sawOsc.connect(hornFilter);
    triOsc.connect(hornFilter);
    subOsc.connect(hornFilter);
    hornFilter.connect(mainGain);

    this.routeWithReverb(mainGain, mainGain, 0.75, pan);
    this.registerNodeCleanup(sawOsc, triOsc, subOsc, lfo, lfoGain, hornFilter, mainGain);

    sawOsc.start(t);
    triOsc.start(t);
    subOsc.start(t);
    lfo.start(t);

    sawOsc.stop(t + 2.2);
    triOsc.stop(t + 2.2);
    subOsc.stop(t + 2.2);
    lfo.stop(t + 2.2);
  };

  // 3. BUCCINA (Bucinator tactical clarion call: heraldic triad)
  P.playBuccina = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.notification) Qt.notification(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Tactical heraldic notes: A4 (440Hz), C#5 (554Hz), E5 (659Hz), A5 (880Hz)
    const notes = [
      { f: 440.0, start: 0, dur: 0.12, gain: 0.28 },
      { f: 554.37, start: 0.13, dur: 0.12, gain: 0.30 },
      { f: 659.25, start: 0.26, dur: 0.18, gain: 0.32 },
      { f: 880.0, start: 0.45, dur: 0.85, gain: 0.38 }
    ];

    notes.forEach(n => {
      if (!this.ctx) return;
      const noteTime = t + n.start;
      const oscSaw = this.ctx.createOscillator();
      oscSaw.type = "sawtooth";
      oscSaw.frequency.setValueAtTime(n.f, noteTime);

      const oscSquare = this.ctx.createOscillator();
      oscSquare.type = "square";
      oscSquare.frequency.setValueAtTime(n.f, noteTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(n.f * 1.8, noteTime);
      filter.Q.value = 2.4;

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, noteTime);
      g.gain.linearRampToValueAtTime(n.gain * vol, noteTime + 0.025);
      g.gain.exponentialRampToValueAtTime(0.001, noteTime + n.dur);

      oscSaw.connect(filter);
      oscSquare.connect(filter);
      filter.connect(g);

      this.routeWithReverb(g, g, 0.5, pan);
      this.registerNodeCleanup(oscSaw, oscSquare, filter, g);

      oscSaw.start(noteTime);
      oscSquare.start(noteTime);
      oscSaw.stop(noteTime + n.dur + 0.05);
      oscSquare.stop(noteTime + n.dur + 0.05);
    });
  };

  // 4. LITUUS FANFARE (Roman Equites J-shaped cavalry clarion)
  P.playLituusFanfare = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.notification) Qt.notification(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Ascending clarion: D4 (293.7Hz), F#4 (370Hz), A4 (440Hz), D5 (587.3Hz)
    const motif = [
      { f: 293.66, time: 0, dur: 0.11 },
      { f: 369.99, time: 0.11, dur: 0.11 },
      { f: 440.0, time: 0.22, dur: 0.16 },
      { f: 587.33, time: 0.39, dur: 0.7 }
    ];

    motif.forEach(m => {
      if (!this.ctx) return;
      const nTime = t + m.time;
      const osc = this.ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(m.f, nTime);

      const f = this.ctx.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.setValueAtTime(m.f * 2.2, nTime);
      f.Q.value = 3.0;

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, nTime);
      g.gain.linearRampToValueAtTime(0.25 * vol, nTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, nTime + m.dur);

      osc.connect(f);
      f.connect(g);
      this.routeWithReverb(g, g, 0.4, pan);
      this.registerNodeCleanup(osc, f, g);

      osc.start(nTime);
      osc.stop(nTime + m.dur + 0.05);
    });
  };

  // 5. TUBA ROMANA (Imperial straight bronze military trumpet)
  P.playTubaRomana = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(116.54, t); // Bb2
    osc.frequency.linearRampToValueAtTime(174.61, t + 0.3); // F3

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, t);
    filter.frequency.linearRampToValueAtTime(1900, t + 0.25);
    filter.frequency.exponentialRampToValueAtTime(600, t + 1.2);
    filter.Q.value = 4;

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.38 * vol, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

    osc.connect(filter);
    filter.connect(g);
    this.routeWithReverb(g, g, 0.65, pan);
    this.registerNodeCleanup(osc, filter, g);

    osc.start(t);
    osc.stop(t + 1.5);
  };

  // 6. SCUTUM WALL & SHIELD BLOCK (Curved wood, bronze rim & iron umbo boss)
  P.playShieldBlock = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.impact) Qt.impact(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Layer A: Heavy curved lime-wood thud
    const woodOsc = this.ctx.createOscillator();
    woodOsc.type = "triangle";
    woodOsc.frequency.setValueAtTime(140, t);
    woodOsc.frequency.exponentialRampToValueAtTime(48, t + 0.14);
    const woodFilter = this.ctx.createBiquadFilter();
    woodFilter.type = "lowpass";
    woodFilter.frequency.setValueAtTime(260, t);
    const woodGain = this.ctx.createGain();
    woodGain.gain.setValueAtTime(0, t);
    woodGain.gain.linearRampToValueAtTime(0.55 * vol, t + 0.015);
    woodGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    woodOsc.connect(woodFilter);
    woodFilter.connect(woodGain);
    this.routeWithReverb(woodGain, woodGain, 0.25, pan);
    this.registerNodeCleanup(woodOsc, woodFilter, woodGain);
    woodOsc.start(t);
    woodOsc.stop(t + 0.28);

    // Layer B: Central iron boss (umbo) metallic ringing deflection
    const bossOsc = this.ctx.createOscillator();
    bossOsc.type = "sine";
    bossOsc.frequency.setValueAtTime(1150, t);
    bossOsc.frequency.exponentialRampToValueAtTime(820, t + 0.18);
    const bossGain = this.ctx.createGain();
    bossGain.gain.setValueAtTime(0.28 * vol, t);
    bossGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    bossOsc.connect(bossGain);
    this.routeWithReverb(bossGain, bossGain, 0.3, pan);
    this.registerNodeCleanup(bossOsc, bossGain);
    bossOsc.start(t);
    bossOsc.stop(t + 0.25);

    // Layer C: High bronze rim crack
    const rimNoise = this.ctx.createBufferSource();
    rimNoise.buffer = this.createNoiseBuffer(this.ctx, 0.12);
    const rimFilter = this.ctx.createBiquadFilter();
    rimFilter.type = "bandpass";
    rimFilter.frequency.setValueAtTime(2800, t);
    rimFilter.Q.value = 4.5;
    const rimGain = this.ctx.createGain();
    rimGain.gain.setValueAtTime(0.35 * vol, t);
    rimGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    rimNoise.connect(rimFilter);
    rimFilter.connect(rimGain);
    this.routeWithReverb(rimGain, rimGain, 0.2, pan);
    this.registerNodeCleanup(rimNoise, rimFilter, rimGain);
    rimNoise.start(t);
    rimNoise.stop(t + 0.14);
  };

  // Testudo / Legionary Shield Wall formation lock
  P.playScutumWall = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    // 3 staggered overlapping shield locks
    [0, 0.045, 0.09].forEach((delay, idx) => {
      setTimeout(() => {
        if (!this.isMuted && this.ctx) this.playShieldBlock(pan + (idx - 1) * 0.25);
      }, delay * 1000);
    });
  };

  // 7. GLADIUS CLASH (Sharp Roman steel strike & blade rasp)
  P.playGladiusClash = function(isCrit = false, pan = 0) {
    try {
      if (typeof Qt !== "undefined") {
        if (isCrit && Qt.criticalHit) Qt.criticalHit();
        else if (Qt.impact) Qt.impact();
      }
    } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Layer A: Razor-sharp iron ring (FM synthesis)
    const basePitch = isCrit ? 3150 : 2650;
    const carrier = this.ctx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.setValueAtTime(basePitch, t);

    const mod = this.ctx.createOscillator();
    mod.type = "sine";
    mod.frequency.setValueAtTime(basePitch * 1.414, t);

    const modGain = this.ctx.createGain();
    modGain.gain.setValueAtTime(basePitch * 2.8, t);
    modGain.gain.exponentialRampToValueAtTime(8, t + 0.22);
    mod.connect(modGain);
    modGain.connect(carrier.frequency);

    const carrierGain = this.ctx.createGain();
    carrierGain.gain.setValueAtTime(0.42 * vol, t);
    carrierGain.gain.exponentialRampToValueAtTime(0.001, t + (isCrit ? 0.45 : 0.28));

    carrier.connect(carrierGain);
    this.routeWithReverb(carrierGain, carrierGain, isCrit ? 0.45 : 0.28, pan);
    this.registerNodeCleanup(carrier, mod, modGain, carrierGain);

    mod.start(t);
    carrier.start(t);
    mod.stop(t + 0.5);
    carrier.stop(t + 0.5);

    // Layer B: Blade friction rasp (scraping iron edges)
    const raspNoise = this.ctx.createBufferSource();
    raspNoise.buffer = this.createNoiseBuffer(this.ctx, 0.14);
    const raspFilter = this.ctx.createBiquadFilter();
    raspFilter.type = "bandpass";
    raspFilter.frequency.setValueAtTime(5400, t);
    raspFilter.Q.value = 5.0;
    const raspGain = this.ctx.createGain();
    raspGain.gain.setValueAtTime(0.32 * vol, t);
    raspGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    raspNoise.connect(raspFilter);
    raspFilter.connect(raspGain);
    this.routeWithReverb(raspGain, raspGain, 0.2, pan);
    this.registerNodeCleanup(raspNoise, raspFilter, raspGain);
    raspNoise.start(t);
    raspNoise.stop(t + 0.15);

    // Layer C: Heavy hilt / pommel shock
    const hiltOsc = this.ctx.createOscillator();
    hiltOsc.type = "triangle";
    hiltOsc.frequency.setValueAtTime(220, t);
    hiltOsc.frequency.exponentialRampToValueAtTime(75, t + 0.08);
    const hiltGain = this.ctx.createGain();
    hiltGain.gain.setValueAtTime(0.35 * vol, t);
    hiltGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    hiltOsc.connect(hiltGain);
    this.routeWithReverb(hiltGain, hiltGain, 0.15, pan);
    this.registerNodeCleanup(hiltOsc, hiltGain);
    hiltOsc.start(t);
    hiltOsc.stop(t + 0.12);
  };

  P.playSwordClash = function(isCrit = false, pan = 0) {
    this.playGladiusClash(isCrit, pan);
  };

  // 8. PILUM BARRAGE (Heavy throwing javelin volley: whoosh, impact & soft-iron neck bending)
  P.playPilumBarrage = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.impact) Qt.impact(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // 3 staggered throwing javelin whooshes
    for (let i = 0; i < 3; i++) {
      const jTime = t + i * 0.07;
      const whooshNoise = this.ctx.createBufferSource();
      whooshNoise.buffer = this.createNoiseBuffer(this.ctx, 0.22);
      const whooshFilter = this.ctx.createBiquadFilter();
      whooshFilter.type = "bandpass";
      whooshFilter.frequency.setValueAtTime(2600 + i * 350, jTime);
      whooshFilter.frequency.exponentialRampToValueAtTime(450, jTime + 0.18);
      whooshFilter.Q.value = 3.5;
      const whooshGain = this.ctx.createGain();
      whooshGain.gain.setValueAtTime(0, jTime);
      whooshGain.gain.linearRampToValueAtTime(0.28 * vol, jTime + 0.03);
      whooshGain.gain.exponentialRampToValueAtTime(0.001, jTime + 0.2);
      whooshNoise.connect(whooshFilter);
      whooshFilter.connect(whooshGain);
      this.routeWithReverb(whooshGain, whooshGain, 0.25, pan + (i - 1) * 0.2);
      this.registerNodeCleanup(whooshNoise, whooshFilter, whooshGain);
      whooshNoise.start(jTime);
      whooshNoise.stop(jTime + 0.24);
    }

    // Impact & iron shank bending twang at t + 0.18
    setTimeout(() => {
      if (this.isMuted || !this.ctx) return;
      const impT = this.ctx.currentTime;
      // Penetration thud into shield
      const thudOsc = this.ctx.createOscillator();
      thudOsc.type = "triangle";
      thudOsc.frequency.setValueAtTime(140, impT);
      thudOsc.frequency.exponentialRampToValueAtTime(45, impT + 0.15);
      const thudGain = this.ctx.createGain();
      thudGain.gain.setValueAtTime(0.48 * vol, impT);
      thudGain.gain.exponentialRampToValueAtTime(0.001, impT + 0.18);
      thudOsc.connect(thudGain);
      this.routeWithReverb(thudGain, thudGain, 0.2, pan);
      this.registerNodeCleanup(thudOsc, thudGain);
      thudOsc.start(impT);
      thudOsc.stop(impT + 0.2);

      // Bending iron neck twang
      const twangOsc = this.ctx.createOscillator();
      twangOsc.type = "sine";
      twangOsc.frequency.setValueAtTime(480, impT + 0.02);
      twangOsc.frequency.exponentialRampToValueAtTime(210, impT + 0.25);
      const twangGain = this.ctx.createGain();
      twangGain.gain.setValueAtTime(0.22 * vol, impT + 0.02);
      twangGain.gain.exponentialRampToValueAtTime(0.001, impT + 0.28);
      twangOsc.connect(twangGain);
      this.routeWithReverb(twangGain, twangGain, 0.35, pan);
      this.registerNodeCleanup(twangOsc, twangGain);
      twangOsc.start(impT + 0.02);
      twangOsc.stop(impT + 0.3);
    }, 180);
  };

  // 9. RAMMING ATTACK & HULL COLLISION (Bronze Rostrum crashing into enemy timbers)
  P.playRammingAttack = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.heavyImpact) Qt.heavyImpact(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Layer A: Low subterranean shockwave (bronze ram prow impact)
    const ramOsc = this.ctx.createOscillator();
    ramOsc.type = "sine";
    ramOsc.frequency.setValueAtTime(65, t);
    ramOsc.frequency.exponentialRampToValueAtTime(18, t + 0.45);
    const ramGain = this.ctx.createGain();
    ramGain.gain.setValueAtTime(0, t);
    ramGain.gain.linearRampToValueAtTime(0.7 * vol, t + 0.03);
    ramGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    ramOsc.connect(ramGain);
    this.routeWithReverb(ramGain, ramGain, 0.4, pan);
    this.registerNodeCleanup(ramOsc, ramGain);
    ramOsc.start(t);
    ramOsc.stop(t + 0.65);

    // Layer B: Catastrophic splintering oak/cedar timbers
    [0.02, 0.07, 0.14, 0.22].forEach((offset, idx) => {
      if (!this.ctx) return;
      const splinterTime = t + offset;
      const sNoise = this.ctx.createBufferSource();
      sNoise.buffer = this.createNoiseBuffer(this.ctx, 0.18);
      const sFilter = this.ctx.createBiquadFilter();
      sFilter.type = "highpass";
      sFilter.frequency.setValueAtTime(1200 + idx * 350, splinterTime);
      const sGain = this.ctx.createGain();
      sGain.gain.setValueAtTime(0.42 * vol, splinterTime);
      sGain.gain.exponentialRampToValueAtTime(0.001, splinterTime + 0.15);
      sNoise.connect(sFilter);
      sFilter.connect(sGain);
      this.routeWithReverb(sGain, sGain, 0.35, pan + (idx % 2 === 0 ? -0.2 : 0.2));
      this.registerNodeCleanup(sNoise, sFilter, sGain);
      sNoise.start(splinterTime);
      sNoise.stop(splinterTime + 0.18);
    });

    // Layer C: Boiling bow wave surge & sea foam
    const waterNoise = this.ctx.createBufferSource();
    waterNoise.buffer = this.createNoiseBuffer(this.ctx, 0.7);
    const waterFilter = this.ctx.createBiquadFilter();
    waterFilter.type = "lowpass";
    waterFilter.frequency.setValueAtTime(220, t + 0.05);
    waterFilter.frequency.linearRampToValueAtTime(650, t + 0.25);
    waterFilter.frequency.exponentialRampToValueAtTime(140, t + 0.7);
    const waterGain = this.ctx.createGain();
    waterGain.gain.setValueAtTime(0, t + 0.05);
    waterGain.gain.linearRampToValueAtTime(0.48 * vol, t + 0.2);
    waterGain.gain.exponentialRampToValueAtTime(0.001, t + 0.72);
    waterNoise.connect(waterFilter);
    waterFilter.connect(waterGain);
    this.routeWithReverb(waterGain, waterGain, 0.5, pan);
    this.registerNodeCleanup(waterNoise, waterFilter, waterGain);
    waterNoise.start(t + 0.05);
    waterNoise.stop(t + 0.75);
  };

  P.playHullCollision = function(pan = 0) {
    this.playRammingAttack(pan);
  };

  // 10. HORTATOR OAR STROKE (The cadence hammer & 170-oar dip of the Roman quinquereme)
  P.playHortatorOarStroke = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.impact) Qt.impact(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Layer A: Hortator's wooden mallet (portisculus) strike on hardwood sounding block
    const malletOsc = this.ctx.createOscillator();
    malletOsc.type = "sine";
    malletOsc.frequency.setValueAtTime(380, t);
    malletOsc.frequency.exponentialRampToValueAtTime(85, t + 0.09);
    const malletFilter = this.ctx.createBiquadFilter();
    malletFilter.type = "lowpass";
    malletFilter.frequency.setValueAtTime(750, t);
    const malletGain = this.ctx.createGain();
    malletGain.gain.setValueAtTime(0.55 * vol, t);
    malletGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    malletOsc.connect(malletFilter);
    malletFilter.connect(malletGain);
    this.routeWithReverb(malletGain, malletGain, 0.22, pan);
    this.registerNodeCleanup(malletOsc, malletFilter, malletGain);
    malletOsc.start(t);
    malletOsc.stop(t + 0.14);

    // Layer B: 170 oars dipping simultaneously into Mediterranean swell
    const dipNoise = this.ctx.createBufferSource();
    dipNoise.buffer = this.createNoiseBuffer(this.ctx, 0.65);
    const dipFilter = this.ctx.createBiquadFilter();
    dipFilter.type = "bandpass";
    dipFilter.frequency.setValueAtTime(260, t + 0.03);
    dipFilter.frequency.linearRampToValueAtTime(620, t + 0.18);
    dipFilter.frequency.exponentialRampToValueAtTime(160, t + 0.6);
    dipFilter.Q.value = 1.3;
    const dipGain = this.ctx.createGain();
    dipGain.gain.setValueAtTime(0, t + 0.03);
    dipGain.gain.linearRampToValueAtTime(0.38 * vol, t + 0.16);
    dipGain.gain.exponentialRampToValueAtTime(0.001, t + 0.62);
    dipNoise.connect(dipFilter);
    dipFilter.connect(dipGain);
    this.routeWithReverb(dipGain, dipGain, 0.35, pan);
    this.registerNodeCleanup(dipNoise, dipFilter, dipGain);
    dipNoise.start(t + 0.03);
    dipNoise.stop(t + 0.65);

    // Layer C: Greased leather rowlock (scalmus) tension groaning
    const lockNoise = this.ctx.createBufferSource();
    lockNoise.buffer = this.createNoiseBuffer(this.ctx, 0.2);
    const lockFilter = this.ctx.createBiquadFilter();
    lockFilter.type = "bandpass";
    lockFilter.frequency.setValueAtTime(840, t + 0.08);
    lockFilter.Q.value = 4.0;
    const lockGain = this.ctx.createGain();
    lockGain.gain.setValueAtTime(0.12 * vol, t + 0.08);
    lockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
    lockNoise.connect(lockFilter);
    lockFilter.connect(lockGain);
    this.routeWithReverb(lockGain, lockGain, 0.18, pan);
    this.registerNodeCleanup(lockNoise, lockFilter, lockGain);
    lockNoise.start(t + 0.08);
    lockNoise.stop(t + 0.25);
  };

  // 11. SAGITTARII ARROW SALVO (Bowstring release twang, whistling flight & impacts)
  P.playArrowSalvo = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Bowstring release snaps
    for (let i = 0; i < 3; i++) {
      const bTime = t + i * 0.04;
      const stringOsc = this.ctx.createOscillator();
      stringOsc.type = "triangle";
      stringOsc.frequency.setValueAtTime(220, bTime);
      stringOsc.frequency.exponentialRampToValueAtTime(360, bTime + 0.02);
      stringOsc.frequency.exponentialRampToValueAtTime(90, bTime + 0.06);
      const stringGain = this.ctx.createGain();
      stringGain.gain.setValueAtTime(0.25 * vol, bTime);
      stringGain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.07);
      stringOsc.connect(stringGain);
      this.routeWithReverb(stringGain, stringGain, 0.15, pan);
      this.registerNodeCleanup(stringOsc, stringGain);
      stringOsc.start(bTime);
      stringOsc.stop(bTime + 0.08);
    }

    // Whistling arrow flight through air
    for (let i = 0; i < 5; i++) {
      const aTime = t + 0.04 + i * 0.035;
      const flyNoise = this.ctx.createBufferSource();
      flyNoise.buffer = this.createNoiseBuffer(this.ctx, 0.28);
      const flyFilter = this.ctx.createBiquadFilter();
      flyFilter.type = "bandpass";
      flyFilter.frequency.setValueAtTime(2200 + i * 280, aTime);
      flyFilter.frequency.exponentialRampToValueAtTime(320, aTime + 0.24);
      flyFilter.Q.value = 3.2;
      const flyGain = this.ctx.createGain();
      flyGain.gain.setValueAtTime(0, aTime);
      flyGain.gain.linearRampToValueAtTime(0.18 * vol, aTime + 0.04);
      flyGain.gain.exponentialRampToValueAtTime(0.001, aTime + 0.26);
      flyNoise.connect(flyFilter);
      flyFilter.connect(flyGain);
      this.routeWithReverb(flyGain, flyGain, 0.25, pan + (i - 2) * 0.15);
      this.registerNodeCleanup(flyNoise, flyFilter, flyGain);
      flyNoise.start(aTime);
      flyNoise.stop(aTime + 0.28);
    }

    // Staggered impacts on target wood/shields
    setTimeout(() => {
      if (this.isMuted || !this.ctx) return;
      const hitT = this.ctx.currentTime;
      for (let j = 0; j < 4; j++) {
        const hTime = hitT + j * 0.03;
        const hitNoise = this.ctx.createBufferSource();
        hitNoise.buffer = this.createNoiseBuffer(this.ctx, 0.08);
        const hitFilter = this.ctx.createBiquadFilter();
        hitFilter.type = "bandpass";
        hitFilter.frequency.setValueAtTime(1400 + j * 300, hTime);
        hitFilter.Q.value = 2.0;
        const hitGain = this.ctx.createGain();
        hitGain.gain.setValueAtTime(0.22 * vol, hTime);
        hitGain.gain.exponentialRampToValueAtTime(0.001, hTime + 0.07);
        hitNoise.connect(hitFilter);
        hitFilter.connect(hitGain);
        this.routeWithReverb(hitGain, hitGain, 0.15, pan);
        this.registerNodeCleanup(hitNoise, hitFilter, hitGain);
        hitNoise.start(hTime);
        hitNoise.stop(hTime + 0.08);
      }
    }, 240);
  };

  // 12. BALLISTA TWANG & LAUNCH (Torsion sinew skein release & heavy bolt)
  P.playBallistaTwang = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Torsion sinew release twang (deep organic tension snap)
    const sinewOsc = this.ctx.createOscillator();
    sinewOsc.type = "triangle";
    sinewOsc.frequency.setValueAtTime(95, t);
    sinewOsc.frequency.linearRampToValueAtTime(320, t + 0.04);
    sinewOsc.frequency.exponentialRampToValueAtTime(110, t + 0.22);
    const sinewGain = this.ctx.createGain();
    sinewGain.gain.setValueAtTime(0.55 * vol, t);
    sinewGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    sinewOsc.connect(sinewGain);
    this.routeWithReverb(sinewGain, sinewGain, 0.35, pan);
    this.registerNodeCleanup(sinewOsc, sinewGain);
    sinewOsc.start(t);
    sinewOsc.stop(t + 0.3);

    // Heavy wooden winch arm recoil impact
    const armOsc = this.ctx.createOscillator();
    armOsc.type = "sine";
    armOsc.frequency.setValueAtTime(160, t + 0.02);
    armOsc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    const armGain = this.ctx.createGain();
    armGain.gain.setValueAtTime(0.45 * vol, t + 0.02);
    armGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    armOsc.connect(armGain);
    this.routeWithReverb(armGain, armGain, 0.2, pan);
    this.registerNodeCleanup(armOsc, armGain);
    armOsc.start(t + 0.02);
    armOsc.stop(t + 0.16);

    // Whistling heavy iron bolt cut
    const boltNoise = this.ctx.createBufferSource();
    boltNoise.buffer = this.createNoiseBuffer(this.ctx, 0.35);
    const boltFilter = this.ctx.createBiquadFilter();
    boltFilter.type = "bandpass";
    boltFilter.frequency.setValueAtTime(3100, t + 0.04);
    boltFilter.frequency.exponentialRampToValueAtTime(600, t + 0.3);
    boltFilter.Q.value = 4.0;
    const boltGain = this.ctx.createGain();
    boltGain.gain.setValueAtTime(0, t + 0.04);
    boltGain.gain.linearRampToValueAtTime(0.35 * vol, t + 0.08);
    boltGain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    boltNoise.connect(boltFilter);
    boltFilter.connect(boltGain);
    this.routeWithReverb(boltGain, boltGain, 0.25, pan);
    this.registerNodeCleanup(boltNoise, boltFilter, boltGain);
    boltNoise.start(t + 0.04);
    boltNoise.stop(t + 0.35);
  };

  P.playBallistaLaunch = function(pan = 0) {
    this.playBallistaTwang(pan);
  };

  // 13. GREEK FIRE (Syphonatores pressurized siphon hiss & roaring sea flame)
  P.playGreekFire = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Pressurized bronze pump hiss
    const pumpNoise = this.ctx.createBufferSource();
    pumpNoise.buffer = this.createNoiseBuffer(this.ctx, 0.3);
    const pumpFilter = this.ctx.createBiquadFilter();
    pumpFilter.type = "bandpass";
    pumpFilter.frequency.setValueAtTime(2800, t);
    pumpFilter.Q.value = 3.5;
    const pumpGain = this.ctx.createGain();
    pumpGain.gain.setValueAtTime(0.4 * vol, t);
    pumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    pumpNoise.connect(pumpFilter);
    pumpFilter.connect(pumpGain);
    this.routeWithReverb(pumpGain, pumpGain, 0.2, pan);
    this.registerNodeCleanup(pumpNoise, pumpFilter, pumpGain);
    pumpNoise.start(t);
    pumpNoise.stop(t + 0.28);

    // Roaring ignition fireball (dense low noise)
    const fireNoise = this.ctx.createBufferSource();
    fireNoise.buffer = this.createNoiseBuffer(this.ctx, 0.85);
    const fireFilter = this.ctx.createBiquadFilter();
    fireFilter.type = "lowpass";
    fireFilter.frequency.setValueAtTime(140, t + 0.06);
    fireFilter.frequency.linearRampToValueAtTime(580, t + 0.25);
    fireFilter.frequency.exponentialRampToValueAtTime(220, t + 0.8);
    const fireGain = this.ctx.createGain();
    fireGain.gain.setValueAtTime(0, t + 0.06);
    fireGain.gain.linearRampToValueAtTime(0.52 * vol, t + 0.18);
    fireGain.gain.exponentialRampToValueAtTime(0.001, t + 0.82);
    fireNoise.connect(fireFilter);
    fireFilter.connect(fireGain);
    this.routeWithReverb(fireGain, fireGain, 0.45, pan);
    this.registerNodeCleanup(fireNoise, fireFilter, fireGain);
    fireNoise.start(t + 0.06);
    fireNoise.stop(t + 0.85);
  };

  P.playGreekFireCrackle = function(pan = 0) {
    this.playGreekFire(pan);
  };

  // 14. CORVUS BOARDING BRIDGE DROP (Naval boarding spike slamming deck)
  P.playCorvusDrop = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Pulley rope whir
    const ropeNoise = this.ctx.createBufferSource();
    ropeNoise.buffer = this.createNoiseBuffer(this.ctx, 0.2);
    const ropeFilter = this.ctx.createBiquadFilter();
    ropeFilter.type = "bandpass";
    ropeFilter.frequency.setValueAtTime(1200, t);
    ropeFilter.frequency.linearRampToValueAtTime(2400, t + 0.15);
    const ropeGain = this.ctx.createGain();
    ropeGain.gain.setValueAtTime(0.25 * vol, t);
    ropeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    ropeNoise.connect(ropeFilter);
    ropeFilter.connect(ropeGain);
    this.routeWithReverb(ropeGain, ropeGain, 0.2, pan);
    this.registerNodeCleanup(ropeNoise, ropeFilter, ropeGain);
    ropeNoise.start(t);
    ropeNoise.stop(t + 0.2);

    // Colossal bridge slam and raven-beak iron spike fracture
    setTimeout(() => {
      if (this.isMuted || !this.ctx) return;
      const sT = this.ctx.currentTime;
      // Heavy bridge wood boom
      const bridgeOsc = this.ctx.createOscillator();
      bridgeOsc.type = "triangle";
      bridgeOsc.frequency.setValueAtTime(110, sT);
      bridgeOsc.frequency.exponentialRampToValueAtTime(35, sT + 0.25);
      const bridgeGain = this.ctx.createGain();
      bridgeGain.gain.setValueAtTime(0.65 * vol, sT);
      bridgeGain.gain.exponentialRampToValueAtTime(0.001, sT + 0.4);
      bridgeOsc.connect(bridgeGain);
      this.routeWithReverb(bridgeGain, bridgeGain, 0.4, pan);
      this.registerNodeCleanup(bridgeOsc, bridgeGain);
      bridgeOsc.start(sT);
      bridgeOsc.stop(sT + 0.45);

      // Iron spike timber splinter
      const crkNoise = this.ctx.createBufferSource();
      crkNoise.buffer = this.createNoiseBuffer(this.ctx, 0.22);
      const crkFilter = this.ctx.createBiquadFilter();
      crkFilter.type = "highpass";
      crkFilter.frequency.setValueAtTime(1600, sT);
      const crkGain = this.ctx.createGain();
      crkGain.gain.setValueAtTime(0.48 * vol, sT);
      crkGain.gain.exponentialRampToValueAtTime(0.001, sT + 0.2);
      crkNoise.connect(crkFilter);
      crkFilter.connect(crkGain);
      this.routeWithReverb(crkGain, crkGain, 0.3, pan);
      this.registerNodeCleanup(crkNoise, crkFilter, crkGain);
      crkNoise.start(sT);
      crkNoise.stop(sT + 0.25);
    }, 160);
  };

  // 15. SOLID & AUREUS GOLD COIN CHIME (Crystal clear Roman coinage resonance)
  P.playSolidiClink = function(count = 3, pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.mediumTap) Qt.mediumTap(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Resonant frequencies of pure gold Aureus / silver Denarius
    const coinPitches = [2489, 3135, 3729, 4186, 4978, 5587];
    const total = Math.min(6, Math.max(1, count));

    for (let i = 0; i < total; i++) {
      const cTime = t + i * 0.05 + Math.random() * 0.018;
      const pitch = coinPitches[Math.floor(Math.random() * coinPitches.length)];

      const carrier = this.ctx.createOscillator();
      carrier.type = "sine";
      carrier.frequency.setValueAtTime(pitch, cTime);

      const mod = this.ctx.createOscillator();
      mod.type = "square";
      mod.frequency.setValueAtTime(pitch * 1.414, cTime);

      const mGain = this.ctx.createGain();
      mGain.gain.setValueAtTime(280, cTime);
      mGain.gain.exponentialRampToValueAtTime(1, cTime + 0.04);
      mod.connect(mGain);
      mGain.connect(carrier.frequency);

      const cGain = this.ctx.createGain();
      cGain.gain.setValueAtTime(0.32 * vol, cTime);
      cGain.gain.exponentialRampToValueAtTime(0.001, cTime + 0.28);

      carrier.connect(cGain);
      this.routeWithReverb(cGain, cGain, 0.25, pan + (Math.random() - 0.5) * 0.3);
      this.registerNodeCleanup(carrier, mod, mGain, cGain);

      mod.start(cTime);
      carrier.start(cTime);
      mod.stop(cTime + 0.3);
      carrier.stop(cTime + 0.3);
    }
  };

  P.playCoin = function(pan = 0) {
    this.playSolidiClink(2, pan);
  };

  // 16. HARUSPEX INCANTATION & TEMPLE AUGURY (Sacred bronze bowl gong 174 Hz & divine omen chime)
  P.playHaruspexIncantation = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Sacred bronze sacrificial bowl gong (174 Hz Solfeggio / ancient temple tone)
    const gongOsc = this.ctx.createOscillator();
    gongOsc.type = "sine";
    gongOsc.frequency.setValueAtTime(174.0, t);

    // Warm overtone harmonics
    const gongHarmonic = this.ctx.createOscillator();
    gongHarmonic.type = "sine";
    gongHarmonic.frequency.setValueAtTime(522.0, t);

    const gongHigh = this.ctx.createOscillator();
    gongHigh.type = "triangle";
    gongHigh.frequency.setValueAtTime(870.0, t);

    const gongGain = this.ctx.createGain();
    gongGain.gain.setValueAtTime(0, t);
    gongGain.gain.linearRampToValueAtTime(0.45 * vol, t + 0.04);
    gongGain.gain.exponentialRampToValueAtTime(0.001, t + 2.8);

    gongOsc.connect(gongGain);
    gongHarmonic.connect(gongGain);
    gongHigh.connect(gongGain);

    this.routeWithReverb(gongGain, gongGain, 0.75, pan);
    this.registerNodeCleanup(gongOsc, gongHarmonic, gongHigh, gongGain);

    gongOsc.start(t);
    gongHarmonic.start(t);
    gongHigh.start(t);

    gongOsc.stop(t + 2.9);
    gongHarmonic.stop(t + 2.9);
    gongHigh.stop(t + 2.9);

    // Omen chime cascades at t + 0.35
    [1318.5, 1567.9, 1760.0].forEach((chimeFreq, idx) => {
      if (!this.ctx) return;
      const cTime = t + 0.35 + idx * 0.12;
      const cOsc = this.ctx.createOscillator();
      cOsc.type = "sine";
      cOsc.frequency.setValueAtTime(chimeFreq, cTime);
      const cG = this.ctx.createGain();
      cG.gain.setValueAtTime(0.18 * vol, cTime);
      cG.gain.exponentialRampToValueAtTime(0.001, cTime + 0.6);
      cOsc.connect(cG);
      this.routeWithReverb(cG, cG, 0.55, pan);
      this.registerNodeCleanup(cOsc, cG);
      cOsc.start(cTime);
      cOsc.stop(cTime + 0.65);
    });
  };

  P.playAuguryWhisper = function(pan = 0) {
    this.playHaruspexIncantation(pan);
  };

  // 17. TRIUMPHAL OVATION & VICTORY FANFARE (Imperial Roman Triumph in Dorian mode)
  P.playTriumphalOvation = function() {
    try { if (typeof Qt !== "undefined" && Qt.victory) Qt.victory(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Imperial Roman Triumph brass fanfare chords (Dorian on D)
    const fanfareChords = [
      { time: 0, notes: [293.66, 369.99, 440.0], dur: 0.28 },
      { time: 0.30, notes: [293.66, 369.99, 440.0], dur: 0.18 },
      { time: 0.52, notes: [369.99, 440.0, 587.33], dur: 0.24 },
      { time: 0.80, notes: [440.0, 587.33, 739.99], dur: 0.35 },
      { time: 1.18, notes: [587.33, 739.99, 880.0, 1174.66], dur: 1.9 }
    ];

    fanfareChords.forEach(chord => {
      chord.notes.forEach(pitch => {
        if (!this.ctx) return;
        const noteTime = t + chord.time;
        const osc = this.ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(pitch, noteTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(pitch * 2.8, noteTime);
        filter.Q.value = 2.2;

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0, noteTime);
        g.gain.linearRampToValueAtTime(0.16 * vol, noteTime + 0.035);
        g.gain.exponentialRampToValueAtTime(0.001, noteTime + chord.dur);

        osc.connect(filter);
        filter.connect(g);
        this.routeWithReverb(g, g, 0.72);
        this.registerNodeCleanup(osc, filter, g);

        osc.start(noteTime);
        osc.stop(noteTime + chord.dur + 0.1);
      });
    });

    // Rhythmic imperial military tympanum drum march
    [0, 0.3, 0.52, 0.8, 1.18, 1.55].forEach(drumTime => {
      if (!this.ctx) return;
      const dTime = t + drumTime;
      const dOsc = this.ctx.createOscillator();
      dOsc.type = "sine";
      dOsc.frequency.setValueAtTime(80, dTime);
      dOsc.frequency.exponentialRampToValueAtTime(42, dTime + 0.18);
      const dGain = this.ctx.createGain();
      dGain.gain.setValueAtTime(0.48 * vol, dTime);
      dGain.gain.exponentialRampToValueAtTime(0.001, dTime + 0.22);
      dOsc.connect(dGain);
      this.routeWithReverb(dGain, dGain, 0.35);
      this.registerNodeCleanup(dOsc, dGain);
      dOsc.start(dTime);
      dOsc.stop(dTime + 0.25);
    });
  };

  P.playVictoryFanfare = function() {
    this.playTriumphalOvation();
  };

  // 18. TESSERA CLICK & ROMAN HUD TAP (Crisp ancient bronze/bone token tap on marble)
  P.playTesseraClick = function() {
    try { if (typeof Qt !== "undefined" && Qt.lightTap) Qt.lightTap(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Crisp high-frequency token click
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(450, t + 0.025);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(this.ctx, 0.035);
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(2400, t);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.24 * vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(g);
    noise.connect(filter);
    filter.connect(g);

    this.routeWithReverb(g, g, 0.08);
    this.registerNodeCleanup(osc, noise, filter, g);

    osc.start(t);
    noise.start(t);
    osc.stop(t + 0.04);
    noise.stop(t + 0.04);
  };

  P.playClick = function() {
    this.playTesseraClick();
  };

  // 19. PAPYRUS SCROLL OPEN (Egyptian papyrus slide & wax seal crackle)
  P.playScrollOpen = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.lightTap) Qt.lightTap(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Unrolling papyrus parchment sliding friction
    const pNoise = this.ctx.createBufferSource();
    pNoise.buffer = this.createNoiseBuffer(this.ctx, 0.28);
    const pFilter = this.ctx.createBiquadFilter();
    pFilter.type = "bandpass";
    pFilter.frequency.setValueAtTime(950, t);
    pFilter.frequency.linearRampToValueAtTime(1600, t + 0.18);
    pFilter.Q.value = 1.6;
    const pGain = this.ctx.createGain();
    pGain.gain.setValueAtTime(0, t);
    pGain.gain.linearRampToValueAtTime(0.25 * vol, t + 0.04);
    pGain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    pNoise.connect(pFilter);
    pFilter.connect(pGain);
    this.routeWithReverb(pGain, pGain, 0.18, pan);
    this.registerNodeCleanup(pNoise, pFilter, pGain);
    pNoise.start(t);
    pNoise.stop(t + 0.3);

    // Faint wax seal crackle at t + 0.02
    const wNoise = this.ctx.createBufferSource();
    wNoise.buffer = this.createNoiseBuffer(this.ctx, 0.05);
    const wFilter = this.ctx.createBiquadFilter();
    wFilter.type = "highpass";
    wFilter.frequency.setValueAtTime(3600, t + 0.02);
    const wGain = this.ctx.createGain();
    wGain.gain.setValueAtTime(0.18 * vol, t + 0.02);
    wGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    wNoise.connect(wFilter);
    wFilter.connect(wGain);
    this.routeWithReverb(wGain, wGain, 0.1, pan);
    this.registerNodeCleanup(wNoise, wFilter, wGain);
    wNoise.start(t + 0.02);
    wNoise.stop(t + 0.07);
  };

  // 20. PORT DOCKING (Mooring hemp cable groan, harbor bell chime & stone quay swell)
  P.playPortDock = function(pan = 0) {
    try { if (typeof Qt !== "undefined" && Qt.portDock) Qt.portDock(); } catch(e){}
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Gentle wave splash against stone quay
    this.playWaveSplash();

    // Harbor bronze bell chime
    [1046.5, 1567.9].forEach(bf => {
      if (!this.ctx) return;
      const bOsc = this.ctx.createOscillator();
      bOsc.type = "sine";
      bOsc.frequency.setValueAtTime(bf, t + 0.12);
      const bGain = this.ctx.createGain();
      bGain.gain.setValueAtTime(0.24 * vol, t + 0.12);
      bGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
      bOsc.connect(bGain);
      this.routeWithReverb(bGain, bGain, 0.65, pan);
      this.registerNodeCleanup(bOsc, bGain);
      bOsc.start(t + 0.12);
      bOsc.stop(t + 0.95);
    });

    // Mooring hemp cable groaning under tension
    const ropeNoise = this.ctx.createBufferSource();
    ropeNoise.buffer = this.createNoiseBuffer(this.ctx, 0.45);
    const ropeFilter = this.ctx.createBiquadFilter();
    ropeFilter.type = "bandpass";
    ropeFilter.frequency.setValueAtTime(450, t + 0.2);
    ropeFilter.frequency.linearRampToValueAtTime(750, t + 0.4);
    ropeFilter.Q.value = 4.0;
    const ropeGain = this.ctx.createGain();
    ropeGain.gain.setValueAtTime(0.22 * vol, t + 0.2);
    ropeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    ropeNoise.connect(ropeFilter);
    ropeFilter.connect(ropeGain);
    this.routeWithReverb(ropeGain, ropeGain, 0.35, pan);
    this.registerNodeCleanup(ropeNoise, ropeFilter, ropeGain);
    ropeNoise.start(t + 0.2);
    ropeNoise.stop(t + 0.6);
  };

  // 21. DEFEAT SOUND (Somber descending minor lituus call)
  P.playDefeatSound = function() {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Somber descending lament: D4 (293.7Hz) -> Bb3 (233Hz) -> G3 (196Hz) -> D3 (146.8Hz)
    const lamentNotes = [
      { f: 293.66, time: 0, dur: 0.35 },
      { f: 233.08, time: 0.35, dur: 0.35 },
      { f: 196.0, time: 0.70, dur: 0.45 },
      { f: 146.83, time: 1.15, dur: 1.4 }
    ];

    lamentNotes.forEach(n => {
      if (!this.ctx) return;
      const nTime = t + n.time;
      const osc = this.ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(n.f, nTime);

      const f = this.ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(n.f * 1.8, nTime);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, nTime);
      g.gain.linearRampToValueAtTime(0.22 * vol, nTime + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, nTime + n.dur);

      osc.connect(f);
      f.connect(g);
      this.routeWithReverb(g, g, 0.7);
      this.registerNodeCleanup(osc, f, g);

      osc.start(nTime);
      osc.stop(nTime + n.dur + 0.1);
    });
  };

  // 22. POISON HISS & ACID SIZZLE (Venenum corrosive toxic vapor)
  P.playPoisonHiss = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Acid bubbling LFO
    const bubbleOsc = this.ctx.createOscillator();
    bubbleOsc.type = "sine";
    bubbleOsc.frequency.setValueAtTime(32, t);
    const bubbleGain = this.ctx.createGain();
    bubbleGain.gain.setValueAtTime(450, t);
    bubbleOsc.connect(bubbleGain);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(this.ctx, 0.45);
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2200, t);
    filter.Q.value = 5.0;
    bubbleGain.connect(filter.frequency);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.28 * vol, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

    noise.connect(filter);
    filter.connect(g);
    this.routeWithReverb(g, g, 0.35, pan);
    this.registerNodeCleanup(noise, filter, g, bubbleOsc, bubbleGain);

    bubbleOsc.start(t);
    noise.start(t);
    bubbleOsc.stop(t + 0.45);
    noise.stop(t + 0.45);
  };

  // 23. BLEED SLASH & LACERATION (Tearing flesh and armor wound)
  P.playBleedSlash = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Heavy blade tear transient
    const tearNoise = this.ctx.createBufferSource();
    tearNoise.buffer = this.createNoiseBuffer(this.ctx, 0.18);
    const tearFilter = this.ctx.createBiquadFilter();
    tearFilter.type = "bandpass";
    tearFilter.frequency.setValueAtTime(1600, t);
    tearFilter.frequency.exponentialRampToValueAtTime(350, t + 0.15);
    tearFilter.Q.value = 3.0;

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.42 * vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    tearNoise.connect(tearFilter);
    tearFilter.connect(g);
    this.routeWithReverb(g, g, 0.25, pan);
    this.registerNodeCleanup(tearNoise, tearFilter, g);
    tearNoise.start(t);
    tearNoise.stop(t + 0.18);

    // Deep organic flesh impact
    const fleshOsc = this.ctx.createOscillator();
    fleshOsc.type = "triangle";
    fleshOsc.frequency.setValueAtTime(95, t);
    fleshOsc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
    const fGain = this.ctx.createGain();
    fGain.gain.setValueAtTime(0.35 * vol, t);
    fGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    fleshOsc.connect(fGain);
    this.routeWithReverb(fGain, fGain, 0.2, pan);
    this.registerNodeCleanup(fleshOsc, fGain);
    fleshOsc.start(t);
    fleshOsc.stop(t + 0.15);
  };

  // 24. FULMEN SHOCK (Electric lightning spark & discharge)
  P.playFulmenShock = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // High electrical buzz
    const osc1 = this.ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(880, t);
    osc1.frequency.linearRampToValueAtTime(140, t + 0.08);

    const osc2 = this.ctx.createOscillator();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(1760, t);
    osc2.frequency.linearRampToValueAtTime(220, t + 0.08);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2800, t);
    filter.Q.value = 4.0;

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.38 * vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(g);
    this.routeWithReverb(g, g, 0.45, pan);
    this.registerNodeCleanup(osc1, osc2, filter, g);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.16);
    osc2.stop(t + 0.16);
  };

  // 25. LIFE STEAL SIPHON (Sanguis drain ethereal soul resonance)
  P.playLifeStealSiphon = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Mystical ascending ethereal frequencies
    [329.63, 493.88, 659.25].forEach((f, idx) => {
      if (!this.ctx) return;
      const sT = t + idx * 0.06;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, sT);
      osc.frequency.exponentialRampToValueAtTime(f * 1.5, sT + 0.45);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, sT);
      g.gain.linearRampToValueAtTime(0.24 * vol, sT + 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, sT + 0.55);

      osc.connect(g);
      this.routeWithReverb(g, g, 0.65, pan);
      this.registerNodeCleanup(osc, g);
      osc.start(sT);
      osc.stop(sT + 0.6);
    });
  };

  // 26. GRAPPLE THROW & HOOK IMPACT (Harpax iron hook & hemp rope whir)
  P.playGrappleThrow = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Whistling rope through air
    const ropeNoise = this.ctx.createBufferSource();
    ropeNoise.buffer = this.createNoiseBuffer(this.ctx, 0.25);
    const ropeFilter = this.ctx.createBiquadFilter();
    ropeFilter.type = "bandpass";
    ropeFilter.frequency.setValueAtTime(1400, t);
    ropeFilter.frequency.linearRampToValueAtTime(2600, t + 0.18);
    const rGain = this.ctx.createGain();
    rGain.gain.setValueAtTime(0.25 * vol, t);
    rGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    ropeNoise.connect(ropeFilter);
    ropeFilter.connect(rGain);
    this.routeWithReverb(rGain, rGain, 0.2, pan);
    this.registerNodeCleanup(ropeNoise, ropeFilter, rGain);
    ropeNoise.start(t);
    ropeNoise.stop(t + 0.24);

    // Iron hook clattering on gunwales at t + 0.18
    setTimeout(() => {
      if (this.isMuted || !this.ctx) return;
      const hT = this.ctx.currentTime;
      [1450, 2180].forEach(hf => {
        const hOsc = this.ctx.createOscillator();
        hOsc.type = "sine";
        hOsc.frequency.setValueAtTime(hf, hT);
        const hG = this.ctx.createGain();
        hG.gain.setValueAtTime(0.3 * vol, hT);
        hG.gain.exponentialRampToValueAtTime(0.001, hT + 0.12);
        hOsc.connect(hG);
        this.routeWithReverb(hG, hG, 0.25, pan);
        this.registerNodeCleanup(hOsc, hG);
        hOsc.start(hT);
        hOsc.stop(hT + 0.14);
      });
    }, 180);
  };

  // 27. OAR SHEER SNAP (Snapping wooden oar shafts in water)
  P.playOarSheerSnap = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Staggered wooden oar snaps
    [0, 0.04, 0.09].forEach((off, idx) => {
      if (!this.ctx) return;
      const sT = t + off;
      const sOsc = this.ctx.createOscillator();
      sOsc.type = "triangle";
      sOsc.frequency.setValueAtTime(320 + idx * 80, sT);
      sOsc.frequency.exponentialRampToValueAtTime(80, sT + 0.06);
      const sG = this.ctx.createGain();
      sG.gain.setValueAtTime(0.45 * vol, sT);
      sG.gain.exponentialRampToValueAtTime(0.001, sT + 0.08);
      sOsc.connect(sG);
      this.routeWithReverb(sG, sG, 0.25, pan + (idx - 1) * 0.2);
      this.registerNodeCleanup(sOsc, sG);
      sOsc.start(sT);
      sOsc.stop(sT + 0.09);
    });
  };

  // 28. SPLINTER CRASH (Exploding wooden timber shrapnel & sea foam)
  P.playSplinterCrash = function(pan = 0) {
    if (this.isMuted || !this.ctx) return;
    this.initCtx();
    const t = this.ctx.currentTime;
    const vol = this.volume || 0.5;

    // Timber splinter noise burst
    const spNoise = this.ctx.createBufferSource();
    spNoise.buffer = this.createNoiseBuffer(this.ctx, 0.3);
    const spFilter = this.ctx.createBiquadFilter();
    spFilter.type = "highpass";
    spFilter.frequency.setValueAtTime(1400, t);
    const spGain = this.ctx.createGain();
    spGain.gain.setValueAtTime(0.55 * vol, t);
    spGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    spNoise.connect(spFilter);
    spFilter.connect(spGain);
    this.routeWithReverb(spGain, spGain, 0.35, pan);
    this.registerNodeCleanup(spNoise, spFilter, spGain);
    spNoise.start(t);
    spNoise.stop(t + 0.28);
  };

  // Attach global reference for easy debugging & console access
  if (typeof window !== "undefined") {
    window.__audioEngine = typeof v !== "undefined" ? v : null;
    window.audioEngine = typeof v !== "undefined" ? v : null;
  }
})();
`;

  // A. Find instantiation of AudioEngine: `const v=new Dd,Bt=`
  const vMarker = "const v=new Dd,Bt=";
  const vIdx = bundle.indexOf(vMarker);
  if (vIdx === -1) {
    throw new Error("Could not find `const v=new Dd,Bt=` in bundle!");
  }

  // Inject between `const v=new Dd;` and `const Bt=`
  bundle = bundle.substring(0, vIdx) + "const v=new Dd;\n" + romanAudioExtensions + "\nconst Bt=" + bundle.substring(vIdx + vMarker.length);

  // B. Hook up tactical card weapon attacks in playTacticalCard
  // Look for `var attackerRecovery = 800;` injected by motion pass or original weaponAnim block
  const pCardAttack = bundle.indexOf("var attackerRecovery = 800;");
  if (pCardAttack !== -1) {
    const pCardEnd = bundle.indexOf("setTimeout(() => { setPlayerAnim('idle'); }", pCardAttack);
    if (pCardEnd !== -1) {
      const enhancedCardAudio = `var attackerRecovery = 800;
      hitDelay = 220;

      if (weaponAnim === 'arrow_fire') {
        setPlayerAnim('shoot');
        spawnFX(false, 'arrow_fire_travel');
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
        hitDelay = 480;
        attackerRecovery = 950;
        impactFX = 'arrow_fire_hit';
      } else if (weaponAnim === 'javelin_launch') {
        setPlayerAnim('shoot');
        spawnFX(false, 'javelin_launch_travel');
        try { if (typeof v !== 'undefined' && v.playPilumBarrage) v.playPilumBarrage(); } catch(e){}
        hitDelay = 480;
        attackerRecovery = 950;
        impactFX = 'javelin_launch_hit';
      } else if (weaponAnim === 'fire_spray') {
        setPlayerAnim('attack');
        spawnFX(false, 'fire_spray');
        try { if (typeof v !== 'undefined' && v.playGreekFire) v.playGreekFire(); } catch(e){}
        hitDelay = 360;
        attackerRecovery = 850;
        impactFX = 'fire_burn';
      } else if (weaponAnim === 'lightning_bolt') {
        setPlayerAnim('attack');
        try { if (typeof v !== 'undefined' && v.playSpecialAbility) v.playSpecialAbility(); } catch(e){}
        hitDelay = 260;
        attackerRecovery = 750;
        impactFX = 'lightning_bolt';
      } else if (weaponAnim === 'ram_impact') {
        setPlayerAnim('ram');
        try { if (typeof v !== 'undefined' && v.playRammingAttack) v.playRammingAttack(); } catch(e){}
        hitDelay = 460;
        attackerRecovery = 880;
        impactFX = 'ram_impact';
      } else {
        setPlayerAnim('attack');
        try { if (typeof v !== 'undefined' && v.playGladiusClash) v.playGladiusClash(); } catch(e){}
        hitDelay = 380;
        attackerRecovery = 800;
        impactFX = 'sword_slash';
      }

      `;
      bundle = bundle.substring(0, pCardAttack) + enhancedCardAudio + bundle.substring(pCardEnd);
    }
  }

  // Also hook up Defense tactical card to playScutumWall
  const pDefBlock = bundle.indexOf("setPlayerBlock(prev => prev + def);");
  if (pDefBlock !== -1) {
    const pDefEnd = bundle.indexOf("spawnFX(true, 'block');", pDefBlock);
    if (pDefEnd !== -1) {
      const newDefCode = `setPlayerBlock(prev => prev + def);
      spawnText('+' + def + ' DEFENSE 🛡️', true, '#38bdf8');
      spawnFX(true, 'block');
      try { if (typeof v !== 'undefined' && v.playScutumWall) v.playScutumWall(); } catch(e){}`;
      bundle = bundle.substring(0, pDefBlock) + newDefCode + bundle.substring(pDefEnd + "spawnFX(true, 'block');".length);
    }
  }

  // Validate syntax with esbuild
  console.log("Validating updated bundle with esbuild...");
  esbuild.transformSync(bundle, { loader: "js" });
  console.log("OK: Syntax check clean. Final bundle size: " + bundle.length + " bytes.");

  fs.writeFileSync(targetPath, bundle, "utf8");
  console.log("SUCCESS: Written Roman Audio Engine to " + targetPath);

  const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, "utf8");
    console.log("SUCCESS: Synced Roman Audio Engine to " + distPath);
  }

  console.log("=== AUTHENTIC ROMAN AUDIO ENGINE INTEGRATION COMPLETE ===");
}

if (require.main === module) {
  applyRomanAudioEngine();
}

module.exports = applyRomanAudioEngine;
