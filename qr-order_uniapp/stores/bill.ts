import { defineStore } from 'pinia'
import { CODE_MSG, DINE_NUMB } from '../config/constants'
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
    USER_ID() {
      return wxCache.getCache(CODE_MSG).userId
    },
    TABLE_NAME() {
      return wxCache.getCache(CODE_MSG).tablename
    },
    DINE_NUMB() {
      return wxCache.getCache(DINE_NUMB)
    }
  },
  actions: {
    async uploadBillMenuListAction(singeMenu: IMenuList) {
      const { result: res }: any = await uploadBillMenuListApi(
        singeMenu,
        this.USER_ID,
        this.TABLE_NAME,
        this.DINE_NUMB
      )
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
      const { result: res }: any = await getCustomerUnFinishBillApi(this.USER_ID, this.TABLE_NAME)
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

      const { result: res }: any = await getCustomerAllBillApi(this.USER_ID, this.TABLE_NAME)
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
