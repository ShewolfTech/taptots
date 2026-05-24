export type KeyMode = 'animals' | 'fruits' | 'default';

export interface KeyData {
  letter: string;
  word: string;
  emoji: string;
  color: string;
}

// Bright, toddler-friendly color palette
const COLORS = [
  '#FF6B9D', '#FF8E53', '#FFC842', '#4CD964',
  '#5AC8FA', '#007AFF', '#AF52DE', '#FF3B30',
  '#FF9500', '#FFCC02', '#34C759', '#00C7BE',
  '#30B0C7', '#32ADE6', '#FF6482', '#BF5AF2',
];

export const letterMapDefault: Record<string, Omit<KeyData, 'color'>> = {
  A: { letter: 'A', word: 'Apple',      emoji: '🍎' },
  B: { letter: 'B', word: 'Ball',       emoji: '⚽' },
  C: { letter: 'C', word: 'Cat',        emoji: '🐱' },
  D: { letter: 'D', word: 'Dog',        emoji: '🐶' },
  E: { letter: 'E', word: 'Elephant',   emoji: '🐘' },
  F: { letter: 'F', word: 'Fish',       emoji: '🐟' },
  G: { letter: 'G', word: 'Grapes',     emoji: '🍇' },
  H: { letter: 'H', word: 'Hat',        emoji: '🎩' },
  I: { letter: 'I', word: 'Ice Cream',  emoji: '🍦' },
  J: { letter: 'J', word: 'Jellyfish',  emoji: '🪼' },
  K: { letter: 'K', word: 'Kite',       emoji: '🪁' },
  L: { letter: 'L', word: 'Lion',       emoji: '🦁' },
  M: { letter: 'M', word: 'Moon',       emoji: '🌙' },
  N: { letter: 'N', word: 'Nest',       emoji: '🪹' },
  O: { letter: 'O', word: 'Orange',     emoji: '🍊' },
  P: { letter: 'P', word: 'Penguin',    emoji: '🐧' },
  Q: { letter: 'Q', word: 'Queen',      emoji: '👑' },
  R: { letter: 'R', word: 'Rainbow',    emoji: '🌈' },
  S: { letter: 'S', word: 'Star',       emoji: '⭐' },
  T: { letter: 'T', word: 'Tiger',      emoji: '🐯' },
  U: { letter: 'U', word: 'Umbrella',   emoji: '☂️' },
  V: { letter: 'V', word: 'Violin',     emoji: '🎻' },
  W: { letter: 'W', word: 'Whale',      emoji: '🐳' },
  X: { letter: 'X', word: 'Xylophone',  emoji: '🎵' },
  Y: { letter: 'Y', word: 'Yak',        emoji: '🐃' },
  Z: { letter: 'Z', word: 'Zebra',      emoji: '🦓' },
};

export const letterMapAnimals: Record<string, Omit<KeyData, 'color'>> = {
  A: { letter: 'A', word: 'Alligator', emoji: '🐊' },
  B: { letter: 'B', word: 'Bear',      emoji: '🐻' },
  C: { letter: 'C', word: 'Cat',       emoji: '🐱' },
  D: { letter: 'D', word: 'Duck',      emoji: '🦆' },
  E: { letter: 'E', word: 'Elephant',  emoji: '🐘' },
  F: { letter: 'F', word: 'Fox',       emoji: '🦊' },
  G: { letter: 'G', word: 'Gorilla',   emoji: '🦍' },
  H: { letter: 'H', word: 'Horse',     emoji: '🐴' },
  I: { letter: 'I', word: 'Iguana',    emoji: '🦎' },
  J: { letter: 'J', word: 'Jaguar',    emoji: '🐆' },
  K: { letter: 'K', word: 'Kangaroo',  emoji: '🦘' },
  L: { letter: 'L', word: 'Lemur',     emoji: '🐒' },
  M: { letter: 'M', word: 'Monkey',    emoji: '🐵' },
  N: { letter: 'N', word: 'Narwhal',   emoji: '🦄' },
  O: { letter: 'O', word: 'Octopus',   emoji: '🐙' },
  P: { letter: 'P', word: 'Penguin',   emoji: '🐧' },
  Q: { letter: 'Q', word: 'Quail',     emoji: '🐦' },
  R: { letter: 'R', word: 'Rabbit',    emoji: '🐰' },
  S: { letter: 'S', word: 'Shark',     emoji: '🦈' },
  T: { letter: 'T', word: 'Tiger',     emoji: '🐯' },
  U: { letter: 'U', word: 'Unicorn',   emoji: '🦄' },
  V: { letter: 'V', word: 'Vulture',   emoji: '🦅' },
  W: { letter: 'W', word: 'Wolf',      emoji: '🐺' },
  X: { letter: 'X', word: 'X-ray Fish',emoji: '🐟' },
  Y: { letter: 'Y', word: 'Yak',       emoji: '🐃' },
  Z: { letter: 'Z', word: 'Zebra',     emoji: '🦓' },
};

export const letterMapFruits: Record<string, Omit<KeyData, 'color'>> = {
  A: { letter: 'A', word: 'Apple',      emoji: '🍎' },
  B: { letter: 'B', word: 'Banana',     emoji: '🍌' },
  C: { letter: 'C', word: 'Cherry',     emoji: '🍒' },
  D: { letter: 'D', word: 'Dragon Fruit',emoji: '🐉' },
  E: { letter: 'E', word: 'Elderberry', emoji: '🫐' },
  F: { letter: 'F', word: 'Fig',        emoji: '🍑' },
  G: { letter: 'G', word: 'Grapes',     emoji: '🍇' },
  H: { letter: 'H', word: 'Honeydew',   emoji: '🍈' },
  I: { letter: 'I', word: 'Ice Apple',  emoji: '🍦' },
  J: { letter: 'J', word: 'Jackfruit',  emoji: '🌿' },
  K: { letter: 'K', word: 'Kiwi',       emoji: '🥝' },
  L: { letter: 'L', word: 'Lemon',      emoji: '🍋' },
  M: { letter: 'M', word: 'Mango',      emoji: '🥭' },
  N: { letter: 'N', word: 'Nectarine',  emoji: '🍑' },
  O: { letter: 'O', word: 'Orange',     emoji: '🍊' },
  P: { letter: 'P', word: 'Peach',      emoji: '🍑' },
  Q: { letter: 'Q', word: 'Quince',     emoji: '🍐' },
  R: { letter: 'R', word: 'Raspberry',  emoji: '🍓' },
  S: { letter: 'S', word: 'Strawberry', emoji: '🍓' },
  T: { letter: 'T', word: 'Tangerine',  emoji: '🍊' },
  U: { letter: 'U', word: 'Ugli Fruit', emoji: '🍋' },
  V: { letter: 'V', word: 'Vanilla',    emoji: '🌸' },
  W: { letter: 'W', word: 'Watermelon', emoji: '🍉' },
  X: { letter: 'X', word: 'Ximenia',    emoji: '🫒' },
  Y: { letter: 'Y', word: 'Yuzu',       emoji: '🍋' },
  Z: { letter: 'Z', word: 'Zucchini',   emoji: '🥒' },
};

export const numberMap: Record<string, Omit<KeyData, 'color'>> = {
  '0': { letter: '0', word: 'Zero',  emoji: '🌑' },
  '1': { letter: '1', word: 'One',   emoji: '☝️' },
  '2': { letter: '2', word: 'Two',   emoji: '✌️' },
  '3': { letter: '3', word: 'Three', emoji: '🌟' },
  '4': { letter: '4', word: 'Four',  emoji: '🍀' },
  '5': { letter: '5', word: 'Five',  emoji: '🖐️' },
  '6': { letter: '6', word: 'Six',   emoji: '🎲' },
  '7': { letter: '7', word: 'Seven', emoji: '🌈' },
  '8': { letter: '8', word: 'Eight', emoji: '🎱' },
  '9': { letter: '9', word: 'Nine',  emoji: '🎯' },
};

// Keys to ignore entirely
export const IGNORED_KEYS = new Set([
  'Shift', 'Control', 'Alt', 'Meta', 'Tab', 'Escape', 'CapsLock',
  'Backspace', 'Delete', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft',
  'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Insert',
  'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
  'PrintScreen', 'ScrollLock', 'Pause', 'NumLock', 'ContextMenu',
]);

export const ENCOURAGEMENTS = [
  'Great job! 🎉',
  'Awesome! ⭐',
  'You\'re amazing! 🌟',
  'Well done! 👏',
  'Fantastic! 🎊',
  'Keep going! 🚀',
  'Wonderful! 🌈',
  'Super star! 💫',
  'Brilliant! 🎈',
  'You rock! 🎸',
];

export function getColor(index: number): string {
  return COLORS[index % COLORS.length];
}

let colorIndex = 0;
export function nextColor(): string {
  return COLORS[colorIndex++ % COLORS.length];
}

export function getLetterMap(mode: KeyMode): Record<string, Omit<KeyData, 'color'>> {
  switch (mode) {
    case 'animals': return letterMapAnimals;
    case 'fruits': return letterMapFruits;
    default: return letterMapDefault;
  }
}
