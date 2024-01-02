<template>
  <div class="step-one">
    <el-form :model="cardForm" label-position="top" label-width="100px">
      <el-form-item label="店铺名称" required>
        <el-input v-model="cardForm.storename" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item label="店铺地址" required>
        <el-input v-model="cardForm.storelocal" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button @click="resetForm(pwdFormRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(pwdFormRef)">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import { localCache } from '@/utils/cache'
import { REGISTER_STORE } from '@/config/constants'

const pwdFormRef = ref<FormInstance>()

// 表单数据
const cardForm = reactive({
  storename: '',
  storelocal: ''
})

// =================

const emit = defineEmits(['stepChange'])

const submitForm = (formEl: FormInstance | undefined) => {
  // 提交表单
  //
  // step跳转
  emit('stepChange', 2)

  // 注册完成标记
  localCache.setCache(REGISTER_STORE, true)
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
