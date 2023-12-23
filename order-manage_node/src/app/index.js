const koa = require('koa')

// 导入区域
const errorHandle = require('../utils/handle-error.js')
const errorCatch = require('../utils/catch-error.js')

const cors = require('@koa/cors')
const { bodyParser } = require('@koa/bodyparser')
const registerRouter = require('../router/index.js')

const app = new koa()

// 全局异常捕捉（未知错误）
app.use(errorCatch)

// 错误事件触发器（已知错误）
app.on('error', errorHandle)

// 跨域处理
app.use(cors())

// api路由
app.use(bodyParser())
registerRouter(app)

module.exports = app
