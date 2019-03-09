import Vue from 'vue';
import Router from 'vue-router';
import Publications from '@/views/Publications.vue';
import Login from '@/views/Login.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/publications',
      alias: '/',
      name: 'publications',
      component: Publications,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next();
  }
  const isAccessTokenExist = Boolean(store.getters.accessToken);
  if (isAccessTokenExist) {
    next();
  } else {
    next({name: 'login'});
  }
});

export default router;
