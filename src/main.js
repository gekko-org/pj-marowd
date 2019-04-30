import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  el: '#apps',
  data: {},
  components: {
  }
});
