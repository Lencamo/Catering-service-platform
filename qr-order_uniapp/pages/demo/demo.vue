<template>
  <view class="demo">
    <button type="primary" @click="getUserMsg">调用云函数</button>
    <view>云开发测试结果为：</view>
    <view>
      <text space="ensp" user-select>{{ result }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { demoApi } from '../../service/demo'

// 测试操作
// 2、云开发测试
const result = ref('')
const getUserMsg = async () => {
  const { result: res } = await demoApi()
  // console.log('云开发测试结果：',res)
  result.value = JSON.stringify(res, null, '\t  ')
}
</script>

<style lang="scss" scoped>
.demo {
  //
}
</style>
