<template>
  <div class="advanced-table">
    <!-- 操作栏 -->
    <div class="table-actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  
    <!-- 表格主体 -->
    <el-table :data="tableData" border style="width: 100%" v-bind="$attrs" v-loading="props.loading"
      @selection-change="handleSelectionChange" small>
      <!-- 动态列 -->
      <template v-for="column in columns" :key="column.prop">
        <el-table-column v-bind="column" :sortable="column.sortable || false" align="center" :width="column.width">
          <!-- 表头筛选 -->
          <template #header="scope" v-if="column.filter">
            <div class="filter-header">
              <span>{{ column.label }}</span>
              <el-popover placement="bottom" width="240" trigger="click">
                <template #reference>
                  <!-- <el-button :icon="Filter" size="small" :type="filterValues[column.prop] ? 'primary' : 'default'"
                              circle /> -->
                  <el-icon style="margin-left: 8px;">
                    <Filter />
                  </el-icon>
                </template>
                <div class="filter-popover-content">
                  <!-- 输入框筛选 -->
                  <el-input v-if="column.filter.type === 'input'" v-model="filterValues[column.prop]"
                    :placeholder="column.filter.placeholder || '请输入'" size="small" clearable
                    @change="handleFilterChange(column.prop)" />
  
                  <!-- 下拉框筛选 -->
                  <el-select v-else-if="column.filter.type === 'select'" v-model="filterValues[column.prop]"
                    :placeholder="column.filter.placeholder || '请选择'" size="small" clearable
                    @change="handleFilterChange(column.prop)">
                    <el-option v-for="opt in column.filter.options" :key="opt.value" :label="opt.label"
                      :value="opt.value" />
                  </el-select>
  
                  <!-- 日期选择 -->
                  <el-date-picker v-else-if="column.filter.type === 'date'" v-model="filterValues[column.prop]"
                    type="date" size="small" :placeholder="column.filter.placeholder || '选择日期'"
                    @change="handleFilterChange(column.prop)" style="width: 100%" />
  
                  <!-- 日期范围选择 -->
                  <el-date-picker v-else-if="column.filter.type === 'daterange'" v-model="filterValues[column.prop]"
                    type="daterange" size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    @change="handleFilterChange(column.prop)" />
                </div>
              </el-popover>
            </div>
          </template>
  
          <!-- 自定义列内容 -->
          <template #default="scope" v-if="column.slot">
            <slot :name="column.prop" v-bind="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  
  
    <!-- 分页 -->
    <el-pagination v-if="showPagination" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]" :total="total" layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { Filter } from '@element-plus/icons-vue'

interface TableColumn {
  prop: string
  label: string
  width?: string | number
  sortable?: boolean
  slot?: boolean
  filter?: {
    type: 'input' | 'select' | 'date' | 'daterange'
    options?: Array<{ label: string; value: any }>
    placeholder?: string
  }
}

const props = defineProps({
  columns: {
    type: Array as () => TableColumn[],
    required: true
  },
  data: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  remote: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:pageSize',
  'update:currentPage',
  'selection-change',
  'filter-change'
])

// 筛选值
const filterValues = ref<Record<string, any>>({})

// 初始化筛选值
watch(() => props.columns, (columns) => {
  columns.forEach(col => {
    if (col.filter && !filterValues.value[col.prop]) {
      filterValues.value[col.prop] = col.filter.type === 'daterange' ? [] : null
    }
  })
}, { immediate: true })

// 处理筛选变化
const handleFilterChange = (prop: string) => {
  emit('filter-change', {
    ...filterValues.value,
    [prop]: filterValues.value[prop]
  })
}

const tableData = computed(() => props.data)

// 远程加载时重置页码
watch(() => filterValues.value, () => {
  if (props.remote) {
    currentPage.value = 1
  }
}, { deep: true })
const currentPage = ref(props.currentPage)
const pageSize = ref(props.pageSize)

const handleSizeChange = (val: number) => {
  pageSize.value = val
  emit('update:pageSize', val)
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  emit('update:currentPage', val)
}

const handleSelectionChange = (val: any[]) => {
  emit('selection-change', val)
}
</script>

<style scoped>
.advanced-table {
  margin-top: 20px;

  .table-actions {
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}

.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}

.filter-header {
  /* display: flex;
  align-items: center;
  justify-content: space-between; */


}
</style>
