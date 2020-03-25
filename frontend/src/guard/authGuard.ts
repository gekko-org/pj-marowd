import { Route } from 'vue-router';
import auth from './../../src/plugins/auth';

// Vue-routerのナビゲーションガード
// https://router.vuejs.org/ja/guide/advanced/navigation-guards.html
// 認証状態を確認して、未認証なら "/"にリダイレクトする。
export const authGuard = async (to: Route, from: Route, next: Function) => {
  const user = await auth();
  if (!user) {
    return next('/');
  }
  return next();
};
