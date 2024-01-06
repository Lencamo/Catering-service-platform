const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const { handleTable } = require('../../middleware/table/index.middleware')
const ossController = require('../../controller/file/oss.controller.js')
const tableController = require('../../controller/table/index.controller.js')

const tableRouter = new Router({
  prefix: '/table'
})

// 新增桌号
tableRouter.post('/', verifyAuth, handleTable, ossController.putCodeBuffer)

// 获取桌号列表
tableRouter.post('/list', verifyAuth, tableController.tableList)

// 删除桌号
tableRouter.delete('/:tableId', verifyAuth, tableController.delete)

module.exports = tableRouter
