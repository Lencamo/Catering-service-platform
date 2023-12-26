<template>
  <div class="settting-dialog">
    <el-dialog v-model="dialogVisible" :title="cardData.title" width="400px" draggable>
      <el-form :model="cardForm" label-position="top" label-width="100px" style="max-width: 460px">
        <template v-for="item in cardData.heads">
          <!--  -->
          <span v-if="item.type === 'text'">
            <el-form-item :label="item.name">
              <el-input v-model="cardForm[item.variable]" />
            </el-form-item>
          </span>
          <span v-if="item.type === 'password'">
            <el-form-item :label="item.name">
              <el-input type="password" show-password v-model="cardForm[item.variable]" />
            </el-form-item>
          </span>
          <span v-if="item.type === 'image'">
            <div style="padding-bottom: 12px">{{ item.name }}</div>
            <el-upload
              ref="uploadRef"
              v-model:file-list="FileList"
              list-type="picture-card"
              :limit="1"
              :auto-upload="false"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </span>
        </template>
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
import { ref, reactive } from 'vue'
import type { ICardData } from '@/types/main/setting.d.ts'
import { Plus } from '@element-plus/icons-vue'
import type { UploadUserFile } from 'element-plus'

const dialogVisible = ref(false)

// 卡片数据
let cardData: ICardData = reactive({
  title: '',
  heads: [],
  formData: {}
})

// 表单数据
let cardForm = reactive<any>({})

// 图片数据
const FileList = ref<UploadUserFile[]>([
  {
    name: 'file',
    url: ''
  }
])

// upload组件
// - 覆盖前一个图片
// 略

// - 预览选中的图片
// 略

// 显示弹窗
const setSettingDialogVisible = (payload: ICardData) => {
  dialogVisible.value = true

  // 移除表单验证
  // 交给后端算了😂

  // 更新cardForm属性
  cardData = {
    title: '',
    heads: [],
    formData: {}
  }
  cardForm = null

  // 初始化数据
  const { formData } = payload
  cardData = payload
  cardForm = formData

  FileList.value[0].url = cardForm.image[Object.keys(cardForm.image)[1]]
}

defineExpose({ setSettingDialogVisible })

// 表单验证
// 交给后端算了😂

// 确认按钮
const handleConfirmBtn = () => {
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.settting-dialog {
  //
}
</style>
