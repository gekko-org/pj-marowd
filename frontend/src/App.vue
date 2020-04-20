<template>
  <v-container>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>PJ-marowd</span>
      </v-toolbar-title>
      <p v-if="!!errorMsg">{{ errorMsg }}</p>
      <v-spacer />
      <p v-if="!!isUserLoggedIn" class="namestyle">
        {{ isUserLoggedIn.displayName }}
      </p>
      <v-btn v-if="!!isUserLoggedIn" @click="toNewClassPage" > 授業投稿
      </v-btn>
      <v-btn
        v-if="!!isUserLoggedIn"
        class="namestyle"
        @click="myPageButtonClicked"
      >
        mypage
      </v-btn>
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
import auth from '@/plugins/auth';

@Component
export default class App extends Vue {
  // TODO　@reud:子コンポーネントから発火されたイベントをerrorMsgに入れるメソッドを書く
  errorMsg: string = '';
  isUserLoggedIn: firebase.User | boolean = false;

  async created() {
    // 認証状態の取得 (認証済みでない場合はfalseが入る)
    this.isUserLoggedIn = await auth();
    if (this.isUserLoggedIn) {
      const user = this.isUserLoggedIn as firebase.User;
      console.log('will output id token');
      console.log(await user.getIdToken());
    }
  }

  async loginButtonClicked() {
    const provider = new firebase.auth.GoogleAuthProvider();

    // リダイレクト
    await firebase.auth().signInWithRedirect(provider);
    await firebase
      .auth()
      .getRedirectResult()
      .catch((e: any) => {
        this.errorMsg = e.toString();
      });
  }

  myPageButtonClicked() {
    if (this.$router.currentRoute.path != '/mypage') {
      this.$router.push('/mypage');
    } else {
      // reload
      this.$router.go(0);
    }
  }

  toNewClassPage() {
    if (this.$router.currentRoute.path != '/class/new') {
      this.$router.push('/class/new');
    } else {
      // reload
      this.$router.go(0);
    }
  }

  async logoutButtonClicked() {
    await firebase.auth().signOut();
    // ブラウザレベルのリロード
    this.$router.go(0);
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
