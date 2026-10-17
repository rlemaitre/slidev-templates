<script setup lang="ts">
import SpFrame from '../components/SpFrame.vue'

defineProps<{ cite?: string }>()
</script>

<template>
  <div class="slidev-layout quote">
    <SpFrame>
      <div class="sp-quote-mark sp-display" aria-hidden="true">“</div>
      <slot />
      <div v-if="cite" class="sp-quote-cite sp-mono sp-muted">— {{ cite }}</div>
    </SpFrame>
  </div>
</template>

<style>
.slidev-layout.quote .sp-body {
  justify-content: center;
}

.sp-quote-mark {
  font-size: 140px;
  line-height: 0.6;
  color: var(--sp-accent);
}

.slidev-layout.quote h1 {
  font-size: 64px;
  line-height: 0.95;
}

.sp-quote-cite {
  margin-top: 24px;
}
</style>
