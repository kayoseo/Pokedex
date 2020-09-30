<template>
  <div id="app">
    <body>
      <router-view></router-view>
    </body>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
body {
  text-align: center;
  margin: 0px;
  padding: 0px;

  /*FUENTES*/
  font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -moz-osx-font-smoothing: antialiased;
}


</style>
