import { getTableListApi } from '@/services/modules/main/table'
import type { ITableData } from '@/types/main/table'
import { defineStore } from 'pinia'

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
    async getTableListAction(size: number, offset: number) {
      const { data: res } = await getTableListApi(size, offset)
      const { list, totalCount } = res.data

      this.tableList = list
      this.tableTotalCount = totalCount
    }
  }
})

export default useTableStore
