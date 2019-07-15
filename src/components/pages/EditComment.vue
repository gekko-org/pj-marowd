<template>
    <v-container
            id="grid"
            fluid
            grid-list-sm
            tag="section"
    >
        <v-layout class="display-1">
            コメントを追加・編集する
        </v-layout>
        <v-flex xs10 md5>
            <v-form ref="form">
                <v-text-field
                        v-model="name"
                        :error-messages="nameErrors"
                        label="タイトル"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                ></v-text-field>
            </v-form>
        </v-flex>
        <v-flex xs12 md8>
            <v-textarea
                    Filled
                    auto-grow
                    v-model="text"
                    label="コメント"
            >
            </v-textarea>
        </v-flex>
        <v-layout row-wrap>
            <v-flex md9>
                <v-btn-toggle v-model="comment_evaluate"
                              mandatory
                              dark
                >
                    <v-btn flat><i class="fas fa-thumbs-up"></i>Good!!</v-btn>
                    <v-btn flat><i class="fas fa-thumbs-down"></i>Bad</v-btn>
                </v-btn-toggle>
            </v-flex>
            <v-flex md3>
                <v-btn color="info" @click="submit">レビューを投稿する</v-btn>
            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>
    import {required} from 'vuelidate/lib/validators'
    import {validationMixin} from 'vuelidate'

    export default {
        mixins: [validationMixin],
        name: "EditComment",
        validations: {
            name: {
                required,
            },
        },
        data: function () {
            return {
                name: '',
                text: '',
                comment_evaluate:''
            }

        },
        methods: {
            submit() {
                if (!this.$v.$invalid) {
                    alert('submit is pushed!')

                } else {
                    this.$v.$touch();
                }
            }
        },
        computed: {
            nameErrors: function () {
                const errors = [];
                if (!this.$v.name.$dirty) return errors;
                !this.$v.name.required && errors.push('タイトルの入力は必須です');
                return errors
            },
        }
    }
</script>

<style scoped>
</style>
