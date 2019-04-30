<template>
    <div>
        <p>
            This is ShowCase
            <app-filter-search></app-filter-search>
        </p>
        <p>
            <app-good-button fav=121 @favplus="favAdd" @favminus="favRemove"></app-good-button>
        </p>
        <p>
            <app-comment name=kzmaro subject="この授業は絶対に取るべき！！！" date="2019.04.08"></app-comment>
        </p>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppGoodButton from "@/components/AppGoodButton";
    import AppComment from "@/components/AppComment";

    export default {
        name: "ShowCase",
        components: {AppFilterSearch,AppGoodButton,AppComment},
        data: function () {
            return {}
        },
        methods: {
            favAdd: function () {
                alert('goodButton is Pushed');
            },
            favRemove: function () {
                alert('goodButton is UnPushed');
            }
        }
    }

</script>

<style scoped>
</style>
