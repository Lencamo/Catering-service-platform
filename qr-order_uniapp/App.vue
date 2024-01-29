<template>
  <view class="App">
    <h2>App</h2>
  </view>
</template>

<script setup lang="ts">
// import { CLOUD_ENV } from './env.js'
import { onLaunch } from '@dcloudio/uni-app'
import { wxCloudInit } from './library/wxCloud/index'
import { goeasyConnect } from './library/goEasy/index'

// 初始化操作
onLaunch(() => {
  // 1、云开发云环境
  wxCloudInit()

  // 2、建立 goeasy 连接
  goeasyConnect()
})
</script>

<style lang="scss">
.App {
  width: 100vw;
  height: 100vh;
  background-color: #e8eaed;
}
</style>
