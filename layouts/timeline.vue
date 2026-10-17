<script setup lang="ts">
import { computed } from 'vue'
import SpFrame from '../components/SpFrame.vue'
import { type SpStep, timelineSteps } from '../utils/timeline'

const props = withDefaults(defineProps<{ steps?: readonly SpStep[]; nowLabel?: string }>(), {
  steps: () => [],
  nowLabel: 'Now',
})
const views = computed(() => timelineSteps(props.steps))
const whenLabel = (when: string, hot: boolean): string => (hot ? [when, props.nowLabel].filter(Boolean).join(' / ') : when)
</script>

<template>
  <div class="slidev-layout timeline">
    <SpFrame>
      <slot />
      <ol v-if="views.length" class="sp-timeline" :style="{ gridTemplateColumns: `repeat(${views.length}, minmax(0, 1fr))` }">
        <li v-for="(step, i) in views" :key="i" class="sp-step" :class="`is-${step.state}`">
          <span class="sp-step-when sp-mono">{{ whenLabel(step.when, step.state === 'hot') }}</span>
          <span class="sp-step-dot" />
          <b>{{ step.title }}</b>
          <p v-if="step.text">{{ step.text }}</p>
        </li>
      </ol>
    </SpFrame>
  </div>
</template>

<style>
.slidev-layout.timeline .sp-body {
  justify-content: space-between;
}

.slidev-layout.timeline h1 {
  font-size: var(--sp-size-title);
}

.sp-timeline {
  position: relative;
  display: grid;
  list-style: none;
  margin: 0 0 auto;
  padding: 0;
  top: 18%;
}

/* The rule runs through the middle of the dots. */
.sp-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 45px;
  border-top: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-step {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 16px;
}

.sp-step-when {
  color: var(--sp-muted);
  height: 18px;
}

.sp-step-dot {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  margin: 2px 0 4px;
  background: var(--sp-ink);
}

.sp-step.is-hot .sp-step-dot {
  width: 26px;
  height: 26px;
  margin: -1px 0 1px;
  background: var(--sp-accent);
}

.sp-step.is-next .sp-step-dot {
  background: var(--sp-bg);
  border: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-step b {
  font-family: var(--sp-font-display);
  font-weight: 900;
  font-size: 24px;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.sp-step p {
  margin: 0;
  font-size: 16px;
  line-height: 1.3;
}

.sp-step.is-hot :is(.sp-step-when, b) {
  color: var(--sp-accent);
}

.sp-step.is-next :is(b, p) {
  color: var(--sp-muted);
}
</style>
