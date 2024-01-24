const billController = require('./controller.js')
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()

  switch (event.url) {
    case '/bill/orderList':
      return billController.uploadMenuList({ ...event.data, openId: OPENID })
    default:
      break
  }
}
