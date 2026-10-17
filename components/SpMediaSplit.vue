<script setup lang="ts">
import { usePageLabel } from '../composables/usePageLabel'

defineProps<{ side: 'left' | 'right'; kicker?: string; layoutClass?: string }>()
const pageLabel = usePageLabel()
</script>

<template>
  <div class="slidev-layout sp-media-split" :class="[layoutClass, `is-${side}`]">
    <div class="sp-media"><slot name="media" /></div>
    <div class="sp-media-text">
      <div class="sp-kicker sp-mono">{{ kicker }}</div>
      <div class="sp-media-body"><slot /></div>
      <div class="sp-mono sp-muted">{{ pageLabel }}</div>
    </div>
  </div>
</template>

<style>
.sp-media-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-rule-thick);
  background: var(--sp-ink);
}

.sp-media-split > * {
  background: var(--sp-bg);
  min-width: 0;
  min-height: 0;
}

.sp-media-split.is-right .sp-media {
  order: 2;
}

.sp-media,
.sp-media > * {
  position: relative;
  width: 100%;
  height: 100%;
}

.sp-media iframe {
  border: 0;
  background: #fff;
}

.sp-media-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
}

.sp-media-body h1 {
  font-size: 64px;
}
</style>
