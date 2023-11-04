
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useRouter ,useRoute } from 'vue-router';
const route=useRoute()
const router=useRouter()
const tab = ref('/')
const tabList =ref([
  {
    title:"控制要点",
    path:"/InstrumentCenter/ControlPoint"
  },
  {
    title:"仪器类型",
    path:"/InstrumentCenter/InstrumentType"
  },
  {
    title:"仪器规格",
    path:"/InstrumentCenter/InstrumentSpecification"
  },
  {
    title:"精度单位类型",
    path:"/InstrumentCenter/PrecisionUnitType"
  },

])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  router.push(String(tab.paneName))
}

router.afterEach(async ()=>{
  if(!tab.value){
    tab.value =String(route.path || tabList[0].path)
  }
})
</script>

<template>
  <div class="box">
    <el-tabs v-model="tab" class="tabs" @tab-click="handleClick">
      <el-tab-pane  v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<style lang="scss"> @import "src/main.scss";</style>