const OSS = require('ali-oss')

const {
  OSS_BUCKET,
  OSS_REGION,
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET
} = require('../config/dotenv.js')

const ossClient = new OSS({
  bucket: OSS_BUCKET,
  region: OSS_REGION,
  accessKeyId: OSS_ACCESS_KEY_ID,
  accessKeySecret: OSS_ACCESS_KEY_SECRET
})

module.exports = ossClient
