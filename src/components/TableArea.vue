<script setup>
import { computed, ref } from 'vue'
import { Button, MultiSelect, DataTable, Column, useConfirm } from 'primevue'
import { useAuthStore, useTabStore, useWriteState } from '@/stores/useAppStore.js'

const props = defineProps({
  columns: Array,
  rows: Array,
  selectedColumns: Array,
  gb: String
});

const authStore = useAuthStore();
const tabStore = useTabStore();
const writeStore = useWriteState();
const currentUser = computed(() => authStore.currentUser);

const confirm = useConfirm();

const emit = defineEmits(['update:selectedColumns', 'openModal']);

const dt = ref();

const exportCSV = () => {
  const data = dt.value.filteredValue || dt.value.value;
  console.log("dt.value", dt.value.value);
  console.log("dt.value.filteredValue", dt.value.filteredValue)
  const csvContent = convertToCSV(data);
  const BOM = '\uFEFF';
  const fullContent = BOM + csvContent;

  const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document);

  // iOS 공유 API 사용
  if (isIOS && navigator.canShare && navigator.canShare({ files: [new File([], '')] })) {
    const file = new File([fullContent], 'BGM아지트.csv', {
      type: 'text/csv;charset=utf-8;',
    });

    navigator.share({
      files: [file],
      title: 'BGM 아지트',
      text: '데이터를 공유합니다.',
    }).catch((err) => {
      console.error('공유 실패:', err);
    });

    return;
  }

  // 일반 다운로드 (데스크탑, 안드로이드 등)
  const blob = new Blob([fullContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', 'BGM아지트.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const convertToCSV = (data) => {
  if (!data || !data.length) return '';

  // 필드 순서와 헤더 매칭
  const headers = orderedSelectedColumns.value.map(col => col.header).join(',');
  const fields = orderedSelectedColumns.value.map(col => col.field);

  const rows = data.map(row =>
    fields.map(field => `"${row[field] ?? ''}"`).join(',')
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
  if (data.rank === 1) return 'bg-gold';
  if (data.rank === 2) return 'bg-silver';
  if (data.rank === 3) return 'bg-bronze';
};

const moveTab = async (data) => {
  const detailData = await writeStore.getContent(data.matchsId);
  console.log(detailData)
  if(detailData) {
    tabStore.setTab(3, true);
  }
}

const deleteData = async (data) => {
  console.log("id", data)
  const id = data.matchsId;
  confirm.require({
    group: 'headless',
    header: '확인',
    message: '정말 삭제 하시겠습니까?',
    accept: async () => {
      await writeStore.deleteContent(id);
    },
  });

}

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
      <template v-if="col.field === 'registDate'" #body="{ data }">
        <i v-if="data.recodrdGb" class="pi pi-check record-check"></i>
        <i v-if="!data.recodrdGb" class="pi pi-check record-check-none"></i>
        {{data.registDate}}
      </template>
      <template v-if="col.field === 'button'" #body="{ data }">
        <div class="dataTable-buttonBox">
          <Button
            label="상세"
            class="purple-button"
            @click="() => emit('openModal', data)"
            v-if="data.rank"
          />
          <Button
            label="수정"
            class="blue-button"
            @click="moveTab(data)"
            v-if="!data.rank && currentUser?.role === 'admin'"
          />
          <Button
            label="삭제"
            class="red-button"
            @click="deleteData(data)"
            v-if="!data.rank && currentUser?.role === 'admin'"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
