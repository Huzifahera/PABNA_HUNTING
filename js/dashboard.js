/**
 * THE PABNA HAUNTING - Dashboard UI/UX Controller
 * Matches the reference mockup: Hero Archway Canvas, Interactive Pabna Radar Map,
 * Hanging Lantern Animation, Audio Wave, Live Atmosphere, and Multi-Page Flow.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Gothic Archway on Hero Banner Canvas
  const archCanvas = document.getElementById('hero-arch-canvas');
  if (archCanvas) {
    const ctx = archCanvas.getContext('2d');
    archCanvas.width = 320;
    archCanvas.height = 180;

    let mistOffset = 0;
    const drawArch = () => {
      ctx.clearRect(0, 0, archCanvas.width, archCanvas.height);

      // Night sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, archCanvas.height);
      sky.addColorStop(0, '#0c071a');
      sky.addColorStop(0.7, '#1b1233');
      sky.addColorStop(1, '#080510');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, archCanvas.width, archCanvas.height);

      // Distant Moon & glow
      ctx.fillStyle = 'rgba(235, 220, 255, 0.85)';
      ctx.shadowColor = '#c77dff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(260, 45, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Stone Wall Silhouette
      ctx.fillStyle = '#110b20';
      ctx.fillRect(0, archCanvas.height - 40, archCanvas.width, 40);

      // Triple Gothic Arches
      const drawSingleArch = (x, w, h) => {
        ctx.fillStyle = '#0a0714';
        ctx.strokeStyle = '#2b1b47';
        ctx.lineWidth = 3;

        // Pillar legs
        ctx.fillRect(x, archCanvas.height - h, w, h);
        ctx.strokeRect(x, archCanvas.height - h, w, h);

        // Arch opening
        ctx.fillStyle = '#06040d';
        ctx.beginPath();
        ctx.arc(x + w / 2, archCanvas.height - h + 25, w * 0.35, Math.PI, 0);
        ctx.lineTo(x + w * 0.85, archCanvas.height - 10);
        ctx.lineTo(x + w * 0.15, archCanvas.height - 10);
        ctx.closePath();
        ctx.fill();
      };

      drawSingleArch(40, 65, 110);
      drawSingleArch(120, 80, 135);
      drawSingleArch(215, 65, 110);

      // Swirling mist
      mistOffset += 0.015;
      ctx.fillStyle = 'rgba(157, 78, 221, 0.12)';
      ctx.beginPath();
      ctx.ellipse(
        160 + Math.sin(mistOffset) * 20,
        archCanvas.height - 25,
        140,
        30,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      requestAnimationFrame(drawArch);
    };
    drawArch();
  }

  // 2. Render Interactive Pabna Radar Map on Canvas
  const mapCanvas = document.getElementById('pabna-map-canvas');
  if (mapCanvas) {
    const ctx = mapCanvas.getContext('2d');
    mapCanvas.width = 600;
    mapCanvas.height = 230;

    // Map Locations (Pabna Landmarks)
    const mapPins = [
      { id: 'asylum', name: 'Hemayetpur Sanatorium (Ward 7)', x: 190, y: 155, link: 'surveillance.html', pulse: 0 },
      { id: 'tarash', name: 'Tarash Zamindar Palace', x: 285, y: 85, link: 'archive.html', pulse: 0.5 },
      { id: 'mosque', name: 'Chatmohar Shahi Mosque', x: 380, y: 70, link: 'archive.html', pulse: 1.0 },
      { id: 'bridge', name: 'Hardinge Bridge (Paksey)', x: 80, y: 170, link: 'archive.html', pulse: 1.5 },
      { id: 'telegraph', name: 'Ichamati Telegraph Post', x: 230, y: 130, link: 'index.html', pulse: 2.0 }
    ];

    let hoveredPin = null;

    const renderMap = () => {
      ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

      // Dark map terrain background
      ctx.fillStyle = '#070510';
      ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

      // Topographic contour lines
      ctx.strokeStyle = 'rgba(157, 78, 221, 0.12)';
      ctx.lineWidth = 1;
      for (let r = 40; r < 360; r += 50) {
        ctx.beginPath();
        ctx.arc(240, 120, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Ichamati River (glowing winding blue path)
      ctx.strokeStyle = 'rgba(76, 201, 240, 0.55)';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#4cc9f0';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, 180);
      ctx.bezierCurveTo(90, 190, 140, 130, 210, 150);
      ctx.bezierCurveTo(270, 170, 310, 110, 420, 135);
      ctx.bezierCurveTo(490, 150, 530, 120, 600, 140);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Padma River (southern wide curve)
      ctx.strokeStyle = 'rgba(67, 97, 238, 0.35)';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(0, 220);
      ctx.quadraticCurveTo(120, 210, 260, 228);
      ctx.stroke();

      // Render Pins
      const t = Date.now() * 0.003;
      mapPins.forEach(pin => {
        // Radar pulse ring
        const pulseR = 8 + (Math.sin(t + pin.pulse) * 0.5 + 0.5) * 16;
        const pulseAlpha = Math.max(0, 1 - pulseR / 24);

        ctx.strokeStyle = `rgba(199, 125, 255, ${pulseAlpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pin.x, pin.y, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        // Pin body
        ctx.fillStyle = '#7b2cbf';
        ctx.shadowColor = '#c77dff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pin.x, pin.y, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner glowing core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pin.x, pin.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = pin === hoveredPin ? '#fff' : '#b39ddb';
        ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(pin.name, pin.x - 30, pin.y - 14);
      });

      requestAnimationFrame(renderMap);
    };
    renderMap();

    // Map Interaction
    mapCanvas.addEventListener('mousemove', (e) => {
      const rect = mapCanvas.getBoundingClientRect();
      const scaleX = mapCanvas.width / rect.width;
      const scaleY = mapCanvas.height / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      hoveredPin = null;
      for (const pin of mapPins) {
        if (Math.hypot(mx - pin.x, my - pin.y) < 18) {
          hoveredPin = pin;
          mapCanvas.style.cursor = 'pointer';
          break;
        }
      }
      if (!hoveredPin) {
        mapCanvas.style.cursor = 'default';
      }
    });

    mapCanvas.addEventListener('click', () => {
      if (hoveredPin) {
        if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
        window.location.href = hoveredPin.link;
      }
    });
  }

  // 3. Render Hanging Lantern Graphic Canvas
  const lanternCanvas = document.getElementById('hanging-lantern-canvas');
  if (lanternCanvas) {
    const ctx = lanternCanvas.getContext('2d');
    lanternCanvas.width = 100;
    lanternCanvas.height = 180;

    let flicker = 1;
    const drawLantern = () => {
      ctx.clearRect(0, 0, lanternCanvas.width, lanternCanvas.height);

      // Hanging cord
      ctx.strokeStyle = '#2b1b38';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.lineTo(50, 45);
      ctx.stroke();

      // Lantern metal cap
      ctx.fillStyle = '#1c1524';
      ctx.fillRect(35, 45, 30, 8);
      ctx.fillRect(40, 39, 20, 6);

      // Glass cage
      ctx.strokeStyle = '#382847';
      ctx.lineWidth = 2;
      ctx.strokeRect(32, 53, 36, 50);

      // Warm flame glow
      flicker = 0.85 + Math.random() * 0.3;
      const glowGrad = ctx.createRadialGradient(50, 78, 2, 50, 78, 42 * flicker);
      glowGrad.addColorStop(0, 'rgba(255, 230, 140, 0.95)');
      glowGrad.addColorStop(0.35, 'rgba(255, 170, 40, 0.6)');
      glowGrad.addColorStop(0.8, 'rgba(255, 100, 20, 0.15)');
      glowGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(50, 78, 45 * flicker, 0, Math.PI * 2);
      ctx.fill();

      // Flame center
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(50, 78, 4, 9 * flicker, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lantern bottom plate
      ctx.fillStyle = '#1c1524';
      ctx.fillRect(30, 103, 40, 10);

      requestAnimationFrame(drawLantern);
    };
    drawLantern();
  }

  // 4. Quick Features Interactivity
  // 4.1 Audio Soundscapes
  const featAudio = document.getElementById('feat-audio');
  if (featAudio) {
    featAudio.addEventListener('click', () => {
      if (window.pabnaAudio) {
        const isSoundOn = window.pabnaAudio.toggleMute();
        const eqBars = document.querySelectorAll('.eq-bar');
        eqBars.forEach(bar => {
          bar.style.animationPlayState = isSoundOn ? 'running' : 'paused';
        });
      }
    });
  }

  // 4.2 Live Atmosphere (Lightning, Fog, Rain Toggle)
  const featAtmosphere = document.getElementById('feat-atmosphere');
  let isStormActive = false;
  if (featAtmosphere) {
    featAtmosphere.addEventListener('click', () => {
      isStormActive = !isStormActive;
      document.body.classList.toggle('storm-active', isStormActive);
      if (isStormActive) {
        if (window.pabnaAudio) window.pabnaAudio.playStaticBurst(0.4);
        alert('🌩️ LIVE ATMOSPHERE ACTIVATED: Atmospheric fog and lightning storm engaged.');
      } else {
        alert('🌙 LIVE ATMOSPHERE: Calm nocturnal breeze restored.');
      }
    });
  }

  // 4.3 Mini-Game Launcher
  const featMinigame = document.getElementById('feat-minigame');
  const telegraphModal = document.getElementById('telegraph-modal');
  let miniGameInst = null;
  if (featMinigame && telegraphModal) {
    featMinigame.addEventListener('click', () => {
      telegraphModal.classList.add('active');
      if (!miniGameInst && window.TelegraphWireMiniGame) {
        miniGameInst = new window.TelegraphWireMiniGame('telegraph-canvas', () => {
          alert('✓ ICHAMATI TELEGRAPH CIRCUIT RESTORED! Clue: WIRE-1890 unlocked.');
        });
      }
    });
  }

  // 4.4 Multi-Language Toggle
  const featLang = document.getElementById('feat-lang');
  if (featLang) {
    featLang.addEventListener('click', () => {
      if (window.pabnaI18n) {
        const newLang = window.pabnaI18n.toggleLanguage();
        if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
      }
    });
  }

  // 5. Stories & Locations Modals (Sidebar Items)
  const navStories = document.getElementById('sidebar-nav-stories');
  const storiesModal = document.getElementById('stories-modal');
  const btnCloseStories = document.getElementById('btn-close-stories');
  if (navStories && storiesModal) {
    navStories.addEventListener('click', (e) => {
      e.preventDefault();
      storiesModal.classList.add('active');
      if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
    });
  }
  if (btnCloseStories) {
    btnCloseStories.addEventListener('click', () => {
      storiesModal.classList.remove('active');
    });
  }

  // 6. Settings & Profile Modal Logic
  const navSettings = document.getElementById('sidebar-nav-settings');
  const btnTopProfile = document.getElementById('btn-top-profile');
  const settingsModal = document.getElementById('settings-modal');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const callsignInput = document.getElementById('setting-callsign');
  const volumeSlider = document.getElementById('setting-volume');
  const volumeDisplay = document.getElementById('volume-val-display');
  const btnLangEn = document.getElementById('btn-set-lang-en');
  const btnLangBn = document.getElementById('btn-set-lang-bn');
  const btnSettingsPanic = document.getElementById('btn-settings-panic-reset');

  const openSettings = (e) => {
    if (e) e.preventDefault();
    if (settingsModal) {
      settingsModal.classList.add('active');
      if (window.pabnaState && callsignInput) {
        callsignInput.value = window.pabnaState.get('investigatorName') || 'AGENT-PABNA-07';
      }
      if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
    }
  };

  if (navSettings) navSettings.addEventListener('click', openSettings);
  if (btnTopProfile) btnTopProfile.addEventListener('click', openSettings);

  if (btnCloseSettings && settingsModal) {
    btnCloseSettings.addEventListener('click', () => {
      settingsModal.classList.remove('active');
    });
  }

  if (callsignInput) {
    callsignInput.addEventListener('change', () => {
      if (window.pabnaState) {
        window.pabnaState.set('investigatorName', callsignInput.value.trim());
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      const vol = parseInt(volumeSlider.value, 10);
      if (volumeDisplay) volumeDisplay.textContent = `${vol}%`;
      if (window.pabnaAudio && window.pabnaAudio.masterGain && window.pabnaAudio.ctx) {
        const gainVal = (vol / 100) * 0.85;
        window.pabnaAudio.masterGain.gain.setValueAtTime(gainVal, window.pabnaAudio.ctx.currentTime);
      }
    });
  }

  if (btnLangEn) {
    btnLangEn.addEventListener('click', () => {
      if (window.pabnaI18n) window.pabnaI18n.setLanguage('en');
    });
  }

  if (btnLangBn) {
    btnLangBn.addEventListener('click', () => {
      if (window.pabnaI18n) window.pabnaI18n.setLanguage('bn');
    });
  }

  if (btnSettingsPanic) {
    btnSettingsPanic.addEventListener('click', () => {
      if (confirm('Are you sure you want to trigger a PANIC RESET? All collected clues and cipher tokens will be cleared.')) {
        if (window.pabnaState) window.pabnaState.resetProgress();
        window.location.reload();
      }
    });
  }

  // Progress Stat Calculations
  const updateDashboardStats = () => {
    const storiesElem = document.getElementById('stat-stories-val');
    const puzzlesElem = document.getElementById('stat-puzzles-val');
    const progressElem = document.getElementById('stat-progress-val');
    const progressFill = document.getElementById('stat-progress-fill');

    if (!window.pabnaState) return;

    const ciphers = window.pabnaState.get('ciphersSolved') || {};
    const solvedCount = Object.values(ciphers).filter(Boolean).length;
    const wireDone = window.pabnaState.get('telegraphRepaired') ? 1 : 0;
    const authDone = window.pabnaState.get('authenticated') ? 1 : 0;
    const totalPuzzlesSolved = solvedCount + wireDone + authDone; // out of 5

    const percent = Math.min(100, Math.round((totalPuzzlesSolved / 5) * 100));

    if (puzzlesElem) puzzlesElem.innerHTML = `${totalPuzzlesSolved} <span class="sub">/ 5</span>`;
    if (progressElem) progressElem.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
  };

  updateDashboardStats();
  window.addEventListener('pabna_state_changed', updateDashboardStats);
});

