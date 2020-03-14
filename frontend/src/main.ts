import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify/lib';
import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import Auth from './plugins/auth';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPlus,
  faMinus,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
// アイコンがこれらを使わなかった場合、コメントアウト文は削除して良い

library.add(faPlus, faMinus, faExternalLinkAlt);



library.add(fas, far, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(Vuetify);
const vuetifyOptions = {};

Vue.use(Auth);

new Vue({
  router,
  vuetify: new Vuetify(vuetifyOptions),
  render: (h) => h(App)
}).$mount('#app');
