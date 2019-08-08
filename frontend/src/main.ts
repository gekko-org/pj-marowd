import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify/lib';
import store from './store';
import './registerServiceWorker';
import * as firebase from 'firebase';

Vue.config.productionTip = false;
Vue.use(Vuetify);
const vuetifyOptions = {};
const firebaseConfig = {
  apiKey: 'AIzaSyBCTUDGs3SAzmBQUOv-kQq7s_PYaWOpdio',
  authDomain: 'pj-marowd.firebaseapp.com',
  databaseURL: 'https://pj-marowd.firebaseio.com',
  projectId: 'pj-marowd',
  storageBucket: 'pj-marowd.appspot.com',
  messagingSenderId: '878555019849',
  appId: '1:878555019849:web:22d4242096f12135'
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetifyOptions),
  render: (h) => h(App)
}).$mount('#app');
