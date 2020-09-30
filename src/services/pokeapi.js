import Axios from "axios";

export default class ServicePokeApi {
   constructor()
   {
       
   }
    getPokemonList() {
        Axios.get("https://pokeapi.co/api/v2/pokemon").
            then(res => {
                console.log("lista de pokemon", res);
            }).catch(error => {
                console.log(error);
            });
    }
    getPokemon(name) {
        Axios.get("https://pokeapi.co/api/v2/pokemon/" + name).
            then(res => {
                console.log("lista de pokemon", res);
            }).catch(error => {
             console.log(error);
            });
    }
}

