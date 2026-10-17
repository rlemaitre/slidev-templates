import { expect, test } from '@playwright/test'
import { openSlide } from './slide'

const SLIDES = { framed: 1, noEvent: 3, noFrame: 4, full: 5, center: 6, twoCols: 7, twoColsHeader: 8 } as const

test('default layout shows the frame with metadata', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.framed)
  await expect(layout.locator('.sp-bar-speaker')).toHaveText('Alex Martin')
  await expect(layout.locator('.sp-bar-event')).toHaveText('DevConf 2027')
  await expect(layout.locator('.sp-bar-page')).toHaveText(/^\d{2} \/ \d{2}$/)
  await expect(layout.locator('.sp-bar-page')).toHaveText(/^01 \//)
  await expect(layout.locator('.sp-foot')).toContainText('alex.example')
  await expect(layout.locator('.sp-bar')).toHaveCSS('border-bottom-width', '2px')
})

test('empty event keeps three top bar cells', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.noEvent)
  await expect(layout.locator('.sp-bar > *')).toHaveCount(3)
  await expect(layout.locator('.sp-bar-event')).toHaveText('')
})

test('frame: false hides bar and footer', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.noFrame)
  await expect(layout.locator('h1')).toHaveText('No frame')
  await expect(layout.locator('.sp-bar')).toHaveCount(0)
  await expect(layout.locator('.sp-foot')).toHaveCount(0)
})

test('full layout has no frame', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.full)
  await expect(layout).toHaveClass(/\bfull\b/)
  await expect(layout.locator('.sp-bar')).toHaveCount(0)
})

test('center layout centers its content', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.center)
  await expect(layout).toHaveClass(/\bcenter\b/)
  await expect(layout.locator('.sp-body')).toHaveCSS('justify-content', 'center')
  await expect(layout.locator('.sp-bar')).toHaveCount(1)
})

test('two-cols renders the right slot after a 2px rule', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.twoCols)
  await expect(layout.locator('.sp-col-left h1')).toHaveText('Left column')
  await expect(layout.locator('.sp-col-right')).toHaveText('Right')
  await expect(layout.locator('.sp-col-right')).toHaveCSS('border-left-width', '2px')
})

test('two-cols-header renders header, left and right', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.twoColsHeader)
  await expect(layout.locator('.sp-cols-header h1')).toHaveText('Header')
  await expect(layout.locator('.sp-col-left')).toHaveText('Left side')
  await expect(layout.locator('.sp-col-right')).toHaveText('Right side')
  await expect(layout.locator('.sp-cols-header')).toHaveCSS('border-bottom-width', '2px')
})
