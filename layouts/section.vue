<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useMeta } from '../composables/useMeta'
import { sectionsFromSlides } from '../utils/sections'

const meta = useMeta()
const { $page } = useSlideContext()
const { slides } = useNav()

const sections = computed(() =>
  sectionsFromSlides(
    slides.value.map(route => ({
      layout: route.meta.slide.frontmatter.layout,
      title: route.meta.slide.title,
      number: route.meta.slide.frontmatter.number,
    })),
    $page.value - 1,
    meta.value.sections,
  ),
)
const current = computed(() => sections.value.find(s => s.current))
</script>

<template>
  <div class="slidev-layout section">
    <div class="sp-section-top">
      <span class="sp-section-number sp-display">{{ current?.number }}</span>
      <div class="sp-section-name"><slot /></div>
    </div>
    <div class="sp-agenda sp-grid" :style="{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }">
      <div v-for="s in sections" :key="s.number + s.title" :class="{ 'is-current': s.current }">
        <span class="sp-mono">{{ s.number }}{{ s.current ? ' · Now' : '' }}</span>
        <span>{{ s.title }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.section {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
}

.sp-section-top {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
  gap: 28px;
  padding: 28px;
}

.sp-section-number {
  font-size: 230px;
  line-height: 0.78;
  color: var(--sp-accent);
}

.sp-section-name h1 {
  font-size: 72px;
  padding-bottom: 8px;
}

.sp-agenda {
  border-top: var(--sp-rule-thick) solid var(--sp-ink);
}

.sp-agenda > * {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 20px;
  font-size: 18px;
  line-height: 1.25;
}

.sp-agenda .sp-mono {
  color: var(--sp-muted);
}

.sp-agenda > .is-current {
  background: var(--sp-ink);
  color: var(--sp-bg);
}

.sp-agenda > .is-current .sp-mono {
  color: var(--sp-accent);
}
</style>
