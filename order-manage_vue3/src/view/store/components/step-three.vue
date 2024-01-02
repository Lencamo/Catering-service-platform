<template>
  <div class="step-three">
    <span>恭喜你！你已经成功注册了一个店铺！</span>
    <br />
    <el-button type="success" @click="$router.push('/home')">进入后台</el-button>
    <br />
    <el-button @click="$router.push('/main/setting')">完善更多信息</el-button>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.step-three {
  display: flex;
  flex-direction: column;
}
</style>
