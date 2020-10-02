<template src="./ListComponent.html"></template>
<script>
import Axios from "axios";
import ModalComponent from "../ModalComponent/ModalComponent";

export default {
  name: "ListComponent",
  mounted() {
    this.getPokemonList();
    this.emptyList = true;
    if (localStorage.getItem("favorite")) {
      this.favorite = JSON.parse(localStorage.getItem("favorite"));
      console.log("favoritos", this.favorite);
    } else {
      localStorage.setItem("favorite", JSON.stringify(this.favorite));
    }
  },
  data() {
    return {
      pokemons: [],
      search: "",
      emptyList: true,
      page: 1,
      perPage: 10,
      dialog: false,
      active: "",
      selectPokemon: "",
      favorite: [],
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
  filters: {
    upperFirst: function (value) {
      return value.replace(/^\w/, (c) => c.toUpperCase());
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
    openDialog(name) {
      this.selectPokemon = name;
      this.dialog = true;
    },
    closeDialog() {
      this.favorite = JSON.parse(localStorage.getItem("favorite"));
      this.dialog = false;
    },
    addFavorite(name) {
      this.favorite.push(name);

      localStorage.removeItem("favorite");
      //localStorage solo soporta strings. Uso JSON.stringify() para convertir
      //el objeto a string
      localStorage.setItem("favorite", JSON.stringify(this.favorite));

      this.$forceUpdate();
    },
    removeFavorite(name) {
      //elimino un elemento de los favoritos
      this.favorite.splice(this.favorite.indexOf(name), 1);
      //localStorage solo soporta strings. Uso JSON.stringify() para convertir
      //el objeto a string
      localStorage.setItem("favorite", JSON.stringify(this.favorite));
      /* this.favorite[index] = false; */
    },
    isFavorite(value) {
      console.log(this.favorite.filter((name) => name === value).length);
      if (this.favorite.filter((name) => name === value).length === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  components: {
    ModalComponent,
  },
};
</script>
<style src="./ListComponent.css">
</style>