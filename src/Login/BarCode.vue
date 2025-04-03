<!-- 手机扫码 -->
<script setup >
import { ref, reactive, toRefs } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library';
import { Dialog, Notify } from 'vant';
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const data = reactive({
  loadingShow: false,
  codeReader: null,
  scanText: '',
  vin: null,
  tipMsg: '正在尝试识别....',
  tipShow: false
})
const { loadingShow, codeReader, scanText, vin, tipMsg, tipShow } = toRefs(data);
codeReader.value = new BrowserMultiFormatReader();

openScan();
function openScan() {
  codeReader.value.getVideoInputDevices().then((videoInputDevices) => {
    tipShow.value = true;
    tipMsg.value = '正在调用摄像头...';
    console.log('videoInputDevices', videoInputDevices);
    // 默认获取第一个摄像头设备id
    let firstDeviceId = videoInputDevices[0].deviceId;
    // 获取第一个摄像头设备的名称
    const videoInputDeviceslablestr = JSON.stringify(videoInputDevices[0].label);
    if (videoInputDevices.length > 1) {
      // 判断是否后置摄像头
      if (videoInputDeviceslablestr.indexOf('back') > -1) {
        firstDeviceId = videoInputDevices[0].deviceId;
      } else {
        firstDeviceId = videoInputDevices[1].deviceId;
      }
    }
    decodeFromInputVideoFunc(firstDeviceId);
  }).catch(err => {
    tipShow.value = false;
    console.error(err);
  });
}

function decodeFromInputVideoFunc(firstDeviceId) {
  codeReader.value.reset(); // 重置
  scanText.value = '';
  codeReader.value.decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video', (result, err) => {
    tipMsg.value = '正在尝试识别...';
    scanText.value = '';
    if (result) {
      console.log('扫描结果', result);
      scanText.value = result.text;
      if (scanText.value) {
        tipShow.value = false;
        clickIndexLeft()
        // 这部分接下去的代码根据需要，读者自行编写了
        // this.$store.commit('app/SET_SCANTEXT', result.text);
        // console.log('已扫描的小票列表', this.$store.getters.scanTextArr);
      }
    }
    if (err && !(err)) {
      tipMsg.value = '识别失败';
      setTimeout(() => {
        tipShow.value = false;
      }, 2000)
      console.error(err);
    }
  });
}
function clickIndexLeft() {
  console.log("我要传参了", scanText.value)
  router.replace({
    name: 'work',
    params: {
      result: scanText.value
    }
  })
  codeReader.value.reset(); // 重置
}
const onClickRight = () => Toast('按钮');
</script>
<template>
    <div class="page-scan">
        <!--返回-->
        <!-- <van-nav-bar title="扫描二维码/条形码" fixed @click-left="clickIndexLeft()" class="scan-index-bar">
                <template #left>
                    <van-icon name="arrow-left" size="18" color="#fff" />
                    <span style="color: #fff"> 取消 </span>
                </template>
            </van-nav-bar> -->
        <van-nav-bar title="扫描二维码/条形码" right-text="按钮" left-arrow fixed @click-right="onClickRight"
            @click-left="clickIndexLeft()" />
        <!-- 扫码区域 -->
        <!-- <video ref="video" id="video" class="scan-video" autoplay></video> -->
    
        <div class="QrCode">
            <video ref="video" height="100%" width="100%" id="video" autoplay></video>
        </div>
        <!-- 扫码样式一 -->
        <div class="Qr_scanner">
            <div class="box">
                <div class="line_row">
                    <div class="line"></div>
                </div>
                <div class="angle"></div>
            </div>
        </div>
    
    
        <!-- 提示语 -->
        <div>{{scanText}}</div>
        <div v-show="tipShow" class="scan-tip"> {{ tipMsg }} </div>
    </div>
</template>
<style scoped lang="scss">
/* .scan-video {
    height: 80vh;
    width: 100%
}

.scan-tip {
    width: 50vw;
    text-align: center;
    margin-bottom: 10vh;
    color: white;
    font-size: 5vw;
}

.page-scan {
    overflow-y: hidden;
    background-color: #363636;
} */



/**
  扫码样式一
*/
.QrCode {
    width: 100vw;
    height: 100vh;
    position: relative;

    #video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}


.Qr_scanner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.Qr_scanner .box {
    width: 75vw;
    height: 75vw;
    max-height: 75vh;
    max-width: 75vh;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgb(43, 113, 254);

    .line_row {
        width: 100%;
        overflow: hidden;
        background-image: linear-gradient(0deg,
                transparent 24%,
                rgba(136, 176, 255, 0.1) 25%,
                rgba(136, 176, 255, 0.1) 26%,
                transparent 27%,
                transparent 74%,
                rgba(136, 176, 255, 0.1) 75%,
                rgba(136, 176, 255, 0.1) 76%,
                transparent 77%,
                transparent),
            linear-gradient(90deg,
                transparent 24%,
                rgba(136, 176, 255, 0.1) 25%,
                rgba(136, 176, 255, 0.1) 26%,
                transparent 27%,
                transparent 74%,
                rgba(136, 176, 255, 0.1) 75%,
                rgba(136, 176, 255, 0.1) 76%,
                transparent 77%,
                transparent);
        background-size: 3rem 3rem;
        background-position: -1rem -1rem;
        animation: Heightchange 2s infinite;
        animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
        animation-delay: 1.4s;
        border-bottom: 1px solid rgba(136, 176, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
}

.Qr_scanner .line {
    width: 100%;
    height: 3px;
    background: #2b71fe;
    // opacity: 0.58;
    filter: blur(4px);
}

.Qr_scanner .box:after,
.Qr_scanner .box:before,
.Qr_scanner .angle:after,
.Qr_scanner .angle:before {
    content: "";
    display: block;
    position: absolute;
    width: 78px;
    height: 78px;
    border: 0.3rem solid transparent;
}

.Qr_scanner .box:after,
.Qr_scanner .box:before {
    top: -7px;
    border-top-color: #2b71fe;
}

.Qr_scanner .angle:after,
.Qr_scanner .angle:before {
    bottom: -7px;
    border-bottom-color: #2b71fe;
}

.Qr_scanner .box:before,
.Qr_scanner .angle:before {
    left: -7px;
    border-left-color: #2b71fe;
}

.Qr_scanner .box:after,
.Qr_scanner .angle:after {
    right: -7px;
    border-right-color: #2b71fe;
}

@keyframes radar-beam {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes Heightchange {
    0% {
        height: 0;
    }

    100% {
        height: 100%;
    }
}
</style>