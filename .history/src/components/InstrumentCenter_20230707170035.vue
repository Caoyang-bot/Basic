<template>
  <div class="box">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="控制要点" name="sixth">
        <ControlPoint/>
      </el-tab-pane>
      <el-tab-pane label="仪器仪表类型" name="first">
        <InstrumentType />
      </el-tab-pane>
      <el-tab-pane label="仪器仪表名称" name="second">
        <instruementName />
      </el-tab-pane>
      <el-tab-pane label="仪器仪表规格" name="third">
        <InstrumentSpecification />
      </el-tab-pane>
      <el-tab-pane label="精度单位类型" name="fourth">
        <PrecisionUnitType />
      </el-tab-pane>
      <el-tab-pane label="精度单位" name="fifth">
        <PrecisionUnit/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import ControlPoint from './ControlPoint/ControlPoint.vue';
import InstrumentType from './InstrumentType/InstrumentType.vue';
import instruementName from './InstrumentName/InstruementName.vue';
import InstrumentSpecification from './InstrumentSpecification/InstrumentSpecification.vue';
import PrecisionUnitType from './PrecisionUnitType/PrecisionUnitType.vue';
import PrecisionUnit from './PrecisionUnit/PrecisionUnit.vue';

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style lang="scss"> @import "src/main.scss";</style>
