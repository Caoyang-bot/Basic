<template>
  <div class="number-game">
    <h1>数字游戏</h1>
    <p class="current-number">当前数字: {{ currentNumber }}</p>
    <p class="player-turn">{{ currentPlayer }}的回合</p>
    
    <div v-if="!gameOver">
      <input 
        v-model.number="inputValue" 
        type="number" 
        min="1" 
        max="3" 
        placeholder="输入1-3"
      >
      <button @click="submitNumber">确认</button>
    </div>

    <div v-else>
      <p class="game-result">{{ winner }}输了!</p>
      <button @click="resetGame">重新开始</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NumberGame',
  setup() {
    const currentNumber = ref(1);
    const currentPlayer = ref('玩家1');
    const inputValue = ref(1);
    const gameOver = ref(false);
    const winner = ref('');

    const submitNumber = () => {
      if (inputValue.value < 1 || inputValue.value > 3) {
        alert('请输入1-3之间的数字');
        return;
      }

      const newNumber = currentNumber.value + inputValue.value;
      currentNumber.value = newNumber;

      if (newNumber >= 50) {
        gameOver.value = true;
        winner.value = currentPlayer.value;
        return;
      }

      currentPlayer.value = currentPlayer.value === '玩家1' ? '玩家2' : '玩家1';
      inputValue.value = 1;
    };

    const resetGame = () => {
      currentNumber.value = 1;
      currentPlayer.value = '玩家1';
      gameOver.value = false;
      winner.value = '';
      inputValue.value = 1;
    };

    return {
      currentNumber,
      currentPlayer,
      inputValue,
      gameOver,
      winner,
      submitNumber,
      resetGame
    };
  }
});
</script>

<style scoped>
.number-game {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

.current-number {
  font-size: 24px;
  margin: 20px 0;
}

.player-turn {
  font-size: 18px;
  margin-bottom: 20px;
}

input {
  padding: 8px;
  margin-right: 10px;
  width: 80px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.game-result {
  font-size: 20px;
  color: #f44336;
  margin: 20px 0;
}
</style>
