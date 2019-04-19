<template>
    <!--<i class="far fa-heart"></i>-->
    <button class='sheet' v-bind:class='{active:isActive}' v-on:click='isActive=!isActive;changefav();'>
        <i class="fas fa-heart"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ fav }}</button>
</template>

<script>
    export default {
        name: "AppGoodButton",
        props: ['fav'],
        data: function () {
            return{
                isActive: false,
            }
        },
        methods :{
            changefav: function(){
                if(this.isActive===true){
                    this.fav++;
                }
                else{
                    this.fav--;
                }
                this.$emit(this.fav);
            }
        },
    }
</script>

<style scoped>
    .sheet {
        font-size: 140%;
        border-color: gray;
        border-style: groove;
        padding: 5px;
        color: gray;
        cursor: pointer;
    }

    .sheet.active {
        color: palevioletred;
        cursor: pointer;
    }

</style>
