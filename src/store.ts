import Vue from 'vue';
import Vuex from 'vuex';
import { UserStateHandler } from '@/src/types';
Vue.use(Vuex);

export default new Vuex.Store<UserStateHandler>({});
