<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>PJ-marowd</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
import { vxm } from './store';

@Component
export default class App extends Vue {
  public get userName() {
    if (vxm.user.user) {
      return vxm.user.user.displayName;
    } else {
      return '';
    }
  }
  public get loginState(): boolean {
    return !!vxm.user.user;
  }
  public unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      vxm.user.SET_USER(user);
    } else {
      vxm.user.initialize();
    }
  });

  public login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        if (result.user !== null) {
          alert(result.user.displayName);
          vxm.user.SET_USER(result.user);
        }
        if (result.credential !== null) {
          // alert(result.credential.providerId);
          const cre: firebase.auth.AuthCredential = result.credential;
          vxm.user.SET_TOKEN(cre.providerId);
        }

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
  public logout() {
    firebase
      .auth()
      .signOut()
      .then(() => vxm.user.initialize())
      .catch((err) => alert(err.toString()));
  }
}
</script>
<style scoped>
.namestyle {
  font-size: 18px;
  color: darkblue;
}
</style>
