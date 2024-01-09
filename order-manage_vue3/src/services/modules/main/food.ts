import { orderRequest } from '@/services'
import type { IFoodData } from '@/types/main/food'

export function getCategoryListAllApi() {
  return orderRequest.post({
    url: `/category/list/all`
  })
}

export function getUnitListAllApi() {
  return orderRequest.post({
    url: `/unit/list`
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

export function addFoodApi(data: IFoodData) {
  return orderRequest.post({
    url: `/food`,
    data
  })
}

export function editeFoodApi(foodId: string, data: IFoodData) {
  return orderRequest.patch({
    url: `/food/${foodId}`,
    data
  })
}
