<template>
    <v-container
            id="grid"
            fluid
            grid-list-sm
            tag="section"
    >
        <v-layout justify-center>
            <v-layout class="display-1">新規科目追加・編集画面</v-layout>
        </v-layout>
        <!--<v-layout column>-->
        <v-flex xs10 md5>
            <v-form ref="form">
                <v-text-field
                        v-model="classname"
                        :counter="max"
                        :rules="addrules"
                        label="科目名"
                        required
                ></v-text-field>
            </v-form>

        </v-flex>
        <v-layout row wrap>
            <v-flex xs6 md3 class="pa-2">
                <v-select
                        v-model="dep"
                        :items="departmentItems"
                        label="学部"
                ></v-select>
            </v-flex>
            <v-flex xs6 md3 class="pa-2">
                <v-select
                        v-model="major"
                        :items="majorItems"
                        label="学科"
                ></v-select>
            </v-flex>
            <v-flex xs6 md3 class="pa-2">
                <v-select
                        v-model="year"
                        :items="yearSelect"
                        label="学科"
                ></v-select>
            </v-flex>
            <v-flex xs6 md3 class="pa-2">
                <v-form ref="form">
                    <v-text-field
                            v-model="teacher"
                            :counter="max"
                            :rules="rules"
                            label="先生"
                    ></v-text-field>
                </v-form>
            </v-flex>
            <v-checkbox
                    v-model="lottery"
                    color="indigo"
                    label="抽選授業"
            ></v-checkbox>
            <v-btn color="info" @click="submit">授業を追加する</v-btn>
        </v-layout>
    </v-container>
</template>


<script>
    import { required } from 'vuelidate/lib/validators'
    export default {
        name: "AppNewOrEditPage",
        data: function () {
            return {
                addrules: [
                    v => !!v || '必ず入力してください',
                ],
                dep: 'foo',
                year: '',
                major: '',
                teacher:'',

                validations: {
                    name: { required, },
                    checkbox: {
                        checked (val) {
                            return val
                        }
                    }
                },

            }

        },
        updated: function() {
            this.$emit('input',this.major);
        },
        methods: {
            submit() {
                alert('submit is pushed!')
            }
        },
        props: {
            departmentItems: {
                type: Array,
                default: () => ['理工', '生命', '情科','共通']
            },
            yearSelect: {
                type: Array,
                default: () => ['1','2','3','4','共通']
            }
        },
        computed: {
            majorItems: function () {
                if (this.dep === '理工') {
                    return ['機械工', '電電','応情',]
                } else if (this.dep === '生命') {
                    return ['応植', '環応']
                } else if (this.dep === '情科') {
                    return ['CS', 'DM']
                } else {
                    return ['']
                }
            },

            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.required && errors.push('Name is required.')
                return errors
            },
        }
    }
</script>

<style scoped>

</style>
