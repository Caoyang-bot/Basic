import renderNotFound from '@ice/stark-app/lib/renderNotFound';
import { RouteRecordRaw } from 'vue-router';

const renderNotFoundPromise = () => new Promise((resolve) => {
  renderNotFound();
  resolve(true);
});

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/print",
  },

  {
    path: '/print',
    component: () => import("./Login/BatchCardPrint.vue"),
  },

  {
    path: '/AuthenticationPassword',
    component: () => import("./Login/AuthenticationPassword.vue")
  },
  {
    path: '/login',
    component: () => import("./Login/login.vue")
  },

  {
    path: '/onlyId',
    component: () => import("./Login/onlyId.vue")
  },
  {
    path: '/qrCode',
    component: () => import("./Login/qrCode.vue")
  },
  {
    path: '/fullcalendar',
    component: () => import("./Login/fullcalendar.vue")
  },
  {
    path: '/Largevisual',
    component: () => import("./Login/Largevisual.vue")

  },
  {
    path: '/BarCode',
    component: () => import("./Login/BarCode.vue")

  },

  {
    path: '/qsCode',

    component: () => import("./Login/qsCode.vue")
  },
  {
    path: '/AMap',

    component: () => import("./Login/AMap.vue")
  },
  {
    path: '/Export',
    component: () => import("./Login/Main.vue")
  },
  {
    path: '/Ip',
    component: () => import("./Login/Ip.vue")
  },
  {
    path: '/number-game',
    component: () => import("./Game/NumberGame.vue")
  },
  {
    path: '/snake-game',
    component: () => import("./Game/SnakeGame.vue")
  },
  {
    path: '/elevator-game',
    component: () => import("./Game/ElevatorGame.vue")
  },
  {
    path: '/gold-miner',
    component: () => import("./Game/GoldMinerGame.vue")
  },
  {
    path: '/threejs-example',
    component: () => import("./views/ThreeJSExample.vue")
  },
  {
    path: '/testTable',
    component: () => import("./Login/testTable.vue")
  },
  {
    path: '/LifecycleDemo',
    component: () => import("./examples/LifecycleDemo.vue")
  },
  {
    path: '/VxeTableExample',
    component: () => import("./examples/VxeTableExample.vue")
  },
  {
    path: '/calculator',
    component: () => import("./Login/Calculator.vue")
  },
  {
    path: '/signature',
    component: () => import("./Login/SignaturePad.vue")
  },
  {
    path: '/:pathMatch(.*)',
    redirect: "/orderDetail/plan",
  }
];

export default routes;
