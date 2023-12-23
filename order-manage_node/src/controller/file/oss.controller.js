const ossService = require('../../service/modules/file/oss.service.js')

class ossController {
  async put(ctx, next) {
    // 1、接收数据
    const { filename, path } = ctx.request.file
    const { id: user_id, username } = ctx.user

    // 2、数据库交互
    // - 上传文件到OSS
    const result = await ossService.putFile(filename, path)

    // - 存储文件OSS地址
    console.log(result.url)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '文件上传成功!!!',
      data: result.res
    }
  }
}

module.exports = new ossController()
