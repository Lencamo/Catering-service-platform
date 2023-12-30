<template>
  <div class="storeCard">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>店铺信息</h3>
          <el-button type="success" @click="handleEditBtn()">修改</el-button>
        </div>
      </template>
      <div class="body-box">
        <span>
          <el-text tag="b">店铺名称：</el-text>
          <el-text tag="ins">{{ storeInfo.storename }}</el-text>
        </span>
        <span>
          <el-text tag="b">店铺地址：</el-text>
          <el-text tag="ins">{{ storeInfo.storelocal }}</el-text>
        </span>
        <span>
          <el-text tag="b">联系电话：</el-text>
          <el-text tag="ins">{{ storeInfo.storephone ?? '无' }}</el-text>
        </span>
        <span>
          <el-text tag="b">经营范围：</el-text>
          <el-text tag="ins">{{ storeInfo.storeintro ?? '无' }}</el-text>
        </span>
        <span>
          <el-text tag="b">店铺Login：</el-text>
          <el-avatar
            shape="square"
            :size="100"
            fit="cover"
            :src="storeInfo.logo.url ?? defaultLogo"
          />
        </span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IStoreData } from '@/types/main/setting'
import type { UploadUserFile } from 'element-plus'
import useSettingStore from '@/stores/main/setting'
import { storeToRefs } from 'pinia'
import defaultLogo from '@/assets/imgs/default.jpg'

// 表单数据
const storeCard = reactive<IStoreData>({
  storename: '仙之源饭店',
  storelocal: '上海市徐汇区中山南路789号',
  storephone: '',
  storeintro: ''
})
// 图片数据
let logoList = ref<UploadUserFile[]>([
  {
    name: '',
    url: ''
  }
])

// =================

// 显示用户信息（首次使用LOGIN_USERINFO数据）
// 显示用户信息（首次使用LOGIN_USERINFO数据）
const settingStore = useSettingStore()
const { storeInfo } = storeToRefs(settingStore)

// 修改用户信息
const handleEditBtn = () => {
  //
}

// =================
</script>

<style lang="scss" scoped>
.storeCard {
  padding: 18px;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .body-box {
    display: flex;
    flex-direction: column;

    span {
      margin: 10px 0px;
      vertical-align: text-top;
    }
  }
}
</style>
