<template>
  <div class="storeCard">
    <!-- 内容显示 -->
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
    <!-- 修改弹窗 -->
    <el-dialog v-model="dialogVisible" title="店铺信息" width="400px" draggable>
      <el-form :model="cardForm" label-position="top" label-width="100px" style="max-width: 460px">
        <el-form-item label="店铺名称">
          <el-input v-model="cardForm.storename" minlength="2" maxlength="12" />
        </el-form-item>
        <el-form-item label="店铺地址">
          <el-input v-model="cardForm.storelocal" minlength="2" maxlength="12" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="cardForm.storephone" minlength="2" maxlength="12" />
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input
            v-model="cardForm.storeintro"
            type="textarea"
            maxlength="50"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmBtn">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { IStoreData } from '@/types/main/setting'
import type { UploadUserFile, UploadProps, UploadInstance, UploadFile } from 'element-plus'
import useSettingStore from '@/stores/main/setting'
import { storeToRefs } from 'pinia'
import defaultLogo from '@/assets/imgs/default.jpg'

// 表单数据
const cardForm = reactive<IStoreData>({
  storename: '仙之源饭店',
  storelocal: '上海市徐汇区中山南路789号',
  storephone: '',
  storeintro: ''
})
// 图片数据
let logoList = ref<UploadUserFile[]>([
  {
    name: 'logo',
    url: defaultLogo
  }
])

// =================

// 显示店铺信息（首次使用LOGIN_STOREINFO数据）
const settingStore = useSettingStore()
const { storeInfo } = storeToRefs(settingStore)

// 修改店铺信息
const handleEditBtn = () => {
  dialogVisible.value = true

  for (const key in cardForm) {
    cardForm[key] = storeInfo.value[key]
  }
}

// =================

// Dialog弹窗
const dialogVisible = ref(false)

const handleConfirmBtn = async () => {
  dialogVisible.value = false

  // 更新店铺信息
  const storeId = storeInfo.value._id
  const data = cardForm
  await settingStore.updataStoreInfoAction(storeId, data)
}
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
