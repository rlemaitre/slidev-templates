<script setup lang="ts">
import SpMediaSplit from '../components/SpMediaSplit.vue'

defineProps<{ url: string; kicker?: string }>()
</script>

<template>
  <SpMediaSplit side="left" layout-class="iframe-left" :kicker="kicker">
    <template #media>
      <iframe :src="url" title="Embedded page" />
    </template>
    <slot />
  </SpMediaSplit>
</template>
