<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body{
  /*height: 100%;*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*height: 100%;*/
  color: #2c3e50;
  /*flex-direction: column;*/
  /*margin-top: 60px;*/
  width: 100%;
  max-width: 1000px;
}

</style>
