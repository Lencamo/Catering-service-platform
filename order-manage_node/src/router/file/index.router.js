const { verifyAuth } = require('../../middleware/auth.middleware.js')
const {
  avatarFileHandle,
  ossFileHandle,
  logoFileHandle
} = require('../../middleware/file/upload.middleware.js')
const {
  verifyAvatar,
  verifyOSSFile,
  verifyLogo
} = require('../../middleware/file/verify.middleware.js')
const fileController = require('../../controller/file/index.controller.js')
const ossController = require('../../controller/file/oss.controller.js')

const Router = require('@koa/router')

const fileRouter = new Router({
  prefix: '/file'
})

// 上传用户头像
fileRouter.post('/avatar', verifyAuth, verifyAvatar, avatarFileHandle, fileController.storeAvatar)

// 获取头像
fileRouter.get('/:userId/avatar', fileController.showAvatar)

// 上传店铺logo
fileRouter.post('/logo', verifyAuth, verifyLogo, logoFileHandle, fileController.storeLogo)

// 获取头像
fileRouter.get('/:userId/logo', fileController.showLogo)

// 文件上传
fileRouter.post('/oss', verifyAuth, ossFileHandle, ossController.put)

module.exports = fileRouter
