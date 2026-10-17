// Theme metadata: theme defaults, then the deck's themeConfig, then one slide's frontmatter (spec 6.8).

export interface SpLink {
  readonly label: string
  readonly value: string
}

export interface SpSpeaker {
  readonly name: string
  readonly role: string
  readonly portrait: string
}

export interface SpMeta {
  readonly speaker: SpSpeaker
  readonly event: string
  readonly location: string
  readonly date: string
  readonly website: string
  readonly handle: string
  readonly slidesUrl: string
  readonly links: readonly SpLink[]
  readonly sections: readonly string[] | null
  readonly frame: boolean
}

export type SpMetaInput = {
  readonly [K in keyof SpMeta]?: K extends 'speaker' ? Partial<SpSpeaker> : SpMeta[K]
}

const COVERS = 'https://cdn.jsdelivr.net/gh/slidevjs/slidev-covers@main/static'

export const DEFAULT_META: SpMeta = Object.freeze({
  speaker: Object.freeze({ name: 'Alex Martin', role: 'Platform engineer', portrait: `${COVERS}/6terqWC_KCk.webp` }),
  event: '',
  location: '',
  date: '',
  website: 'alex.example',
  handle: '@alex.example',
  slidesUrl: '',
  links: Object.freeze([
    Object.freeze({ label: 'Web', value: 'alex.example' }),
    Object.freeze({ label: 'GitHub', value: 'alex-martin-example' }),
    Object.freeze({ label: 'Bluesky', value: '@alex.example' }),
    Object.freeze({ label: 'Mastodon', value: '@alex@social.example' }),
  ]),
  sections: null,
  frame: true,
})

const KEYS = Object.keys(DEFAULT_META) as readonly (keyof SpMeta)[]

function mergeLayer(base: SpMeta, layer: SpMetaInput | undefined): SpMeta {
  if (!layer) return base
  const defined = KEYS.filter(key => layer[key] !== undefined)
  return defined.reduce<SpMeta>((acc, key) => {
    if (key === 'speaker') return { ...acc, speaker: { ...acc.speaker, ...withoutUndefined(layer.speaker ?? {}) } }
    return { ...acc, [key]: layer[key] }
  }, base)
}

function withoutUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as Partial<T>
}

export function resolveMeta(...layers: readonly (SpMetaInput | undefined)[]): SpMeta {
  return layers.reduce<SpMeta>(mergeLayer, DEFAULT_META)
}
