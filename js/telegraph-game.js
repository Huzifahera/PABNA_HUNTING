/**
 * THE PABNA HAUNTING - Ichamati Telegraph Wire Reconnection Mini-Game
 * Interactive HTML5 Canvas puzzle restoring severed electrical telegraph lines.
 */

class TelegraphWireMiniGame {
  constructor(canvasId, onCompleteCallback) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.onComplete = onCompleteCallback;

    // Dimensions
    this.width = this.canvas.width = 720;
    this.height = this.canvas.height = 400;

    // Terminals configuration: 4 left pins (source) and 4 right pins (destination scrambled)
    this.leftPins = [
      { id: 1, label: 'PWR-1957', color: '#ff3344', y: 80, x: 70, connectedTo: null },
      { id: 2, label: 'TLM-ICHA', color: '#33ccff', y: 160, x: 70, connectedTo: null },
      { id: 3, label: 'GND-PAKSEY', color: '#ffcc00', y: 240, x: 70, connectedTo: null },
      { id: 4, label: 'FREQ-989', color: '#33ff77', y: 320, x: 70, connectedTo: null }
    ];

    // Target pins on right (shuffled positions)
    this.rightPins = [
      { id: 3, label: 'GROUND RIVET', color: '#ffcc00', y: 80, x: 650, connectedFrom: null },
      { id: 1, label: 'MAIN DYNAMO', color: '#ff3344', y: 160, x: 650, connectedFrom: null },
      { id: 4, label: 'SHAHI RELAY', color: '#33ff77', y: 240, x: 650, connectedFrom: null },
      { id: 2, label: 'RIVER BEACON', color: '#33ccff', y: 320, x: 650, connectedFrom: null }
    ];

    this.draggedPin = null;
    this.mousePos = { x: 0, y: 0 };
    this.sparks = [];
    this.isSolved = window.pabnaState.get('telegraphRepaired') || false;
    this.lightningAlpha = 0;

    this.initEvents();
    this.animate();
  }

  initEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    const handleStart = (pos) => {
      if (this.isSolved) return;
      // Check if clicked near a left pin
      for (const pin of this.leftPins) {
        const dx = pos.x - pin.x;
        const dy = pos.y - pin.y;
        if (Math.hypot(dx, dy) < 26) {
          this.draggedPin = pin;
          // Disconnect if previously connected
          if (pin.connectedTo !== null) {
            const targetRight = this.rightPins.find(rp => rp.id === pin.connectedTo);
            if (targetRight) targetRight.connectedFrom = null;
            pin.connectedTo = null;
          }
          if (window.pabnaAudio) window.pabnaAudio.playTelegraphBeep(false);
          break;
        }
      }
    };

    const handleMove = (pos) => {
      this.mousePos = pos;
    };

    const handleEnd = () => {
      if (!this.draggedPin) return;

      // Check if dropped near a right pin
      let connected = false;
      for (const rPin of this.rightPins) {
        const dx = this.mousePos.x - rPin.x;
        const dy = this.mousePos.y - rPin.y;
        if (Math.hypot(dx, dy) < 30) {
          // If match
          if (rPin.id === this.draggedPin.id) {
            this.draggedPin.connectedTo = rPin.id;
            rPin.connectedFrom = this.draggedPin.id;
            this.addSpark(rPin.x, rPin.y, this.draggedPin.color);
            if (window.pabnaAudio) {
              window.pabnaAudio.playTelegraphBeep(true);
            }
            connected = true;
          } else {
            // Mismatch spark error
            this.addSpark(rPin.x, rPin.y, '#ff0000');
            if (window.pabnaAudio) window.pabnaAudio.playCipherError();
          }
          break;
        }
      }

      this.draggedPin = null;
      this.checkCompletion();
    };

    // Mouse listeners
    this.canvas.addEventListener('mousedown', (e) => handleStart(getPos(e)));
    window.addEventListener('mousemove', (e) => handleMove(getPos(e)));
    window.addEventListener('mouseup', () => handleEnd());

    // Touch listeners
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleStart(getPos(e.touches[0]));
    });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      handleMove(getPos(e.touches[0]));
    });
    this.canvas.addEventListener('touchend', () => handleEnd());

    // Occasional lightning flash
    setInterval(() => {
      if (Math.random() < 0.25) {
        this.lightningAlpha = 0.35 + Math.random() * 0.35;
        if (window.pabnaAudio && !window.pabnaAudio.isMuted) {
          window.pabnaAudio.playStaticBurst(0.18);
        }
      }
    }, 4000);
  }

  addSpark(x, y, color) {
    for (let i = 0; i < 16; i++) {
      this.sparks.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1.0,
        color
      });
    }
  }

  checkCompletion() {
    const allConnected = this.leftPins.every(p => p.connectedTo !== null);
    if (allConnected && !this.isSolved) {
      this.isSolved = true;
      window.pabnaState.set('telegraphRepaired', true);
      if (window.pabnaAudio) window.pabnaAudio.playCipherSuccess();
      if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  renderBackground() {
    // Atmospheric dark gradient
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, '#0a0d10');
    grad.addColorStop(0.65, '#05070a');
    grad.addColorStop(1, '#020304');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // River water reflection at bottom
    this.ctx.fillStyle = 'rgba(10, 24, 30, 0.6)';
    this.ctx.fillRect(0, this.height - 40, this.width, 40);

    // Distant asylum silhouette & tree branches
    this.ctx.fillStyle = '#060a0c';
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height - 40);
    this.ctx.lineTo(80, this.height - 90);
    this.ctx.lineTo(130, this.height - 70);
    this.ctx.lineTo(240, this.height - 120);
    this.ctx.lineTo(310, this.height - 75);
    this.ctx.lineTo(490, this.height - 110);
    this.ctx.lineTo(580, this.height - 60);
    this.ctx.lineTo(this.width, this.height - 70);
    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.fill();

    // Lightning overlay
    if (this.lightningAlpha > 0.02) {
      this.ctx.fillStyle = `rgba(210, 235, 255, ${this.lightningAlpha})`;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.lightningAlpha *= 0.82;
    }
  }

  renderPillars() {
    // Left Relay Station Box
    this.ctx.fillStyle = '#11171c';
    this.ctx.strokeStyle = '#283c48';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(20, 40, 100, 320);
    this.ctx.fillRect(20, 40, 100, 320);

    this.ctx.fillStyle = '#4af';
    this.ctx.font = '10px "Courier New", monospace';
    this.ctx.fillText('ICHAMATI RELAY', 26, 60);

    // Right Sanatorium Grid Box
    this.ctx.fillStyle = '#11171c';
    this.ctx.strokeStyle = '#283c48';
    this.ctx.strokeRect(this.width - 120, 40, 100, 320);
    this.ctx.fillRect(this.width - 120, 40, 100, 320);

    this.ctx.fillStyle = '#ff4455';
    this.ctx.fillText('WARD-7 JUNCTION', this.width - 114, 60);
  }

  renderPins() {
    // Draw Left Pins
    this.leftPins.forEach(pin => {
      this.ctx.fillStyle = pin.color;
      this.ctx.beginPath();
      this.ctx.arc(pin.x, pin.y, 11, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.fillStyle = '#ccc';
      this.ctx.font = '11px monospace';
      this.ctx.fillText(pin.label, pin.x - 45, pin.y + 4);
    });

    // Draw Right Pins
    this.rightPins.forEach(pin => {
      this.ctx.fillStyle = pin.color;
      this.ctx.beginPath();
      this.ctx.arc(pin.x, pin.y, 11, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.fillStyle = '#ccc';
      this.ctx.font = '11px monospace';
      this.ctx.fillText(pin.label, pin.x - 70, pin.y + 4);
    });
  }

  renderWires() {
    // Connected wires
    this.leftPins.forEach(pin => {
      if (pin.connectedTo !== null) {
        const target = this.rightPins.find(rp => rp.id === pin.connectedTo);
        if (target) {
          this.drawCatenaryWire(pin.x, pin.y, target.x, target.y, pin.color);
        }
      }
    });

    // Currently dragging wire
    if (this.draggedPin) {
      this.drawCatenaryWire(
        this.draggedPin.x,
        this.draggedPin.y,
        this.mousePos.x,
        this.mousePos.y,
        this.draggedPin.color,
        true
      );
    }
  }

  drawCatenaryWire(x1, y1, x2, y2, color, isDragging = false) {
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = isDragging ? 3.5 : 4;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 8;

    // Curved saggy wire effect
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 + 35; // sag

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.quadraticCurveTo(midX, midY, x2, y2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  renderSparks() {
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.04;
      if (s.life <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }
      this.ctx.fillStyle = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.life * 3.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  renderStatus() {
    this.ctx.fillStyle = '#0f171c';
    this.ctx.strokeStyle = this.isSolved ? '#00ff88' : '#ff4444';
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeRect(170, 15, 380, 40);
    this.ctx.fillRect(170, 15, 380, 40);

    this.ctx.font = '13px "Courier New", monospace';
    this.ctx.fillStyle = this.isSolved ? '#00ff88' : '#ffaa33';
    this.ctx.textAlign = 'center';

    const text = this.isSolved
      ? '✓ TELEGRAPH CIRCUIT RESTORED // CIPHER CODE: [WIRE-1890]'
      : 'DRAG WIRES FROM LEFT PINS TO MATCHING DESTINATIONS';
    this.ctx.fillText(text, 360, 40);
    this.ctx.textAlign = 'start';
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.renderBackground();
    this.renderPillars();
    this.renderWires();
    this.renderPins();
    this.renderSparks();
    this.renderStatus();

    requestAnimationFrame(() => this.animate());
  }
}

window.TelegraphWireMiniGame = TelegraphWireMiniGame;

