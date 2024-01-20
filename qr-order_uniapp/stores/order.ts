import { defineStore } from 'pinia'
import { getCategoryFoodListApi } from '../service/order'
import { ICategoryList } from '../types/order'

const useOrderStore = defineStore('Order', {
  state: () => ({
    orderTotalCount: 0,
    orderMoneySum: 0,
    categoryFoodList: null as ICategoryList[]
  }),
  getters: {
    //
  },
  actions: {
    async getCategoryFoodListAction() {
      const { result: res }: any = await getCategoryFoodListApi()

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
