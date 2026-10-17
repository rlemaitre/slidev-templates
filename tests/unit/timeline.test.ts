import { describe, expect, test } from 'vitest'
import { timelineSteps } from '../../utils/timeline'

const steps = [{ title: 'Shadow' }, { title: 'Canary' }, { title: 'Ramp up', hot: true }, { title: 'Cut over' }]

describe('timelineSteps', () => {
  test('marks steps before the hot one done and after it next', () => {
    expect(timelineSteps(steps).map(s => s.state)).toEqual(['done', 'done', 'hot', 'next'])
  })

  test('marks every step done when none is hot', () => {
    expect(timelineSteps([{ title: 'A' }, { title: 'B' }]).map(s => s.state)).toEqual(['done', 'done'])
  })

  test('uses the first hot step when several are hot', () => {
    const states = timelineSteps([{ title: 'A', hot: true }, { title: 'B', hot: true }]).map(s => s.state)
    expect(states).toEqual(['hot', 'next'])
  })

  test('fills missing when and text with empty strings', () => {
    expect(timelineSteps([{ title: 'A' }])[0]).toEqual({ when: '', title: 'A', text: '', state: 'done' })
  })

  test('returns no steps for missing data', () => {
    expect(timelineSteps(undefined)).toEqual([])
  })
})
