<script setup lang="ts">
import { computed } from 'vue'
import { useMeta } from '../composables/useMeta'
import { qrPath, qrTarget } from '../utils/qr'

const props = withDefaults(defineProps<{ kicker?: string }>(), { kicker: 'Questions?' })
const meta = useMeta()
const qr = computed(() => (meta.value.slidesUrl ? qrPath(qrTarget(meta.value.slidesUrl)) : null))
</script>

<template>
  <div class="slidev-layout end">
    <div class="sp-end-top">
      <div class="sp-end-title">
        <slot><h1>Thanks<em>.</em></h1></slot>
      </div>
      <span class="sp-mono sp-muted">{{ props.kicker }}</span>
    </div>
    <div v-if="qr" class="sp-end-slides sp-grid">
      <div>
        <span class="sp-mono sp-muted">Slides</span>
        <div class="sp-slides-url">{{ meta.slidesUrl }}</div>
      </div>
      <div class="sp-qr">
        <svg :viewBox="`-1 -1 ${qr.size + 2} ${qr.size + 2}`" shape-rendering="crispEdges" role="img" :aria-label="`QR code for ${meta.slidesUrl}`">
          <path :d="qr.d" fill="currentColor" />
        </svg>
      </div>
    </div>
    <div class="sp-links sp-grid" :style="{ gridTemplateColumns: `repeat(${meta.links.length}, minmax(0, 1fr))` }">
      <span v-for="link in meta.links" :key="link.label">
        <span class="sp-mono sp-muted">{{ link.label }}</span>
        {{ link.value }}
      </span>
    </div>
  </div>
</template>

<style>
.slidev-layout.end {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto auto;
}

.sp-end-top {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 28px;
  padding: 28px;
}

.sp-end-title h1 {
  font-size: 140px;
}

.sp-end-slides {
  grid-template-columns: 1fr auto;
  border-top: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-end-slides > * {
  padding: 14px 20px;
}

.sp-slides-url {
  font-family: var(--sp-font-display);
  font-weight: 900;
  font-size: 32px;
  letter-spacing: -0.03em;
  overflow-wrap: anywhere;
}

.sp-qr {
  display: flex;
  padding: 10px !important;
}

.sp-qr svg {
  width: 88px;
  height: 88px;
}

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
