
import { isInIcestark } from '@ice/stark-app';
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
    redirect: "InstrumentCenter/ControlPoint",
    children: [
      {
        path: "/InstrumentCenter/ControlPoint",
        component: () => import("./components/ControlPoint/ControlPoint.vue")
      },
      {
        path: "/InstrumentCenter/InstrumentType",
        component: () => import("./components/InstrumentType/InstrumentType.vue")
      },
      {
        path: "/InstrumentCenter/InstrumentName",
        component: () => import("./components/InstrumentName/InstrumentName.vue")
      },
      {
        path: "/InstrumentCenter/InstrumentSpecification",
        component: () => import("./components/InstrumentSpecification/InstrumentSpecification.vue")
      },
      {
        path: "/InstrumentCenter/PrecisionUnitType",
        component: () => import("./components/PrecisionUnitType/PrecisionUnitType.vue")
      },
      {
        path: "/InstrumentCenter/PrecisionUnit",
        component: () => import("./components/PrecisionUnit/PrecisionUnit.vue")
      },
      {
        path: "/InstrumentCenter/InstrumentList",
        component: () => import("./components/InstrumentList/InstrumentList.vue")
      },

    ]
  },
];

export default routes;
