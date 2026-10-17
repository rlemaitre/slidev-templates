<script setup lang="ts">
import SpMediaSplit from '../components/SpMediaSplit.vue'

defineProps<{ url: string; kicker?: string }>()
</script>

<template>
  <SpMediaSplit side="right" layout-class="iframe-right" :kicker="kicker">
    <template #media>
      <iframe :src="url" title="Embedded page" />
    </template>
    <slot />
  </SpMediaSplit>
</template>
