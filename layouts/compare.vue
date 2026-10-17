<script setup lang="ts">
import { computed, useSlots } from 'vue'
import SpFrame from '../components/SpFrame.vue'
import SpNodes from '../components/SpNodes'
import { splitHeading } from '../utils/split-slot'

type Side = 'left' | 'right'
const props = withDefaults(defineProps<{ left?: string; right?: string; hot?: Side; pickLabel?: string }>(), {
  left: '',
  right: '',
  hot: undefined,
  pickLabel: 'Pick',
})
const slots = useSlots()
const parts = computed(() => splitHeading(slots.default?.() ?? []))
const cols = computed(() =>
  [
    { side: 'left' as Side, label: props.left, tag: 'A', nodes: parts.value.body },
    { side: 'right' as Side, label: props.right, tag: 'B', nodes: slots.right?.() ?? [] },
  ].map(col => ({ ...col, hot: props.hot === col.side })),
)
</script>

<template>
  <div class="slidev-layout compare">
    <SpFrame>
      <SpNodes :nodes="parts.head" />
      <div class="sp-compare">
        <div v-for="col in cols" :key="col.side" class="sp-compare-col" :class="{ hot: col.hot }">
          <div class="sp-compare-head">
            <b>{{ col.label }}</b>
            <span class="sp-compare-tag sp-mono">{{ col.hot ? `${col.tag} / ${pickLabel}` : col.tag }}</span>
          </div>
          <div class="sp-compare-list"><SpNodes :nodes="col.nodes" /></div>
        </div>
      </div>
    </SpFrame>
  </div>
</template>

<style>
.slidev-layout.compare h1 {
  font-size: var(--sp-size-title);
  margin-bottom: 24px;
}

.sp-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sp-compare-col + .sp-compare-col {
  border-left: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-compare-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-compare-head b {
  font-family: var(--sp-font-display);
  font-weight: 900;
  font-size: 28px;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.sp-compare-tag {
  color: var(--sp-muted);
}

.sp-compare-col.hot .sp-compare-head {
  background: var(--sp-ink);
  color: var(--sp-bg);
}

.sp-compare-col.hot .sp-compare-tag {
  color: var(--sp-accent);
}

.sp-compare-list :is(ul, ol) {
  list-style: none;
  margin: 0;
  padding: 0 18px;
}

.sp-compare-list li {
  padding: 11px 0;
  border-bottom: var(--sp-rule) solid var(--sp-ink);
  font-size: 22px;
  line-height: 1.3;
}

.sp-compare-list li:last-child {
  border-bottom: 0;
}
</style>
