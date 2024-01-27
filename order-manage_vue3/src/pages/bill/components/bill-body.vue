<template>
  <div class="bill-body">
    <div class="top-box">
      <h3>订单列表</h3>
    </div>
    <div class="center-box">
      <el-table :data="billList" style="width: 100%" border>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="tableName" label="就餐桌号" align="center" min-width="110" />
        <el-table-column label="就餐人数" align="center" min-width="110">
          <template #default="scope">{{ scope.row.dineNumber }} 人</template>
        </el-table-column>
        <el-table-column label="消费金额" align="center" min-width="110">
          <template #default="scope"> ￥{{ scope.row.moneySum }} </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" align="center" width="240" />
        <el-table-column prop="orderNumber" label="订单编号" align="center" width="240" />
        <el-table-column fixed="right" label="订单操作" width="180" align="center">
          <template #default="scope">
            <el-button
              v-if="!scope.row.orderStatus"
              type="warning"
              size="small"
              icon="Bell"
              @click="handleEditBtn(scope.row)"
            >
              接单
            </el-button>
            <el-popconfirm
              title="你确定当前订单消费者已完成付款了吗？"
              @confirm="handleDelectBtn(scope.row._id)"
              width="200px"
            >
              <template #reference>
                <el-button
                  :type="scope.row.orderStatus ? 'info' : 'success'"
                  :plain="scope.row.orderStatus"
                  :icon="scope.row.orderStatus ? '' : 'Finished'"
                  size="small"
                >
                  {{ scope.row.orderStatus ? '已完成' : '结账' }}
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-box">
      <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40]"
        v-model:current-page="currentPage"
        :total="billTotalCount"
        layout="sizes, prev, pager, next, jumper, total"
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import usebillStore from '@/stores/main/bill'
import type { IBillData } from '@/types/main/bill'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

// 分页器数据
const billStore = usebillStore()
const { billTotalCount, billList } = storeToRefs(billStore)

const currentPage = ref(1)
const pageSize = ref(10)

// 未结账订单bill下的每次order是否都已经接单
// const isOrderAllAccept = computed(() => {
//   billList.value
// })

// 获取bill列表数据
const getCurrentBillList = (payload: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { offset, size, ...payload }

  billStore.getBillListAction(queryInfo)
}
defineExpose({ getCurrentBillList })

// 初次进入页面时
getCurrentBillList()

// 列表的size变化处理
const handleSizeChange = (size: number) => {
  // console.log(size)
  getCurrentBillList()
}
// 列表的当前页变化处理
const handleCurrentChange = (page: number) => {
  // console.log(page)
  getCurrentBillList()
}

// 菜品删除按钮
const handleDelectBtn = (billId: string) => {
  // console.log(billId)
  // billStore.delectbillAction(billId)
}

const emit = defineEmits(['addClick', 'editClick'])

// 新增菜品按钮
const handleAddBtn = () => {
  emit('addClick')
}
// 编辑菜品按钮
const handleEditBtn = (bill: IBillData) => {
  emit('editClick', bill)
}
</script>

<style lang="scss" scoped>
.bill-body {
  background: #ffffff;
  padding: 18px;

  margin-top: 20px;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .center-box {
    margin-top: 18px;
  }

  .foot-box {
    margin-top: 18px;

    display: flex;
    justify-content: flex-end;
  }
}
</style>