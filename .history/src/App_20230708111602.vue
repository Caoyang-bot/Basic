
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useRouter ,useRoute } from 'vue-router';
const routr=useRoute()
const router=useRouter()
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  router.
}
</script>

<template>
  <div class="box">
    <el-tabs v-model="tab" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="控制要点" name="sixth"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss"> @import "src/main.scss";</style>