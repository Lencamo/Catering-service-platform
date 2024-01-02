<template>
  <div class="step-one">
    <el-form ref="stepOneRef" :model="cardForm" label-position="top" label-width="100px">
      <el-form-item label="店铺名称" required prop="storename">
        <el-input v-model="cardForm.storename" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item label="店铺地址" required prop="storelocal">
        <el-input v-model="cardForm.storelocal" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button @click="resetForm(stepOneRef)">重置</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import useloginStore from '@/stores/login/login.ts'
import type { IStore } from '@/types/login/login'

const loginStore = useloginStore()

const stepOneRef = ref<FormInstance>()

// 表单数据
const cardForm = reactive<IStore>({
  storename: '',
  storelocal: ''
})

// =================

const emit = defineEmits(['stepChange'])

const submitForm = async () => {
  // 店铺注册
  const result = await loginStore.storeRegisterAction(cardForm)

  // step跳转
  if (!result.code) {
    emit('stepChange', 2)
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.step-one {
  .btn-box :deep(.el-form-item__content) {
    justify-content: space-between;

    margin-top: 40px;
  }
}
</style>
