<template src="./ModalComponent.html"></template>
<script>
import Axios from "axios";
import copy from "copy-to-clipboard";

export default {
  name: "ModalComponent",
  props: ["dialog", "selectPokemon"],
  mounted() {
    this.getPokemon(this.selectPokemon);
    if (localStorage.getItem("favorite")) {
      this.favorites = JSON.parse(localStorage.getItem("favorite"));
      console.log("favoritos", this.favorites);
    } else {
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
    }
  },
  filters: {
    upperFirst: function (value) {
      return value.replace(/^\w/, (c) => c.toUpperCase());
    },
  },
  data() {
    return {
      pokemon: [],
      favorites: [],
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("close", false);
    },
    getPokemon(name) {
      Axios.get("https://pokeapi.co/api/v2/pokemon/" + name)
        .then((res) => {
          console.log("Informacion del pokemon", res.data);
          this.pokemon = res.data;
          //Obtengo todos los tipos y los concateno en un array
          var types = "";
          //Concateno todos los tipos, le agrego la coma y transformo a mayuscula
          //el primer caracter
          this.pokemon.types.map((type) => {
            types =
              types +
              type.type.name.replace(/^\w/, (c) => c.toUpperCase()) +
              ", ";
          });
          //elimino el espacio y la coma final
          this.pokemon.types = types.slice(0, types.length - 2);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addFavorite(name) {
      this.favorites.push({ name: name });
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
      //localStorage solo soporta strings. Uso JSON.stringify() para convertir
      //el objeto a string
      localStorage.setItem("favorite", JSON.stringify(this.favorites));
      this.$forceUpdate();
    },
    //Funcion para comprobar si el elemento mostrado es favorito
    isFavorite(value) {
      if (this.favorites.filter((name) => name.name === value).length === 0) {
        return false;
      } else {
        return true;
      }
    },
    //Funcion para copiar en el portapales
    doCopy: function () {
      //concateno el nombre del pokemon y sus atributos en un string
      var valor =
        "" +
        this.pokemon.name +
        ", Weight: " +
        this.pokemon.weight +
        ", Height: " +
        this.pokemon.height +
        ", Types: " +
        this.pokemon.types;
      //Guardo el "valor" en el portapapeles
      copy(valor);
    },
  },
};
</script>

<style  src="./ModalComponent.css">
</style>