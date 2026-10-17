// Single source of the theme's colors for TypeScript consumers (Shiki, Mermaid).
// styles/tokens.css must hold the same values; tests/unit/tokens.test.ts checks it.

export type Mode = 'light' | 'dark'

export interface Palette {
  readonly bg: string
  readonly ink: string
  readonly muted: string
  readonly accent: string
  readonly codeBg: string
}

export interface CodeHues {
  readonly keyword: string
  readonly type: string
  readonly string: string
  readonly comment: string
}

export const PALETTES: Readonly<Record<Mode, Palette>> = {
  light: { bg: '#f4f4f0', ink: '#0b0b0b', muted: '#5a5a55', accent: '#d01414', codeBg: '#e9e8e2' },
  dark: { bg: '#121212', ink: '#eaeaea', muted: '#9a9a94', accent: '#ff2a2a', codeBg: '#1d1d1d' },
}

export const CODE_HUES: Readonly<Record<Mode, CodeHues>> = {
  light: { keyword: '#e61919', type: '#1f5fa8', string: '#8a5a00', comment: '#7a7a73' },
  dark: { keyword: '#ff2a2a', type: '#7fb0e6', string: '#e0b060', comment: '#8a8a84' },
}
