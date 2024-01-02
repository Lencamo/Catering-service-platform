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
      <el-button @click="skipStep">跳过</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
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
import { localCache } from '@/utils/cache'
import { LOGIN_STOREINFO, LOGIN_TOKEN } from '@/config/constants'
import useSettingStore from '@/stores/main/setting'

const settingStore = useSettingStore()
const pwdFormRef = ref<FormInstance>()

const cacheUrl =
  localCache.getCache(LOGIN_STOREINFO) && localCache.getCache(LOGIN_STOREINFO).logo.url

console.log(localCache.getCache(LOGIN_STOREINFO).logo.url)

// 图片数据
let logoList = ref<UploadUserFile[]>([
  {
    name: 'logo',
    url: cacheUrl || defaultLogo
  }
])
// =================

// 文件上传处理
const uploadRef = ref<UploadInstance>()
let BASE_URL = import.meta.env.VITE_BASE_API
let token = localCache.getCache(LOGIN_TOKEN)

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
}
const handleUploadError = (response: any, uploadFile: UploadFile) => {
  ElMessage.error('店铺logo上传失败')
}

// =================

const emit = defineEmits(['stepChange'])

const submitForm = async () => {
  // 上传logo
  uploadRef.value!.submit()

  // 更新storeInfo
  await settingStore.getStoreInfoAction()

  // step跳转
  emit('stepChange', 3)
}

const skipStep = () => {
  // step跳转
  emit('stepChange', 3)
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
