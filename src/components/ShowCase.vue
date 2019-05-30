<template>
    <div>
        <p>
            This is ShowCase
            <app-filter-search @input="EventTest"></app-filter-search>
        </p>
        <p>
            <app-good-button fav=121 @favPush="EventTest" @favUnPush="EventTest"></app-good-button>
        </p>
        <p>
            <app-comment @buttonPush="EventTest"
                         @buttonUnPush="EventTest"
                         isRecommend
                         name='kzmaro'
                         image="https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png"
                         subject="この授業は絶対に取るべき！！！"
                         date="2019.04.08" text="この授業は楽単でありながら出席確認がなく、どんなに遅刻しても先生は許してくれる神授業です。しかし注意しなければならないことが１つだけあります。
                    それは小テストです。この授業では１タームを通して３回の小テストが行われます。この小テストの日程はシラバスにも載っていませんし、初回授業などでもアナウンスされません。つまり、このテスト日程を知るためには、授業に出なければいけないのです。"></app-comment>
            <app-comment @buttonPush="EventTest"
                         @buttonUnPush="EventTest"
                         :isRecommend="false"
                         name="後藤麗奈"
                         image="https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png"
                         subject="良い。"
                         date="2019.05.04"
                         text="初めは痛いのか思いましたが、全然痛さは感じられずお互いにS.Mになりながらのプレーは最高でした。価格、品質、見ばえ、全てにおいて満足です。肌に当たるところは柔らかい素材になっていて、跡がつきにくいです。デザインが大変良いと思います。素材が安っぽいと感じる人がいるかもしれませんが。値段も手ごろですし、後悔のないものだと思います。"></app-comment>
            <app-evaluation-item
                    :output=false
                    :model="evaluationItemModel"
                    tag-label="心地よさ"
                    @rating-selected="EventTest">
            </app-evaluation-item>
            <app-evaluation-item
                    output
                    :model="evaluationItemModel2"
                    :rating="2.72"
                    tag-label="心地よさ"
                    @rating-selected="EventTest">
            </app-evaluation-item>
        </p>
        <app-evaluation-items :labels="['HP', '攻撃', '防御','素早さ','運']" :out=false colors="#FAFAD2"
                              :model="evaluationItemModel" @rating-selected="EventTest2"></app-evaluation-items>
        <br>
        <app-evaluation-items :labels="['HP', '攻撃', '防御','素早さ','運']" :out=true :value="[1,2,3,4,5]" colors="#E6E6FA"
                              :model="evaluationItemModel2" @rating-selected="EventTest2"></app-evaluation-items>
        <app-class-summary
                title="アドラー心理学基礎"
                faculty="心理"
                grade="1"
                professor="アルフレッド・アドラー"
                :is-random="true"
                department="個人心理"
                :rating="4.76"
                last-updated-by="reud"
                term="autumn"
                @click="EventTest">
        </app-class-summary>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppEvaluationItem from "./AppEvaluationItem";
    import AppGoodButton from "@/components/AppGoodButton";
    import AppComment from "@/components/AppComment";
    import AppEvaluationItems from "@/components/AppEvaluationItems";
    import AppClassSummary from "@/components/AppClassSummary";

    export default {
        name: "ShowCase",
        components: {AppClassSummary, AppEvaluationItem, AppFilterSearch, AppGoodButton, AppComment, AppEvaluationItems},

        data: function () {
            return {
                evaluationItemModel: null,
                evaluationItemModel2: null
            }
        },
        methods: {
            EventTest: function (val) {
                alert(`occured ${val}`);
            },
            EventTest2: function (val, label) {
                alert(val+','+label);
            },

        }
    }

</script>

<style scoped>
</style>
