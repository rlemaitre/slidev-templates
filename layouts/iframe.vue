<script setup lang="ts">
defineProps<{ url: string }>()
</script>

<template>
  <div class="slidev-layout iframe">
    <iframe :src="url" title="Embedded page" />
  </div>
</template>

<style>
.slidev-layout.iframe iframe {
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
}
</style>
