<template>
  <div class="box">
  <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <el-tab-pane label="仪器仪表类型" name="first">
      <InstrumentType />
    </el-tab-pane>
    <el-tab-pane label="仪器仪表名称" name="second">
    
    </el-tab-pane>
    <el-tab-pane label="仪器仪表规格" name="third">Role</el-tab-pane>
    <el-tab-pane label="精度单位类型" name="fourth">Task</el-tab-pane>
    <el-tab-pane label="精度单位" name="fourth">Task</el-tab-pane>
  </el-tabs>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import InstrumentType from '../components/instrumentType/InstrumentType.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style lang="scss"> @import "src/main.scss";
</style>
