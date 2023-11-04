
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
    redirect:"/ControlPoint",
    children:[
      {
        path:"InstrumentCenter/ControlPoint",
        component:()=>import("./components/ControlPoint/ControlPoint.vue")
      },
      // {
      //   path:"InstrumentCenter/InstrumentType",
      //   component:()=>import("./components/InstrumentType/InstrumentType.vue")
      // },
      // // {
      // //   path:"InstrumentCenter/cp",
      // //   component:()=>import("./components/InstruementName/InstruementName.vue")
      // // },
      // {
      //   path:"InstrumentCenter/InstrumentSpecification",
      //   component:()=>import("./components/InstrumentSpecification/InstrumentSpecification.vue")
      // },
      // {
      //   path:"InstrumentCenter/PrecisionUnitType",
      //   component:()=>import("./components/PrecisionUnitType/PrecisionUnitType.vue")
      // },
    ]
  }
];

export default routes;
