<template>
  <div class="food-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewDialog ? '新增菜品' : '编辑菜品'"
      width="450px"
      align-center
      draggable
    >
      <el-form :model="dialogData" ref="dialogFormRef" label-position="right" label-width="80px">
        <el-form-item label="菜品名称">
          <el-input v-model="dialogData.foodname" />
        </el-form-item>
        <el-form-item label="菜品价格">
          <el-input-number
            v-model="dialogData.foodPrice"
            :min="0"
            :step="0.5"
            :precision="2"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item v-if="!isNewDialog" label="菜品状态">
          <el-switch
            v-model="dialogData.onSale"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="在售"
            inactive-text="售馨"
          />
        </el-form-item>
        <el-form-item label="菜品单位">
          <el-select v-model="dialogData.unitname" placeholder="请选择菜品单位">
            <template v-for="item in unitListAll" :key="item._id">
              <el-option :label="item.unitname" :value="item.unitname" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品类目">
          <el-select v-model="dialogData.category" placeholder="请选择菜品类目">
            <template v-for="item in categoryListAll" :key="item._id">
              <el-option :label="item.category" :value="item.category" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品图片">
          <el-upload
            ref="uploadRef"
            :action="foodUploadAction"
            :headers="uploadActionHeaders"
            name="food"
            :before-upload="beforeLogoUpload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            v-model:file-list="foodList"
            :limit="1"
            list-type="picture-card"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmBtn">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type {
  FormInstance,
  UploadUserFile,
  UploadProps,
  UploadInstance,
  UploadFile
} from 'element-plus'
import useFoodStore from '@/stores/main/food'
import { storeToRefs } from 'pinia'
import defaultLogo from '@/assets/imgs/default.jpg'

const dialogVisible = ref(false)
const dialogFormRef = ref<FormInstance>()

// 初始化下列菜单数据
const foodStore = useFoodStore()
const { categoryListAll, unitListAll } = storeToRefs(foodStore)

const initEntireData = async () => {
  await foodStore.getEntireDataAction()
}
initEntireData()

// 弹窗数据
const dialogData = reactive<any>({
  foodname: '',
  foodPrice: 0,
  onSale: true,
  unitname: '',
  category: '',
  _id: '' // 供菜品图片上传接口使用
})

// 图片数据
let foodList = ref<UploadUserFile[]>([
  {
    name: 'food',
    url: defaultLogo
  }
])

// ==============

// 文件上传处理
const uploadRef = ref<UploadInstance>()
let BASE_URL = import.meta.env.VITE_BASE_API
let token = localCache.getCache(LOGIN_TOKEN)
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/config/constants'

// - 请求url
const foodUploadAction = computed(() => {
  return `${BASE_URL}/file/oss/${dialogData._id}`
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

// 显示弹窗
const isNewDialog = ref(true)
const editFoodId = ref()

const setFoodDialogVisible = (isNew: boolean, food?: any) => {
  dialogVisible.value = true

  isNewDialog.value = isNew

  // 初始化Dialog数据
  if (!isNew && food) {
    // 编辑

    // -菜品数据
    for (const key in dialogData) {
      dialogData[key] = food[key]
    }
    editFoodId.value = food._id

    // - 菜品图片
    if (food.food.url) {
      foodList.value[0].url = food.food.url
    } else {
      foodList.value[0].url = defaultLogo
    }
  } else {
    // 新增

    // -菜品数据
    for (const key in dialogData) {
      dialogData[key] = ''
    }
    dialogData.foodPrice = 0

    // - 菜品图片
    foodList.value[0].url = defaultLogo

    editFoodId.value = null
  }
}
defineExpose({ setFoodDialogVisible })

// Dialog确认按钮
const handleConfirmBtn = async () => {
  dialogVisible.value = false

  if (!isNewDialog.value && editFoodId.value) {
    // 编辑
    // - 更新菜品信息
    await foodStore.editFoodAction(editFoodId.value, dialogData)
  } else {
    // 新增
    // - 新增菜品
    const result = await foodStore.addFoodAction(dialogData)

    // - 标记新菜品_id👏
    dialogData._id = result.data.id_list[0]
  }

  // 处理菜品图片
  uploadRef.value!.submit()
}

// 图片上传-成功回调
const handleUploadSuccess = async (response: any, uploadFile: UploadFile) => {
  ElMessage.success('菜品图片上传成功')

  // 更新列表
  foodStore.getFoodListAction({ size: 5, offset: 0 })
}
const handleUploadError = (response: any, uploadFile: UploadFile) => {
  ElMessage.error('菜品图片上传失败')
}
</script>

<style lang="scss" scoped>
.food-dialog {
  //
}
</style>
