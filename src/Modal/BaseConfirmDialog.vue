<script setup>

import { ConfirmDialog } from 'primevue'
</script>

<template>
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="confirm-box">
        <div class="confirmHeader-box">
          <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
        </div>
        <div class="confirmContent-box">
          <p class="mb-0">{{ message.message }}</p>
          <div class="confirmButton-box">
            <Button class="purple-button" label="저장" @click="acceptCallback"></Button>
            <Button class="red-button" label="취소" @click="rejectCallback"></Button>
          </div>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<style scoped>

</style>
