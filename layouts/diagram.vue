<script setup lang="ts">
import SpFrame from '../components/SpFrame.vue'
</script>

<template>
  <div class="slidev-layout diagram">
    <SpFrame>
      <div class="sp-diagram"><slot /></div>
    </SpFrame>
  </div>
</template>
