import { describe, expect, test } from 'vitest'
import { sectionsFromSlides } from '../../utils/sections'

const deck = [
  { layout: 'cover', title: 'Queues are not magic' },
  { layout: 'section', title: 'Why queues' },
  { layout: 'default', title: 'Detail' },
  { layout: 'section', title: 'Backpressure' },
  { layout: 'section', title: 'Retries', number: 7 },
]

describe('sectionsFromSlides', () => {
  test('keeps only section slides in order and numbers them', () => {
    expect(sectionsFromSlides(deck, 1, null).map(s => [s.number, s.title])).toEqual([
      ['01', 'Why queues'],
      ['02', 'Backpressure'],
      ['07', 'Retries'],
    ])
  })

  test('uses the number field when set', () => {
    expect(sectionsFromSlides(deck, 4, null)[2].number).toBe('07')
  })

  test('marks the current section', () => {
    expect(sectionsFromSlides(deck, 3, null).map(s => s.current)).toEqual([false, true, false])
  })

  test('returns eight entries for eight sections', () => {
    const eight = Array.from({ length: 8 }, (_, i) => ({ layout: 'section', title: `S${i}` }))
    expect(sectionsFromSlides(eight, 0, null)).toHaveLength(8)
  })

  test('override replaces titles but keeps current position', () => {
    const result = sectionsFromSlides(deck, 3, ['One', 'Two', 'Three', 'Four'])
    expect(result.map(s => s.title)).toEqual(['One', 'Two', 'Three', 'Four'])
    expect(result.map(s => s.current)).toEqual([false, true, false, false])
  })

  test('titles drop Markdown emphasis markers', () => {
    const result = sectionsFromSlides([{ layout: 'section', title: 'Back *pressure* and __`code`__' }], 0, null)
    expect(result[0].title).toBe('Back pressure and code')
  })
})
