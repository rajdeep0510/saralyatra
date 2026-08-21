/**
 * OmniSphere 360 - AI Audio Tour Guide & Procedural Ambient Soundscape Engine
 */
class AudioGuide {
  constructor(options = {}) {
    this.options = Object.assign({
      onStart: null,
      onEnd: null,
      onError: null
    }, options);

    this.isNarrating = false;
    this.currentUtterance = null;
    this.currentText = '';

    // Web Audio Synthesizer State
    this.audioCtx = null;
    this.isAmbientPlaying = false;
    this.ambientGain = null;
    this.ambientNodes = [];
  }

  /**
   * Speak narrative text using Web Speech API
   */
  speak(text) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.stopNarration();

    if (!text || text.trim().length === 0) return;
    this.currentText = text;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick best natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v =>
      v.lang.startsWith('en') &&
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Samantha'))
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      this.isNarrating = true;
      if (this.options.onStart) this.options.onStart(text);
    };

    utterance.onend = () => {
      this.isNarrating = false;
      if (this.options.onEnd) this.options.onEnd();
    };

    utterance.onerror = (err) => {
      this.isNarrating = false;
      if (this.options.onError) this.options.onError(err);
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  stopNarration() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isNarrating = false;
    if (this.options.onEnd) this.options.onEnd();
  }

  toggleNarration(text) {
    if (this.isNarrating) {
      this.stopNarration();
      return false;
    } else {
      this.speak(text);
      return true;
    }
  }

  /**
   * Procedural Relaxing Ambient Soundscape Synthesizer
   */
  toggleAmbientSound() {
    if (this.isAmbientPlaying) {
      this.stopAmbientSound();
      return false;
    } else {
      this.startAmbientSound();
      return true;
    }
  }

  startAmbientSound() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Pink noise generator for gentle breeze / atmosphere
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass resonant filter for wind rumble
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 380;
      filter.Q.value = 2.0;

      // Soft harmonic drone oscillator (110Hz A2 note)
      const osc = this.audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 108;

      const oscGain = this.audioCtx.createGain();
      oscGain.gain.value = 0.015;

      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.35, this.audioCtx.currentTime + 2.0);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);

      osc.connect(oscGain);
      oscGain.connect(this.ambientGain);

      this.ambientGain.connect(this.audioCtx.destination);

      whiteNoise.start(0);
      osc.start(0);

      this.ambientNodes = [whiteNoise, osc];
      this.isAmbientPlaying = true;
      return true;
    } catch (e) {
      console.error('Ambient audio error:', e);
      return false;
    }
  }

  stopAmbientSound() {
    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.5);
      setTimeout(() => {
        this.ambientNodes.forEach(n => {
          try { n.stop(); } catch (_) {}
        });
        this.ambientNodes = [];
      }, 500);
    }
    this.isAmbientPlaying = false;
  }
}

window.AudioGuide = AudioGuide;
