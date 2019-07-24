<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>PJ-marowd</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="currentUser" class='namestyle'>{{currentUser.displayName}}</div>
            <v-btn v-if="currentUser" color="info" v-on:click=logout>Logout</v-btn>
            <v-btn color="info" v-else v-on:click=login>Login</v-btn>
        </v-toolbar>

        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>
<script>
    import firebase from 'firebase';
    import store from './store/store'

    export default {
        name: 'App',
        components: {},
        props: {
            currentUser: {
                type: firebase.User,
                default: store.state.user
            },
            unsubscribe: {
                type: Function
            }
        },
        data() {
            return {
                // loggedIn: getLoginState(),みたいに直接ログイン状態を判断して結果を埋め込む
                //今はとりあえずそのまま値を入れている。
                username: '',
            }
        },
        methods: {
            login: function () {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    alert(result.user);
                    alert(result.credential);
                    store.commit('updates', result.user, result.credential.accessToken);
                    this.currentUser = result.user;
                    // The signed-in user info.
                    // ...
                }).catch(function (error) {
                    alert(error.code + ': ' + error.message + '\n' + error.email + '\n' + error.credential)
                });
            },
            logout: function () {
                firebase.auth().signOut().then().catch(
                    (err) => alert(err)
                )
            }
        },
        mounted() {
            this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.currentUser = user;
                    store.commit('setUser', user);


                } else {
                    this.currentUser = null
                }
            });
            this.currentUser = store.state.user;
            //alert(this.currentUser.displayName);
        }
    }
</script>
<style scoped>
    .namestyle {
        font-size: 18px;
        color: darkblue;
    }
</style>
