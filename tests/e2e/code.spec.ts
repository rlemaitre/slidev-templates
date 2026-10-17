import { expect, test } from '@playwright/test'
import { colors } from './colors'
import { openSlide } from './slide'

const SLIDES = { typescript: 23, scala: 24 } as const
const KEYWORD = { light: 'rgb(230, 25, 25)', dark: 'rgb(255, 42, 42)' } as const
const TYPE = { light: 'rgb(31, 95, 168)', dark: 'rgb(127, 176, 230)' } as const

const mode = (name: string) => (name === 'dark' ? 'dark' : 'light')

test('keywords use the keyword hue of the scheme', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.typescript)
  const keyword = layout.locator('pre span', { hasText: /^const$/ }).first()
  await expect(keyword).toHaveCSS('color', KEYWORD[mode(info.project.name)])
})

test('types use the type hue in Scala', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.scala)
  const type = layout.locator('pre span', { hasText: /^String$/ }).first()
  await expect(type).toHaveCSS('color', TYPE[mode(info.project.name)])
})

test('code block has a 1px ink border, zero radius and the code background', async ({ page }, info) => {
  const layout = await openSlide(page, SLIDES.typescript)
  const pre = layout.locator('pre').first()
  await expect(pre).toHaveCSS('border-top-width', '1px')
  await expect(pre).toHaveCSS('border-top-color', colors(info).ink)
  await expect(pre).toHaveCSS('border-radius', '0px')
  await expect(pre).toHaveCSS('background-color', colors(info).codeBg)
})

test('code layout shows the figure label and the title on the left', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.typescript)
  await expect(layout.locator('.sp-kicker')).toHaveText('Fig. 04 / Code')
  const [head, code] = [await layout.locator('h1').boundingBox(), await layout.locator('pre').first().boundingBox()]
  expect(head!.x).toBeLessThan(code!.x)
})

test('keywords are weight 500', async ({ page }) => {
  const layout = await openSlide(page, SLIDES.typescript)
  await expect(layout.locator('pre span', { hasText: /^const$/ }).first()).toHaveCSS('font-weight', '500')
})
