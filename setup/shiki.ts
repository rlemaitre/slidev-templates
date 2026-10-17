import { defineShikiSetup } from '@slidev/types'
import { swissShikiTheme } from '../utils/shiki-themes'

export default defineShikiSetup(() => ({
  themes: {
    light: swissShikiTheme('light'),
    dark: swissShikiTheme('dark'),
  },
}))
