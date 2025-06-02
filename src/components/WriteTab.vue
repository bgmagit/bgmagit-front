<script setup>
import { InputGroup, InputGroupAddon, InputNumber, Select, useConfirm } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useTabStore, useToastStore, useWriteState } from '@/stores/useAppStore.js'

const confirm = useConfirm();
const writeState = useWriteState();
const tabStore = useTabStore();
const toastState = useToastStore();

const recordSeats =
  [
    { name: '동', value: '동'},
    { name: '남', value: '남'},
    { name: '서', value: '서'},
    { name: '북', value: '북'}
  ];

const matchsWinds =
  [
    { name: '동장', value: 'EAST' },
    { name: '남장', value: 'SOUTH'},
    { name: '서장', value: 'WEST'},
    { name: '북장', value: 'NORTH'}
  ]

//수정
const detailData = ref();

const isSubmitted = ref(false);

const matchsWindValue = ref(matchsWinds[1]);
const recordSeatValue = ref(recordSeats[0]);
const recordNameValue = ref();
const recordScoreValue = ref(0);

const recordSeatValue2 = ref(recordSeats[1]);
const recordNameValue2 = ref();
const recordScoreValue2 = ref(0);

const recordSeatValue3 = ref(recordSeats[2]);
const recordNameValue3 = ref();
const recordScoreValue3 = ref(0);

const recordSeatValue4 = ref(recordSeats[3]);
const recordNameValue4 = ref();
const recordScoreValue4 = ref(0);

const totalScore = computed(() =>{
  const total = Number(recordScoreValue.value) + Number(recordScoreValue2.value) + Number(recordScoreValue3.value) + Number(recordScoreValue4.value)
  if(!Number(total)) return 0;
  else{ return total}
})

const saveData = () => {
  isSubmitted.value = true;

  const recordRequests = [
    {
      recordName: recordNameValue.value,
      recordScore: recordScoreValue.value,
      recordSeat: recordSeatValue.value.value,
      recordId: detailData.value?.recordModifyResponses[0].recordId
    },
    {
      recordName: recordNameValue2.value,
      recordScore: recordScoreValue2.value,
      recordSeat: recordSeatValue2.value.value,
      recordId: detailData.value?.recordModifyResponses[1].recordId
    },
    {
      recordName: recordNameValue3.value,
      recordScore: recordScoreValue3.value,
      recordSeat: recordSeatValue3.value.value,
      recordId: detailData.value?.recordModifyResponses[2].recordId
    },
    {
      recordName: recordNameValue4.value,
      recordScore: recordScoreValue4.value,
      recordSeat: recordSeatValue4.value.value,
      recordId: detailData.value?.recordModifyResponses[3].recordId
    }
  ];

  const hasInvalid = recordRequests.some(item => {
    return !item.recordName || item.recordScore === null || item.recordScore === undefined;
  });

  if (hasInvalid) {
    // 유효성 오류 알림
    const error = {}
    error.message = "입력하지 않은 이름 혹은 점수가 있습니다."
    toastState.showToast(error);
    return;
  }

  // 저장 확인
  confirm.require({
    group: 'headless',
    header: '확인',
    message: '입력하신 정보로 저장하시겠습니까?',
    accept: async () => {
      const items = {
        recordRequests,
        matchsWind: matchsWindValue.value.value,
      };

      if (tabStore.writeTab) {
        items.matchId = detailData.value.matchsId;
        await writeState.updateContent(items);
      } else {
        await writeState.addContent(items);
      }
    },
  });
};
onMounted(async () => {
  if (tabStore.writeTab) {
    detailData.value = writeState.items;
    console.log("detailData.value", detailData.value);

    // 바람
    matchsWindValue.value = matchsWinds.find(w => w.value === detailData.value.matchsWind);

    // 기록자 1~4 세팅
    const records = detailData.value.recordModifyResponses;

    if (records && records.length === 4) {
      recordSeatValue.value = recordSeats.find(s => s.value === records[0].recordSeat);
      recordNameValue.value = records[0].recordName;
      recordScoreValue.value = records[0].recordScore;

      recordSeatValue2.value = recordSeats.find(s => s.value === records[1].recordSeat);
      recordNameValue2.value = records[1].recordName;
      recordScoreValue2.value = records[1].recordScore;

      recordSeatValue3.value = recordSeats.find(s => s.value === records[2].recordSeat);
      recordNameValue3.value = records[2].recordName;
      recordScoreValue3.value = records[2].recordScore;

      recordSeatValue4.value = recordSeats.find(s => s.value === records[3].recordSeat);
      recordNameValue4.value = records[3].recordName;
      recordScoreValue4.value = records[3].recordScore;
    }
  }
});

</script>

<template>
  <div>
    <div class="title-box">
      <img src="../assets/top4.jpg" alt="타이틀 이미지" @click="tabStore.setTab(0)"/>
    </div>
    <div class="detail-titleBox">
      <div>
        <i class ="pi pi-flag-fill mr-[8px]"></i>
        <span>기록 입력</span>
      </div>
      <div class="total-box">접수 합계 : {{totalScore}} 점</div>
      <Button class="blue-button" label="저장" @click="saveData()" />
    </div>
    <div class="write-wrapper">
      <span class="red-span"> <i class ="pi pi-asterisk mr-[2px]"></i> 동남서북은 처음 진동을 중심으로 앉게 된 자리를 나타냅니다. 진동이 동이며, 나머지는 진행 순서대로 남, 서, 북가가 됩니다.</span>
      <div class="write-box">
          <Select v-model="matchsWindValue" :options="matchsWinds" optionLabel="name" placeholder="" />
      </div>
      <div class="write-box2">
          <Select v-model="recordSeatValue" :options="recordSeats" optionLabel="name" placeholder="" :class="{ 'p-invalid': !recordNameValue && isSubmitted }"/>
        <InputGroup>
          <InputText v-model.trim="recordNameValue" placeholder="이름을 입력해주세요." :class="{ 'p-invalid': !recordNameValue && isSubmitted }" />
        </InputGroup>
        <InputGroup>
          <InputText v-model="recordScoreValue" placeholder="점수를 입력해주세요." :style="{ textAlign: 'right' }" :inputClass="{ 'p-invalid': !recordScoreValue && isSubmitted }"/>
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
      <div class="write-box2">
        <Select v-model="recordSeatValue2" :options="recordSeats" optionLabel="name" placeholder=""/>
        <InputGroup>
          <InputText v-model.trim="recordNameValue2" placeholder="이름을 입력해주세요." :class="{ 'p-invalid': !recordNameValue2 && isSubmitted }" />
        </InputGroup>
        <InputGroup>
          <InputText v-model="recordScoreValue2" placeholder="점수를 입력해주세요." :style="{ textAlign: 'right' }" :inputClass="{ 'p-invalid': !recordScoreValue2 && isSubmitted }" />
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
      <div class="write-box2">
          <Select v-model="recordSeatValue3" :options="recordSeats" optionLabel="name" placeholder=""/>
        <InputGroup>
          <InputText v-model.trim="recordNameValue3" placeholder="이름을 입력해주세요." :class="{ 'p-invalid': !recordNameValue3 && isSubmitted }" />
        </InputGroup>
        <InputGroup>
          <InputText v-model="recordScoreValue3" placeholder="점수를 입력해주세요." :style="{ textAlign: 'right' }" :inputClass="{ 'p-invalid': !recordScoreValue3 && isSubmitted }" />
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
      <div class="write-box2">
        <Select v-model="recordSeatValue4" :options="recordSeats" optionLabel="name" placeholder=""/>
        <InputGroup>
          <InputText v-model.trim="recordNameValue4" placeholder="이름을 입력해주세요." :class="{ 'p-invalid': !recordNameValue4 && isSubmitted }" />
        </InputGroup>
        <InputGroup>
          <InputText v-model="recordScoreValue4" placeholder="점수를 입력해주세요." :style="{ textAlign: 'right' }" :inputClass="{ 'p-invalid': !recordScoreValue4 && isSubmitted }" />
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
