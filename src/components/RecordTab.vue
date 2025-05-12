<script setup>
import { ref } from 'vue'

const columns = [
  { field: 'no', header: 'no', width: "5%" },
  { field: 'date', header: '일시', width: "auto"  },
  { field: 'gameStage', header: '국 길이', width: "15%"  },
  { field: 'rank', header: '1위', width: "15%" },
  { field: 'rank2', header: '2위', width: "15%" },
  { field: 'rank3', header: '3위', width: "15%" },
  { field: 'rank4', header: '4위', width: "15%" }
]

const rows = ref([
  {
    no: 1,
    date: '2025-05-06 23:46:30',
    gameStage: '남장',
    rank: '[북]배성환: 36500',
    rank2: '[서]김승주: 30400',
    rank3: '[남]이지금: 26900',
    rank4: '[동]진하: 26200',
  },
  {
    no: 2,
    date: '2025-05-08 23:46:30',
    gameStage: '남장',
    rank: '[북]태진아: 36500',
    rank2: '[서]차인표: 30400',
    rank3: '[남]현빈: 26900',
    rank4: '[동]원빈: 126200',
  }
])

const selectedColumns = ref([...columns])


</script>

<template>
  <div class="title-box">
    <i class="pi pi-clock" style="color: #462768; font-size: 24px"></i> 기록
  </div>
  <TableArea
    :columns="columns"
    :rows="rows"
    v-model:selectedColumns="selectedColumns"
  />
</template>

<style scoped>

</style>
