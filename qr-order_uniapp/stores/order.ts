import { defineStore } from 'pinia'
import { getCategoryFoodListApi } from '../service/order'
import { ICategoryList } from '../types/order'

const useOrderStore = defineStore('Order', {
  state: () => ({
    categoryFoodList: null as ICategoryList[]
  }),
  getters: {
    //
  },
  actions: {
    async getCategoryFoodListAction() {
      const { result: res }: any = await getCategoryFoodListApi()

      if (!res.data.code) {
        this.categoryFoodList = res.data
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
