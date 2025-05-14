<script setup>
  import { Menubar, IftaLabel, Password  } from 'primevue'
  import mainLogo from '@/assets/mainLogo.png'
  import { computed, ref } from 'vue'
  import { useAuthStore, useTabStore } from '@/stores/useAppStore.js'

  const password = ref('');
  const showLogin = ref(false);

  const tabStore = useTabStore();
  const authStore = useAuthStore();
  const loggedIn = computed(() => authStore.isLoggedIn);

  const handleLogin = () => {
    const success = authStore.login(password.value)
    if(success) showLogin.value = false;
    password.value = '';
  }

  //로그아웃
  const handleLogout = () => {
    authStore.logout()
  }

  const tabMenus = computed(() => [
    {
      label: '순위',
      command: () => activeTab(0),
      class: tabStore.activeTab === 0 ? 'active-tab' : '',
      icon: 'pi pi-star-fill'
    },
    {
      label: '기록',
      command: () => activeTab(1),
      class: tabStore.activeTab === 1 ? 'active-tab' : '',
      icon: 'pi pi-clock'
    },
    {
      label: '대회룰',
      command: () => activeTab(2),
      class: tabStore.activeTab === 2 ? 'active-tab' : '',
      icon: 'pi pi-book'
    },
  ])

  function activeTab(value) {
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
      <template #end>
        <Button v-if="!loggedIn" label="Login" icon="pi pi-user-plus" class="purple-button" @click="showLogin = true" />
        <Button v-if="loggedIn" label="Logout" icon="pi pi-user-minus" class="purple-button" @click="handleLogout()" />
      </template>
    </Menubar>
  </header>
  <Dialog v-model:visible="showLogin" modal header="로그인" style="width: 300px;">
    <template #header>
      <h3 class="font-bold">로그인</h3>
    </template>
      <IftaLabel>
        <Password id="password" v-model="password" toggleMask class="login-input" />
        <label for="password">password</label>
      </IftaLabel>
    <template #footer>
      <Button class="purple-button" label="Login" @click="handleLogin()"/>
    </template>
  </Dialog>
</template>

<style>
</style>
