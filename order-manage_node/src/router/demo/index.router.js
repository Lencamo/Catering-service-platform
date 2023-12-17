const { verifyAuth } = require('../../middleware/auth.middleware.js')
const { getWxToken } = require('../../service/request/wx_token.js')

const Router = require('@koa/router')

const demoRouter = new Router({
  prefix: '/demo'
})

demoRouter.get('/', (ctx, next) => {
  console.log('连接测试')
})

demoRouter.get('/api', verifyAuth, (ctx, next) => {
  // console.log('token有效性测试')

  ctx.body = {
    code: 0,
    message: 'token验证成功!!!',
    data: {
      payload: ctx.user
    }
  }
})

demoRouter.get('/getAccess_Token', async (ctx, next) => {
  // console.log('获取access_token测试')

  const { data } = await getWxToken()

  ctx.body = {
    code: 0,
    message: 'access_token获取成功!!!',
    data
  }
})

module.exports = demoRouter
