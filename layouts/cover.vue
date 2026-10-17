<script setup lang="ts">
import { computed } from 'vue'
import SpPhoto from '../components/SpPhoto.vue'
import { useMeta } from '../composables/useMeta'

const props = withDefaults(defineProps<{ subtitle?: string; layoutName?: string }>(), {
  subtitle: '',
  layoutName: 'cover',
})
const meta = useMeta()
const eventLine = computed(() => [meta.value.event, meta.value.location].filter(Boolean).join(' · '))
const metaItems = computed(() => [eventLine.value, meta.value.date, meta.value.website].filter(Boolean))
</script>

<template>
  <div class="slidev-layout sp-title" :class="props.layoutName">
    <div class="sp-title-mast"><slot /></div>
    <div class="sp-title-grid sp-grid">
      <SpPhoto class="sp-title-photo" :src="meta.speaker.portrait" caption="Fig. 01 / Speaker" />
      <p class="sp-title-sub">{{ props.subtitle }}</p>
      <p class="sp-title-speaker">
        <span class="sp-mono sp-muted">Speaker</span>
        <b>{{ meta.speaker.name }}</b>
        <span>{{ meta.speaker.role }}</span>
      </p>
      <p class="sp-title-meta sp-mono">
        <span v-for="item in metaItems" :key="item">{{ item }}</span>
      </p>
    </div>
  </div>
</template>

<style>
.sp-title {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.sp-title-mast {
  padding: 28px 28px 0;
  align-self: end;
}

.sp-title-mast h1 {
  font-size: 82px;
}

.sp-title-grid {
  grid-template-columns: 22% 1fr 1fr 24%;
  grid-template-rows: minmax(0, 1fr) auto;
  margin-top: 24px;
  border-top: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-title-grid > p {
  margin: 0;
  padding: 16px 20px;
}

.sp-title-photo {
  grid-row: span 2;
}

.sp-title-sub {
  grid-column: span 2;
  font-size: 24px;
  line-height: 1.35;
}

.sp-title-speaker {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 20px;
  line-height: 1.3;
}

.sp-title-speaker b {
  font-family: var(--sp-font-display);
  font-weight: 900;
  font-size: 24px;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.sp-title-meta {
  grid-column: span 3;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.sp-title-meta > :last-child {
  color: var(--sp-accent);
}
</style>
