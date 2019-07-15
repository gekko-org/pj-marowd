<template>
    <v-container grid-list-lg>
        <v-flex>
            <v-card :color="termColor"
                    @click="clicked">
                <v-layout justify-center>
                    <v-card-title class="font-weight-bold title-class"> {{title}} </v-card-title>
                </v-layout>
                <v-card-text class='pb-0'>
                    <v-layout wrap align-light>
                        {{faculty}}学部,{{department}}学科,{{grade}}年,{{professor}}

                        <v-flex xs12 sm12 md8 class="font-weight-bold">
                            <star-rating
                                    :increment="0.01"
                                    :rating="rating"
                                    :read-only="true">
                            </star-rating>
                        </v-flex>

                        <v-flex xs2 sm1 md4>
                            <img v-if="isRandom"
                                 class="random"
                                 src="../assets/random.png"
                                 alt="抽選">
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text>
                    <v-card>
                        <v-card-text class="font-weight-bold ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs6 sm6 class="font-weight-bold">
                            <app-good-button
                                    :fav="13222"></app-good-button>
                        </v-flex>
                        <v-flex xs6 sm6 class="font-weight-bold">
                            <p class="font-setting">最終更新者 {{lastUpdatedBy}}</p>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import StarRating from "vue-star-rating/src/star-rating";
    import AppGoodButton from "@/components/AppGoodButton";
    export default {
        name: "AppClassSummary",
        components: {AppGoodButton, StarRating},
        props: {
            title: {
                type: String,
                required: true
            },
            faculty: {
                type: String,
                required: true
            },
            grade: {
                type: [Number,String],
                required: true
            },
            professor: {
                type: String,
                required: true
            },
            isRandom: {
                type: Boolean,
                required: true
            },
            department: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            lastUpdatedBy: {
                type: String,
                required: true
            },
            term: {
                type: String,
                required: true
            },
        },
        computed: {
            termColor: function () {
                if (this.term === 'spring') {
                    return '#ffebee'
                } else if (this.term === 'autumn') {
                    return '#FFF3E0'
                } else {
                    return '#ECEFF1'
                }
            }
        },
        methods: {
            clicked: function(val) {
                this.$emit('click',val);
            }
        }
    }
</script>

<style scoped>
img.random {
    width: 55px;
    height: 55px;
}
p.font-setting {
    font-size: 25px;
    text-align: right;

}
    .title-class {
        font-size: 25px;

    }
</style>
