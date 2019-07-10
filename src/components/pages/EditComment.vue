<template>
    <v-container
            id="grid"
            fluid
            grid-list-sm
            tag="section"
    >
        <v-layout align-center justify-center row fill-height class="display-1">
            コメントを追加・編集する
        </v-layout>
        <v-layout align-center justify-center row wrap>
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
                        label="コメント"
                >
                </v-textarea>
            </v-flex>
                <v-flex xs6 md3>
                    <v-btn color="blue"><i class="fas fa-thumbs-up"></i>Good!!</v-btn>
                </v-flex>
                <v-flex xs6 md3>
                    <v-btn color="red"><i class="fas fa-thumbs-down"></i>Bad</v-btn>
                </v-flex>
                <v-flex xs6 md3>
                    <v-btn color="orange">レビューを投稿する</v-btn>
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
    }
</script>

<style scoped>
</style>
