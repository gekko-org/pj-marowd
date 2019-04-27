<template>
    <div>
        <p>
            This is ShowCase
            <app-filter-search @input="EventTest"></app-filter-search>
        </p>
        <p>
            <app-good-button fav=121 @testadd="TestParentAdd" @testunadd="TestParentRem"></app-good-button>
        </p>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppGoodButton from "@/components/AppGoodButton";

    export default {
        name: "ShowCase",
        components: {AppFilterSearch, AppGoodButton},
        data: function () {
            return {}
        },
        methods: {
            TestParentAdd: function () {
                alert('goodButton is Pushed');
            },
            TestParentRem: function () {
                alert('goodButton is UnPushed');
            },
            EventTest: function (val) {
                alert(`occured ${val}`);
            }

        }
    }

</script>

<style scoped>

</style>
