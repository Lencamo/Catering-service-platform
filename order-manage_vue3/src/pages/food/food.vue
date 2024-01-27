<template>
  <div class="food">
    <div class="search-box">
      <foodHeader @query-list="handleQueryList" @reset-list="handleResetList"></foodHeader>
    </div>
    <div class="list-table">
      <div class="list-table">
        <foodBody
          ref="listTableRef"
          @add-click="handleAddClick"
          @edit-click="handleEditClick"
        ></foodBody>
      </div>
    </div>
    <foodDialog ref="foodDialogRef"></foodDialog>
  </div>
</template>

<script setup lang="ts">
import foodHeader from './components/food-header.vue'
import foodBody from './components/food-body.vue'
import foodDialog from './components/food-dialog.vue'

import { ref } from 'vue'

const listTableRef = ref<InstanceType<typeof foodBody>>()
const foodDialogRef = ref<InstanceType<typeof foodDialog>>()

// 显示查询结果
const handleQueryList = (payload: any) => {
  // console.log(payload)
  listTableRef.value?.getCurrentFoodList(payload)
}

// 恢复默认列表
const handleResetList = () => {
  listTableRef.value?.getCurrentFoodList()
}

// =======

const isNew = ref<boolean>(true)

// 新增按钮处理
const handleAddClick = () => {
  isNew.value = true
  foodDialogRef.value?.setFoodDialogVisible(isNew.value)
}
// 编辑按钮处理
// const handleEditClick = (payload: IFoodList) => {
const handleEditClick = (payload: any) => {
  isNew.value = false
  foodDialogRef.value?.setFoodDialogVisible(isNew.value, payload)
}
</script>

<style lang="scss" scoped>
.food {
  //
}
</style>
