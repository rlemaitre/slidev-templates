// The Section slide's agenda row, built from the deck's section slides (spec 6.8, `sections`).

export interface SectionEntry {
  readonly number: string
  readonly title: string
  readonly current: boolean
}

export interface SlideSummary {
  readonly layout?: string
  readonly title?: string
  readonly number?: string | number
}

const pad = (value: string | number): string => String(value).padStart(2, '0')

// Slidev keeps Markdown in slide titles; the agenda shows plain text.
const plain = (title: string): string => title.replace(/[*_`~]/g, '').trim()

export function sectionsFromSlides(
  slides: readonly SlideSummary[],
  currentIndex: number,
  override: readonly string[] | null,
): readonly SectionEntry[] {
  const sections = slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide }) => slide.layout === 'section')
  const position = sections.filter(({ index }) => index <= currentIndex).length - 1

  if (override)
    return override.map((title, i) => ({ number: pad(i + 1), title, current: i === position }))

  return sections.map(({ slide, index }, i) => ({
    number: pad(slide.number ?? i + 1),
    title: plain(slide.title ?? ''),
    current: index === currentIndex,
  }))
}
