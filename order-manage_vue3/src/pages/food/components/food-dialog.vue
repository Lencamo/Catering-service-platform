<template>
  <div class="food-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewDialog ? '新增菜品' : '编辑菜品'"
      width="350px"
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
        <el-form-item label="菜品单位">
          <el-select v-model="dialogData.unit_id" placeholder="请选择菜品单位">
            <template v-for="item in unitListAll" :key="item._id">
              <el-option :label="item.unitname" :value="item._id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品类目">
          <el-select v-model="dialogData.category_id" placeholder="请选择菜品类目">
            <template v-for="item in categoryListAll" :key="item._id">
              <el-option :label="item.category" :value="item._id" />
            </template>
          </el-select>
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
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import useFoodStore from '@/stores/main/food'
import { storeToRefs } from 'pinia'

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
  unit_id: '',
  category_id: ''
})

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
  } else {
    // 新增

    // -菜品数据
    for (const key in dialogData) {
      dialogData[key] = ''
    }
    dialogData.foodPrice = 0

    editFoodId.value = null
  }
}
defineExpose({ setFoodDialogVisible })

// Dialog确认按钮

const handleConfirmBtn = () => {
  dialogVisible.value = false

  if (!isNewDialog.value && editFoodId.value) {
    // 编辑
    foodStore.editFoodAction(editFoodId.value, dialogData)
  } else {
    // 新增
    foodStore.addFoodAction(dialogData)
  }
}
</script>

<style lang="scss" scoped>
.food-dialog {
  //
}
</style>
