# 🎹 TapTots — Learn Letters & Numbers

A **child-friendly Progressive Web App** for toddlers under 3. Press any key on the keyboard and watch colorful animations, hear the letter/number spoken aloud, and see a matching emoji and word!

---

## 🌟 Features

| Feature | Details |
|---|---|
| 🔤 Letter Keys | Shows letter large, speaks "A for Apple", shows emoji |
| 🔢 Number Keys | Shows number, speaks "One", shows emoji |
| 🎹 Piano Mode | Every key plays a musical note |
| 🦁 Animal Mode | All letters map to animals |
| 🍎 Fruit Mode | All letters map to fruits |
| 🎉 Encouragements | Every 5 presses: "Great job!", "Awesome!" etc. |
| 🌙 Dark Mode | Dimmed colors for nighttime use |
| 💫 Animations | Bounce, scale, pop, particle burst, float |
| 🔊 Sound Effects | Web Audio API tones — no external files needed |
| 🗣️ Voice | Browser SpeechSynthesis speaks every key |
| 📱 PWA | Installable, works offline, fullscreen |

---

## 📁 Project Structure

```
toddler-keys/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker (offline support)
│   └── icons/                 # PWA icons (all sizes)
│       ├── icon-72x72.png
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout + PWA meta tags + font
│   │   ├── globals.css        # Reset + base styles
│   │   ├── page.tsx           # Main page (mode state, fullscreen)
│   │   └── page.module.css
│   ├── components/
│   │   ├── KeyDisplay.tsx     # Core: keyboard listener + display
│   │   ├── KeyDisplay.module.css  # All animations
│   │   ├── Toolbar.tsx        # Mode buttons (animals/fruits/piano/dark)
│   │   └── Toolbar.module.css
│   └── lib/
│       ├── keyData.ts         # A→Apple, B→Ball, ... all mappings
│       ├── speech.ts          # SpeechSynthesis wrapper
│       └── sounds.ts          # Web Audio API sound effects
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## 🚀 Running Locally

### Prerequisites
- **Node.js** 18+ ([nodejs.org](https://nodejs.org))
- **npm** (comes with Node)

### Steps

```bash
# 1. Clone / copy the project folder
cd toddler-keys

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → Open http://localhost:3000

# OR build and serve production:
npm run build
npm start
# → Open http://localhost:3000
```

> **Tip:** For the best experience, open in **fullscreen** using the ⛶ button in the top-right corner, or press **F11** in Chrome.

---

## 📲 Installing as a PWA

### On Desktop (Chrome / Edge)
1. Open `http://localhost:3000` (or your deployed URL)
2. Click the **install icon** (➕) in the address bar
3. Click **"Install"** → App opens in its own window, works offline!

### On iPad / iPhone
1. Open in **Safari**
2. Tap the **Share** button → **"Add to Home Screen"**
3. Tap **Add** → Full-screen app icon appears!

### On Android
1. Open in **Chrome**
2. Tap the **three dots menu** → **"Add to Home screen"**

---

## ☁️ Deploying

### Vercel (Easiest — Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow prompts → get a live URL like:
# https://toddler-keys.vercel.app
```

### Netlify

```bash
npm run build
# Upload the .next folder, OR:

npx netlify-cli deploy --prod --dir=.next
```

### Self-hosted (Any VPS)

```bash
npm run build
npm start
# Use nginx/caddy as reverse proxy on port 3000
# Must serve over HTTPS for PWA install to work
```

> ⚠️ **HTTPS required** for PWA install + service worker in production. Vercel/Netlify provide this automatically.

---

## 🎨 Customizing

### Change letter mappings
Edit `src/lib/keyData.ts`:
```typescript
export const letterMapDefault = {
  A: { letter: 'A', word: 'Astronaut', emoji: '👨‍🚀' },
  // ...
};
```

### Add encouragements
```typescript
export const ENCOURAGEMENTS = [
  'You are a genius! 🧠',
  // add more here
];
```

### Change colors
```typescript
const COLORS = [
  '#FF6B9D', '#FF8E53', // add your hex colors
];
```

### Change voice speed/pitch
Edit `src/lib/speech.ts`:
```typescript
utterance.rate = 0.85;   // 0.1 – 2 (slower = easier to understand)
utterance.pitch = 1.2;   // 0 – 2 (higher = more child-friendly)
```

---

## 🛡️ Key Filtering

These keys are **silently ignored** (no reaction):
`Shift, Ctrl, Alt, Meta, Tab, Escape, CapsLock, Backspace, Delete, Enter, Arrow keys, F1-F12, PrintScreen, ScrollLock, Pause, NumLock`

Everything else (letters A-Z, numbers 0-9, punctuation) triggers the display.

---

## 🎹 Piano Mode Note Mapping

| Key | Note |
|-----|------|
| A | C4 (middle C) |
| S | D4 |
| D | E4 |
| F | F4 |
| G | G4 |
| H | A4 |
| J | B4 |
| K | C5 |
| W/E/T/Y/U/O/P | Sharps/flats |

---

## 🔧 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (no Tailwind needed)
- **Web Speech API** (SpeechSynthesis)
- **Web Audio API** (sound effects, no external files)
- **PWA**: manifest.json + service worker
- **Google Fonts**: Fredoka One (the perfect toddler font!)

---

Made with ❤️ for the tiniest keyboard smashers.
