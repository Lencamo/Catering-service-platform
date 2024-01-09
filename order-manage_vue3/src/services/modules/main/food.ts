import { orderRequest } from '@/services'

export function getCategoryListAllApi() {
  return orderRequest.post({
    url: `/category/list/all`
  })
}

export function getFoodCheckListApi(data: any) {
  return orderRequest.post({
    url: `/food/category`,
    data
  })
}

export function getFoodListApi(data: any) {
  return orderRequest.post({
    url: `/food/list`,
    data
  })
}

export function deleteFoodApi(foodId: string) {
  return orderRequest.delete({
    url: `/food/${foodId}`
  })
}
