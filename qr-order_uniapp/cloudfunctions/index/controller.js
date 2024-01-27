const indexService = require('./service.js')

class indexController {
  async getStoreDetails(data) {
    // 1、数据准备
    const { userId } = data

    // 2、云数据交互
    // - 100条限制（一个菜品类目下顶天不可能超过100个菜品吧）
    const stores = await indexService.getStoreDetails(userId)
    const result = stores[0] || {}

    // 3、返回数据
    return {
      code: 0,
      message: '获取当前店铺信息成功！',
      data: result
    }
  }
}

module.exports = new indexController()
