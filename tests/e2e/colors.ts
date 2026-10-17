import type { TestInfo } from '@playwright/test'

// Computed rgb() values of the palette in utils/tokens.ts, per Playwright project.
const RGB = {
  light: { bg: 'rgb(244, 244, 240)', ink: 'rgb(11, 11, 11)', accent: 'rgb(208, 20, 20)', codeBg: 'rgb(233, 232, 226)' },
  dark: { bg: 'rgb(18, 18, 18)', ink: 'rgb(234, 234, 234)', accent: 'rgb(255, 42, 42)', codeBg: 'rgb(29, 29, 29)' },
} as const

export function colors(info: TestInfo) {
  return RGB[info.project.name === 'dark' ? 'dark' : 'light']
}
