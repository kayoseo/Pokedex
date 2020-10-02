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
      this.favorites = JSON.parse(localStorage.getItem("favorite"));
      this.sortFavorite();
    } else {
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
    }
  },
  data() {
    return {
      pokemons: [],
      search: "",
      emptyList: true,
      page: 1,
      perPage: 7,
      dialog: false,
      active: "",
      selectPokemon: "",
      favorites: [],
      viewAll: true,
      dataList: [],
      loading: false,
    };
  },
  computed: {
    visiblePages() {
      return this.dataList
        .filter((data) => {
          return data.name.toLowerCase().includes(this.search.toLowerCase());
        })
        .slice((this.page - 1) * this.perPage, this.page * this.perPage);
    },
  },
  filters: {
    upperFirst: function (value) {
      return value.replace(/^\w/, (c) => c.toUpperCase());
    },
  },
  methods: {
    getPokemonList() {
      this.loading = true;
      Axios.get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => {
          this.pokemons = res.data.results;
          this.dataList = this.pokemons;
          this.loading = false;
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
      this.favorites = JSON.parse(localStorage.getItem("favorite"));
      this.dialog = false;
    },
    addFavorite(name) {
      this.favorites.push({ name: name });
      this.sortFavorite();
      localStorage.removeItem("favorite");
      //localStorage solo soporta strings. Uso JSON.stringify() para convertir
      //el objeto a string
      localStorage.setItem("favorite", JSON.stringify(this.favorites));

      this.$forceUpdate();
    },
    removeFavorite(name) {
      //elimino un elemento de los favoritos
      var indiceDelete = -1;
      this.favorites.map((x, index) => {
        if (x.name === name) {
          indiceDelete = index;
        }
      });

      this.favorites.splice(indiceDelete, 1);

      this.sortFavorite();
      //localStorage solo soporta strings. Uso JSON.stringify() para convertir
      //el objeto a string
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
      /* this.favorite[index] = false; */
    },
    isFavorite(value) {
      if (this.favorites.filter((name) => name.name === value).length === 0) {
        return false;
      } else {
        return true;
      }
    },
    sortFavorite() {
      this.favorites = this.favorites.sort((a, b) => a - b);
    },

    changeToAll() {
      //Limpiar campo de busqueda al cambiar de vista
      this.search = "";

      //cambio la clase de los botones de ALL y Favorite
      this.viewAll = true;

      this.dataList = this.pokemons;

      /* this.visiblePages(); */
    },
    changeToFavorite() {
      //Limpiar campo de busqueda al cambiar de vista
      this.search = "";

      //cambio la clase de los botones de ALL y Favorite
      this.viewAll = false;
      this.dataList = this.favorites;
      /* this.visiblePages(); */
    },
  },
  components: {
    ModalComponent,
  },
};
</script>
<style src="./ListComponent.css">
</style>