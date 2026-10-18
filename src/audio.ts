// One shared engine: every oscillator connects through the same master gain.
export class DreamAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices = new Set<OscillatorNode>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private muted = true;
  private generation = 0;
  async enable() {
    this.context ??= new AudioContext();
    if (!this.master) { this.master = this.context.createGain(); this.master.connect(this.context.destination); }
    await this.context.resume();
    this.muted = false;
    this.master.gain.setValueAtTime(.16, this.context.currentTime);
  }
  mute() { this.muted = true; this.stop(); if (this.master && this.context) this.master.gain.setValueAtTime(0, this.context.currentTime); }
  note(frequency: number, duration = .55) {
    if (this.muted || !this.context || !this.master || this.context.state !== 'running') return;
    const ctx = this.context, oscillator = ctx.createOscillator(), envelope = ctx.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(0, ctx.currentTime); envelope.gain.linearRampToValueAtTime(.6, ctx.currentTime + .015); envelope.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + duration);
    oscillator.connect(envelope); envelope.connect(this.master); this.voices.add(oscillator);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); this.voices.delete(oscillator); };
    oscillator.start(); oscillator.stop(ctx.currentTime + duration + .02);
  }
  click() { this.note(784, .12); }
  async play() {
    this.stop(); const generation = this.generation;
    await this.enable();
    if (generation !== this.generation) { this.mute(); return false; }
    const melody = [523.25,659.25,783.99,659.25,587.33,440,523.25,0,659.25,783.99,1046.5,783.99,659.25,587.33,523.25,0];
    let index = 0;
    const tick = () => { const frequency = melody[index++ % melody.length]; if (frequency) this.note(frequency, 1.15); };
    tick(); this.timer = setInterval(tick, 520); return true;
  }
  stop() { this.generation++; if (this.timer) clearInterval(this.timer); this.timer = null; for (const voice of this.voices) { try { voice.stop(); } catch { /* already ended */ } voice.disconnect(); } this.voices.clear(); }
  dispose() { this.stop(); void this.context?.close(); this.context = null; this.master = null; }
}
