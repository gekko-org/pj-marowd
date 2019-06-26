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
            <v-layout justify-center>
            <app-evaluation-items :labels="evaluationItems"
                                  :out=false
                                  colors="#FAFAD2"
                                  :model="evaluationItemModel"
                                  @rating-selected="EventTest2"></app-evaluation-items>
            </v-layout>
            <v-btn block
                   color="secondary"
                   :href="link"
                   target="_blank"
                   dark>シラバスに飛ぶ
            </v-btn>
            <app-comment-box :comments="comments"></app-comment-box>
        </v-container>
    </v-card>
</template>

<script>
    import AppEvaluationItems from "@/components/AppEvaluationItems";
    import AppCommentBox from "../AppCommentBox";

    export default {
        name: "DetailPage",
        components: {AppCommentBox, AppEvaluationItems},
        data: function () {
            return {
                evaluationItemModel: null
            }
        },
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
            },
            comments: {
                type: Array,
                default: () => [
                    {
                        name: 'testname1',
                        image: 'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
                        date: '1234.12.12',
                        subject: 'math1',
                        text: 'Lorem Ipsum......',
                        isRecommend: true
                    },
                    {
                        name: 'testname2',
                        image: 'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
                        date: '1234.12.12',
                        subject: 'math2',
                        text: '初めは痛いのか思いましたが、全然痛さは感じられずお互いにS.Mになりながらのプレーは最高でした。価格、品質、見ばえ、全てにおいて満足です。肌に当たるところは柔らかい素材になっていて、跡がつきにくいです。デザインが大変良いと思います。素材が安っぽいと感じる人がいるかもしれません',
                        isRecommend: true
                    },
                    {
                        name: 'testname3',
                        image: 'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
                        date: '1234.12.12',
                        subject: 'math3',
                        text: 'Lorem Ipsum......',
                        isRecommend: true
                    },
                    {
                        name: 'testname4',
                        image: 'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
                        date: '1234.12.12',
                        subject: 'math4',
                        text: '同様に、苦痛そのものを、それが苦痛であるという理由で愛したり、探したり、手に入れることを望んだりする者もいない。しかし、ときには苦労や苦痛がその人に大いなる喜びをいくらかもたらす状況がおこることがある。些末な例を挙げると、私たちのうちのだれが、そこから何か有益なものを得られないのに、骨の折れる肉体運動を引き受けるだろうか？しかしだれに、いらだたしい結末のない喜びを享受することを選ぶ人や、その結果としての喜びを生み出さないような痛みを避ける人にある、落ち度を見つける権利はあるのだろうか？',
                        isRecommend: true
                    }
                ]
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

            },
            EventTest2: function (val, label) {
                alert(val + ',' + label);
            },
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
