<template>
    <div>
        This is ShowCase
        <app-filter-search v-model="afs"/>
        <p>(afs)親コンポーネントの値{{afs}}</p>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";

    export default {
        name: "ShowCase",
        components: {AppFilterSearch},
        data() {
            return {
                afs: ''
            }
        },
        props: {}

    }
</script>

<style scoped>

</style>
