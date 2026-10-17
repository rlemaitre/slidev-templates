<script setup lang="ts">
import SpFrame from '../components/SpFrame.vue'
</script>

<template>
  <div class="slidev-layout two-cols">
    <SpFrame>
      <div class="sp-cols">
        <div class="sp-col-left"><slot /></div>
        <div class="sp-col-right"><slot name="right" /></div>
      </div>
    </SpFrame>
  </div>
</template>
