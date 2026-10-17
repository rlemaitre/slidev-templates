<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import SpPhoto from '../components/SpPhoto.vue'
import { useMeta } from '../composables/useMeta'

const props = withDefaults(
  defineProps<{
    image?: string
    caption?: string
    imagePosition?: string
    number?: string | number
    titleStyle?: 'panel' | 'overlay'
  }>(),
  { titleStyle: 'panel' },
)
const meta = useMeta()
// Slidev keeps `title` for the slide itself and does not pass it as a prop.
const { $frontmatter } = useSlideContext()
const title = computed(() => String($frontmatter.title ?? ''))

// `*word*` in the title is the accent word, as in Markdown headings.
const titleHtml = computed(() =>
  title.value
    .replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
    .replace(/\*([^*]+)\*/g, '<em>$1</em>'),
)
</script>

<template>
  <div class="slidev-layout image" :class="{ 'has-overlay': title && titleStyle === 'overlay' }">
    <SpPhoto class="sp-image-photo" :src="image || meta.speaker.portrait" :caption="caption" :position="imagePosition" />
    <div v-if="title" class="sp-image-title" :class="titleStyle === 'overlay' ? 'is-overlay' : 'is-panel'">
      <span v-if="number !== undefined" class="sp-image-number sp-display">{{ number }}</span>
      <h2 class="sp-display" v-html="titleHtml" />
    </div>
    <slot />
  </div>
</template>

<style>
.slidev-layout.image {
  position: relative;
  background: var(--sp-ink);
}

.sp-image-photo {
  position: absolute !important;
  inset: 0;
}

.slidev-layout.image .sp-photo-caption {
  left: auto;
  right: 16px;
  bottom: 16px;
}

.slidev-layout.image.has-overlay .sp-photo-caption {
  top: 16px;
  bottom: auto;
}

.sp-image-title {
  position: absolute;
  z-index: 2;
  display: grid;
  grid-template-columns: auto auto;
  align-items: end;
  gap: 24px;
}

.sp-image-title.is-panel {
  left: 0;
  bottom: 0;
  padding: 24px 28px;
  background: var(--sp-bg);
  border-top: var(--sp-rule-thick) solid var(--sp-ink);
  border-right: var(--sp-rule-thick) solid var(--sp-ink);
}

/* The one translucent element allowed by the design (spec 4): a see-through box sized to the title. */
.sp-image-title.is-overlay {
  left: 28px;
  bottom: 28px;
  padding: 20px 24px;
  isolation: isolate;
}

.sp-image-title.is-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #0b0b0b;
  opacity: 0.6;
}

.sp-image-number {
  font-size: 137px;
  line-height: 0.78;
  color: var(--sp-accent);
}

.sp-image-title h2 {
  max-width: 6em;
  font-size: 55px;
  color: var(--sp-ink);
}

.sp-image-title.is-overlay h2 {
  color: #f4f4f0;
}
</style>
