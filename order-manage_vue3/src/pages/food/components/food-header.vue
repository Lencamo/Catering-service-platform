<template>
  <div class="food-header">
    <el-form label-position="right" label-width="70px" :model="searchForm" ref="searchFormRef">
      <el-row :gutter="40">
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="菜品类目" prop="roleId">
            <el-select placeholder="请选择菜品的类目" v-model="searchForm.category_id">
              <template v-for="item in categoryListAll" :key="item._id">
                <el-option :label="item.category" :value="item._id" />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" :lg="6">
          <div class="btn-box">
            <el-button type="primary" icon="Search" @click="conditionSearch">查询</el-button>
            <el-button icon="Refresh" @click="resetForm(searchFormRef)">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import useFoodStore from '@/stores/main/food'
import { storeToRefs } from 'pinia'

const searchForm = reactive({
  category_id: ''
})

// 部门列表数据
const foodStore = useFoodStore()
const { categoryListAll } = storeToRefs(foodStore)

const getCurrentCategoryList = async () => {
  await foodStore.getCategoryListAllAction()
}
getCurrentCategoryList()

// 自定义事件
const emit = defineEmits(['resetList', 'queryList'])

// 重置按钮
const searchFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()

  // 更新列表
  emit('resetList')
}

// 查询按钮
const conditionSearch = () => {
  emit('queryList', searchForm)
}
</script>

<style lang="scss" scoped>
.food-header {
  background: #ffffff;
  padding: 18px;

  .btn-box {
    text-align: right;
  }
}
</style>
