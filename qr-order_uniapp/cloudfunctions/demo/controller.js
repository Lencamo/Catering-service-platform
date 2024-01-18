const demoService = require('./service.js')

class demoController {
  async getUserMsg(data) {
    // 1、数据准备
    const { username } = data

    // 2、云数据交互
    const result = await demoService.getUserMsg(username)
    const users = result.data

    // 3、返回数据
    return {
      code: 0,
      message: '获取指定用户信息成功！',
      data: users[0]
    }
  }
}

module.exports = new demoController()

// module.exports = {
// 	getUserMsg: ()=> {

// 	  return {
// 	    code: 0,
// 	    message: '获取指定用户信息成功！'
// 	  }
// 	}
// }
