import { orderRequest } from '@/services'

export function updataUsernameApi(userId: string, data: any) {
  return orderRequest.post({
    url: `/user/${userId}`,
    data
  })
}

export function updataStoreInfoApi(storeId: string, data: any) {
  return orderRequest.post({
    url: `/store/${storeId}`,
    data
  })
}

export function updataUserPwdApi(data: any) {
  return orderRequest.patch({
    url: `/user/pwd`,
    data
  })
}
