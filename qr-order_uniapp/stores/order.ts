import { defineStore } from 'pinia'
import { getCategoryFoodListApi } from '../service/order'
import { ICategoryList, IFoodList } from '../types/order'
import { wxCache } from '../utils/cache'
import { CODE_MSG } from '../config/constants'

const useOrderStore = defineStore('Order', {
  state: () => ({
    orderTotalCount: 0,
    orderMoneySum: 0,
    categoryFoodList: [] as ICategoryList[],

    orderFoodList: [] as IFoodList[]
  }),
  getters: {
    USER_ID() {
      return wxCache.getCache(CODE_MSG).userId
    }
  },
  actions: {
    async getCategoryFoodListAction() {
      const { result: res }: any = await getCategoryFoodListApi(this.USER_ID)
      // console.log(res)

      if (!res.data.code) {
        this.orderTotalCount = res.data.orderTotalCount
        this.orderMoneySum = res.data.orderMoneySum
        this.categoryFoodList = res.data.categoryFoodList
      } else {
        uni.showToast({
          icon: 'error',
          title: res.data.message
        })
      }
    }
  }
})

export default useOrderStore
