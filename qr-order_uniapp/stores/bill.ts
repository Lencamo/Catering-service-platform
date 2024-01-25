import { defineStore } from 'pinia'
import { getCustomerUnFinishBillApi, uploadBillMenuListApi } from '../service/bill'
import { IMenuList, IBill } from '../types/bill'

const useBillStore = defineStore('Bill', {
  state: () => ({
    unFinishBill: null as IBill
  }),
  getters: {
    //
  },
  actions: {
    async uploadBillMenuListAction(singeMenu: IMenuList) {
      const { result: res }: any = await uploadBillMenuListApi(singeMenu)
      // console.log(res)

      if (!res.data.code) {
        uni.redirectTo({
          url: '/pages/bill/bill'
        })

        uni.showToast({
          icon: 'success',
          title: '下单成功！'
        })
      } else {
        uni.showToast({
          icon: 'error',
          title: res.data.message
        })
      }
    },

    async getCustomerUnFinishBillAction() {
      const { result: res }: any = await getCustomerUnFinishBillApi()
      // console.log(res)

      if (!res.code) {
        this.unFinishBill = res.data
      } else {
        uni.showToast({
          icon: 'error',
          title: res.data.message
        })
      }
    }
  }
})

export default useBillStore
