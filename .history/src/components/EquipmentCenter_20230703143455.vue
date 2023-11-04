<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="设备类型" name="first"><EquipmentType></EquipmentType></el-tab-pane>
    <el-tab-pane label="设备名称" name="second">Config</el-tab-pane>
    <el-tab-pane label="设备型号" name="third">Role</el-tab-pane>
    <el-tab-pane label="设备清单" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import EquipmentType from './EquipmentType.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
<!-- <template>
  <div ><el-button type="primary" >新增</el-button>
  <el-button type="warning">修改</el-button>
  <el-button type="danger">删除</el-button>
</div>
  
  <el-table :data="EquipmentTable" border style="width: 100%" height="95%" size="small">
    <el-table-column type="selection" />
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
</template>

<script lang="ts" setup>
import { ref } from "vue"
import axios from 'axios';

const EquipmentTable = ref([])
const handleEdit = (row) => {
  console.log(row)
}

axios.get("http://192.168.1.115:8110/publicModule/equipmentName/?page=1")
  .then(res => {
    console.log(res.data.data);
    EquipmentTable.value = res.data.data
  })
</script> -->
