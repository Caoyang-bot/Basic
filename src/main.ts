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
import { createPinia } from 'pinia';

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

export function mount({ container }: { container: Element }) {
  runApp(container);
}

export function unmount() {
  if (vue) {
    vue.unmount();
  }
}
