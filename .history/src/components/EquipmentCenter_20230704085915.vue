<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="设备类型" name="first">
      <EquipmentType />
    </el-tab-pane>
    <el-tab-pane label="设备名称" name="second">Config</el-tab-pane>
    <el-tab-pane label="设备型号" name="third">Role</el-tab-pane>
    <el-tab-pane label="设备清单" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import EquipmentType from './EquipmentType.vue'
import

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style lang="scss"> @import "src/main.scss";

 .demo-tabs>.el-tabs__content {
   padding: 32px;
   color: #6b778c;
   font-size: 32px;
   font-weight: 600;
 }
</style>
