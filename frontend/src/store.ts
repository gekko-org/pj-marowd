// 元ネタ https://blog.28go.jp/2019/06/nuxttypescriptstore.html
import {
  VuexModule,
  Module,
  action,
  getter,
  mutation
} from 'vuex-class-component';
import { UserState } from '@/src/types';
import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from '@/node_modules/firebase';
Vue.use(Vuex);

@Module({ namespacedPath: 'user/' })
export class UserStore extends VuexModule implements UserState {
  @getter user: firebase.User | null = null;
  @getter token: string | null = null;

  @mutation
  public SET_USER(payload: firebase.User | null) {
    this.user = payload;
  }

  @mutation
  public SET_TOKEN(payload: string | null) {
    this.token = payload;
  }

  @action({})
  public initialize() {
    // actions内で簡単にthisからmutationを呼び出せる。
    this.SET_USER(null);
    this.SET_TOKEN(null);
  }
}

const store = new Vuex.Store({
  modules: {
    user: UserStore.ExtractVuexModule(UserStore)
  }
});

export default store;

export const vxm = {
  user: UserStore.CreateProxy(store, UserStore)
};
