<script setup>
import { onMounted, ref } from 'vue'
import { useLoadingStore } from '@/stores/useAppStore.js'
const loadingStore = useLoadingStore();
const showModal = ref(false);
const columns = [
  { field: 'rank', header: '순위', width: "5%" },
  { field: 'name', header: '이름', width: "auto"  },
  { field: 'score', header: '승점', width: "15%"  },
  { field: 'rate', header: '승점%', width: "15%" },
  { field: 'nation', header: '국수', width: "15%" },
  { field: 'button', header: '보기', width: "7%" }
]

const rows = ref([
  { rank: 1, name: '나그rrrrrrrrrrrrrrrrr', score: 202.8, rate: '41.03%', nation: 17 },
  { rank: 2, name: '도미노킹', score: 198.2, rate: '39.50%', nation: 15 },
  { rank: 3, name: '룰마스터', score: 210.7, rate: '45.12%', nation: 19 },
  { rank: 4, name: '토끼와거북이', score: 192.3, rate: '38.41%', nation: 14 },
  { rank: 5, name: '코리아보드', score: 185.9, rate: '36.10%', nation: 13 },
  { rank: 6, name: '보드황제', score: 220.5, rate: '47.89%', nation: 21 },
  { rank: 7, name: '미플조아', score: 176.4, rate: '34.05%', nation: 12 },
  { rank: 8, name: '승부사민수', score: 199.9, rate: '40.00%', nation: 16 },
  { rank: 9, name: '카탄도사', score: 188.8, rate: '37.45%', nation: 14 },
  { rank: 10, name: '보드요정', score: 212.3, rate: '46.20%', nation: 18 },
  { rank: 11, name: '주사위의신', score: 201.0, rate: '42.98%', nation: 17 },
  { rank: 12, name: '게임박사', score: 193.7, rate: '39.88%', nation: 15 }
])

const selectedColumns = ref([...columns])

const openModal = (data) => {
  showModal.value = true;
}

onMounted(() => {
  loadingStore.setLoading(false); // 페이지 진입 시 로딩 시작
});

</script>

<template>
  <div class="title-box">
    <img src="../assets/top3.png" alt="타이틀 이미지"/>
  </div>
  <TableArea
    :columns="columns"
    :rows="rows"
    title="1"
    v-model:selectedColumns="selectedColumns"
    @openModal="openModal"
  />
  <Dialog v-model:visible="showModal" modal header="미정" style="width: 300px;">
    <div class="card flex flex-col justify-center items-center gap-2">
<!--      <IftaLabel>-->
<!--        <InputText id="password" v-model="password" variant="filled" class="login-input" />-->
<!--        <label for="password">password</label>-->
<!--      </IftaLabel>-->
    </div>
  </Dialog>
</template>

<style scoped>

</style>
