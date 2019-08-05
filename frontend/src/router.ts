import Vue from 'vue';
import Router from 'vue-router';
import ShowCase from './views/ShowCase.vue';
import TopPage from './views/TopPage.vue';
import DetailPage from './views/DetailPage.vue';
import NewOrEditPage from './views/NewOrEditPage.vue';
import EditComment from './views/EditComment.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShowCase
    },
    {
      path: '/toppage',
      name: 'toppage',
      component: TopPage
    },
    {
      path: '/',
      name: 'showcase',
      component: ShowCase
    },
    {
      path: '/detailpage',
      name: 'detailpage',
      component: DetailPage
    },
    {
      path: '/neworeditpage',
      name: 'neworeditpage',
      component: NewOrEditPage
    },
    {
      path: '/editcomment',
      name: 'editcomment',
      component: EditComment
    }
  ]
});
