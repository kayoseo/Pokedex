<template src="./ListComponent.html"></template>
<script>
import Axios from "axios";
import ModalComponent from "../ModalComponent/ModalComponent";

export default {
  name: "ListComponent",
  mounted() {
    this.getPokemonList();
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
      page: 1,
      //Cantidad de pokemones que se mostrara en cada pagina
      perPage: 7,
      dialog: false,
      //Pokemon seleccionado para mostrar en el modal
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
    //Abre el modal
    openDialog(name) {
      this.selectPokemon = name;
      this.dialog = true;
    },
    /* Funcion emitida desde el componente hijo(ModalComponent)
    para actualizar los favoritos con respecto al localStorage */
    closeDialog() {
      this.favorites = JSON.parse(localStorage.getItem("favorite"));
      this.dialog = false;
    },
    /* Agregar favoritos */
    addFavorite(name) {
      this.favorites.push({ name: name });
      this.sortFavorite();
      //Para evitar errores primero se eliminan del localstorage
      //para posteriormente crearlo de nuevo actualizado
      localStorage.removeItem("favorite");
      //localStorage solo soporta strings. Uso JSON.stringify() para convertir
      //el objeto a string
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
      // Para garantizar que la vista este atenta a los cambios de favoritos
      this.$forceUpdate();
    },
    removeFavorite(name) {
      //elimino un elemento de los favoritos
      var indiceDelete = -1;
      /* Se busca el indice del cual se debe eliminar 
      el favorito */
      this.favorites.map((x, index) => {
        if (x.name === name) {
          indiceDelete = index;
        }
      });
      //Se quita el favorito
      this.favorites.splice(indiceDelete, 1);

      this.sortFavorite();
      //localStorage solo soporta strings. Uso JSON.stringify() para convertir
      //el objeto a string
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
      /* this.favorite[index] = false; */
    },
    //Funcion para comprobar si el elemento mostrado es favorito
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
    //Cambiar dataList mostrada para ver todos los pokemon
    changeToAll() {
      //Limpiar campo de busqueda al cambiar de vista
      this.search = "";
      //Para que comience a mostrar desde la pagina 1
      this.page = 1;
      //cambio la clase de los botones de ALL a "activo"
      this.viewAll = true;
      //Modifico la data que se muestra en el listado
      this.dataList = this.pokemons;
    },
    //Cambiar dataList mostrada para ver solo los favoritos
    changeToFavorite() {
      //Limpiar campo de busqueda al cambiar de vista
      this.search = "";
      //Para que comience a mostrar desde la pagina 1
      this.page = 1;
      //cambio la clase del boton favorite a "activo"
      this.viewAll = false;
      //Modifico la data que se muestra en el listado
      this.dataList = this.favorites;
    },
    GoBackHome() {
      this.search = "";
      //cambio la clase de los botones de ALL a "activo"
    },
  },

  components: {
    ModalComponent,
  },
};
</script>
<style src="./ListComponent.css">
</style>