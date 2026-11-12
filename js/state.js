/**
 * THE PABNA HAUNTING - Centralized State Manager
 * Handles persistent game state across all 4 pages using LocalStorage
 */

const STORAGE_KEY = 'PABNA_HAUNTING_STATE_V1';

const defaultState = {
  authenticated: false,
  investigatorName: 'Agent-404',
  language: 'en', // 'en' | 'bn'
  soundEnabled: true,
  visitedCameras: [],
  discoveredAnomalies: [],
  ciphersSolved: {
    tarash: false,
    mosque: false,
    hardinge: false
  },
  telegraphRepaired: false,
  terminalAccessGranted: false,
  escapeAttempts: 0,
  escapedSuccessfully: false,
  escapeTimeLeft: 300, // 5 minutes default
  logsRead: []
};

class GameState {
  constructor() {
    this.state = this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or corrupt, using defaults', e);
    }
    return { ...defaultState };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      // Dispatch custom event for same-page listeners
      window.dispatchEvent(new CustomEvent('pabna_state_changed', { detail: this.state }));
    } catch (e) {
      console.error('Failed to save game state', e);
    }
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
    this.save();
  }

  solveCipher(cipherKey) {
    if (this.state.ciphersSolved.hasOwnProperty(cipherKey)) {
      this.state.ciphersSolved[cipherKey] = true;
      this.save();
    }
  }

  hasSolvedAllCiphers() {
    return Object.values(this.state.ciphersSolved).every(Boolean);
  }

  recordAnomaly(camId) {
    if (!this.state.discoveredAnomalies.includes(camId)) {
      this.state.discoveredAnomalies.push(camId);
      this.save();
    }
  }

  markCameraVisited(camId) {
    if (!this.state.visitedCameras.includes(camId)) {
      this.state.visitedCameras.push(camId);
      this.save();
    }
  }

  resetProgress() {
    this.state = { ...defaultState };
    this.save();
  }
}

// Global singleton instance
window.pabnaState = new GameState();

