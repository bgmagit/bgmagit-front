<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore, useFileState, useLoadingStore, useToastStore } from '@/stores/useAppStore.js'
import { FileUpload } from 'primevue'

const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

const loadingStore = useLoadingStore();
const fileStore = useFileState();
const toastState = useToastStore();
const pdfUrl = computed(() => fileStore.data);
const fileupload = ref();
const uploadUrl = ref(`/bgm-agit/rule-file`);
const toast = {};

const handleLoad = () => {
  loadingStore.setLoading(false);
};

const upload = () => {
  if(fileupload.value.files.length > 0){
    console.log(fileupload.value)
    fileupload.value.upload();
  }else{
    toast.code = 400;
    toast.message = "파일을 선택해주세요."
    toastState.showToast(toast);
  }

};

const onUpload = async () => {
  toast.code = 200;
  toast.message = "업로드가 완료되었습니다."
  toastState.showToast(toast);
  await fileStore.getFile();
  console.log("PDF URL after upload:", pdfUrl.value);
};

onMounted(async () => {
  await fileStore.getFile();
});

onUnmounted( () =>{
  loadingStore.setLoading(false);
});

</script>

<template>
  <div>
    <div class="title-box">
      <img src="../assets/top.png" alt="타이틀 이미지"/>
    </div>
    <div class="table-button" v-if="currentUser?.role === 'admin'">
      <FileUpload ref="fileupload" mode="basic" name="ruleFile" :url="uploadUrl" accept="application/pdf" :maxFileSize="1000000" chooseLabel="파일 선택" class="green-button" @upload="onUpload">
      </FileUpload>
      <Button icon="pi pi-upload" class="blue-button" label="저장" @click="upload" />
    </div>
    <div>
      <iframe
        :key="pdfUrl"
        :src="`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`"
        class="w-full h-[100vh] border-none"
        @load="handleLoad"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>

</style>
