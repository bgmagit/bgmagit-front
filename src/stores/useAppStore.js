import api from '@/utils/axiosInstance.js';
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

export const useRankStore = defineStore('rank', {
  state: () => ({
    data: null,
    detailData: null,
    error: null
  }),

  actions: {
    async getRank() {
      try {
        useLoadingStore().setLoading(true)
        const {data: rule} = await api.get('/bgm-agit/rank');

        this.data = rule
      } catch (error) {
        console.error('error', error);
      } finally {
        useLoadingStore().setLoading(false);
      }
    },
    async getDetailRank(name) {
      try {
        useLoadingStore().setLoading(true)
        const {data: ruleDetail} = await api.get(`/bgm-agit/rank/${name}`);

        this.detailData = ruleDetail
      } catch (error) {
        console.error('error', error);
      } finally {
        useLoadingStore().setLoading(false);
      }
    }
  }
});

