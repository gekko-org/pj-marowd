<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>PJ-marowd</span>
      </v-toolbar-title>
      <v-spacer/>
      <div class="namestyle">
        {{ userName }}
      </div>
      <v-btn v-if="loginState" color="info" v-on:click="logout">Logout</v-btn>
      <v-btn color="info" v-else v-on:click="login">Login</v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script lang="ts">
import firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

  public login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        if (result.user !== null) {
          alert(result.user.displayName);
        }
        if (result.credential !== null) {
          // alert(result.credential.providerId);
          // @ts-ignore
          const cre: firebase.auth.AuthCredential = result.credential;
        }
        // debug終わったら消してください
        // @ts-ignore
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((token) => console.log(token));

        // The signed-in user info.
        // ...
      })
      .catch(function(error) {
        alert(
          error.code +
            ': ' +
            error.message +
            '\n' +
            error.email +
            '\n' +
            error.toString()
        );
      });
  }

}
</script>
<style scoped>
.namestyle {
  font-size: 18px;
  color: darkblue;
}
</style>
