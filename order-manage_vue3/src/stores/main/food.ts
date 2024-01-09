import {
  addFoodApi,
  deleteFoodApi,
  editeFoodApi,
  getCategoryListAllApi,
  getFoodCheckListApi,
  getFoodListApi,
  getUnitListAllApi
} from '@/services/modules/main/food'
import { defineStore } from 'pinia'
import type { ICategoryData } from '@/types/main/category'
import type { IFoodData } from '@/types/main/food'

const useFoodStore = defineStore('Food', {
  state: () => ({
    categoryListAll: [] as ICategoryData[],
    categoryTotalAllCount: 0,

    unitListAll: [] as any[],
    unitTotalAllCount: 0,

    foodList: [] as IFoodData[],
    foodTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
    async getEntireDataAction() {
      const { data: res } = await getCategoryListAllApi()
      const { data: res2 } = await getUnitListAllApi()

      if (!res.code && !res2.code) {
        // 菜品类目下列列表数据
        const { list, totalCount } = res.data

        this.categoryListAll = list
        this.categoryTotalAllCount = totalCount

        // 菜品单位下列列表数据
        const { list: list2, totalCount: totalCount2 } = res2.data

        this.unitListAll = list2
        this.unitTotalAllCount = totalCount2
      }
    },

    // ==============

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
    },

    // 新增菜品
    async addFoodAction(data: IFoodData) {
      const { data: res } = await addFoodApi(data)

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
    },

    // 编辑分类
    async editFoodAction(editFoodId: string, data: IFoodData) {
      const { data: res } = await editeFoodApi(editFoodId, data)

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
