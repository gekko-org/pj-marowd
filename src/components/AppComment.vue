<template>
    <v-container grid-list-md>
        <v-flex xs10 sm7>
            <v-card>
                <v-layout align-center>
                    <v-card-title class="font-weight-bold pb-0">{{subject}}</v-card-title>
                </v-layout>
                <v-card-text class='pb-0'>
                    <v-layout row>
                        <v-flex xs1 d-flex><img src="../assets/loginphoto.png"></v-flex>
                        <v-layout justify-center>
                            <v-flex xs8 d-flex>{{date}}<br>reviewed by {{name}}</v-flex>
                        </v-layout>
                    </v-layout>
                        <v-flex xs9>
                            <button class='goodstyle' v-bind:class='{active:goodIsActive}'
                                    v-on:click='goodIsActive=!goodIsActive'>
                                <i class='fas fa-thumbs-up'></i></button>&nbsp;&nbsp;&nbsp;
                            <button class='badstyle' v-bind:class='{active:badIsActive}'
                                    v-on:click='badIsActive=!badIsActive'>
                                <i class='fas fa-thumbs-down' v-bind:class='{active:badIsActive}'></i></button>
                        </v-flex>
                </v-card-text>
                <v-card-text>
                    この授業は落胆でありながら出席確認がなく、どんなに遅刻しても先生は許してくれる髪授業です。しかし注意しなければならないことが１つだけあります。
                    それは小テストです。この授業では１タームを通して３回の小テストが行われます。
                </v-card-text>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: "AppComment",
        props: ['name', 'message', 'date', 'subject'],
        data: function () {
            return {
                goodIsActive: false,
                badIsActive: false,
            }
        },
        compute: {}
    }
</script>


<style scoped>
    .goodstyle {
        font-size: 200%;
        padding: 10px;
        color: gray;
        cursor: pointer;
    }

    .goodstyle.active {
        color: red;
        cursor: pointer;
    }

    .badstyle {
        font-size: 200%;
        padding: 10px;
        color: gray;
        cursor: pointer;
    }

    .badstyle.active {
        color: blue;
        cursor: pointer;
    }

</style>
