<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRankStore } from '@/stores/useAppStore.js'
const rankStore = useRankStore()
const showModal = ref(false)

const rankData = computed(() => {
  return (rankStore.data || []).map((item, index) => ({
    ...item,
    rank: index + 1,
    recordPercent: (item.recordSumPoint / item.round).toFixed(1) + '%',
  }))
})

const rankDetailData = ref()
const modalHeader = ref()

const columns = [
  { field: 'rank', header: '순위', width: '5%' },
  { field: 'recordName', header: '이름', width: 'auto' },
  { field: 'recordSumPoint', header: '승점', width: '15%' },
  { field: 'recordPercent', header: '승점%', width: '15%' },
  { field: 'round', header: '국수', width: '15%' },
  { field: 'button', header: '보기', width: '7%' },
]

const modalColumns = [
  { field: 'no', header: 'no', width: '5%' },
  { field: 'registDate', header: '일시', width: 'auto' },
  { field: 'wind', header: '국 길이', width: '15%' },
  { field: 'first', header: '1위', width: '15%' },
  { field: 'second', header: '2위', width: '15%' },
  { field: 'third', header: '3위', width: '15%' },
  { field: 'fourth', header: '4위', width: '15%' },
]

const selectedColumns = ref([...columns])
const modalSelectColumns = ref([...modalColumns])

const openModal = async (data) => {

  //모달 타이틀
  modalHeader.value = data.recordName

  await rankStore.getDetailRank(data.recordName)

  const datas = rankStore.detailData

  const recordIds = data.recordIds

  const detailDatas = datas.map((item, index) => ({
      ...item,
      no: index + 1,
      recodrdGb: recordIds.includes(item.recordId)
    }))

  rankDetailData.value = detailDatas
  showModal.value = true
}

onMounted(async () => {
  await rankStore.getRank();
})
</script>

<template>
  <div class="title-box">
    <img src="../assets/top3.png" alt="타이틀 이미지" />
  </div>
  <transition name="rotate" mode="out-in">
    <div  v-if="!showModal" key="rank">
      <TableArea
        :columns="columns"
        :rows="rankData"
        v-model:selectedColumns="selectedColumns"
        @openModal="openModal"
      />
    </div>
  </transition>
  <transition name="rotate" mode="out-in">
    <div class="detail-box" v-if="showModal" key="detail">
      <div class="detail-titleBox">
        <div>
          <i class ="pi pi-clock"></i>
          {{modalHeader}}님의 상세 기록
        </div>
        <Button class="purple-button" label="닫기" @click="() => showModal = false" />
      </div>
      <TableArea
        :columns="modalColumns"
        :rows="rankDetailData"
        gb="detail"
        v-model:selectedColumns="modalSelectColumns"
      />
    </div>
  </transition>
</template>


<style scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.rotate-enter-from,
.rotate-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}
.rotate-enter-to,
.rotate-leave-from {
  transform: rotateY(0);
  opacity: 1;
}
</style>
