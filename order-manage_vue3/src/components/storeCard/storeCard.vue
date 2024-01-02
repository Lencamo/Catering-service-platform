<template>
  <div class="storeCard">
    <!-- 内容显示 -->
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>店铺信息</h3>
          <el-button type="success" @click="handleEditBtn()">修改</el-button>
        </div>
      </template>
      <div class="body-box">
        <span>
          <el-text tag="b">店铺名称：</el-text>
          <el-text tag="ins">{{ storeInfo.storename }}</el-text>
        </span>
        <span>
          <el-text tag="b">店铺地址：</el-text>
          <el-text tag="ins">{{ storeInfo.storelocal }}</el-text>
        </span>
        <span>
          <el-text tag="b">联系电话：</el-text>
          <el-text tag="ins">{{ storeInfo.storephone || '无' }}</el-text>
        </span>
        <span>
          <el-text tag="b">经营范围：</el-text>
          <el-text tag="ins">{{ storeInfo.storeintro || '无' }}</el-text>
        </span>
        <span>
          <el-text tag="b">店铺Login：</el-text>
          <el-avatar
            shape="square"
            :size="100"
            fit="cover"
            :src="storeInfo.logo.url ?? defaultLogo"
          />
        </span>
      </div>
    </el-card>
    <!-- 修改弹窗 -->
    <el-dialog v-model="dialogVisible" title="店铺信息" width="400px" draggable>
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
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmBtn">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { IStoreData } from '@/types/main/setting'
import type { UploadUserFile, UploadProps, UploadInstance, UploadFile } from 'element-plus'
import useSettingStore from '@/stores/main/setting'
import { storeToRefs } from 'pinia'
import defaultLogo from '@/assets/imgs/default.jpg'

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

// 显示店铺信息（首次使用LOGIN_STOREINFO数据）
const settingStore = useSettingStore()
const { storeInfo } = storeToRefs(settingStore)

// 修改店铺信息
const handleEditBtn = () => {
  dialogVisible.value = true

  for (const key in cardForm) {
    // 细节bug修复（对接于后台接口数据校验问题）
    if (storeInfo.value[key] === null) {
      storeInfo.value[key] = ''
    }

    cardForm[key] = storeInfo.value[key]
  }

  // 是否使用默认值
  if (storeInfo.value.logo.url) {
    logoList.value[0] = storeInfo.value.logo
  }
}

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

// =================

// Dialog弹窗
const dialogVisible = ref(false)

const handleConfirmBtn = async () => {
  dialogVisible.value = false

  // 更新店铺信息
  const data = cardForm
  await settingStore.updateStoreInfoAction(data)

  // 更新店铺logo
  // - 手动启动
  uploadRef.value!.submit()
}

// logo上传-成功回调
const handleUploadSuccess = async (response: any, uploadFile: UploadFile) => {
  ElMessage.success('店铺logo上传成功')

  storeInfo.value.logo.url = URL.createObjectURL(uploadFile.raw!)
}
const handleUploadError = (response: any, uploadFile: UploadFile) => {
  ElMessage.error('店铺logo上传失败')
}
</script>

<style lang="scss" scoped>
.storeCard {
  padding: 18px;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .body-box {
    display: flex;
    flex-direction: column;

    span {
      margin: 10px 0px;
      vertical-align: text-top;
    }
  }
}
</style>
