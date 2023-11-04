<template>
  <!-- <div ><el-button type="primary" >新增</el-button>
  <el-button type="warning">修改</el-button>
  <el-button type="danger">删除</el-button>
</div> -->
  
  <el-table :data="EquipmentTable" border style="width: 100%" height="95%" size="small">
    <el-table-column type="selection" align="center"/>
    <el-table-column type="index" label="序号" width="55px" align="center" />
    <el-table-column prop="name" label="设备类型名称" align="center" />
    <el-table-column prop="code" label="设备类型代号" align="center" />
    <el-table-column label="查看" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper"
      :total="totalItems"
    ></el-pagination></template>

<script lang="ts" setup>
import { ref } from "vue"
import axios from 'axios';

  
const EquipmentTable = ref([])
const handleEdit = (row) => {
  console.log(row)
}
data() {
  return {
    tableData: [], // 从后端获取的表格数据
    tableColumns: [], // 表格列的配置
    currentPage: 1,
    pageSize: 10,
    totalItems: 0 // 从后端获取的总条目数
  };
},
mounted() {
  this.fetchData();
},
methods: {
  handleSizeChange(newSize) {
    // 当每页显示条数改变时触发
    this.pageSize = newSize;
    this.currentPage = 1; // 切换每页显示条数后重置为第一页
    this.fetchData();
  },
  handleCurrentChange(newPage) {
    // 当前页码改变时触发
    this.currentPage = newPage;
    this.fetchData();
  },

axios.get("http://192.168.1.115:8110/publicModule/equipmentName/",{
  params:{
    page:page.value,
    limit:limit.value
  }
})
  .then(res => {
    console.log(res.data.data);
    EquipmentTable.value = res.data.data
  })
</script>
