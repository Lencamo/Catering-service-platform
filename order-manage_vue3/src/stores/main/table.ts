import { deleteTableApi, getTableListApi } from '@/services/modules/main/table'
import type { ITableData } from '@/types/main/table'
import { defineStore } from 'pinia'
import { addTableApi } from '../../services/modules/main/table'
import type { IPagination } from '@/types/main/common'

const useTableStore = defineStore('Table', {
  state: () => ({
    tableList: [] as ITableData[],
    tableTotalCount: 0
  }),
  getters: {
    //
  },
  actions: {
    // 桌号列表
    async getTableListAction(data: IPagination) {
      const { data: res } = await getTableListApi(data)
      const { list, totalCount } = res.data

      this.tableList = list
      this.tableTotalCount = totalCount
    },

    // 新增桌号
    async addTableAction(tablename: string) {
      const { data: res } = await addTableApi(tablename)

      if (!res.code) {
        // 更新列表
        this.getTableListAction({ size: 5, offset: 0 })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      return res
    },

    // 删除桌号
    async deleteTableAction(tableId: string) {
      const { data: res } = await deleteTableApi(tableId)

      if (!res.code) {
        // 更新列表
        this.getTableListAction({ size: 5, offset: 0 })
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

export default useTableStore
