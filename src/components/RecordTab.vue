<script setup>
import { DataTable, Column, Button, MultiSelect } from 'primevue'
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

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<template>
  <div class="title-box">
    <i class="pi pi-clock" style="color: #462768; font-size: 24px"></i> 기록
  </div>
  <div class="table-button">
    <MultiSelect v-model="selectedColumns" :options="columns" optionLabel="header" placeholder="표시할 컬럼 선택" display="chip" class="min-w-[200px]"/>
    <Button icon="pi pi-download" class="purple-button" @click="exportCSV($event)"/>
  </div>
  <DataTable :value="rows"
             :rows="10"
             ref="dt"
             :paginator="true"
             :rowsPerPageOptions="[5, 10, 20, 50]">
    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :style="`width: ${col.width}`"
      class="whitespace-nowrap"
    >
      <template v-if="col.field === 'button'" #body="{ data }">
        <Button
          label="상세"
        />
      </template>
    </Column>
  </DataTable>

</template>

<style scoped>

</style>
