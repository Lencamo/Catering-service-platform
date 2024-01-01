<template>
  <div class="store">
    <el-card shadow="never">
      <template #header>
        <h3>请完善你的店铺信息</h3>
      </template>
      <el-steps :active="active" :space="350" align-center>
        <el-step title="步骤一" />
        <el-step title="步骤二" />
        <el-step title="步骤三" />
      </el-steps>
      <div class="step-box">
        <el-button style="margin-top: 12px" @click="next">跳过</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 步骤条
const active = ref(1)
const next = () => {
  if (active.value++ > 2) active.value = 0
}
</script>

<style lang="scss" scoped>
.store {
  display: flex;
  flex-direction: column;

  padding: 100px;

  .el-steps {
    justify-content: center;

    margin-top: 20px;
  }

  .step-box {
    text-align: center;
  }
}
</style>
