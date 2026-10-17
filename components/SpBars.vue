<script setup lang="ts">
import { computed } from 'vue'
import { barRows, type SpBar } from '../utils/bars'

const props = withDefaults(defineProps<{ data?: readonly SpBar[]; caption?: string }>(), {
  data: () => [],
  caption: '',
})
const rows = computed(() => barRows(props.data))
</script>

<template>
  <div v-if="rows.length" class="sp-bars">
    <div v-for="row in rows" :key="row.label" class="sp-bars-row" :class="{ hot: row.hot }">
      <span class="sp-bars-label sp-mono">{{ row.label }}</span>
      <span class="sp-bars-track"><span class="sp-bars-fill" :style="{ width: `${row.percent}%` }" /></span>
      <span class="sp-bars-value">{{ row.value }}</span>
    </div>
    <span v-if="caption" class="sp-bars-caption sp-mono sp-muted">{{ caption }}</span>
  </div>
</template>

<style>
.sp-bars {
  display: grid;
  grid-template-columns: 22% 1fr 9%;
  align-items: center;
  row-gap: 12px;
  column-gap: 16px;
  margin: auto 0;
}

.sp-bars-row {
  display: contents;
}

.sp-bars-label {
  text-align: right;
}

.sp-bars-track {
  position: relative;
  height: 34px;
  border-left: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-bars-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--sp-ink);
}

.sp-bars-value {
  font-family: var(--sp-font-mono);
  font-size: var(--sp-size-label);
}

.sp-bars-row.hot :is(.sp-bars-label, .sp-bars-value) {
  color: var(--sp-accent);
}

.sp-bars-row.hot .sp-bars-fill {
  background: var(--sp-accent);
}

.sp-bars-caption {
  grid-column: 2;
  font-size: 12px;
}
</style>
