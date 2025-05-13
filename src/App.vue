<script setup>
import Header from '@/layouts/Header.vue'
import Main from '@/layouts/Main.vue'
import { useLoadingStore } from '@/stores/useAppStore.js'
import { computed } from 'vue'

const loadingStore = useLoadingStore();

//로딩 여부
const loading = computed(() => {
  return loadingStore.loading;
})

</script>

<template>
  <div class="flex flex-col h-screen min-w-[320px]">
    <Header/>
    <Main/>
    <div class="loading-box">
      <Loading  v-if="loading"/>
    </div>
  </div>
</template>

<style scoped>

</style>
