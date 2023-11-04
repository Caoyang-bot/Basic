
import InstrumentCenter from './components/Instrument/InstrumentCenter.vue';
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
  }
];

export default routes;
