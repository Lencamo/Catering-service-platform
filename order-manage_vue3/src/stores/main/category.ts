import {
  addCategoryApi,
  deleteCategoryApi,
  editeCategoryApi,
  getCategoryListApi
} from '@/services/modules/main/category'
import type { ICategoryData } from '@/types/main/category'
import type { IPagination } from '@/types/main/common'
import { defineStore } from 'pinia'

const useCategoryStore = defineStore('Category', {
  state: () => ({
    categoryList: [] as ICategoryData[],
    categoryTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
    // 分类列表
    async getCategoryListAction(data: IPagination) {
      const { data: res } = await getCategoryListApi(data)

      if (!res.code) {
        const { list, totalCount } = res.data

        this.categoryList = list
        this.categoryTotalCount = totalCount
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      Promise.resolve(res)
    },

    // 新增分类
    async addCategoryAction(category: string) {
      const { data: res } = await addCategoryApi(category)

      if (!res.code) {
        // 更新列表
        this.getCategoryListAction({ size: 10, offset: 0 })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      return res
    },

    // 编辑分类
    async editeCategoryAction(categoryId: string, category: string) {
      const { data: res } = await editeCategoryApi(categoryId, category)

      if (!res.code) {
        // 更新列表
        this.getCategoryListAction({ size: 10, offset: 0 })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      return res
    },

    // 删除分类
    async deleteCategoryAction(categoryId: string) {
      const { data: res } = await deleteCategoryApi(categoryId)

      if (!res.code) {
        // 更新列表
        this.getCategoryListAction({ size: 10, offset: 0 })
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

export default useCategoryStore
