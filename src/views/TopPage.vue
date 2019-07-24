<template>
  <div class="container">
    <h1 align="center">(タイトル)</h1>
    <div align="center" class="topic">
      <p>aaa</p>
    </div>
    <div class="border-box">
      <p class="border"></p>
    </div>
    <div class="content">
      <div class="content-left">
        <p>
          <strong>例</strong>
          サービスの概要や説明など、あいうえお、かきくけこ、さしすせそ。
          ボーダーはブロックが見やすいように入れてある(あとで消す)。
        </p>
      </div>
      <div class="content-right">
        <p>
          <strong>strong</strong>
          内容右側
        </p>
      </div>
      <div class="btn-box">
        <v-btn color="rgba(100, 100, 50, 0.2)">はじめる</v-btn>
      </div>
    </div>
  </div>
  <div class="border-box">
    <p class="border"></p>
  </div>
  <div class="border-box">
    <p class="border"></p>
  </div>
  <footer>
    <p align="center">footer部分</p>
  </footer>
</template>

<script>
export default {
  name: 'TopPage'
};
</script>

<style scoped>
body {
  background-color: wheat;
  width: auto;
  color: black;
  max-width: 860px;
  margin: auto;
}
h1 {
  font-size: 20px;
  margin-top: 1%;
  margin-bottom: 1%;
  font-family: 'fantasy';
}
.border {
  width: 100%;
  height: 1px;
}
.border-box {
  margin: 2px;
  background: linear-gradient(to right, wheat, black, wheat);
}
.border-box p:last-child {
  margin-top: 30px;
}
.content {
  margin: 5px;
}
.content-left {
  float: left;
  width: 49%;
  height: 180px;
  margin-right: 1%;
  border: 1px solid #3a4a5e;
  border-radius: 5px;
  border: none;
}
.content-right {
  float: left;
  width: 49%;
  height: 180px;
  margin-left: 1%;
  border: 1px solid #3a4a5e;
  border-radius: 5px;
  border: none;
}
.container p {
  font-size: 14px;
}
strong {
  font-size: 20px;
}
.btn-box {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
  font-family: 'fantasy';
}
footer {
  background-color: black;
  margin-top: 5px;
}
</style>
