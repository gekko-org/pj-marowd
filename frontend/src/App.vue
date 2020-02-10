<template>
  <v-container>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>PJ-marowd</span>
      </v-toolbar-title>
      <p v-if="!!errorMsg">{{ errorMsg }}</p>
      <v-spacer />
      <div v-if="!!isUserLoggedIn" class="namestyle">
        {{ isUserLoggedIn.displayName }}
      </div>
      <v-btn class="blue" v-if="!isUserLoggedIn" @click="loginButtonClicked"
        >Login</v-btn
      >
      <v-btn v-else class="blue" @click="logoutButtonClicked">Logout</v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-container>
</template>
<script lang="ts">
import firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import auth from './plugins/auth';
import * as admin from '@/node_modules/firebase-admin';
import refreshToken = admin.credential.refreshToken;
import credential from '@/node_modules/firebase-admin';

@Component
export default class App extends Vue {
  // TODO　@reud:子コンポーネントから発火されたイベントをerrorMsgに入れるメソッドを書く
  errorMsg: string = '';
  isUserLoggedIn: firebase.User | boolean = false;

  async created() {
    // 認証状態の取得 (認証済みでない場合はfalseが入る)
    this.isUserLoggedIn = await auth();
  }

  async loginButtonClicked() {
    const provider = new firebase.auth.GoogleAuthProvider();

    // リダイレクト
    firebase.auth().signInWithRedirect(provider);

    const result = await firebase
      .auth()
      .getRedirectResult()
      .catch((e: any) => {
        this.errorMsg = e.toString();
      });

    console.log(result.credential.accessToken);
  }

  async logoutButtonClicked() {
    await firebase.auth().signOut();

    // "/"logoutからログアウトされると、Error: NavigationDuplicateになるため、
    // "/"logoutでログアウトされた場合に限り。"/"に飛ばす
    if (this.$router.currentRoute.path !== '/logout') {
      await this.$router.push('/logout');
    } else {
      await this.$router.push('/');
    }
    this.isUserLoggedIn = await auth();
  }
}
</script>
<style scoped>
.namestyle {
  font-size: 18px;
  color: darkblue;
}
</style>
