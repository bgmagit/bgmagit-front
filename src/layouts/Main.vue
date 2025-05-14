<script setup>

import { computed } from 'vue'
import { useTabStore } from '@/stores/useAppStore.js'
import RankTab from '@/components/RankTab.vue'
import RecordTab from '@/components/RecordTab.vue'
import RulesTab from '@/components/RulesTab.vue'

const tabStore = useTabStore()
const tabComponents = {
  0: RankTab,
  1: RecordTab,
  2: RulesTab
}

const currentTabComponent = computed(() => tabComponents[tabStore.activeTab])

</script>

<template>
  <main class="pt-[60px] flex-1 bg-[#fcebc2]">
    <div class="tab-wrapper max-w-[1200px] mx-auto overflow-y-hidden">
      <transition name="fade-slide" mode="out-in">
        <component :is="currentTabComponent" :key="tabStore.activeTab" />
      </transition>
    </div>
  </main>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
