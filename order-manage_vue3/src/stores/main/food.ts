import {
  deleteFoodApi,
  getCategoryListAllApi,
  getFoodCheckListApi,
  getFoodListApi
} from '@/services/modules/main/food'
import { defineStore } from 'pinia'
import type { ICategoryData } from '@/types/main/category'
import type { IFoodData } from '@/types/main/food'

const useFoodStore = defineStore('Food', {
  state: () => ({
    categoryListAll: [] as ICategoryData[],
    categoryTotalAllCount: 0,

    foodList: [] as IFoodData[],
    foodTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
    async getCategoryListAllAction() {
      const { data: res } = await getCategoryListAllApi()

      if (!res.code) {
        const { list, totalCount } = res.data

        this.categoryListAll = list
        this.categoryTotalAllCount = totalCount
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    },

    async getFoodListAction(data: any) {
      if (Object.keys(data).includes('category_id')) {
        var { data: res } = await getFoodCheckListApi(data) // 条件查询结果列表
      } else {
        var { data: res } = await getFoodListApi(data) // 常规菜品列表
      }

      if (!res.code) {
        const { list, totalCount } = res.data

        this.foodList = list
        this.foodTotalCount = totalCount
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      Promise.resolve(res)
    },

    // 删除菜品
    async delectFoodAction(foodId: string) {
      const { data: res } = await deleteFoodApi(foodId)

      if (!res.code) {
        // 更新列表
        this.getFoodListAction({ size: 5, offset: 0 })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      return res
    }
  }
})

export default useFoodStore
