import type { MermaidConfig } from 'mermaid'
import { PALETTES, type Mode, type Palette } from './tokens'

// Slidev renders Mermaid inside a shadow root, so page CSS cannot reach the SVG: these rules travel inside it.
function themeCss(p: Palette): string {
  return `
    rect, polygon { rx: 0; ry: 0; }
    .nodeLabel, .edgeLabel, .label, text { font-family: 'JetBrains Mono', monospace !important; }
    .node.hot rect, .node.hot polygon, .node.hot path, .node.hot circle { fill: ${p.ink} !important; stroke: ${p.ink} !important; }
    .node.hot .nodeLabel, .node.hot span, .node.hot p, .node.hot text { color: ${p.bg} !important; fill: ${p.bg} !important; }
    path.hot, .flowchart-link.hot { stroke: ${p.accent} !important; stroke-width: 2px !important; }
  `
}

// Mermaid derives colors from these values, so they are literal hex, not CSS variables (spec 6.6, 7.4).
export function mermaidConfig(mode: Mode): MermaidConfig {
  const p = PALETTES[mode]
  return {
    theme: 'base',
    look: 'classic',
    themeVariables: {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '16px',
      background: p.bg,
      primaryColor: p.bg,
      primaryTextColor: p.ink,
      primaryBorderColor: p.ink,
      secondaryColor: p.codeBg,
      tertiaryColor: p.bg,
      lineColor: p.ink,
      textColor: p.ink,
      edgeLabelBackground: p.bg,
      clusterBkg: p.bg,
      clusterBorder: p.ink,
      actorBkg: p.bg,
      actorBorder: p.ink,
      actorTextColor: p.ink,
      actorLineColor: p.muted,
      signalColor: p.ink,
      signalTextColor: p.ink,
      labelBoxBkgColor: p.bg,
      labelBoxBorderColor: p.ink,
      labelTextColor: p.ink,
      loopTextColor: p.ink,
      noteBkgColor: p.codeBg,
      noteBorderColor: p.ink,
      noteTextColor: p.ink,
      activationBkgColor: p.accent,
      activationBorderColor: p.ink,
    },
    flowchart: { curve: 'linear', padding: 14 },
    sequence: { mirrorActors: false, actorMargin: 60 },
    themeCSS: themeCss(p),
  }
}

// Let the diagram fill the layout's free area (spec 7.6) instead of Mermaid's natural size, and drop the inline
// classDef styles Mermaid puts on node shapes: a hot node is inverted by themeCSS, only hot edges keep the accent.
export function fitSvg(svg: string): string {
  return svg
    .replace(/(<\w+ class="[^"]*label-container[^"]*") style="[^"]*"/g, '$1')
    .replace(/^<svg([^>]*)>/, (_, attrs: string) => {
    const cleaned = attrs
      .replace(/\s(width|height)="[^"]*"/g, '')
      .replace(/\sstyle="[^"]*"/, '')
      return `<svg${cleaned} width="100%" height="100%">`
    })
}

// Mermaid puts an edge's classDef styles inline but not its class name, so `class e1 hot` on an edge only works
// when a `hot` classDef exists. Add one with the accent of the mode unless the diagram defines its own.
export function withHotClass(code: string, mode: Mode): string {
  const isFlowchart = /^\s*(flowchart|graph)\b/.test(code)
  const usesHot = /^\s*class\s+[\w,]+\s+hot\s*$/m.test(code)
  const definesHot = /^\s*classDef\s+hot\b/m.test(code)
  if (!isFlowchart || !usesHot || definesHot) return code
  return `${code}\n  classDef hot stroke:${PALETTES[mode].accent},stroke-width:2px`
}
