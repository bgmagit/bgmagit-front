<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLoadingStore } from '@/stores/useAppStore.js'

const pdfUrl = ref('/rule.pdf');
const loadingStore = useLoadingStore();

const fullPdfUrl = computed(() => {
  const base = window.location.origin; // 반드시 window 명시
  const path = pdfUrl.value.startsWith('/') ? pdfUrl.value : '/' + pdfUrl.value;
  return `${base}${path}`;
});

const handleLoad = () => {
  loadingStore.setLoading(false);
};

onMounted(() => {
  loadingStore.setLoading(true); // 페이지 진입 시 로딩 시작
});
</script>

<template>
  <div class="title-box">
    <img src="../assets/top.png" alt="타이틀 이미지"/>
  </div>
  <div class="iframe-box">
    <iframe
      :src="`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fullPdfUrl)}`"
      class="w-full h-[100vh] border-none"
      @load="handleLoad"
    ></iframe>
  </div>
</template>

<style scoped>

</style>
