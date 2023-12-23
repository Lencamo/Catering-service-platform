<template>
  <div class="settting-dialog">
    <el-dialog v-model="dialogVisible" :title="cardData.title" width="30%" draggable>
      <el-form :model="FormData" label-position="top" label-width="100px" style="max-width: 460px">
        <template v-for="item in cardData.heads">
          <!--  -->
          <span v-if="item.type === 'text'">
            <el-form-item :label="item.name">
              <el-input v-model="FormData[item.variable]" />
            </el-form-item>
          </span>
          <span v-if="item.type === 'image'">
            <div style="padding-bottom: 12px">{{ item.name }}</div>
            <el-upload v-model:file-list="fileList" list-type="picture-card">
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
import type { UploadProps, UploadUserFile } from 'element-plus'

const dialogVisible = ref(false)

// 卡片数据
let cardData: ICardData = reactive({
  title: '',
  heads: []
})

// 表单数据
let FormData: any = reactive({})

// 图片数据
const fileList = ref<UploadUserFile[]>([])

// 显示弹窗
const setSettingDialogVisible = (payload: ICardData) => {
  dialogVisible.value = true

  // 移除表单验证
  // 交给后端算了😂

  // 更新FormData属性
  FormData = {}

  // 初始化数据
  cardData = payload
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
