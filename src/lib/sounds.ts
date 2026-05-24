// Web Audio API sound effects - no external files needed
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

// Resume audio context (needed after user interaction on some browsers)
export function resumeAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
}

// Play a cheerful "pop" sound when a key is pressed
export function playKeyPress(colorIndex: number = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Different notes for variety based on colorIndex
  const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
  const freq = notes[colorIndex % notes.length];

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.4);
}

// Play a happy "ta-da" chord for encouragement
export function playEncouragement() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const chordFreqs = [523, 659, 784, 1047]; // C major chord
  chordFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.05);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.05 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.6);

    osc.start(ctx.currentTime + i * 0.05);
    osc.stop(ctx.currentTime + i * 0.05 + 0.6);
  });
}

// Piano-mode note mapping
export const PIANO_NOTES: Record<string, number> = {
  A: 261.63, // C4
  S: 293.66, // D4
  D: 329.63, // E4
  F: 349.23, // F4
  G: 392.00, // G4
  H: 440.00, // A4
  J: 493.88, // B4
  K: 523.25, // C5
  L: 587.33, // D5
  W: 277.18, // C#4
  E: 311.13, // D#4
  T: 369.99, // F#4
  Y: 415.30, // G#4
  U: 466.16, // A#4
  O: 554.37, // C#5
  P: 622.25, // D#5
};

export function playPianoNote(key: string) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const freq = PIANO_NOTES[key.toUpperCase()] || 440;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'triangle';
  osc.frequency.value = freq;
  filter.type = 'lowpass';
  filter.frequency.value = 2000;

  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 1.5);
}

// Background music state
let bgMusicGain: GainNode | null = null;
let bgMusicPlaying = false;

export function startBackgroundMusic() {
  const ctx = getAudioContext();
  if (!ctx || bgMusicPlaying) return;

  bgMusicGain = ctx.createGain();
  bgMusicGain.gain.value = 0.07; // very soft — raise to 0.15 to make louder
  bgMusicGain.connect(ctx.destination);

  // Simple cheerful repeating melody — C major pentatonic
  const notes = [523, 659, 784, 880, 784, 659, 523, 587, 659, 523];
  const noteDuration = 0.45; // seconds per note
  const totalLoop = notes.length * noteDuration;

  function playLoop(startTime: number) {
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.connect(noteGain);
      noteGain.connect(bgMusicGain!);

      osc.type = 'sine';
      osc.frequency.value = freq;

      const t = startTime + i * noteDuration;
      noteGain.gain.setValueAtTime(0, t);
      noteGain.gain.linearRampToValueAtTime(0.8, t + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, t + noteDuration * 0.85);

      osc.start(t);
      osc.stop(t + noteDuration);
    });

    // Schedule the next loop just before this one ends
    setTimeout(() => {
      if (bgMusicPlaying) playLoop(ctx.currentTime + 0.05);
    }, (totalLoop - 0.3) * 1000);
  }

  bgMusicPlaying = true;
  playLoop(ctx.currentTime);
}

export function stopBackgroundMusic() {
  bgMusicPlaying = false;
  if (bgMusicGain) {
    bgMusicGain.gain.setValueAtTime(bgMusicGain.gain.value, getAudioContext()!.currentTime);
    bgMusicGain.gain.linearRampToValueAtTime(0, getAudioContext()!.currentTime + 0.5);
    bgMusicGain = null;
  }
}
