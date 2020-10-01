<template src="./HomeComponent.html"></template>
<script>



export default {
  name: "HomeComponent",
  mounted() {

  },
  data() {
    return {};
  },
  methods: {
    redirectToList(){
      this.$router.push('/list');
    }
  },
};
</script>

<style src="./HomeComponent.css">

</style>