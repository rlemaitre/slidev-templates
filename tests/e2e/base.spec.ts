import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { hello: 1, markdown: 2 } as const

test('slide surface uses paper and ink of the active scheme', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.hello)
  await expect(layout).toHaveClass(/\bdefault\b/)
  await expect(layout).toHaveCSS('background-color', colors(info).bg)
  await expect(layout).toHaveCSS('color', colors(info).ink)
  const h1 = layout.locator('h1')
  expect(await h1.evaluate(el => getComputedStyle(el).fontFamily)).toMatch(/^"?Archivo/)
  await expect(h1.locator('em')).toHaveCSS('color', colors(info).accent)
})

// Blend modes and SVG filters make Chrome rasterize whole PDF pages (text as pixels, ~100 MB decks), so the grain
// is a small pre-rendered tile with no blend mode, on screen and in exports alike.
test('grain overlay is a plain tile that does not block clicks', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.hello)
  const after = await layout.evaluate(el => {
    const s = getComputedStyle(el, '::after')
    return { pointer: s.pointerEvents, image: s.backgroundImage, blend: s.mixBlendMode }
  })
  expect(after.pointer).toBe('none')
  expect(after.image).toContain('grain')
  expect(after.image).not.toContain('feTurbulence')
  expect(after.blend).toBe('normal')
})

test('photo halftone uses no blend mode', async ({ page }) => {
  const layout = await openSlide(page, 9)
  const blend = await layout.locator('.sp-photo').first().evaluate(el => getComputedStyle(el, '::after').mixBlendMode)
  expect(blend).toBe('normal')
})

test('plain markdown is styled with zero radius', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.markdown)
  await expect(layout.locator('p code').first()).toHaveCSS('border-radius', '0px')
  await expect(layout.locator('p code').first()).toHaveCSS('background-color', colors(info).codeBg)
  await expect(layout.locator('blockquote')).toHaveCSS('border-radius', '0px')
  await expect(layout.locator('blockquote')).toHaveCSS('border-left-width', '2px')
  await expect(layout.locator('td').first()).toHaveCSS('border-bottom-width', '1px')
})
