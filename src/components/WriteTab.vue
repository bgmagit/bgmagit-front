<script setup>
import { InputGroup, InputGroupAddon, InputNumber, Select, useConfirm } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useTabStore, useWriteState } from '@/stores/useAppStore.js'

const confirm = useConfirm();
const writeState = useWriteState();
const tabStore = useTabStore();

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
  const total = recordScoreValue.value + recordScoreValue2.value + recordScoreValue3.value + recordScoreValue4.value
  if(!Number(total)) return 0;
  else{ return total}
})

const saveData = () => {

    confirm.require({
      group: 'headless',
      header: '확인',
      message: '입력하신 정보로 저장하시겠습니까?',
      accept: async() => {
        const items = {
          "recordRequests" : [ {
            "recordName" : recordNameValue.value,
            "recordScore" : recordScoreValue.value,
            "recordSeat" : recordSeatValue.value.value,
          }, {
            "recordName" : recordNameValue2.value,
            "recordScore" : recordScoreValue2.value,
            "recordSeat" : recordSeatValue2.value.value,
          }, {
            "recordName" : recordNameValue3.value,
            "recordScore" : recordScoreValue3.value,
            "recordSeat" : recordSeatValue3.value.value,
          }, {
            "recordName" : recordNameValue4.value,
            "recordScore" : recordScoreValue4.value,
            "recordSeat" : recordSeatValue4.value.value,
          } ],

          "matchsWind" : matchsWindValue.value.value
        };
        await writeState.addContent(items);
      },
    });

}

onMounted(async () => {
  if(tabStore.writeTab){
    console.log("확인", 확인);
  }
});

</script>

<template>
  <div>
    <div class="title-box">
      <img src="../assets/top4.jpg" alt="타이틀 이미지" />
    </div>
    <div class="detail-titleBox">
      <div>
        <i class ="pi pi-pencil mr-[12px]"></i>
        <span>기록 입력</span>
      </div>
      <div class="total-box">접수 합계 : {{totalScore}}</div>
      <Button class="purple-button" label="저장" @click="saveData()" />
    </div>
    <div class="write-wrapper">
      <span>※ 동남서북은 처음 진동을 중심으로 앉게 된 자리를 나타냅니다. 진동이 동이며, 나머지는 진행 순서대로 남, 서, 북가가 됩니다.</span>
      <div class="write-box">
          <Select v-model="matchsWindValue" :options="matchsWinds" optionLabel="name" placeholder="" />
      </div>
      <div class="write-box2">
          <Select v-model="recordSeatValue" :options="recordSeats" optionLabel="name" placeholder=""/>
        <InputGroup>
          <InputText v-model="recordNameValue" placeholder="이름을 입력해주세요." />
        </InputGroup>
        <InputGroup>
          <InputNumber v-model="recordScoreValue" placeholder="점수를 입력해주세요." :inputStyle="{ textAlign: 'right' }" />
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
      <div class="write-box2">
        <Select v-model="recordSeatValue2" :options="recordSeats" optionLabel="name" placeholder=""/>
        <InputGroup>
          <InputText v-model="recordNameValue2" placeholder="이름을 입력해주세요." />
        </InputGroup>
        <InputGroup>
          <InputNumber v-model="recordScoreValue2" placeholder="점수를 입력해주세요." :inputStyle="{ textAlign: 'right' }" />
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
      <div class="write-box2">
          <Select v-model="recordSeatValue3" :options="recordSeats" optionLabel="name" placeholder=""/>
        <InputGroup>
          <InputText v-model="recordNameValue3" placeholder="이름을 입력해주세요." />
        </InputGroup>
        <InputGroup>
          <InputNumber v-model="recordScoreValue3" placeholder="점수를 입력해주세요." :inputStyle="{ textAlign: 'right' }" />
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
      <div class="write-box2">
        <Select v-model="recordSeatValue4" :options="recordSeats" optionLabel="name" placeholder=""/>
        <InputGroup>
          <InputText v-model="recordNameValue4" placeholder="이름을 입력해주세요." />
        </InputGroup>
        <InputGroup>
          <InputNumber v-model="recordScoreValue4" placeholder="점수를 입력해주세요." :inputStyle="{ textAlign: 'right' }" />
          <InputGroupAddon>점</InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
