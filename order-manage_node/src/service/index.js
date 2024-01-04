const RenRequest = require('./request/index.js')
const { CLOUD_URL, WX_APPLET_URL, TIMEOUT } = require('./request/config.js')

// 选择要操作的云环境
const { CLOUD_ENV } = require('../config/dotenv.js')

const cloudRequest = new RenRequest(
  {
    baseURL: CLOUD_URL,
    timeout: TIMEOUT
  },
  CLOUD_ENV
)

const appletRequest = new RenRequest({
  baseURL: WX_APPLET_URL,
  timeout: TIMEOUT
})

module.exports = {
  cloudRequest,
  appletRequest
}
