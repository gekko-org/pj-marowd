<template>
    <v-layout>
        <v-flex xs8 sm6 md4>
            <v-card :color="colors" class="py-2">
                <v-layout justify-center>
                    <div>
                        <div v-for="label in labels.length" :key="label.id">
                            <app-evaluation-item @rating-selected="EventConnect" :output=out
                                                 :tag-label=labels[label-1]
                                                 :rating=value[label-1]></app-evaluation-item>
                        </div>
                    </div>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import AppEvaluationItem from "@/components/AppEvaluationItem";

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
            out: {
                type: Boolean,
                requires: true,
            },
            colors: {
                type: String,
            }
        },

        methods: {
            EventConnect: function (val) {
                let labelToValue = {};
                labelToValue[this.label] = val;

                this.$emit('rating-selected', labelToValue);
            },
        }
    }
</script>
