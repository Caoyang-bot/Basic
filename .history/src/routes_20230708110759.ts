
import renderNotFound from '@ice/stark-app/lib/renderNotFound';
import { RouteRecordRaw } from 'vue-router';

const renderNotFoundPromise = () => new Promise((resolve) => {
  renderNotFound();
  resolve(true);
});

const routes: RouteRecordRaw[] = [
  {
    path: '/',
     redirect: '/InstrumentCenter'
  },
  {
    path: '/InstrumentCenter',
    redirect:"InstrumentCenter/cp",
    children:[
      {
        path:"",
        components:()=>import("./components/ControlPoint/ControlPoint.vue")
      }
    ]
  }
];

export default routes;
