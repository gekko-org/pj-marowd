<template>
    <div>
        <p>
            This is ShowCase
            <app-filter-search></app-filter-search>
        </p>
        <p>
            <app-good-button fav=121 @favplus="favAdd" @favminus="favRemove"></app-good-button>
        </p>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppGoodButton from "@/components/AppGoodButton";

    export default {
        name: "ShowCase",
        components: {AppFilterSearch,AppGoodButton},
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
