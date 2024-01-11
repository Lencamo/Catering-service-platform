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
