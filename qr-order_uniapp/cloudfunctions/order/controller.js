const orderService = require('./service.js')

class orderController {
	async getCategoryList(data) {
	  // 1、数据准备
	  const { userId } = data
	
	  // 2、云数据交互
	  const result = await orderService.getCategoryList(userId)
		
	  // 3、返回数据
	  return {
	    code: 0,
	    message: '获取菜品类目数据成功！',
	    data: result
	  }
	}
	
  async getCategoryFoodList(data) {
    // 1、数据准备
    const { userId } = data

    // 2、云数据交互
		// - 100条限制（一个菜品类目下顶天不可能超过100个菜品吧）
    const categoryList = await orderService.getCategoryList(userId)
	
		const result = await Promise.all(
			categoryList.map(async (item) => {
				return {
					...item,
					foodList: await orderService.getFoodListByCategory(item.category)
				}
			})
		)
		
    // 3、返回数据
    return { 
      code: 0,
      message: '获取菜品类目菜品列表数据成功！',
      data: result
    }
  }
}

module.exports = new orderController()

// module.exports = {
// 	getCategoryList: ()=> {

// 	  return {
// 	    code: 0,
// 	    message: '获取菜品类目菜品列表成功！'
// 	  }
// 	}
// }
