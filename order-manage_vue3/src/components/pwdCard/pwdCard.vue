<template>
  <div class="pwdCard">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>修改密码</h3>
        </div>
      </template>
      <div class="core-box">
        <p>
          <el-text tag="b">
            &emsp;&emsp;由于用户密码node后端采用了md5加密算法（不可逆），所以密码修改是需要单独进行的。
          </el-text>
        </p>
        <p>
          <el-text tag="b">
            &emsp;&emsp;这也是真实开发中采用的方式，往往还会追加手机号验证，以确保密码修改的安全性。
          </el-text>
        </p>
        <el-form
          ref="pwdFormRef"
          :model="pwdForm"
          :rules="formRules"
          label-position="top"
          status-icon
        >
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="pwdForm.oldPwd" type="password" show-password autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwdForm.newPwd" type="password" show-password autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="pwdForm.checkPass"
              type="password"
              show-password
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button @click="resetForm(pwdFormRef)">重置</el-button>
            <el-button type="primary" @click="submitForm(pwdFormRef)">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { IPwdData } from '@/types/main/setting'

const pwdFormRef = ref<FormInstance>()

// 表单数据
const pwdForm = reactive<IPwdData>({
  oldPwd: '',
  newPwd: '',
  checkPass: ''
})

// 数据校验
const formRules = reactive<FormRules<IPwdData>>({
  oldPwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码需要由数字和英文字母组成',
      trigger: 'blur'
    },
    { min: 6, max: 12, message: '密码长度范围为：6-12', trigger: 'change' }
  ],
  newPwd: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      message: '密码需要由数字和英文字母组成',
      trigger: 'blur'
    },
    { min: 6, max: 12, message: '密码长度范围为：6-12', trigger: 'change' }
  ],
  checkPass: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('密码不能为空'))
        } else if (value !== pwdForm.newPwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  //
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.pwdCard {
  padding: 18px;

  .core-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 10px 0px;
    }

    .el-form {
      width: 280px;
      padding: 15px 20px 0px;
      border: 1px solid #e4e7ed;

      margin-top: 20px;

      .btn-box :deep(.el-form-item__content) {
        justify-content: space-around;
      }
    }
  }
}
</style>
