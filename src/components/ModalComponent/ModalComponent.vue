<template src="./ModalComponent.html"></template>
<script>
import Axios from "axios";
export default {
  name: "ModalComponent",
  props: ["dialog", "selectPokemon"],
  mounted() {
    this.openDialog = this.dialog;
    console.log(this.selectPokemon);
    this.getPokemon(this.selectPokemon);
  },
  data() {
    return {
      openDialog: false,
      pokemon: [],
    };
  },
   filters:{
 upperFirst: function(value){
return value.replace(/^\w/, (c) => c.toUpperCase());
 },
 //Obtener todos los tipos y retornar en el formato deseado
 types:function(value){
   var types="";
   //Concateno todos los tipos, le agrego la coma y transformo a mayuscula
   //el primer caracter
   value.map((type)=>{
    types=types+type.type.name.replace(/^\w/, (c) => c.toUpperCase())+", ";
   })
   //elimino el espacio y la coma final
   return types.slice(0, types.length -2);

 },
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
        })
        .catch((error) => {
          console.log(error);
        });
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
  color:#5E5E5E !important;
}
.v-dialog__content{
  background: rgba(0, 0, 0, 0.6);
}
.btn-share{
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

.favorite{
width:26px;
height:26px;
}

b{
  font-weight: 700 !important;
}

</style>