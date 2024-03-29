const orderService = require('./service.js')

class orderController {
  async getCategoryFoodList(data) {
    // 1、数据准备
    const { userId } = data

    // 2、云数据交互
    // - 100条限制（一个菜品类目下顶天不可能超过100个菜品吧）
    const categoryList = await orderService.getCategoryList(userId)

    const result = await Promise.all(
      categoryList.map(async (item) => {
        const foodList = await orderService.getFoodListByCategory(item.category)

        const newFoodList = foodList.map((food) => {
          return {
            ...food,
            foodOrderCount: 0, // 单个菜品项 数目统计（+ - 购物车）
            foodMoneySum: 0, // 单个菜品项 消费统计（+ - 购物车）
            isOrder: false // 当前菜品是否被 order
          }
        })

        return {
          ...item,
          categoryOrderCount: 0, // 左侧单个菜品类目 circle 数目统计
          foodList: newFoodList
        }
      })
    )

    // 3、返回数据
    return {
      code: 0,
      message: '获取菜品类目菜品列表数据成功！',
      data: {
        orderTotalCount: 0, // 用户总共 添加的菜品数目 统计
        orderMoneySum: 0, // 用户总共 消费统计
        categoryFoodList: result
      }
    }
  }
}

module.exports = new orderController()
