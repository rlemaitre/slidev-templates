import type { Locator, Page } from '@playwright/test'

// Slidev keeps neighbouring slides mounted, so every query is scoped to one slide's layout root.
export async function openSlide(page: Page, n: number): Promise<Locator> {
  await page.goto(`/${n}`)
  const layout = page.locator(`.slidev-page-${n} .slidev-layout`).first()
  await layout.waitFor()
  return layout
}
