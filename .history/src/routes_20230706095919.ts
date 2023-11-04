
import EquipmentCenter from './components/EquipmentCenter.vue';
import isInIcestark from '@ice/stark-app/lib/isInIcestark';
import renderNotFound from '@ice/stark-app/lib/renderNotFound';
import { RouteRecordRaw } from 'vue-router';

const renderNotFoundPromise = () => new Promise((resolve) => {
  renderNotFound();
  resolve(true);
});

const routes: RouteRecordRaw[] = [
  {
    path: '/', redirect: '/EquipmentCenter'
  },
  {
    path: '/EquipmentCenter',
    component: EquipmentCenter,
  }
];

export default routes;
