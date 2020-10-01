<template src="./ListComponent.html"></template>
<script>
import Axios from "axios";
export default {
  name: "ListComponent",
  mounted() {
    this.getPokemonList();
    this.emptyList = true;
  },
  data() {
    return {
      pokemons: [],
      search: '',
      emptyList: true,
      page: 1,
      perPage: 10,
    };
  },
  computed: {
    visiblePages() {
      return this.pokemons.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  methods: {
    getPokemonList() {
      Axios.get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => {
          this.pokemons = res.data.results;
          console.log("lista de pokemon", this.pokemons);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPokemon(name) {
      Axios.get("https://pokeapi.co/api/v2/pokemon/" + name)
        .then((res) => {
          console.log("lista de pokemon", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
  },
};
</script>
<style src="./ListComponent.css">
</style>