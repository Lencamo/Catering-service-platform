<template>
  <div class="bill-header">
    <el-form label-position="right" label-width="70px" :model="searchForm" ref="searchFormRef">
      <el-row :gutter="40">
        <el-col :sm="12" :md="8" :lg="6">
          <el-form-item label="订单查询">
            <el-select placeholder="请选择订单状态" v-model="searchForm.orderStatus">
              <template v-for="item in statusList" :key="item.id">
                <el-option :label="item.labelName" :value="item.orderStatus" />
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

const statusList = reactive([
  {
    id: 0,
    orderStatus: 'all',
    labelName: '全部'
  },
  {
    id: 1,
    orderStatus: false,
    labelName: '待付款'
  },
  {
    id: 2,
    orderStatus: true,
    labelName: '已完成'
  }
])

const searchForm = reactive({
  orderStatus: ''
})

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
.bill-header {
  background: #ffffff;
  padding: 18px;

  .btn-box {
    text-align: right;
  }
}
</style>
