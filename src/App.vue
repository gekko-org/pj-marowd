<template>
<v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>PJ-marowd</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="loggedIn" class='namestyle'>{{username}}</div>
        <v-btn color="info" v-if="loggedIn" v-on:click=Test(loggedIn)>Logout</v-btn>
        <v-btn color="info" v-if="!loggedIn" v-on:click=Test(loggedIn)>Login</v-btn>
    </v-toolbar>

    <v-content>
        <router-view/>
    </v-content>
</v-app>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                // loggedIn: getLoginState(),みたいに直接ログイン状態を判断して結果を埋め込む
                //今はとりあえずそのまま値を入れている。
                loggedIn: true,
                username: 'takechan'
            }
        },
        methods: {
            Test: function (loginState) {
                alert('Change  Login ' + loginState + ' to ' + !loginState);
            },
        }
    }
</script>
<style scoped>
    .namestyle{
        font-size: 18px;
        color: darkblue;
    }
</style>
