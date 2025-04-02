<template>
    <el-button text @click="dialogVisible = true">生成二维码</el-button>
    
    <el-dialog v-model="dialogVisible" title="Tips" width="300px" :before-close="handleClose">
        <QrcodeVue :value="qrCodeLink" :size="300" level="H"></QrcodeVue>
        <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirm">Confirm</el-button>
            </span>
        </template> -->
    </el-dialog>
</template>
   
  <script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import QrcodeVue from 'vue-qrcode'

const dialogVisible = ref(false)
const qrCodeLink = ref("https://cumetting.cugroup.com:8087/newEntrance/#/")

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const confirm = () => {
  try {
    // 在这里添加确认按钮的业务逻辑
    dialogVisible.value = false;
  } catch (error) {
    console.error("Confirm button error:", error);
  }
}
  </script>
  <style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
