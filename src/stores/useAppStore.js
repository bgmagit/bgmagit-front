import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => ({
    activeTab: 0// 기본 탭
  }),
  actions: {
    setTab(value) {
      this.activeTab = value;
    }
  }
})

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false
  }),
  actions: {
    setLoading(value) {
      this.loading = value;
    }
  }
})

