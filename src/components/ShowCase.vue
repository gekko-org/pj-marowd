<template>
    <div>
        <p>
            This is ShowCase
            <app-filter-search @input="EventTest"></app-filter-search>
        </p>
        <p>
            <app-good-button fav=121 @favplus="favAdd" @favminus="favRemove"></app-good-button>
            <app-evaluation-item
                    border
                    :model="evaluationItemModel"
                    :tag-label="'心地よさ'"
                    @rating-selected="EventTest">
            </app-evaluation-item>
            <app-evaluation-item
                    output
                    :model="evaluationItemModel2"
                    :rating="2.72"
                    :tag-label="'心地よさ(集計結果)'"
                    @rating-selected="EventTest">
            </app-evaluation-item>
        </p>
    </div>
</template>

<script>

    import AppFilterSearch from "@/components/AppFilterSearch";
    import AppGoodButton from "@/components/AppGoodButton";
    import AppEvaluationItem from "./AppEvaluationItem";

    export default {
        name: "ShowCase",
        components: {AppEvaluationItem, AppFilterSearch, AppGoodButton},
        data: function () {
            return {
                evaluationItemModel: null,
                evaluationItemModel2: null
            }
        },
        methods: {
            favAdd: function () {
                alert('goodButton is Pushed');
            },
            favRemove: function () {
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
