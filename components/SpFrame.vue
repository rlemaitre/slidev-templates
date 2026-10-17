<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useMeta } from '../composables/useMeta'

const meta = useMeta()
const { $page, $nav } = useSlideContext()
const pad = (n: number): string => String(n).padStart(2, '0')
const pageLabel = computed(() => `${pad($page.value)} / ${pad($nav.value.total)}`)
</script>

<template>
  <div class="sp-frame" :class="{ 'sp-frame-off': !meta.frame }">
    <header v-if="meta.frame" class="sp-bar sp-mono">
      <span class="sp-bar-speaker">{{ meta.speaker.name }}</span>
      <span class="sp-bar-event">{{ meta.event }}</span>
      <span class="sp-bar-page">{{ pageLabel }}</span>
    </header>
    <main class="sp-body">
      <slot />
    </main>
    <footer v-if="meta.frame" class="sp-foot sp-mono">
      <span>{{ meta.website }}</span>
      <span>{{ meta.handle }}</span>
    </footer>
  </div>
</template>
