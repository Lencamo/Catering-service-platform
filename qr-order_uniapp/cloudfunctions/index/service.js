const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

class indexService {
  async getStoreDetails(userId) {
    const result = await db
      .collection('c_store')
      .where({
        user_id: userId
      })
      .get()
    // console.log(result)

    return result.data
  }
}

module.exports = new indexService()
