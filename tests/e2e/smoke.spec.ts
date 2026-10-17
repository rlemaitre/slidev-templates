import { expect, test } from '@playwright/test'
import { openSlide } from './slide'

test('demo deck renders its first slide with the theme default layout', async ({ page }) => {
  const layout = await openSlide(page, 1)
  await expect(layout).toHaveClass(/\bdefault\b/)
  await expect(layout.locator('h1')).toHaveText('Hello world')
})
