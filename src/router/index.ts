import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { useAuthStore } from 'src/stores/authStore';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const state = useAuthStore();
    const { authData } = state;
    const isAuthenticated = authData.isAuth;

    if (!isAuthenticated) {
      if (
        to.name !== 'login' &&
        to.name !== 'register' &&
        to.name !== 'landing'
      ) {
        next({ name: 'login' });
      } else {
        next();
      }
    } else {
      if (to.name == 'login' || to.name == 'register') {
        next({ name: 'todoIndex' });
      } else {
        next();
      }
    }
  });

  return Router;
});
