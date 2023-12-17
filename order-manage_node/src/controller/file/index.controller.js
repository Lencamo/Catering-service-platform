const { createReadStream } = require('node:fs')
const { UPLOAD_PATH, APP_HOST, APP_PORT } = require('../../config/dotenv.js')
const fileService = require('../../service/modules/file/index.service.js')

class fileController {
  async storeAvatar(ctx, next) {
    // 1、接收数据
    const { filename, mimetype, size } = ctx.request.file
    const { id: user_id, username } = ctx.user

    // - 头像本地地址
    const avatar_url = `${APP_HOST}:${APP_PORT}/file/${user_id}/avatar` // 存储的是👏获取头像接口地址

    // 2、数据库交互
    const result = await fileService.storeAvatar(filename, mimetype, size, avatar_url, user_id)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '头像上传成功!!!',
      data: result
    }
  }

  async show(ctx, next) {
    // 1、接收数据
    const { userId: user_id } = ctx.params

    // 2、数据库交互
    const result = await fileService.show(user_id)
    const { filename, mimetype } = result.avatar

    // 3、发送响应信息
    // - 图片处理🤔
    ctx.type = mimetype
    ctx.body = createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new fileController()
