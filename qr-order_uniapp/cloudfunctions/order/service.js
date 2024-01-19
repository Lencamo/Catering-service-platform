const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

class orderService {
	async getCategoryList(userId) {
		const result = await db.collection('c_category').where({
			user_id: userId
		}).get()
		// console.log(result)
		
		return result.data
	}
	
	async getFoodListByCategory(category) {
		const result = await db.collection('c_food').where({
			category: category
		}).get()
		// console.log(result)
		
		return result.data
	}
}

module.exports = new orderService()