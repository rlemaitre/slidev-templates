export interface SpBar {
  readonly label: string
  readonly value: number
  readonly hot?: boolean
}

export interface SpBarRow {
  readonly label: string
  readonly value: number
  readonly hot: boolean
  readonly percent: number
}

const isValid = (bar: SpBar): boolean => typeof bar.value === 'number' && Number.isFinite(bar.value) && bar.value >= 0

// Bars scale to the largest value; entries without a usable value are left out.
export function barRows(data: readonly SpBar[] | undefined): readonly SpBarRow[] {
  const bars = (data ?? []).filter(isValid)
  const max = Math.max(0, ...bars.map(bar => bar.value))
  return bars.map(bar => ({
    label: bar.label,
    value: bar.value,
    hot: bar.hot === true,
    percent: max === 0 ? 0 : (bar.value / max) * 100,
  }))
}
