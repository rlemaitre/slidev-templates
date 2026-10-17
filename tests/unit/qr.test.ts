import { describe, expect, test } from 'vitest'
import { qrPath, qrTarget } from '../../utils/qr'

describe('qr', () => {
  test('qrTarget adds https to a bare host path', () => {
    expect(qrTarget('alex.example/talks/queues')).toBe('https://alex.example/talks/queues')
  })

  test('qrTarget keeps an existing scheme', () => {
    expect(qrTarget('http://alex.example/x')).toBe('http://alex.example/x')
  })

  test('qrPath returns a square matrix size and a non-empty path', () => {
    const { size, d } = qrPath('https://alex.example/talks/queues')
    expect(size).toBeGreaterThanOrEqual(21)
    expect(d.startsWith('M')).toBe(true)
  })
})
