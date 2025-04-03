<template>
  <div class="gold-miner-game">
    <h1>黄金矿工</h1>
    <div class="game-info">
      <span>关卡: {{ level }}</span>
      <span>分数: {{ score }}</span>
      <span>时间: {{ timeLeft }}</span>
    </div>
    <canvas ref="gameCanvas" class="game-canvas"></canvas>
    <div v-if="gameOver" class="game-over">
      <p>{{ gameOverMessage }}</p>
      <button @click="resetGame">{{ levelCompleted ? '下一关' : '重新开始' }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'GoldMinerGame',
  setup() {
    const gameCanvas = ref<HTMLCanvasElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);
    const score = ref(0);
    const level = ref(1);
    const timeLeft = ref(60);
    const gameOver = ref(false);
    const levelCompleted = ref(false);
    const gameOverMessage = ref('游戏结束!');
    
    // 钩子状态
    const hook = ref({
      x: 400,
      y: 50,
      length: 30,
      angle: -Math.PI / 4, // 向下45度
      rotationSpeed: 0.01,
      isExtending: false,
      isRetracting: false,
      currentLength: 30
    });

    // 物品数组
    const items = ref<Array<{
      x: number,
      y: number,
      radius: number,
      value: number,
      weight: number,
      color: string
    }>>([]);

    // 游戏循环相关
    const lastUpdateTime = ref(0);
    const gameLoopId = ref(0);
    const timerId = ref(0);

    // 初始化游戏
    const initGame = () => {
      if (!gameCanvas.value) return;
      
      // 设置Canvas尺寸
      gameCanvas.value.width = 800;
      gameCanvas.value.height = 600;
      ctx.value = gameCanvas.value.getContext('2d');
      
      // 初始化钩子
      hook.value = {
        x: 400,
        y: 50,
        length: 30,
        angle: -Math.PI / 4, // 向下45度
        rotationSpeed: 0.01,
        isExtending: false,
        isRetracting: false,
        currentLength: 30
      };

      // 根据关卡生成物品
      generateItems();
      
      // 重置游戏状态
      timeLeft.value = 60;
      gameOver.value = false;
      levelCompleted.value = false;
      
      // 启动游戏循环
      gameLoopId.value = requestAnimationFrame(gameLoop);
      
      // 启动计时器
      timerId.value = window.setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
          endGame(false);
        }
      }, 1000);
    };

    // 生成物品
    const generateItems = () => {
      items.value = [];
      
      // 根据关卡生成不同数量和价值的物品
      const itemCount = 5 + level.value * 2;
      
      for (let i = 0; i < itemCount; i++) {
        const radius = 20 + Math.random() * 20;
        const value = Math.floor(radius * (0.5 + Math.random()));
        const weight = radius * 0.5;
        
        items.value.push({
          x: 100 + Math.random() * 600,
          y: 200 + Math.random() * 250, // 调整Y坐标范围，确保在钩子可达到范围内
          radius,
          value,
          weight,
          color: `hsl(${Math.random() * 60}, 70%, 50%)`
        });
      }
    };

    // 游戏主循环
    const gameLoop = (timestamp: number) => {
      if (gameOver.value) return;
      
      update();
      draw();
      
      gameLoopId.value = requestAnimationFrame(gameLoop);
    };

    // 更新游戏状态
    const update = () => {
      // 更新钩子角度
      if (!hook.value.isExtending && !hook.value.isRetracting) {
        hook.value.angle += hook.value.rotationSpeed;
        
        // 自然反转旋转方向
        if (hook.value.angle > Math.PI * 1.5) {
          hook.value.rotationSpeed = -Math.abs(hook.value.rotationSpeed);
        } else if (hook.value.angle < Math.PI * 0.5) {
          hook.value.rotationSpeed = Math.abs(hook.value.rotationSpeed);
        }
      }
      
      // 处理钩子伸缩
      if (hook.value.isExtending) {
        hook.value.currentLength += 2;
        checkCollision();
        
        // 达到最大长度(从300增加到400)
        if (hook.value.currentLength >= 400) {
          hook.value.isExtending = false;
          hook.value.isRetracting = true;
        }
      }
      
      if (hook.value.isRetracting) {
        hook.value.currentLength -= 3;
        updateGrabbedItem();
        
        // 钩子完全收回
        if (hook.value.currentLength <= hook.value.length) {
          hook.value.isRetracting = false;
          hook.value.currentLength = hook.value.length;
        }
      }
    };

    // 绘制游戏
    const draw = () => {
      if (!ctx.value) return;
      
      // 清空画布
      ctx.value.fillStyle = '#87CEEB';
      ctx.value.fillRect(0, 0, 800, 600);
      
      // 绘制地面
      ctx.value.fillStyle = '#8B4513';
      ctx.value.fillRect(0, 500, 800, 100);
      
      // 先绘制未被抓取的物品
      items.value.forEach(item => {
        ctx.value!.beginPath();
        ctx.value!.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.value!.fillStyle = item.color;
        ctx.value!.fill();
        ctx.value!.strokeStyle = 'black';
        ctx.value!.stroke();
        
        // 绘制物品价值
        ctx.value!.fillStyle = 'black';
        ctx.value!.font = '12px Arial';
        ctx.value!.textAlign = 'center';
        ctx.value!.fillText(item.value.toString(), item.x, item.y + 5);
      });
      
      // 计算钩子端点坐标（修正方向，确保向下抓取）
      const hookEndX = hook.value.x + Math.sin(hook.value.angle) * hook.value.currentLength;
      const hookEndY = hook.value.y - Math.cos(hook.value.angle) * hook.value.currentLength;
      
      // 绘制钩子线
      ctx.value!.beginPath();
      ctx.value!.moveTo(hook.value.x, hook.value.y);
      ctx.value!.lineTo(hookEndX, hookEndY);
      ctx.value!.lineWidth = 2;
      ctx.value!.strokeStyle = 'black';
      ctx.value!.stroke();
      
      // 绘制被抓取的物品（在钩子线上方）
      if (grabbedItem.value) {
        ctx.value!.beginPath();
        ctx.value!.arc(
          grabbedItem.value.item.x, 
          grabbedItem.value.item.y, 
          grabbedItem.value.item.radius, 
          0, 
          Math.PI * 2
        );
        ctx.value!.fillStyle = grabbedItem.value.item.color;
        ctx.value!.fill();
        ctx.value!.strokeStyle = 'black';
        ctx.value!.stroke();
        
        // 绘制物品价值
        ctx.value!.fillStyle = 'black';
        ctx.value!.font = '12px Arial';
        ctx.value!.textAlign = 'center';
        ctx.value!.fillText(
          grabbedItem.value.item.value.toString(), 
          grabbedItem.value.item.x, 
          grabbedItem.value.item.y + 5
        );
      }
      
      // 绘制钩子（在最上层）
      ctx.value!.beginPath();
      ctx.value!.arc(hookEndX, hookEndY, 5, 0, Math.PI * 2);
      ctx.value!.fillStyle = 'black';
      ctx.value!.fill();
      
      // 绘制游戏状态
      if (gameOver.value) {
        ctx.value!.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.value!.fillRect(0, 0, 800, 600);
        
        ctx.value!.fillStyle = 'white';
        ctx.value!.font = '36px Arial';
        ctx.value!.textAlign = 'center';
        ctx.value!.fillText(gameOverMessage.value, 400, 250);
      }
    };

    // 检查碰撞
    const grabbedItem = ref<{
      item: {
        x: number,
        y: number,
        radius: number,
        value: number,
        weight: number,
        color: string
      },
      index: number
    } | null>(null);

    const checkCollision = () => {
      const hookEndX = hook.value.x + Math.sin(hook.value.angle) * hook.value.currentLength;
      const hookEndY = hook.value.y - Math.cos(hook.value.angle) * hook.value.currentLength;
      
      if (!grabbedItem.value) {
        for (let i = 0; i < items.value.length; i++) {
          const item = items.value[i];
          const dx = hookEndX - item.x;
          const dy = hookEndY - item.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < item.radius + 5) {
            // 抓到物品
            grabbedItem.value = {
              item: {...item},
              index: i
            };
            items.value.splice(i, 1);
            hook.value.isExtending = false;
            hook.value.isRetracting = true;
            break;
          }
        }
      }
    };

    const updateGrabbedItem = () => {
      if (grabbedItem.value) {
        const hookEndX = hook.value.x + Math.sin(hook.value.angle) * hook.value.currentLength;
        const hookEndY = hook.value.y - Math.cos(hook.value.angle) * hook.value.currentLength;
        
        // 更新被抓取物品位置，跟随钩子移动
        grabbedItem.value.item.x = hookEndX;
        grabbedItem.value.item.y = hookEndY;

        // 钩子完全收回时加分
        if (hook.value.currentLength <= hook.value.length) {
          score.value += grabbedItem.value.item.value;
          grabbedItem.value = null;
          
          // 检查是否完成关卡
          if (items.value.length === 0) {
            endGame(true);
          }
        }
      }
    };

    // 结束游戏
    const endGame = (completed: boolean) => {
      gameOver.value = true;
      levelCompleted.value = completed;
      
      if (completed) {
        gameOverMessage.value = `关卡 ${level.value} 完成!`;
      } else {
        gameOverMessage.value = '游戏结束!';
      }
      
      cancelAnimationFrame(gameLoopId.value);
      clearInterval(timerId.value);
    };

    // 重置游戏
    const resetGame = () => {
      if (levelCompleted.value) {
        level.value++;
      }
      initGame();
    };

    // 处理鼠标点击
    const handleClick = () => {
      if (!hook.value.isExtending && !hook.value.isRetracting) {
        hook.value.isExtending = true;
      }
    };

    onMounted(() => {
      initGame();
      if (gameCanvas.value) {
        gameCanvas.value.addEventListener('click', handleClick);
      }
    });

    onUnmounted(() => {
      cancelAnimationFrame(gameLoopId.value);
      clearInterval(timerId.value);
      if (gameCanvas.value) {
        gameCanvas.value.removeEventListener('click', handleClick);
      }
    });

    return {
      gameCanvas,
      score,
      level,
      timeLeft,
      gameOver,
      levelCompleted,
      gameOverMessage,
      resetGame
    };
  }
});
</script>

<style scoped>
.gold-miner-game {
  text-align: center;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.game-info {
  margin: 10px 0;
  font-size: 18px;
}

.game-info span {
  margin: 0 15px;
}

.game-canvas {
  border: 1px solid #333;
  background-color: white;
  margin: 20px auto;
  display: block;
  cursor: pointer;
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
