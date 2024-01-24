<template>
  <view class="bill">
    <h2>bill</h2>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userBillStore from '../../stores/bill'
import { IBill } from '../../types/bill'
import { storeToRefs } from 'pinia'

const billStore = userBillStore()

// 未结账订单数据
const unFinishAllBill = ref<IBill>()

const orderDataInit = async () => {
  // - 菜品类目列表、菜品列表
  await billStore.getCustomerUnFinishBillAction()
  const { unFinishBill } = storeToRefs(billStore)
  unFinishAllBill.value = unFinishBill.value

  console.log(unFinishAllBill.value)
}
orderDataInit()
</script>

<style lang="scss" scoped>
.bill {
  //
}
</style>
