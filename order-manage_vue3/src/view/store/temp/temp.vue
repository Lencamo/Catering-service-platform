<template>
  <div class="store">
    <el-form :model="cardForm" label-position="top" label-width="100px" style="max-width: 460px">
      <el-form-item label="店铺名称">
        <el-input v-model="cardForm.storename" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="cardForm.storelocal" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="cardForm.storephone" minlength="2" maxlength="12" />
      </el-form-item>
      <el-form-item label="经营范围">
        <el-input
          v-model="cardForm.storeintro"
          type="textarea"
          maxlength="50"
          show-word-limit
          :autosize="{ minRows: 2, maxRows: 4 }"
        />
      </el-form-item>
      <el-form-item label="店铺logo">
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
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button @click="resetForm(pwdFormRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(pwdFormRef)">确认</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="handleConfirmBtn">确认</el-button> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { IStoreData } from '@/types/main/setting'
import type {
  UploadUserFile,
  UploadProps,
  UploadInstance,
  UploadFile,
  FormInstance
} from 'element-plus'
import useSettingStore from '@/stores/main/setting'
import { storeToRefs } from 'pinia'
import defaultLogo from '@/assets/imgs/default.jpg'

const pwdFormRef = ref<FormInstance>()

// 表单数据
const cardForm = reactive<IStoreData>({
  storename: '',
  storelocal: '',
  storephone: '',
  storeintro: ''
})
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

const submitForm = (formEl: FormInstance | undefined) => {
  //
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.store {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>
