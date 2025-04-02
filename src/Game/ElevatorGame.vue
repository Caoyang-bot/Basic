<template>
  <div class="elevator-game">
    <h1>电梯模拟</h1>
    <p class="current-floor">当前楼层: {{ currentFloor }}</p>
    <p class="elevator-status">状态: {{ elevatorStatus }}</p>
    
    <div class="floor-buttons">
      <button 
        v-for="floor in floors" 
        :key="floor"
        @click="callElevator(floor)"
        :disabled="isMoving || floor === currentFloor"
      >
        {{ floor }}楼
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ElevatorGame',
  setup() {
    const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const currentFloor = ref(1);
    const isMoving = ref(false);
    const elevatorStatus = ref('等待中');

    const callElevator = (targetFloor: number) => {
      if (isMoving.value || targetFloor === currentFloor.value) return;
      
      isMoving.value = true;
      elevatorStatus.value = `移动中: ${currentFloor.value}楼 → ${targetFloor}楼`;
      
      // 模拟电梯移动时间
      const moveTime = Math.abs(targetFloor - currentFloor.value) * 1000;
      
      setTimeout(() => {
        currentFloor.value = targetFloor;
        isMoving.value = false;
        elevatorStatus.value = '到达目标楼层';
        
        // 3秒后恢复等待状态
        setTimeout(() => {
          elevatorStatus.value = '等待中';
        }, 3000);
      }, moveTime);
    };

    return {
      floors,
      currentFloor,
      isMoving,
      elevatorStatus,
      callElevator
    };
  }
});
</script>

<style scoped>
.elevator-game {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

.current-floor {
  font-size: 24px;
  margin: 20px 0;
}

.elevator-status {
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
}

.floor-buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

button {
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover:not(:disabled) {
  background-color: #0b7dda;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
