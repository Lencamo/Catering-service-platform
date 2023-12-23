const errorCatch = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 在这里处理错误，例如记录日志、返回错误响应等
    console.error(error)

    // ctx.status = err.statusCode || err.status || 500

    ctx.body = {
      code: error.statusCode || error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  }
}

module.exports = errorCatch
