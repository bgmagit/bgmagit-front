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
    tabStore.setTab(0);
  }

  //로그아웃
  const handleLogout = () => {
    tabStore.setTab(0);
    authStore.logout()
  }

  const tabMenus = computed(() => {
    const baseTabs = [
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
      }
    ]

    // 로그인된 경우에만 '입력' 탭 추가
    if (authStore.isLoggedIn) {
      baseTabs.push({
        label: '입력',
        command: () => activeTab(3),
        class: tabStore.activeTab === 3 ? 'active-tab' : '',
        icon: 'pi pi-pencil'
      })
    }

    return baseTabs
  })

  function activeTab(value) {
    tabStore.setTab(value);
  }

  const closeModal = () => {
    password.value = '';
    showLogin.value = false;
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
        <Button v-if="!loggedIn" label="Login" icon="pi pi-user-plus" class="green-button" @click="showLogin = true" />
        <Button v-if="loggedIn" label="Logout" icon="pi pi-user-minus" class="red-button" @click="handleLogout()" />
      </template>
    </Menubar>
  </header>
  <div v-if="showLogin" class="modal-overlay">
    <div class="modal-box">
      <div class="confirm-box" style="width: 300px;">
        <div class="loginHeader-box">
          <span class="font-bold text-2xl block mb-2 mt-6">로그인</span>
        </div>
        <div class="loginContent-box">
          <IftaLabel>
            <Password id="password" v-model="password" toggleMask class="login-input" :feedback="false" @keyup.enter="handleLogin()" />
            <label for="password">password</label>
          </IftaLabel>
        </div>
          <div class="loginButton-box">
            <Button icon="pi pi-user-plus" class="green-button" label="로그인" @click="handleLogin()"/>
            <Button class="red-button" label="닫기" @click="closeModal()"></Button>
          </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
