<template>
  <div class="setting">
    <div class="setting-body">
      <settingCard :cardData="storeCard" @editClick="handleEditClick"></settingCard>
      <settingCard :cardData="userCard" @editClick="handleEditClick"></settingCard>
    </div>
    <settingDialog ref="settingDialogRef"></settingDialog>
  </div>
</template>

<script setup lang="ts">
import settingCard from './components/settting-card.vue'
import settingDialog from './components/setting-dialog.vue'

import { ref, reactive } from 'vue'
import { dataToCard } from '@/utils/dataToCard.ts'

import { storeToRefs } from 'pinia'
import useloginStore from '@/stores/login/login'

// 卡片信息
import userCard from './cards/userCard.ts'
import storeCard from './cards/storeCard.ts'

// 显示用户信息
const loginStore = useloginStore()
const { userInfo } = storeToRefs(loginStore)
dataToCard(userCard, userInfo.value)

// 显示店铺信息

// 修改按钮处理
const settingDialogRef = ref<InstanceType<typeof settingDialog>>()

const handleEditClick = (title: string) => {
  const cardData = title === storeCard.title ? storeCard : userCard
  const temp = { ...cardData }

  settingDialogRef.value?.setSettingDialogVisible(temp)
}
</script>

<style lang="scss" scoped>
.setting {
  .setting-body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
