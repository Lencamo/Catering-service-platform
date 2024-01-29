import { orderRequest } from '@/services'

export function getBillCheckListApi(data: any) {
  return orderRequest.post({
    url: `/bill/status`,
    data
  })
}

export function getBillListApi(data: any) {
  return orderRequest.post({
    url: `/bill/list`,
    data
  })
}

export function getUnfinishBillApi(data: any) {
  return orderRequest.post({
    url: `/bill/unfinish`,
    data
  })
}

export function updateBillAcceptStatusApi(data: any) {
  return orderRequest.patch({
    url: `/bill/acceptStatus`,
    data
  })
}

export function deleteBillOrderListApi(data: any) {
  return orderRequest.patch({
    url: `/bill/orderList`,
    data
  })
}
