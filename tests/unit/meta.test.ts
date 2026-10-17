import { describe, expect, test } from 'vitest'
import { DEFAULT_META, resolveMeta, type SpMetaInput } from '../../utils/meta'

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }
  return value
}

describe('resolveMeta', () => {
  test('returns DEFAULT_META when no layer is given', () => {
    expect(resolveMeta()).toEqual(DEFAULT_META)
  })

  test('defaults hold the fake speaker, never personal data', () => {
    expect(DEFAULT_META.speaker.name).toBe('Alex Martin')
    expect(DEFAULT_META.website).toBe('alex.example')
    expect(DEFAULT_META.links.map(l => l.value)).toEqual(['alex.example', 'alex-martin-example', '@alex.example', '@alex@social.example'])
  })

  test('later layers win per key', () => {
    expect(resolveMeta(DEFAULT_META, { event: 'DevConf 2027' }, { event: 'Meetup' }).event).toBe('Meetup')
  })

  test('speaker merges per leaf key', () => {
    const meta = resolveMeta(DEFAULT_META, { speaker: { name: 'Sam Doe' } }, { speaker: { role: 'Keynote' } })
    expect(meta.speaker).toEqual({ name: 'Sam Doe', role: 'Keynote', portrait: DEFAULT_META.speaker.portrait })
  })

  test('lists replace instead of merging', () => {
    const meta = resolveMeta(DEFAULT_META, { links: [{ label: 'Web', value: 'sam.example' }] })
    expect(meta.links).toEqual([{ label: 'Web', value: 'sam.example' }])
  })

  test('missing optional fields stay empty strings', () => {
    const meta = resolveMeta(DEFAULT_META, {})
    expect(meta.event).toBe('')
    expect(meta.slidesUrl).toBe('')
  })

  test('does not mutate its inputs', () => {
    const deck = deepFreeze<SpMetaInput>({ speaker: { name: 'Sam Doe' }, links: [{ label: 'Web', value: 'sam.example' }] })
    const before = structuredClone(DEFAULT_META)
    expect(() => resolveMeta(DEFAULT_META, deck, deepFreeze({ event: 'X' }))).not.toThrow()
    expect(DEFAULT_META).toEqual(before)
  })

  test('ignores unknown keys and undefined values', () => {
    const slide = { layout: 'cover', event: undefined } as unknown as SpMetaInput
    const meta = resolveMeta(DEFAULT_META, { event: 'DevConf 2027' }, slide)
    expect(meta.event).toBe('DevConf 2027')
    expect(meta).not.toHaveProperty('layout')
  })
})
