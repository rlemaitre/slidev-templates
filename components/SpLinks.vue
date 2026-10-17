<script setup lang="ts">
import type { SpLink } from '../utils/meta'

const props = defineProps<{ links: readonly SpLink[]; columns?: number }>()
</script>

<template>
  <div v-if="links.length" class="sp-links sp-grid" :style="{ gridTemplateColumns: `repeat(${props.columns ?? links.length}, minmax(0, 1fr))` }">
    <span v-for="link in links" :key="link.label">
      <span class="sp-mono sp-muted">{{ link.label }}</span>
      {{ link.value }}
    </span>
  </div>
</template>

<style>
.sp-links {
  border-top: var(--sp-rule) solid var(--sp-ink);
}

.sp-links > * {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  font-family: var(--sp-font-mono);
  font-size: 16px;
  overflow-wrap: anywhere;
}
</style>
