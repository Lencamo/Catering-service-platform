import Speech from 'speak-tts'

const speech = new Speech() // will throw an exception if not browser supported

// speak-tts 初始化
export const speakInit = () => {
  if (speech.hasBrowserSupport()) {
    console.log('当前设备支持语音播报')

    speech
      .init({
        volume: 1, // 音量
        lang: 'zh-CN', // 语言
        rate: 1, // 语速
        pitch: 1, // 音调
        voice: 'zh-CN'
      })
      .then(() => {
        console.log('speak-tts 初始化成功')
      })
      .catch((e) => {
        console.error('speak-tts 初始化失败 : ', e)
      })
  }
}

// speak-tts 初始化
export const speakSay = (content: string) => {
  speech
    .speak({
      text: content
    })
    .then(() => {
      console.log('Success !')
    })
    .catch((e) => {
      console.error('An error occurred :', e)
    })
}
