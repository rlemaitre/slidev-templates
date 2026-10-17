import setupMermaid from '@slidev/client/setup/mermaid.ts'
import { defineMermaidRendererSetup } from '@slidev/types'
import mermaid from 'mermaid/dist/mermaid.esm.mjs'
import { fitSvg, mergeMermaidConfig, mermaidConfig, withHotClass } from '../utils/mermaid-config'

let counter = 0

// The theme renders Mermaid itself: Slidev draws diagrams in a shadow root that page CSS cannot reach, and forces
// theme 'dark' in dark mode. A deck's own setup/mermaid.ts and per-block options still apply on top.
export default defineMermaidRendererSetup(() => async (code, options) => {
  const mode = options.theme === 'dark' || document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  const config = mergeMermaidConfig(mermaidConfig(mode), (await setupMermaid()) ?? {}, options)
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', ...config })
  const container = document.getElementById('mermaid-rendering-container') ?? undefined
  const { svg } = await mermaid.render(`sp-mermaid-${counter++}`, withHotClass(code, mode), container)
  return fitSvg(svg)
})
