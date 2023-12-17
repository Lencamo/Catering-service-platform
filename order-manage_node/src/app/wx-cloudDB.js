const querystring = require('querystring')

const tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token'
const urlParams = {
  grant_type: 'client_credential',
  appid: APPID,
  secret: APPSECRET
}

const { access_token, expires_in } = axios.get(tokenUrl + '?' + querystring.stringify(urlParams))

console.log(access_token)
