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
import type { ICardData } from '@/types/main/setting.d.ts'

import useloginStore from '@/stores/login/login'
const loginStore = useloginStore()

// 卡片信息
const storeCard = reactive<ICardData>({
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
  ],
  formData: {
    storename: '仙之源饭店',
    address: '上海市黄浦区南京东路123号',
    image: {
      name: 'avatar',
      logo_url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
})

const userCard = reactive<ICardData>({
  title: '用户信息',
  heads: [
    {
      type: 'text',
      name: '用户名称',
      value: 'wang',
      variable: 'username'
    },
    {
      type: 'password',
      name: '用户密码',
      value: 'wang******',
      variable: 'password'
    },
    {
      type: 'image',
      name: '用户头像',
      value: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
      variable: 'avatar_url'
    }
  ],
  formData: {
    username: 'wang',
    password: 'wang******',
    image: {
      name: 'avatar',
      avatar_url: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
    }
  }
})

// 修改按钮处理
const settingDialogRef = ref<InstanceType<typeof settingDialog>>()

const handleEditClick = (title: string) => {
  console.log(userCard)
  const cardData = title === storeCard.title ? storeCard : userCard
  settingDialogRef.value?.setSettingDialogVisible(cardData)
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
