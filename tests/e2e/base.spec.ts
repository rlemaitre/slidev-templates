import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { cover: 1, hello: 2, markdown: 3 } as const

test('slide surface uses paper and ink of the active scheme', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.hello)
  await expect(layout).toHaveClass(/\bdefault\b/)
  await expect(layout).toHaveCSS('background-color', colors(info).bg)
  await expect(layout).toHaveCSS('color', colors(info).ink)
  const h1 = layout.locator('h1')
  expect(await h1.evaluate(el => getComputedStyle(el).fontFamily)).toMatch(/^"?Archivo/)
  await expect(h1.locator('em')).toHaveCSS('color', colors(info).accent)
})

test('slides have no background texture', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.hello)
  const after = await layout.evaluate(el => getComputedStyle(el, '::after').backgroundImage)
  expect(after).toBe('none')
})

test('photo halftone uses no blend mode', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.cover)
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
