import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'
import { CODE_HUES, PALETTES, type Mode } from '../../utils/tokens'

const css = readFileSync(resolve(__dirname, '../../styles/tokens.css'), 'utf8')

function block(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`)
  if (start < 0) throw new Error(`missing block ${selector}`)
  const body = css.slice(start, css.indexOf('}', start))
  return Object.fromEntries(
    [...body.matchAll(/(--sp-[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim().toLowerCase()]),
  )
}

const SELECTORS: Record<Mode, string> = { light: ':root', dark: 'html.dark' }
const PALETTE_VARS = { bg: '--sp-bg', ink: '--sp-ink', muted: '--sp-muted', accent: '--sp-accent', codeBg: '--sp-code-bg' } as const
const HUE_VARS = { keyword: '--sp-hl-keyword', type: '--sp-hl-type', string: '--sp-hl-string', comment: '--sp-hl-comment' } as const

describe('tokens', () => {
  test('every palette hex in tokens.ts matches styles/tokens.css for both modes', () => {
    for (const mode of ['light', 'dark'] as const) {
      const vars = block(SELECTORS[mode])
      for (const [key, name] of Object.entries(PALETTE_VARS))
        expect(vars[name], `${mode} ${name}`).toBe(PALETTES[mode][key as keyof typeof PALETTE_VARS].toLowerCase())
      for (const [key, name] of Object.entries(HUE_VARS))
        expect(vars[name], `${mode} ${name}`).toBe(CODE_HUES[mode][key as keyof typeof HUE_VARS].toLowerCase())
    }
  })

  test('palettes hold the spec values', () => {
    expect(PALETTES.light).toEqual({ bg: '#f4f4f0', ink: '#0b0b0b', muted: '#5a5a55', accent: '#d01414', codeBg: '#e9e8e2' })
    expect(PALETTES.dark).toEqual({ bg: '#121212', ink: '#eaeaea', muted: '#9a9a94', accent: '#ff2a2a', codeBg: '#1d1d1d' })
    expect(CODE_HUES.light).toEqual({ keyword: '#e61919', type: '#1f5fa8', string: '#8a5a00', comment: '#7a7a73' })
    expect(CODE_HUES.dark).toEqual({ keyword: '#ff2a2a', type: '#7fb0e6', string: '#e0b060', comment: '#8a8a84' })
  })
})
