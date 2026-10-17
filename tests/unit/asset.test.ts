import { describe, expect, test } from 'vitest'
import { resolveAssetUrl } from '../../utils/asset'

describe('resolveAssetUrl', () => {
  test('prefixes root-relative paths with the base', () => {
    expect(resolveAssetUrl('/photos/x.jpg', '/talk/')).toBe('/talk/photos/x.jpg')
  })

  test('leaves absolute URLs alone', () => {
    const url = 'https://cdn.jsdelivr.net/gh/slidevjs/slidev-covers@main/static/3GmudSL84n4.webp'
    expect(resolveAssetUrl(url, '/talk/')).toBe(url)
  })
})
