const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

class demoService {
  async getUserMsg(username) {
    const result = db
      .collection('c_user')
      .where({
        username: username
      })
      .get()

    // console.log(result)

    return result
  }
}

module.exports = new demoService()
