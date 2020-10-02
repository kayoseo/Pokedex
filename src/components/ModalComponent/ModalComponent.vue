<template src="./ModalComponent.html"></template>
<script>
import Axios from "axios";
import copy from "copy-to-clipboard";

export default {
  name: "ModalComponent",
  props: ["dialog", "selectPokemon"],
  mounted() {
    this.openDialog = this.dialog;
    console.log(this.selectPokemon);
    this.getPokemon(this.selectPokemon);
    if (localStorage.getItem("favorite")) {
      this.favorite = JSON.parse(localStorage.getItem("favorite"));
      console.log("favoritos", this.favorite);
    } else {
      localStorage.setItem("favorite", JSON.stringify(this.favorite));
    }
  },
  data() {
    return {
      openDialog: false,
      pokemon: [],
      favorite: [],
      copyPokemon: "hola",
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
          //convierto primer caracter del nombre a mayuscula
          this.pokemon.name = this.pokemon.name.replace(/^\w/, (c) =>
            c.toUpperCase()
          );
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

    doCopy: function () {
      var valor =
        "" +
        this.pokemon.name +
        ", Weight: " +
        this.pokemon.weight+ ", Height: " +
        this.pokemon.height+", Types: "+ this.pokemon.types;
      //this.upperFirst(this.pokemon.name)  +", Weight: "+this.pokemon.weight
      copy(valor);
    },
  },
};
</script>

<style >
.pokemon {
  position: absolute;
  width: 180px;
  height: 180px;
  left: 195px;
}

.backPokemon {
  width: 570px;
  height: 220px;
  /* background: #F22539;
  border: 2px solid #000000; */
}
.content {
  width: 570px !important;
}
p {
  font-family: Lato !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 150% !important;
  color: #5e5e5e !important;
}
.v-dialog__content {
  background: rgba(0, 0, 0, 0.6);
}
.btn-share {
  display: flex !important;
  flex-direction: row !important;
  align-items: flex-start !important;
  padding: 11px 0px 0px 20px !important;

  position: absolute !important;
  width: 195px !important;
  height: 44px !important;

  background: #f22539 !important;
  border-radius: 60px !important;

  /* Get started */

  font-family: Lato !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 18px !important;
  line-height: 22px !important;
  /* identical to box height */

  color: #ffffff !important;
}
.v-card__actions {
  padding: 0px 30px 20px 20px !important;
}

.favorite {
  width: 26px;
  height: 26px;
}

b {
  font-weight: 700 !important;
}
.btn-close {
  position: absolute !important;
  top: 0px !important;
  margin: 10px !important;
}
.btn-close:hover {
  cursor: pointer;
}
</style>