import { ICategoryList } from '../types/order'

export function useClearOrder(orderStore: any) {
  // 清空购物车
  const clearOrderAction = async () => {
    // 方式1
    // uni.switchTab({
    //   url: '/pages/order/order'
    // })

    // 方式2
    // orderStore.$reset()
    // await orderStore.getCategoryFoodListAction()

    // 方式3
    orderStore.orderTotalCount = 0
    orderStore.orderMoneySum = 0

    orderStore.categoryFoodList.forEach((item: ICategoryList) => {
      item.categoryOrderCount = 0

      item.foodList.forEach((food) => {
        food.foodOrderCount = 0
        food.foodMoneySum = 0

        food.isOrder = false
      })
    })
  }

  return {
    clearOrderAction
  }
}
