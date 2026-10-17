import { useSlideContext } from '@slidev/client'
import { computed, type ComputedRef } from 'vue'

const pad = (n: number): string => String(n).padStart(2, '0')

// "NN / TT" from the slide's own number, so PDF export numbers every page correctly.
export function usePageLabel(): ComputedRef<string> {
  const { $page, $nav } = useSlideContext()
  return computed(() => `${pad($page.value)} / ${pad($nav.value.total)}`)
}
