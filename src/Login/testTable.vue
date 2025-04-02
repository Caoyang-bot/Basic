<template>
  <div class="advanced-table-demo">
    <AdvancedTable :columns="columns" :data="tableData" :total="total" :page-size="pageSize" :current-page="currentPage"
      :loading="loading" remote @update:page-size="handlePageSizeChange" @update:current-page="handleCurrentPageChange"
      @filter-change="handleFilterChange">
      <!-- 操作栏slot -->
      <template #actions>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </template>
  
      <!-- 自定义状态列 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
          {{ row.status === 'active' ? '启用' : '禁用' }}
        </el-tag>
      </template>
  
      <!-- 自定义操作列 -->
      <template #action="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </AdvancedTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import AdvancedTable from '../components/AdvancedTable.vue'
import type { TableColumn } from '../components/AdvancedTable.vue'

// 表格列配置
const columns = ref<TableColumn[]>([
  {
    prop: 'name',
    label: '姓名',
    filter: {
      type: 'input',
      placeholder: '请输入姓名'
    }
  },
  {
    prop: 'gender',
    label: '性别',
    filter: {
      type: 'select',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ],
      placeholder: '请选择性别'
    }
  },
  {
    prop: 'birthday',
    label: '出生日期',
    filter: {
      type: 'date',
      placeholder: '请选择日期'
    }
  },
  {
    prop: 'status',
    label: '状态',
    slot: true
  },
  {
    prop: 'action',
    label: '操作',
    slot: true,
    width: '180px'
  }
])

// 表格数据
const tableData = ref<any[]>([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const loading = ref(false)

// 模拟远程数据加载
const loadData = async () => {
  loading.value = true
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))

    // 生成模拟数据
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `用户${i + 1}`,
      gender: i % 2 === 0 ? 'male' : 'female',
      birthday: `199${i % 10}-0${(i % 9) + 1}-${(i % 28) + 1}`,
      status: i % 3 === 0 ? 'active' : 'inactive'
    }))

    // 应用分页
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    tableData.value = mockData.slice(start, end)
    total.value = mockData.length
  } finally {
    loading.value = false
  }
}

// 分页变化处理
const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  loadData()
}

const handleCurrentPageChange = (page: number) => {
  currentPage.value = page
  loadData()
}

// 筛选变化处理
const handleFilterChange = (filters: Record<string, any>) => {
  console.log('筛选条件变化:', filters)
  currentPage.value = 1
  loadData()
}

// 操作按钮处理
const handleAdd = () => {
  console.log('新增操作')
}

const handleEdit = (row: any) => {
  console.log('编辑操作:', row)
}

const handleDelete = (row: any) => {
  console.log('删除操作:', row)
}

const handleBatchDelete = () => {
  console.log('批量删除操作')
}

// 初始化加载数据
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.advanced-table-demo {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
