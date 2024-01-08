const fs = require('fs')
const { TEMP_PATH } = require('../../config/dotenv.js')

const multer = require('@koa/multer')

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // 确保dest文件存在
      if (!fs.existsSync(TEMP_PATH)) {
        fs.mkdirSync(TEMP_PATH)
      }

      cb(null, TEMP_PATH)
    },
    filename: function (req, file, cb) {
      // unique后缀
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

      // 文件名后缀
      const fileFormat = file.originalname.split('.')
      const picSuffix = fileFormat[fileFormat.length - 1]

      // cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + picSuffix)
    }
  })
})

const ossFileHandle = upload.single('oss')
const foodFileHandle = upload.single('food')

module.exports = {
  ossFileHandle,
  foodFileHandle
}
