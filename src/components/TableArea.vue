<script setup>
import { computed, ref } from 'vue'
import { Button, MultiSelect, DataTable, Column } from 'primevue'

const props = defineProps({
  columns: Array,
  rows: Array,
  selectedColumns: Array,
  gb: String
});

const emit = defineEmits(['update:selectedColumns', 'openModal']);

const dt = ref();

const exportCSV = () => {
  const data = dt.value.filteredValue || dt.value.value;
  const csvContent = convertToCSV(data);

  // BOM 추가 (한글 인코딩 깨짐 방지)
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', 'BGM아지트.csv');
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
};

const convertToCSV = (data) => {
  if (!data || !data.length) return '';

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row =>
    Object.values(row).map(value => `"${value}"`).join(',')
  );

  return [headers, ...rows].join('\n');
};

const orderedSelectedColumns = computed(() =>
  props.columns.filter(c => props.selectedColumns.some(nc => nc.field === c.field))
);

//multiSelect 순서를 컬럼의 순서로 고정
const handleSelectedColumnsChange = (newSelected) => {
  const sortedSelected = props.columns.filter(col =>
    newSelected.some(sel => sel.field === col.field)
  );
  emit('update:selectedColumns', sortedSelected);
};

const rowClass = (data) => {
  if(props.gb === "detail"){
    if (data.recodrdGb) return 'bg-purple';
  }else{
    if (data.rank === 1) return 'bg-gold';
    if (data.rank === 2) return 'bg-silver';
    if (data.rank === 3) return 'bg-bronze';
  }
};
</script>

<template>
  <div class="table-button">
      <MultiSelect
        v-model="props.selectedColumns"
        :options="props.columns"
        optionLabel="header"
        placeholder="표시할 컬럼 선택"
        display="chip"
        class="min-w-[200px]"
        @update:modelValue="handleSelectedColumnsChange"
      />
      <Button icon="pi pi-download" class="purple-button" @click="exportCSV($event)" />
  </div>

  <DataTable
    :value="props.rows"
    :rows="10"
    ref="dt"
    paginator
    :rowClass="rowClass"
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
          @click="() => emit('openModal', data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
