/**
 * THE PABNA HAUNTING - CCTV Surveillance Matrix Controller
 * 4-Quadrant CCTV Station with Telemetry Sidebars (Audio Waveforms, Decibel Meters,
 * Crosshair Targets) and the Phosphor Green Night Vision Asylum Ward!
 */

document.addEventListener('DOMContentLoaded', () => {
  const cctvContainer = document.getElementById('cctv-quad-grid');
  const nightVisionBtn = document.getElementById('btn-night-vision');
  const thermalBtn = document.getElementById('btn-thermal');
  const refreshGlitchBtn = document.getElementById('btn-force-glitch');
  const modal = document.getElementById('cctv-inspector-modal');
  const modalClose = document.getElementById('btn-close-cctv-modal');
  const modalTitle = document.getElementById('modal-cam-title');
  const modalCanvas = document.getElementById('modal-cctv-canvas');
  const modalLog = document.getElementById('modal-cam-log');

  let activeModalCamId = null;
  let isNightVision = true; // Default to eerie night vision
  let isThermal = false;

  // Preload Night Vision Ward Room Image (from User Image 1)
  const nvWardImg = new Image();
  nvWardImg.src = 'assets/night_vision_ward.jpg';

  // 4 Core CCTV Feeds matching the 4-quadrant layout
  const cameras = [
    {
      id: 'CAM-01',
      code: 'E00: 1',
      nameEn: 'CAM-01: Ward 7 Solitary Confinement (Night Vision)',
      nameBn: 'ক্যাম-০১: ৭ নং নির্জন কারাকক্ষ (নাইট ভিশন)',
      location: 'Ward 7 High-Security Block',
      hasAnomaly: true,
      anomalyName: 'Crouching Entity at the EXIT Door',
      telemCode: '00 / 00:01 // batt',
      isImageBased: true,
      renderScene: (ctx, w, h, t) => {
        if (nvWardImg.complete && nvWardImg.naturalWidth > 0) {
          ctx.drawImage(nvWardImg, 0, 0, w, h);
        } else {
          // Fallback procedural night vision room
          ctx.fillStyle = '#061c14';
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = '#0a2e21';
          ctx.fillRect(w / 2 - 40, h / 2 - 40, 80, 100); // Exit door
          ctx.fillStyle = '#00ff88';
          ctx.font = '10px monospace';
          ctx.fillText('EXIT', w / 2 - 12, h / 2 - 50);
        }

        // Anomaly: Flickering phantom silhouette near the exit door
        const pulse = Math.sin(t * 0.003);
        if (pulse > 0.3) {
          ctx.save();
          ctx.fillStyle = `rgba(0, 0, 0, ${0.4 + pulse * 0.4})`;
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(w / 2 + 10, h * 0.55, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(w / 2, h * 0.55, 20, 30);
          ctx.restore();
        }

        // Green Phosphor Night Vision tint
        ctx.fillStyle = 'rgba(0, 255, 120, 0.08)';
        ctx.fillRect(0, 0, w, h);
      }
    },
    {
      id: 'CAM-02',
      code: 'E00: 2',
      nameEn: 'CAM-02: Autopsy Wing & Bathtub Chamber',
      nameBn: 'ক্যাম-০২: মর্গ ও ব্যবচ্ছেদ বাথটাব',
      location: 'Sub-Basement Block C',
      hasAnomaly: true,
      anomalyName: 'Cryptic Carving on Porcelain Basin: TARASH-771',
      telemCode: '00 / 00:03 // vox',
      isImageBased: false,
      renderScene: (ctx, w, h, t) => {
        // Dark grungy bathroom with porcelain bathtub
        ctx.fillStyle = '#050c10';
        ctx.fillRect(0, 0, w, h);

        // Dirty tiled walls
        ctx.strokeStyle = '#0e242f';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 25) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h - 80);
          ctx.stroke();
        }

        // Bathtub silhouette
        ctx.fillStyle = '#1a3340';
        ctx.beginPath();
        ctx.ellipse(w * 0.4, h * 0.65, 95, 45, -0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#040d12';
        ctx.beginPath();
        ctx.ellipse(w * 0.4, h * 0.65, 80, 32, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Curved faucet
        ctx.strokeStyle = '#2b4d5e';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(w * 0.72, h * 0.52, 28, Math.PI, 0);
        ctx.stroke();

        // Carved clue on bathtub lip
        ctx.fillStyle = 'rgba(0, 229, 255, 0.75)';
        ctx.font = '10px monospace';
        ctx.fillText('SLAB: TARASH-771', w * 0.2, h * 0.58);
      }
    },
    {
      id: 'CAM-03',
      code: 'E00: 3',
      nameEn: 'CAM-03: Solitary Bedroom & Deer Skull Relic',
      nameBn: 'ক্যাম-০৩: নির্জন শয্যাকক্ষ ও হরিণের খুলি',
      location: 'Director Residential Quarters',
      hasAnomaly: false,
      telemCode: '00 / 00:02 // emf',
      isImageBased: false,
      renderScene: (ctx, w, h, t) => {
        // Dark wooden bedroom
        ctx.fillStyle = '#060a0d';
        ctx.fillRect(0, 0, w, h);

        // Checkered bed
        ctx.fillStyle = '#10222a';
        ctx.fillRect(30, h - 110, 110, 80);
        ctx.strokeStyle = '#1d3e4d';
        ctx.lineWidth = 1;
        for (let bx = 30; bx < 140; bx += 14) {
          ctx.beginPath();
          ctx.moveTo(bx, h - 110);
          ctx.lineTo(bx, h - 30);
          ctx.stroke();
        }

        // Wall mounted deer head / skull
        ctx.strokeStyle = '#385563';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(70, 40);
        ctx.lineTo(50, 20);
        ctx.lineTo(40, 15);
        ctx.moveTo(70, 40);
        ctx.lineTo(90, 20);
        ctx.lineTo(100, 15);
        ctx.stroke();

        ctx.fillStyle = '#20323a';
        ctx.beginPath();
        ctx.arc(70, 45, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    {
      id: 'CAM-04',
      code: 'E00: 4',
      nameEn: 'CAM-04: Checkered Hallway & Upper Staircase',
      nameBn: 'ক্যাম-০৪: চেক সিঁড়ি ও সান্ধ্য করিডোর',
      location: 'Central Stairwell Tower',
      hasAnomaly: false,
      telemCode: '00 / 00:04 // vox',
      isImageBased: false,
      renderScene: (ctx, w, h, t) => {
        ctx.fillStyle = '#050c10';
        ctx.fillRect(0, 0, w, h);

        // Angled staircase banister
        ctx.strokeStyle = '#1c3845';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(40, h);
        ctx.lineTo(w - 60, 40);
        ctx.stroke();

        // Checkered hallway floor in perspective
        ctx.fillStyle = '#091820';
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 6; j++) {
            if ((i + j) % 2 === 0) {
              ctx.fillRect(w * 0.45 + i * 20, h * 0.6 + j * 12, 18, 10);
            }
          }
        }

        // Hanging ceiling beams
        ctx.fillStyle = '#0f242e';
        ctx.fillRect(60, 20, w - 120, 15);
      }
    }
  ];

  // Build the 4-Quadrant Monitor Layout matching Image 2
  const canvasInstances = [];

  cameras.forEach((cam, idx) => {
    const card = document.createElement('div');
    card.className = `cctv-quad-card ${cam.hasAnomaly ? 'anomaly-active' : ''}`;
    card.id = `card-${cam.id}`;

    card.innerHTML = `
      <!-- Main CRT Viewport -->
      <div class="cctv-main-feed-area">
        <canvas class="cctv-canvas-feed" id="feed-canvas-${cam.id}" width="420" height="290"></canvas>
        <div class="cctv-feed-hud">
          <div class="crosshair-bracket bracket-tl"></div>
          <div class="crosshair-bracket bracket-tr"></div>
          <div class="crosshair-bracket bracket-bl"></div>
          <div class="crosshair-bracket bracket-br"></div>
          <div class="crosshair-center-target">[ x ]</div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
            <span class="cctv-cam-id-stamp">${cam.code}</span>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: #ff3344; font-weight: bold;">● REC</span>
          </div>
        </div>
      </div>

      <!-- Right Telemetry Control Tower -->
      <aside class="cctv-telemetry-sidebar">
        <div class="telemetry-top-stats">
          <div class="telemetry-code-line">${cam.telemCode}</div>
          <div class="telemetry-code-line">FPS: 18.4</div>
        </div>

        <!-- Live Waveform Canvas -->
        <div class="waveform-box">
          <canvas class="waveform-canvas" id="wave-canvas-${cam.id}" width="70" height="38"></canvas>
        </div>

        <!-- Multi-Tier Colored Decibel / EMF Meter Bars -->
        <div class="decibel-meter-wrapper" id="db-wrap-${cam.id}">
          <div class="db-meter-column" id="db-col1-${cam.id}"></div>
          <div class="db-meter-column" id="db-col2-${cam.id}"></div>
        </div>

        <button class="cctv-quit-btn" data-cam="${cam.id}">INSPECT</button>
      </aside>
    `;

    cctvContainer.appendChild(card);

    // Build segments for decibel meter
    const col1 = card.querySelector(`#db-col1-${cam.id}`);
    const col2 = card.querySelector(`#db-col2-${cam.id}`);
    const segClasses = ['db-seg-blue', 'db-seg-blue', 'db-seg-cyan', 'db-seg-cyan', 'db-seg-green', 'db-seg-green', 'db-seg-yellow', 'db-seg-orange', 'db-seg-red'];

    for (let s = 0; s < 14; s++) {
      const seg1 = document.createElement('div');
      seg1.className = 'db-meter-segment';
      col1.appendChild(seg1);

      const seg2 = document.createElement('div');
      seg2.className = 'db-meter-segment';
      col2.appendChild(seg2);
    }

    const feedCanvas = card.querySelector(`#feed-canvas-${cam.id}`);
    const waveCanvas = card.querySelector(`#wave-canvas-${cam.id}`);

    canvasInstances.push({
      cam,
      feedCanvas,
      feedCtx: feedCanvas.getContext('2d'),
      waveCanvas,
      waveCtx: waveCanvas.getContext('2d'),
      col1,
      col2,
      segClasses
    });

    // Inspect click
    card.querySelector('.cctv-quit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openCameraModal(cam.id);
    });

    card.addEventListener('click', () => {
      openCameraModal(cam.id);
    });
  });

  // Master Render Animation Loop
  let frame = 0;
  const renderCCTVFeeds = (timestamp) => {
    frame++;

    canvasInstances.forEach(({ cam, feedCanvas, feedCtx, waveCanvas, waveCtx, col1, col2, segClasses }) => {
      // 1. Draw base scene
      cam.renderScene(feedCtx, feedCanvas.width, feedCanvas.height, timestamp);

      // 2. Procedural scanline static noise
      drawCRTNoise(feedCtx, feedCanvas.width, feedCanvas.height, 0.06);

      // 3. Render animated oscillating green sine wave
      waveCtx.fillStyle = '#020608';
      waveCtx.fillRect(0, 0, waveCanvas.width, waveCanvas.height);
      waveCtx.strokeStyle = '#00ff88';
      waveCtx.lineWidth = 1.5;
      waveCtx.beginPath();
      for (let x = 0; x < waveCanvas.width; x += 3) {
        const freqMod = cam.hasAnomaly ? 0.35 : 0.18;
        const y = waveCanvas.height / 2 + Math.sin((x * freqMod) + (timestamp * 0.008) + cam.code.length) * 10;
        if (x === 0) waveCtx.moveTo(x, y);
        else waveCtx.lineTo(x, y);
      }
      waveCtx.stroke();

      // 4. Update multi-bar colored decibel meter (every 6 frames)
      if (frame % 6 === 0) {
        const segs1 = col1.children;
        const segs2 = col2.children;
        const activeCount1 = Math.floor(Math.random() * 11) + (cam.hasAnomaly ? 3 : 1);
        const activeCount2 = Math.floor(Math.random() * 10) + (cam.hasAnomaly ? 2 : 1);

        for (let i = 0; i < segs1.length; i++) {
          const cls = segClasses[Math.min(i, segClasses.length - 1)];
          if (i < activeCount1) segs1[i].className = `db-meter-segment ${cls}`;
          else segs1[i].className = 'db-meter-segment';

          if (i < activeCount2) segs2[i].className = `db-meter-segment ${cls}`;
          else segs2[i].className = 'db-meter-segment';
        }
      }
    });

    // Modal Feed Render
    if (activeModalCamId && modalCanvas) {
      const active = cameras.find(c => c.id === activeModalCamId);
      if (active) {
        const mCtx = modalCanvas.getContext('2d');
        active.renderScene(mCtx, modalCanvas.width, modalCanvas.height, timestamp);
        drawCRTNoise(mCtx, modalCanvas.width, modalCanvas.height, 0.08);
      }
    }

    requestAnimationFrame(renderCCTVFeeds);
  };

  const drawCRTNoise = (ctx, w, h, intensity) => {
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const count = Math.floor(w * h * intensity);

    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * (data.length / 4)) * 4;
      const noise = (Math.random() * 255) | 0;
      data[idx] = noise;
      data[idx + 1] = noise;
      data[idx + 2] = noise;
    }
    ctx.putImageData(imgData, 0, 0);
  };

  requestAnimationFrame(renderCCTVFeeds);

  // Focus Modal
  const openCameraModal = (camId) => {
    activeModalCamId = camId;
    const cam = cameras.find(c => c.id === camId);
    if (!cam || !modal) return;

    if (window.pabnaAudio) window.pabnaAudio.playCameraSwitch();
    window.pabnaState.markCameraVisited(camId);

    const isBn = window.pabnaState.get('language') === 'bn';
    modalTitle.textContent = isBn ? cam.nameBn : cam.nameEn;

    modalCanvas.width = 720;
    modalCanvas.height = 460;

    let log = `STATION: PABNA MONITOR MATRIX // CHANNEL: ${cam.code}\n`;
    log += `LOCATION: ${cam.location}\n`;
    log += `TELEMETRY: ${cam.telemCode}\n`;
    if (cam.hasAnomaly) {
      log += `[!] ANOMALOUS ENTITY CONFIRMED: ${cam.anomalyName}\n`;
      log += `[+] FORENSIC NOTE: Observe patient silhouette at the exit door carefully.`;
      window.pabnaState.recordAnomaly(cam.id);
      if (window.pabnaAudio) window.pabnaAudio.playGlitchWhisper();
    } else {
      log += `[✓] SECTOR TELEMETRY NOMINAL. No immediate hostile manifestations.`;
    }
    modalLog.textContent = log;

    modal.classList.add('active');
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      activeModalCamId = null;
    });
  }

  // Visual Filter Toggles
  if (nightVisionBtn) {
    nightVisionBtn.addEventListener('click', () => {
      isNightVision = !isNightVision;
      isThermal = false;
      document.body.classList.toggle('night-vision-mode', isNightVision);
      document.body.classList.remove('thermal-mode');
      nightVisionBtn.classList.toggle('active-glow', isNightVision);
      if (thermalBtn) thermalBtn.classList.remove('active-glow');
      if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
    });
  }

  if (thermalBtn) {
    thermalBtn.addEventListener('click', () => {
      isThermal = !isThermal;
      isNightVision = false;
      document.body.classList.toggle('thermal-mode', isThermal);
      document.body.classList.remove('night-vision-mode');
      thermalBtn.classList.toggle('active-glow', isThermal);
      if (nightVisionBtn) nightVisionBtn.classList.remove('active-glow');
      if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
    });
  }

  if (refreshGlitchBtn) {
    refreshGlitchBtn.addEventListener('click', () => {
      if (window.pabnaAudio) window.pabnaAudio.playStaticBurst(0.4);
      cctvContainer.classList.add('glitch-hover');
      setTimeout(() => {
        cctvContainer.classList.remove('glitch-hover');
      }, 500);
    });
  }
});
