<template>
  <div class="store">
    <el-card shadow="never">
      <template #header>
        <div class="top-box">
          <h3>请完善你的店铺信息</h3>
          <el-button v-if="stepJump.activeStep === 3" @click="handlePrev">上一步</el-button>
        </div>
      </template>
      <el-steps :active="stepJump.activeStep" :space="350" align-center>
        <el-step title="店铺注册" />
        <el-step title="logo上传" />
        <el-step title="其他信息" />
      </el-steps>
      <div class="step-box">
        <step-one v-show="stepJump.activeStep === 1" @stepChange="stepChange"></step-one>
        <step-two v-show="stepJump.activeStep === 2" @stepChange="stepChange"></step-two>
        <step-three v-show="stepJump.activeStep === 3" @stepChange="stepChange"></step-three>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import stepOne from './components/step-one.vue'
import stepTwo from './components/step-two.vue'
import stepThree from './components/step-three.vue'

const stepJump = reactive({
  activeStep: 1, //  步骤条
  prevBtn: false
})

// 上一步按钮
const handlePrev = () => {
  stepJump.activeStep = 2
}

// step页跳转
const stepChange = (step: number) => {
  stepJump.activeStep = step
}
</script>

<style lang="scss" scoped>
.store {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0px 250px;
  height: 100%;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-steps {
    justify-content: center;

    margin-top: 20px;
  }

  .step-box {
    margin: 20px 0px;
    height: 300px;

    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.el-form) {
      width: 350px;
    }
  }
}
</style>
