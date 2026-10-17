import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { statement: 18, fact: 19, quote: 20, bullets: 21, plainBullets: 22 } as const

const px = (value: string): number => Number.parseFloat(value)

test('statement puts a huge display line at the bottom with the kicker above', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.statement)
  await expect(layout).toHaveClass(/\bstatement\b/)
  const h1 = layout.locator('h1')
  expect(px(await h1.evaluate(el => getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(90)
  await expect(layout.locator('.sp-kicker')).toHaveText('— The point')
  const [h1Box, bodyBox] = [await h1.boundingBox(), await layout.locator('.sp-body').boundingBox()]
  expect(h1Box!.y + h1Box!.height).toBeGreaterThan(bodyBox!.y + bodyBox!.height * 0.6)
  await expect(layout.locator('.sp-bar')).toHaveCount(1)
})

test('fact shows a big value and a mono caption', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.fact)
  expect(px(await layout.locator('h1').evaluate(el => getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(90)
  await expect(layout.locator('.sp-fact-caption')).toHaveText('messages per second at peak, one consumer group')
})

test('quote shows a display quote and an attribution', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.quote)
  await expect(layout.locator('h1')).toContainText('opinions')
  await expect(layout.locator('.sp-quote-cite')).toHaveText('— Every on-call engineer, eventually')
})

test('bullets numbers items 01.. with rules and highlights the hot item', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.bullets)
  const items = layout.locator('.sp-bullets li')
  await expect(items).toHaveCount(4)
  const marker = await items.first().evaluate(el => getComputedStyle(el, '::before').content)
  expect(marker).toContain('decimal-leading-zero')
  const hot = await layout.locator('.sp-bullets li.hot').evaluate(el => getComputedStyle(el, '::before').color)
  expect(hot).toBe(colors(info).accent)
  await expect(items.first()).toHaveCSS('border-bottom-width', '1px')
  await expect(layout.locator('.sp-bullets-head h1')).toContainText('cover')
})

test('bullets body text is at least 24px', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.plainBullets)
  const items = layout.locator('.sp-bullets li')
  await expect(items).toHaveCount(3)
  expect(px(await items.first().evaluate(el => getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(24)
})
