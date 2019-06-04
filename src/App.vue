<template>
<v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <span>PJ-marowd</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="isLogined" class='namestyle'>{{username}}</div>
        <v-btn color="info" v-if="isLogined" v-on:click=Test(isLogined)>Logout</v-btn>
        <v-btn color="info" v-if="!isLogined" v-on:click=Test(isLogined)>Login</v-btn>
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
                // isLogined: getLoginState(),みたいに直接ログイン状態を判断して結果を埋め込む
                //今はとりあえずそのまま値を入れている。
                isLogined: true,
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
