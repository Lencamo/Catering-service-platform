const { default: axios } = require('axios')
const { WX_APPID, WX_APPSECRET } = require('../../config/dotenv.js')

function getWxToken() {
  return axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      grant_type: 'client_credential',
      appid: WX_APPID,
      secret: WX_APPSECRET
    }
  })
}

module.exports = { getWxToken }
