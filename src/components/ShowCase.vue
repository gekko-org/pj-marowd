<template>
    <div>
    <p>
        This is ShowCase
        <app-filter-search></app-filter-search>
    </p>
        <app-button></app-button>
    </div>

</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppButton from "@/components/AppButton";

    export default {
        name: "ShowCase",
        components: {AppFilterSearch,AppButton},
        data() {
            return {}
        },

    }

</script>

<style scoped>

</style>
