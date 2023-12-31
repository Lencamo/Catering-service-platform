const ossService = require('../../service/modules/file/oss.service.js')
const tableServer = require('../../service/modules/table/index.service.js')
const foodService = require('../../service/modules/food/index.service.js')
const { currentTime } = require('../../utils/current-time.js')

class ossController {
  async putFile(ctx, next) {
    // 1、接收数据
    const { filename, path } = ctx.request.file
    const { id: user_id, username } = ctx.user

    // 2、数据库交互
    // - 上传文件到OSS
    const result = await ossService.putFile(filename, path)

    // - 存储文件OSS地址
    // console.log(result.url)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '文件上传成功!!!',
      data: result.res
    }
  }

  async putCodeBuffer(ctx, next) {
    // 1、接收数据
    const { tablename } = ctx.request.body
    const { fileName, codeBuffer } = ctx.code
    const { id: user_id } = ctx.user

    // 2、数据库交互
    // - 上传文件到oss
    const { url: codeUrl } = await ossService.putCodeBuffer(fileName, codeBuffer)

    // - 存储小程序码
    const createTime = currentTime()
    const result = await tableServer.createTable(tablename, fileName, codeUrl, createTime, user_id)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '桌号创建成功!!!',
      data: result
    }
  }

  async putFoodFile(ctx, next) {
    // 1、接收数据
    const { filename, path } = ctx.request.file
    const { foodId: food_id } = ctx.params

    // 2、数据库交互
    // - 上传文件到OSS
    const result = await ossService.putFile(filename, path)
    // console.log(result.res)

    // - 存储文件OSS地址
    const foodUrl = result.url
    const data = await foodService.updateFood(food_id, filename, foodUrl)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '菜品图片上传成功!!!',
      data
    }
  }
}

module.exports = new ossController()
