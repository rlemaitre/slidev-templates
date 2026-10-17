<script setup lang="ts">
import SpFrame from '../components/SpFrame.vue'

interface SpStat {
  readonly value: string | number
  readonly unit?: string
  readonly label?: string
  readonly note?: string
  readonly hot?: boolean
}

withDefaults(defineProps<{ stats?: readonly SpStat[] }>(), { stats: () => [] })
</script>

<template>
  <div class="slidev-layout stats">
    <SpFrame>
      <slot />
      <div v-if="stats.length" class="sp-stats" :style="{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }">
        <div v-for="(stat, i) in stats" :key="i" class="sp-stat" :class="{ hot: stat.hot }">
          <span class="sp-stat-value">{{ stat.value }}<small v-if="stat.unit">{{ stat.unit }}</small></span>
          <span v-if="stat.label" class="sp-stat-label sp-mono">{{ stat.label }}</span>
          <p v-if="stat.note">{{ stat.note }}</p>
        </div>
      </div>
    </SpFrame>
  </div>
</template>

<style>
.slidev-layout.stats .sp-body {
  justify-content: space-between;
}

.slidev-layout.stats h1 {
  font-size: var(--sp-size-title);
}

.sp-stats {
  display: grid;
  border-top: var(--sp-rule-thick) solid var(--sp-ink);
  border-bottom: var(--sp-rule) solid var(--sp-ink);
}

.sp-stat + .sp-stat {
  border-left: var(--sp-rule) solid var(--sp-ink);
}

.sp-stat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 22px;
}

.sp-stat-value {
  font-family: var(--sp-font-display);
  font-weight: 900;
  font-size: 108px;
  line-height: 0.8;
  letter-spacing: -0.06em;
}

.sp-stat-value small {
  font-size: 0.4em;
  letter-spacing: -0.03em;
  margin-left: 0.1em;
}

.sp-stat-label {
  color: var(--sp-muted);
}

.sp-stat.hot :is(.sp-stat-value, .sp-stat-label) {
  color: var(--sp-accent);
}

.sp-stat p {
  margin: 0;
  font-size: 19px;
  line-height: 1.3;
}
</style>
