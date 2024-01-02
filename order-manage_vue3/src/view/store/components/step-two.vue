<template>
  <div class="step-two">
    <div class="upload-box">
      <el-upload
        ref="uploadRef"
        :action="logoUploadAction"
        :headers="uploadActionHeaders"
        name="logo"
        :before-upload="beforeLogoUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        v-model:file-list="logoList"
        :limit="1"
        list-type="picture-card"
        :auto-upload="false"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </div>
    <div class="btn-box">
      <el-button @click="resetForm(pwdFormRef)">重置</el-button>
      <el-button type="primary" @click="submitForm(pwdFormRef)">确认</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type {
  UploadUserFile,
  UploadProps,
  UploadInstance,
  UploadFile,
  FormInstance
} from 'element-plus'
import defaultLogo from '@/assets/imgs/default.jpg'

const pwdFormRef = ref<FormInstance>()

// 图片数据
let logoList = ref<UploadUserFile[]>([
  {
    name: 'logo',
    url: defaultLogo
  }
])

// =================

// 文件上传处理
const uploadRef = ref<UploadInstance>()
let BASE_URL = import.meta.env.VITE_BASE_API
let token = localCache.getCache(LOGIN_TOKEN)
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/config/constants'

// - 请求url
const logoUploadAction = computed(() => {
  return `${BASE_URL}/file/logo`
})
// - 携带token
const uploadActionHeaders = computed(() => {
  return {
    Authorization: `Bearer ${token}`
  }
})

// - 文件限制
const beforeLogoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isJPGorPNG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png'
  const isLt2M = rawFile.size / 1024 / 1024 < 2

  if (!isJPGorPNG) {
    ElMessage.error('上传文件只能是 JPG/PNG 格式!') // 也可以使用el-upload组件的accept属性
    return false
  }

  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 2MB!')
    return false
  }
  return isJPGorPNG && isLt2M
}

// logo上传-成功回调
const handleUploadSuccess = async (response: any, uploadFile: UploadFile) => {
  ElMessage.success('店铺logo上传成功')

  // storeInfo.value.logo.url = URL.createObjectURL(uploadFile.raw!)
  // 跳转页面
}
const handleUploadError = (response: any, uploadFile: UploadFile) => {
  ElMessage.error('店铺logo上传失败')
}

// =================

const emit = defineEmits(['stepChange'])

const submitForm = (formEl: FormInstance | undefined) => {
  // 提交表单
  //
  // step跳转
  emit('stepChange', 3)
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.step-two {
  .btn-box {
    display: flex;
    justify-content: space-between;

    margin-top: 20px;
  }
}
</style>
