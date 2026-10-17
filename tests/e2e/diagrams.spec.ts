import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { boxes: 25, flowchart: 26, sequence: 27 } as const

test('mermaid flowchart renders an svg with square corners', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.flowchart)
  const rects = layout.locator('svg .node rect')
  await expect(rects.first()).toBeVisible({ timeout: 15_000 })
  const radii = await rects.evaluateAll(els => els.map(el => getComputedStyle(el).rx))
  expect(radii.every(r => r === '0px' || r === 'auto')).toBe(true)
})

test('hot node is filled with ink', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.flowchart)
  const rect = layout.locator('svg .node.hot rect').first()
  await expect(rect).toBeVisible({ timeout: 15_000 })
  await expect(rect).toHaveCSS('fill', colors(info).ink)
})

test('important edge uses the accent', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.flowchart)
  await expect(layout.locator('svg .node').first()).toBeVisible({ timeout: 15_000 })
  const strokes = await layout.locator('svg path.flowchart-link').evaluateAll(els => els.map(el => getComputedStyle(el).stroke))
  expect(strokes).toContain(colors(info).accent)
})

test('mermaid text uses JetBrains Mono', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.flowchart)
  const label = layout.locator('svg .nodeLabel').first()
  await expect(label).toBeVisible({ timeout: 15_000 })
  expect(await label.evaluate(el => getComputedStyle(el).fontFamily)).toMatch(/^"?JetBrains Mono/)
})

test('mermaid svg fills most of the free area', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.sequence)
  const svg = layout.locator('.sp-diagram-area svg').first()
  await expect(svg).toBeVisible({ timeout: 15_000 })
  const [s, area] = [await svg.boundingBox(), await layout.locator('.sp-diagram-area').boundingBox()]
  expect(s!.width >= area!.width * 0.6 || s!.height >= area!.height * 0.6).toBe(true)
})

test('diagram layout inverts the hot box', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.boxes)
  await expect(layout.locator('.box.hot')).toHaveCSS('background-color', colors(info).ink)
  await expect(layout.locator('.box').first()).toHaveCSS('border-top-width', '1px')
  await expect(layout.locator('.arrow').first()).toHaveCSS('color', colors(info).accent)
})
