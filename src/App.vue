<template>

  <div id="app">
  
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <body>
      <div class="center">
        <router-view></router-view>
      </div>
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
.center {
  width: 75%;
  margin: 0px auto;
}
body{
  background: #E5E5E5!important;
}
</style>
