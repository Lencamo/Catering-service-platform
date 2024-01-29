import { CLOUD_ENV } from '../lib-config'

export const wxCloudInit = () => {
  if (!wx.cloud) {
    console.log('请使用大于 2.2.3 基础库，以使用云能力')
  } else {
    wx.cloud.init({
      env: CLOUD_ENV
    })
  }
}
