import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')