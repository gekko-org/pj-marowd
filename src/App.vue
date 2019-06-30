<template>
<v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>PJ-marowd</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="loggedIn" class='namestyle'>{{username}}</div>
        <v-btn color="info" v-if="currentUser" v-on:click=logout>Logout</v-btn>
        <v-btn color="info" v-else v-on:click=login>Login</v-btn>
    </v-toolbar>

    <v-content>
        <show-case/>
    </v-content>
</v-app>
</template>

<script>
    import ShowCase from "@/components/ShowCase";
    import firebase from 'firebase';

    export default {
        name: 'App',
        components: {
            ShowCase,
        },
        props: {
            currentUser: {
                type: firebase.User,
                default: null
            },
            unsubscribe: {
                type: Function
            }
        },
        data() {
            return {
                // loggedIn: getLoginState(),みたいに直接ログイン状態を判断して結果を埋め込む
                //今はとりあえずそのまま値を入れている。
                username: 'this.currentUser.displayName',
            }
        },
        methods: {
            Test: function (loginState) {
                alert('Change  Login ' + loginState + ' to ' + !loginState);
            },
            login: function() {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            },
            logout: function () {
                firebase.auth().signOut().then().catch(
                    (err) => alert(err)
                )
            }
        },
        mounted () {
            this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.currentUser = user
                } else {
                    this.currentUser = null
                }
            })
        }
    }
</script>
<style scoped>
    .namestyle{
        font-size: 18px;
        color: darkblue;
    }
</style>
