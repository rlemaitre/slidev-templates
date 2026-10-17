<script setup lang="ts">
import { computed, useSlots } from 'vue'
import SpFrame from '../components/SpFrame.vue'
import SpNodes from '../components/SpNodes'
import { splitHeading } from '../utils/split-slot'

const props = defineProps<{ figure?: string | number }>()
const slots = useSlots()
const parts = computed(() => splitHeading(slots.default?.() ?? []))
const label = computed(() => (props.figure !== undefined ? `Fig. ${String(props.figure).padStart(2, '0')} / Code` : ''))
</script>

<template>
  <div class="slidev-layout code">
    <SpFrame>
      <div class="sp-code">
        <div class="sp-code-head">
          <div v-if="label" class="sp-kicker sp-mono">{{ label }}</div>
          <SpNodes :nodes="parts.head" />
        </div>
        <div class="sp-code-body">
          <SpNodes :nodes="parts.body" />
        </div>
      </div>
    </SpFrame>
  </div>
</template>

<style>
.sp-code {
  display: grid;
  grid-template-columns: 30% minmax(0, 1fr);
  gap: 28px;
  height: 100%;
}

.sp-code-head h1 {
  margin-top: 16px;
  font-size: 36px;
}
</style>
