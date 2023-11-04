
import List from './components/List.vue';
import isInIcestark from '@ice/stark-app/lib/isInIcestark';
import renderNotFound from '@ice/stark-app/lib/renderNotFound';

const renderNotFoundPromise = () => new Promise((resolve) => {
  renderNotFound();
  resolve(true);
});

const routes = [
  {
    path: '/',
    component: List,
  },
  {
    path: '/productCenter',
    component: List,
  }
];

export default routes;
