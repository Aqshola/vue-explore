import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainWrapper.vue'),
    children: [
      { path: '', component: () => import('pages/homepage/IndexHome.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/MainWrapper.vue'),
    children: [
      { path: '', component: () => import('pages/auth/LoginAuth.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/MainWrapper.vue'),
    children: [
      { path: '', component: () => import('pages/auth/RegisterAuth.vue') },
    ],
  },

  {
    path: '/todo',
    component: () => import('layouts/TodoWrapper.vue'),
    children: [
      { path: '', component: () => import('pages/todo/IndexTodo.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
