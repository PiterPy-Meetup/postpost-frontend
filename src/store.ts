import Vue from 'vue';
import Vuex, {mapGetters} from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: '',
    refreshToken: '',
  },
  getters: {
    accessToken: (state) => {
      return state.accessToken;
    },
  },
  mutations: {
    changeTokens(state, {accessToken, refreshToken}) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});
