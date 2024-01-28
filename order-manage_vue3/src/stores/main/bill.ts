import {
  getBillCheckListApi,
  getUnfinishBillApi,
  getBillListApi,
  updateBillAcceptStatusApi
} from '@/services/modules/main/bill'
import { defineStore } from 'pinia'
import type { IBillData } from '@/types/main/bill'

const useBillStore = defineStore('Bill', {
  state: () => ({
    billList: [] as IBillData[],
    billTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
    async getBillListAction(data: any) {
      if (Object.keys(data).includes('orderStatus')) {
        // 条件查询结果列表
        if (data.orderStatus === 'all') {
          var { data: res } = await getBillListApi(data)
        } else {
          var { data: res } = await getBillCheckListApi(data)
        }
      } else {
        var { data: res } = await getUnfinishBillApi(data) // 默认显示未结账订单列表
      }

      if (!res.code) {
        const { list, totalCount } = res.data

        this.billList = list
        this.billTotalCount = totalCount
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      Promise.resolve(res)
    },

    async updateBillAcceptStatusAction(data: any) {
      const { data: res } = await updateBillAcceptStatusApi(data) // 默认显示未结账订单列表
      // console.log(res)

      if (res.code) {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      Promise.resolve(res)
      return res
    }
  }
})

export default useBillStore
