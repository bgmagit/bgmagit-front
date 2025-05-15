<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore, useFileState, useLoadingStore, useToastStore } from '@/stores/useAppStore.js'
import { FileUpload } from 'primevue'

const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

const loadingStore = useLoadingStore();
const fileStore = useFileState();
const toastState = useToastStore();
const pdfUrl = computed(() => fileStore.data);
const fileupload = ref();
const uploadUrl = ref(`${import.meta.env.VITE_API_URL}/bgm-agit/rule-file`);

const handleLoad = () => {
  loadingStore.setLoading(false);
};

const upload = () => {
  fileupload.value.upload();
};

const onUpload = async () => {
  const toast = {}
  toast.code = 200;
  toast.message = "업로드가 완료되었습니다."
  toastState.showToast(toast);
  await fileStore.getFile();
};

onMounted(async () => {
  await fileStore.getFile();

});

</script>

<template>
  <div>
    <div class="title-box">
      <img src="../assets/top.png" alt="타이틀 이미지"/>
    </div>
    <div class="table-button" v-if="currentUser?.role === 'admin'">
      <FileUpload ref="fileupload" mode="basic" name="ruleFile" :url="uploadUrl" accept="application/pdf" :maxFileSize="1000000" chooseLabel="파일 선택" class="purple-button" @upload="onUpload">
      </FileUpload>
      <Button icon="pi pi-upload" class="blue-button" label="저장" @click="upload" />
    </div>
    <div class="iframe-box">
      <iframe
        :src="`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`"
        class="w-full h-[100vh] border-none"
        @load="handleLoad"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>

</style>
