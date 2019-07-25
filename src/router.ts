import Vue from 'vue';
import Router from 'vue-router';
import ShowCase from './views/ShowCase.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShowCase
    }
  ]
});
