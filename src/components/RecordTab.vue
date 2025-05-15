<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore, useRecordStore } from '@/stores/useAppStore.js'

const recordStore = useRecordStore();
const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

const recordData = computed(() => {
  return (recordStore.data || []).map((item, index) => ({
    ...item,
    no: index + 1,
  }))
})
const columns = [
  { field: 'no', header: 'no', width: "5%" },
  { field: 'registDate', header: '일시', width: "auto"  },
  { field: 'wind', header: '국 길이', width: "15%"  },
  { field: 'first', header: '1위', width: "15%" },
  { field: 'second', header: '2위', width: "15%" },
  { field: 'third', header: '3위', width: "15%" },
  { field: 'fourth', header: '4위', width: "15%" },
]

if (currentUser.value?.role === 'admin') {
  columns.push({ field: 'button', header: '버튼', width: '7%' });
}

const selectedColumns = ref([...columns])

onMounted(async () => {
  await recordStore.getRecord();
});

</script>

<template>
  <div>
    <div class="title-box">
      <img src="@/assets/top2.png" alt="타이틀 이미지"/>
    </div>
    <TableArea
      :columns="columns"
      :rows="recordData"
      v-model:selectedColumns="selectedColumns"
    />
  </div>
</template>

<style scoped>

</style>
