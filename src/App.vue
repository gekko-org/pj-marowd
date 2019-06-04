<template>
<v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>PJ-marowd</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="logged_in" class='namestyle'>{{username}}</div>
        <v-btn color="info" v-if="logged_in" v-on:click=Test(logged_in)>Logout</v-btn>
        <v-btn color="info" v-if="!logged_in" v-on:click=Test(logged_in)>Login</v-btn>
    </v-toolbar>

    <v-content>
        <show-case/>
    </v-content>
</v-app>
</template>

<script>
    import ShowCase from "@/components/ShowCase";


    export default {
        name: 'App',
        components: {
            ShowCase,
        },
        data() {
            return {
                // logged_in: getLoginState(),みたいに直接ログイン状態を判断して結果を埋め込む
                //今はとりあえずそのまま値を入れている。
                logged_in: true,
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
