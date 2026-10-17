export interface SpStep {
  readonly when?: string
  readonly title: string
  readonly text?: string
  readonly hot?: boolean
}

export type SpStepState = 'done' | 'hot' | 'next'

export interface SpStepView {
  readonly when: string
  readonly title: string
  readonly text: string
  readonly state: SpStepState
}

// Steps before the first hot step are done, the hot step is "you are here", the rest come next.
export function timelineSteps(steps: readonly SpStep[] | undefined): readonly SpStepView[] {
  const list = steps ?? []
  const hotIndex = list.findIndex(step => step.hot === true)
  const stateAt = (i: number): SpStepState => {
    if (hotIndex < 0 || i < hotIndex) return 'done'
    return i === hotIndex ? 'hot' : 'next'
  }
  return list.map((step, i) => ({ when: step.when ?? '', title: step.title, text: step.text ?? '', state: stateAt(i) }))
}
