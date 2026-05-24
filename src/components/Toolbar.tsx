'use client';

import styles from './Toolbar.module.css';
import type { KeyMode } from '@/lib/keyData';
import { startBackgroundMusic, stopBackgroundMusic } from '@/lib/sounds';

interface ToolbarProps {
  mode: KeyMode;
  pianoMode: boolean;
  darkMode: boolean;
  onModeChange: (m: KeyMode) => void;
  onPianoToggle: () => void;
  onDarkToggle: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
  musicOn: boolean;
  onMusicToggle: () => void;
}

export default function Toolbar({
  mode,
  pianoMode,
  darkMode,
  onModeChange,
  onPianoToggle,
  onDarkToggle,
  onFullscreen,
  musicOn,
  onMusicToggle,
  isFullscreen,
}: ToolbarProps) {
  return (
    <div className={`${styles.toolbar} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.group}>
        <button
          className={`${styles.btn} ${mode === 'default' && !pianoMode ? styles.active : ''}`}
          onClick={() => { onModeChange('default'); }}
          title="Default mode"
          aria-label="Default mode"
        >
          🔤
        </button>
        <button
          className={`${styles.btn} ${mode === 'animals' && !pianoMode ? styles.active : ''}`}
          onClick={() => { onModeChange('animals'); }}
          title="Animal mode"
          aria-label="Animal mode"
        >
          🦁
        </button>
        <button
          className={`${styles.btn} ${mode === 'fruits' && !pianoMode ? styles.active : ''}`}
          onClick={() => { onModeChange('fruits'); }}
          title="Fruit mode"
          aria-label="Fruit mode"
        >
          🍎
        </button>
        <button
          className={`${styles.btn} ${pianoMode ? styles.active : ''}`}
          onClick={onPianoToggle}
          title="Piano mode"
          aria-label="Piano mode"
        >
          🎹
        </button>
      </div>

      <div className={styles.group}>
        <button
          className={`${styles.btn} ${musicOn ? styles.active : ''}`}
          onClick={onMusicToggle}
          title="Background music"
          aria-label="Toggle background music"
        >
          🎶
        </button>
        <button
          className={`${styles.btn} ${darkMode ? styles.active : ''}`}
          onClick={onDarkToggle}
          title="Dark mode"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          className={styles.btn}
          onClick={onFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? '⊡' : '⛶'}
        </button>
      </div>
    </div>
  );
}
