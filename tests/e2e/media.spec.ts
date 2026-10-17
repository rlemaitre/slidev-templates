import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { imageLeft: 28, imageRight: 29, imageBare: 30, imagePanel: 31, imageOverlay: 32, imageLocal: 33, iframeLeft: 34 } as const

test('image-left puts a halftone photo on the left and text on the right', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.imageLeft)
  const photo = layout.locator('.sp-photo')
  const [p, t] = [await photo.boundingBox(), await layout.locator('h1').boundingBox()]
  expect(p!.x).toBeLessThan(t!.x)
  await expect(photo.locator('img')).toHaveCSS('filter', /grayscale\(1\)/)
  await expect(layout.locator('.sp-photo-caption')).toHaveText('Fig. 02 / Santorini')
  await expect(layout.locator('.sp-kicker')).toHaveText('— Interlude')
})

test('image-right mirrors image-left', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.imageRight)
  const [p, t] = [await layout.locator('.sp-photo').boundingBox(), await layout.locator('h1').boundingBox()]
  expect(p!.x).toBeGreaterThan(t!.x)
})

test('image without title shows only photo and caption', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.imageBare)
  await expect(layout.locator('.sp-photo')).toBeVisible()
  await expect(layout.locator('.sp-image-title')).toHaveCount(0)
  await expect(layout.locator('.sp-photo-caption')).toHaveText('Fig. 05 / Monte Pelmo')
})

test('image panel title sits on an opaque paper block', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.imagePanel)
  const title = layout.locator('.sp-image-title')
  await expect(title).toHaveCSS('background-color', colors(info).bg)
  await expect(title).toHaveCSS('border-top-width', '2px')
  await expect(title.locator('.sp-image-number')).toHaveText('03')
  await expect(title.locator('em')).toHaveText('clouds')
})

test('image overlay box covers only the title', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.imageOverlay)
  const [box, slide] = [await layout.locator('.sp-image-title').boundingBox(), await layout.boundingBox()]
  expect(box!.width).toBeLessThan(slide!.width * 0.6)
  expect(box!.height).toBeLessThan(slide!.height * 0.4)
  await expect(layout.locator('.sp-image-title')).toHaveClass(/is-overlay/)
})

test('image paths resolve against the deck base', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.imageLocal)
  const img = layout.locator('.sp-photo img')
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0)
})

test('iframe-left renders the iframe on the left without halftone', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.iframeLeft)
  const frame = layout.locator('iframe')
  await expect(frame).toHaveAttribute('src', 'https://example.com')
  await expect(frame).not.toHaveCSS('filter', /grayscale/)
  const [f, t] = [await frame.boundingBox(), await layout.locator('h1').boundingBox()]
  expect(f!.x).toBeLessThan(t!.x)
})
