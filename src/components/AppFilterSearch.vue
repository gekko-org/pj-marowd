<template>
    <v-container grid-list-md>
        <v-layout wrap align-center>
            <v-flex xs6 sm4 d-flex>
                <v-select
                        v-model="dep"
                        :items="departmentItems"
                        label="学部"
                ></v-select>
            </v-flex>

            <v-flex xs6 sm4 d-flex>
                <v-select
                        v-model="major"
                        :items="majorItems"
                        label="学科"
                ></v-select>
            </v-flex>
            <v-flex xs12 sm2 d-flex>
                <v-btn color="success">検索</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    Vue.component('v-select', {});
    export default {
        name: "AppFilterSearch",
        data() {
            return {
                dep: 'FOO',
                major: ''
            }
        },
        updated: function() {
            this.$emit('input',this.major);
        },
        props: {
            departmentItems: {
                type: Array,
                default: () => ['FOO', 'VAR', 'ICE']
            }
        },
        computed: {
            majorItems: function () {
                if (this.dep === 'FOO') {
                    return ['FOO1', 'FOO2']
                } else if (this.dep === 'VAR') {
                    return ['VAR1', 'VAR2']
                } else if (this.dep === 'ICE') {
                    return ['ICE1', 'ICE2']
                } else {
                    return ['E1', 'E2']
                }
            }
        }
    }
</script>

<style scoped>

</style>
