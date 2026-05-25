'use client';

import { useState, useCallback, useEffect } from 'react';
import KeyDisplay from '@/components/KeyDisplay';
import Toolbar from '@/components/Toolbar';
import styles from './page.module.css';
import type { KeyMode } from '@/lib/keyData';
import { startBackgroundMusic, stopBackgroundMusic } from '@/lib/sounds';
import { resumeAudio } from '@/lib/sounds';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<KeyMode>('default');
  const [pianoMode, setPianoMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  // Add state — auto-show on touch devices
  const [showKeypad, setShowKeypad] = useState(false);

  // Detect touch device on mount and show keypad automatically
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setShowKeypad(isTouch);
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.warn('SW registration failed:', err));
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  // Allow any key press on the splash screen to start too
  useEffect(() => {
    if (started) return;
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      handleStart();
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [started]);

  const handleStart = useCallback(() => {
    resumeAudio();
    setStarted(true);
  }, []);

  const handleModeChange = useCallback((m: KeyMode) => {
    setMode(m);
    setPianoMode(false);
  }, []);

  const handlePianoToggle = useCallback(() => setPianoMode((p) => !p), []);
  const handleDarkToggle = useCallback(() => setDarkMode((d) => !d), []);

  const handleMusicToggle = useCallback(() => {
    setMusicOn((m) => {
      if (!m) startBackgroundMusic();
      else stopBackgroundMusic();
      return !m;
    });
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen().catch(() => { });
    }
  }, []);

  // ── Splash screen ──────────────────────────────────────────────
  if (!started) {
    return (
      <main className={styles.splash}>
        {/* Floating background blobs */}
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />

        {/* Logo mark — inline SVG so no external file needed */}
        <div className={styles.logoWrap}>
          <svg width="160" height="160" viewBox="90 40 500 500" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="kc"><rect x="190" y="295" width="295" height="175" rx="28" /></clipPath>
              <clipPath id="sc"><ellipse cx="338" cy="272" rx="62" ry="58" /></clipPath>
            </defs>
            <rect x="90" y="40" width="500" height="500" rx="100" fill="#FFF8F0" />
            <circle cx="160" cy="130" r="70" fill="#FFE5EC" opacity="0.9" />
            <circle cx="520" cy="110" r="60" fill="#E5F0FF" opacity="0.9" />
            <circle cx="540" cy="430" r="80" fill="#E5FFE9" opacity="0.9" />
            <circle cx="140" cy="450" r="65" fill="#FFF5E0" opacity="0.9" />
            <rect x="195" y="308" width="295" height="175" rx="28" fill="#C8B8A2" />
            <rect x="190" y="295" width="295" height="175" rx="28" fill="white" stroke="#E8DDD0" stroke-width="2" />
            <rect x="190" y="295" width="50" height="175" fill="#FF6B9D" clip-path="url(#kc)" opacity="0.18" />
            <rect x="240" y="295" width="42" height="175" fill="#FF9500" clip-path="url(#kc)" opacity="0.18" />
            <rect x="282" y="295" width="42" height="175" fill="#FFCC02" clip-path="url(#kc)" opacity="0.18" />
            <rect x="324" y="295" width="42" height="175" fill="#34C759" clip-path="url(#kc)" opacity="0.18" />
            <rect x="366" y="295" width="42" height="175" fill="#5AC8FA" clip-path="url(#kc)" opacity="0.18" />
            <rect x="408" y="295" width="42" height="175" fill="#007AFF" clip-path="url(#kc)" opacity="0.18" />
            <rect x="450" y="295" width="35" height="175" fill="#AF52DE" clip-path="url(#kc)" opacity="0.18" />
            <text x="338" y="406" text-anchor="middle" font-family="Arial Rounded MT Bold, Arial, sans-serif" font-size="110" font-weight="900" fill="#3D2C1E" opacity="0.85">A</text>
            <rect x="205" y="305" width="260" height="18" rx="9" fill="white" opacity="0.5" />
            <ellipse cx="338" cy="255" rx="68" ry="72" fill="#FDBF8A" />
            <ellipse cx="338" cy="272" rx="62" ry="58" fill="#FF6B9D" />
            <rect x="276" y="248" width="20" height="82" fill="#FF9500" clip-path="url(#sc)" opacity="0.5" />
            <rect x="316" y="248" width="20" height="82" fill="#FFCC02" clip-path="url(#sc)" opacity="0.5" />
            <rect x="356" y="248" width="20" height="82" fill="#5AC8FA" clip-path="url(#sc)" opacity="0.5" />
            <rect x="396" y="248" width="20" height="82" fill="#AF52DE" clip-path="url(#sc)" opacity="0.5" />
            <path d="M278,240 Q240,252 228,295 Q224,308 238,312 Q252,316 260,302 Q272,268 292,258 Z" fill="#FDBF8A" />
            <ellipse cx="234" cy="316" rx="18" ry="14" fill="#FDBF8A" />
            <ellipse cx="234" cy="335" rx="10" ry="16" fill="#FDBF8A" />
            <path d="M396,242 Q440,220 462,192 Q470,180 460,172 Q450,164 440,174 Q420,200 398,228 Z" fill="#FDBF8A" />
            <ellipse cx="458" cy="170" rx="16" ry="14" fill="#FDBF8A" />
            <polygon points="480,134 483,143 492,143 485,149 488,159 480,153 472,159 475,149 468,143 477,143" fill="#FFCC02" />
            <rect x="322" y="183" width="32" height="22" rx="10" fill="#FDBF8A" />
            <circle cx="338" cy="165" r="72" fill="#FDBF8A" />
            <ellipse cx="268" cy="168" rx="16" ry="18" fill="#FDBF8A" />
            <ellipse cx="268" cy="168" rx="9" ry="11" fill="#F0A870" />
            <ellipse cx="408" cy="168" rx="16" ry="18" fill="#FDBF8A" />
            <ellipse cx="408" cy="168" rx="9" ry="11" fill="#F0A870" />
            <ellipse cx="310" cy="97" rx="20" ry="22" fill="#8B5E3C" />
            <ellipse cx="338" cy="93" rx="22" ry="24" fill="#8B5E3C" />
            <ellipse cx="366" cy="97" rx="20" ry="22" fill="#8B5E3C" />
            <ellipse cx="295" cy="108" rx="14" ry="16" fill="#8B5E3C" />
            <ellipse cx="381" cy="108" rx="14" ry="16" fill="#8B5E3C" />
            <ellipse cx="315" cy="160" rx="18" ry="20" fill="white" />
            <ellipse cx="361" cy="160" rx="18" ry="20" fill="white" />
            <circle cx="318" cy="162" r="13" fill="#5B3A1A" />
            <circle cx="364" cy="162" r="13" fill="#5B3A1A" />
            <circle cx="320" cy="164" r="7" fill="#1A0A00" />
            <circle cx="366" cy="164" r="7" fill="#1A0A00" />
            <circle cx="323" cy="158" r="4" fill="white" />
            <circle cx="369" cy="158" r="4" fill="white" />
            <ellipse cx="292" cy="175" rx="16" ry="10" fill="#FF8FAB" opacity="0.45" />
            <ellipse cx="384" cy="175" rx="16" ry="10" fill="#FF8FAB" opacity="0.45" />
            <ellipse cx="338" cy="178" rx="7" ry="5" fill="#F0A870" />
            <path d="M316,194 Q338,216 360,194" stroke="#C4673A" stroke-width="3.5" fill="none" stroke-linecap="round" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className={styles.wordmark}>
          <span className={styles.wordTap}>Tap</span>
          <span className={styles.wordDot}>·</span>
          <span className={styles.wordTots}>Tots</span>
        </div>

        <p className={styles.tagline}>Press any key to start learning! 🎉</p>

        {/* Big tap-to-start button for touch devices */}
        <button className={styles.startBtn} onClick={handleStart}>
          Tap to Start 👆
        </button>

        {/* Footer credit */}
        <footer className={styles.footer}>
          Made with ❤️ by{' '}
          <a
            href="https://shewolftech.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            ShewolfTech
          </a>
        </footer>
      </main>
    );
  }

  // ── Main app ───────────────────────────────────────────────────
  return (
    <main className={`${styles.main} ${darkMode ? styles.dark : ''}`}>
      <KeyDisplay mode={mode} pianoMode={pianoMode} darkMode={darkMode} showMobileKeypad={showKeypad} />
      <Toolbar
        mode={mode}
        pianoMode={pianoMode}
        darkMode={darkMode}
        onModeChange={handleModeChange}
        onPianoToggle={handlePianoToggle}
        onDarkToggle={handleDarkToggle}
        onFullscreen={handleFullscreen}
        musicOn={musicOn}
        onMusicToggle={handleMusicToggle}
        isFullscreen={isFullscreen}
      />
    </main>
  );
}