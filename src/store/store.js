import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '',
    user: null
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    updates(state, user, token) {
      state.user = user;
      state.token = token;
    }
  }
});

export default store;
