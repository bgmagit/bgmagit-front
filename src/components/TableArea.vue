<script setup>
import { computed, ref } from 'vue'
import { Button, MultiSelect, DataTable, Column } from 'primevue'

const props = defineProps({
  columns: Array,
  rows: Array,
  selectedColumns: Array
});

const emit = defineEmits(['update:selectedColumns', 'openModal']);

const dt = ref();

const exportCSV = () => {
  dt.value.exportCSV();
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
          @click="() => emit('openModal', data.rank)"
        />
      </template>
    </Column>
  </DataTable>
</template>
