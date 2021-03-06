import Vue from 'vue';
import Router from 'vue-router';
import TopPage from './views/TopPage.vue';
import DetailPage from './templates/DetailPage.vue';
import NewOrEditPage from './views/NewOrEditPage.vue';
import EditComment from './views/EditComment.vue';
import { authGuard } from '@/guard';
import ClassList from './pages/ClassList.vue';
import MyPage from '@/views/MyPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // "/"からログアウトした場合、"/"にrouter.pushした場合エラーが出る(NavigationDuplicated)
      // これの回避のため、ログアウト時の遷移先を /logouted にして対応(Aliasなので実体は同じ)
      alias: '/logout',
      component: TopPage
    },
    {
      path: '/toppage',
      name: 'toppage',
      component: TopPage
    },
    {
      path: '/detailpage',
      name: 'detailpage',
      component: DetailPage
    },
    {
      path: '/neworeditpage',
      name: 'neworeditpage',
      component: NewOrEditPage,
      beforeEnter: authGuard
    },
    {
      path: '/editcomment',
      name: 'editcomment',
      component: EditComment,
      beforeEnter: authGuard
    },
    {
      path: '/list',
      name: 'list',
      component: ClassList
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    }
  ]
});
