const indexController = require('./controller.js')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.url) {
    case '/index/get/storeDetails':
      return indexController.getStoreDetails(event.data)
    default:
      break
  }
}
