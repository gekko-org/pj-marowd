<template>
    <v-container grid-list-md>
        <v-flex xs10 sm7>
            <v-card>
                <v-card-title class="font-weight-bold pb-0">{{subject}}</v-card-title>
                <v-card-text class='pb-0'>
                    <v-layout row>
                        <v-flex xs1 d-flex><img src="../assets/loginphoto.png"></v-flex>
                        <v-layout justify-center>
                            <v-flex xs8 d-flex>{{date}}<br>reviewed by {{name}}</v-flex>
                        </v-layout>
                    </v-layout>
                    <v-flex xs10>
                        <button class='goodstyle' v-bind:class='{active:goodIsActive}'
                                v-on:click='goodIsActive=!goodIsActive;changeStateGood()'>
                            <i class='fas fa-thumbs-up'></i></button>&nbsp;&nbsp;&nbsp;
                        <button class='badstyle' v-bind:class='{active:badIsActive}'
                                v-on:click='badIsActive=!badIsActive;changeStateBad()'>
                            <i class='fas fa-thumbs-down' v-bind:class='{active:badIsActive}'></i></button>
                    </v-flex>
                </v-card-text>
                <v-card-text>
                    {{text}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-container>
</template>
<script>
    export default {
        name: "AppComment",
        props: ['name', 'date', 'subject', 'text',],
        data: function () {
            return {
                goodIsActive: false,
                badIsActive: false,
            }
        },
        methods: {
            changeStateGood: function () {
                this.$emit('buttonPush',);
                this.badIsActive = false;
            },
            changeStateBad: function () {
                this.$emit('buttonPush',);
                this.goodIsActive = false;
            }
        }
    }
</script>


<style scoped>
    .goodstyle {
        font-size: 170%;
        padding: 8px;
        color: gray;
        cursor: pointer;
    }

    .goodstyle.active {
        color: red;
        cursor: pointer;
    }

    .badstyle {
        font-size: 170%;
        padding: 8px;
        color: gray;
        cursor: pointer;
    }

    .badstyle.active {
        color: blue;
        cursor: pointer;
    }

</style>
