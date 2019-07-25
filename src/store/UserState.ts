// 元ネタ https://qiita.com/shibe23/items/43089f95f295a3bf3d46
import {
  Mutation,
  VuexModule,
  getModule,
  Module
} from 'vuex-module-decorators';
import store from '@/src/store';
import { UserStateHandler, UserState } from '@/src/types';

@Module({ dynamic: true, store, name: 'userState', namespaced: true })
class User extends VuexModule implements UserStateHandler {
  userState: UserState = { token: '', user: null };

  @Mutation
  public SET_USER(payload: UserState) {
    this.userState = payload;
  }
}

export const UserModule = getModule(User);
