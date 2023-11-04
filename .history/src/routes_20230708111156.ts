
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
        path:"InstrumentCenter/cp",
        component:()=>import("./components/ControlPoint/ControlPoint.vue")
      },
      {
        path:"InstrumentCenter/cp",
        component:()=>import("./components/InstrumentType/InstrumentType.vue")
      },
      {
        path:"InstrumentCenter/cp",
        component:()=>import("./components/InstruementName/InstruementName.vue")
      },
      {
        path:"InstrumentCenter/cp",
        component:()=>import("./components/InstrumentSpecification/InstrumentSpecification.vue")
      },
      {
        path:"InstrumentCenter/cp",
        component:()=>import("./components/PrecisionUnitType/PrecisionUnitType.vue")
      },
    ]
  }
];

export default routes;
