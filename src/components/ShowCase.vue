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
            <app-comment like=0 @buttonPush="EventTest" @buttonUnPush="EventTest" name='kzmaro' image="loginphoto.png" subject="この授業は絶対に取るべき！！！"
                         date="2019.04.08" text="この授業は楽単でありながら出席確認がなく、どんなに遅刻しても先生は許してくれる神授業です。しかし注意しなければならないことが１つだけあります。
                    それは小テストです。この授業では１タームを通して３回の小テストが行われます。この小テストの日程はシラバスにも載っていませんし、初回授業などでもアナウンスされません。つまり、このテスト日程を知るためには、授業に出なければいけないのです。"></app-comment>
            <app-evaluation-item
                    border
                    :model="evaluationItemModel"
                    :tag-label="'心地よさ'"
                    @rating-selected="EventTest">
            </app-evaluation-item>
            <app-evaluation-item
                    output
                    :model="evaluationItemModel2"
                    :rating="2.72"
                    :tag-label="'心地よさ(集計結果)'"
                    @rating-selected="EventTest">
            </app-evaluation-item>
        </p>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppEvaluationItem from "./AppEvaluationItem";
    import AppGoodButton from "@/components/AppGoodButton";
    import AppComment from "@/components/AppComment";
    export default {
        name: "ShowCase",
        components: {AppEvaluationItem,AppFilterSearch, AppGoodButton, AppComment},
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
        }
    }

</script>

<style scoped>
</style>
