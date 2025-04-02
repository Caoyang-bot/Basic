<template>
  <div class="snake-game">
    <h1>贪吃蛇游戏</h1>
    <div class="score">分数: {{ score }}</div>
    <canvas ref="gameCanvas" class="game-canvas"></canvas>
    <div v-if="gameOver" class="game-over">
      <!-- <p>游戏结束!</p> -->
      <button @click="resetGame">重新开始</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'SnakeGame',
  setup() {
    const gameCanvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);
    const score = ref(0);
    const gameOver = ref(false);
    
    // 蛇的初始状态
    const snake = ref({
      x: 160,
      y: 160,
      dx: 20, // 每格20像素
      dy: 0,
      cells: [] as {x: number, y: number}[],
      maxCells: 4
    });
    
    // 食物的位置
    const food = ref({
      x: 0,
      y: 0
    });

    // 游戏速度和上次更新时间
    const speed = ref(150); // 毫秒
    const lastUpdateTime = ref(0);
    
    // 游戏循环
    const gameLoop = (timestamp: number) => {
      if (gameOver.value) return;
      
      if (timestamp - lastUpdateTime.value > speed.value) {
        update();
        draw();
        lastUpdateTime.value = timestamp;
      }
      
      requestAnimationFrame(gameLoop);
    };

    // 更新游戏状态
    const update = () => {
      // 更新蛇的位置
      snake.value.x += snake.value.dx;
      snake.value.y += snake.value.dy;
      
      // 边界检测
      if (snake.value.x < 0 || 
          snake.value.x >= 400 || 
          snake.value.y < 0 || 
          snake.value.y >= 400) {
        gameOver.value = true;
        return;
      }
      
      // 蛇身跟随
      snake.value.cells.unshift({ x: snake.value.x, y: snake.value.y });
      if (snake.value.cells.length > snake.value.maxCells) {
        snake.value.cells.pop();
      }
      
      // 自身碰撞检测
      for (let i = 4; i < snake.value.cells.length; i++) {
        if (snake.value.cells[i].x === snake.value.x && 
            snake.value.cells[i].y === snake.value.y) {
          gameOver.value = true;
          return;
        }
      }
      
      // 食物碰撞检测
      if (snake.value.x === food.value.x && snake.value.y === food.value.y) {
        snake.value.maxCells++;
        score.value++;
        placeFood();
      }
    };

    // 绘制游戏
    const draw = () => {
      if (!ctx.value) return;
      
      // 清空画布
      ctx.value.fillStyle = 'white';
      ctx.value.fillRect(0, 0, 400, 400);
      
      // 绘制蛇
      ctx.value.fillStyle = 'green';
      snake.value.cells.forEach((cell, index) => {
        ctx.value!.fillRect(cell.x, cell.y, 20, 20);
        
        // 蛇头用不同颜色
        if (index === 0) {
          ctx.value!.fillStyle = 'darkgreen';
        }
      });
      
      // 绘制食物
      ctx.value.fillStyle = 'red';
      ctx.value.fillRect(food.value.x, food.value.y, 20, 20);
      
      // 游戏结束显示
      if (gameOver.value) {
        ctx.value.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.value.fillRect(0, 0, 400, 400);
        
        ctx.value.fillStyle = 'white';
        ctx.value.font = '20px Arial';
        ctx.value.textAlign = 'center';
        ctx.value.fillText('游戏结束!', 200, 200);
      }
    };

    // 随机放置食物
    const placeFood = () => {
      food.value.x = Math.floor(Math.random() * 20) * 20;
      food.value.y = Math.floor(Math.random() * 20) * 20;
      
      // 确保食物不会出现在蛇身上
      snake.value.cells.forEach(cell => {
        if (cell.x === food.value.x && cell.y === food.value.y) {
          placeFood();
        }
      });
    };

    // 键盘控制
    const handleKeyDown = (e: KeyboardEvent) => {
      // 防止反向移动
      if (e.key === 'ArrowLeft' && snake.value.dx === 0) {
        snake.value.dx = -20;
        snake.value.dy = 0;
      } else if (e.key === 'ArrowUp' && snake.value.dy === 0) {
        snake.value.dx = 0;
        snake.value.dy = -20;
      } else if (e.key === 'ArrowRight' && snake.value.dx === 0) {
        snake.value.dx = 20;
        snake.value.dy = 0;
      } else if (e.key === 'ArrowDown' && snake.value.dy === 0) {
        snake.value.dx = 0;
        snake.value.dy = 20;
      }
    };

    // 重置游戏
    const resetGame = () => {
      snake.value = {
        x: 160,
        y: 160,
        dx: 20,
        dy: 0,
        cells: [],
        maxCells: 4
      };
      score.value = 0;
      gameOver.value = false;
      placeFood();
      gameLoop();
    };

    onMounted(() => {
      if (gameCanvas.value) {
        gameCanvas.value.width = 400;
        gameCanvas.value.height = 400;
        ctx.value = gameCanvas.value.getContext('2d');
        
        // 初始化蛇
        snake.value.cells = [];
        for (let i = 0; i < snake.value.maxCells; i++) {
          snake.value.cells.push({ 
            x: snake.value.x - i * 20, 
            y: snake.value.y 
          });
        }
        
        placeFood();
        window.addEventListener('keydown', handleKeyDown);
        gameLoop();
      }
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
    });

    return {
      gameCanvas,
      score,
      gameOver,
      resetGame
    };
  }
});
</script>

<style scoped>
.snake-game {
  text-align: center;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.game-canvas {
  border: 1px solid #333;
  background-color: white;
  margin: 20px auto;
  display: block;
}

.score {
  font-size: 20px;
  margin: 10px 0;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.game-over p {
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
