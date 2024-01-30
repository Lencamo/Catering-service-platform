import { defineStore } from 'pinia'
import {
  deleteBillOrderListApi,
  getCustomerAllBillApi,
  getCustomerUnFinishBillApi,
  uploadBillMenuListApi
} from '../service/bill'
import { IMenuList, IBill } from '../types/bill'

const useBillStore = defineStore('Bill', {
  state: () => ({
    unFinishBill: null as IBill,

    customerAllBill: null as IBill[]
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
    },

    async deleteBillOrderListAction(
      billId: string,
      moneySum: number,
      totalCount: number,
      unAcceptOrderNum: number,
      orderIndex: number
    ) {
      const { result: res }: any = await deleteBillOrderListApi(
        billId,
        moneySum,
        totalCount,
        unAcceptOrderNum,
        orderIndex
      )
      // console.log(res)

      if (!res.code) {
        this.getCustomerUnFinishBillAction()
      } else {
        uni.showToast({
          icon: 'error',
          title: res.data.message
        })
      }
    },

    async getCustomerAllBillAction() {
      const { result: res }: any = await getCustomerAllBillApi()
      // console.log(res)

      if (!res.code) {
        this.customerAllBill = res.data
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
