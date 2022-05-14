import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/equip',
  },
  {
    path: '/equip',
    name: 'Equip',
    component: () => import(/* webpackChunkName: "revive" */ '../components/EquipmentCalculator.vue'),
    children: [
      {
        path: ':category',
        name: 'ReviveCategory',
        component: () => import(/* webpackChunkName: "revive" */ '../components/EquipmentCalculator.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
