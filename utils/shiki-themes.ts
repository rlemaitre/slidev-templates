import type { ThemeRegistrationRaw } from 'shiki'
import { CODE_HUES, PALETTES, type Mode } from './tokens'

// Restrained 3-hue highlighting, ported from rlemaitre.com (spec 6.1). Keyword weight 500 comes from code.css.
const KEYWORD_SCOPES = ['keyword', 'keyword.control', 'keyword.operator.new', 'storage', 'storage.type', 'storage.modifier']
const TYPE_SCOPES = ['entity.name.type', 'entity.name.class', 'entity.other.inherited-class', 'support.type', 'support.class']
const STRING_SCOPES = ['string', 'constant.numeric', 'constant.language', 'constant.character', 'constant.other.symbol']

export function swissShikiTheme(mode: Mode): ThemeRegistrationRaw {
  const palette = PALETTES[mode]
  const hues = CODE_HUES[mode]
  const tokenColors = [
    { settings: { foreground: palette.ink } },
    { scope: KEYWORD_SCOPES, settings: { foreground: hues.keyword } },
    { scope: ['keyword.operator', 'punctuation'], settings: { foreground: palette.ink } },
    { scope: ['keyword.operator.new', 'keyword.operator.expression'], settings: { foreground: hues.keyword } },
    { scope: TYPE_SCOPES, settings: { foreground: hues.type } },
    { scope: STRING_SCOPES, settings: { foreground: hues.string } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: hues.comment, fontStyle: 'italic' } },
  ]
  // Shiki reads `settings` when present, so both fields carry the same rules.
  return {
    name: `swiss-print-${mode}`,
    type: mode,
    colors: { 'editor.background': palette.codeBg, 'editor.foreground': palette.ink },
    settings: tokenColors,
    tokenColors,
  }
}
