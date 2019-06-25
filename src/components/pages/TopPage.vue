<template>
    <body>
        <ul id="nav">
            <li><a href="">Home</a></li>
            <li><a href="">トップ</a></li>
        </ul> 
        <div class="container">          
            <h1 align="center">Welcome Our Web Service(タイトル)</h1>
            <div align="center" class="border-parent">
                <p class="border"></p>
            </div>
            <p>
            内容<br>
            説明などなど、
            <br>
            <br>
            <br>
            <br>
            <br>
            </p>
            <div class="btn-box">
                <v-btn color="rgba(50, 50, 100, 0.4)">use this</v-btn>
            </div>
        </div>
        <footer>
            <p align="center">footer部分</p>
        </footer>
    </body>
    
</template>

<script>
    export default {
        name: "TopPage"
    }
</script>

<style scoped>
body{
    background-image: url("./img/002.jpg");
    background-size: cover;
    width: 100%;
    color: black;
}
h1{
    font-size: 36px;
    margin-top: 6%;
    margin-bottom: 20px;
    font-family: "fantasy"
}
.border{
    width: 75%;
    height: 25px;
    border-top: solid 5px rgba(0, 50, 50, 0.6);
}
.container p{
    text-align: center;
    font-size: 20px;
}
.btn-box{
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
    font-family: 'HG行書体'
}

#nav{
    list-style: none;
    overflow: hidden;
    width: 100%;
    margin: 0%;
    padding: 0%;
    background-color: rgba(145, 145, 93, 0.5);
}
#nav li{
    width: 10%;
    text-align: center;
    float: left;
    height: 50px;
    line-height: 50px;
    margin-right: 2px;
    text-align: center;
    border-right: solid 2px rgba(145, 145, 93, 0.5);
}
#nav li a{
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    padding: 2%;
    
}
footer{
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
