const ossClient = require('../../../app/oss.js')
const path = require('path')
const fs = require('fs')

const { OSS_FILE_PATH } = require('../../../config/dotenv.js')

class ossService {
  // 本地文件操作
  async putFile(filename, localPath) {
    try {
      const result = await ossClient.put(OSS_FILE_PATH + filename, path.normalize(localPath))

      // - 删除本地临时存储文件
      if (result.res.status === 200) {
        fs.unlink(localPath, async (err) => {
          if (err) throw err
          // console.log('文件已删除')
        })
      }

      return result
    } catch (error) {
      console.log(error)
    }
  }

  // async getFile(filename) {
  //   await client.get(OSS_FILE_PATH + filename)
  // }
}

module.exports = new ossService()
