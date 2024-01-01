import { orderRequest } from '@/services'

export function updateUsernameApi(data: any) {
  return orderRequest.patch({
    url: `/user`,
    data
  })
}

export function updateStoreInfoApi(storeId: string, data: any) {
  return orderRequest.patch({
    url: `/store/${storeId}`,
    data
  })
}

export function updateUserPwdApi(data: any) {
  return orderRequest.patch({
    url: `/user/pwd`,
    data
  })
}
