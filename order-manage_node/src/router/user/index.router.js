const Router = require('@koa/router')

// body数据校验
const { verifyUser, handlePassword } = require('../../middleware/user/index.middleware.js')
const { verifyAuth } = require('../../middleware/auth.middleware.js')

// controller引入
const userController = require('../../controller/user/index.controller.js')

const userRouter = new Router({
  prefix: '/user'
})

// 用户注册
userRouter.post('/', verifyUser, handlePassword, userController.create)

// 查看用户信息
userRouter.get('/:userId', userController.show)

// 更改用户信息
userRouter.post('/:userId', verifyAuth, userController.update)

module.exports = userRouter
