export function getStoreDetailsApi(userId: string) {
  return wx.cloud.callFunction({
    name: 'index',
    data: {
      url: '/index/get/storeDetails',
      data: {
        userId
      }
    }
  })
}
