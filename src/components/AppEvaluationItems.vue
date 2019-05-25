<template>
    <!--<div v-for="la in label">-->
    <!--<AppEvaluationItem @rating-selected="EventConnect" border-->
    <!--:model="evaluationItemModel"-->
    <!--:tag-label=la-->
    <!--&gt;</AppEvaluationItem>-->
    <!--</div>-->
    <div>
         <div v-for="lb in label" :key="lb.id">
             <app-evaluation-item @rating-selected="EventConnect" border
                                  :model="evaluationItemModel" :tag-label='lb'></app-evaluation-item>
         </div>
    </div>
</template>

<script>
    import AppEvaluationItem from "./AppEvaluationItem";

    export default {
        components: {AppEvaluationItem},
        name: "AppEvaluationItems",
        props: {
            label: {
                type: Array,
            },
            image: {
                type: String,
                required: true,
            },
        },

        methods: {
            EventConnect: function (val) {
                this.$emit('rating-selected', val);
            },
        }
    }
</script>

<style scoped>

</style>
