<template>
  <div class="signature-container">
    <h2>电子签名</h2>
    <div class="signature-wrapper">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="button-group">
      <button @click="clear">清除签名</button>
    <button @click="save">保存签名</button>
    </div>
    <div v-if="signatureDataUrl" class="signature-preview">
      <h3>签名预览</h3>
      <img :src="signatureDataUrl" alt="签名预览">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import SignaturePad from 'signature_pad';

export default defineComponent({
  name: 'SignaturePad',
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const signaturePad = ref<SignaturePad | null>(null);
    const hasSignature = ref(false);
    const signatureDataUrl = ref('');

    const initSignaturePad = () => {
      if (canvas.value) {
        signaturePad.value = new SignaturePad(canvas.value, {
          minWidth: 1,
          maxWidth: 3,
          penColor: '#000000',
          backgroundColor: '#FFFFFF'
        });

        // 添加签名事件监听
        signaturePad.value.onEnd = () => {
          hasSignature.value = !signaturePad.value?.isEmpty();
        };

        // 处理窗口大小变化
        const resizeCanvas = () => {
          if (canvas.value) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.value.width = canvas.value.offsetWidth * ratio;
            canvas.value.height = canvas.value.offsetHeight * ratio;
            canvas.value.getContext('2d')?.scale(ratio, ratio);
            signaturePad.value?.clear();
          }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // 返回清理函数
        return () => {
          window.removeEventListener('resize', resizeCanvas);
        };
      }
    };

    const clear = () => {
      signaturePad.value?.clear();
      hasSignature.value = false;
      signatureDataUrl.value = '';
      localStorage.removeItem('userSignature'); // 清除保存的签名
    };

    const isLoading = ref(false);
    
    const save = async () => {
      if (!signaturePad.value || signaturePad.value.isEmpty()) {
        alert('请先签名');
        return;
      }
      
      try {
        isLoading.value = true;
        const signatureData = signaturePad.value.toDataURL('image/png');
        
        // 保存到localStorage
        try {
          localStorage.setItem('userSignature', signatureData);
          signatureDataUrl.value = signatureData;
          alert('签名保存成功');
        } catch (storageError) {
          console.error('本地存储失败:', storageError);
          // 如果localStorage失败，尝试使用sessionStorage作为fallback
          sessionStorage.setItem('userSignature', signatureData);
          signatureDataUrl.value = signatureData;
          alert('签名已临时保存（页面刷新后可能丢失）');
        }
      } catch (error) {
        console.error('保存签名失败:', error);
        alert('保存签名失败，请重试');
      } finally {
        isLoading.value = false;
      }
    };

    // 加载保存的签名
    const loadSignature = () => {
      const savedSignature = localStorage.getItem('userSignature');
      if (savedSignature) {
        signatureDataUrl.value = savedSignature;
        hasSignature.value = true;
      }
    };

    onMounted(() => {
      const cleanup = initSignaturePad();
      loadSignature(); // 加载保存的签名
      onUnmounted(() => {
        if (cleanup) cleanup();
      });
    });

    return {
      canvas,
      hasSignature,
      signatureDataUrl,
      clear,
      save,
      isLoading
    };
  }
});
</script>

<style scoped>
.signature-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.signature-wrapper {
  border: 2px dashed #ccc;
  margin: 20px 0;
  background: #f9f9f9;
}

canvas {
  display: block;
  width: 100%;
  height: 300px;
  background: white;
  touch-action: none;
}

.button-group {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

.signature-preview {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #eee;
}

.signature-preview img {
  max-width: 100%;
  border: 1px solid #ddd;
}
</style>
