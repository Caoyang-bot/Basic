import renderNotFound from '@ice/stark-app/lib/renderNotFound';
import { RouteRecordRaw } from 'vue-router';

const renderNotFoundPromise = () => new Promise((resolve) => {
  renderNotFound();
  resolve(true);
});

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/login',
    component: () => import("./Login/login.vue")
  },
  {
    path: '/:pathMatch(.*)',
    redirect: "/orderDetail/plan",
  }
];

export default routes;
