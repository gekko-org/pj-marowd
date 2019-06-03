<template>
    <v-container grid-list-lg>
        <v-flex xs12 md4 sm3>
            <v-card width="480px" height="300px">
                <v-layout wrap align-light>

                    <v-card-title class="font-weight-bold pb-0">
                        <img v-if="isRecommend" class="icon" src="../assets/goodIcon.png" alt="good button"/>
                        <img v-else class="icon" src="../assets/badIcon.png" alt="bad button"/>
                        {{subject}}</v-card-title>
                </v-layout>
                <v-card-text class='pb-0'>
                    <v-layout wrap align-light>
                        <v-flex xs1 sm1 class='pr-5'><img :src="image" class="circle"></v-flex>
                        <!--<v-layout justify-center>-->
                        <v-flex xs8 sm6 class='pl-3'>
                            <div>{{date}}<br>reviewed by {{name}}</div>
                        </v-flex>
                        <!--</v-layout>-->
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
        props: {
            name: {
                type: String,
                default: 'default'
            },
            image: {
                type: String,
                required: true,
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
                default: 'default'
            },
            isRecommend: {
                type: Boolean,
                required: true
            }
        },
        data: function () {
            return {
                goodIsActive: false,
                badIsActive: false,
                // image_src: require(`../../static/${this.image}`),
            }
        }
    }
</script>


<style scoped>
    img.icon {
        display: inline-block;
        width: 20px;
        height: 20px;
    }

    .circle {
        display: inline-block;
        width: 50px;
        height: 50px;
        background: #67A6EB;
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        -o-border-radius: 50px;
        -ms-border-radius: 50px;
        border-radius: 50px;
    }

</style>
