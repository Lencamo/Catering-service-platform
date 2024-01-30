import { defineStore } from 'pinia'
import { CODE_MSG } from '../config/constants'
import {
  deleteBillOrderListApi,
  getCustomerAllBillApi,
  getCustomerUnFinishBillApi,
  uploadBillMenuListApi
} from '../service/bill'
import { IMenuList, IBill } from '../types/bill'
import { wxCache } from '../utils/cache'

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

    async getCustomerUnFinishBillAction(data?: any) {
      if (!data) {
        data = wxCache.getCache(CODE_MSG)
      }

      const { result: res }: any = await getCustomerUnFinishBillApi(data)
      // console.log(res)

      if (!res.code && res.data.length) {
        this.unFinishBill = res.data[0]

        // uni.showToast({
        //   icon: 'error',
        //   title: '你有未结账订单！'
        // })
      }

      return res
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
      const data = wxCache.getCache(CODE_MSG)

      const { result: res }: any = await getCustomerAllBillApi(data)
      console.log(res)

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
