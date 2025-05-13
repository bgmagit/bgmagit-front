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
    <div class="tab-wrapper overflow-y-auto"> <!-- 여기에 패딩 적용 -->
      <component :is="currentTabComponent" :key="tabStore.activeTab" />
    </div>
  </main>
</template>

<style>

</style>
