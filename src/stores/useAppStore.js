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

//전역 알림 메시지
export const useToastStore = defineStore('toast', {
  state: () => ({
    toastMessage: null,
  }),
  actions: {
    showToast(result) {
      this.toastMessage = result;
    },
    clearToast() {
      this.toastMessage = null;
    }
  }
});

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
        error.message = '순위 조회 에러가 발생하였습니다.'
        await useToastStore().showToast(error)
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
        error.message = '상세 조회 에러가 발생하였습니다.'
        await useToastStore().showToast(error)
        console.error('error', error);
      } finally {
        useLoadingStore().setLoading(false);
      }
    }
  }
});

export const useRecordStore = defineStore('record', {
  state: () => ({
    data: null,
    detailData: null,
    error: null
  }),

  actions: {
    async getRecord() {
      try {
        useLoadingStore().setLoading(true)
        const {data: record} = await api.get('/bgm-agit/record');
        this.data = record
      } catch (error) {
        error.message = '기록 조회 에러가 발생하였습니다.'
        await useToastStore().showToast(error)
        console.error('error', error);
      } finally {
        useLoadingStore().setLoading(false);
      }
    },
  }
});
