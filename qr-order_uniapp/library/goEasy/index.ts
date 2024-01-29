import GoEasy from 'goeasy-lite'

import { GOEASY_HOST, GOEASY_APP_KEY, GOEASY_CHANNEL } from '../lib-config'

let goeasy = GoEasy.getInstance({
  host: GOEASY_HOST, //若是新加坡区域：singapore.goeasy.io
  appkey: GOEASY_APP_KEY,
  modules: ['pubsub'] //根据需要，传入‘pubsub’或'im’，或数组方式同时传入
})

let pubsub = goeasy.pubsub

// 建立 goeasy 连接
export const goeasyConnect = () => {
  goeasy.connect({
    onSuccess: function () {
      console.log('GoEasy 连接成功')
    },
    onFailed: function (error) {
      console.log('GoEasy 连接失败，错误编码：' + error.code + ' 错误信息：' + error.content)
    },
    onProgress: function (attempts) {
      console.log('GoEasy 连接或自动重连中', attempts)
    }
  })
}

// goeasy 发送消息
export const goeasyPublish = (data) => {
  pubsub.publish({
    channel: GOEASY_CHANNEL, //替换为您自己的channel
    message: data, //替换为您想要发送的消息内容
    onSuccess: function () {
      console.log('GoEasy 消息发布成功')
    },
    onFailed: function (error) {
      console.log('GoEasy 消息发送失败，错误编码：' + error.code + ' 错误信息：' + error.content)
    }
  })
}

// goeasy 接收(订阅)消息
export const goeasySubscribe = (callback) => {
  pubsub.subscribe({
    channel: GOEASY_CHANNEL, //替换为您自己的channel
    onMessage: function (message) {
      // console.log("channel1:" + message.channel + " content:" + message.content);
      callback(message.channel, message.content)
    },
    onSuccess: function () {
      console.log('GoEasy 消息接收成功。')
    },
    onFailed: function (error) {
      console.log('GoEasy 消息接收失败, 错误编码：' + error.code + ' 错误信息：' + error.content)
    }
  })
}
