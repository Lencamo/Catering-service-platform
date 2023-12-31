<template>
  <div class="userCard">
    <!-- 内容显示 -->
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>用户信息</h3>
          <el-button type="success" @click="handleEditBtn()">修改</el-button>
        </div>
      </template>
      <div class="body-box">
        <span>
          <el-text tag="b">用户名称：</el-text>
          <el-text tag="ins">{{ userInfo.username }}</el-text>
        </span>
        <span>
          <el-text tag="b">用户密码：</el-text>
          <el-text tag="ins">******</el-text>
        </span>
        <span>
          <el-text tag="b">用户头像：</el-text>
          <el-avatar
            shape="square"
            :size="100"
            fit="cover"
            :src="userInfo.avatar.url ?? defaultAvatar"
          />
        </span>
      </div>
    </el-card>
    <!-- 修改弹窗 -->
    <el-dialog v-model="dialogVisible" title="用户信息" width="400px" draggable>
      <el-form :model="cardForm" label-position="top" label-width="100px" style="max-width: 460px">
        <el-form-item label="用户名称">
          <el-input v-model="cardForm.username" minlength="2" maxlength="12" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input disabled type="password" v-model="cardForm.password" />
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            ref="uploadRef"
            :action="avatarUploadAction"
            :headers="uploadActionHeaders"
            name="avatar"
            :before-upload="beforeAvatarUpload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            v-model:file-list="avatarList"
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
import { ref, reactive, computed } from 'vue'
import type { IUserData } from '@/types/main/setting'
import useSettingStore from '@/stores/main/setting'
import { storeToRefs } from 'pinia'
import type { UploadUserFile, UploadProps, UploadInstance, UploadFile } from 'element-plus'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/config/constants'
import defaultAvatar from '@/assets/imgs/default.png'
import { logoutAction } from '@/utils/handle-logout'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
let cardForm = reactive<IUserData>({
  username: '',
  password: ''
})
// 图片数据
let avatarList = ref<UploadUserFile[]>([
  {
    name: 'avatar',
    url: defaultAvatar
  }
])

// =================

// 显示用户信息（首次使用LOGIN_USERINFO数据）
const settingStore = useSettingStore()
const { userInfo } = storeToRefs(settingStore)

// 修改用户信息
const handleEditBtn = async () => {
  dialogVisible.value = true

  cardForm.username = userInfo.value.username
  cardForm.password = userInfo.value.password
  avatarList.value[0] = userInfo.value.avatar
}

// =================

// 文件上传处理
const uploadRef = ref<UploadInstance>()
let BASE_URL = import.meta.env.VITE_BASE_API
let token = localCache.getCache(LOGIN_TOKEN)

// - 请求url
const avatarUploadAction = computed(() => {
  return `${BASE_URL}/file/avatar`
})
// - 携带token
const uploadActionHeaders = computed(() => {
  return {
    Authorization: `Bearer ${token}`
  }
})

// - 文件限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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

  // 更新用户头像
  // - 手动启动
  uploadRef.value!.submit()

  // 更新用户名称
  if (cardForm.username !== userInfo.value.username) {
    const useId = userInfo.value._id
    const data = {
      username: cardForm.username
    }

    const code = await settingStore.updataUsernameAction(useId, data)
    if (!code) {
      logoutAction(router)
    }
  }
}

// 头像上传-成功回调
const handleUploadSuccess = async (response: any, uploadFile: UploadFile) => {
  ElMessage.success('用户头像上传成功')

  userInfo.value.avatar.url = URL.createObjectURL(uploadFile.raw!)
}
const handleUploadError = (response: any, uploadFile: UploadFile) => {
  ElMessage.error('用户头像上传失败')
}
</script>

<style lang="scss" scoped>
.userCard {
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
