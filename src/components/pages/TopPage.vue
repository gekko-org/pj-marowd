<template>
    <div>
        <div class="box1">
            <header>
                <h1>授業評価</h1>
                    <h2 align="center">～授業選びに迷ったあなたに～</h2>
            </header>
            <p align="center">大学授業逆評価システムへようこそ!!<br></p>
        </div>
        <div class="vtn-box">
             <v-btn color="red">use this</v-btn>
        </div>
        <div class="box2">
            <ul>
                <p>以下のご希望に答えます。</p>
                <li>楽な授業が知りたい</li>
                <li>気になる授業の内容が知りたい</li>
                <li>時間割決めで失敗したくない</li>
            </ul>
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
div .box1{
    background: black;
    width: auto;
}
div .vtn-box{
    text-align: center;
    height: 65px;
}
div .box2{
    border: none;
    background: linear-gradient(0deg, brown, black);
}
h1{
    padding: 5px;
}

</style>
