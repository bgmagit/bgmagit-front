<script setup>
import { ref } from 'vue'

const pdfUrl = ref('/sample.pdf');
</script>

<template>
  <div class="title-box">
    <i class="pi pi-book" style="color: dimgray; font-size: 24px"></i> 대회룰
  </div>
  <div class="iframe-box">
    <iframe
      :src="pdfUrl"
      class="w-full h-[100vh] border-none"
    ></iframe>
  </div>
</template>

<style scoped>

</style>
