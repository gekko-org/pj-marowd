<template>
    <v-container grid-list-lg>
        <v-flex xs10 sm7>
            <v-card>
                <v-card-title class="font-weight-bold pb-0">{{subject}}</v-card-title>
                <v-card-text class='pb-0'>
                    <v-layout wrap align-light>
                        <v-flex xs2 sm1 class='pr-5'><img :src="loadImg()"></v-flex>
                        <!--<v-layout justify-center>-->
                        <v-flex xs8 sm6>
                            <div>{{date}}<br>reviewed by {{name}}</div>
                        </v-flex>
                        <!--</v-layout>-->

                        <v-flex xs12 sm3 d-flex class='pt-0'>
                            <button class='goodstyle' v-bind:class='{active:goodIsActive}'
                                    v-on:click='goodIsActive=!goodIsActive;changeStateGood()'>
                                <i class='fas fa-thumbs-up'></i></button>&nbsp;&nbsp;&nbsp;
                            <button class='badstyle' v-bind:class='{active:badIsActive}'
                                    v-on:click='badIsActive=!badIsActive;changeStateBad()'>
                                <i class='fas fa-thumbs-down' v-bind:class='{active:badIsActive}'></i></button>
                        </v-flex>
                    </v-layout>
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
        // props:['name','date','text','subject','like'],
        props: {
            name: {
                type: String,
                default: 'default'
            },
            image: {
                type: String,
                isRequired: true,
                // default: '../assets/loginphoto.png'
            },
            date: {
                type: String,
                default: 'XXXX.XX.XX'
            },
            subject: {
                type: String,
                default: 'default'
            },
            text: {
                type: String,
                default: 'defalut'
            },
        },
        data: function () {
            return {
                goodIsActive: false,
                badIsActive: false,
                // image_src: require(`../../static/${this.image}`),
            }
        },
            methods: {
            //like=1でlike,like=0でdislikeを表す
                changeStateGood: function () {
                    this.like=1;
                    this.$emit('buttonPush',this.like);
                    this.badIsActive = false;
                },
                changeStateBad: function () {
                    this.like=0;
                    this.$emit('buttonPush',this.like);
                    this.goodIsActive = false;
                },
                loadImg: function(){
                    return require(`../../static/loginphoto.png`);
                },
            }
    }
</script>


<style scoped>
    .goodstyle {
        font-size: 170%;
        padding: 5px;
        color: gray;
        cursor: pointer;
    }

    .goodstyle.active {
        color: red;
        cursor: pointer;
    }

    .badstyle {
        font-size: 170%;
        padding: 5px;
        color: gray;
        cursor: pointer;
    }

    .badstyle.active {
        color: blue;
        cursor: pointer;
    }

</style>
