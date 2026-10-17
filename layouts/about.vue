<script setup lang="ts">
import { computed, useSlots } from 'vue'
import SpFrame from '../components/SpFrame.vue'
import SpLinks from '../components/SpLinks.vue'
import SpNodes from '../components/SpNodes'
import SpPhoto from '../components/SpPhoto.vue'
import { useMeta } from '../composables/useMeta'
import { splitHeading } from '../utils/split-slot'

withDefaults(defineProps<{ kicker?: string; caption?: string; imagePosition?: string }>(), {
  kicker: '— About',
  caption: 'Fig. 00 / Speaker',
  imagePosition: undefined,
})
const meta = useMeta()
const slots = useSlots()
// A heading in the slide replaces the metadata name, so a word can be marked red.
const parts = computed(() => splitHeading(slots.default?.() ?? []))
</script>

<template>
  <div class="slidev-layout about">
    <SpFrame>
      <div class="sp-about sp-grid">
        <SpPhoto class="sp-about-photo" :src="meta.speaker.portrait" :caption="caption" :position="imagePosition" />
        <div class="sp-about-text">
          <span class="sp-kicker sp-mono sp-muted">{{ kicker }}</span>
          <SpNodes v-if="parts.head.length" :nodes="parts.head" />
          <h1 v-else>{{ meta.speaker.name }}</h1>
          <span class="sp-about-role">{{ meta.speaker.role }}</span>
          <div class="sp-about-bio"><SpNodes :nodes="parts.body" /></div>
        </div>
        <SpLinks :links="meta.links" :columns="Math.min(2, meta.links.length)" />
      </div>
    </SpFrame>
  </div>
</template>

<style>
.slidev-layout.about .sp-body {
  padding: 0;
}

.sp-about {
  grid-template-columns: 38% 1fr;
  grid-template-rows: minmax(0, 1fr) auto;
  height: 100%;
}

.sp-about-photo {
  grid-row: span 2;
}

.sp-about .sp-links {
  border-top: 0;
}

.sp-about-text {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px;
}

.sp-about-text h1 {
  font-size: 68px;
}

.sp-about-role {
  font-size: 24px;
}

.sp-about-bio p {
  margin: 0;
  font-size: 21px;
  line-height: 1.4;
}
</style>
