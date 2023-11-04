
import EquipmentCenter from './components/EquipmentCenter.vue';
import isInIcestark from '@ice/stark-app/lib/isInIcestark';
import renderNotFound from '@ice/stark-app/lib/renderNotFound';

const renderNotFoundPromise = () => new Promise((resolve) => {
  renderNotFound();
  resolve(true);
});

const routes = [
  {
    path: 'EquipmentCenter',
    component: EquipmentCenter,
  }
];

export default routes;
