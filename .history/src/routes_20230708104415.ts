
import InstrumentCenter from './components/Instrument/InstrumentCenter.vue';
import EquipmentCenter from './components/Equipment/EquipmentCenter.vue'
import isInIcestark from '@ice/stark-app/lib/isInIcestark';
import renderNotFound from '@ice/stark-app/lib/renderNotFound';
import { RouteRecordRaw } from 'vue-router';

const renderNotFoundPromise = () => new Promise((resolve) => {
  renderNotFound();
  resolve(true);
});

const routes: RouteRecordRaw[] = [
  {
    path: '/', redirect: '/InstrumentCenter'
  },
  {
    path: '/InstrumentCenter',
    component: InstrumentCenter,
  },
  {
    path: '/EquipmentCenter',
    component: EquipmentCenter,
  }
  

];

export default routes;
