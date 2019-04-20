<template>
<div>
    <p>Count: {{ counter }}</p>
    <p><button v-on:click="increment">Button</button></p>
</div>
</template>

<script>
    export default {
        name: "counter",
        data: function () {
            return {
                counter: 0
            }
        },
        methods: {
            increment: function() {
                this.counter++;
            }
        }
    }
</script>

<style scoped>

</style>
