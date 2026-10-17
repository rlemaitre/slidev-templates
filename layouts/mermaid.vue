<script setup lang="ts">
import { computed, useSlots } from 'vue'
import SpFrame from '../components/SpFrame.vue'
import SpNodes from '../components/SpNodes'
import { splitHeading } from '../utils/split-slot'

const slots = useSlots()
const parts = computed(() => splitHeading(slots.default?.() ?? []))
</script>

<template>
  <div class="slidev-layout mermaid">
    <SpFrame>
      <div class="sp-diagram">
        <SpNodes :nodes="parts.head" />
        <div class="sp-diagram-area"><SpNodes :nodes="parts.body" /></div>
      </div>
    </SpFrame>
  </div>
</template>
