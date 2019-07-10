<template>
    <div class="listview">
        <app-filter-search></app-filter-search>
        <v-container
                id="grid"
                fluid
                grid-list-md>
            <v-layout row-wrap>
                <v-flex xs6 md12>
                    <AppClassSummary
                            title='c言語'
                            faculty="理工"
                            grade="1"
                            professor="斎藤"
                            department="応情"
                            is-random="0"
                            rating="3.5"
                            last-updated-by="2019.06.04"
                            term="spring"
                    ></AppClassSummary>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import AppFilterSearch from "../AppFilterSearch";
    import AppClassSummary from "../AppClassSummary";

    export default {
        name: "ListPage",
        components: {AppClassSummary, AppFilterSearch}
    }
</script>

<style scoped>
    .listview {
        background-color: palegoldenrod;
    }
</style>
