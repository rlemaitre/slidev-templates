import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'
import { openSlide } from './slide'

const LAYOUTS = readdirSync(fileURLToPath(new URL('../../layouts', import.meta.url)))
  .filter(f => f.endsWith('.vue'))
  .map(f => f.replace(/\.vue$/, ''))

test('demo deck contains every layout the theme ships', async ({ page }) => {
  test.setTimeout(120_000)
  const framed = await openSlide(page, 2)
  const total = Number((await framed.locator('.sp-bar-page').textContent())!.split('/')[1].trim())
  const used = new Set<string>()
  for (let n = 1; n <= total; n++) {
    const layout = await openSlide(page, n)
    for (const cls of ((await layout.getAttribute('class')) ?? '').split(/\s+/)) used.add(cls)
  }
  expect(LAYOUTS.filter(name => !used.has(name))).toEqual([])
})
