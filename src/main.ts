import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import '@mdi/font/css/materialdesignicons.css';
import * as Sentry from '@sentry/browser';

Vue.config.productionTip = false;

Sentry.init({
  dsn: 'https://ee58a2f4d06148e59af5473f2e71ff02@sentry.io/1411606',
  integrations: [new Sentry.Integrations.Vue({
    Vue,
    attachProps: true,
  })],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
