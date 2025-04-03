<!-- <template>
  <div class="app-container">
    <div id="container" class="map-container"></div>
    <div class="info">
      <h4 id='status'></h4>
      <hr>
      <p id='result'></p>
      <hr>
    </div>
    <el-input v-model="searchAddress" id="input_id" placeholder="请输入地址"></el-input>
    <div class="center-horizontal">
      <div class="circle-container" ref="circleRef" @click="checkIn">
        <span class="circle-time">{{ formattedTime }}</span>
        <div class="check-in-label">打卡</div>
  
      </div>
    </div>
  </div>
</template>  
  
<script setup>  
import { onMounted, ref, onBeforeUnmount, computed, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';

const map = ref(null);
const searchAddress = ref();
const cpoint = ref()
const currentTime = ref(new Date());
const interval = ref(null);
const p1 = ref([])
const p2 = ref([])
const distance = ref()

// 更新当前时间  
const updateTime = () => {
  currentTime.value = new Date();
};

// 格式化时间  
const formattedTime = computed(() => {
  const hours = currentTime.value.getHours().toString().padStart(2, '0');
  const minutes = currentTime.value.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.value.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});

onMounted(() => {
  initMap();
  interval.value = setInterval(updateTime, 1000);

});

onBeforeUnmount(() => {
  if (map.value) {
    // 清理地图实例（如果有需要）  
    map.value.destroy();
  }
});
onUnmounted(() => {
  clearInterval(interval.value);
});

function initMap() {
  window._AMapSecurityConfig = {
    securityJsCode: '807f7350186df0f5b99253d2083c736d', // 替换为你的安全密钥  
  };

  AMapLoader.load({
    key: 'dac828ec9b562e609285b5e34a06af00', // 替换为你的高德地图API密钥  
    version: '2.0',
    plugins: ['AMap.Geolocation', 'AMap.Geocoder'],
  }).then((AMap) => {
    map.value = new AMap.Map('container', {
      zoom: 14,
      resizeEnable: true
      // center: [116.397428, 39.90923],
    });
    AMap.plugin('AMap.Geolocation', function () {

      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true  
        timeout: 10000,          // 超过10秒后停止定位，默认：5s  
        buttonPosition: 'RB',    // 定位按钮的停靠位置  
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮距离对应角落的距离  
        zoomToAccuracy: true,    // 定位成功后是否自动调整地图视野到定位点  
        zoom: 20              // 定位成功后地图的缩放级别，默认：18  
      });

      map.value.addControl(geolocation);

      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          cpoint.value = result.position.pos
          onComplete(result)
          p1.value = [result.position.lng, result.position.lat]
        } else {
          onError(result)
        }
      });
    })
    var autoOptions = {
      input: "input_id"
    }
    AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], function () {
      var auto = new AMap.AutoComplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: map.value,
        autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围

      });  //构造地点查询类
      auto.on("select", select);//注册监听，当选中某条记录时会触发
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
        p2.value = [e.poi.location.lng, e.poi.location.lat]
        distance.value = AMap.GeometryUtil.distance(p1.value, p2.value)
      }
    });
  })


}

function onComplete(data) {
  document.getElementById('status').innerHTML = '定位成功';

  // 创建Geocoder实例  
  const geocoder = new AMap.Geocoder();

  // 使用定位结果的经纬度进行逆地理编码  
  geocoder.getAddress([data.position.lng, data.position.lat], function (status, result) {
    if (status === 'complete' && result.regeocode) {
      // 逆地理编码成功，result.regeocode.formattedAddress即为详细地址  
      const formattedAddress = result.regeocode.formattedAddress;
      // console.log('逆地理编码结果：', formattedAddress);
      var str = [];
      str.push('定位结果：' + data.position.lng + ',' + data.position.lat);
      str.push('详细地址：' + formattedAddress); // 添加详细地址  
      str.push('定位类别：' + data.location_type);
      if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米');
      }
      str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
      document.getElementById('result').innerHTML = str.join('<br>');
    } else {
      // 逆地理编码失败，处理错误信息  
      console.error('逆地理编码失败：', result.info);
      // 假设有一个 onError 函数来处理错误  
      onError({ message: '逆地理编码失败' });
    }
  });
}
const checkIn = () => {
  console.log(p1.value)
  console.log(p2.value)
  console.log(distance.value)
  if (p2.value.length == 0) {
    console.log()
  } else {

  }
  // if (distance.value < 2000) {
  //   console.log('打卡成功')
  // } else {
  //   console.log('打卡失败,')
  // }
}
// 解析定位错误信息  
function onError(data) {
  document.getElementById('status').innerHTML = '定位失败';
  document.getElementById('result').innerHTML = '失败原因排查信息:' + (data.message || '未知错误');
}  
</script>  
  
<style scoped>
.app-container {
  width: 100%;
  height: 400px;
  /* 或者设置为你需要的固定高度 */

}

.map-container {
  width: 100%;
  height: 100%;
  /* 地图容器的高度 */
}

.circle-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3c85e4;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #f0e7e7;
}

.center-horizontal {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  width: 100%;
  /* 宽度设为100%以确保它可以横跨其父元素的整个宽度 */
}

.check-in-label {
  /* 打卡字段的样式 */
  margin-top: 5px;
  /* 根据需要调整与时间的间距 */
  font-size: 16px;
  /* 根据需要调整字体大小 */
  color: #fff;
  /* 根据需要调整颜色 */
  text-align: center;
  /* 居中显示 */
}
</style> -->

<!-- 定位打卡 -->

<template>
  <div class="app-container">
    <div id="container" class="map-container"></div>
    <div class="info">
      <!-- <h4 id='status'></h4>
                                                                                                                  <hr>
                                                                                                                  <p id='result'></p>
                                                                                                                  <hr> -->
      <van-cell-group inset>
        <van-field v-model="address" rows="1" autosize label="当前位置:" type="textarea" disabled />
        <van-field v-model="searchAddress" rows="1" autosize id="input_id" type="textarea" placeholder="请输入地址" />
      </van-cell-group>
    </div>
    <!-- <input v-model="searchAddress" id="input_id" placeholder="请输入地址" /> -->
    <div class="center-horizontal">
      <div class="circle-container" ref="circleRef" @click="checkIn">
        <span class="circle-time">{{ formattedTime }}</span>
        <div class="check-in-label">打卡</div>
  
      </div>
    </div>
  </div>
</template>  
    
  <script setup>  
import { onMounted, ref, onBeforeUnmount, computed, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { showNotify, showImagePreview, showDialog } from "vant";

const map = ref(null);
const searchAddress = ref();
const cpoint = ref()
const currentTime = ref(new Date());
const interval = ref(null);
const p1 = ref([])
const p2 = ref([])
const distance = ref()
const address = ref()
const address1 = ref()

// 更新当前时间  
const updateTime = () => {
  currentTime.value = new Date();
};

// 格式化时间  
const formattedTime = computed(() => {
  const hours = currentTime.value.getHours().toString().padStart(2, '0');
  const minutes = currentTime.value.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.value.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
});

onMounted(() => {
  initMap();
  interval.value = setInterval(updateTime, 1000);

});

onBeforeUnmount(() => {
  if (map.value) {
    // 清理地图实例（如果有需要）  
    map.value.destroy();
  }
});
onUnmounted(() => {
  clearInterval(interval.value);
});

function initMap() {
  window._AMapSecurityConfig = {
    securityJsCode: 'a4e02e0ace7a66d4ab59f750d7d8b5fa', // 替换为你的安全密钥  
  };

  AMapLoader.load({
    key: 'd9d2f53feb4c1a62b8dbb1900567f164	', // 替换为你的高德地图API密钥  
    version: '2.0',
    plugins: ['AMap.Geolocation', 'AMap.Geocoder'],
  }).then((AMap) => {
    map.value = new AMap.Map('container', {
      zoom: 14,
      resizeEnable: true
      // center: [116.397428, 39.90923],
    });
    AMap.plugin('AMap.Geolocation', function () {

      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true  
        timeout: 10000,          // 超过10秒后停止定位，默认：5s  
        buttonPosition: 'RB',    // 定位按钮的停靠位置  
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮距离对应角落的距离  
        zoomToAccuracy: true,    // 定位成功后是否自动调整地图视野到定位点  
        zoom: 18              // 定位成功后地图的缩放级别，默认：18  
      });

      map.value.addControl(geolocation);

      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          cpoint.value = result.position.pos
          onComplete(result)
          p1.value = [result.position.lng, result.position.lat]
        } else {
          onError(result)
        }
      });
    })
    var autoOptions = {
      input: "input_id"
    }
    AMap.plugin(['AMap.PlaceSearch', 'AMap.AutoComplete'], function () {
      var auto = new AMap.AutoComplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: map.value,
        autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围

      });  //构造地点查询类
      auto.on("select", select);//注册监听，当选中某条记录时会触发
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
        address1.value = e.poi.name
        p2.value = [e.poi.location.lng, e.poi.location.lat]
        distance.value = AMap.GeometryUtil.distance(p1.value, p2.value)
      }
    });
  })


}

function onComplete(data) {
  //   document.getElementById('status').innerHTML = '定位成功';

  // 创建Geocoder实例  
  const geocoder = new AMap.Geocoder();

  // 使用定位结果的经纬度进行逆地理编码  
  geocoder.getAddress([data.position.lng, data.position.lat], function (status, result) {
    if (status === 'complete' && result.regeocode) {
      // 逆地理编码成功，result.regeocode.formattedAddress即为详细地址  
      const formattedAddress = result.regeocode.formattedAddress;
      address.value = formattedAddress
      // console.log('逆地理编码结果：', formattedAddress);
      var str = [];
      //   str.push('定位结果：' + data.position.lng + ',' + data.position.lat);
      str.push('详细地址：' + formattedAddress); // 添加详细地址  
      //   str.push('定位类别：' + data.location_type);
      //   if (data.accuracy) {
      //     str.push('精度：' + data.accuracy + ' 米');
      //   }
      //   str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
      //   document.getElementById('result').innerHTML = str.join('<br>');
    } else {
      // 逆地理编码失败，处理错误信息  
      console.error('逆地理编码失败：', result.info);
      // 假设有一个 onError 函数来处理错误  
      onError({ message: '逆地理编码失败' });
    }
  });
}
const checkIn = () => {
  if (p2.value.length == 0) {
    showNotify({ type: "success", message: '打卡成功，打卡地址为' + address.value });
  } else if (p2.value.length > 0 && distance.value < 2000) {
    showNotify({ type: "success", message: '打卡成功，打卡地址为' + address1.value });
  } else if (p2.value.length > 0 && distance.value >= 2000) {
    showNotify({ type: "warning", message: '打卡失败,打卡距离超过2000米' });
  }
}

// 解析定位错误信息  
function onError(data) {
  document.getElementById('status').innerHTML = '定位失败';
  document.getElementById('result').innerHTML = '失败原因排查信息:' + (data.message || '未知错误');
}
  </script>  
    
  <style scoped>
.app-container {
    width: 100%;
    height: 400px;
    /* 或者设置为你需要的固定高度 */
  
  }
  
  .map-container {
    width: 100%;
    height: 100%;
    /* 地图容器的高度 */
  }
  
  .circle-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #3c85e4;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #f0e7e7;
  }
  
  .center-horizontal {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    width: 100%;
    /* 宽度设为100%以确保它可以横跨其父元素的整个宽度 */
  }
  
  .check-in-label {
    /* 打卡字段的样式 */
    margin-top: 5px;
    /* 根据需要调整与时间的间距 */
    font-size: 16px;
    /* 根据需要调整字体大小 */
    color: #fff;
    /* 根据需要调整颜色 */
    text-align: center;
    /* 居中显示 */
  }
</style>