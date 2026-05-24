'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './KeyDisplay.module.css';
import {
  IGNORED_KEYS,
  ENCOURAGEMENTS,
  numberMap,
  getLetterMap,
  nextColor,
  type KeyMode,
} from '@/lib/keyData';
import { speakLetter, speakNumber, speakEncouragement, initSpeech } from '@/lib/speech';
import { playKeyPress, playEncouragement, playPianoNote, resumeAudio, PIANO_NOTES } from '@/lib/sounds';

interface DisplayState {
  letter: string;
  word: string;
  emoji: string;
  bgColor: string;
  isNumber: boolean;
  animKey: number; // increment to re-trigger animation
}

interface KeyDisplayProps {
  mode: KeyMode;
  pianoMode: boolean;
  darkMode: boolean;
}

let pressCount = 0;
const ENCOURAGEMENT_EVERY = 5;

export default function KeyDisplay({ mode, pianoMode, darkMode }: KeyDisplayProps) {
  const [display, setDisplay] = useState<DisplayState | null>(null);
  const [encouragement, setEncouragement] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const particleIdRef = useRef(0);
  const encouragementTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initSpeech();
  }, []);

  const spawnParticles = useCallback((color: string) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: particleIdRef.current++,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      color,
    }));
    setParticles((prev) => [...prev.slice(-20), ...newParticles]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 800);
  }, []);

  const showEncouragement = useCallback(() => {
    const msg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    setEncouragement(msg);
    playEncouragement();
    speakEncouragement(msg.replace(/[\u{1F600}-\u{1FFFF}]/gu, '').replace(/[^\w\s!']/g, '').trim());
    if (encouragementTimerRef.current) clearTimeout(encouragementTimerRef.current);
    encouragementTimerRef.current = setTimeout(() => setEncouragement(null), 2000);
  }, []);

  const handleKey = useCallback(
    (key: string) => {
      if (IGNORED_KEYS.has(key)) return;

      resumeAudio();
      const upper = key.toUpperCase();
      const color = nextColor();
      spawnParticles(color);

      pressCount++;
      if (pressCount % ENCOURAGEMENT_EVERY === 0) {
        showEncouragement();
      }

      // Piano mode
      if (pianoMode) {
        playPianoNote(upper);
      
        // Map key → note name for display
        const noteNames: Record<string, string> = {
          A: 'C4', S: 'D4', D: 'E4', F: 'F4', G: 'G4',
          H: 'A4', J: 'B4', K: 'C5', L: 'D5',
          W: 'C#4', E: 'D#4', T: 'F#4', Y: 'G#4', U: 'A#4',
          O: 'C#5', P: 'D#5',
        };
      
        setDisplay((prev) => ({
          letter: upper,
          word: noteNames[upper] ?? '🎵',   // ← shows "C4", "D4", etc.
          emoji: '🎹',
          bgColor: color,
          isNumber: false,
          animKey: (prev?.animKey ?? 0) + 1,
        }));
        return;
      }

      // Number key
      if (numberMap[key]) {
        const data = numberMap[key];
        playKeyPress(parseInt(key));
        speakNumber(key, data.word);
        setDisplay((prev) => ({
          letter: data.letter,
          word: data.word,
          emoji: data.emoji,
          bgColor: color,
          isNumber: true,
          animKey: (prev?.animKey ?? 0) + 1,
        }));
        return;
      }

      // Letter key
      const letterMap = getLetterMap(mode);
      if (letterMap[upper]) {
        const data = letterMap[upper];
        playKeyPress(upper.charCodeAt(0) % 8);
        speakLetter(upper, data.word);
        setDisplay((prev) => ({
          letter: data.letter,
          word: data.word,
          emoji: data.emoji,
          bgColor: color,
          isNumber: false,
          animKey: (prev?.animKey ?? 0) + 1,
        }));
      }
    },
    [mode, pianoMode, spawnParticles, showEncouragement]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Block ALL browser default actions while this app is the active tab.
      // Stops Ctrl+T (new tab), Ctrl+W (close), Ctrl+R/F5 (refresh),
      // Backspace (navigate back), Space/arrows (scroll), F-keys, etc.
      // Called unconditionally and in capture phase to intercept
      // modifier combos before the browser ever sees them.
      e.preventDefault();

      // Ignore key-repeat from held keys to avoid flooding
      if (e.repeat) return;
      handleKey(e.key);
    };

    // capture: true fires our handler before browser shortcuts and before
    // any child-element listeners — required for Ctrl/Alt combos.
    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [handleKey]);

  const bgColor = display?.bgColor ?? (darkMode ? '#1a1a2e' : '#FF6B9D');

  return (
    <div
      className={`${styles.stage} ${darkMode ? styles.dark : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
          style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color }}
        />
      ))}

      {/* Encouragement toast */}
      {encouragement && (
        <div className={styles.encouragement}>{encouragement}</div>
      )}

      {/* Main display */}
      {display ? (
        <div key={display.animKey} className={styles.card}>
          <div className={styles.emoji}>{display.emoji}</div>
          <div className={styles.letter}>{display.letter}</div>
          <div className={styles.word}>
            {display.isNumber ? display.word : `${display.letter} for ${display.word}`}
          </div>
        </div>
      ) : (
        <div className={styles.welcome}>
          <div className={styles.welcomeEmoji}>⌨️</div>
          <div className={styles.welcomeText}>Press any key!</div>
          <div className={styles.welcomeSub}>Letters & Numbers</div>
        </div>
      )}

      {/* Piano mode indicator */}
      {pianoMode && (
        <div className={styles.modeTag}>🎹 Piano Mode</div>
      )}
    </div>
  );
}
