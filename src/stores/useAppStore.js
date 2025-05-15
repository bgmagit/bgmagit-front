import api from '@/utils/axiosInstance.js';
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 더미 사용자 목록
  const users = [
    { password: '3527', role: 'admin', name: '관리자' },
    { password: '2629', role: 'user', name: '사용자' }
  ]

  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')));
  const isLoggedIn = ref(!!currentUser.value);
  const error = {}

  const login = (password) => {
    const found = users.find(user => user.password === password)
    if (found) {
      currentUser.value = found;
      localStorage.setItem('currentUser', JSON.stringify(found));
      error.code = 200;
      error.message = '로그인 되었습니다.'
      useToastStore().showToast(error)
      isLoggedIn.value = true
      return true
    } else {
      error.code = null;
      error.message = '비밀번호가 틀렸습니다.';
      useToastStore().showToast(error)
      return false
    }
  }

  const logout = () => {
    currentUser.value = null
    isLoggedIn.value = false
    localStorage.removeItem('currentUser')
    error.code = 200;
    error.message = '로그아웃 되었습니다.'
    useToastStore().showToast(error)
  }

  watch(currentUser, (newUser) => {
    if (newUser) {
      localStorage.setItem('currentUser', JSON.stringify(newUser))
    }
  })


  return {
    users,
    currentUser,
    isLoggedIn,
    login,
    logout,
  }
})

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

export const useWriteState = defineStore('write', {
  state: () => ({
    items: [],
  }),

  actions: {
    async fetchMemos() {
      // const baseInfo = useBaseInfoStore().baseInfo;
      // const receiptNo = baseInfo.receiptNo;
      //
      // try {
      //   const {data: result} = await api.get(`/viewer-api/viewer-file-memo/${receiptNo}`, {
      //     params: {
      //       userId: baseInfo.info.id
      //     }
      //   });
      //   this.items = result;
      // } catch (error) {
      //   await useGlobalToastStore().showToast(error)
      // }
    },

    // 메모 입력
    async addContent(newItem, total) {
      try {

        const error = {}

        if(total === 120000) {
          const {data: result} = await api.post(`/bgm-agit/record`, newItem, );

          await useToastStore().showToast(result);
        }else {
          error.message = '접수 합계는 120000점이어야 합니다.'
          await useToastStore().showToast(error)
        }

      } catch (error) {
        console.error('error', error);
        error.message = "저장에 실패하였습니다.";
        await useToastStore().showToast(error);
      }
    },

    // // 메모 수정
    // async updateMemo(updateItem, gb) {
    //   try {
    //     const {data: result} = await api.put(`/viewer-api/viewer-${gb}-memo`, updateItem, );
    //
    //     if (gb === 'file') {
    //       await this.fetchMemos();
    //     } else {
    //       await this.fetchAllMemos();
    //     }
    //
    //     await useGlobalToastStore().showToast(result);
    //   } catch (error) {
    //     error.message = "메모 수정이 실패했습니다.";
    //     await useGlobalToastStore().showToast(error);
    //   }
    // },
    //
    // // 메모 삭제
    // async deleteMemo(seq, gb) {
    //   try {
    //     const {data: result} = await api.delete(`/viewer-api/viewer-${gb}-memo/${seq}`);
    //
    //     if (gb === 'file') {
    //       await this.fetchMemos();
    //     } else {
    //       await this.fetchAllMemos();
    //     }
    //
    //     await useGlobalToastStore().showToast(result);
    //   } catch (error) {
    //     error.message = "메모 삭제가 실패했습니다.";
    //     await useGlobalToastStore().showToast(error);
    //   }
    // },
    //
    // setSelectMemoData(newData) {
    //   this.selectedItem = newData;
    // },
    //
    // setMemoGb(boolean) {
    //   this.memoGb = boolean;
    // },
  },
});
