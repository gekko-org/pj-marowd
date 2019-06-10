import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import TopPage from './components/pages/TopPage.vue';


Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  render: h => h(TopPage),
}).$mount('#app')

new Vue({
  el: '#apps',
  data: {},
  components: {
  }
});
