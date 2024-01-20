const orderController = require('./controller.js')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.url) {
    case '/order/categoryList':
      return orderController.getCategoryList(event.data)
    case '/order/category/foodList':
      return orderController.getCategoryFoodList(event.data)
    default:
      break
  }
}
