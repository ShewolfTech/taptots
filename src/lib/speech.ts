let isSpeaking = false;
let pendingUtterance: string | null = null;

function speak(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1.5;
  utterance.volume = 1.0;

  // Try to find a friendly English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Samantha') ||
        v.name.includes('Karen') ||
        v.name.includes('Google') ||
        v.name.includes('Female'))
  );
  if (preferred) utterance.voice = preferred;

  utterance.onend = () => {
    isSpeaking = false;
    onEnd?.();
  };

  isSpeaking = true;
  window.speechSynthesis.speak(utterance);
}

export function speakLetter(letter: string, word: string) {
  // Speak letter name, then pause, then "A for Apple"
  speak(letter, () => {
    setTimeout(() => {
      speak(`${letter} for ${word}`);
    }, 0);
  });
}

export function speakNumber(number: string, word: string) {
  speak(`${word}. ${number}`);
}

export function speakEncouragement(text: string) {
  speak(text);
}

// Preload voices (browsers lazy-load)
export function initSpeech() {
  if (typeof window === 'undefined') return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    // Some browsers need an event to load voices
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
