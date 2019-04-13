<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <show-case/>
  </div>
</template>

<script>
import ShowCase from "@/components/ShowCase";

export default {
  name: 'app',
  components: {
    ShowCase,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
