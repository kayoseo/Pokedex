import Axios from "axios";

class ServicePokeApi {
   constructor()
   {
       
   }
    getPokemonList() {
        Axios.get("https://pokeapi.co/api/v2/pokemon").
            then(res => {
                console.log(res);
                console.log("Entro");
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
export default ServicePokeApi
