import { orderRequest } from '@/services'

export function updataUsernameApi(userId: string, data: any) {
  return orderRequest.post({
    url: `/user/${userId}`,
    data
  })
}
