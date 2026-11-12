/**
 * THE PABNA HAUNTING - Emergency Lockdown & Escape Portal Controller
 * Real-time countdown timer, final puzzle verification, jumpscare failure & rescue broadcast.
 */

document.addEventListener('DOMContentLoaded', () => {
  const timerDigits = document.getElementById('timer-digits');
  const masterKeyInput = document.getElementById('master-evac-input');
  const btnOverride = document.getElementById('btn-emergency-override');
  const btnLaunchWire = document.getElementById('btn-launch-wire-escape');
  const telegraphModal = document.getElementById('telegraph-modal');
  const btnCloseTelegraph = document.getElementById('btn-close-telegraph');

  // Status pills
  const reqTarash = document.getElementById('req-tarash');
  const reqMosque = document.getElementById('req-mosque');
  const reqHardinge = document.getElementById('req-hardinge');
  const reqTelegraph = document.getElementById('req-telegraph');

  // Overlays
  const jumpscareOverlay = document.getElementById('jumpscare-overlay');
  const jumpscareCanvas = document.getElementById('jumpscare-canvas');
  const btnRetry = document.getElementById('btn-retry-escape');
  const rescueOverlay = document.getElementById('rescue-overlay');
  const btnRestart = document.getElementById('btn-restart-game');

  let timeLeft = window.pabnaState.get('escapeTimeLeft') || 300;
  let timerInterval = null;
  let isTimerRunning = true;
  let telegraphGame = null;

  // Update Checklist Status Pills
  const updateRequirementsUI = () => {
    const ciphers = window.pabnaState.get('ciphersSolved');
    const wire = window.pabnaState.get('telegraphRepaired');

    if (reqTarash) {
      reqTarash.className = `req-status-pill ${ciphers.tarash ? 'ready' : 'missing'}`;
      reqTarash.textContent = ciphers.tarash ? '✓ READY (TARASH-771)' : '✗ MISSING CIPHER';
    }

    if (reqMosque) {
      reqMosque.className = `req-status-pill ${ciphers.mosque ? 'ready' : 'missing'}`;
      reqMosque.textContent = ciphers.mosque ? '✓ READY (SHAHI-1582)' : '✗ MISSING FREQUENCY';
    }

    if (reqHardinge) {
      reqHardinge.className = `req-status-pill ${ciphers.hardinge ? 'ready' : 'missing'}`;
      reqHardinge.textContent = ciphers.hardinge ? '✓ READY (RIVET-1914)' : '✗ MISSING RIVET TOKEN';
    }

    if (reqTelegraph) {
      reqTelegraph.className = `req-status-pill ${wire ? 'ready' : 'missing'}`;
      reqTelegraph.textContent = wire ? '✓ REPAIRED (CIRCUIT ACTIVE)' : '✗ SEVERED WIRE';
    }
  };

  updateRequirementsUI();

  // Dynamic Countdown Timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  };

  const startTimer = () => {
    const startTime = Date.now();
    const initialSeconds = timeLeft;

    timerInterval = setInterval(() => {
      if (!isTimerRunning) return;

      const elapsed = (Date.now() - startTime) / 1000;
      timeLeft = Math.max(0, initialSeconds - elapsed);
      window.pabnaState.set('escapeTimeLeft', timeLeft);

      if (timerDigits) {
        timerDigits.textContent = formatTime(timeLeft);
      }

      // Heartbeat pulse adaptation
      if (window.pabnaAudio) {
        if (timeLeft < 30) {
          window.pabnaAudio.setHeartRate(150);
        } else if (timeLeft < 60) {
          window.pabnaAudio.setHeartRate(115);
        } else if (timeLeft < 120) {
          window.pabnaAudio.setHeartRate(85);
        }
      }

      // Expired!
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        triggerJumpscare('CONTAINMENT TIME EXPIRED // ASYLUM PROTOCOL PURGE');
      }
    }, 45);
  };

  startTimer();

  // Procedural Jumpscare Rendering
  const renderHorrorFace = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 480;

    let animId;
    let frame = 0;

    const draw = () => {
      frame++;
      ctx.fillStyle = '#020001';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Distorted flash
      if (Math.random() < 0.3) {
        ctx.fillStyle = 'rgba(255, 0, 20, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Skull contour
      ctx.save();
      const shakeX = (Math.random() - 0.5) * 18;
      const shakeY = (Math.random() - 0.5) * 18;
      ctx.translate(canvas.width / 2 + shakeX, canvas.height / 2 + shakeY);

      // Spectral head
      ctx.fillStyle = '#b0c2cb';
      ctx.shadowColor = '#ff0011';
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.ellipse(0, -20, 140, 180, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hollow bleeding eye sockets
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(-50, -35, 38, 48, -0.15, 0, Math.PI * 2);
      ctx.ellipse(50, -35, 38, 48, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Pinpoint demonic pupils
      ctx.fillStyle = '#ff1122';
      ctx.beginPath();
      ctx.arc(-50 + (Math.random() - 0.5) * 6, -35, 7, 0, Math.PI * 2);
      ctx.arc(50 + (Math.random() - 0.5) * 6, -35, 7, 0, Math.PI * 2);
      ctx.fill();

      // Distorted screaming jaw
      ctx.fillStyle = '#050203';
      ctx.beginPath();
      ctx.ellipse(0, 75, 48, 85 + Math.sin(frame * 0.4) * 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sharp jagged teeth
      ctx.fillStyle = '#e8d8c8';
      for (let t = -40; t <= 40; t += 12) {
        ctx.beginPath();
        ctx.moveTo(t, 25);
        ctx.lineTo(t + 5, 45);
        ctx.lineTo(t + 10, 25);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(t, 130);
        ctx.lineTo(t + 5, 110);
        ctx.lineTo(t + 10, 130);
        ctx.fill();
      }

      ctx.restore();

      // Scanline static
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let y = 0; y < canvas.height; y += 6) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  };

  // Trigger Jumpscare
  const triggerJumpscare = (reason) => {
    isTimerRunning = false;
    clearInterval(timerInterval);

    if (window.pabnaAudio) {
      window.pabnaAudio.triggerJumpscareAudio();
      window.pabnaAudio.playAlarmSiren();
    }

    if (jumpscareOverlay) {
      jumpscareOverlay.classList.add('active');
      renderHorrorFace(jumpscareCanvas);
    }
  };

  // Trigger Rescue Broadcast
  const triggerRescueBroadcast = () => {
    isTimerRunning = false;
    clearInterval(timerInterval);

    window.pabnaState.set('escapedSuccessfully', true);

    if (window.pabnaAudio) {
      window.pabnaAudio.playCipherSuccess();
    }

    if (rescueOverlay) {
      rescueOverlay.classList.add('active');
    }
  };

  // Form Validation & Evacuation Sequence
  const handleEvacuationAttempt = () => {
    const inputVal = (masterKeyInput ? masterKeyInput.value : '').trim().toUpperCase();
    const ciphers = window.pabnaState.get('ciphersSolved');
    const wire = window.pabnaState.get('telegraphRepaired');

    // Valid master codes:
    // 1. All 3 tokens concatenated: TARASH-771-SHAHI-1582-RIVET-1914 or 771-1582-1914
    // 2. Pabna founding master sequence: PABNA-1957 or ICHAMATI-1957 or ICHAMATI
    // 3. Telegraph bypass code: WIRE-1890
    const validCodes = [
      'TARASH-771-SHAHI-1582-RIVET-1914',
      'TARASH-771 SHAHI-1582 RIVET-1914',
      '771-1582-1914',
      '77115821914',
      'PABNA-1957',
      'PABNA1957',
      'ICHAMATI1957',
      'ICHAMATI-1957',
      'WIRE-1890'
    ];

    const isCodeMatch = validCodes.includes(inputVal);

    // If player has solved all ciphers OR reconnected the telegraph OR entered the master code
    const isReady = (ciphers.tarash && ciphers.mosque && ciphers.hardinge) || wire || isCodeMatch;

    if (isCodeMatch && isReady) {
      triggerRescueBroadcast();
    } else {
      triggerJumpscare('INCORRECT EVACUATION PROTOCOL ENTERED');
    }
  };

  if (btnOverride) {
    btnOverride.addEventListener('click', handleEvacuationAttempt);
  }

  if (masterKeyInput) {
    masterKeyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleEvacuationAttempt();
      }
    });
  }

  // Telegraph modal launcher
  if (btnLaunchWire) {
    btnLaunchWire.addEventListener('click', () => {
      if (telegraphModal) {
        telegraphModal.classList.add('active');
        if (!telegraphGame && window.TelegraphWireMiniGame) {
          telegraphGame = new window.TelegraphWireMiniGame('telegraph-canvas', () => {
            updateRequirementsUI();
          });
        }
      }
    });
  }

  if (btnCloseTelegraph) {
    btnCloseTelegraph.addEventListener('click', () => {
      if (telegraphModal) {
        telegraphModal.classList.remove('active');
        updateRequirementsUI();
      }
    });
  }

  // Retry from Jumpscare
  if (btnRetry) {
    btnRetry.addEventListener('click', () => {
      window.pabnaState.set('escapeTimeLeft', 300);
      window.location.reload();
    });
  }

  // Restart after victory
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      window.pabnaState.resetProgress();
      window.location.href = 'index.html';
    });
  }
});

