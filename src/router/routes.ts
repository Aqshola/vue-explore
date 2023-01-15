import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainWrapper.vue'),
    meta: {
      privilage: 'all',
    },
    children: [
      {
        name: 'landing',
        path: '',
        component: () => import('pages/homepage/IndexHome.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: {
      privilage: 'public',
    },
    component: () => import('layouts/MainWrapper.vue'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('pages/auth/LoginAuth.vue'),
      },
    ],
  },
  {
    path: '/register',
    meta: {
      privilage: 'public',
    },
    component: () => import('layouts/MainWrapper.vue'),
    children: [
      {
        name: 'register',
        path: '',
        component: () => import('pages/auth/RegisterAuth.vue'),
      },
    ],
  },

  {
    path: '/todo',
    meta: {
      privilage: 'private',
    },
    children: [
      {
        name: 'todoIndex',
        path: '',
        component: () => import('pages/todo/IndexTodo.vue'),
      },
      {
        name: 'todoCreate',
        path: 'create',
        component: () => import('pages/todo/CreateTodo.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
