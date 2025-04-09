import { createApp } from 'vue';
import type { App as Root } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import isInIcestark from '@ice/stark-app/lib/isInIcestark';
import getBasename from '@ice/stark-app/lib/getBasename';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue';
import routes from './routes';
import 'vant/lib/index.css'
import Vant from 'vant';
import VueQrcode from 'vue-qrcode'
import { createPinia } from 'pinia';
import DataVVue3 from '@kjgl77/datav-vue3'
import VxeUIAll from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VueAMap from 'vue-amap';
let vue: Root<Element> | null = null;

const runApp = (container: Element | string) => {
  const history = createWebHistory(isInIcestark() ? getBasename() : '/');
  const router = createRouter({
    history,
    routes,
  });
  const pinia = createPinia()
  vue = createApp(App);
  vue.use(pinia)
  vue.use(router);
  vue.use(VueAMap);
  vue.use(DataVVue3);
  vue.use(Vant);
  vue.use(VueQrcode);
  vue.use(VxeUIAll);
  vue.use(VxeUITable);
  vue.mount(container);
  vue.use(ElementPlus, {
    locale: zhCn,
  });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    vue.component(key, component)
  }
};

if (!isInIcestark()) {
  runApp('#app');
}

// 初始化vue-amap
// VueAMap.initAMapApiLoader({
//   // 高德key
//   key: 'dac828ec9b562e609285b5e34a06af00',
//   // 插件集合 （插件按需引入）
//   plugin: [
//     "AMap.Autocomplete", // 输入提示插件
//     "AMap.PlaceSearch", // POI搜索插件
//     "AMap.Scale", // 右下角缩略图插件 比例尺
//     "AMap.OverView", // 地图鹰眼插件
//     "AMap.ToolBar", // 地图工具条
//     "AMap.MapType", // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
//     "AMap.PolyEditor", // 编辑 折线多，边形
//     "AMap.CircleEditor", // 圆形编辑器插件
//     "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
//     "AMap.ControlBar", // 缩放、尺寸控制器
//     "AMap.Geocoder"
//   ],
//   //AMap.Geolocation定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位sdk辅助定位等多种  
//   v: '1.4.4',
//   uiVersion: "1.1"
// })

export function mount({ container }: { container: Element }) {
  runApp(container);
}

export function unmount() {
  if (vue) {
    vue.unmount();
  }
}
