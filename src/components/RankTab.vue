<script setup>
import { DataTable, Column, Button, MultiSelect, IftaLabel, Dialog, InputText } from 'primevue'

import { computed, ref, watch } from 'vue'
const showModal = ref(false);
const columns = [
  { field: 'rank', header: '순위', width: "5%" },
  { field: 'name', header: '이름', width: "auto"  },
  { field: 'score', header: '승점', width: "15%"  },
  { field: 'rate', header: '승점%', width: "15%" },
  { field: 'nation', header: '국수', width: "15%" },
  { field: 'button', header: '버튼', width: "7%" }
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

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};

const openModal = (data) => {
  showModal.value = true;
  console.log(data)
}

const orderedSelectedColumns = computed(() =>
  columns.filter(c => selectedColumns.value.some(nc => nc.field === c.field))
);
</script>

<template>
  <div class="title-box">
    <i class="pi pi-star-fill" style="color: #F9DC5A; font-size: 24px"></i> 순위
  </div>
  <div class="table-button">
    <MultiSelect v-model="selectedColumns" :options="columns" optionLabel="header" placeholder="표시할 컬럼 선택" display="chip" class="min-w-[200px]"/>
    <Button icon="pi pi-download" class="purple-button" @click="exportCSV($event)"/>
  </div>
  <DataTable :value="rows"
             :rows="10"
             ref="dt"
             :paginator="true"
             :rowsPerPageOptions="[5, 10, 20, 50]"
            >
    <Column
      v-for="col in orderedSelectedColumns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :style="`width: ${col.width}`"
      class="whitespace-nowrap"
      :bodyStyle="{ textAlign: 'center' }"
    >
      <template v-if="col.field === 'button'" #body="{ data }">
        <Button
          label="상세"
          class="purple-button"
          @click="openModal(data.rank)"
        />
      </template>
    </Column>
  </DataTable>
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
