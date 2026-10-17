import { describe, expect, test } from 'vitest'
import { swissShikiTheme } from '../../utils/shiki-themes'

function colorFor(mode: 'light' | 'dark', scope: string) {
  const rule = swissShikiTheme(mode).tokenColors!.find(r => ([] as string[]).concat(r.scope ?? []).includes(scope))
  return rule?.settings
}

describe('swissShikiTheme', () => {
  test('light theme maps keyword scopes to #e61919', () => {
    for (const scope of ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control'])
      expect(colorFor('light', scope)?.foreground, scope).toBe('#e61919')
  })

  test('dark theme maps type scopes to #7fb0e6', () => {
    for (const scope of ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'])
      expect(colorFor('dark', scope)?.foreground, scope).toBe('#7fb0e6')
  })

  test('strings and numbers use the string hue', () => {
    expect(colorFor('light', 'string')?.foreground).toBe('#8a5a00')
    expect(colorFor('dark', 'constant.numeric')?.foreground).toBe('#e0b060')
  })

  test('comments are italic in both modes', () => {
    expect(colorFor('light', 'comment')).toEqual({ foreground: '#7a7a73', fontStyle: 'italic' })
    expect(colorFor('dark', 'comment')).toEqual({ foreground: '#8a8a84', fontStyle: 'italic' })
  })

  test('background is the code background of the mode', () => {
    expect(swissShikiTheme('light').colors?.['editor.background']).toBe('#e9e8e2')
    expect(swissShikiTheme('dark').colors?.['editor.background']).toBe('#1d1d1d')
    expect(swissShikiTheme('dark').name).toBe('swiss-print-dark')
    expect(swissShikiTheme('light').type).toBe('light')
  })

  test('operators and punctuation stay ink', () => {
    expect(colorFor('light', 'keyword.operator')?.foreground).toBe('#0b0b0b')
    expect(colorFor('dark', 'keyword.operator')?.foreground).toBe('#eaeaea')
  })
})
