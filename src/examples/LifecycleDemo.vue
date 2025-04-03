<template>
  <div class="lifecycle-demo">
    <!-- <h2>Vue3 生命周期实例讲解</h2> -->
    
    <!-- 1. onMounted 示例 -->
    <div ref="chartContainer" class="demo-chart"></div>
    
    <!-- 2. 数据更新示例 -->
    <div class="counter">
      <p>计数器: {{ count }}</p>
      <button @click="count++">增加</button>
    </div>
    
    <!-- 3. 子组件示例 -->
    <button @click="showChild = !showChild">
      {{ showChild ? '移除' : '加载' }}子组件
    </button>
    <ChildComponent v-if="showChild" />
    
    <!-- 4. 错误触发示例 -->
    <div class="error-section">
      <button @click="triggerError">触发错误</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted, onErrorCaptured } from 'vue'
import * as echarts from 'echarts'
import ChildComponent from './ChildComponent.vue'

// 1. onMounted 示例 - 初始化图表
const chartContainer = ref(null)
let chartInstance = null

onMounted(() => {
  console.log('1. onMounted - 组件已挂载，初始化图表')
  chartInstance = echarts.init(chartContainer.value)
  
  const option = {
    xAxis: { data: ['A', 'B', 'C', 'D'] },
    yAxis: {},
    series: [{ type: 'bar', data: [10, 20, 30, 40] }]
  }
  chartInstance.setOption(option)
  
  // 模拟数据请求
  fetchData()
})

// 2. onUpdated 示例 - 响应数据变化
const count = ref(0)

onUpdated(() => {
  console.log(`2. onUpdated - 数据已更新，当前计数: ${count.value}`)
})

// 3. onUnmounted 示例 - 清理资源
onUnmounted(() => {
  console.log('3. onUnmounted - 组件即将卸载，销毁图表实例')
  if (chartInstance) {
    chartInstance.dispose()
  }
})

// 4. onErrorCaptured 示例 - 错误处理
const showChild = ref(true)

onErrorCaptured((err) => {
  console.error('4. onErrorCaptured - 捕获到错误:', err)
  alert(`捕获到错误: ${err.message}`)
  return false // 阻止错误继续传播
})

function triggerError() {
  // 模拟组件错误
  throw new Error('这是一个模拟的错误')
}

// 模拟数据请求
async function fetchData() {
  console.log('模拟数据请求...')
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('数据请求完成')
}
</script>

<style scoped>
.lifecycle-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.demo-chart {
  width: 100%;
  height: 300px;
  margin: 20px 0;
  border: 1px solid #eee;
}
.counter, .error-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}
button {
  margin: 5px;
  padding: 8px 12px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
