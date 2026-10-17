import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { cover: 9, coverNoDate: 10, intro: 11, section: 13, end: 16, endNoUrl: 17 } as const
const SECTION_COUNT = 4

test('cover shows the title with an accent word, the speaker and the meta row', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.cover)
  await expect(layout.locator('h1 em')).toHaveText('magic')
  await expect(layout.locator('.sp-title-speaker')).toContainText('Alex Martin')
  await expect(layout.locator('.sp-title-speaker')).toContainText('Platform engineer')
  await expect(layout.locator('.sp-title-sub')).toContainText('What message queues')
  await expect(layout.locator('.sp-title-meta')).toContainText('DevConf 2027')
  await expect(layout.locator('.sp-photo img')).toBeVisible()
})

test('cover meta row drops empty items', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.coverNoDate)
  const texts = await layout.locator('.sp-title-meta > *').allTextContents()
  expect(texts.length).toBeGreaterThan(0)
  expect(texts.every(t => t.trim() !== '')).toBe(true)
  expect(texts.join(' ')).not.toContain('2027-05-20')
})

test('intro uses the cover structure', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.intro)
  await expect(layout).toHaveClass(/\bintro\b/)
  await expect(layout.locator('.sp-title-speaker')).toBeVisible()
})

test('section shows the number and the agenda with the current cell inverted', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.section)
  await expect(layout.locator('.sp-section-number')).toHaveText('02')
  await expect(layout.locator('h1')).toContainText('pressure')
  await expect(layout.locator('.sp-agenda > *')).toHaveCount(SECTION_COUNT)
  const current = layout.locator('.sp-agenda > .is-current')
  await expect(current).toContainText('Back pressure')
  await expect(current).toHaveCSS('background-color', colors(info).ink)
})

test('end shows readable handles, the slides url and a QR code', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.end)
  await expect(layout.locator('h1')).toContainText('Thanks')
  await expect(layout.locator('.sp-links')).toContainText('@alex@social.example')
  const cells = await layout.locator('.sp-links > *').allTextContents()
  expect(cells.every(c => c.trim() !== 'GitHub')).toBe(true)
  await expect(layout.locator('.sp-slides-url')).toHaveText('alex.example/talks/queues')
  await expect(layout.locator('.sp-qr svg path')).toHaveCount(1)
})

test('end hides the slides row without slidesUrl', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.endNoUrl)
  await expect(layout.locator('h1')).toContainText('Thanks')
  await expect(layout.locator('.sp-slides-url')).toHaveCount(0)
  await expect(layout.locator('.sp-qr')).toHaveCount(0)
})
