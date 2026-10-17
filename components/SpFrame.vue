<script setup lang="ts">
import { useMeta } from '../composables/useMeta'
import { usePageLabel } from '../composables/usePageLabel'

const meta = useMeta()
const pageLabel = usePageLabel()
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
