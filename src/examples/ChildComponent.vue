<template>
  <div class="child-component">
    <h3>子组件</h3>
    <p>这是子组件的内容</p>
    <p>计时器: {{ timer }}</p>
  </div>
</template> 

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timer = ref(0)
let intervalId = null

onMounted(() => {
  console.log('子组件 onMounted - 已挂载')
  intervalId = setInterval(() => {
    timer.value++
  }, 1000)
})

onUnmounted(() => {
  console.log('子组件 onUnmounted - 即将卸载')
  clearInterval(intervalId)
})
</script>

<style scoped>
.child-component {
  margin: 20px 0;
  padding: 15px;
  border: 1px dashed #42b983;
  border-radius: 4px;
}
</style>
