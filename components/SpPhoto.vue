<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl } from '../utils/asset'

const props = withDefaults(defineProps<{ src: string; caption?: string; position?: string }>(), {
  caption: '',
  position: '50% 30%',
})
const url = computed(() => resolveAssetUrl(props.src, import.meta.env.BASE_URL))
</script>

<template>
  <figure class="sp-photo">
    <img :src="url" alt="" :style="{ objectPosition: position }">
    <figcaption v-if="caption" class="sp-photo-caption sp-mono">{{ caption }}</figcaption>
  </figure>
</template>

<style>
.sp-photo {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: var(--sp-ink);
  min-height: 0;
}

.sp-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.6) brightness(1.05);
}

html.dark .sp-photo img {
  filter: grayscale(1) contrast(1.6) brightness(0.75);
}

/* Dot halftone screen over the photo. */
.sp-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5'%3E%3Ccircle cx='2.5' cy='2.5' r='1.1' fill='%230b0b0b'/%3E%3C/svg%3E");
  background-size: 5px 5px;
  opacity: 0.3;
}

.sp-photo-caption {
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 1;
  max-width: calc(100% - 24px);
  padding: 3px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.04em;
  background: var(--sp-bg);
  color: var(--sp-ink);
}
</style>
