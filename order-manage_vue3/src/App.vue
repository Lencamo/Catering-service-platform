<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { goeasyConnect, goeasySubscribe } from './library/goEasy/index'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import usebillStore from '@/stores/main/bill'

const route = useRoute()
const billStore = usebillStore()

// 建立 goeasy 连接
goeasyConnect()

// 接收订阅消息
goeasySubscribe(async (channel: string, content: string) => {
  const msg = JSON.parse(content)

  // 消息提示（用户点餐时）
  if (msg.type === 'addOrder') {
    ElNotification({
      title: '提示',
      message: `${msg.value}`,
      type: 'warning'
    })
  }

  // 更新数据（用户点餐、用户取消点餐时）
  if (route.path === '/main/bill') {
    await await billStore.getBillListAction({ offset: 0, size: 10 })
  }
})
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #e8eaed;
  /* background: url(./assets/imgs/background.jpg) no-repeat;
  background-size: cover; */
}
</style>
