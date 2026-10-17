// Capture README screenshots of the demo deck in light and dark: starts the dev server, writes docs/screenshots/.
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'

const PORT = 3031
const OUT = 'docs/screenshots'
const SLIDES = {
  cover: 1,
  section: 13,
  statement: 18,
  bullets: 21,
  code: 23,
  mermaid: 26,
  photo: 32,
  closing: 16,
}

async function waitForServer(url, timeoutMs = 120_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      if ((await fetch(url)).ok) return
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error(`dev server did not answer on ${url} within ${timeoutMs / 1000}s`)
}

async function capture(browser, scheme) {
  const context = await browser.newContext({
    viewport: { width: 980, height: 551 },
    deviceScaleFactor: 1.5,
    colorScheme: scheme,
  })
  const page = await context.newPage()
  for (const [name, n] of Object.entries(SLIDES)) {
    await page.goto(`http://localhost:${PORT}/${n}`, { waitUntil: 'networkidle' })
    const layout = page.locator(`.slidev-page-${n} .slidev-layout`).first()
    await layout.waitFor()
    if (name === 'mermaid') await layout.locator('svg .node').first().waitFor({ timeout: 15_000 })
    await layout.evaluate(el => Promise.all([...el.querySelectorAll('img')].map(img => img.decode().catch(() => {}))))
    await page.evaluate(() => document.fonts.ready)
    await layout.screenshot({ path: `${OUT}/${name}-${scheme}.jpg`, type: 'jpeg', quality: 82 })
    console.log(`${OUT}/${name}-${scheme}.jpg`)
  }
  await context.close()
}

await mkdir(OUT, { recursive: true })
const server = spawn('npx', ['slidev', 'example/slides.md', '--port', String(PORT), '--open', 'false'], {
  stdio: 'ignore',
  detached: true,
})
try {
  await waitForServer(`http://localhost:${PORT}`)
  const browser = await chromium.launch()
  try {
    await capture(browser, 'light')
    await capture(browser, 'dark')
  } finally {
    await browser.close()
  }
} finally {
  process.kill(-server.pid)
}
