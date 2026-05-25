'use client';

import styles from './MobileKeypad.module.css';

interface KeyPadProps {
  onKey: (key: string) => void;
}

const ROWS = [
  ['A','B','C','D','E','F','G'],
  ['H','I','J','K','L','M','N'],
  ['O','P','Q','R','S','T','U'],
  ['V','W','X','Y','Z'],
];

const NUMBERS = ['1','2','3','4','5','6','7','8','9','0'];

export default function MobileKeyPad({ onKey }: KeyPadProps) {
  return (
    <div className={styles.keypad}>
      {/* Number row */}
      <div className={styles.row}>
        {NUMBERS.map((n) => (
          <button
            key={n}
            className={`${styles.key} ${styles.numKey}`}
            onPointerDown={(e) => {
              e.preventDefault(); // prevent focus steal / scroll
              onKey(n);
            }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Letter rows */}
      {ROWS.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.map((letter) => (
            <button
              key={letter}
              className={styles.key}
              onPointerDown={(e) => {
                e.preventDefault();
                onKey(letter);
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
