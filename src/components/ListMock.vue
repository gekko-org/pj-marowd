<template>
    <div>
        <app-filter-search @input="EventTest"></app-filter-search>
        <ul v-for="i in 2">
            <app-class-summary
                    title="アドラー心理学基礎"
                    faculty="心理"
                    grade="1"
                    professor="アルフレッド・アドラー"
                    :is-random="true"
                    department="個人心理"
                    :rating="4.76"
                    last-updated-by="reud"
                    term="autumn"
                    @click="EventTest">
            </app-class-summary>
        </ul>
        <app-class-summary
                title="アドラー心理学基礎"
                faculty="心理"
                grade="1"
                professor="アルフレッド・アドラー"
                :is-random="true"
                department="個人心理"
                :rating="4.76"
                last-updated-by="reud"
                term="all"
                @click="EventTest">
        </app-class-summary>
        <ul v-for="i in 3">
            <app-class-summary
                    title="アドラー心理学基礎"
                    faculty="心理"
                    grade="1"
                    professor="アルフレッド・アドラー"
                    :is-random="true"
                    department="個人心理"
                    :rating="4.76"
                    last-updated-by="reud"
                    term="spring"
                    @click="EventTest">
            </app-class-summary>
        </ul>
    </div>
</template>

<script>
    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppClassSummary from "@/components/AppClassSummary";

    export default {
        name: "ListMock",
        components: {AppClassSummary, AppFilterSearch},

        data: function () {
            return {}
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
