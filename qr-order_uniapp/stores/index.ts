import { defineStore } from 'pinia'
import { getStoreDetailsApi } from '../service'
import type { IStore } from '../types/index'

const useIndexStore = defineStore('Index', {
  state: () => ({
    storeDetails: null as IStore
  }),
  getters: {
    //
  },
  actions: {
    async getStoreDetailsAction(userId: string) {
      const { result: res }: any = await getStoreDetailsApi(userId)
      // console.log(res)

      if (!res.data.code) {
        this.storeDetails = res.data
      } else {
        uni.showToast({
          icon: 'error',
          title: res.data.message
        })
      }
    }
  }
})

export default useIndexStore
