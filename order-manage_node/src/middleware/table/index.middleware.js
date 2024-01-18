const { TABLENAME_ALREADY_EXISTS } = require('../../config/constants')
const tableServer = require('../../service/modules/table/index.service')

const handleTable = async (ctx, next) => {
  const { tablename } = ctx.request.body
  const { id: user_id } = ctx.user

  // 1、验证当前用户是否已存在该桌号
  const tables = await tableServer.findTableByName(tablename, user_id)
  if (tables.length) {
    return ctx.app.emit('error', TABLENAME_ALREADY_EXISTS, ctx)
  }

  // 2、获取小程序码
  const codeBuffer = await tableServer.getTableCode(tablename, user_id)

  // 3、小程序码文件名
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  const fileName = `code-${uniqueSuffix}-${tablename}.jpg`

  ctx.code = { fileName, codeBuffer }

  await next()
}

module.exports = {
  handleTable
}
