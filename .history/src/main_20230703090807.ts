import { createApp } from 'vue';
import type { App as Root } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import isInIcestark from '@ice/stark-app/lib/isInIcestark';
import getBasename from '@ice/stark-app/lib/getBasename';
import App from './App.vue';
import routes from './routes';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


let vue: Root<Element> | null = null;

const runApp = (container: Element | string) => {
  const history = createWebHistory(isInIcestark() ? getBasename() : '/');
  const router = createRouter({
    history,
    routes,
  });
  vue = createApp(App);
  vue.use(router);
  vue.use(ElementPlus)
  vue.mount(container);
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
