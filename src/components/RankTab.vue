<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRankStore } from '@/stores/useAppStore.js'
const rankStore = useRankStore()
const showModal = ref(false)

const rankData = computed(() => {
  const rankData = rankStore.data
  if (rankData) {
    console.log(rankData)
    const rankDataWithRank = rankData.map((item, index) => ({
      ...item,
      rank: index + 1,
      recordPercent: (item.recordSumPoint / item.round).toFixed(1) + '%',
    }))

    return rankDataWithRank
  } else {
    return null
  }
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

const rowModalClass = (data) => {
  if (data.recodrdGb) return 'bg-purple';
};

onMounted(async () => {
  await rankStore.getRank()
})
</script>

<template>
  <div class="title-box">
    <img src="../assets/top3.png" alt="타이틀 이미지" />
  </div>
  <TableArea
    v-if="rankData"
    :columns="columns"
    :rows="rankData"
    v-model:selectedColumns="selectedColumns"
    @openModal="openModal"
  />
  <Dialog v-model:visible="showModal" modal header="기록" style="width: 80%">
    <template #header>
      <h3 class="font-bold">{{modalHeader}}님의 상세 기록</h3>
    </template>
    <DataTable
      :value="rankDetailData"
      :rows="10"
      paginator
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :rowClass="rowModalClass">
      <Column
        v-for="col in modalColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :style="`width: ${col.width}`"
        class="whitespace-nowrap"
        :bodyStyle="{ textAlign: 'center' }"
      >
      </Column>
    </DataTable>
  </Dialog>
</template>

<style scoped></style>
