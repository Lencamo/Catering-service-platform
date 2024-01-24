import { defineStore } from 'pinia'
import { uploadBillMenuListApi } from '../service/bill'
import { IMenuList } from '../types/bill'

const useBillStore = defineStore('Bill', {
  state: () => ({
    //
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
    }
  }
})

export default useBillStore
