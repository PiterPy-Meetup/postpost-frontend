import Vue from 'vue';
import Router from 'vue-router';
import Publications from '@/views/Publications.vue';
import NewPublication from '@/views/NewPublication.vue';

Vue.use(Router);

export default new Router({
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
      path: '/new',
      name: 'new_publication',
      component: NewPublication,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
