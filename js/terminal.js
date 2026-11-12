/**
 * THE PABNA HAUNTING - Terminal & Gateway Hub Controller
 * Handles vintage terminal commands, audio keystrokes, and authentication.
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const loginForm = document.getElementById('hub-login-form');
  const loginFeedback = document.getElementById('login-feedback');
  const callsignInput = document.getElementById('investigator-callsign');
  const passcodeInput = document.getElementById('investigator-passcode');
  const telegraphModal = document.getElementById('telegraph-modal');
  const btnOpenTelegraph = document.getElementById('btn-open-telegraph');
  const btnCloseTelegraph = document.getElementById('btn-close-telegraph');

  // Print line helper
  const printLine = (text, type = 'normal') => {
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  // Welcome terminal sequence
  const isBn = window.pabnaState && window.pabnaState.get('language') === 'bn';
  printLine('>>> INITIALIZING PARANORMAL_OS v4.19 (PABNA CONTAINMENT SYSTEM)...', 'info');
  printLine('>>> SECTOR: HEMAYETPUR ASYLUM // ICHAMATI RIVER BASIN', 'warn');
  printLine(isBn 
    ? '>>> সিস্টেম সংকেত: ৪ নম্বর বিপদ সংকেত কার্যকর। কমান্ড জানার জন্য "HELP" লিখুন।'
    : '>>> STATUS: ANOMALOUS LEVEL 4. Enter credentials or type "HELP" for commands.', 'normal');

  // Command Parser
  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    printLine(`$ ${trimmed}`, 'info');
    const parts = trimmed.split(' ');
    const cmd = parts[0].toUpperCase();
    const args = parts.slice(1);

    if (window.pabnaAudio) {
      window.pabnaAudio.playKeyClick();
    }

    switch (cmd) {
      case 'HELP':
      case '?':
        printLine('AVAILABLE COMMANDS:', 'warn');
        printLine('  HELP             - Show command index');
        printLine('  LORE             - Decrypt regional paranormal background');
        printLine('  STATUS           - Check asylum containment & puzzle telemetry');
        printLine('  SCAN             - Run EMF sensor sweep across asylum wards');
        printLine('  WIRE             - Launch Ichamati telegraph circuit repair interface');
        printLine('  CLUES            - Display collected paranormal cipher clues');
        printLine('  LOGIN [USER] [PASS] - Authenticate gate override directly');
        printLine('  CLEAR            - Flush terminal memory');
        break;

      case 'LORE':
        printLine('ARCHIVAL SUMMARY: PABNA MENTAL ASYLUM (1957)', 'warn');
        printLine('Location: Hemayetpur, on the curved banks of Ichamati River, Pabna.');
        printLine('Historical Anchors:');
        printLine(' - Tarash Zamindar Palace: 18th-century masonry holding forgotten riddles.');
        printLine(' - Chatmohar Shahi Mosque: Built 1581-1582 by Masum Khan Kabuli; low-frequency acoustic anomaly.');
        printLine(' - Hardinge Bridge: Paksey railway marvel opened 1915 over the Padma; steel resonance.');
        printLine('Paranormal Note: Multiple entity sightings reported in Ward 7 near the electro-shock wing.', 'info');
        break;

      case 'STATUS':
        const auth = window.pabnaState.get('authenticated');
        const ciphers = window.pabnaState.get('ciphersSolved');
        const wire = window.pabnaState.get('telegraphRepaired');
        printLine(`GATE AUTHENTICATION: ${auth ? 'GRANTED [UNLOCKED]' : 'SEALED [RESTRICTED]'}`, auth ? 'normal' : 'error');
        printLine(`ICHAMATI TELEGRAPH CIRCUIT: ${wire ? 'RESTORED' : 'DAMAGED // OFFLINE'}`, wire ? 'normal' : 'warn');
        printLine(`CIPHER RELICS: Tarash=${ciphers.tarash}, Mosque=${ciphers.mosque}, Hardinge=${ciphers.hardinge}`, 'info');
        break;

      case 'SCAN':
        printLine('[*] ACTIVATING TRI-FIELD EMF TRANSDUCER...', 'info');
        if (window.pabnaAudio) window.pabnaAudio.playStaticBurst(0.5);
        setTimeout(() => {
          printLine('WARD 7: 84.7 mG (EXTREME ELECTROMAGNETIC FLUCTUATION DETECTED)', 'error');
          printLine('MORGUE SUB-BASEMENT: -4.2°C COLD SPOT RECORDED', 'warn');
          printLine('ICHAMATI RIVER SHORE: RECURRENT AUDITORY MORSE SIGNALS', 'info');
          if (window.pabnaAudio) window.pabnaAudio.playGlitchWhisper();
        }, 600);
        break;

      case 'WIRE':
        openTelegraphModal();
        printLine('Opening telegraph repair interface...', 'normal');
        break;

      case 'CLUES':
        const wireRepaired = window.pabnaState.get('telegraphRepaired');
        const anomalies = window.pabnaState.get('discoveredAnomalies');
        printLine('INVESTIGATION INTEL LOGS:', 'warn');
        printLine(`- Gate Override Password: ICHAMATI1957`, 'normal');
        if (wireRepaired) {
          printLine(`- Telegraph Signal Recovered: [WIRE-1890]`, 'info');
        } else {
          printLine(`- Telegraph Signal: OFFLINE (Type 'WIRE' to repair)`, 'error');
        }
        if (anomalies.length > 0) {
          printLine(`- Discovered Camera Anomalies: ${anomalies.join(', ')}`, 'normal');
        }
        break;

      case 'LOGIN':
        if (args.length >= 2) {
          const u = args[0];
          const p = args.slice(1).join(' ').toUpperCase();
          verifyPasscode(u, p);
        } else {
          printLine('ERROR: Usage is LOGIN [CALLSIGN] [PASSCODE]', 'error');
        }
        break;

      case 'CLEAR':
        terminalBody.innerHTML = '';
        break;

      default:
        printLine(`COMMAND NOT RECOGNIZED: "${cmd}". Type "HELP" for instructions.`, 'error');
        if (window.pabnaAudio) window.pabnaAudio.playCipherError();
        break;
    }
  };

  // Terminal Input Event
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      }
    });
  }

  // Verification Logic
  const verifyPasscode = (callsign, pass) => {
    const cleanPass = pass.trim().toUpperCase();
    // Valid passwords: ICHAMATI1957, ICHAMATI, 1957, PABNA
    if (cleanPass === 'ICHAMATI1957' || cleanPass === 'ICHAMATI' || cleanPass === '1957') {
      window.pabnaState.set('authenticated', true);
      window.pabnaState.set('investigatorName', callsign || 'Agent-404');
      
      if (window.pabnaAudio) window.pabnaAudio.playCipherSuccess();

      printLine('>>> CREDENTIALS VERIFIED. CONTAINMENT GATE OVERRIDE GRANTED.', 'normal');
      printLine('>>> ACCESS TO SURVEILLANCE & ARCHIVES UNLOCKED.', 'info');

      if (loginFeedback) {
        loginFeedback.className = 'status-msg success';
        loginFeedback.innerHTML = '✓ AUTHORIZATION CONFIRMED. Rerouting to Surveillance Grid...';
      }

      setTimeout(() => {
        window.location.href = 'surveillance.html';
      }, 1400);
    } else {
      if (window.pabnaAudio) window.pabnaAudio.playCipherError();
      printLine('>>> ERROR 403: INVALID CIPHER PASSCODE. ATTEMPT LOGGED.', 'error');
      if (loginFeedback) {
        loginFeedback.className = 'status-msg error';
        loginFeedback.innerHTML = '✗ ACCESS DENIED: Incorrect passcode. Hint: Name of the river + founding year.';
      }
    }
  };

  // Form Submit
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const callsign = callsignInput ? callsignInput.value : 'Investigator';
      const pass = passcodeInput ? passcodeInput.value : '';
      verifyPasscode(callsign, pass);
    });
  }

  // Telegraph Modal Logic
  let telegraphGameInstance = null;

  const openTelegraphModal = () => {
    if (telegraphModal) {
      telegraphModal.classList.add('active');
      if (!telegraphGameInstance && window.TelegraphWireMiniGame) {
        telegraphGameInstance = new window.TelegraphWireMiniGame('telegraph-canvas', () => {
          printLine('>>> [SUCCESS] ICHAMATI TELEGRAPH CIRCUIT HAS BEEN RESTORED! Clue: WIRE-1890', 'normal');
        });
      }
    }
  };

  const closeTelegraphModal = () => {
    if (telegraphModal) {
      telegraphModal.classList.remove('active');
    }
  };

  if (btnOpenTelegraph) {
    btnOpenTelegraph.addEventListener('click', openTelegraphModal);
  }

  if (btnCloseTelegraph) {
    btnCloseTelegraph.addEventListener('click', closeTelegraphModal);
  }
});

