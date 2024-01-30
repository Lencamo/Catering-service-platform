export function getCategoryFoodListApi(userId: string) {
  return wx.cloud.callFunction({
    name: 'order',
    data: {
      url: '/order/category/foodList',
      data: {
        userId
      }
    }
  })
}
