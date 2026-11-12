/**
 * THE PABNA HAUNTING - Procedural Web Audio Engine
 * Generates eerie paranormal soundscapes, heartbeats, static, UI clicks, alarms & jumpscares.
 */

class HorrorAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = !window.pabnaState.get('soundEnabled');
    this.ambientGain = null;
    this.masterGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.noiseNode = null;
    this.noiseFilter = null;
    this.heartbeatTimer = null;
    this.bpm = 60;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.startAmbientDrone();
      this.startHeartbeat();
      this.isInitialized = true;
      console.log('Paranormal Audio Engine initialized.');
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  resumeIfNeeded() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.resumeIfNeeded();
    this.isMuted = !this.isMuted;
    window.pabnaState.set('soundEnabled', !this.isMuted);

    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.85;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    return !this.isMuted;
  }

  // --- Procedural Horror Ambiance ---
  startAmbientDrone() {
    if (!this.ctx) return;

    // Sub-bass binaural drone
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc2 = this.ctx.createOscillator();
    const droneFilter = this.ctx.createBiquadFilter();

    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(54.0, this.ctx.currentTime); // Low A

    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(56.5, this.ctx.currentTime); // Dissonant beating

    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
    droneFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    this.droneOsc1.connect(droneFilter);
    this.droneOsc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.ambientGain);

    this.droneOsc1.start();
    this.droneOsc2.start();

    // Fluctuating subtle whisper wind noise
    this.createWindAtmosphere();
  }

  createWindAtmosphere() {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.noiseFilter = this.ctx.createBiquadFilter();
    this.noiseFilter.type = 'bandpass';
    this.noiseFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.noiseFilter.Q.setValueAtTime(6.0, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    whiteNoise.connect(this.noiseFilter);
    this.noiseFilter.connect(windGain);
    windGain.connect(this.ambientGain);

    whiteNoise.start();

    // Slow frequency modulation for ghostly gusts
    setInterval(() => {
      if (this.ctx && this.noiseFilter) {
        const randFreq = 220 + Math.random() * 380;
        this.noiseFilter.frequency.setTargetAtTime(randFreq, this.ctx.currentTime, 3.0);
      }
    }, 4500);
  }

  // --- Heartbeat Generator ---
  startHeartbeat() {
    const beat = () => {
      if (this.isMuted || !this.ctx) {
        this.heartbeatTimer = setTimeout(beat, (60 / this.bpm) * 1000);
        return;
      }
      this.playHeartbeatThump(68, 0.12);
      setTimeout(() => {
        this.playHeartbeatThump(52, 0.09);
      }, 240);

      this.heartbeatTimer = setTimeout(beat, (60 / this.bpm) * 1000);
    };
    beat();
  }

  playHeartbeatThump(freq, volume) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(28, this.ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  setHeartRate(bpm) {
    this.bpm = Math.max(40, Math.min(170, bpm));
  }

  // --- Sound Effects (SFX) ---
  playKeyClick() {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playStaticBurst(duration = 0.25) {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  playCameraSwitch() {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    this.playStaticBurst(0.15);

    // Relay click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.07);
  }

  playGlitchWhisper() {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.55);
  }

  playCipherSuccess() {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime + idx * 0.09);
      osc.stop(this.ctx.currentTime + idx * 0.09 + 0.4);
    });
  }

  playCipherError() {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc.frequency.setValueAtTime(95, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playAlarmSiren() {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(900, this.ctx.currentTime + 0.4);
    osc.frequency.linearRampToValueAtTime(450, this.ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.85);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.9);
  }

  playTelegraphBeep(isDash = false) {
    this.resumeIfNeeded();
    if (!this.ctx || this.isMuted) return;
    const duration = isDash ? 0.22 : 0.08;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration + 0.02);
  }

  // --- Terrifying Jumpscare Screech ---
  triggerJumpscareAudio() {
    this.resumeIfNeeded();
    if (!this.ctx) return;

    // Distorted high screech
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(2900, this.ctx.currentTime + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 1.2);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1480, this.ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 1.5);
    osc2.stop(this.ctx.currentTime + 1.5);

    // Shock explosion burst
    this.playStaticBurst(0.9);
  }
}

// Global Audio Instance
window.pabnaAudio = new HorrorAudioEngine();

// First-click audio unlocker across browser policies
['click', 'keydown', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, () => {
    if (window.pabnaAudio && !window.pabnaAudio.isInitialized) {
      window.pabnaAudio.init();
    }
  }, { once: true });
});

