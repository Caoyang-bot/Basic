<template>
  <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <el-tab-pane label="仪器仪表类型" name="first">
      <InstrumentType />
    </el-tab-pane>
    <el-tab-pane label="设备名称" name="second">Config</el-tab-pane>
    <el-tab-pane label="设备型号" name="third">Role</el-tab-pane>
    <el-tab-pane label="设备清单" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import InstrumentType from './InstrumentType.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style lang="scss"> @import "src/main.scss";
.el-tabs__nav-scroll{
  padding-left: 10px;
}
 .tabs{
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-tabs__content  {
      padding: 3;
   color: #6b778c;
  
  }
 
 }
</style>
