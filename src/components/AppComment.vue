<template>
    <v-layout justify-center>
        <v-flex xs6 md6>
            <v-card>
                <v-card-title class="font-weight-bold">{{subject}}</v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "AppComment",
        props: ['name', 'message', 'date','subject'],
        data: function () {
            return {}
        },
    }
</script>

<style scoped>

</style>
