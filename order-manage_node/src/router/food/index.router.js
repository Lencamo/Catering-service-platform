const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const { handlefood } = require('../../middleware/food/index.middleware.js')
const foodController = require('../../controller/food/index.controller.js')

const foodRouter = new Router({
  prefix: '/food'
})

// 新增菜品
foodRouter.post('/', verifyAuth, handlefood, foodController.create)

// 获取菜品列表
foodRouter.post('/list', verifyAuth, foodController.foodList)

// 删除菜品
foodRouter.delete('/:foodId', verifyAuth, foodController.delete)

module.exports = foodRouter
