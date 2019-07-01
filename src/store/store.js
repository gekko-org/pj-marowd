import Vue from 'vue'
import Vuex from 'Vuex'

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
            state.text = data
        },
        setUser(state, data) {
            state.user = data
        }
    },
    actions: {
        updates({ commit }, user,token) {
            commit('setToken', token);
            commit('setUser', user);
        }
    }
});

export default store
