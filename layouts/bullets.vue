<script setup lang="ts">
import { computed, useSlots } from 'vue'
import SpFrame from '../components/SpFrame.vue'
import SpNodes from '../components/SpNodes'
import { splitHeading } from '../utils/split-slot'

defineProps<{ kicker?: string }>()
const slots = useSlots()
const parts = computed(() => splitHeading(slots.default?.() ?? []))
</script>

<template>
  <div class="slidev-layout bullets">
    <SpFrame>
      <div class="sp-bullets">
        <div class="sp-bullets-head">
          <div v-if="kicker" class="sp-kicker sp-mono">{{ kicker }}</div>
          <SpNodes :nodes="parts.head" />
        </div>
        <div class="sp-bullets-list">
          <SpNodes :nodes="parts.body" />
        </div>
      </div>
    </SpFrame>
  </div>
</template>

<style>
.sp-bullets {
  display: grid;
  grid-template-columns: 34% 1fr;
  gap: 30px;
  height: 100%;
}

.sp-bullets-head h1 {
  margin-top: 16px;
  font-size: 36px;
}

.sp-bullets-list :is(ol, ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: sp-item;
  border-top: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-bullets-list li {
  counter-increment: sp-item;
  display: grid;
  grid-template-columns: 52px 1fr;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: var(--sp-rule) solid var(--sp-ink);
  font-size: var(--sp-size-body);
  line-height: 1.3;
}

.sp-bullets-list li::before {
  content: counter(sp-item, decimal-leading-zero);
  font-family: var(--sp-font-mono);
  font-size: var(--sp-size-label);
  letter-spacing: 0.09em;
  color: var(--sp-muted);
}

.sp-bullets-list li.hot,
.sp-bullets-list li.hot::before {
  color: var(--sp-accent);
}

.sp-bullets-list li.hot {
  font-weight: 700;
}
</style>
