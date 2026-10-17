import { Comment, Fragment, type VNode } from 'vue'

const HEADINGS = new Set(['h1', 'h2', 'h3'])

function flatten(nodes: readonly VNode[]): readonly VNode[] {
  return nodes.flatMap(node => {
    if (node.type === Comment) return []
    if (node.type === Fragment && Array.isArray(node.children)) return flatten(node.children as VNode[])
    return [node]
  })
}

// Two-column layouts put the slide's first heading on the left and the rest on the right.
export function splitHeading(nodes: readonly VNode[]): { readonly head: readonly VNode[]; readonly body: readonly VNode[] } {
  const flat = flatten(nodes)
  const index = flat.findIndex(node => typeof node.type === 'string' && HEADINGS.has(node.type))
  if (index < 0) return { head: [], body: flat }
  return { head: [flat[index]], body: flat.filter((_, i) => i !== index) }
}
