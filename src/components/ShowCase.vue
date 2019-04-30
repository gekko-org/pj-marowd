<template>
    <div>
        <p>
            This is ShowCase
            <app-filter-search></app-filter-search>
        </p>
        <p>
            <app-good-button fav=121 @favPush="check" @favUnPush="check"></app-good-button>
        </p>
        <p>
            <app-comment @buttonPush="check" @buttonUnPush="check" name=kzmaro subject="この授業は絶対に取るべき！！！"
                         date="2019.04.08" text="この授業は落胆でありながら出席確認がなく、どんなに遅刻しても先生は許してくれる髪授業です。しかし注意しなければならないことが１つだけあります。
                    それは小テストです。この授業では１タームを通して３回の小テストが行われます。この小テストの日程はシラバスにも載っていませんし、初回授業などでもアナウンスされません。つまり、このテスト日程を知るためには、授業に出なければいけないのです。"></app-comment>
        </p>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppGoodButton from "@/components/AppGoodButton";
    import AppComment from "@/components/AppComment";

    export default {
        name: "ShowCase",
        components: {AppFilterSearch, AppGoodButton, AppComment},
        data: function () {
            return {}
        },
        methods: {
            check: function () {
                alert('An event broke out');
            },
        }
    }

</script>

<style scoped>
</style>
