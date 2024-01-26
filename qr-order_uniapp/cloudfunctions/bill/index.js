const billController = require('./controller.js')
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()

  switch (event.url) {
    case '/bill/post/orderList':
      return billController.uploadBillMenuList({ ...event.data, openId: OPENID })
    case '/bill/get/unFinishBill':
      return billController.getCustomerUnFinishBill({ ...event.data, openId: OPENID })
    case '/bill/delete/orderList':
      return billController.deleteBillOrderList({ ...event.data })
    case '/bill/get/customerAllBill':
      return billController.getCustomerAllBill({ ...event.data, openId: OPENID })
    default:
      break
  }
}
