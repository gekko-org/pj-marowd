<template>
    <div>
        <p>
            This is ShowCase
            <app-filter-search></app-filter-search>
        </p>
        <app-rensyu-button ></app-rensyu-button>
        <p>
            <app-good-button fav=121></app-good-button>
        </p>
    </div>

</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppRensyuButton from "@/components/AppRensyuButton";
    import AppGoodButton from "@/components/AppGoodButton";

    export default {
        name: "ShowCase",
        components: {AppFilterSearch, AppRensyuButton, AppGoodButton},
        data:function() {
            return {
            }
        },
    }

</script>

<style scoped>

</style>
