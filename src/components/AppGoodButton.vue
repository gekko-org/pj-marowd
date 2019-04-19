<template>
    <!--<i class="far fa-heart"></i>-->
    <button class='style' v-bind:class='{active:isActive}' v-on:click='isActive=!isActive;changeFav();'>
        <i class="fas fa-heart"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ fav }}
    </button>
</template>

<script>
    export default {
        name: "AppGoodButton",
        props: ['fav'],
        data: function () {
            return {
                isActive: false,
            }
        },
        methods: {
            changeFav: function () {
                if (this.isActive) {
                    this.fav++;
                    this.$emit('testadd',);
                } else {
                    this.fav--;
                    this.$emit('testunadd',);
                }
            }
        },
    }
</script>

<style scoped>
    .style {
        font-size: 140%;
        border-color: gray;
        border-style: groove;
        padding: 5px;
        color: gray;
        cursor: pointer;
    }

    .style.active {
        color: palevioletred;
        cursor: pointer;
    }

</style>
