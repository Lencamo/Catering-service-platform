<template>
  <view class="App">
    <h2>App</h2>
  </view>
</template>

<script setup lang="ts">
import { CLOUD_ENV } from './env.js'
import { onLaunch } from '@dcloudio/uni-app'

// 初始化操作
onLaunch(() =>{
	// 1、云开发云环境
	if(!wx.cloud) {
		console.log('请使用大于 2.2.3 基础库，以使用云能力')
	}else {
		wx.cloud.init({
			env: CLOUD_ENV
		})
	}
})

</script>

<style lang="scss">
.App {
  width: 100vw;
  height: 100vh;
  background-color: #e8eaed;
}
</style>
