<template>
  <div class="bill">
    <div class="search-box">
      <billHeader @query-list="handleQueryList" @reset-list="handleResetList"></billHeader>
    </div>
    <div class="list-table">
      <div class="list-table">
        <billBody ref="listTableRef" @edit-click="handleEditClick"></billBody>
      </div>
    </div>
    <billDialog ref="billDialogRef"></billDialog>
  </div>
</template>

<script setup lang="ts">
import billHeader from './components/bill-header.vue'
import billBody from './components/bill-body.vue'
import billDialog from './components/bill-dialog.vue'

import { ref } from 'vue'

const listTableRef = ref<InstanceType<typeof billBody>>()
const billDialogRef = ref<InstanceType<typeof billDialog>>()

// 显示查询结果
const handleQueryList = (payload: any) => {
  // console.log(payload)
  listTableRef.value?.getCurrentBillList(payload)
}

// 恢复默认列表
const handleResetList = () => {
  listTableRef.value?.getCurrentBillList()
}

// =======

// 接单按钮处理
const handleEditClick = (payload: any) => {
  billDialogRef.value?.setBillDialogVisible(payload)
}
</script>

<style lang="scss" scoped>
.bill {
  //
}
</style>
