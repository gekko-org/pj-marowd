<template>
    <div>
         <div v-for="label in labels.length" :key="label.id">
             <app-evaluation-item @rating-selected="EventConnect" :output=out
                                  :model="evaluationItemModel" :tag-label=labels[label-1] :rating=value[label-1]></app-evaluation-item>
         </div>
    </div>
</template>

<script>
    import AppEvaluationItem from "./AppEvaluationItem";

    export default {
        components: {AppEvaluationItem},
        name: "AppEvaluationItems",
        props: {
            labels: {
                type: Array,
                required: true,
            },
            value: {
                type: Array,
                default: () => []
            },
            out:{
                type:String,
                requires:true,
            }
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
