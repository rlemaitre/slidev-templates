import { describe, expect, test } from 'vitest'
import { barRows } from '../../utils/bars'

describe('barRows', () => {
  test('scales every bar to the largest value', () => {
    const rows = barRows([{ label: 'Wait', value: 120 }, { label: 'Backoff', value: 480 }])
    expect(rows.map(r => r.percent)).toEqual([25, 100])
  })

  test('keeps the hot flag and defaults it to false', () => {
    const rows = barRows([{ label: 'A', value: 1, hot: true }, { label: 'B', value: 2 }])
    expect(rows.map(r => r.hot)).toEqual([true, false])
  })

  test('drops entries without a finite, non-negative value', () => {
    const rows = barRows([
      { label: 'ok', value: 2 },
      { label: 'neg', value: -1 },
      { label: 'nan', value: Number.NaN },
      { label: 'text', value: '3' as unknown as number },
    ])
    expect(rows.map(r => r.label)).toEqual(['ok'])
  })

  test('gives zero-width bars when every value is zero', () => {
    expect(barRows([{ label: 'A', value: 0 }]).map(r => r.percent)).toEqual([0])
  })

  test('returns no rows for missing data', () => {
    expect(barRows(undefined)).toEqual([])
  })
})
