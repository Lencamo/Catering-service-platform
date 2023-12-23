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

// 卡片信息
const storeCard = reactive({
  title: '店铺信息',
  heads: [
    {
      type: 'text',
      name: '店铺名称',
      value: '仙之源饭店',
      variable: 'storename'
    },
    {
      type: 'text',
      name: '店铺地址',
      value: '上海市黄浦区南京东路123号',
      variable: 'address'
    },
    {
      type: 'image',
      name: '店铺Login',
      value: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      variable: 'logo_url'
    }
  ]
})
const userCard = reactive({
  title: '用户信息',
  heads: [
    {
      type: 'text',
      name: '用户名称',
      value: 'wang',
      variable: 'username'
    },
    {
      type: 'text',
      name: '用户密码',
      value: 'wang******',
      variable: 'password'
    },
    {
      type: 'image',
      name: '用户头像',
      value: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      variable: 'avatar_url'
    }
  ]
})

// 修改按钮处理
const settingDialogRef = ref<InstanceType<typeof settingDialog>>()

const handleEditClick = (title: string) => {
  settingDialogRef.value?.setSettingDialogVisible(title === storeCard.title ? storeCard : userCard)
}
</script>

<style lang="scss" scoped>
.setting {
  .setting-body {
    display: flex;
  }
}
</style>
