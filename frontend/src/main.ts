import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify/lib';
import store from './store';
import './registerServiceWorker';
import * as firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';

// アイコンがこれらを使わなかった場合、コメントアウト文は削除して良い

import {
  faPlus,
  faMinus,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faMinus, faExternalLinkAlt);

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, far, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Vuetify);
const vuetifyOptions = {};
export const firebaseConfig = {
  apiKey: 'AIzaSyBCTUDGs3SAzmBQUOv-kQq7s_PYaWOpdio',
  authDomain: 'pj-marowd.firebaseapp.com',
  databaseURL: 'https://pj-marowd.firebaseio.com',
  projectId: 'pj-marowd',
  storageBucket: 'pj-marowd.appspot.com',
  messagingSenderId: '878555019849',
  appId: '1:878555019849:web:22d4242096f12135'
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetifyOptions),
  render: (h) => h(App)
}).$mount('#app');
