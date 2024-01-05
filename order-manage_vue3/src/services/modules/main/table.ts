import { orderRequest } from '@/services'
import type { IPagination } from '@/types/main/common'

export function getTableListApi(data: IPagination) {
  return orderRequest.post({
    url: `/table/list`,
    data
  })
}

export function addTableApi(tablename: string) {
  return orderRequest.post({
    url: `/table`,
    data: { tablename }
  })
}
