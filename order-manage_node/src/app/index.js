const koa = require('koa')

// 导入区域
const cors = require('@koa/cors')
const { bodyParser } = require('@koa/bodyparser')
const registerRouter = require('../router/index.js')
const errorHandle = require('../utils/handle-error.js')

const app = new koa()

// 跨域处理
app.use(cors())

// api路由
app.use(bodyParser())
registerRouter(app)

// 错误处理
app.on('error', errorHandle)

module.exports = app
