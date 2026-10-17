<script setup lang="ts">
import SpMediaSplit from '../components/SpMediaSplit.vue'
import SpPhoto from '../components/SpPhoto.vue'
import { useMeta } from '../composables/useMeta'

defineProps<{ image?: string; caption?: string; imagePosition?: string; kicker?: string }>()
const meta = useMeta()
</script>

<template>
  <SpMediaSplit side="left" layout-class="image-left" :kicker="kicker">
    <template #media>
      <SpPhoto :src="image || meta.speaker.portrait" :caption="caption" :position="imagePosition" />
    </template>
    <slot />
  </SpMediaSplit>
</template>
