<template>
    <div :class="border ? 'material' : ''">
        <v-chip label color="pink" text-color="white">
            <v-icon left>label</v-icon>
                {{tagLabel}}
        </v-chip>
        <div v-if="output">
            <star-rating
                    :increment="output ? 0.01 : 0.5"
                    :rating="rating"
                    @rating-selected="ratingSelected"
                    @current-rating="currentRating"
                    :read-only="output"></star-rating>
        </div>
        <div v-else>
            <star-rating
                    v-model="model"
                    :increment="output ? 0.01 : 0.5"
                    :rating="3"
                    @rating-selected="ratingSelected"
                    @current-rating="currentRating"
                    :read-only="output"></star-rating>
        </div>
    </div>
    <!-- from https://www.npmjs.com/package/vue-star-rating */ -->


</template>

<script>
    import StarRating from "vue-star-rating/src/star-rating";
    export default {
        name: "AppEvaluationItem",
        components: {StarRating},
        data: function() {
            return {
            }
        },
        props: {
            output: {
                type: Boolean,
                default: false
            },
            rating: {
                type: Number,
                default: 0
            },
            border: {
                type: Boolean,
                default: false
            },
            tagLabel: {
                type: String,
                default: 'default'
            },
            model: {
                default: undefined
            }
        },
        methods: {
            ratingSelected: function (val) {
                this.$emit('rating-selected',val)
            },
            currentRating: function (val) {
                this.$emit('current-rating',val)
            }
        }
    }
</script>

<style scoped>
div.material{
    border: 1px solid #64B5F6;
    width: 280px;
}
</style>
