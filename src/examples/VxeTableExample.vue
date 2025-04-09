<template>
  <div class="table-container">
    <vxe-grid v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
  </div>
</template>

<style scoped>
.table-container {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue'
import { VxeTableDefines, VxeGridProps, VxeGridListeners } from 'vxe-table'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  num: string
  num2: string
  address: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  height: 600,
  resizable: true,
  columnConfig: {
    resizable: true
  },
  editConfig: {
    trigger: 'click',
    mode: 'cell',
    showStatus: true
  },
  filterConfig: {
    remote: true
  },
  pagerConfig: {
    pageSize: 5,
    pageSizes: [5, 10, 20, 50, 100]
  },
  contextMenu: {
    body: {
      options: [
        [
          { code: 'copy', name: '复制', prefixIcon: 'vxe-icon-copy' },
          { code: 'remove', name: '删除', prefixIcon: 'vxe-icon-delete' },
          { code: 'export', name: '导出', prefixIcon: 'vxe-icon-export' }
        ]
      ]
    }
  },
  toolbarConfig: {
    buttons: [
      { code: 'insert', name: '新增' },
      { code: 'remove', name: '删除' },
      { code: 'save', name: '保存' },
      { code: 'export', name: '导出' },
      { code: 'custom-column', name: '列设置' }
    ],
    refresh: true,
    custom: true

  },
  columnConfig: {
    resizable: true,
    showOverflow: true
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', minWidth: 300, editRender: { name: 'input' } },
    {
      field: 'role',
      title: 'Role',
      width: 240,
      filters: [
        { label: 'Develop', value: 'Develop' },
        { label: 'Test', value: 'Test' },
        { label: 'PM', value: 'PM' },
        { label: 'Designer', value: 'Designer' }
      ],
      editRender: { name: 'input' }
    },
    { field: 'sex', title: 'Sex', width: 200, editRender: { name: 'input' } },
    { field: 'age', title: 'Age', width: 200, editRender: { name: 'input' } },
    { field: 'address', title: 'Address', width: 300, editRender: { name: 'input' } }
  ],
  data: []
})

const findList = (filterList?: VxeTableDefines.FilterCheckedParams<RowVO>[]) => {
  gridOptions.loading = true
  // 模拟接口
  return new Promise<RowVO[]>(resolve => {
    setTimeout(() => {
      gridOptions.loading = false
      const mockList = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, num: '3.8', num2: '3.8', address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, num: '511', num2: '511', address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, num: '12.8', num2: '12.8', address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, num: '103', num2: '103', address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, num: '56', num2: '56', address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, num: '49', num2: '49', address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, num: '400.9', num2: '400.9', address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, num: '5000', num2: '5000', address: 'test abc' }
      ]
      if (filterList && filterList.length) {
        const firstItem = filterList[0]
        const values = firstItem.values
        const rest = mockList.filter(item => values.includes(item.role))
        gridOptions.data = rest
        resolve(rest)
      } else {
        gridOptions.data = mockList
        resolve(mockList)
      }
    }, 300)
  })
}

const gridEvents: VxeGridListeners = {
  filterChange({ filterList }) {
    findList(filterList)
  },
  toolbarButtonClick({ code }) {
    const gridInstance = gridOptions.ref
    switch (code) {
      case 'insert':
        gridInstance?.insert({})
        break
      case 'remove':
        gridInstance?.removeCheckboxRow()
        break
      case 'save':
        gridInstance?.getUpdateRecords().then(records => {
          console.log('保存的数据:', records)
          // 这里可以添加保存到服务器的逻辑
        })
        break
      case 'export':
        gridInstance?.exportData({
          type: 'csv',
          filename: '表格数据',
          sheetName: 'Sheet1'
        })
        break
      case 'custom-column':
        gridInstance?.openColumn()
        break
    }
  },
  contextMenuClick({ menu, row, column }) {
    const gridInstance = gridOptions.ref
    switch (menu.code) {
      case 'copy':
        if (row && column) {
          navigator.clipboard.writeText(row[column.field])
        }
        break
      case 'remove':
        if (row) {
          gridInstance?.remove(row)
        }
        break
      case 'export':
        gridInstance?.exportData({
          type: 'csv',
          filename: '表格数据',
          sheetName: 'Sheet1'
        })
        break
    }
  }
}

findList()
</script>