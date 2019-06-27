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
                <v-form ref="form">
                    <v-text-field
                            v-model="faculty"
                            :counter="max"
                            label="学部"
                    ></v-text-field>
                </v-form>
            </v-flex>
            <v-flex xs6 md3 class="pa-2">
                <v-form ref="form">
                    <v-text-field
                            v-model="department"
                            :counter="max"
                            label="学科"
                    ></v-text-field>
                </v-form>
            </v-flex>
            <v-flex xs6 md3 class="pa-2">
                <v-form ref="form">
                    <v-text-field
                            v-model="year"
                            :counter="max"
                            :rules="rules"
                            label="学年"
                    ></v-text-field>
                </v-form>
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
    export default {
        name: "AppNewOrEditPage",
        data: function () {
            return {
                addrules: [
                    v => !!v || '必ず入力してください',
                ],
            }

        },
        methods: {
            submit() {
                alert('submit is pushed!')
            }
        }
    }
</script>

<style scoped>

</style>
