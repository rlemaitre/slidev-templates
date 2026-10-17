<script setup lang="ts">
import SpFrame from '../components/SpFrame.vue'

defineProps<{ kicker?: string }>()
</script>

<template>
  <div class="slidev-layout statement">
    <SpFrame>
      <div v-if="kicker" class="sp-kicker sp-mono">{{ kicker }}</div>
      <slot />
    </SpFrame>
  </div>
</template>

<style>
.slidev-layout.statement .sp-body {
  justify-content: flex-end;
}

.slidev-layout.statement h1 {
  font-size: var(--sp-size-statement);
  margin-top: 20px;
}
</style>
