<template>
  <div class="category">
    <div class="top-box">
      <h3>类目列表</h3>
      <span>
        <el-button type="danger" size="small" plain disabled><s>批量删除</s></el-button>
        <el-button type="primary" size="small" @click="handleAddBtn()">新增类目</el-button>
      </span>
    </div>
    <div class="center-box">
      <el-table :data="categoryList" style="width: 100%" border center>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="category" label="类目" width="120" align="center" />
        <el-table-column label="创建时间" align="center">
          <template #default="scope">
            {{ scope.row.createTime || '暂无信息' }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template #default="scope">
            {{ scope.row.updateTime || '暂无信息' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
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
        :page-sizes="[10, 20, 30, 40]"
        v-model:current-page="currentPage"
        :total="categoryTotalCount"
        layout="sizes, prev, pager, next, jumper, total"
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="新增类目" align-center draggable center width="350px">
      <el-text tag="p">请输入待添加的类目：</el-text>
      <br />
      <el-input prop="category" v-model="category" min="2" max="6" clearable />

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
import { ref } from 'vue'
import useCategoryStore from '@/stores/main/category'
import { storeToRefs } from 'pinia'
import type { ICategoryData } from '@/types/main/category'

// 分页器数据
const categoryStore = useCategoryStore()
const { categoryList, categoryTotalCount } = storeToRefs(categoryStore)

const currentPage = ref(1)
const pageSize = ref(10)

// ===========

// 获取类目列表
const getCurrentTableList = async () => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  await categoryStore.getCategoryListAction({ size, offset })
}
getCurrentTableList()

// ===========

// 列表的size变化处理
const handleSizeChange = (size: number) => {
  pageSize.value = size

  getCurrentTableList()
}
// 列表的当前页变化处理
const handleCurrentChange = (page: number) => {
  currentPage.value = page

  getCurrentTableList()
}

// =================

// Dialog弹窗
const dialogVisible = ref(false)

// 类目数据
const category = ref('')
const categoryId = ref('')
const isEdit = ref(false)

// 新增类目按钮
const handleAddBtn = () => {
  dialogVisible.value = true

  isEdit.value = false
  // 初始化数据
  category.value = ''
  categoryId.value = ''
}

// 类目修改按钮
const handleEditBtn = (item: ICategoryData) => {
  dialogVisible.value = true

  isEdit.value = true
  // 数据回显
  category.value = item.category
  categoryId.value = item._id
}

const handleConfirmBtn = async () => {
  dialogVisible.value = false

  const categoryLength = category.value.length
  if (categoryLength >= 2 && categoryLength <= 6) {
    if (isEdit.value) {
      const result = await categoryStore.editeCategoryAction(categoryId.value, category.value)
    } else {
      // 新增类目
      const result = await categoryStore.addCategoryAction(category.value)
    }
  } else {
    ElMessage.error('类目名称长度应在2-6个字符之间！')
  }
}

// 类目删除按钮
const handleDelectBtn = async (categoryId: string) => {
  // 删除类目
  const result = await categoryStore.deleteCategoryAction(categoryId)
}

// 细节处理：是否需要同步更新Pagination的页码
categoryStore.$onAction(({ name, after }) => {
  after((result) => {
    if (
      (name === 'addCategoryAction' ||
        name === 'deleteCategoryAction' ||
        name === 'editeCategoryAction') &&
      !result.code
    ) {
      currentPage.value = 1
      pageSize.value = 10
    }
  })
})
</script>

<style lang="scss" scoped>
.category {
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

  :deep(.el-dialog__body) {
    padding: 10px var(--el-dialog-padding-primary);
  }

  .el-input-number {
    width: 100%;
  }
}
</style>
