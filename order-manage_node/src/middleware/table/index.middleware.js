const { TABLENAME_ALREADY_EXISTS } = require('../../config/constants')
const tableServer = require('../../service/modules/table/index.service')

const handleTable = async (ctx, next) => {
  const { tablename } = ctx.request.body

  // 1、验证桌号是否占用
  const tables = await tableServer.findTableByName(tablename)
  if (tables.length) {
    return ctx.app.emit('error', TABLENAME_ALREADY_EXISTS, ctx)
  }

  // 2、获取小程序码
  const codeBuffer = await tableServer.getTableCode(tablename)

  // 3、小程序码文件名
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  const fileName = `code-${uniqueSuffix}-${tablename}.jpg`

  ctx.code = { fileName, codeBuffer }

  await next()
}

module.exports = {
  handleTable
}
