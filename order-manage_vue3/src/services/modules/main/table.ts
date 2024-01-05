import { orderRequest } from '@/services'

export function getTableListApi(size: number, offset: number) {
  return orderRequest.post({
    url: `/table/list`,
    data: {
      size,
      offset
    }
  })
}
