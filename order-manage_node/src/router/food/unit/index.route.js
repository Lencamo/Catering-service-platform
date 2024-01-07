const Router = require('@koa/router')
const { verifyAuth } = require('../../../middleware/auth.middleware')
const { handleUnit } = require('../../../middleware/food/unit.middleware.js')
const unitController = require('../../../controller/food/unit.controller.js')

const tableRouter = new Router({
  prefix: '/unit'
})

// 新增菜品单位
tableRouter.post('/', verifyAuth, handleUnit, unitController.create)

// 获取菜品单位列表
tableRouter.post('/list', verifyAuth, unitController.unitList)

// 删除菜品单位
tableRouter.delete('/:unitId', verifyAuth, unitController.delete)

module.exports = tableRouter
