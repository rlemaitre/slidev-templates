import { useSlideContext } from '@slidev/client'
import { computed, type ComputedRef } from 'vue'
import { DEFAULT_META, resolveMeta, type SpMeta, type SpMetaInput } from '../utils/meta'

// Metadata for the current slide: theme defaults < deck themeConfig < slide frontmatter.
export function useMeta(): ComputedRef<SpMeta> {
  const { $slidev, $frontmatter } = useSlideContext()
  return computed(() =>
    resolveMeta(DEFAULT_META, $slidev.themeConfigs as SpMetaInput, $frontmatter as SpMetaInput),
  )
}
