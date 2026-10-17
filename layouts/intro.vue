<script setup lang="ts">
import Cover from './cover.vue'

defineProps<{ subtitle?: string }>()
</script>

<template>
  <Cover :subtitle="subtitle" layout-name="intro"><slot /></Cover>
</template>
