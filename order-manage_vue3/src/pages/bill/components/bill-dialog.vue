<template>
  <div class="bill-dialog">
    <el-dialog
      @close="handleDialogClose"
      v-model="dialogVisible"
      title="订单详情"
      width="420px"
      align-center
      draggable
      center
    >
      <div class="order-box" v-for="(item, index) in dialogData">
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span style="font-weight: bold">第{{ dialogData!.length - index }}次点餐</span>
              <el-popconfirm
                v-if="!item.acceptStatus"
                title="是否帮助消费者取消当前点餐？"
                @confirm="handleRefuseOrderBtn(index)"
                width="250px"
              >
                <template #reference>
                  <el-button
                    v-if="!item.acceptStatus"
                    type="danger"
                    size="small"
                    :plain="!item.acceptStatus"
                  >
                    拒接
                  </el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                v-if="!item.acceptStatus"
                title="请注意当前点餐菜品是否售罄？"
                @confirm="handleAcceptOrderBtn(index)"
                width="250px"
              >
                <template #reference>
                  <el-button
                    v-if="!item.acceptStatus"
                    color="#626aef"
                    size="small"
                    :round="!item.acceptStatus"
                  >
                    接单
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
          <div class="card-content" v-for="order in item.orderListArr">
            <span>{{ order.foodname }}</span>
            <span>{{ order.foodOrderCount }}{{ order.unitname }}</span>
          </div>
          <div class="food-content">
            <span>共计：￥{{ item.orderMoneySum }}</span>
          </div>
          <template #footer>Footer content</template>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IBillData, IMenuList } from '@/types/main/bill'
import usebillStore from '@/stores/main/bill'

const dialogVisible = ref(false)

// 弹窗数据
let dialogData = ref<IMenuList[]>()

// 完整的订单数据
const billDetails = ref<IBillData>()

const setBillDialogVisible = (bill: IBillData) => {
  dialogVisible.value = true

  billDetails.value = bill
  dialogData.value = bill.menuList
}

defineExpose({ setBillDialogVisible })

// =====================

const billStore = usebillStore()

// 接单按钮
const handleAcceptOrderBtn = async (orderIndex: number) => {
  const result = await billStore.updateBillAcceptStatusAction({
    billId: billDetails.value?._id,
    unAcceptOrderNum: billDetails.value?.unAcceptOrderNum,
    orderIndex
  })

  if (!result.code) {
    dialogData.value![orderIndex].acceptStatus = true // 显示同步
  }
}

// 取消订单
const handleRefuseOrderBtn = async (orderIndex: number) => {
  const result = await billStore.deleteBillOrderListAction({
    billId: billDetails.value?._id,
    moneySum: billDetails.value?.moneySum,
    totalCount: billDetails.value?.totalCount,
    unAcceptOrderNum: billDetails.value?.unAcceptOrderNum,
    order: billDetails.value?.menuList[orderIndex]
  })

  if (!result.code) {
    dialogData.value?.splice(orderIndex, 1) // 显示同步
  }
}

// =====================

// dialog框消失后是否更新列表数据
const isAcceptAction = ref(false)

billStore.$onAction(({ name, after }) => {
  after((result) => {
    if (
      (name === 'updateBillAcceptStatusAction' || name === 'deleteBillOrderListAction') &&
      !result.code
    ) {
      isAcceptAction.value = true
    }
  })
})

const handleDialogClose = async () => {
  if (isAcceptAction.value) {
    await billStore.getBillListAction({
      offset: 0,
      size: 10
    })
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  max-height: 80%;
  overflow-y: scroll;

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .el-dialog__body {
    padding: 0px calc(var(--el-dialog-padding-primary));

    .el-card__header {
      padding: 10px var(--el-card-padding);
    }

    .el-card__body {
      padding: 10px var(--el-card-padding);
    }
  }
}

.bill-dialog {
  .order-box {
    margin: 20px 0px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-content {
    margin-bottom: 10px;
    padding: 0px 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .food-content {
    border-top: 1px solid #e4e7ed;
    padding-top: 10px;
    text-align: right;
  }
}
</style>
