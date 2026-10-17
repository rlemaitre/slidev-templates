import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { compare: 37, about: 38, stats: 39, bars: 40, timeline: 41 } as const
const px = (value: string): number => Number.parseFloat(value)

test('compare shows two labelled columns and inverts the hot header', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.compare)
  await expect(layout.locator('h1 em')).toHaveText('push')
  const cols = layout.locator('.sp-compare-col')
  await expect(cols).toHaveCount(2)
  await expect(cols.nth(0).locator('.sp-compare-head b')).toHaveText('Polling')
  await expect(cols.nth(1).locator('.sp-compare-head b')).toHaveText('Push')
  await expect(cols.nth(0).locator('li')).toHaveCount(3)
  await expect(cols.nth(1).locator('li')).toHaveCount(3)
  await expect(cols.nth(0).locator('.sp-compare-head')).not.toHaveCSS('background-color', colors(info).ink)
  await expect(cols.nth(1).locator('.sp-compare-head')).toHaveCSS('background-color', colors(info).ink)
  await expect(cols.nth(1).locator('.sp-compare-tag')).toHaveText('B / Pick')
  await expect(cols.nth(1).locator('.sp-compare-tag')).toHaveCSS('color', colors(info).accent)
})

test('about shows the portrait, name, role, bio and handles from metadata', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.about)
  await expect(layout.locator('.sp-bar')).toHaveCount(1)
  await expect(layout.locator('.sp-photo img')).toBeVisible()
  await expect(layout.locator('h1')).toHaveText('Alex Martin')
  await expect(layout.locator('.sp-about-role')).toHaveText('Platform engineer')
  await expect(layout.locator('.sp-about-bio p')).toContainText('job queues')
  await expect(layout.locator('.sp-links > *')).toHaveCount(4)
  await expect(layout.locator('.sp-links')).toContainText('alex.example')
})

test('stats shows each value with a smaller unit and a red hot value', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.stats)
  const cells = layout.locator('.sp-stat')
  await expect(cells).toHaveCount(3)
  await expect(cells.nth(0).locator('.sp-stat-value')).toHaveText('40k')
  await expect(cells.nth(0).locator('.sp-stat-label')).toHaveText('Jobs / second')
  await expect(cells.nth(1).locator('.sp-stat-value')).toHaveCSS('color', colors(info).accent)
  await expect(cells.nth(0).locator('.sp-stat-value')).toHaveCSS('color', colors(info).ink)
  const value = px(await cells.nth(0).locator('.sp-stat-value').evaluate(el => getComputedStyle(el).fontSize))
  const unit = px(await cells.nth(0).locator('.sp-stat-value small').evaluate(el => getComputedStyle(el).fontSize))
  expect(unit).toBeLessThan(value * 0.6)
})

test('SpBars scales bars to the largest value and paints the hot bar red', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.bars)
  const rows = layout.locator('.sp-bars-row')
  await expect(rows).toHaveCount(4)
  const width = (i: number) => rows.nth(i).locator('.sp-bars-fill').evaluate(el => (el as HTMLElement).offsetWidth)
  const track = await rows.nth(1).locator('.sp-bars-track').evaluate(el => el.clientWidth)
  expect(await width(1)).toBeCloseTo(track, 0)
  expect((await width(0)) / track).toBeCloseTo(120 / 410, 2)
  await expect(rows.nth(1).locator('.sp-bars-fill')).toHaveCSS('background-color', colors(info).accent)
  await expect(rows.nth(0).locator('.sp-bars-fill')).toHaveCSS('background-color', colors(info).ink)
  await expect(rows.nth(1).locator('.sp-bars-value')).toHaveText('410')
  await expect(layout.locator('.sp-bars-caption')).toHaveText('ms, p99')
})

test('timeline fills done steps, reds the hot step and hollows the next ones', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.timeline)
  const steps = layout.locator('.sp-step')
  await expect(steps).toHaveCount(5)
  await expect(steps.nth(0)).toHaveClass(/\bis-done\b/)
  await expect(steps.nth(2)).toHaveClass(/\bis-hot\b/)
  await expect(steps.nth(3)).toHaveClass(/\bis-next\b/)
  await expect(steps.nth(0).locator('.sp-step-dot')).toHaveCSS('background-color', colors(info).ink)
  await expect(steps.nth(2).locator('.sp-step-dot')).toHaveCSS('background-color', colors(info).accent)
  await expect(steps.nth(3).locator('.sp-step-dot')).toHaveCSS('background-color', colors(info).bg)
  await expect(steps.nth(2).locator('.sp-step-when')).toHaveText('Q3 / Now')
  await expect(steps.nth(2).locator('b')).toHaveText('Ramp up')
})
