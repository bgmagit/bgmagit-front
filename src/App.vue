<script setup>
import Header from '@/layouts/Header.vue'
import Main from '@/layouts/Main.vue'
import { useLoadingStore, useToastStore } from '@/stores/useAppStore.js'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'

const loadingStore = useLoadingStore();
const toastStore = useToastStore();

//로딩 여부
const loading = computed(() => {
  return loadingStore.loading;
})

const toast = useToast();

//전역 알림
watch(() => toastStore.toastMessage, (val) => {
  if (val?.message) {
    toast.add({
      severity: val.code === 200 ? 'success' : 'error',
      summary: val.code === 200 ? '성공' : '오류',
      detail: val.message,
      life: 3000
    });
    toastStore.clearToast();
  }
});

</script>

<template>
  <div class="flex flex-col h-screen min-w-[320px]">
    <Alert/>
    <Header/>
    <Main/>
    <div class="loading-box">
      <Loading  v-if="loading"/>
    </div>
  </div>
</template>

<style scoped>

</style>
