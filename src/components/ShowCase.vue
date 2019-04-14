<template>
    <p>
        This is ShowCase
        <app-filter-search/>
    </p>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    export default {
        name: "ShowCase",
        components: {AppFilterSearch},
        data() {
            return {
            }
        },

    }
</script>

<style scoped>

</style>
