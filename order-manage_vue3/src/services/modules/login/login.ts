import { orderRequest } from '../../index.ts'

import type { IAccount } from '@/types/login/login.ts'

export function pwdLoginApi(account: IAccount) {
  return orderRequest.post({
    url: '/login',
    data: account
  })
}

export function phoneLoginApi(account: any) {
  return orderRequest.post({
    url: '/login/phone',
    data: account
  })
}

export function getCodeSvgApi() {
  return orderRequest.get({
    url: '/login/codePic'
  })
}

// =========

export function getUserInfoApi(userId: string) {
  return orderRequest.get({
    url: `/user/${userId}`
  })
}

export function getStoreInfoApi(userId: string) {
  return orderRequest.get({
    url: `/store/${userId}`
  })
}
