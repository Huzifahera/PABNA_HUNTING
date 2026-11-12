/**
 * THE PABNA HAUNTING - Paranormal Investigator Equipment & HUD
 * Tri-Field EMF Meter, Spirit Box Radio (EVP), UV Blacklight, and Ambient Dust Orbs.
 */

class ParanormalEquipmentManager {
  constructor() {
    this.isDrawerOpen = false;
    this.isUVActive = false;
    this.isSpiritBoxScanning = false;
    this.spiritFreq = 88.3;
    this.spiritScanTimer = null;
    this.currentEmf = 1.4;
    this.targetEmf = 1.4;
    this.ambientParticles = [];
    this.init();
  }

  init() {
    this.injectHUD();
    this.initAmbientOrbs();
    this.bindEvents();
    this.startEmfLoop();
  }

  injectHUD() {
    // 1. Ambient Orbs Canvas
    if (!document.getElementById('ambient-orbs-canvas')) {
      const orbsCanvas = document.createElement('canvas');
      orbsCanvas.id = 'ambient-orbs-canvas';
      document.body.appendChild(orbsCanvas);
    }

    // 2. Floating Toggle Button
    const hudBtn = document.createElement('button');
    hudBtn.className = 'equipment-toggle-btn';
    hudBtn.id = 'btn-toggle-equipment';
    hudBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
      <span>INVESTIGATOR TOOLKIT</span>
      <span class="equipment-toggle-badge" id="hud-emf-badge">1.4 mG</span>
    `;
    document.body.appendChild(hudBtn);

    // 3. Equipment Drawer
    const drawer = document.createElement('div');
    drawer.className = 'equipment-drawer';
    drawer.id = 'equipment-drawer';
    drawer.innerHTML = `
      <div class="equipment-drawer-header">
        <span class="equipment-drawer-title">PARANORMAL GEAR // HUD v2.4</span>
        <button id="btn-close-equipment" style="background:none; border:none; color:#78909c; cursor:pointer; font-family:monospace;">✕</button>
      </div>

      <nav class="tool-nav">
        <button class="tool-tab-btn active" data-tab="emf">EMF METER</button>
        <button class="tool-tab-btn" data-tab="spirit">SPIRIT BOX</button>
        <button class="tool-tab-btn" data-tab="uv">UV LIGHT</button>
      </nav>

      <!-- Panel 1: EMF Meter -->
      <div class="tool-panel active" id="panel-emf">
        <div class="emf-meter-display">
          <div class="emf-lights-row">
            <div class="emf-light" id="emf-l1"></div>
            <div class="emf-light" id="emf-l2"></div>
            <div class="emf-light" id="emf-l3"></div>
            <div class="emf-light" id="emf-l4"></div>
            <div class="emf-light" id="emf-l5"></div>
          </div>
          <div class="emf-reading-val" id="emf-val-text">1.4 mG</div>
          <div class="emf-status-text" id="emf-status-desc">FIELD: STABLE BACKGROUND</div>
        </div>
        <p style="font-size:0.75rem; color:#78909c; margin-top:0.6rem;">
          Hover your cursor over suspicious ward entries or clues to detect electromagnetic anomalies.
        </p>
      </div>

      <!-- Panel 2: Spirit Box (EVP) -->
      <div class="tool-panel" id="panel-spirit">
        <div class="spirit-box-display">
          <div class="radio-freq-readout" id="spirit-freq-text">FM 88.3 MHz</div>
          <canvas class="spirit-box-waveform" id="spirit-canvas" width="300" height="40"></canvas>
          <div class="spirit-whisper-text" id="spirit-whisper-log">AWAITING FREQUENCY SCAN...</div>
          <div class="spirit-controls">
            <button id="btn-spirit-scan" class="horror-btn btn-green" style="padding:0.4rem; font-size:0.75rem;">
              START SCAN
            </button>
            <button id="btn-spirit-tune" class="btn-ui" style="flex:1;">
              MANUAL TUNE
            </button>
          </div>
        </div>
      </div>

      <!-- Panel 3: UV Blacklight -->
      <div class="tool-panel" id="panel-uv">
        <div class="uv-panel">
          <p style="font-size:0.8rem; color:#b0bec5; margin-bottom:0.8rem;">
            Ultraviolet phosphorescence reveals hidden blood runes, invisible markings, and cipher shortcuts left by patients.
          </p>
          <button id="btn-toggle-uv" class="uv-toggle-btn">
            ACTIVATE UV BLACKLIGHT
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);

    // 4. Inject hidden UV markings on the page body
    this.injectHiddenUvMarkings();
  }

  injectHiddenUvMarkings() {
    const isBn = window.pabnaState && window.pabnaState.get('language') === 'bn';
    const uvBox = document.createElement('div');
    uvBox.className = 'uv-hidden-glyph';
    uvBox.style.position = 'fixed';
    uvBox.style.left = '2rem';
    uvBox.style.bottom = '2rem';
    uvBox.style.fontSize = '0.9rem';
    uvBox.style.fontFamily = 'monospace';
    uvBox.style.color = '#e040fb';
    uvBox.style.zIndex = '9991';
    uvBox.innerHTML = isBn 
      ? `[UV দৃষ্টিগোচর: ইছামতীর ঘাটে সংকেত ১৮৯০ // তাড়াশ = ৭১১]`
      : `[UV REVEALED: ICHAMATI PROTOCOL = 1957 // TARASH = 771 // HARDINGE = 1914]`;
    document.body.appendChild(uvBox);
  }

  bindEvents() {
    const btnToggle = document.getElementById('btn-toggle-equipment');
    const drawer = document.getElementById('equipment-drawer');
    const btnClose = document.getElementById('btn-close-equipment');

    btnToggle.addEventListener('click', () => {
      this.isDrawerOpen = !this.isDrawerOpen;
      drawer.classList.toggle('active', this.isDrawerOpen);
      if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
    });

    btnClose.addEventListener('click', () => {
      this.isDrawerOpen = false;
      drawer.classList.remove('active');
    });

    // Tool tab navigation
    document.querySelectorAll('.tool-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tool-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(`panel-${tab}`);
        if (targetPanel) targetPanel.classList.add('active');

        if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
      });
    });

    // UV Blacklight toggle
    const uvBtn = document.getElementById('btn-toggle-uv');
    if (uvBtn) {
      uvBtn.addEventListener('click', () => {
        this.isUVActive = !this.isUVActive;
        document.body.classList.toggle('uv-mode-active', this.isUVActive);
        uvBtn.classList.toggle('active', this.isUVActive);
        uvBtn.textContent = this.isUVActive ? 'DEACTIVATE UV BLACKLIGHT' : 'ACTIVATE UV BLACKLIGHT';
        if (window.pabnaAudio) {
          window.pabnaAudio.playStaticBurst(0.2);
        }
      });
    }

    // Spirit Box Scanning
    const btnSpiritScan = document.getElementById('btn-spirit-scan');
    const btnSpiritTune = document.getElementById('btn-spirit-tune');
    if (btnSpiritScan) {
      btnSpiritScan.addEventListener('click', () => {
        this.toggleSpiritScan();
      });
    }
    if (btnSpiritTune) {
      btnSpiritTune.addEventListener('click', () => {
        this.tuneSpiritBox();
      });
    }

    // Hover detection for EMF spikes
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      const isAnomalous = target.closest('.patient-card, .cctv-cam-card, .cipher-card, .folklore-box, .terminal-container, .escape-timer-panel');
      if (isAnomalous) {
        this.targetEmf = 45.0 + Math.random() * 40.0;
        if (window.pabnaAudio && Math.random() < 0.25) {
          window.pabnaAudio.playStaticBurst(0.08);
        }
      } else {
        this.targetEmf = 1.2 + Math.random() * 2.0;
      }
    });
  }

  // --- EMF Meter Loop ---
  startEmfLoop() {
    const valText = document.getElementById('emf-val-text');
    const badge = document.getElementById('hud-emf-badge');
    const descText = document.getElementById('emf-status-desc');
    const l1 = document.getElementById('emf-l1');
    const l2 = document.getElementById('emf-l2');
    const l3 = document.getElementById('emf-l3');
    const l4 = document.getElementById('emf-l4');
    const l5 = document.getElementById('emf-l5');

    setInterval(() => {
      // Smooth lerp
      this.currentEmf += (this.targetEmf - this.currentEmf) * 0.15;
      const rounded = this.currentEmf.toFixed(1);

      if (valText) valText.textContent = `${rounded} mG`;
      if (badge) badge.textContent = `${rounded} mG`;

      // Update lights
      if (l1) l1.className = `emf-light ${this.currentEmf > 1.0 ? 'lit-green' : ''}`;
      if (l2) l2.className = `emf-light ${this.currentEmf > 8.0 ? 'lit-green' : ''}`;
      if (l3) l3.className = `emf-light ${this.currentEmf > 22.0 ? 'lit-yellow' : ''}`;
      if (l4) l4.className = `emf-light ${this.currentEmf > 45.0 ? 'lit-orange' : ''}`;
      if (l5) l5.className = `emf-light ${this.currentEmf > 70.0 ? 'lit-red' : ''}`;

      if (descText) {
        if (this.currentEmf > 70.0) {
          descText.textContent = 'DANGER: PARANORMAL ENTITY PROXIMITY';
          descText.style.color = '#ff1744';
        } else if (this.currentEmf > 25.0) {
          descText.textContent = 'ELEVATED ELECTROMAGNETIC FLUCTUATION';
          descText.style.color = '#ff9100';
        } else {
          descText.textContent = 'FIELD: STABLE BACKGROUND';
          descText.style.color = '#78909c';
        }
      }
    }, 100);
  }

  // --- Spirit Box EVP Engine ---
  toggleSpiritScan() {
    const btn = document.getElementById('btn-spirit-scan');
    this.isSpiritBoxScanning = !this.isSpiritBoxScanning;

    if (this.isSpiritBoxScanning) {
      if (btn) btn.textContent = 'STOP SCAN';
      this.spiritScanTimer = setInterval(() => {
        this.tuneSpiritBox();
      }, 400);
    } else {
      if (btn) btn.textContent = 'START SCAN';
      clearInterval(this.spiritScanTimer);
    }
  }

  tuneSpiritBox() {
    this.spiritFreq += 0.4;
    if (this.spiritFreq > 107.9) this.spiritFreq = 88.1;

    const freqText = document.getElementById('spirit-freq-text');
    if (freqText) freqText.textContent = `FM ${this.spiritFreq.toFixed(1)} MHz`;

    if (window.pabnaAudio) {
      window.pabnaAudio.playStaticBurst(0.08);
    }

    this.drawSpiritWave();

    // Random EVP messages
    const isBn = window.pabnaState && window.pabnaState.get('language') === 'bn';
    const whispersEn = [
      "...riverbed... they never left...",
      "...ward seven... three seventeen AM...",
      "...the arches... double them minus three...",
      "...Paksey bridge... fifteen steel spans...",
      "...the water is cold... Ichamati...",
      "...Masum Khan... fifteen eighty two..."
    ];
    const whispersBn = [
      "...ইছামতীর জল... ওরা যায়নি...",
      "...৭ নম্বর ওয়ার্ড... ভোর ৩:১৭...",
      "...তাড়াশ ভবনের সাতটি খিলান...",
      "...হার্ডিঞ্জ ব্রিজ... ইস্পাত রিভেট...",
      "...মাসুম খান কাবুলি... ১৫৮২...",
      "...লকডাউন খুলবে না..."
    ];

    const whisperLog = document.getElementById('spirit-whisper-log');
    if (whisperLog && Math.random() < 0.28) {
      const list = isBn ? whispersBn : whispersEn;
      const pick = list[Math.floor(Math.random() * list.length)];
      whisperLog.textContent = `[EVP INTERCEPT]: "${pick}"`;
      if (window.pabnaAudio) window.pabnaAudio.playGlitchWhisper();
    }
  }

  drawSpiritWave() {
    const canvas = document.getElementById('spirit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#020406';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#00d2ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 3) {
      const y = (canvas.height / 2) + (Math.random() - 0.5) * 22;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // --- Ambient Paranormal Orbs & Dust Canvas ---
  initAmbientOrbs() {
    const canvas = document.getElementById('ambient-orbs-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Create 35 drifting spectral motes
    for (let i = 0; i < 35; i++) {
      this.ambientParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        radius: 1 + Math.random() * 2.5,
        alpha: 0.1 + Math.random() * 0.4,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }

    const animateOrbs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.ambientParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * 0.002 * p.pulseSpeed) * 0.004;

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.fillStyle = `rgba(180, 240, 220, ${Math.max(0.04, Math.min(0.5, p.alpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateOrbs);
    };

    requestAnimationFrame(animateOrbs);
  }
}

// Global Equipment Instance
document.addEventListener('DOMContentLoaded', () => {
  window.pabnaEquipment = new ParanormalEquipmentManager();
});

