import { Comment, Fragment, h } from 'vue'
import { describe, expect, test } from 'vitest'
import { splitHeading } from '../../utils/split-slot'

describe('splitHeading', () => {
  test('separates the first heading from the rest', () => {
    const nodes = [h('h1', 'Title'), h('ol', [h('li', 'a')]), h('p', 'note')]
    const { head, body } = splitHeading(nodes)
    expect(head.map(n => n.type)).toEqual(['h1'])
    expect(body.map(n => n.type)).toEqual(['ol', 'p'])
  })

  test('flattens fragments and drops comments', () => {
    const nodes = [h(Fragment, [h('h2', 'T'), h(Comment, 'x'), h('pre', 'code')])]
    const { head, body } = splitHeading(nodes)
    expect(head.map(n => n.type)).toEqual(['h2'])
    expect(body.map(n => n.type)).toEqual(['pre'])
  })

  test('returns everything as body when there is no heading', () => {
    const { head, body } = splitHeading([h('p', 'only')])
    expect(head).toEqual([])
    expect(body).toHaveLength(1)
  })
})
