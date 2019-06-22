<template>
    <v-card :color="termColor"
            @click="clicked">
        <v-container grid-list-md text-xs-center>
            <v-layout justify-center>
                <v-card-title class="font-weight-bold title-class"> {{title}} </v-card-title>
            </v-layout>
            <v-layout wrap align-light>
                <p class="font-weight-bold title-class">{{faculty}}学部,{{department}}学科,{{grade}}年,{{professor}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <img v-if="isRandom"
                     class="random"
                     src="../../assets/random.png"
                     alt="抽選">
            </v-layout>
            <v-layout justify-center>
                <app-evaluation-items :labels="evaluationItems"
                                      :out="true"
                                      :value="evaluationItemsResult"
                ></app-evaluation-items>
            </v-layout>
            <v-btn block
                   color="secondary"
                   :href="link"
                   dark>Block Button
            </v-btn>
        </v-container>
    </v-card>
</template>

<script>
    import AppEvaluationItems from "@/components/AppEvaluationItems";

    export default {
        name: "DetailPage",
        components: {AppEvaluationItems},
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
                type: [Number, String],
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
            evaluationItems: {
                type: Array,
                default: () => ['テストの難しさ', 'ためになる授業か', '先生の評価']
            },
            evaluationItemsResult: {
                type: Array,
                default: () => [1.2, 2.3, 3.4]
            },
            link: {
                type: String,
                required: true
            }

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
            clicked: function (val) {
                this.$emit('click', val)

            }
        }
    }
</script>

<style scoped>
    img.random {
        width: 70px;
        height: 70px;
    }

    p.font-setting {
        font-size: 25px;
        text-align: right;

    }

    .title-class {
        font-size: 25px;

    }
</style>
