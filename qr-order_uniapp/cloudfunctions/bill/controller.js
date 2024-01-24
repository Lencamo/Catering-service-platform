const billService = require('./service.js')
const { currentTime } = require('./current-time.js')

class billController {
  async uploadMenuList(data) {
    // 1、数据准备
    const { userId, tableName, dineNumber, singeMenu, openId } = data
    // 下单时间
    const createTime = currentTime()
    // 订单编号（18位）
    const orderNumber = Date.now() + '' + Math.round(Math.random() * 1e5)

    // 2、云数据交互
    const result = await billService.uploadFistMenu(
      userId,
      openId,
      dineNumber,
      tableName,
      createTime,
      orderNumber,
      singeMenu
    )

    // 3、返回数据
    return {
      code: 0,
      message: '当前订单上传成功！',
      data: result
    }
  }
}

module.exports = new billController()

// module.exports = {
// 	getCategoryList: ()=> {

// 	  return {
// 	    code: 0,
// 	    message: '获取菜品类目菜品列表成功！'
// 	  }
// 	}
// }
