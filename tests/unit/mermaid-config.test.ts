import { describe, expect, test } from 'vitest'
import { fitSvg, mergeMermaidConfig, mermaidConfig, withHotClass } from '../../utils/mermaid-config'

describe('mermaidConfig', () => {
  test('uses the base theme with light paper and ink', () => {
    const config = mermaidConfig('light')
    expect(config.theme).toBe('base')
    expect(config.themeVariables).toMatchObject({ primaryColor: '#f4f4f0', primaryTextColor: '#0b0b0b', primaryBorderColor: '#0b0b0b', lineColor: '#0b0b0b' })
    expect(config.themeVariables?.fontFamily).toMatch(/^JetBrains Mono/)
  })

  test('dark mode uses dark palette for primaryColor and lineColor', () => {
    expect(mermaidConfig('dark').themeVariables).toMatchObject({ primaryColor: '#121212', lineColor: '#eaeaea', noteBkgColor: '#1d1d1d' })
  })

  test('sequence activations use the accent', () => {
    expect(mermaidConfig('light').themeVariables?.activationBkgColor).toBe('#d01414')
    expect(mermaidConfig('dark').themeVariables?.activationBkgColor).toBe('#ff2a2a')
  })

  test('uses the classic look, without the neo shadows and rounded bends', () => {
    expect(mermaidConfig('light').look).toBe('classic')
  })

  test('flowchart edges are linear and sequence actors are not mirrored', () => {
    const config = mermaidConfig('light')
    expect(config.flowchart).toMatchObject({ curve: 'linear', padding: 14 })
    expect(config.sequence).toMatchObject({ mirrorActors: false, actorMargin: 60 })
  })

  test('themeCSS inverts hot nodes and colors hot edges with literal palette values', () => {
    const css = mermaidConfig('dark').themeCSS ?? ''
    expect(css).toContain('.node.hot')
    expect(css).toContain('fill: #eaeaea')
    expect(css).toContain('path.hot')
    expect(css).toContain('stroke: #ff2a2a')
    expect(css).toMatch(/rx:\s*0/)
    expect(css).toContain('JetBrains Mono')
  })
})

describe('fitSvg', () => {
  test('drops the max-width style and makes the svg fill its box', () => {
    const svg = '<svg id="m1" width="100%" xmlns="http://www.w3.org/2000/svg" style="max-width: 412px;" viewBox="0 0 412 200"><g/></svg>'
    const fitted = fitSvg(svg)
    expect(fitted).not.toContain('max-width')
    expect(fitted).toMatch(/^<svg[^>]* width="100%"/)
    expect(fitted).toMatch(/^<svg[^>]* height="100%"/)
    expect(fitted).toContain('viewBox="0 0 412 200"')
  })
})

describe('withHotClass', () => {
  test('adds a hot classDef with the accent to flowcharts that use hot', () => {
    const code = 'flowchart LR\n  A e1@--> B\n  class e1 hot'
    expect(withHotClass(code, 'light')).toBe(`${code}\n  classDef hot stroke:#d01414,stroke-width:2px`)
    expect(withHotClass(code, 'dark')).toContain('stroke:#ff2a2a')
  })

  test('leaves diagrams without hot, other diagram types and explicit classDefs alone', () => {
    expect(withHotClass('flowchart LR\n  A --> B', 'light')).toBe('flowchart LR\n  A --> B')
    expect(withHotClass('sequenceDiagram\n  A->>B: hot', 'light')).toBe('sequenceDiagram\n  A->>B: hot')
    const own = 'graph TD\n  A --> B\n  class A hot\n  classDef hot fill:#000'
    expect(withHotClass(own, 'light')).toBe(own)
  })
})

describe('fitSvg node styles', () => {
  test('removes classDef inline styles from node shapes but keeps them on edges', () => {
    const svg = '<svg viewBox="0 0 1 1"><g class="node default hot"><rect class="basic label-container" style="stroke:#d01414 !important" x="0"></rect></g><path class="flowchart-link" style="stroke:#d01414 !important"></path></svg>'
    const fitted = fitSvg(svg)
    expect(fitted).toContain('<rect class="basic label-container" x="0">')
    expect(fitted).toContain('<path class="flowchart-link" style="stroke:#d01414 !important">')
  })
})

describe('mergeMermaidConfig', () => {
  const base = mermaidConfig('light')

  test('user setup values win, with themeVariables merged key by key and themeCSS appended', () => {
    const merged = mergeMermaidConfig(base, { securityLevel: 'loose', themeVariables: { primaryColor: '#123456' }, themeCSS: '.x{}' }, {})
    expect(merged.securityLevel).toBe('loose')
    expect(merged.themeVariables).toMatchObject({ primaryColor: '#123456', lineColor: '#0b0b0b' })
    expect(merged.themeCSS).toContain('.node.hot')
    expect(merged.themeCSS?.endsWith('.x{}')).toBe(true)
  })

  test("ignores Slidev's placeholder theme and the per-block theme Slidev forces in dark mode", () => {
    expect(mergeMermaidConfig(base, { theme: 'default' }, { theme: 'dark' }).theme).toBe('base')
  })

  test('per-block options win over everything else', () => {
    expect(mergeMermaidConfig(base, { flowchart: { padding: 20 } }, { flowchart: { padding: 30 } }).flowchart).toMatchObject({ padding: 30, curve: 'linear' })
  })
})
