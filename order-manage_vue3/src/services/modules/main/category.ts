import { orderRequest } from '@/services'
import type { IPagination } from '@/types/main/common'

export function getCategoryListApi(data: IPagination) {
  return orderRequest.post({
    url: `/category/list`,
    data
  })
}

export function addCategoryApi(category: string) {
  return orderRequest.post({
    url: `/category`,
    data: { category }
  })
}

export function editeCategoryApi(categoryId: string, category: string) {
  return orderRequest.patch({
    url: `/category/${categoryId}`,
    data: { category }
  })
}

export function deleteCategoryApi(category: string) {
  return orderRequest.delete({
    url: `/category/${category}`
  })
}
