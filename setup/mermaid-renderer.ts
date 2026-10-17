import { defineMermaidRendererSetup } from '@slidev/types'
import mermaid from 'mermaid/dist/mermaid.esm.mjs'
import { fitSvg, mermaidConfig, withHotClass } from '../utils/mermaid-config'

let counter = 0

// Slidev passes theme 'dark' in dark mode; the theme always renders with 'base' and its own palette.
export default defineMermaidRendererSetup(() => async (code, options) => {
  const mode = options.theme === 'dark' || document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', ...mermaidConfig(mode) })
  const container = document.getElementById('mermaid-rendering-container') ?? undefined
  const { svg } = await mermaid.render(`sp-mermaid-${counter++}`, withHotClass(code, mode), container)
  return fitSvg(svg)
})
