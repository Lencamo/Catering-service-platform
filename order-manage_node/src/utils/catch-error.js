const errorCatch = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 在这里处理错误，例如记录日志、返回错误响应等
    console.error(error)

    // ctx.status = error.statusCode || error.status || 500

    if (error.isJoi) {
      // 1、joi错误处理
      ctx.body = {
        code: 1001,
        message: error.details.map((detail) => detail.message)
      }
    } else {
      // 2、其他错误处理
      ctx.body = {
        code: error.statusCode || error.status || 500,
        message: error.message || 'Internal Server Error'
      }
    }
  }
}

module.exports = errorCatch
