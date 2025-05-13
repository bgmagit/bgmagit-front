<script setup>
import { ref, computed } from 'vue'

const pdfUrl = ref('/sample.pdf');

const fullPdfUrl = computed(() => {
  const base = window.location.origin; // 반드시 window 명시
  const path = pdfUrl.value.startsWith('/') ? pdfUrl.value : '/' + pdfUrl.value;
  return `${base}${path}`;
});
</script>

<template>
  <div class="title-box">
    <i class="pi pi-book" style="color: dimgray; font-size: 24px"></i> 대회룰
  </div>
  <div class="iframe-box">
    <iframe
      :src="`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent('fullPdfUrl')}`"
      class="w-full h-[100vh] border-none"
    ></iframe>
  </div>
</template>

<style scoped>

</style>
