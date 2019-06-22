<template>
    <body>
        <div class="container">
            <ul id="nav">
                <li><a href="">Home</a></li>
                <li><a href="">トップ</a></li>
            </ul>
            
            <h1 align="center">大学授業支援システム</h1>
            <div align="center" class="border-parent">
                <p class="border"></p>
            </div>
            <p>
            自分の大学のこの授業の内容が知りたい。<br>
            そんなときは、ここで探しましょう。
            </p>
            <div class="btn-box">
                <v-btn color="blue">さっそくはじめる</v-btn>
            </div>
        </div>
        <div class="black">
            <ul>
                <li><a href="">kosu.1118.git@gmail.com</a></li>
            </ul>
        </div>
    </body>
    
</template>

<script>
    export default {
        name: "TopPage"
    }
</script>

<style scoped>
.container{
    background-image: url("./img/resize.jpg");
    background-size: cover;
}
h1{
    font-size: 36px;
    margin-top: 10%;
    margin-bottom: 20px;
}
.border{
    width: 75%;
    height: 25px;
    border-top: solid 5px rgba(0, 0, 3, 0.584);
}
p{
    text-align: center;
    font-size: 20px;
}
.btn-box{
    text-align: center;
    margin-top: 15%;
}
.nav-box{
    margin-bottom: 25%;
}
#nav{
    list-style: none;
    overflow: hidden;
    width: 100%;
}
#nav li{
    width: 48%;
    text-align: center;
    background-color: #333;
    float: left;
    height: 50px;
    line-height: 50px;
    margin-right: 2px;
    text-align: center;
}
#nav li a{
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    padding: 20px;
}
div .black{
    background-color: black;
}
.black ul li{
    list-style: none;
    text-align: center;
    font-size: 20px;
    color: white;
    padding: 20px;
}
</style>
