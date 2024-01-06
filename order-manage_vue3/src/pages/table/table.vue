<template>
  <div class="table">
    <div class="top-box">
      <h3>桌号列表</h3>
      <span>
        <el-button type="danger" size="small" plain disabled><s>批量删除</s></el-button>
        <el-button type="primary" size="small" @click="handleAddBtn()">新增桌号</el-button>
      </span>
    </div>
    <div class="center-box">
      <el-table
        :data="tableList"
        :default-sort="{ prop: 'tablename', order: 'ascending' }"
        style="width: 100%"
        border
        center
      >
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="tablename" label="桌号" width="120" sortable align="center" />
        <el-table-column prop="codeUrl" label="桌号小程序码" align="center">
          <template #default="scope">
            <span style="display: inline-block; width: 70px">
              <el-image
                :src="scope.row.codeUrl"
                :preview-src-list="[scope.row.codeUrl]"
                preview-teleported
                style="vertical-align: middle"
                fit="cover"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              icon="Download"
              @click="handleDownloadBtn(scope.row)"
              >下载</el-button
            >
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
        :total="tableTotalCount"
        layout="sizes, prev, pager, next, jumper, total"
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="新增桌号" align-center draggable center width="350px">
      <el-text tag="p">请选择桌号：</el-text>
      <br />
      <el-input-number v-model="tableNumb" :min="1" controls-position="right" />

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
import type { ITableData } from '@/types/main/table'
import useTableStore from '@/stores/main/table'
import { storeToRefs } from 'pinia'

// 分页器数据
const tableStore = useTableStore()
const { tableList, tableTotalCount } = storeToRefs(tableStore)

const currentPage = ref(1)
const pageSize = ref(5)

// ===========

// 获取桌号列表
const getCurrentTableList = async () => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  await tableStore.getTableListAction({ size, offset })
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

// 桌号数据
const tableNumb = ref()

// 新增桌号按钮
const handleAddBtn = () => {
  dialogVisible.value = true

  tableNumb.value = null
}

const handleConfirmBtn = async () => {
  dialogVisible.value = false

  if (tableNumb.value) {
    // 新增桌号
    const tablename = tableNumb.value + '号桌'
    const result = await tableStore.addTableAction(tablename)

    // 细节处理：是否需要同步更新Pagination的页码
    // if (!result.code) {
    //   currentPage.value = 1
    //   pageSize.value = 5
    // }
  } else {
    ElMessage.error('桌号名称不能为空！')
  }
}

// 桌号删除按钮
const handleDelectBtn = async (tableId: string) => {
  // 删除桌号
  const result = await tableStore.deleteTableAction(tableId)

  // 细节处理：是否需要同步更新Pagination的页码
  // if (!result.code) {
  //   currentPage.value = 1
  //   pageSize.value = 5
  // }
}

// 细节处理：是否需要同步更新Pagination的页码
tableStore.$onAction(({ name, after }) => {
  after((result) => {
    if ((name === 'addTableAction' || name === 'deleteTableAction') && !result.code) {
      currentPage.value = 1
      pageSize.value = 5
    }
  })
})

// ========

// 下载桌号小程序码按钮
const handleDownloadBtn = async (table: ITableData) => {
  const { codeUrl, tablename } = table

  try {
    // 注意：当前请求存在跨域✍，要到OSS云存储中开发当前地址
    const response = await fetch(codeUrl)
    const blob = await response.blob()

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${tablename}.jpg`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error: any) {
    ElMessage.error('下载图片失败！')
  }
}
</script>

<style lang="scss" scoped>
.table {
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
