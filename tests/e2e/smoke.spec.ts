import { expect, test } from '@playwright/test'

test('demo deck renders its first slide with the theme default layout', async ({ page }) => {
  await page.goto('/1')
  await expect(page.locator('.slidev-layout.default')).toBeVisible()
  await expect(page.locator('.slidev-layout h1')).toHaveText('Hello')
})
