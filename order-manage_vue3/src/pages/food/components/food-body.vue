<template>
  <div class="food-body">
    <div class="top-box">
      <h3>菜品列表</h3>
      <span>
        <el-button type="danger" size="small" plain disabled><s>批量删除</s></el-button>
        <el-button type="primary" size="small" @click="handleAddBtn()">新增菜品</el-button>
      </span>
    </div>
    <div class="center-box">
      <el-table :data="foodList" style="width: 100%" border>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="foodname" label="菜品名称" align="center" width="140" />
        <el-table-column prop="url" label="菜品图片" align="center" min-width="140">
          <template #default="scope">
            <span style="display: inline-block; width: 70px">
              <el-image
                :src="scope.row.food.url"
                :preview-src-list="[scope.row.food.url]"
                preview-teleported
                style="vertical-align: middle"
                fit="cover"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="菜品价格" align="center" min-width="120">
          <template #default="scope">
            {{ scope.row.foodPrice + '￥' || '暂无信息' }}
          </template>
        </el-table-column>
        <el-table-column label="菜品状态" align="center" min-width="80">
          <template #default="scope">
            <el-button :type="scope.row.onSale ? 'success' : 'info'" plain size="small">
              {{ scope.row.onSale ? '在售' : '售馨' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" width="180">
          <template #default="scope">
            {{ scope.row.updateTime || '暂无信息' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="warning" size="small" icon="Edit" @click="handleEditBtn(scope.row)">
              编辑
            </el-button>
            <el-popconfirm
              title="你确定执行删除操作吗？"
              @confirm="handleDelectBtn(scope.row._id)"
              width="200px"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
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
        :total="foodTotalCount"
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
import useFoodStore from '@/stores/main/food'
import type { IFoodData } from '@/types/main/food'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 分页器数据
const foodStore = useFoodStore()
const { foodTotalCount, foodList } = storeToRefs(foodStore)

const currentPage = ref(1)
const pageSize = ref(5)

// 获取food列表数据
const getCurrentFoodList = (payload: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { offset, size, ...payload }

  foodStore.getFoodListAction(queryInfo)
}
defineExpose({ getCurrentFoodList })

// 初次进入页面时
getCurrentFoodList()

// 列表的size变化处理
const handleSizeChange = (size: number) => {
  // console.log(size)
  getCurrentFoodList()
}
// 列表的当前页变化处理
const handleCurrentChange = (page: number) => {
  // console.log(page)
  getCurrentFoodList()
}

// 菜品删除按钮
const handleDelectBtn = (foodId: string) => {
  // console.log(foodId)
  foodStore.delectFoodAction(foodId)
}

const emit = defineEmits(['addClick', 'editClick'])

// 新增菜品按钮
const handleAddBtn = () => {
  emit('addClick')
}
// 编辑菜品按钮
const handleEditBtn = (food: IFoodData) => {
  emit('editClick', food)
}

// 细节处理：是否需要同步更新Pagination的页码
foodStore.$onAction(({ name, after }) => {
  after((result) => {
    if (
      (name === 'delectFoodAction' || name === 'addFoodAction' || name === 'editFoodAction') &&
      !result.code
    ) {
      currentPage.value = 1
      pageSize.value = 5
    }
  })
})
</script>

<style lang="scss" scoped>
.food-body {
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
