import { configure, addDecorator } from '@storybook/vue';
import 'vuetify/dist/vuetify.css';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  iconfont: 'md',
});

addDecorator(() => ({
  // all of vuetify components requires v-app root tag
  template: '<v-app><story/></v-app>',
}));

const req = require.context('../src/stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
