<script setup lang="ts">
import SpFrame from '../components/SpFrame.vue'

defineProps<{ kicker?: string; caption?: string }>()
</script>

<template>
  <div class="slidev-layout fact">
    <SpFrame>
      <div v-if="kicker" class="sp-kicker sp-mono">{{ kicker }}</div>
      <slot />
      <div v-if="caption" class="sp-fact-caption sp-mono sp-muted">{{ caption }}</div>
    </SpFrame>
  </div>
</template>

<style>
.slidev-layout.fact .sp-body {
  justify-content: center;
}

.slidev-layout.fact h1 {
  font-size: calc(var(--sp-size-statement) * 1.8);
  margin: 16px 0;
}
</style>
