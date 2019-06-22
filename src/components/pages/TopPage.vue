<template>
    <div class="container" style="background-image: url(./img/resize.jpg);">
        <div class="link-box">
            <h1>タイトル</h1>
        </div>
        <div class="title">
            <h1 align="center">タイトル</h1>
                <p align="center">サブタイトル</p>
        </div>
        <div class="btn-box">
            <v-btn color="blue">use this</v-btn>
        </div>
        <div class="box2">
            
        </div>    
    </div>
</template>

<script>
    export default {
        name: "TopPage"
    }
</script>

<style scoped>
div{
    color: white;
}
.container{
    height: auto;
    width: auto;
}
div .link-box{
    width: 100%;
    height: 20%;
}
div .btn-box{
    text-align: center;
}
div .box2{
    border: none;
}
h1{
    padding: 5px;
}

</style>
