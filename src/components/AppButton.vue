<template>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>

<script>
    export default {
        name: "button",
        data: function(){
           return {
               count:0
           }
        }
    }
</script>

<style scoped>

</style>
