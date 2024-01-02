<template>
  <div class="step-one">
    <el-form
      ref="stepOneRef"
      :rules="formRules"
      :model="storeForm"
      label-position="top"
      label-width="100px"
    >
      <el-form-item label="店铺名称" prop="storename">
        <el-input v-model="storeForm.storename" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item label="店铺地址" prop="storelocal">
        <el-input v-model="storeForm.storelocal" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import useloginStore from '@/stores/login/login.ts'
import type { IStore } from '@/types/login/login'

const loginStore = useloginStore()

const stepOneRef = ref<FormInstance>()

// 表单数据
const storeForm = reactive<IStore>({
  storename: '',
  storelocal: ''
})

// 表单校验
const formRules = reactive<FormRules<typeof storeForm>>({
  storename: [
    { required: true, message: '店铺名称不能为空', trigger: 'blur' },
    { min: 2, max: 12, message: '店铺名称长度范围应在 2 - 12 之间', trigger: 'blur' }
  ],
  storelocal: [
    { required: true, message: '店铺地址不能为空', trigger: 'blur' },
    { min: 2, max: 50, message: '店铺地址长度范围应在 2 - 50 之间', trigger: 'blur' }
  ]
})

// =================

const emit = defineEmits(['stepChange'])

const submitForm = async () => {
  stepOneRef.value?.validate(async (valid, fields) => {
    if (valid) {
      // 店铺注册
      const result = await loginStore.storeRegisterAction(storeForm)

      // step跳转
      if (!result.code) {
        emit('stepChange', 2)
      }

      //
    } else {
      ElMessage.error('表单校验失败.')
    }
  })
}

const resetForm = () => {
  stepOneRef.value?.resetFields()
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
