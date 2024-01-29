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
        <el-table-column
          class="operator-box"
          fixed="right"
          label="订单操作"
          width="200"
          align="center"
        >
          <template #default="scope">
            <span class="accept-box" v-if="!scope.row.orderStatus">
              <el-button
                :type="!scope.row.unAcceptOrderNum ? 'info' : 'warning'"
                :plain="!scope.row.unAcceptOrderNum"
                size="small"
                icon="Bell"
                @click="handleEditBtn(scope.row)"
              >
                接单
              </el-button>
              <div v-if="scope.row.unAcceptOrderNum" class="circle-box">
                {{ scope.row.unAcceptOrderNum }}
              </div>
            </span>
            <el-popconfirm
              title="你确定当前订单消费者已完成付款了吗？"
              @confirm="handleDelectBtn(scope.row)"
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
import { ref } from 'vue'

// 分页器数据
const billStore = usebillStore()
const { billTotalCount, billList } = storeToRefs(billStore)

const currentPage = ref(1)
const pageSize = ref(10)

// ============

// 获取bill列表数据
const getCurrentBillList = async (payload: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { offset, size, ...payload }

  await billStore.getBillListAction(queryInfo)
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

// ============

// 订单结账按钮
const handleDelectBtn = async (bill: IBillData) => {
  const { _id: billId, unAcceptOrderNum } = bill

  if (unAcceptOrderNum) {
    ElMessage({
      message: '当前订单内的某次点餐并未处理，请先处理！',
      type: 'error'
    })
  } else {
    await billStore.finishBillAction(billId)
  }
}

const emit = defineEmits(['editClick'])

// 编辑订单按钮
const handleEditBtn = (bill: IBillData) => {
  emit('editClick', bill)
}
</script>

<style lang="scss" scoped>
// - 数字圆圈
@mixin circleStyle($size, $color) {
  font-size: $size * 0.63;
  color: #ffffff;
  font-weight: 500;
  line-height: $size;
  text-align: center;

  width: $size;
  height: $size;
  border-radius: $size * 0.5;
  background-color: $color;
}

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

    // - 数字圆圈显示
    .el-table :deep(.cell) {
      overflow: visible;
    }

    .accept-box {
      position: relative;
      margin-right: 12px;
      height: 100%;

      .circle-box {
        position: absolute;
        top: -7px;
        right: -7px;
        @include circleStyle(15px, red);
      }
    }
  }

  .foot-box {
    margin-top: 18px;

    display: flex;
    justify-content: flex-end;
  }
}
</style>
