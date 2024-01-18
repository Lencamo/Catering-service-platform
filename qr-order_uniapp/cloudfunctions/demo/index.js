const demoController = require('./controller.js')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // console.log(event)

  switch (event.url) {
    case '/demo':
      return demoController.getUserMsg(event.data)
    default:
      break
  }
}
