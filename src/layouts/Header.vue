<script setup>
  import { Menubar, InputText, IftaLabel, Dialog, Button } from 'primevue'
  import mainLogo from '@/assets/mainLogo.png'
  import { computed, ref } from 'vue'
  import { useTabStore } from '@/stores/useAppStore.js'
  const password = ref('');
  const showLogin = ref(false);
  const tabStore = useTabStore();

  const tabMenus = computed(() => [
    {
      label: '순위',
      command: () => activeTab(0),
      class: tabStore.activeTab === 0 ? 'active-tab' : ''
    },
    {
      label: '기록',
      command: () => activeTab(1),
      class: tabStore.activeTab === 1 ? 'active-tab' : ''
    },
    {
      label: '대회룰',
      command: () => activeTab(2),
      class: tabStore.activeTab === 2 ? 'active-tab' : ''
    },
    {
      label: 'Login',
      command: () => {
        showLogin.value = true
      }
    }
  ])

  function activeTab(value) {
    console.log("value", value)
    tabStore.setTab(value);
  }
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 h-[60px] text-white shadow px-4 flex items-center">
    <Menubar
      :model="tabMenus"
      class="flex-1 border-none menubar-custom"
    >
      <template #start>
        <img :src="mainLogo" alt="로고" class="w-[160px]" />
      </template>
    </Menubar>
  </header>
  <Dialog v-model:visible="showLogin" modal header="로그인" style="width: 300px;">
    <div class="card flex flex-col justify-center items-center gap-2">
      <IftaLabel>
        <InputText id="password" v-model="password" variant="filled" class="login-input" />
        <label for="password">password</label>
      </IftaLabel>
      <Button class="purple-button" label="Login" />
    </div>
  </Dialog>
</template>

<style>
</style>
